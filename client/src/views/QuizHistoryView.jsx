import React, { useState, useEffect } from 'react';
import { History, Award, CheckCircle2, XCircle, Clock, Eye, AlertCircle, Calendar } from 'lucide-react';
import { api } from '../api';

export default function QuizHistoryView({ onSelectSubject }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getQuizHistory();
      setHistory(data);
    } catch (err) {
      console.error('Error loading quiz history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = async (attemptId) => {
    setLoadingReview(true);
    try {
      const rev = await api.getQuizAttemptReview(attemptId);
      setSelectedAttempt(rev);
    } catch (err) {
      alert(`Error loading attempt review: ${err.message}`);
    } finally {
      setLoadingReview(false);
    }
  };

  // Stats calculation
  const totalAttempts = history.length;
  const bestScore = history.length > 0 ? Math.max(...history.map((h) => h.score)) : 0;
  const avgPct =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / history.length)
      : 0;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">Quiz History & Analytics</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Track your performance, review past mistakes, and revisit answer explanations.
          </p>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Total Attempts</span>
            <p className="text-2xl font-black text-[#191A23] mt-1">{totalAttempts}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E52521] flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Best Score</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{bestScore} / 10</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8ECF2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Average Percentage</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">{avgPct}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#F1F5F9]">
          <h3 className="font-bold text-base text-[#191A23]">All Quiz Attempts</h3>
        </div>

        {loading ? (
          <div className="p-16 text-center text-xs text-[#94A3B8] animate-pulse">Loading attempt history...</div>
        ) : history.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <History className="w-12 h-12 text-[#94A3B8]/40 mx-auto" />
            <h3 className="font-bold text-sm text-[#191A23]">No quizzes attempted yet</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Your test attempts, scores, and answer reviews will be safely archived here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {history.map((h) => {
              const dt = new Date(h.attempted_at);
              const dateStr = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={h.id} className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F9FC]">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white shrink-0 shadow-xs`}
                      style={{ backgroundColor: h.percentage >= 70 ? '#059669' : h.percentage >= 50 ? '#F59E0B' : '#E52521' }}
                    >
                      {h.score}/10
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#191A23]">{h.quiz_title}</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#FEE2E2', color: '#E52521' }}
                        >
                          {h.subject_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#64748B] mt-1">
                        <span>{dateStr} at {timeStr}</span>
                        <span>•</span>
                        <span>Score: {h.percentage}%</span>
                        <span>•</span>
                        <span>{Math.round(h.time_taken_seconds / 60)}m {h.time_taken_seconds % 60}s</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenReview(h.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-xs font-bold rounded-xl text-[#191A23] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Review</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DRILL-DOWN FULL ATTEMPT REVIEW MODAL */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-extrabold text-base text-[#191A23]">{selectedAttempt.quiz_title}</h3>
                <p className="text-xs text-[#64748B]">
                  Subject: {selectedAttempt.subject_name} • Score: {selectedAttempt.score}/10 ({selectedAttempt.percentage}%)
                </p>
              </div>
              <button
                onClick={() => setSelectedAttempt(null)}
                className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#94A3B8]"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedAttempt.questions?.map((q, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      q.is_correct === 1 ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-xs text-[#191A23]">
                        {idx + 1}. {q.question_text}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.is_correct === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {q.is_correct === 1 ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correct_index === optIdx;
                        const isUser = q.selected_index === optIdx;
                        let cls = 'bg-white border-[#E2E8F0] text-[#475569]';
                        if (isCorrect) cls = 'bg-emerald-100/70 border-emerald-400 font-bold text-emerald-900';
                        else if (isUser && !isCorrect) cls = 'bg-red-100/70 border-red-400 font-bold text-red-900';

                        return (
                          <div key={optIdx} className={`p-2 rounded-xl border text-[11px] flex justify-between ${cls}`}>
                            <span>
                              {letters[optIdx]}. {opt}
                            </span>
                            {isCorrect && <span className="font-bold text-emerald-700">✓ Correct</span>}
                            {isUser && !isCorrect && <span className="font-bold text-red-700">✗ Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="p-2.5 bg-white/80 rounded-xl border border-[#E2E8F0] text-[11px] space-y-0.5">
                        <span className="font-bold text-[#191A23]">Explanation: </span>
                        <span className="text-[#475569]">{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
