import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Square, Clock, BookOpen, CheckCircle2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../api';

export default function StudyTimerView({ timerState, setTimerState, subjects }) {
  const [recentSessions, setRecentSessions] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(timerState.subjectId || '');
  const [customMinutes, setCustomMinutes] = useState(30);

  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = async () => {
    try {
      const data = await api.getRecentStudySessions();
      setRecentSessions(data);
    } catch (err) {
      console.error('Error loading timer sessions:', err);
    }
  };

  // Sync selected subject to global timer state if not running
  const handleSubjectChange = (subId) => {
    setSelectedSubjectId(subId);
    setTimerState((prev) => ({ ...prev, subjectId: subId }));
  };

  const handleStart = () => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
      startedAt: prev.startedAt || new Date().toISOString(),
    }));
  };

  const handlePause = () => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
    }));
  };

  const handleReset = () => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      secondsLeft: prev.totalSeconds,
      startedAt: null,
    }));
  };

  const handleStopAndSave = async () => {
    const elapsed = timerState.totalSeconds - timerState.secondsLeft;
    if (elapsed > 10) {
      // Save session if at least 10 seconds spent
      try {
        await api.saveStudySession({
          subject_id: timerState.subjectId || null,
          duration_seconds: elapsed,
          mode: timerState.mode,
          started_at: timerState.startedAt || new Date().toISOString(),
          completed_at: new Date().toISOString(),
          status: 'completed',
        });
        loadRecent();
      } catch (err) {
        console.error('Error saving session:', err);
      }
    }

    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      secondsLeft: prev.totalSeconds,
      startedAt: null,
    }));
  };

  const handleSetPreset = (minutes, mode = 'standard') => {
    const totalSecs = minutes * 60;
    setTimerState({
      totalSeconds: totalSecs,
      secondsLeft: totalSecs,
      isRunning: false,
      mode: mode,
      subjectId: selectedSubjectId,
      startedAt: null,
    });
  };

  // Format time mm:ss
  const mins = Math.floor(timerState.secondsLeft / 60);
  const secs = timerState.secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // SVG circle calculations
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = timerState.totalSeconds > 0 ? timerState.secondsLeft / timerState.totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">Study Timer & Focus Space</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Track active study sessions, maintain Pomodoro cycles, and log MBA learning hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Circular Countdown Display */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-8 flex flex-col items-center justify-center space-y-6">
          {/* Subject Selector */}
          <div className="w-full max-w-xs">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 text-center">
              Study Subject
            </label>
            <select
              value={selectedSubjectId}
              disabled={timerState.isRunning}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-bold text-[#191A23] rounded-xl px-3 py-2 outline-none text-center cursor-pointer disabled:opacity-60"
            >
              <option value="">General Study (No Subject)</option>
              {subjects?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* SVG Circular Dial */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
              {/* Background ring */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="stroke-[#F1F5F9]"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Active countdown progress ring */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                stroke={timerState.mode.includes('break') ? '#059669' : '#E52521'}
                strokeWidth="14"
                strokeLinecap="round"
                fill="transparent"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 0.8s ease',
                }}
              />
            </svg>

            {/* Time readout in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
                {timerState.mode === 'pomodoro_study'
                  ? 'Pomodoro Study'
                  : timerState.mode.includes('break')
                  ? 'Break Time'
                  : 'Focus Session'}
              </span>
              <span className="text-5xl font-black text-[#191A23] font-mono tracking-tight my-1">
                {timeFormatted}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                {timerState.isRunning ? 'Active Countdown' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Controls: Start, Pause, Reset, Stop */}
          <div className="flex items-center gap-3 pt-2">
            {!timerState.isRunning ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-7 py-3 rounded-2xl font-bold text-sm shadow-playful-red transition-all btn-bounce"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 bg-[#FDB813] hover:bg-[#F59E0B] text-black px-7 py-3 rounded-2xl font-bold text-sm shadow-playful-yellow transition-all btn-bounce"
              >
                <Pause className="w-4 h-4 fill-black" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-3 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] rounded-2xl transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleStopAndSave}
              className="p-3 bg-[#F8F9FA] hover:bg-red-50 text-[#64748B] hover:text-[#E52521] rounded-2xl transition-colors"
              title="Stop & Log Session"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Presets & Recent Sessions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Presets */}
          <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-[#191A23] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E52521]" /> Timer Duration Presets
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[15, 25, 30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => handleSetPreset(m, 'standard')}
                  className="py-2.5 px-3 bg-[#F8F9FA] hover:bg-red-50 hover:text-[#E52521] border border-[#E8ECF2] rounded-xl text-xs font-bold transition-colors"
                >
                  {m} mins
                </button>
              ))}
            </div>

            {/* Custom Minutes Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="300"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-1.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-center outline-none focus:border-[#E52521]"
              />
              <button
                onClick={() => handleSetPreset(customMinutes, 'standard')}
                className="flex-1 py-1.5 bg-[#191A23] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
              >
                Set Custom
              </button>
            </div>

            {/* Pomodoro Presets */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Pomodoro Cycles</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSetPreset(25, 'pomodoro_study')}
                  className="py-2 px-2 bg-red-50 text-[#E52521] border border-red-100 rounded-xl text-[11px] font-bold"
                >
                  Study (25m)
                </button>
                <button
                  onClick={() => handleSetPreset(5, 'pomodoro_break')}
                  className="py-2 px-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[11px] font-bold"
                >
                  Short Break (5m)
                </button>
                <button
                  onClick={() => handleSetPreset(15, 'pomodoro_break')}
                  className="py-2 px-2 bg-sky-50 text-sky-700 border border-sky-100 rounded-xl text-[11px] font-bold"
                >
                  Long Break (15m)
                </button>
              </div>
            </div>
          </div>

          {/* Recent Completed Sessions */}
          <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 space-y-3">
            <h3 className="font-extrabold text-sm text-[#191A23] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Logged Study Sessions
            </h3>

            {recentSessions.length === 0 ? (
              <p className="text-xs text-[#94A3B8] text-center py-6">
                No sessions saved yet. Complete a study session to record your time permanently.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {recentSessions.map((ss) => {
                  const mins = Math.round(ss.duration_seconds / 60);
                  const dt = new Date(ss.completed_at);
                  const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div
                      key={ss.id}
                      className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8ECF2] flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-[#191A23] truncate">{ss.subject_name || 'General Study'}</p>
                        <p className="text-[10px] text-[#64748B]">Completed at {timeStr}</p>
                      </div>
                      <span className="font-black text-[#E52521] shrink-0">{mins} mins</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
