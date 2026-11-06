import React, { useState, useEffect, useRef } from 'react';
import {
  Edit3,
  Plus,
  Search,
  Trash2,
  Star,
  BookOpen,
  Save,
  Copy,
  Printer,
  Check,
  Eye,
  Type,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../api';

export default function SelfNotesView({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [savedStatus, setSavedStatus] = useState('Saved');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editorMode, setEditorMode] = useState('edit'); // 'edit' | 'preview'
  const [copied, setCopied] = useState(false);

  const autosaveRef = useRef(null);
  const titleInputRef = useRef(null);
  const textareaRef = useRef(null);
  const latestEditRef = useRef({ title: '', content: '', noteId: null });

  // Update latestEditRef on state changes
  useEffect(() => {
    latestEditRef.current = {
      title,
      content,
      noteId: activeNote?.id || null,
    };
  }, [title, content, activeNote]);

  // Load data on mount & subject/favorites filter change
  useEffect(() => {
    loadData();
  }, [selectedSubjectId, favoritesOnly]);

  const loadData = async (noteToSelectId = null) => {
    setLoading(true);
    try {
      const subs = await api.getSubjects();
      setSubjects(subs);

      const params = {};
      if (selectedSubjectId !== 'all') params.subject_id = selectedSubjectId;
      if (favoritesOnly) params.favorites_only = true;

      const nList = await api.getSelfNotes(params);
      setNotes(nList);

      if (noteToSelectId) {
        const found = nList.find((n) => n.id === noteToSelectId);
        if (found) {
          selectNote(found);
          return;
        }
      }

      if (nList.length > 0) {
        // If current active note is in the list, keep it; else select first
        const currentStillExists = activeNote && nList.find((n) => n.id === activeNote.id);
        if (currentStillExists) {
          selectNote(currentStillExists);
        } else {
          selectNote(nList[0]);
        }
      } else {
        setActiveNote(null);
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error('Error loading self notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Flush any pending unsaved changes immediately
  const flushPendingSave = async () => {
    if (autosaveRef.current) {
      clearTimeout(autosaveRef.current);
      autosaveRef.current = null;
    }
    const { title: t, content: c, noteId: id } = latestEditRef.current;
    if (id && (t || c)) {
      try {
        await api.updateSelfNote(id, { title: t, content: c });
      } catch (err) {
        console.error('Save flush error:', err);
      }
    }
  };

  const selectNote = async (n) => {
    if (activeNote && activeNote.id === n.id) return;
    await flushPendingSave();
    setActiveNote(n);
    setTitle(n.title || '');
    setContent(n.content || '');
    setSavedStatus('Saved');
    setEditorMode('edit');
  };

  const handleCreate = async () => {
    await flushPendingSave();
    const defaultSub = selectedSubjectId !== 'all' ? selectedSubjectId : (subjects[0]?.id || 'general');
    try {
      const newNote = await api.createSelfNote({
        subject_id: defaultSub,
        title: 'New Study Note',
        content: '',
      });

      // Reload list and select new note
      const params = {};
      if (selectedSubjectId !== 'all') params.subject_id = selectedSubjectId;
      const nList = await api.getSelfNotes(params);
      setNotes(nList);

      const target = nList.find((n) => n.id === newNote.id) || newNote;
      setActiveNote(target);
      setTitle(target.title || 'New Study Note');
      setContent(target.content || '');
      setSavedStatus('Saved');
      setEditorMode('edit');

      setTimeout(() => {
        titleInputRef.current?.focus();
        titleInputRef.current?.select();
      }, 50);
    } catch (err) {
      alert(`Error creating note: ${err.message}`);
    }
  };

  const triggerAutosave = (newTitle, newContent) => {
    setSavedStatus('Saving...');
    if (autosaveRef.current) clearTimeout(autosaveRef.current);

    const currentId = activeNote?.id;
    if (!currentId) return;

    autosaveRef.current = setTimeout(async () => {
      try {
        await api.updateSelfNote(currentId, { title: newTitle, content: newContent });
        setSavedStatus('Saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setNotes((prev) =>
          prev.map((n) => (n.id === currentId ? { ...n, title: newTitle, content: newContent, updated_at: new Date().toISOString() } : n))
        );
      } catch (err) {
        setSavedStatus('Error saving');
      }
    }, 500);
  };

  const handleSaveNow = async () => {
    if (!activeNote) return;
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    setSavedStatus('Saving...');
    try {
      await api.updateSelfNote(activeNote.id, { title, content });
      setSavedStatus('Saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setNotes((prev) =>
        prev.map((n) => (n.id === activeNote.id ? { ...n, title, content, updated_at: new Date().toISOString() } : n))
      );
    } catch (err) {
      setSavedStatus('Error saving');
      alert(`Save failed: ${err.message}`);
    }
  };

  const handleToggleFavorite = async () => {
    if (!activeNote) return;
    const nextVal = activeNote.is_favorite === 1 ? 0 : 1;
    try {
      await api.updateSelfNote(activeNote.id, { is_favorite: nextVal });
      setActiveNote({ ...activeNote, is_favorite: nextVal });
      setNotes((prev) =>
        prev.map((n) => (n.id === activeNote.id ? { ...n, is_favorite: nextVal } : n))
      );
    } catch (err) {
      alert(`Failed to update favorite: ${err.message}`);
    }
  };

  const handleChangeSubject = async (newSubId) => {
    if (!activeNote) return;
    try {
      const sub = subjects.find((s) => s.id === newSubId);
      await api.updateSelfNote(activeNote.id, { subject_id: newSubId });
      setActiveNote({
        ...activeNote,
        subject_id: newSubId,
        subject_name: sub?.name || 'Personal Notes',
        subject_color: sub?.color || '#E52521',
      });
      setNotes((prev) =>
        prev.map((n) =>
          n.id === activeNote.id
            ? { ...n, subject_id: newSubId, subject_name: sub?.name || 'Personal Notes', subject_color: sub?.color || '#E52521' }
            : n
        )
      );
    } catch (err) {
      alert(`Failed to update subject: ${err.message}`);
    }
  };

  const handleDelete = async (noteId) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    try {
      await api.deleteSelfNote(noteId);
      const remaining = notes.filter((n) => n.id !== noteId);
      setNotes(remaining);
      if (activeNote?.id === noteId) {
        if (remaining.length > 0) {
          selectNote(remaining[0]);
        } else {
          setActiveNote(null);
          setTitle('');
          setContent('');
        }
      }
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleCopyNote = () => {
    const textToCopy = `# ${title}\n\n${content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${title || 'Study Note'}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; color: #191A23; }
            h1 { border-bottom: 2px solid #E52521; padding-bottom: 8px; }
            pre { background: #f4f4f4; padding: 12px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>${title || 'Untitled Note'}</h1>
          <p><em>Subject: ${activeNote?.subject_name || 'General'} • Date: ${new Date().toLocaleDateString()}</em></p>
          <hr/>
          <div style="white-space: pre-wrap;">${content || '(Empty note)'}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Text insertion toolbar helper
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = content;
    const selected = current.substring(start, end);
    const replacement = prefix + selected + suffix;
    const newContent = current.substring(0, start) + replacement + current.substring(end);
    setContent(newContent);
    triggerAutosave(title, newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      (n.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (n.content || '').toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#191A23]">Self Notes Hub</h1>
            <span className="bg-red-50 text-[#E52521] text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
              {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Capture lecture takeaways, frameworks, case insights, and exam notes with instant autosave.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-playful-red btn-bounce self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Column: Notes List & Filter Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-5 space-y-4 flex flex-col">
          {/* Search & Subject Filter Bar */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes or keywords..."
                className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-xs outline-none focus:border-[#E52521] font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="flex-1 bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-semibold text-[#191A23] rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="all">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  favoritesOnly
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:text-[#191A23]'
                }`}
                title={favoritesOnly ? 'Showing starred only (click to show all)' : 'Filter by starred'}
              >
                <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-amber-400 text-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Scrollable Note Cards */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[560px] pr-1">
            {loading ? (
              <div className="text-center py-12 text-xs text-[#94A3B8] animate-pulse">Loading self notes...</div>
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-16 px-4 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#E2E8F0] space-y-3">
                <Edit3 className="w-8 h-8 text-[#94A3B8]/60 mx-auto" />
                <p className="text-xs font-bold text-[#191A23]">No notes found</p>
                <p className="text-[11px] text-[#64748B]">
                  {search ? 'Try clearing your search query.' : 'Click "+ New Note" above to write your first note.'}
                </p>
                <button
                  onClick={handleCreate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-[#E52521] border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Note
                </button>
              </div>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = activeNote?.id === n.id;
                const isStarred = n.is_favorite === 1;
                return (
                  <div
                    key={n.id}
                    onClick={() => selectNote(n)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#191A23] text-white border-[#191A23] shadow-md'
                        : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E8ECF2] text-[#191A23]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block truncate max-w-[150px]"
                          style={{
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.18)' : '#FEE2E2',
                            color: isSelected ? '#FFFFFF' : '#E52521',
                          }}
                        >
                          {n.subject_name || 'Personal Notes'}
                        </span>
                        {isStarred && (
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <h4 className="font-bold text-xs truncate leading-snug">{n.title || 'Untitled Note'}</h4>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        {new Date(n.updated_at || n.created_at).toLocaleDateString()} • {n.content ? n.content.slice(0, 35) + '...' : '(Empty)'}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(n.id);
                      }}
                      className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                        isSelected ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-[#94A3B8] hover:text-[#E52521] hover:bg-red-50'
                      }`}
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Note Editor Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8ECF2] shadow-xs p-6 flex flex-col space-y-4">
          {activeNote ? (
            <>
              {/* Note Header & Metadata Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                <div className="flex-1 flex items-center gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className="p-1 rounded-lg text-[#94A3B8] hover:text-amber-500 transition-colors cursor-pointer"
                    title={activeNote.is_favorite === 1 ? 'Unstar note' : 'Star note'}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        activeNote.is_favorite === 1 ? 'fill-amber-400 text-amber-500' : 'text-[#CBD5E1]'
                      }`}
                    />
                  </button>
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      triggerAutosave(e.target.value, content);
                    }}
                    placeholder="Note title..."
                    className="font-extrabold text-xl text-[#191A23] bg-transparent border-none outline-none flex-1 placeholder:text-[#CBD5E1]"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Subject Picker */}
                  <select
                    value={activeNote.subject_id || 'general'}
                    onChange={(e) => handleChangeSubject(e.target.value)}
                    className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl px-2.5 py-1 text-xs font-bold text-[#191A23] outline-none cursor-pointer max-w-[160px] truncate"
                    title="Change associated subject"
                  >
                    <option value="general">Personal Notes</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  {/* Manual Save Button */}
                  <button
                    onClick={handleSaveNow}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#E52521] text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title="Force save now"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyNote}
                    className="p-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] transition-colors cursor-pointer"
                    title="Copy note content"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {/* Print Button */}
                  <button
                    onClick={handlePrint}
                    className="p-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#191A23] transition-colors cursor-pointer"
                    title="Print / Export note"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {/* Live Autosave Indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] bg-[#F8F9FA] px-2.5 py-1 rounded-xl border border-[#E8ECF2]">
                    <span className={`w-2 h-2 rounded-full ${savedStatus.startsWith('Saved') ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                    <span>{savedStatus}</span>
                  </div>
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center justify-between gap-2 bg-[#F8F9FA] p-2 rounded-2xl border border-[#E8ECF2] flex-wrap">
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => insertFormatting('# ')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-black text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('## ')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-black text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('### ')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-black text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <span className="w-px h-4 bg-[#CBD5E1] mx-1"></span>
                  <button
                    type="button"
                    onClick={() => insertFormatting('**', '**')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('*', '*')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-px h-4 bg-[#CBD5E1] mx-1"></span>
                  <button
                    type="button"
                    onClick={() => insertFormatting('- ')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('1. ')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('> ')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Quote Block"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('`', '`')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Inline Code / Formula"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('\n---\n')}
                    className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#191A23] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                    title="Divider Line"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Edit vs Preview Toggle */}
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setEditorMode('edit')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      editorMode === 'edit'
                        ? 'bg-[#191A23] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#191A23]'
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('preview')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      editorMode === 'preview'
                        ? 'bg-[#191A23] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#191A23]'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Editor / Preview Body */}
              {editorMode === 'edit' ? (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    triggerAutosave(title, e.target.value);
                  }}
                  placeholder="Start writing your study notes, key insights, formulas, and frameworks here... (Markdown formatting supported)"
                  className="flex-1 w-full bg-[#F8F9FA] p-5 rounded-2xl border border-[#E8ECF2] outline-none text-sm leading-relaxed text-[#191A23] focus:border-[#E52521] focus:bg-white resize-none font-mono"
                  style={{ minHeight: '380px' }}
                />
              ) : (
                <div className="flex-1 w-full bg-[#F8F9FA] p-6 rounded-2xl border border-[#E8ECF2] overflow-y-auto prose prose-sm max-w-none text-[#191A23] leading-relaxed" style={{ minHeight: '380px' }}>
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  ) : (
                    <p className="text-xs text-[#94A3B8] italic">Nothing to preview yet. Switch back to Write mode to type.</p>
                  )}
                </div>
              )}

              {/* Footer Stats Bar */}
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2 border-t border-[#F1F5F9]">
                <span>
                  {wordCount} {wordCount === 1 ? 'word' : 'words'} • {charCount} characters
                </span>
                <span>Markdown & Autosave active</span>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-[#94A3B8] py-24 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E52521] flex items-center justify-center mx-auto shadow-xs">
                <Edit3 className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base text-[#191A23]">No Note Selected</h3>
              <p className="text-xs text-[#64748B] max-w-xs">
                Pick a note from the left sidebar or click below to start writing your personal study notes.
              </p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-playful-red btn-bounce cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
