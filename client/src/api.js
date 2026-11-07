// Hybrid API client for My Learning Space
// Seamlessly uses Python FastAPI backend when running locally,
// or falls back to Client-Side Storage & Gemini Engine when deployed on static hosts (Vercel, etc.)

import { clientStorage } from './clientStorage';

const API_BASE = '/api';
let useClientFallback = false;

export async function request(endpoint, options = {}) {
  if (useClientFallback) {
    throw new Error('USE_FALLBACK');
  }

  const url = `${API_BASE}${endpoint}`;
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    });
  } catch (netErr) {
    useClientFallback = true;
    throw new Error('USE_FALLBACK');
  }

  // If 404 (common on Vercel when backend isn't mounted), switch to client engine
  if (response.status === 404) {
    useClientFallback = true;
    throw new Error('USE_FALLBACK');
  }

  const rawText = await response.text();
  let data = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    let errorDetail =
      (data && (data.detail || data.message)) ||
      (rawText && rawText.length < 200 ? rawText : `Server returned status ${response.status}`);
    if (typeof errorDetail === 'object') errorDetail = JSON.stringify(errorDetail);
    throw new Error(errorDetail);
  }

  return data;
}

// Wrapper that calls backend first, and falls back to clientStorage on 404 or connection failure
function wrap(serverFn, fallbackFn) {
  return async (...args) => {
    if (useClientFallback) {
      return fallbackFn(...args);
    }
    try {
      return await serverFn(...args);
    } catch (err) {
      if (err.message === 'USE_FALLBACK' || err.message.includes('NOT_FOUND') || err.message.includes('404')) {
        useClientFallback = true;
        return fallbackFn(...args);
      }
      throw err;
    }
  };
}

export const api = {
  // Health & Settings
  getHealth: wrap(() => request('/health'), clientStorage.getHealth),
  getSettings: wrap(() => request('/settings'), clientStorage.getSettings),
  updateSettings: wrap((data) => request('/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.updateSettings),
  testGemini: wrap((apiKey) => request('/settings/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gemini_api_key: apiKey }),
  }), clientStorage.testGemini),

  // Dashboard
  getDashboard: wrap(() => request('/dashboard'), clientStorage.getDashboard),

  // Subjects
  getSubjects: wrap((params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/subjects${q ? `?${q}` : ''}`);
  }, clientStorage.getSubjects),

  createSubject: wrap((data) => request('/subjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.createSubject),

  getSubjectDetails: wrap((id) => request(`/subjects/${id}`), clientStorage.getSubjectDetails),
  updateSubject: wrap((id, data) => request(`/subjects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.updateSubject),
  deleteSubject: wrap((id) => request(`/subjects/${id}`, { method: 'DELETE' }), clientStorage.deleteSubject),

  // Study Materials
  getMaterials: wrap((subjectId) => request(`/subjects/${subjectId}/materials`), clientStorage.getMaterials),
  uploadMaterials: wrap((subjectId, files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return request(`/subjects/${subjectId}/materials/upload`, {
      method: 'POST',
      body: formData,
    });
  }, clientStorage.uploadMaterials),
  getExtractedContent: wrap((materialId) => request(`/materials/${materialId}/content`), clientStorage.getExtractedContent),
  retryMaterial: wrap((materialId) => request(`/materials/${materialId}/retry`, { method: 'POST' }), clientStorage.retryMaterial),
  deleteMaterial: wrap((materialId) => request(`/materials/${materialId}`, { method: 'DELETE' }), clientStorage.deleteMaterial),
  getDownloadUrl: (materialId) => (useClientFallback ? '#' : `/api/materials/${materialId}/download`),

  // Topics
  getTopics: wrap((subjectId) => request(`/subjects/${subjectId}/topics`), clientStorage.getTopics),
  organizeTopics: wrap((subjectId) => request(`/subjects/${subjectId}/topics/organize`, { method: 'POST' }), clientStorage.organizeTopics),
  updateTopic: wrap((topicId, data) => request(`/topics/${topicId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.updateTopic),
  deleteTopic: wrap((topicId) => request(`/topics/${topicId}`, { method: 'DELETE' }), clientStorage.deleteTopic),

  // AI Notes
  getAINotes: wrap((subjectId) => request(`/subjects/${subjectId}/notes`), clientStorage.getAINotes),
  generateAINotes: wrap((subjectId, data) => request(`/subjects/${subjectId}/notes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.generateAINotes),
  updateAINote: wrap((noteId, data) => request(`/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.updateAINote),
  deleteAINote: wrap((noteId) => request(`/notes/${noteId}`, { method: 'DELETE' }), clientStorage.deleteAINote),

  // Self Notes
  getSelfNotes: wrap((params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/self-notes${q ? `?${q}` : ''}`);
  }, clientStorage.getSelfNotes),
  createSelfNote: wrap((data) => request('/self-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.createSelfNote),
  updateSelfNote: wrap((noteId, data) => request(`/self-notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.updateSelfNote),
  deleteSelfNote: wrap((noteId) => request(`/self-notes/${noteId}`, { method: 'DELETE' }), clientStorage.deleteSelfNote),

  // Quizzes
  getQuizzes: wrap((subjectId) => request(`/subjects/${subjectId}/quizzes`), clientStorage.getQuizzes),
  generateQuiz: wrap((subjectId) => request(`/subjects/${subjectId}/quizzes/generate`, { method: 'POST' }), clientStorage.generateQuiz),
  getQuizForAttempt: wrap((quizId) => request(`/quizzes/${quizId}`), clientStorage.getQuizForAttempt),
  submitQuizAttempt: wrap((quizId, data) => request(`/quizzes/${quizId}/attempt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.submitQuizAttempt),

  // Quiz History
  getQuizHistory: wrap((subjectId) => {
    const q = subjectId ? `?subject_id=${subjectId}` : '';
    return request(`/quiz-history${q}`);
  }, clientStorage.getQuizHistory),
  getQuizAttemptReview: wrap((attemptId) => request(`/quiz-history/${attemptId}`), clientStorage.getQuizAttemptReview),

  // Study Timer
  saveStudySession: wrap((data) => request('/timer/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), clientStorage.saveStudySession),
  getRecentStudySessions: wrap(() => request('/timer/recent'), clientStorage.getRecentStudySessions),

  // Analytics
  getAnalytics: wrap(() => request('/analytics'), clientStorage.getAnalytics),

  // Search
  search: wrap((query) => request(`/search?q=${encodeURIComponent(query)}`), clientStorage.search),

  // Backup & Restore
  exportAllData: clientStorage.exportAllData,
  importAllData: clientStorage.importAllData,
};
