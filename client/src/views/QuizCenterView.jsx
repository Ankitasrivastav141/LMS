import React, { useState, useEffect } from 'react';
import { HelpCircle, BookOpen, Plus, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { api } from '../api';

export default function QuizCenterView({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const subs = await api.getSubjects();
      setSubjects(subs);
    } catch (err) {
      console.error('Error loading subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">AI Quiz Center</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Test your MBA knowledge with 10-MCQ quizzes generated strictly from your uploaded course slides.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-xs text-[#94A3B8] animate-pulse">Loading quizzes...</div>
      ) : subjects.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8ECF2] p-16 text-center space-y-3">
          <HelpCircle className="w-12 h-12 text-[#E52521]/30 mx-auto" />
          <h3 className="font-bold text-base text-[#191A23]">No subjects available</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Create an MBA subject and upload your lecture presentations to generate custom 10-question practice quizzes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id, 'quiz')}
              className="bg-white border border-[#E8ECF2] hover:border-[#CBD5E1] p-6 rounded-3xl shadow-xs card-hover cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                    style={{ backgroundColor: sub.color || '#E52521' }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold bg-[#FEF3C7] text-[#B45309] px-2.5 py-1 rounded-full">
                    {sub.quiz_count || 0} Attempts
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[#191A23] group-hover:text-[#E52521] transition-colors line-clamp-1">
                  {sub.name}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
                  {sub.description || 'Subject study materials and practice tests.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#64748B]">
                  {sub.materials_count || 0} docs available
                </span>
                <span className="text-xs font-bold text-[#E52521] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter Quiz Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
