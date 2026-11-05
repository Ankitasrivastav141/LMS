import React from 'react';
import { Search, Clock, Bell, User, Sparkles } from 'lucide-react';

export default function TopNav({ onOpenSearch, timerState, onOpenTimer, onOpenSettings }) {
  // Current date formatted
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Timer pill formatting
  const timerActive = timerState && timerState.isRunning;
  const timerSecs = timerState ? timerState.secondsLeft : 0;
  const mins = Math.floor(timerSecs / 60);
  const secs = timerSecs % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <header className="h-16 bg-white border-b border-[#E8ECF2] px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Date & Motivational greeting */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] bg-[#F8F9FA] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
          {dateStr}
        </span>
      </div>

      {/* Center Search trigger */}
      <div className="flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#F8F9FA] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-sm text-[#94A3B8] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#94A3B8] group-hover:text-[#E52521] transition-colors" />
            <span className="group-hover:text-[#475569]">Search subjects, PPTs, notes, topics...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#64748B] bg-white border border-[#CBD5E1] rounded shadow-xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right controls: Timer widget, settings & profile */}
      <div className="flex items-center gap-3">
        {/* Quick access study timer pill */}
        <button
          onClick={onOpenTimer}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all btn-bounce ${
            timerActive
              ? 'bg-[#FEF3C7] border-[#FDB813] text-[#B45309] shadow-sm'
              : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E2E8F0] text-[#475569]'
          }`}
          title="Open Study Timer"
        >
          <Clock className={`w-4 h-4 ${timerActive ? 'text-[#E52521] animate-spin' : 'text-[#64748B]'}`} />
          <span>{timerActive ? timeFormatted : 'Study Timer'}</span>
          {timerActive && (
            <span className="w-2 h-2 rounded-full bg-[#E52521] animate-ping"></span>
          )}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-[#F8F9FA] transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-[#191A23] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#FDB813]">
            A
          </div>
          <span className="hidden md:inline-block text-xs font-bold text-[#191A23]">
            Ankita
          </span>
        </button>
      </div>
    </header>
  );
}
