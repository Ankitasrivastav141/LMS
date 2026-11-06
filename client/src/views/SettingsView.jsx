import React, { useState, useEffect } from 'react';
import { Settings, Key, Sparkles, Check, AlertCircle, Loader2, Save, ShieldCheck, Clock } from 'lucide-react';
import { api } from '../api';

export default function SettingsView() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newApiKey, setNewApiKey] = useState('');
  const [preferredModel, setPreferredModel] = useState('gemini-3.5-flash-lite');
  const [timerDefault, setTimerDefault] = useState(25);
  const [pomodoroStudy, setPomodoroStudy] = useState(25);
  const [pomodoroShort, setPomodoroShort] = useState(5);
  const [pomodoroLong, setPomodoroLong] = useState(15);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // { loading, success, message }

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await api.getSettings();
      setSettings(data);
      if (data.preferred_model) setPreferredModel(data.preferred_model);
      if (data.default_timer_minutes) setTimerDefault(data.default_timer_minutes);
      if (data.pomodoro_study_minutes) setPomodoroStudy(data.pomodoro_study_minutes);
      if (data.pomodoro_short_break) setPomodoroShort(data.pomodoro_short_break);
      if (data.pomodoro_long_break) setPomodoroLong(data.pomodoro_long_break);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestKey = async () => {
    const keyToTest = newApiKey.trim();
    if (!keyToTest && !settings?.gemini_api_key_configured) {
      setTestStatus({
        loading: false,
        success: false,
        message: "Please paste your Gemini API key in the 'Update / Change Gemini API Key' field below first, then click Test Connection.",
      });
      return;
    }
    setTestStatus({ loading: true, message: 'Testing connection to Google Gemini API...' });
    try {
      const res = await api.testGemini(keyToTest || undefined);
      setTestStatus({ success: true, message: res.message || 'Connected successfully!' });
    } catch (err) {
      setTestStatus({ success: false, message: err.message });
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const payload = {
        preferred_model: preferredModel,
        default_timer_minutes: timerDefault,
        pomodoro_study_minutes: pomodoroStudy,
        pomodoro_short_break: pomodoroShort,
        pomodoro_long_break: pomodoroLong,
      };
      if (newApiKey.trim()) {
        payload.gemini_api_key = newApiKey.trim();
      }
      await api.updateSettings(payload);
      setSaveSuccess(true);
      setNewApiKey('');
      loadSettings();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(`Failed to save settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-[#94A3B8] animate-pulse">Loading settings...</div>;
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#191A23]">Application Settings</h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Configure Google Gemini AI credentials, default study timer preferences, and security options.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Gemini API Security Card */}
        <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F1F5F9]">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#E52521] flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#191A23]">Google Gemini API Configuration</h2>
              <p className="text-xs text-[#64748B]">Securely stored in backend persistent database</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">
                Current Configured Key
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  disabled
                  value={settings?.gemini_api_key_configured ? '●●●●●●●●●●●●●●●● (Configured & Protected)' : 'No API key configured (Enter your key below)'}
                  className="w-full max-w-md px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-mono text-[#64748B]"
                />
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={testStatus?.loading}
                  className="px-4 py-2 bg-[#191A23] hover:bg-black text-white rounded-xl text-xs font-bold transition-all shrink-0 btn-bounce"
                >
                  {testStatus?.loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Test Connection'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">
                Update / Change Gemini API Key
              </label>
              <input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Paste your Gemini API Key here (starts with AQ...)"
                className="w-full max-w-md px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-mono text-[#191A23] outline-none focus:border-[#E52521]"
              />
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Keys are never sent or exposed to anyone in plain text. Click "Save All Preferences" below after entering.
              </p>
            </div>

            {testStatus && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                  testStatus.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : testStatus.loading
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {testStatus.success ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : testStatus.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{testStatus.message}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">
                Preferred Gemini Model
              </label>
              <select
                value={preferredModel}
                onChange={(e) => setPreferredModel(e.target.value)}
                className="w-full max-w-md bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#191A23] px-3.5 py-2.5 outline-none cursor-pointer"
              >
                <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (Fast & High Reliability - Recommended)</option>
                <option value="gemini-3.1-flash-lite-preview">gemini-3.1-flash-lite-preview</option>
                <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                <option value="gemini-flash-latest">gemini-flash-latest</option>
              </select>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Our backend automatically uses graceful multi-tier fallback if a model experiences temporary high demand.
              </p>
            </div>
          </div>
        </div>

        {/* Study Timer Preferences Card */}
        <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F1F5F9]">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#191A23]">Study Timer Defaults</h2>
              <p className="text-xs text-[#64748B]">Set your favorite default durations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">Default Focus (Minutes)</label>
              <input
                type="number"
                value={timerDefault}
                onChange={(e) => setTimerDefault(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#191A23] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">Pomodoro Study (Minutes)</label>
              <input
                type="number"
                value={pomodoroStudy}
                onChange={(e) => setPomodoroStudy(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#191A23] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">Short Break (Minutes)</label>
              <input
                type="number"
                value={pomodoroShort}
                onChange={(e) => setPomodoroShort(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#191A23] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#191A23] mb-1">Long Break (Minutes)</label>
              <input
                type="number"
                value={pomodoroLong}
                onChange={(e) => setPomodoroLong(parseInt(e.target.value) || 15)}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#191A23] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-7 py-3 rounded-2xl font-bold text-xs shadow-playful-red transition-all btn-bounce disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save All Preferences'}</span>
          </button>
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
