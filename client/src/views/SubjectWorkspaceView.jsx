import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  FileText,
  Sparkles,
  Edit3,
  HelpCircle,
  BarChart2,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Printer,
  Search,
  Save,
  Send,
  Loader2,
  RotateCcw,
  CheckSquare,
  Square,
  Star,
  Layers,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../api';

export default function SubjectWorkspaceView({ subjectId, initialTab = 'overview', onBack }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tabs state
  const [materials, setMaterials] = useState([]);
  const [topics, setTopics] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [selfNotes, setSelfNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Extracted slides modal
  const [viewingMaterial, setViewingMaterial] = useState(null);
  const [extractedSlides, setExtractedSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(false);

  // AI Generation states
  const [organizingTopics, setOrganizingTopics] = useState(false);
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteEditMode, setNoteEditMode] = useState(false);
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [noteSearchQuery, setNoteSearchQuery] = useState('');

  // Self note states
  const [activeSelfNote, setActiveSelfNote] = useState(null);
  const [selfNoteTitle, setSelfNoteTitle] = useState('');
  const [selfNoteContent, setSelfNoteContent] = useState('');
  const [selfNoteSavedStatus, setSelfNoteSavedStatus] = useState('Saved');
  const [selfNoteMode, setSelfNoteMode] = useState('edit'); // 'edit' | 'preview'
  const [selfNoteCopied, setSelfNoteCopied] = useState(false);
  const autosaveTimerRef = useRef(null);
  const selfNoteTextareaRef = useRef(null);

  // Quiz Attempt states
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAttempt, setQuizAttempt] = useState(null); // active quiz loaded with questions
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // q_id -> option_idx
  const [quizTimer, setQuizTimer] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // attempt review
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    loadAllSubjectData();
  }, [subjectId]);

  // Quiz active timer ticker
  useEffect(() => {
    let interval = null;
    if (quizAttempt && !quizSubmitted) {
      interval = setInterval(() => {
        setQuizTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizAttempt, quizSubmitted]);

  const loadAllSubjectData = async () => {
    setLoading(true);
    try {
      const [subData, matData, topData, noteData, sNoteData, qzData] = await Promise.all([
        api.getSubjectDetails(subjectId),
        api.getMaterials(subjectId),
        api.getTopics(subjectId),
        api.getAINotes(subjectId),
        api.getSelfNotes({ subject_id: subjectId }),
        api.getQuizzes(subjectId),
      ]);
      setSubject(subData);
      setMaterials(matData);
      setTopics(topData);
      setAiNotes(noteData);
      if (noteData.length > 0 && !selectedNote) {
        setSelectedNote(noteData[0]);
        setEditedNoteContent(noteData[0].content);
      }
      setSelfNotes(sNoteData);
      if (sNoteData.length > 0 && !activeSelfNote) {
        setActiveSelfNote(sNoteData[0]);
        setSelfNoteTitle(sNoteData[0].title);
        setSelfNoteContent(sNoteData[0].content);
      }
      setQuizzes(qzData);
    } catch (err) {
      console.error('Error loading subject data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- MATERIALS ----------------
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    try {
      await api.uploadMaterials(subjectId, files);
      // reload materials list
      const updated = await api.getMaterials(subjectId);
      setMaterials(updated);
      // Poll a few times for extraction completion
      pollMaterialsStatus();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const pollMaterialsStatus = () => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const mats = await api.getMaterials(subjectId);
      setMaterials(mats);
      const stillProcessing = mats.some((m) => m.processing_status === 'processing' || m.processing_status === 'uploaded');
      if (!stillProcessing || attempts > 10) {
        clearInterval(interval);
        // refresh subject progress
        const sub = await api.getSubjectDetails(subjectId);
        setSubject(sub);
      }
    }, 2000);
  };

  const handleViewContent = async (mat) => {
    setViewingMaterial(mat);
    setLoadingSlides(true);
    try {
      const slides = await api.getExtractedContent(mat.id);
      setExtractedSlides(slides);
    } catch (err) {
      alert(`Error loading slides: ${err.message}`);
    } finally {
      setLoadingSlides(false);
    }
  };

  const handleRetryMaterial = async (matId) => {
    try {
      await api.retryMaterial(matId);
      pollMaterialsStatus();
    } catch (err) {
      alert(`Retry failed: ${err.message}`);
    }
  };

  const handleDeleteMaterial = async (matId) => {
    if (!confirm('Are you sure you want to delete this file? Extracted content will be removed.')) return;
    try {
      await api.deleteMaterial(matId);
      setMaterials(materials.filter((m) => m.id !== matId));
      loadAllSubjectData();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // ---------------- AI TOPIC ORGANIZATION ----------------
  const handleOrganizeTopics = async () => {
    setOrganizingTopics(true);
    try {
      const res = await api.organizeTopics(subjectId);
      setTopics(res.topics);
      alert(`Success: ${res.message}`);
      loadAllSubjectData();
    } catch (err) {
      alert(`AI Topic Organization failed: ${err.message}`);
    } finally {
      setOrganizingTopics(false);
    }
  };

  const handleToggleTopicCompletion = async (top) => {
    const nextStatus = top.is_completed === 1 ? 0 : 1;
    try {
      await api.updateTopic(top.id, { is_completed: nextStatus });
      setTopics(topics.map((t) => (t.id === top.id ? { ...t, is_completed: nextStatus } : t)));
      // update subject progress
      const sub = await api.getSubjectDetails(subjectId);
      setSubject(sub);
    } catch (err) {
      console.error('Failed to toggle topic:', err);
    }
  };

  // ---------------- AI NOTES ----------------
  const handleGenerateNotes = async (topicId = null, customTitle = null, materialId = null, filename = null) => {
    setGeneratingNotes(true);
    try {
      const newNote = await api.generateAINotes(subjectId, {
        topic_id: topicId,
        custom_title: customTitle,
        material_id: materialId,
        filename: filename,
      });
      const updatedNotes = await api.getAINotes(subjectId);
      setAiNotes(updatedNotes);
      setSelectedNote(newNote);
      setEditedNoteContent(newNote.content);
      alert(`AI Notes generated successfully for "${newNote.title}"!`);
    } catch (err) {
      alert(`AI Notes generation failed: ${err.message}`);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const handleGenerateNotesForMaterial = async (mat) => {
    setGeneratingNotes(true);
    try {
      const cleanName = mat.filename.replace(/\.[^/.]+$/, '');
      const newNote = await api.generateAINotes(subjectId, {
        material_id: mat.id,
        filename: mat.filename,
        custom_title: `Notes: ${cleanName}`,
      });
      const updatedNotes = await api.getAINotes(subjectId);
      setAiNotes(updatedNotes);
      setSelectedNote(newNote);
      setEditedNoteContent(newNote.content);
      setActiveTab('ai-notes');
      alert(`AI Notes generated specifically for "${mat.filename}"!`);
    } catch (err) {
      alert(`Failed to generate notes for ${mat.filename}: ${err.message}`);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const handleGenerateAllPPTNotes = async () => {
    if (materials.length === 0) {
      alert('Please upload PPT files first.');
      return;
    }
    setGeneratingNotes(true);
    let successCount = 0;
    try {
      for (const mat of materials) {
        const cleanName = mat.filename.replace(/\.[^/.]+$/, '');
        await api.generateAINotes(subjectId, {
          material_id: mat.id,
          filename: mat.filename,
          custom_title: `Notes: ${cleanName}`,
        });
        successCount++;
      }
      const updatedNotes = await api.getAINotes(subjectId);
      setAiNotes(updatedNotes);
      if (updatedNotes.length > 0) {
        setSelectedNote(updatedNotes[0]);
        setEditedNoteContent(updatedNotes[0].content);
      }
      setActiveTab('ai-notes');
      alert(`Successfully generated ${successCount} separate AI notes for each uploaded presentation!`);
    } catch (err) {
      alert(`Batch generation failed: ${err.message}`);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const handleSaveEditedNote = async () => {
    if (!selectedNote) return;
    try {
      await api.updateAINote(selectedNote.id, { content: editedNoteContent });
      setSelectedNote({ ...selectedNote, content: editedNoteContent });
      setNoteEditMode(false);
      alert('Notes saved successfully!');
    } catch (err) {
      alert(`Failed to save note: ${err.message}`);
    }
  };

  const handleDeleteAINote = async (noteId) => {
    if (!confirm('Are you sure you want to delete this AI note?')) return;
    try {
      await api.deleteAINote(noteId);
      const remaining = aiNotes.filter((n) => n.id !== noteId);
      setAiNotes(remaining);
      setSelectedNote(remaining.length > 0 ? remaining[0] : null);
    } catch (err) {
      alert(`Failed to delete note: ${err.message}`);
    }
  };

  // ---------------- SELF NOTES ----------------
  const handleCreateNewSelfNote = async () => {
    try {
      const res = await api.createSelfNote({
        subject_id: subjectId,
        title: 'Untitled Note',
        content: '',
      });
      const updated = await api.getSelfNotes({ subject_id: subjectId });
      setSelfNotes(updated);
      const created = updated.find((n) => n.id === res.id) || updated[0];
      setActiveSelfNote(created);
      setSelfNoteTitle(created.title);
      setSelfNoteContent(created.content);
      setSelfNoteSavedStatus('Saved');
      setSelfNoteMode('edit');
    } catch (err) {
      alert(`Error creating note: ${err.message}`);
    }
  };

  const triggerSelfNoteAutosave = (newTitle, newContent) => {
    setSelfNoteSavedStatus('Saving...');
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(async () => {
      if (!activeSelfNote) return;
      try {
        await api.updateSelfNote(activeSelfNote.id, {
          title: newTitle,
          content: newContent,
        });
        setSelfNoteSavedStatus('Saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setSelfNotes((prev) =>
          prev.map((n) => (n.id === activeSelfNote.id ? { ...n, title: newTitle, content: newContent } : n))
        );
      } catch (err) {
        setSelfNoteSavedStatus('Error saving');
      }
    }, 500);
  };

  const handleSaveSelfNoteNow = async () => {
    if (!activeSelfNote) return;
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    setSelfNoteSavedStatus('Saving...');
    try {
      await api.updateSelfNote(activeSelfNote.id, {
        title: selfNoteTitle,
        content: selfNoteContent,
      });
      setSelfNoteSavedStatus('Saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSelfNotes((prev) =>
        prev.map((n) => (n.id === activeSelfNote.id ? { ...n, title: selfNoteTitle, content: selfNoteContent } : n))
      );
    } catch (err) {
      setSelfNoteSavedStatus('Error saving');
    }
  };

  const insertSelfNoteFormatting = (prefix, suffix = '') => {
    const textarea = selfNoteTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = selfNoteContent;
    const selected = current.substring(start, end);
    const replacement = prefix + selected + suffix;
    const newContent = current.substring(0, start) + replacement + current.substring(end);
    setSelfNoteContent(newContent);
    triggerSelfNoteAutosave(selfNoteTitle, newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleDeleteSelfNote = async (noteId) => {
    if (!confirm('Delete this self note?')) return;
    try {
      await api.deleteSelfNote(noteId);
      const remaining = selfNotes.filter((n) => n.id !== noteId);
      setSelfNotes(remaining);
      if (remaining.length > 0) {
        setActiveSelfNote(remaining[0]);
        setSelfNoteTitle(remaining[0].title);
        setSelfNoteContent(remaining[0].content);
      } else {
        setActiveSelfNote(null);
        setSelfNoteTitle('');
        setSelfNoteContent('');
      }
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  // ---------------- QUIZ ----------------
  const handleGenerateQuiz = async (materialId = null) => {
    setGeneratingQuiz(true);
    try {
      const res = await api.generateQuiz(subjectId, materialId ? { material_id: materialId } : {});
      alert(`10-MCQ Practice Quiz created successfully from your lecture topics!`);
      const updatedList = await api.getQuizzes(subjectId);
      setQuizzes(updatedList);
      // Auto-launch quiz
      handleStartQuiz(res.quiz_id);
    } catch (err) {
      alert(`Failed to generate quiz: ${err.message}`);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const handleStartQuiz = async (quizId) => {
    try {
      const qz = await api.getQuizForAttempt(quizId);
      setActiveQuiz(qz);
      setQuizAttempt(qz);
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setQuizTimer(0);
      setQuizSubmitted(false);
      setQuizResult(null);
    } catch (err) {
      alert(`Error loading quiz: ${err.message}`);
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    setShowSubmitConfirm(false);
    try {
      const res = await api.submitQuizAttempt(quizAttempt.id, {
        answers: selectedAnswers,
        time_taken_seconds: quizTimer,
      });

      // Fetch full review of this attempt
      const review = await api.getQuizAttemptReview(res.attempt_id);
      setQuizResult(review);
      setQuizSubmitted(true);

      // Confetti celebratory burst if >= 70%
      if (res.percentage >= 70) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E52521', '#FDB813', '#191A23'],
        });
      }

      // refresh subject
      loadAllSubjectData();
    } catch (err) {
      alert(`Error submitting quiz: ${err.message}`);
    }
  };

  if (loading || !subject) {
    return (
      <div className="p-8 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-40 bg-[#F1F5F9] rounded-3xl w-full"></div>
        <div className="h-96 bg-[#F1F5F9] rounded-3xl w-full"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'materials', label: 'Study Materials', icon: FileText, count: materials.length },
    { id: 'ai-notes', label: 'AI Notes', icon: Sparkles, count: aiNotes.length },
    { id: 'self-notes', label: 'Self Notes', icon: Edit3, count: selfNotes.length },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, count: quizzes.length },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Subject Header Banner */}
      <div className="bg-white border border-[#E8ECF2] p-6 rounded-3xl shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-[#F8F9FA] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#191A23] transition-colors"
              title="Back to Subjects"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: subject.color || '#E52521' }}
            >
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#64748B] bg-[#F8F9FA] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                  MBA Workspace
                </span>
                <span className="text-xs font-bold text-[#E52521]">{subject.progress}% Complete</span>
              </div>
              <h1 className="text-2xl font-black text-[#191A23] mt-0.5">{subject.name}</h1>
              {subject.description && (
                <p className="text-xs text-[#64748B] mt-0.5 max-w-xl line-clamp-1">{subject.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('materials')}
              className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-playful-red transition-all btn-bounce"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PPTs</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.max(4, subject.progress)}%`,
              backgroundColor: subject.color || '#E52521',
            }}
          ></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#F1F5F9] overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs rounded-xl transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#191A23] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#191A23] hover:bg-[#F8F9FA]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FDB813]' : 'text-[#64748B]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Study Materials</span>
              <p className="text-2xl font-black text-[#191A23] mt-1">{materials.length}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">PPT / PDF / DOCX</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">AI Notes Generated</span>
              <p className="text-2xl font-black text-[#191A23] mt-1">{aiNotes.length}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">Comprehensive guides</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Quizzes Taken</span>
              <p className="text-2xl font-black text-[#191A23] mt-1">{subject.quiz_count || 0}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">10-MCQ attempts</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Study Time</span>
              <p className="text-2xl font-black text-[#191A23] mt-1">
                {Math.round((subject.study_seconds || 0) / 60)} mins
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-1">Active logged time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-[#191A23]">Quick Subject Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('materials')}
                  className="w-full text-left p-3 rounded-xl bg-[#F8F9FA] hover:bg-red-50 hover:text-[#E52521] border border-[#E8ECF2] flex items-center justify-between text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#E52521]" /> Upload Lecture Presentations
                  </span>
                  <span>&rarr;</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ai-notes');
                    handleOrganizeTopics();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[#F8F9FA] hover:bg-amber-50 hover:text-[#B45309] border border-[#E8ECF2] flex items-center justify-between text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FDB813]" /> Organize Topics with AI
                  </span>
                  <span>&rarr;</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ai-notes');
                    handleGenerateNotes();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[#F8F9FA] hover:bg-rose-50 hover:text-rose-600 border border-[#E8ECF2] flex items-center justify-between text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E52521]" /> Generate AI Notes
                  </span>
                  <span>&rarr;</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    handleGenerateQuiz();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[#F8F9FA] hover:bg-emerald-50 hover:text-emerald-600 border border-[#E8ECF2] flex items-center justify-between text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-500" /> Generate 10-MCQ Quiz
                  </span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Topics Overview */}
            <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-[#191A23]">Curriculum Topics</h3>
                <span className="text-xs font-semibold text-[#64748B]">
                  {subject.completed_topics || 0} of {subject.total_topics || 0} completed
                </span>
              </div>

              {topics.length === 0 ? (
                <div className="text-center py-10 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#E2E8F0]">
                  <p className="text-xs font-bold text-[#191A23]">No topics organized yet</p>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    Upload your lecture PPTs, then click "Organize Topics with AI" to synthesize the syllabus.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {topics.map((top) => (
                    <div
                      key={top.id}
                      onClick={() => handleToggleTopicCompletion(top)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        top.is_completed === 1 ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#F8F9FA] border-[#E8ECF2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {top.is_completed === 1 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded border-2 border-[#CBD5E1] shrink-0" />
                        )}
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              top.is_completed === 1 ? 'line-through text-[#64748B]' : 'text-[#191A23]'
                            }`}
                          >
                            {top.title}
                          </p>
                          {top.description && (
                            <p className="text-[11px] text-[#64748B] line-clamp-1">{top.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#94A3B8]">Topic #{top.sequence_order}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: STUDY MATERIALS ================= */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-[#E52521] bg-red-50/40'
                : 'border-[#CBD5E1] hover:border-[#E52521] bg-white hover:bg-[#FFFDF9]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pptx,.ppt,.pdf,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            <div className="w-14 h-14 bg-red-50 text-[#E52521] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              {uploading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Upload className="w-7 h-7" />}
            </div>
            <h3 className="font-extrabold text-base text-[#191A23]">
              {uploading ? 'Uploading and Processing Documents...' : 'Drag & Drop Lecture Materials Here'}
            </h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              Upload multiple <strong>PPTX</strong>, <strong>PPT</strong>, <strong>PDF</strong>, or{' '}
              <strong>DOCX</strong> files simultaneously. Slide titles, text, and tables will be extracted automatically.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#F8F9FA] border border-[#E2E8F0] px-3 py-1.5 rounded-xl text-xs font-bold text-[#191A23]">
              <span>Or click to browse from your computer</span>
            </div>
          </div>

          {uploadError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#E52521]" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Uploaded Documents List */}
          <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#191A23]">Uploaded Study Materials ({materials.length})</h3>
                <p className="text-xs text-[#64748B]">Persistent repository connected to database</p>
              </div>
            </div>

            {materials.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#94A3B8]">
                No files uploaded yet for this subject. Upload your PPTs above.
              </div>
            ) : (
              <div className="divide-y divide-[#F1F5F9]">
                {materials.map((mat) => {
                  const sizeMb = (mat.file_size / (1024 * 1024)).toFixed(2);
                  const isProcessing = mat.processing_status === 'processing' || mat.processing_status === 'uploaded';
                  const isProcessed = mat.processing_status === 'processed';
                  const isFailed = mat.processing_status === 'failed';

                  return (
                    <div key={mat.id} className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F9FC] transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E52521] flex items-center justify-center font-black text-xs shrink-0">
                          {mat.file_type.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#191A23]">{mat.filename}</span>
                            {isProcessed && (
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> Processed ({mat.slide_count} slides)
                              </span>
                            )}
                            {isProcessing && (
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                                <Loader2 className="w-3 h-3 animate-spin" /> Extracting Content...
                              </span>
                            )}
                            {isFailed && (
                              <span className="text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Failed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#64748B] mt-0.5">
                            {sizeMb} MB • Uploaded {new Date(mat.upload_date).toLocaleDateString()}
                            {mat.error_message && <span className="text-red-500 ml-2">({mat.error_message})</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {isProcessed && (
                          <button
                            onClick={() => handleGenerateNotesForMaterial(mat)}
                            disabled={generatingNotes}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-[#B45309] transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                            title="Generate AI Notes specifically for this presentation"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                            <span>Notes</span>
                          </button>
                        )}
                        {isProcessed && (
                          <button
                            onClick={() => {
                              setActiveTab('quiz');
                              handleGenerateQuiz(mat.id);
                            }}
                            disabled={generatingQuiz}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-purple-700 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                            title="Generate 10 MCQ Practice Quiz specifically from this presentation"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                            <span>Quiz</span>
                          </button>
                        )}
                        {isProcessed && (
                          <button
                            onClick={() => handleViewContent(mat)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] text-xs font-bold text-[#191A23] transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#64748B]" />
                            <span>View Content</span>
                          </button>
                        )}
                        {isFailed && (
                          <button
                            onClick={() => handleRetryMaterial(mat.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-bold text-[#E52521] transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Retry</span>
                          </button>
                        )}
                        <a
                          href={api.getDownloadUrl(mat.id)}
                          download={mat.filename}
                          className="p-2 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] transition-colors"
                          title="Download original file"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteMaterial(mat.id)}
                          className="p-2 rounded-xl bg-[#F8F9FA] hover:bg-red-50 text-[#64748B] hover:text-[#E52521] transition-colors"
                          title="Delete material"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* VIEW EXTRACTED SLIDES MODAL */}
          {viewingMaterial && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                  <div>
                    <h3 className="font-extrabold text-base text-[#191A23]">{viewingMaterial.filename}</h3>
                    <p className="text-xs text-[#64748B]">Extracted Slide Content ({extractedSlides.length} items)</p>
                  </div>
                  <button onClick={() => setViewingMaterial(null)} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#94A3B8]">
                    &times;
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loadingSlides ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-[#E52521] mx-auto" />
                      <p className="text-xs text-[#64748B] mt-2">Loading extracted content...</p>
                    </div>
                  ) : extractedSlides.length === 0 ? (
                    <div className="text-center py-12 text-xs text-[#94A3B8]">No content extracted for this file.</div>
                  ) : (
                    extractedSlides.map((slide) => (
                      <div key={slide.id} className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E8ECF2] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#E52521] uppercase tracking-wider">
                            Slide {slide.item_index}: {slide.title}
                          </span>
                        </div>
                        <pre className="text-xs font-sans text-[#334155] whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-xl border border-[#E2E8F0]">
                          {slide.content || '(No text content detected on slide)'}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: AI NOTES & TOPIC EXPLORER ================= */}
      {activeTab === 'ai-notes' && (
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#E8ECF2] shadow-xs">
            <div>
              <h2 className="font-extrabold text-base text-[#191A23]">AI Learning Notes & Topic Explorer</h2>
              <p className="text-xs text-[#64748B]">
                Synthesized syllabus and structured MBA notes grounded strictly in your uploaded slides.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleOrganizeTopics}
                disabled={organizingTopics || materials.length === 0}
                className="flex items-center gap-2 bg-[#FDB813] hover:bg-[#F59E0B] text-black px-3.5 py-2 rounded-xl font-bold text-xs shadow-playful-yellow transition-all btn-bounce disabled:opacity-50"
              >
                {organizingTopics ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{organizingTopics ? 'Organizing Topics...' : 'Organize Topics with AI'}</span>
              </button>

              {materials.length > 0 && (
                <button
                  onClick={handleGenerateAllPPTNotes}
                  disabled={generatingNotes}
                  className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-300 px-3.5 py-2 rounded-xl font-bold text-xs transition-all btn-bounce disabled:opacity-50"
                  title="Create individual AI study notes for every uploaded PPT presentation"
                >
                  {generatingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-[#B45309]" />}
                  <span>Generate Notes for All PPTs ({materials.length})</span>
                </button>
              )}

              <button
                onClick={() => handleGenerateNotes(null, `${subject.name} - Complete MBA Notes`)}
                disabled={generatingNotes || materials.length === 0}
                className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-playful-red transition-all btn-bounce disabled:opacity-50"
              >
                {generatingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{generatingNotes ? 'Generating Notes...' : 'Combined Notes'}</span>
              </button>
            </div>
          </div>

          {materials.length > 0 && (
            <div className="bg-[#FFFDF9] border border-amber-200 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold text-[#191A23]">Generate notes for a specific presentation:</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  defaultValue=""
                  className="bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#191A23] outline-none cursor-pointer"
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const mat = materials.find((m) => m.id === e.target.value);
                    if (mat) {
                      handleGenerateNotesForMaterial(mat);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Choose a PPT presentation...</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      📄 {m.filename}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 4 Cols: Topic Explorer & Notes List */}
            <div className="lg:col-span-4 space-y-6">
              {/* Topic Explorer Accordion */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#FDB813]" /> Topic Explorer ({topics.length})
                  </h3>
                </div>

                {topics.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#94A3B8] bg-[#F8F9FA] rounded-2xl border border-dashed border-[#E2E8F0]">
                    Upload PPTs and click "Organize Topics with AI" to identify core syllabus concepts.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {topics.map((t) => (
                      <div key={t.id} className="p-3 bg-[#F8F9FA] rounded-2xl border border-[#E8ECF2] space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleToggleTopicCompletion(t)}
                            className="flex items-center gap-2 font-bold text-[#191A23] hover:text-[#E52521] text-left"
                          >
                            {t.is_completed === 1 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded border border-[#CBD5E1] shrink-0" />
                            )}
                            <span className={t.is_completed === 1 ? 'line-through text-[#64748B]' : ''}>
                              {t.sequence_order}. {t.title}
                            </span>
                          </button>

                          <button
                            onClick={() => handleGenerateNotes(t.id, t.title)}
                            disabled={generatingNotes}
                            className="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-[#E52521] rounded-lg text-[10px] font-bold"
                            title="Generate dedicated notes for this topic"
                          >
                            AI Notes
                          </button>
                        </div>
                        {t.description && <p className="text-[11px] text-[#64748B]">{t.description}</p>}
                        {t.subtopics?.length > 0 && (
                          <div className="pl-3 border-l-2 border-[#CBD5E1] space-y-0.5">
                            {t.subtopics.map((st, i) => (
                              <p key={i} className="text-[10px] text-[#475569]">
                                • {st}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Generated AI Notes List */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-3">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E52521]" /> Saved AI Notes ({aiNotes.length})
                </h3>

                {aiNotes.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#94A3B8] bg-[#F8F9FA] rounded-2xl border border-dashed border-[#E2E8F0]">
                    No notes generated yet. Click "Generate AI Notes" above.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                    {aiNotes.map((n) => {
                      const isSelected = selectedNote?.id === n.id;
                      return (
                        <div
                          key={n.id}
                          onClick={() => {
                            setSelectedNote(n);
                            setEditedNoteContent(n.content);
                            setNoteEditMode(false);
                          }}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#191A23] text-white border-[#191A23] shadow-xs'
                              : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E8ECF2] text-[#191A23]'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-xs font-bold truncate">{n.title}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              {n.source_files && n.source_files.length === 1 && (
                                <span className="text-[9px] font-bold bg-amber-500/15 text-amber-700 px-1.5 py-0.5 rounded border border-amber-500/30 truncate max-w-[150px]">
                                  📄 {n.source_files[0]}
                                </span>
                              )}
                              <p className={`text-[10px] ${isSelected ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                                v{n.version} • {new Date(n.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAINote(n.id);
                            }}
                            className={`p-1 rounded-lg ${
                              isSelected ? 'text-white/60 hover:text-white' : 'text-[#94A3B8] hover:text-[#E52521]'
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right 8 Cols: Comprehensive Notes Reading & Editing Pane */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs overflow-hidden flex flex-col min-h-[600px]">
              {selectedNote ? (
                <>
                  {/* Notes Top Toolbar */}
                  <div className="p-4.5 border-b border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9]">
                    <div className="min-w-0">
                      <h2 className="font-black text-lg text-[#191A23] truncate">{selectedNote.title}</h2>
                      <p className="text-[11px] text-[#64748B]">
                        Grounded in actual uploaded lecture slides • Version {selectedNote.version}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedNote.content);
                          alert('Notes copied to clipboard!');
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#475569] flex items-center gap-1.5 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#475569] flex items-center gap-1.5 transition-colors"
                        title="Print / Save PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>

                      {noteEditMode ? (
                        <button
                          onClick={handleSaveEditedNote}
                          className="px-3 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setNoteEditMode(true)}
                          className="px-3 py-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-xs font-bold text-[#191A23] flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Notes</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notes Reader / Editor */}
                  <div className="p-8 flex-1 overflow-y-auto">
                    {noteEditMode ? (
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-[#64748B]">Markdown Editor Mode:</p>
                        <textarea
                          value={editedNoteContent}
                          onChange={(e) => setEditedNoteContent(e.target.value)}
                          rows={24}
                          className="w-full p-4 font-mono text-xs leading-relaxed bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#E52521]"
                        />
                      </div>
                    ) : (
                      <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#191A23] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-[#334155] prose-li:text-[#334155] prose-table:border prose-table:border-[#E2E8F0] prose-th:bg-[#F8F9FA] prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-[#E2E8F0]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedNote.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#94A3B8]">
                  <Sparkles className="w-12 h-12 text-[#E52521]/30 mb-3" />
                  <h3 className="font-bold text-base text-[#191A23]">No Note Selected</h3>
                  <p className="text-xs max-w-sm mt-1">
                    Select a generated note from the left sidebar or click "Generate AI Notes" to produce structured study notes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SELF NOTES ================= */}
      {activeTab === 'self-notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
          {/* Notes list */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-5 space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#191A23]">Personal Notes</h3>
                <p className="text-[11px] text-[#64748B]">Manual MBA takeaways & synthesis</p>
              </div>
              <button
                onClick={handleCreateNewSelfNote}
                className="flex items-center gap-1 bg-[#E52521] hover:bg-[#C51916] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-playful-red btn-bounce"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {selfNotes.length === 0 ? (
                <div className="text-center py-10 text-xs text-[#94A3B8]">
                  No self notes yet. Click "+ New" to start writing your personal lecture notes.
                </div>
              ) : (
                selfNotes.map((note) => {
                  const isSelected = activeSelfNote?.id === note.id;
                  return (
                    <div
                      key={note.id}
                      onClick={() => {
                        setActiveSelfNote(note);
                        setSelfNoteTitle(note.title);
                        setSelfNoteContent(note.content);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#191A23] text-white border-[#191A23] shadow-xs'
                          : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E8ECF2] text-[#191A23]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold truncate">{note.title}</p>
                        <p className={`text-[10px] ${isSelected ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Updated {note.updated_at ? new Date(note.updated_at).toLocaleDateString() : 'Just now'}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSelfNote(note.id);
                        }}
                        className={`p-1 rounded-lg ${
                          isSelected ? 'text-white/60 hover:text-white' : 'text-[#94A3B8] hover:text-[#E52521]'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Note Editor Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 flex flex-col space-y-4">
            {activeSelfNote ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                  <input
                    type="text"
                    value={selfNoteTitle}
                    onChange={(e) => {
                      setSelfNoteTitle(e.target.value);
                      triggerSelfNoteAutosave(e.target.value, selfNoteContent);
                    }}
                    placeholder="Note title..."
                    className="font-extrabold text-xl text-[#191A23] bg-transparent border-none outline-none flex-1 placeholder:text-[#CBD5E1]"
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleSaveSelfNoteNow}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#E52521] text-xs font-bold transition-all cursor-pointer shadow-xs"
                      title="Save note now"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`# ${selfNoteTitle}\n\n${selfNoteContent}`);
                        setSelfNoteCopied(true);
                        setTimeout(() => setSelfNoteCopied(false), 2000);
                      }}
                      className="p-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] transition-colors cursor-pointer"
                      title="Copy note"
                    >
                      {selfNoteCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] bg-[#F8F9FA] px-2.5 py-1 rounded-xl border border-[#E8ECF2]">
                      <span className={`w-2 h-2 rounded-full ${selfNoteSavedStatus.startsWith('Saved') ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                      <span>{selfNoteSavedStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="flex items-center justify-between gap-2 bg-[#F8F9FA] p-2 rounded-2xl border border-[#E8ECF2] flex-wrap">
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('# ')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-black text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('## ')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-black text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      H2
                    </button>
                    <span className="w-px h-4 bg-[#CBD5E1] mx-1"></span>
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('**', '**')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('*', '*')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs italic font-bold text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      I
                    </button>
                    <span className="w-px h-4 bg-[#CBD5E1] mx-1"></span>
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('- ')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSelfNoteFormatting('`', '`')}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-mono text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      Code
                    </button>
                  </div>

                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#E2E8F0]">
                    <button
                      type="button"
                      onClick={() => setSelfNoteMode('edit')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selfNoteMode === 'edit'
                          ? 'bg-[#191A23] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#191A23]'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelfNoteMode('preview')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        selfNoteMode === 'preview'
                          ? 'bg-[#191A23] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#191A23]'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {/* Editor Content Textarea / Preview */}
                {selfNoteMode === 'edit' ? (
                  <textarea
                    ref={selfNoteTextareaRef}
                    value={selfNoteContent}
                    onChange={(e) => {
                      setSelfNoteContent(e.target.value);
                      triggerSelfNoteAutosave(selfNoteTitle, e.target.value);
                    }}
                    placeholder="Write your study notes, key insights, formulas, and frameworks here... (Markdown supported)"
                    className="flex-1 w-full bg-[#F8F9FA] p-5 rounded-2xl border border-[#E8ECF2] outline-none text-sm leading-relaxed text-[#191A23] focus:border-[#E52521] focus:bg-white resize-none font-mono"
                    style={{ minHeight: '360px' }}
                  />
                ) : (
                  <div className="flex-1 w-full bg-[#F8F9FA] p-6 rounded-2xl border border-[#E8ECF2] overflow-y-auto prose prose-sm max-w-none text-[#191A23] leading-relaxed" style={{ minHeight: '360px' }}>
                    {selfNoteContent ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{selfNoteContent}</ReactMarkdown>
                    ) : (
                      <p className="text-xs text-[#94A3B8] italic">No content to preview.</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#94A3B8] py-16">
                <Edit3 className="w-12 h-12 text-[#94A3B8]/40 mb-3" />
                <h3 className="font-bold text-base text-[#191A23]">No Note Selected</h3>
                <p className="text-xs mt-1">Create or select a note on the left to write and autosave.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 5: QUIZ CENTER ================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {!quizAttempt ? (
            /* Quiz Home inside Subject */
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-extrabold text-lg text-[#191A23]">AI Practice Quizzes (10 MCQs)</h2>
                  <p className="text-xs text-[#64748B]">
                    Practice questions generated strictly from your uploaded study materials.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {materials.length > 0 && (
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleGenerateQuiz(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="bg-[#F8F9FA] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-[#191A23] outline-none cursor-pointer"
                    >
                      <option value="">Quiz from specific PPT...</option>
                      {materials.map((m) => (
                        <option key={m.id} value={m.id}>
                          📄 {m.filename}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={() => handleGenerateQuiz()}
                    disabled={generatingQuiz || materials.length === 0}
                    className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-playful-red transition-all btn-bounce disabled:opacity-50"
                  >
                    {generatingQuiz ? <Loader2 className="w-4 h-4 animate-spin" /> : <HelpCircle className="w-4 h-4" />}
                    <span>{generatingQuiz ? 'Generating 10 MCQs...' : 'Generate 10 MCQ Quiz'}</span>
                  </button>
                </div>
              </div>

              {quizzes.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
                  <div className="w-14 h-14 bg-red-50 text-[#E52521] rounded-2xl flex items-center justify-center mx-auto">
                    <HelpCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#191A23]">No quizzes generated yet</h3>
                    <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                      Click "Generate 10 MCQ Quiz" above. Gemini will analyze your uploaded PPTs and build a customized 10-question practice test.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizzes.map((qz) => (
                    <div
                      key={qz.id}
                      className="bg-white p-5 rounded-3xl border border-[#E8ECF2] shadow-xs flex items-center justify-between gap-4 card-hover"
                    >
                      <div>
                        <span className="text-[10px] font-bold bg-[#FEF3C7] text-[#B45309] px-2 py-0.5 rounded-full">
                          10 Questions
                        </span>
                        <h3 className="font-bold text-sm text-[#191A23] mt-2">{qz.title}</h3>
                        <p className="text-xs text-[#64748B]">
                          {qz.attempts_count || 0} attempts • Best score: {qz.best_score !== null ? `${qz.best_score}/10` : 'None'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleStartQuiz(qz.id)}
                        className="px-4 py-2 bg-[#191A23] hover:bg-[#E52521] text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                      >
                        Start Quiz &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : !quizSubmitted ? (
            /* Interactive Quiz Attempt View (1 Question at a time) */
            <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-8 max-w-3xl mx-auto space-y-6">
              {/* Stepper Header */}
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    Question {currentQIndex + 1} of {quizAttempt.questions.length}
                  </span>
                  <h3 className="font-bold text-sm text-[#191A23]">{quizAttempt.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-[#FEF3C7] text-[#B45309] px-3 py-1.5 rounded-xl font-mono font-bold text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {Math.floor(quizTimer / 60)
                        .toString()
                        .padStart(2, '0')}
                      :{(quizTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuizAttempt(null)}
                    className="text-xs font-semibold text-[#64748B] hover:text-[#191A23]"
                  >
                    Exit
                  </button>
                </div>
              </div>

              {/* Step Navigation Pill Dots */}
              <div className="flex items-center gap-1.5 justify-center overflow-x-auto py-1">
                {quizAttempt.questions.map((q, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#E52521] text-white ring-2 ring-offset-2 ring-[#E52521]'
                          : isAnswered
                          ? 'bg-[#191A23] text-white'
                          : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Question Text */}
              {quizAttempt.questions[currentQIndex] && (
                <div className="space-y-4">
                  <h4 className="text-base font-extrabold text-[#191A23] leading-relaxed">
                    {quizAttempt.questions[currentQIndex].question_text}
                  </h4>

                  {/* 4 Selectable Options */}
                  <div className="space-y-2.5">
                    {quizAttempt.questions[currentQIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[quizAttempt.questions[currentQIndex].id] === optIdx;
                      const letters = ['A', 'B', 'C', 'D'];
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerSelect(quizAttempt.questions[currentQIndex].id, optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                            isSelected
                              ? 'bg-red-50/70 border-[#E52521] shadow-xs'
                              : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E8ECF2]'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected ? 'bg-[#E52521] text-white' : 'bg-white border border-[#CBD5E1] text-[#64748B]'
                            }`}
                          >
                            {letters[optIdx]}
                          </div>
                          <span className={`text-sm font-semibold ${isSelected ? 'text-[#E52521]' : 'text-[#334155]'}`}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#E2E8F0] disabled:opacity-40 text-xs font-bold rounded-xl"
                >
                  &larr; Previous
                </button>

                {currentQIndex < quizAttempt.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="px-5 py-2 bg-[#191A23] hover:bg-black text-white text-xs font-bold rounded-xl"
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-6 py-2 bg-[#E52521] hover:bg-[#C51916] text-white text-xs font-bold rounded-xl shadow-playful-red btn-bounce"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Result & Answer Review */
            <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-8 max-w-4xl mx-auto space-y-8">
              {/* Score Summary Card */}
              <div className="text-center space-y-3 bg-[#FFFDF9] border border-[#FDE68A] p-8 rounded-3xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-[#FEF3C7] px-3 py-1 rounded-full">
                  Quiz Completed
                </span>
                <h2 className="text-4xl font-black text-[#191A23]">
                  {quizResult.score} / {quizResult.questions.length}
                </h2>
                <p className="text-sm font-bold text-[#64748B]">Score: {quizResult.percentage}%</p>
                <div className="flex items-center justify-center gap-6 text-xs font-bold pt-2">
                  <span className="text-emerald-600">✓ {quizResult.correct_count} Correct</span>
                  <span className="text-[#E52521]">✗ {quizResult.incorrect_count} Incorrect</span>
                  <span className="text-[#64748B]">• {quizResult.unanswered_count} Unanswered</span>
                </div>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleStartQuiz(quizAttempt.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#E52521] text-white text-xs font-bold rounded-xl shadow-playful-red btn-bounce"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuizAttempt(null);
                      setQuizSubmitted(false);
                      setQuizResult(null);
                    }}
                    className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-xs font-bold rounded-xl"
                  >
                    Back to Quizzes
                  </button>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-6">
                <h3 className="font-black text-lg text-[#191A23]">Detailed Answer Review & Explanations</h3>
                <div className="space-y-4">
                  {quizResult.questions.map((q, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          q.is_correct === 1
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : q.selected_index === -1
                            ? 'bg-[#F8F9FA] border-[#E8ECF2]'
                            : 'bg-red-50/40 border-red-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-extrabold text-sm text-[#191A23]">
                            {idx + 1}. {q.question_text}
                          </h4>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              q.is_correct === 1
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.selected_index === -1
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {q.is_correct === 1 ? 'Correct' : q.selected_index === -1 ? 'Unanswered' : 'Incorrect'}
                          </span>
                        </div>

                        {/* Options */}
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            const isUserChoice = q.selected_index === optIdx;
                            const isCorrectChoice = q.correct_index === optIdx;

                            let optStyle = 'bg-white border-[#E2E8F0] text-[#475569]';
                            if (isCorrectChoice) {
                              optStyle = 'bg-emerald-100/70 border-emerald-400 font-bold text-emerald-900';
                            } else if (isUserChoice && !isCorrectChoice) {
                              optStyle = 'bg-red-100/70 border-red-400 font-bold text-red-900';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                              >
                                <span>
                                  {letters[optIdx]}. {opt}
                                </span>
                                {isCorrectChoice && <span className="text-[10px] text-emerald-700 font-bold">✓ Correct Answer</span>}
                                {isUserChoice && !isCorrectChoice && (
                                  <span className="text-[10px] text-red-700 font-bold">✗ Your Answer</span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {q.explanation && (
                          <div className="p-3 bg-white/80 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                            <p className="font-bold text-[#191A23]">Explanation:</p>
                            <p className="text-[#475569] leading-relaxed">{q.explanation}</p>
                            {q.source_reference && (
                              <p className="text-[10px] text-[#94A3B8] font-semibold mt-1">Source: {q.source_reference}</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Submit Confirmation Modal */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] animate-in fade-in zoom-in-95 text-center space-y-4">
                <HelpCircle className="w-12 h-12 text-[#E52521] mx-auto" />
                <h3 className="font-black text-base text-[#191A23]">Ready to Submit Quiz?</h3>
                <p className="text-xs text-[#64748B]">
                  You have answered {Object.keys(selectedAnswers).length} of {quizAttempt?.questions.length} questions.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-xs font-bold rounded-xl"
                  >
                    Keep Reviewing
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2 bg-[#E52521] hover:bg-[#C51916] text-white text-xs font-bold rounded-xl shadow-playful-red"
                  >
                    Submit Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 6: PROGRESS ================= */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-[#64748B]">Subject Progress</span>
              <p className="text-3xl font-black text-[#191A23]">{subject.progress}%</p>
              <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${subject.progress}%`, backgroundColor: subject.color || '#E52521' }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-[#64748B]">Topics Mastered</span>
              <p className="text-3xl font-black text-[#191A23]">
                {subject.completed_topics || 0} / {subject.total_topics || 0}
              </p>
              <p className="text-xs text-[#64748B]">Marked completed in Topic Explorer</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-[#64748B]">Total Study Time</span>
              <p className="text-3xl font-black text-[#191A23]">
                {Math.round((subject.study_seconds || 0) / 60)} mins
              </p>
              <p className="text-xs text-[#64748B]">Recorded via Study Timer</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
