import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, BookOpen, CheckCircle2, HelpCircle, FileText } from 'lucide-react';
import { api } from '../api';

export default function AnalyticsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.getAnalytics();
      setData(res);
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-28 bg-[#F1F5F9] rounded-3xl"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-[#F1F5F9] rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-[#F1F5F9] rounded-3xl"></div>
      </div>
    );
  }

  const { overview, subject_stats, quiz_trend, study_trend } = data;

  // Max value for study trend scaling
  const maxStudyMin = Math.max(...study_trend.map((s) => s.minutes), 60);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">Learning Analytics</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Strictly derived from your actual database records, study timer logs, and quiz attempts.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Total Study Time</span>
          <p className="text-2xl font-black text-[#191A23] mt-1">{overview.total_hours} hrs</p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">({Math.round((overview.total_seconds || 0) / 60)} active mins)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Average Quiz Score</span>
          <p className="text-2xl font-black text-[#E52521] mt-1">{overview.avg_score}%</p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">{overview.total_attempts} attempts logged</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Topics Mastered</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{overview.completed_topics}</p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">{overview.pending_topics} topics remaining</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Curriculum Depth</span>
          <p className="text-2xl font-black text-[#191A23] mt-1">{overview.total_materials}</p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">Across {overview.total_subjects} subjects</p>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Study Minutes Trend */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#191A23] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E52521]" /> Daily Study Minutes Trend
            </h3>
            <span className="text-[11px] font-semibold text-[#64748B]">Real sessions</span>
          </div>

          {study_trend.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-[#94A3B8] bg-[#F8F9FA] rounded-2xl">
              No study timer sessions logged yet.
            </div>
          ) : (
            <div className="h-48 flex items-end gap-3 pt-6 px-2">
              {study_trend.map((st, i) => {
                const heightPct = Math.max(8, Math.round((st.minutes / maxStudyMin) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-[#191A23] opacity-0 group-hover:opacity-100 transition-opacity">
                      {st.minutes}m
                    </span>
                    <div
                      className="w-full bg-[#E52521] rounded-t-lg transition-all duration-500 hover:bg-[#C51916]"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                    <span className="text-[9px] font-semibold text-[#94A3B8] truncate w-full text-center">
                      {st.study_date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chart 2: Quiz Score Progression */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8ECF2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#191A23] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Quiz Performance Over Time
            </h3>
            <span className="text-[11px] font-semibold text-[#64748B]">Percentage score</span>
          </div>

          {quiz_trend.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-[#94A3B8] bg-[#F8F9FA] rounded-2xl">
              No quiz attempts recorded yet.
            </div>
          ) : (
            <div className="h-48 flex items-end gap-3 pt-6 px-2">
              {quiz_trend.map((qt, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-bold text-[#191A23] opacity-0 group-hover:opacity-100 transition-opacity">
                    {qt.percentage}%
                  </span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${Math.max(10, qt.percentage)}%`,
                      backgroundColor: qt.percentage >= 70 ? '#059669' : qt.percentage >= 50 ? '#F59E0B' : '#E52521',
                    }}
                  ></div>
                  <span className="text-[9px] font-semibold text-[#94A3B8] truncate w-full text-center">
                    #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subject Breakdown Table */}
      <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#F1F5F9]">
          <h3 className="font-bold text-base text-[#191A23]">Subject-wise Learning Progress</h3>
        </div>

        {subject_stats.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#94A3B8]">
            No subjects created yet. Create your MBA subjects to see breakdown analytics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#64748B] font-bold border-b border-[#E8ECF2]">
                <tr>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Materials</th>
                  <th className="p-4">AI Notes</th>
                  <th className="p-4">Topics Mastered</th>
                  <th className="p-4">Study Time</th>
                  <th className="p-4">Quiz Avg</th>
                  <th className="p-4">Curriculum Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] font-medium text-[#191A23]">
                {subject_stats.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F8F9FC]">
                    <td className="p-4 font-bold flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color || '#E52521' }} />
                      <span>{s.name}</span>
                    </td>
                    <td className="p-4">{s.materials_count}</td>
                    <td className="p-4">{s.notes_count}</td>
                    <td className="p-4">
                      {s.completed_topics} / {s.topics_count}
                    </td>
                    <td className="p-4">{s.total_study_minutes} mins</td>
                    <td className="p-4">
                      <span className="font-bold">{s.avg_quiz_score}%</span> ({s.quiz_attempts} tests)
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.max(4, s.completion_percentage)}%`,
                              backgroundColor: s.color || '#E52521',
                            }}
                          />
                        </div>
                        <span className="font-bold text-[11px]">{s.completion_percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
