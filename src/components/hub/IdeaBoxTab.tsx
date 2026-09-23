import React, { useState } from 'react';
import { Lightbulb, ThumbsUp, MessageSquare, Plus, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CampusIdea {
  id: string;
  title: string;
  author: string;
  dept: string;
  category: 'Sustainability' | 'Academics' | 'Hostel & Food' | 'Tech Infrastructure';
  description: string;
  upvotes: number;
  status: 'Under Review' | 'Approved by Dean' | 'In Implementation';
  hasUpvoted?: boolean;
}

const INITIAL_IDEAS: CampusIdea[] = [
  {
    id: 'idea-1',
    title: 'Install 24/7 Smart Book & Tool Exchange Drop-boxes in Hostels',
    author: 'Sabith Ameer',
    dept: 'CSE',
    category: 'Sustainability',
    description: 'RFID-enabled lockers where students can drop books or borrow scientific calculators overnight without waiting for Central Library opening hours.',
    upvotes: 86,
    status: 'In Implementation',
    hasUpvoted: true,
  },
  {
    id: 'idea-2',
    title: 'Solar-Powered Mobile Charging Benches across Campus Lawns',
    author: 'Priya Patel',
    dept: 'CSE',
    category: 'Tech Infrastructure',
    description: 'Outdoor shaded benches equipped with 20W mini solar canopies and wireless QI pads for student laptops and phones during project discussions.',
    upvotes: 64,
    status: 'Approved by Dean',
    hasUpvoted: false,
  },
  {
    id: 'idea-3',
    title: 'End-of-Semester Mandatory Paper & Rough Note Recycling Bins outside Exam Halls',
    author: 'Sam Wilson',
    dept: 'ECE',
    category: 'Sustainability',
    description: 'Place dedicated rolling paper hampers right as students finish final exam sessions so rough work and assignment drafts get recycled immediately.',
    upvotes: 49,
    status: 'Under Review',
    hasUpvoted: false,
  },
];

export const IdeaBoxTab: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [ideas, setIdeas] = useState<CampusIdea[]>(INITIAL_IDEAS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CampusIdea['category']>('Sustainability');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newIdea: CampusIdea = {
      id: `idea-${Date.now()}`,
      title: title.trim(),
      author: currentUser ? currentUser.name : 'Student Innovator',
      dept: currentUser ? currentUser.department : 'CSE',
      category,
      description: description.trim(),
      upvotes: 1,
      status: 'Under Review',
      hasUpvoted: true,
    };

    setIdeas([newIdea, ...ideas]);
    setIsSubmitting(false);
    setTitle('');
    setDescription('');
    showToast('Your campus improvement idea was submitted to the Dean’s Innovation Council!');
  };

  const toggleUpvote = (id: string) => {
    setIdeas(
      ideas.map((idea) => {
        if (idea.id === id) {
          const nextVoted = !idea.hasUpvoted;
          const nextCount = nextVoted ? idea.upvotes + 1 : idea.upvotes - 1;
          showToast(nextVoted ? 'Upvote registered! (+1 Green Point)' : 'Upvote removed.');
          return {
            ...idea,
            hasUpvoted: nextVoted,
            upvotes: nextCount,
          };
        }
        return idea;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Student Voice & Campus Governance</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Idea Box & Suggestion Incubator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit innovative ideas for campus sustainability, lab upgrades, library facilities, and vote on fellow peer initiatives.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitting(!isSubmitting)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isSubmitting ? 'Cancel' : 'Submit Campus Idea'}</span>
        </button>
      </div>

      {isSubmitting && (
        <form onSubmit={handleSubmit} className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-amber-950">Pitch Your Campus Innovation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Idea Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Automated Rainwater Level Sensors for Garden"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Sustainability">Sustainability & Zero Waste</option>
                <option value="Academics">Academics & Labs</option>
                <option value="Hostel & Food">Hostel & Food Quality</option>
                <option value="Tech Infrastructure">Tech Infrastructure & Wi-Fi</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Detailed Proposal *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how this improves student experience or reduces university operational costs..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition"
            >
              Submit for Review
            </button>
          </div>
        </form>
      )}

      {/* Ideas list */}
      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {idea.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    idea.status === 'In Implementation'
                      ? 'bg-emerald-100 text-emerald-800'
                      : idea.status === 'Approved by Dean'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {idea.status}
                </span>
                <span className="text-[11px] text-slate-400">
                  By {idea.author} ({idea.dept})
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{idea.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{idea.description}</p>
            </div>

            {/* Upvote Button */}
            <button
              onClick={() => toggleUpvote(idea.id)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center min-w-[70px] transition shrink-0 ${
                idea.hasUpvoted
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-extrabold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 mb-1 ${idea.hasUpvoted ? 'fill-amber-500' : ''}`} />
              <span className="text-sm font-bold">{idea.upvotes}</span>
              <span className="text-[9px] uppercase font-bold text-slate-400">Votes</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
