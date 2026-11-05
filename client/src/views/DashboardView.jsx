import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Sparkles,
  HelpCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  FolderOpen
} from 'lucide-react';
import { api } from '../api';

export default function DashboardView({ onSelectSubject, onAddSubject, onOpenTimer }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getDashboard();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-28 bg-[#F1F5F9] rounded-3xl w-full"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-[#F1F5F9] rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-[#F1F5F9] rounded-3xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-[#E52521]" />
            <div>
              <h3 className="font-bold">Failed to load dashboard data</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={loadDashboard}
            className="px-4 py-2 bg-[#E52521] text-white rounded-xl text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { overview, recent_subjects, recent_activities } = data || {
    overview: {},
    recent_subjects: [],
    recent_activities: []
  };

  const statCards = [
    {
      label: 'Total Subjects',
      value: overview.total_subjects ?? 0,
      icon: BookOpen,
      color: 'bg-red-50 text-[#E52521] border-red-100',
    },
    {
      label: 'Study Materials',
      value: overview.total_materials ?? 0,
      icon: FileText,
      color: 'bg-amber-50 text-[#F59E0B] border-amber-100',
    },
    {
      label: 'AI Notes Generated',
      value: overview.total_ai_notes ?? 0,
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      label: 'Quizzes Attempted',
      value: overview.total_quizzes_attempted ?? 0,
      icon: HelpCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      label: 'Average Quiz Score',
      value: overview.average_quiz_score ? `${overview.average_quiz_score}%` : '0%',
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      label: 'Total Study Time',
      value: overview.total_study_hours > 0 ? `${overview.total_study_hours} hrs` : `${Math.round((overview.total_study_seconds || 0) / 60)} mins`,
      icon: Clock,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* A. Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#191A23] via-[#242735] to-[#191A23] text-white p-8 rounded-3xl shadow-playful">
        {/* Subtle decorative Mickey-inspired golden & red accents */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#E52521]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-20 -top-10 w-28 h-28 bg-[#FDB813]/15 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E52521]/20 border border-[#E52521]/40 px-3 py-1 rounded-full text-xs font-bold text-[#FDB813] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FDB813] animate-pulse"></span>
              Personal Study Command Center
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome Back! Ready to Learn Something New?
            </h1>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              "Continuous learning is the minimum requirement for success in any field." Manage your MBA subjects, upload PPTs, generate structured AI notes, and test your mastery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddSubject}
              className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-playful-red transition-all btn-bounce"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </button>
            <button
              onClick={onOpenTimer}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-4 py-3 rounded-2xl font-semibold text-sm transition-all"
            >
              <Clock className="w-4 h-4 text-[#FDB813]" />
              <span>Start Timer</span>
            </button>
          </div>
        </div>
      </div>

      {/* B. Dynamic Overview Cards */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#64748B] mb-3">
          Learning Performance Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#E8ECF2] shadow-xs hover:shadow-playful transition-all"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-3 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-[#191A23]">{card.value}</div>
                <div className="text-xs font-semibold text-[#64748B] mt-0.5">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* C. My Subjects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#191A23]">My Subjects</h2>
            <p className="text-xs text-[#64748B]">Personal MBA subjects and coursework workspaces</p>
          </div>
          <button
            onClick={onAddSubject}
            className="flex items-center gap-1.5 text-xs font-bold text-[#E52521] hover:text-[#C51916] bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Subject</span>
          </button>
        </div>

        {recent_subjects.length === 0 ? (
          /* Honest Clean Empty State */
          <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#E52521] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#191A23]">No subjects created yet</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                Your learning workspace starts with your first subject. Add an MBA course like "Strategic Management" or "Corporate Finance" to begin uploading PPTs.
              </p>
            </div>
            <button
              onClick={onAddSubject}
              className="inline-flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-playful-red transition-all btn-bounce"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Subject</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent_subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className="bg-white border border-[#E8ECF2] hover:border-[#CBD5E1] p-5 rounded-3xl shadow-xs card-hover cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                      style={{ backgroundColor: sub.color || '#E52521' }}
                    >
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-[#64748B] bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                      {sub.progress}% Done
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#191A23] group-hover:text-[#E52521] transition-colors line-clamp-1">
                    {sub.name}
                  </h3>
                  {sub.description ? (
                    <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  ) : (
                    <p className="text-xs text-[#94A3B8] italic mt-1">No description provided</p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#F1F5F9] space-y-3">
                  {/* Progress bar */}
                  <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(5, sub.progress)}%`,
                        backgroundColor: sub.color || '#E52521'
                      }}
                    ></div>
                  </div>

                  {/* Counters */}
                  <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                    <span>{sub.materials_count || 0} Docs</span>
                    <span>{sub.notes_count || 0} Notes</span>
                    <span>{sub.quiz_count || 0} Quizzes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* D. Bottom Grid: Continue Learning & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#191A23] flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#FDB813]" /> Continue Learning
            </h3>
          </div>
          {recent_subjects.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#94A3B8]">
              No subjects in progress. Create a subject and upload your lecture PPTs!
            </div>
          ) : (
            <div className="space-y-3">
              {recent_subjects.slice(0, 3).map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => onSelectSubject(sub.id)}
                  className="p-3.5 rounded-2xl bg-[#F8F9FA] hover:bg-[#F1F5F9] border border-[#E8ECF2] flex items-center justify-between cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: sub.color || '#E52521' }}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#191A23] group-hover:text-[#E52521] transition-colors">
                        {sub.name}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {sub.materials_count} files • {sub.total_topics || 0} topics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E52521]">
                    <span>Resume</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real Recent Activity */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#191A23] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#E52521]" /> Recent Activity
            </h3>
          </div>
          {recent_activities.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#94A3B8]">
              No activities logged yet. Actions like uploading PPTs, generating notes, or taking quizzes will be recorded here in real-time.
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recent_activities.map((act) => {
                const date = new Date(act.timestamp);
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={act.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F8F9FA]">
                    <div className="w-2 h-2 rounded-full bg-[#E52521] mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#191A23] truncate">{act.title}</p>
                      {act.details && <p className="text-[11px] text-[#64748B] truncate">{act.details}</p>}
                    </div>
                    <span className="text-[10px] text-[#94A3B8] font-semibold shrink-0">{timeStr}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
