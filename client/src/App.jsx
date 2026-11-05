import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import GlobalSearchModal from './components/GlobalSearchModal';

import DashboardView from './views/DashboardView';
import SubjectsView from './views/SubjectsView';
import SubjectWorkspaceView from './views/SubjectWorkspaceView';
import StudyMaterialsView from './views/StudyMaterialsView';
import AINotesView from './views/AINotesView';
import SelfNotesView from './views/SelfNotesView';
import QuizCenterView from './views/QuizCenterView';
import QuizHistoryView from './views/QuizHistoryView';
import StudyTimerView from './views/StudyTimerView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';

import { api } from './api';

const TIMER_STORAGE_KEY = 'mickey_lms_timer_state';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('overview');
  const [subjectsList, setSubjectsList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [subjectRefreshCounter, setSubjectRefreshCounter] = useState(0);

  // Persistent Timer State across navigation & refresh
  const [timerState, setTimerState] = useState(() => {
    try {
      const saved = localStorage.getItem(TIMER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      totalSeconds: 25 * 60,
      secondsLeft: 25 * 60,
      isRunning: false,
      mode: 'standard',
      subjectId: '',
      startedAt: null,
    };
  });

  // Load initial subjects for count & timer dropdown
  useEffect(() => {
    loadSubjects();
  }, [subjectRefreshCounter]);

  const loadSubjects = async () => {
    try {
      const subs = await api.getSubjects();
      setSubjectsList(subs);
    } catch (err) {
      console.error('Error loading subjects in App:', err);
    }
  };

  // Timer ticker hook
  useEffect(() => {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerState));
  }, [timerState]);

  useEffect(() => {
    let interval = null;
    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState((prev) => {
          if (prev.secondsLeft <= 1) {
            // Timer Finished!
            handleTimerCompleted(prev);
            return {
              ...prev,
              isRunning: false,
              secondsLeft: prev.totalSeconds,
              startedAt: null,
            };
          }
          return {
            ...prev,
            secondsLeft: prev.secondsLeft - 1,
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState.isRunning]);

  const handleTimerCompleted = async (finishedState) => {
    // Play celebratory confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E52521', '#FDB813', '#191A23'],
    });

    // Save to database
    try {
      await api.saveStudySession({
        subject_id: finishedState.subjectId || null,
        duration_seconds: finishedState.totalSeconds,
        mode: finishedState.mode,
        started_at: finishedState.startedAt || new Date().toISOString(),
        completed_at: new Date().toISOString(),
        status: 'completed',
      });
    } catch (e) {
      console.error('Failed to log completed timer session:', e);
    }
  };

  // Navigation handlers
  const handleSelectSubject = (subjectId, initialTab = 'overview') => {
    setActiveSubjectId(subjectId);
    setActiveWorkspaceTab(initialTab);
    setCurrentView('subject-workspace');
  };

  const handleBackToSubjects = () => {
    setActiveSubjectId(null);
    setCurrentView('subjects');
    setSubjectRefreshCounter((c) => c + 1);
  };

  const handleAddSubjectFromDashboard = () => {
    setCurrentView('subjects');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col md:flex-row text-[#191A23]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={(view) => {
          if (view !== 'subject-workspace') {
            setActiveSubjectId(null);
          }
          setCurrentView(view);
        }}
        activeSubjectId={activeSubjectId}
        subjectsCount={subjectsList.length}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Navbar */}
        <TopNav
          onOpenSearch={() => setIsSearchOpen(true)}
          timerState={timerState}
          onOpenTimer={() => setCurrentView('timer')}
          onOpenSettings={() => setCurrentView('settings')}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 pb-16">
          {currentView === 'dashboard' && (
            <DashboardView
              onSelectSubject={handleSelectSubject}
              onAddSubject={handleAddSubjectFromDashboard}
              onOpenTimer={() => setCurrentView('timer')}
            />
          )}

          {currentView === 'subjects' && (
            <SubjectsView
              onSelectSubject={handleSelectSubject}
              refreshTrigger={subjectRefreshCounter}
            />
          )}

          {currentView === 'subject-workspace' && activeSubjectId && (
            <SubjectWorkspaceView
              key={activeSubjectId}
              subjectId={activeSubjectId}
              initialTab={activeWorkspaceTab}
              onBack={handleBackToSubjects}
            />
          )}

          {currentView === 'materials' && (
            <StudyMaterialsView onSelectSubject={handleSelectSubject} />
          )}

          {currentView === 'ai-notes' && (
            <AINotesView onSelectSubject={handleSelectSubject} />
          )}

          {currentView === 'self-notes' && (
            <SelfNotesView onSelectSubject={handleSelectSubject} />
          )}

          {currentView === 'quiz-center' && (
            <QuizCenterView onSelectSubject={handleSelectSubject} />
          )}

          {currentView === 'quiz-history' && (
            <QuizHistoryView onSelectSubject={handleSelectSubject} />
          )}

          {currentView === 'timer' && (
            <StudyTimerView
              timerState={timerState}
              setTimerState={setTimerState}
              subjects={subjectsList}
            />
          )}

          {currentView === 'analytics' && <AnalyticsView />}

          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSubject={handleSelectSubject}
        onNavigate={(view) => setCurrentView(view)}
      />
    </div>
  );
}
