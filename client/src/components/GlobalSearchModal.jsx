import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, Sparkles, Edit3, Compass, Loader2 } from 'lucide-react';
import { api } from '../api';

export default function GlobalSearchModal({ isOpen, onClose, onSelectSubject, onNavigate }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.search(query.trim());
        setResults(res.results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalHits = results
    ? (results.subjects?.length || 0) +
      (results.materials?.length || 0) +
      (results.ai_notes?.length || 0) +
      (results.self_notes?.length || 0) +
      (results.topics?.length || 0)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8ECF2] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#F1F5F9] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E52521]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search subjects, uploaded PPTs, notes, or topics..."
            className="flex-1 bg-transparent border-none outline-none text-base font-medium text-[#191A23] placeholder:text-[#94A3B8]"
          />
          {loading && <Loader2 className="w-4 h-4 text-[#94A3B8] animate-spin" />}
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#94A3B8] hover:text-[#191A23]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-[#64748B] bg-[#F1F5F9] rounded-lg hover:bg-[#E2E8F0]"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="text-center py-10 text-sm text-[#94A3B8]">
              Search across your entire MBA library with real-time matching.
            </div>
          )}

          {query.trim() && !loading && totalHits === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-[#191A23]">No results found for "{query}"</p>
              <p className="text-xs text-[#94A3B8] mt-1">Try another keyword or subject title.</p>
            </div>
          )}

          {results?.subjects?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#E52521]" /> Subjects ({results.subjects.length})
              </p>
              <div className="space-y-1">
                {results.subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSubject(s.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#191A23] group-hover:text-[#E52521]">{s.name}</p>
                      {s.description && <p className="text-xs text-[#64748B] line-clamp-1">{s.description}</p>}
                    </div>
                    <span className="text-xs font-semibold text-[#94A3B8] group-hover:text-[#191A23]">Open &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results?.materials?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FDB813]" /> Study Materials ({results.materials.length})
              </p>
              <div className="space-y-1">
                {results.materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectSubject(m.subject_id, 'materials');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#191A23] group-hover:text-[#E52521]">{m.filename}</p>
                      <p className="text-xs text-[#64748B]">In {m.subject_name} • .{m.file_type.toUpperCase()}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#94A3B8] group-hover:text-[#191A23]">View &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results?.ai_notes?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E52521]" /> AI Notes ({results.ai_notes.length})
              </p>
              <div className="space-y-1">
                {results.ai_notes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      onSelectSubject(n.subject_id, 'ai-notes');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#191A23] group-hover:text-[#E52521]">{n.title}</p>
                      <p className="text-xs text-[#64748B]">Subject: {n.subject_name}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#94A3B8] group-hover:text-[#191A23]">Read &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results?.self_notes?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-blue-500" /> Self Notes ({results.self_notes.length})
              </p>
              <div className="space-y-1">
                {results.self_notes.map((sn) => (
                  <button
                    key={sn.id}
                    onClick={() => {
                      onSelectSubject(sn.subject_id, 'self-notes');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#191A23] group-hover:text-[#E52521]">{sn.title}</p>
                      <p className="text-xs text-[#64748B]">Subject: {sn.subject_name}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#94A3B8] group-hover:text-[#191A23]">Edit &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
