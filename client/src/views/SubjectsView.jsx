import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Calendar,
  FileText,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  X,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';

const THEME_COLORS = [
  { name: 'Mickey Red', value: '#E52521' },
  { name: 'Mickey Gold', value: '#FDB813' },
  { name: 'Onyx Black', value: '#191A23' },
  { name: 'Corporate Blue', value: '#2563EB' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Royal Violet', value: '#7C3AED' },
];

export default function SubjectsView({ onSelectSubject, refreshTrigger }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetSubject, setTargetSubject] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#E52521');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadSubjects();
  }, [search, sort, refreshTrigger]);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const data = await api.getSubjects({ search, sort });
      setSubjects(data);
    } catch (err) {
      console.error('Failed to load subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setName('');
    setDescription('');
    setColor('#E52521');
    setFormError('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (e, sub) => {
    e.stopPropagation();
    setTargetSubject(sub);
    setName(sub.name);
    setDescription(sub.description || '');
    setColor(sub.color || '#E52521');
    setFormError('');
    setShowEditModal(true);
  };

  const handleOpenDelete = (e, sub) => {
    e.stopPropagation();
    setTargetSubject(sub);
    setShowDeleteModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Subject name is required.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await api.createSubject({ name: name.trim(), description: description.trim(), color });
      setShowAddModal(false);
      loadSubjects();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Subject name is required.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await api.updateSubject(targetSubject.id, { name: name.trim(), description: description.trim(), color });
      setShowEditModal(false);
      loadSubjects();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!targetSubject) return;
    setSubmitting(true);
    try {
      await api.deleteSubject(targetSubject.id);
      setShowDeleteModal(false);
      loadSubjects();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#191A23]">My Subjects</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your MBA subjects, lecture PPTs, and study records.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-playful-red transition-all btn-bounce self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-[#E8ECF2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#E52521]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-[#64748B]">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-semibold text-[#191A23] rounded-xl px-3 py-1.5 outline-none cursor-pointer"
          >
            <option value="recent">Recently Updated</option>
            <option value="name">Subject Name (A-Z)</option>
            <option value="oldest">Creation Order</option>
          </select>
        </div>
      </div>

      {/* Subjects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-52 bg-white rounded-3xl border border-[#E8ECF2]"></div>
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-3xl p-16 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-red-50 text-[#E52521] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#191A23]">
              {search ? 'No matching subjects found' : 'No subjects added yet'}
            </h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs mx-auto">
              {search
                ? `No subject matched "${search}". Clear the search to view all.`
                : 'Click "+ Add Subject" to create your first MBA course and start uploading PPTs.'}
            </p>
          </div>
          <button
            onClick={search ? () => setSearch('') : handleOpenAdd}
            className="inline-flex items-center gap-2 bg-[#E52521] hover:bg-[#C51916] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-playful-red transition-all btn-bounce"
          >
            <Plus className="w-4 h-4" />
            <span>{search ? 'Clear Search' : 'Add Subject Now'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className="bg-white border border-[#E8ECF2] hover:border-[#CBD5E1] p-6 rounded-3xl shadow-xs card-hover cursor-pointer flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                    style={{ backgroundColor: sub.color || '#E52521' }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleOpenEdit(e, sub)}
                      title="Edit Subject"
                      className="p-1.5 text-[#94A3B8] hover:text-[#191A23] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleOpenDelete(e, sub)}
                      title="Delete Subject"
                      className="p-1.5 text-[#94A3B8] hover:text-[#E52521] hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-[#191A23] group-hover:text-[#E52521] transition-colors line-clamp-1">
                  {sub.name}
                </h3>
                {sub.description ? (
                  <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                ) : (
                  <p className="text-xs text-[#94A3B8] italic mt-1.5">No description</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1F5F9] space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B] mb-1">
                    <span>Progress</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(4, sub.progress)}%`,
                        backgroundColor: sub.color || '#E52521'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Counter pills */}
                <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#FDB813]" /> {sub.materials_count || 0} Docs
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E52521]" /> {sub.notes_count || 0} Notes
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-500" /> {sub.quiz_count || 0} Quizzes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <h2 className="text-lg font-bold text-[#191A23]">Add New Subject</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-[#94A3B8] hover:text-[#191A23]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-100">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-1">
                  Subject Name <span className="text-[#E52521]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Strategic Management, Corporate Finance"
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#191A23] outline-none focus:border-[#E52521]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-1">
                  Description <span className="text-[#94A3B8] font-normal">(Optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Core MBA term 1 subject covering market positioning and competitive strategy..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#191A23] outline-none focus:border-[#E52521]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-2">Subject Color Theme</label>
                <div className="flex items-center gap-3">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        color === c.value ? 'ring-2 ring-offset-2 ring-black scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#E52521] hover:bg-[#C51916] text-white rounded-xl text-xs font-bold shadow-playful-red transition-all btn-bounce"
                >
                  {submitting ? 'Creating...' : 'Create Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <h2 className="text-lg font-bold text-[#191A23]">Edit Subject</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 text-[#94A3B8] hover:text-[#191A23]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-100">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-1">
                  Subject Name <span className="text-[#E52521]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#191A23] outline-none focus:border-[#E52521]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#191A23] outline-none focus:border-[#E52521]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191A23] mb-2">Subject Color Theme</label>
                <div className="flex items-center gap-3">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        color === c.value ? 'ring-2 ring-offset-2 ring-black scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#E52521] hover:bg-[#C51916] text-white rounded-xl text-xs font-bold shadow-playful-red transition-all btn-bounce"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-[#E8ECF2] animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-[#E52521] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#191A23] text-center">
              Delete "{targetSubject?.name}"?
            </h3>
            <p className="text-xs text-[#64748B] text-center mt-2 leading-relaxed">
              This action cannot be undone. All uploaded PPTs, extracted content, AI notes, and quiz records associated with this subject will be permanently removed.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="px-5 py-2 bg-[#E52521] hover:bg-[#C51916] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                {submitting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
