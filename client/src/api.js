// API client for My Learning Space backend

const API_BASE = '/api';

export async function request(endpoint, options = {}) {
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
    throw new Error(`Cannot connect to backend server: ${netErr.message}`);
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

export const api = {
  // Health & Settings
  getHealth: () => request('/health'),
  getSettings: () => request('/settings'),
  updateSettings: (data) => request('/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  testGemini: (apiKey) => request('/settings/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gemini_api_key: apiKey }),
  }),

  // Dashboard
  getDashboard: () => request('/dashboard'),

  // Subjects
  getSubjects: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/subjects${q ? `?${q}` : ''}`);
  },
  createSubject: (data) => request('/subjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  getSubjectDetails: (id) => request(`/subjects/${id}`),
  updateSubject: (id, data) => request(`/subjects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteSubject: (id) => request(`/subjects/${id}`, { method: 'DELETE' }),

  // Study Materials
  getMaterials: (subjectId) => request(`/subjects/${subjectId}/materials`),
  uploadMaterials: (subjectId, files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return request(`/subjects/${subjectId}/materials/upload`, {
      method: 'POST',
      body: formData,
    });
  },
  getExtractedContent: (materialId) => request(`/materials/${materialId}/content`),
  retryMaterial: (materialId) => request(`/materials/${materialId}/retry`, { method: 'POST' }),
  deleteMaterial: (materialId) => request(`/materials/${materialId}`, { method: 'DELETE' }),
  getDownloadUrl: (materialId) => `${API_BASE}/materials/${materialId}/download`,

  // Topics
  getTopics: (subjectId) => request(`/subjects/${subjectId}/topics`),
  organizeTopics: (subjectId) => request(`/subjects/${subjectId}/topics/organize`, { method: 'POST' }),
  updateTopic: (topicId, data) => request(`/topics/${topicId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteTopic: (topicId) => request(`/topics/${topicId}`, { method: 'DELETE' }),

  // AI Notes
  getAINotes: (subjectId) => request(`/subjects/${subjectId}/notes`),
  generateAINotes: (subjectId, data) => request(`/subjects/${subjectId}/notes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateAINote: (noteId, data) => request(`/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteAINote: (noteId) => request(`/notes/${noteId}`, { method: 'DELETE' }),

  // Self Notes
  getSelfNotes: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/self-notes${q ? `?${q}` : ''}`);
  },
  createSelfNote: (data) => request('/self-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateSelfNote: (noteId, data) => request(`/self-notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteSelfNote: (noteId) => request(`/self-notes/${noteId}`, { method: 'DELETE' }),

  // Quizzes
  getQuizzes: (subjectId) => request(`/subjects/${subjectId}/quizzes`),
  generateQuiz: (subjectId) => request(`/subjects/${subjectId}/quizzes/generate`, { method: 'POST' }),
  getQuizForAttempt: (quizId) => request(`/quizzes/${quizId}`),
  submitQuizAttempt: (quizId, data) => request(`/quizzes/${quizId}/attempt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),

  // Quiz History
  getQuizHistory: (subjectId) => {
    const q = subjectId ? `?subject_id=${subjectId}` : '';
    return request(`/quiz-history${q}`);
  },
  getQuizAttemptReview: (attemptId) => request(`/quiz-history/${attemptId}`),

  // Study Timer
  saveStudySession: (data) => request('/timer/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  getRecentStudySessions: () => request('/timer/recent'),

  // Analytics
  getAnalytics: () => request('/analytics'),

  // Search
  search: (query) => request(`/search?q=${encodeURIComponent(query)}`),
};
