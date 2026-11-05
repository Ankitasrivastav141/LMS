import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Plus, Search, Trash2, Star, BookOpen, Save } from 'lucide-react';
import { api } from '../api';

export default function SelfNotesView({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [savedStatus, setSavedStatus] = useState('Saved');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const autosaveRef = useRef(null);

  useEffect(() => {
    loadData();
  }, [selectedSubjectId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const subs = await api.getSubjects();
      setSubjects(subs);
      const params = {};
      if (selectedSubjectId !== 'all') params.subject_id = selectedSubjectId;
      const nList = await api.getSelfNotes(params);
      setNotes(nList);
      if (nList.length > 0 && !activeNote) {
        setActiveNote(nList[0]);
        setTitle(nList[0].title);
        setContent(nList[0].content);
      }
    } catch (err) {
      console.error('Error loading self notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (subjects.length === 0) {
      alert('Please create at least one subject first to link your notes.');
      return;
    }
    const targetSub = selectedSubjectId !== 'all' ? selectedSubjectId : subjects[0].id;
    try {
      const res = await api.createSelfNote({
        subject_id: targetSub,
        title: 'New Study Note',
        content: 'Write your MBA notes here...',
      });
      loadData();
    } catch (err) {
      alert(`Error creating note: ${err.message}`);
    }
  };

  const triggerAutosave = (newTitle, newContent) => {
    setSavedStatus('Saving...');
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    autosaveRef.current = setTimeout(async () => {
      if (!activeNote) return;
      try {
        await api.updateSelfNote(activeNote.id, { title: newTitle, content: newContent });
        setSavedStatus('Saved at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setNotes((prev) =>
          prev.map((n) => (n.id === activeNote.id ? { ...n, title: newTitle, content: newContent } : n))
        );
      } catch (err) {
        setSavedStatus('Error saving');
      }
    }, 700);
  };

  const handleDelete = async (noteId) => {
    if (!confirm('Delete this note?')) return;
    try {
      await api.deleteSelfNote(noteId);
      const remaining = notes.filter((n) => n.id !== noteId);
      setNotes(remaining);
      if (remaining.length > 0) {
        setActiveNote(remaining[0]);
        setTitle(remaining[0].title);
        setContent(remaining[0].content);
      } else {
        setActiveNote(null);
        setTitle('');
        setContent('');
      }
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const filteredNotes = notes.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">Self Notes Hub</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Your personal MBA notes, frameworks, and reflection space with instant autosave.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-playful-red btn-bounce self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Sidebar list */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-5 space-y-4 flex flex-col">
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs outline-none focus:border-[#E52521]"
              />
            </div>

            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-semibold text-[#191A23] rounded-xl px-3 py-1.5 outline-none"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12 text-xs text-[#94A3B8]">No notes found. Click "New Note" to begin.</div>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = activeNote?.id === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setActiveNote(n);
                      setTitle(n.title);
                      setContent(n.content);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#191A23] text-white border-[#191A23] shadow-xs'
                        : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E8ECF2] text-[#191A23]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1"
                        style={{
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : '#FEE2E2',
                          color: isSelected ? '#FFFFFF' : '#E52521',
                        }}
                      >
                        {n.subject_name}
                      </span>
                      <h4 className="font-bold text-xs truncate">{n.title}</h4>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        {new Date(n.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(n.id);
                      }}
                      className={`p-1.5 rounded-lg ${
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
          {activeNote ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    triggerAutosave(e.target.value, content);
                  }}
                  className="font-extrabold text-xl text-[#191A23] bg-transparent border-none outline-none flex-1"
                />
                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{savedStatus}</span>
                </div>
              </div>

              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  triggerAutosave(title, e.target.value);
                }}
                className="flex-1 w-full bg-[#F8F9FA] p-5 rounded-2xl border border-[#E8ECF2] outline-none text-sm leading-relaxed text-[#191A23] focus:border-[#E52521] resize-none"
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-[#94A3B8]">
              <Edit3 className="w-12 h-12 text-[#94A3B8]/40 mb-3" />
              <h3 className="font-bold text-base text-[#191A23]">No Note Selected</h3>
              <p className="text-xs mt-1">Select an existing note or click "New Note" to begin writing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
