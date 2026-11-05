import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Trash2, Search, Filter, BookOpen } from 'lucide-react';
import { api } from '../api';

export default function StudyMaterialsView({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, [selectedSubjectId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const subs = await api.getSubjects();
      setSubjects(subs);

      if (selectedSubjectId === 'all') {
        // Fetch all materials across all subjects
        const allMats = [];
        for (const s of subs) {
          const mats = await api.getMaterials(s.id);
          mats.forEach((m) => {
            m.subject_name = s.name;
            m.subject_color = s.color;
          });
          allMats.push(...mats);
        }
        setMaterials(allMats);
      } else {
        const mats = await api.getMaterials(selectedSubjectId);
        const s = subs.find((sub) => sub.id === selectedSubjectId);
        mats.forEach((m) => {
          m.subject_name = s?.name || '';
          m.subject_color = s?.color || '#E52521';
        });
        setMaterials(mats);
      }
    } catch (err) {
      console.error('Error loading materials:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMaterials = materials.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">Study Materials Library</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Central repository of all lecture presentations, PDFs, and curriculum files.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#E8ECF2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by name..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#E52521]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-[#64748B]">Subject:</span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-semibold text-[#191A23] rounded-xl px-3 py-1.5 outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-3xl border border-[#E8ECF2] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#94A3B8] animate-pulse">Loading documents...</div>
        ) : filteredMaterials.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <FileText className="w-12 h-12 text-[#94A3B8]/40 mx-auto" />
            <h3 className="font-bold text-sm text-[#191A23]">No study materials found</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Upload your PPTs and documents inside any subject to see them cataloged here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {filteredMaterials.map((m) => {
              const sizeMb = (m.file_size / (1024 * 1024)).toFixed(2);
              return (
                <div key={m.id} className="p-4.5 flex items-center justify-between gap-4 hover:bg-[#F8F9FC]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E52521] flex items-center justify-center font-black text-xs shrink-0">
                      {m.file_type.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#191A23]">{m.filename}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#64748B] mt-0.5">
                        <span
                          onClick={() => onSelectSubject(m.subject_id, 'materials')}
                          className="font-semibold text-[#E52521] hover:underline cursor-pointer"
                        >
                          {m.subject_name}
                        </span>
                        <span>•</span>
                        <span>{sizeMb} MB</span>
                        <span>•</span>
                        <span>{m.slide_count} slides/pages</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectSubject(m.subject_id, 'materials')}
                      className="px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-xs font-bold rounded-xl text-[#191A23]"
                    >
                      Open Subject
                    </button>
                    <a
                      href={api.getDownloadUrl(m.id)}
                      download={m.filename}
                      className="p-2 bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] rounded-xl"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
