// Universal Cloud Database Sync Engine (Supabase & Turso)
// Provides 100% permanent cloud persistence across all devices, users, and Vercel deployments.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const CLOUD_CONFIG_KEY = 'mls_cloud_config';

export function getCloudConfig() {
  try {
    const raw = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    provider: import.meta.env.VITE_CLOUD_PROVIDER || 'supabase', // 'supabase' | 'turso'
    supabase_url: import.meta.env.VITE_SUPABASE_URL || '',
    supabase_key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    turso_url: import.meta.env.VITE_TURSO_URL || '',
    turso_token: import.meta.env.VITE_TURSO_TOKEN || '',
    enabled: Boolean(import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_TURSO_URL),
  };
}

export function saveCloudConfig(config) {
  try {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save cloud config locally:', e);
  }
}

let supabaseInstance = null;
let tursoInstance = null;

function getSupabase() {
  const config = getCloudConfig();
  if (!config.supabase_url || !config.supabase_key) return null;
  if (!supabaseInstance || supabaseInstance.supabaseUrl !== config.supabase_url) {
    try {
      supabaseInstance = createSupabaseClient(config.supabase_url, config.supabase_key);
    } catch (e) {
      console.warn('Failed to init Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
}

async function getTurso() {
  const config = getCloudConfig();
  if (!config.turso_url || !config.turso_token) return null;
  if (!tursoInstance) {
    try {
      const { createClient } = await import('@libsql/client/web');
      tursoInstance = createClient({
        url: config.turso_url,
        authToken: config.turso_token,
      });
      // Auto-ensure lms_store table exists in Turso
      await tursoInstance.execute(`
        CREATE TABLE IF NOT EXISTS lms_store (
          key TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (e) {
      console.warn('Failed to init Turso client:', e);
      return null;
    }
  }
  return tursoInstance;
}

export const cloudService = {
  isConfigured: () => {
    const config = getCloudConfig();
    if (config.provider === 'turso') {
      return Boolean(config.turso_url && config.turso_token);
    }
    return Boolean(config.supabase_url && config.supabase_key);
  },

  testConnection: async (overrideConfig = null) => {
    const config = overrideConfig || getCloudConfig();

    if (config.provider === 'turso') {
      if (!config.turso_url || !config.turso_token) {
        throw new Error('Turso Database URL and Auth Token are required.');
      }
      try {
        const { createClient } = await import('@libsql/client/web');
        const client = createClient({ url: config.turso_url, authToken: config.turso_token });
        await client.execute('SELECT 1;');
        // Auto-create table in Turso
        await client.execute(`
          CREATE TABLE IF NOT EXISTS lms_store (
            key TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);
        return { success: true, message: 'Connected successfully to Turso Cloud Database! Table created automatically.' };
      } catch (err) {
        throw new Error(`Turso connection failed: ${err.message}`);
      }
    }

    if (config.provider === 'supabase' || (!config.provider && config.supabase_url)) {
      if (!config.supabase_url || !config.supabase_key) {
        throw new Error('Supabase Project URL and Anon Public Key are required.');
      }
      try {
        const client = createSupabaseClient(config.supabase_url, config.supabase_key);
        // Test query on lms_store
        const { data, error } = await client.from('lms_store').select('key').limit(1);
        if (error) {
          if (error.code === '42P01') {
            // Table doesn't exist yet
            return {
              success: true,
              tableMissing: true,
              message: 'Connected to Supabase! Please run the 1-click SQL setup script in your Supabase dashboard.',
            };
          }
          throw new Error(error.message);
        }
        return { success: true, message: 'Connected successfully to Supabase Cloud Database!' };
      } catch (err) {
        throw new Error(`Supabase connection failed: ${err.message}`);
      }
    }

    throw new Error('No cloud database configured.');
  },

  // Read collection from cloud
  fetchCloudCollection: async (key) => {
    const config = getCloudConfig();
    if (!config.enabled && !cloudService.isConfigured()) return null;

    if (config.provider === 'turso') {
      try {
        const client = await getTurso();
        if (client) {
          const res = await client.execute({
            sql: 'SELECT data FROM lms_store WHERE key = ? LIMIT 1;',
            args: [key],
          });
          if (res.rows && res.rows.length > 0) {
            const raw = res.rows[0].data || res.rows[0][0];
            return typeof raw === 'string' ? JSON.parse(raw) : raw;
          }
        }
      } catch (e) {
        console.warn(`Turso fetch error for ${key}:`, e);
      }
      return null;
    }

    try {
      const client = getSupabase();
      if (client) {
        const { data, error } = await client
          .from('lms_store')
          .select('data')
          .eq('key', key)
          .single();
        if (error) return null;
        return data?.data || null;
      }
    } catch (e) {
      console.warn(`Cloud fetch error for ${key}:`, e);
    }
    return null;
  },

  // Save collection to cloud
  saveCloudCollection: async (key, data) => {
    const config = getCloudConfig();
    if (!config.enabled && !cloudService.isConfigured()) return false;

    if (config.provider === 'turso') {
      try {
        const client = await getTurso();
        if (client) {
          await client.execute({
            sql: 'INSERT OR REPLACE INTO lms_store (key, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP);',
            args: [key, JSON.stringify(data)],
          });
          return true;
        }
      } catch (e) {
        console.warn(`Turso save error for ${key}:`, e);
      }
      return false;
    }

    try {
      const client = getSupabase();
      if (client) {
        const { error } = await client.from('lms_store').upsert({
          key,
          data,
          updated_at: new Date().toISOString(),
        });
        if (error) {
          console.warn(`Cloud upsert error for ${key}:`, error);
          return false;
        }
        return true;
      }
    } catch (e) {
      console.warn(`Cloud save error for ${key}:`, e);
    }
    return false;
  },

  // Migrate all local and initial data into the cloud in 1 click
  migrateAllToCloud: async (getAllDataFn) => {
    const config = getCloudConfig();

    if (config.provider === 'turso') {
      const client = await getTurso();
      if (!client) throw new Error('Turso database is not connected. Configure credentials first.');
      const allData = await getAllDataFn();
      const entries = Object.entries(allData);
      let successCount = 0;

      for (const [key, value] of entries) {
        if (value !== undefined && value !== null) {
          await client.execute({
            sql: 'INSERT OR REPLACE INTO lms_store (key, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP);',
            args: [key, JSON.stringify(value)],
          });
          successCount++;
        }
      }
      return { success: true, count: successCount, total: entries.length };
    }

    const client = getSupabase();
    if (!client) throw new Error('Cloud database is not connected. Configure credentials first.');

    const allData = await getAllDataFn();
    const entries = Object.entries(allData);
    let successCount = 0;

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null) {
        const { error } = await client.from('lms_store').upsert({
          key,
          data: value,
          updated_at: new Date().toISOString(),
        });
        if (!error) successCount++;
      }
    }

    return { success: true, count: successCount, total: entries.length };
  },

  getSetupSQL: () => {
    return `-- Run this in your Supabase SQL Editor (Takes 5 seconds):
CREATE TABLE IF NOT EXISTS lms_store (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable public read/write for seamless multi-device persistence
ALTER TABLE lms_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON lms_store FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON lms_store FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON lms_store FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON lms_store FOR DELETE USING (true);
`;
  },
};
