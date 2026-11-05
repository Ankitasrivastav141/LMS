import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Sparkles,
  Edit3,
  HelpCircle,
  History,
  Clock,
  BarChart3,
  Settings,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import MickeyLogo from './MickeyLogo';

export default function Sidebar({ currentView, setCurrentView, activeSubjectId, subjectsCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen, badge: subjectsCount > 0 ? subjectsCount : null },
    { id: 'materials', label: 'Study Materials', icon: FileText },
    { id: 'ai-notes', label: 'AI Notes', icon: Sparkles },
    { id: 'self-notes', label: 'Self Notes', icon: Edit3 },
    { id: 'quiz-center', label: 'Quiz Center', icon: HelpCircle },
    { id: 'quiz-history', label: 'Quiz History', icon: History },
    { id: 'timer', label: 'Study Timer', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E8ECF2] h-screen sticky top-0 flex flex-col justify-between select-none z-20 shadow-sm">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
          <MickeyLogo />
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E52521] text-white shadow-playful-red font-semibold'
                    : 'text-[#475569] hover:bg-[#F8F9FA] hover:text-[#191A23]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#FDB813] text-black' : 'bg-[#F1F5F9] text-[#475569]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User / MBA Learning Workspace Banner */}
      <div className="p-4 border-t border-[#F1F5F9]">
        <div className="bg-[#FFFDF9] border border-[#FDE68A] p-3 rounded-2xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FDB813] text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
            <GraduationCap className="w-5 h-5 text-[#191A23]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#191A23] truncate">MBA Master Hub</p>
            <p className="text-[11px] text-[#64748B] truncate">100% Personal & Real</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
