import React, { useState } from 'react';
import { Target, Briefcase, Award, Calendar, MapPin, IndianRupee, ExternalLink, Plus, CheckCircle, Clock } from 'lucide-react';
import { INITIAL_INTERNSHIPS } from '../../data/initialData';
import { InternshipApplication } from '../../types';
import { useApp } from '../../context/AppContext';

export const OpportunityHubTab: React.FC = () => {
  const { showToast } = useApp();
  const [internships, setInternships] = useState<InternshipApplication[]>(INITIAL_INTERNSHIPS);
  const [isAdding, setIsAdding] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [stipend, setStipend] = useState('');
  const [deadline, setDeadline] = useState('2026-11-01');
  const [status, setStatus] = useState<InternshipApplication['status']>('Applied');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newApp: InternshipApplication = {
      id: `intern-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      type: 'Internship',
      stipendOrReward: stipend.trim() || '₹20,000 / month',
      status,
      deadline,
      location: 'Hybrid / On-Campus',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setInternships([newApp, ...internships]);
    setIsAdding(false);
    setCompany('');
    setRole('');
    setStipend('');
    showToast('New application logged to your Campus Internship Tracker!');
  };

  const updateStatus = (id: string, newStatus: InternshipApplication['status']) => {
    setInternships(internships.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
    showToast(`Application status updated to "${newStatus}"`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Career Pathways & Work Experience</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Opportunity Hub & Campus Internship Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track student placement drives, internships, national hackathons, research fellowships, and certificate stages.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shrink-0 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Track Application'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-blue-950">Add Internship / Research Application</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Cisco or DRDO Lab"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Role / Project *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Cloud Security Intern"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stipend in INR (₹) *</label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                placeholder="e.g. ₹30,000 / month"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Current Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Bookmarked">Bookmarked</option>
                <option value="Applied">Applied</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offered">Offer Received</option>
                <option value="Certified">Certificate Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition"
            >
              Save Application
            </button>
          </div>
        </form>
      )}

      {/* Tracker list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internships.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-xs transition space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase">{item.company}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{item.role}</h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  item.status === 'Offered' || item.status === 'Certified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : item.status === 'Interview Scheduled'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900">{item.stipendOrReward}</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Deadline: {item.deadline}</span>
              </div>
            </div>

            {/* Quick Status Advance */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-[11px] text-slate-500">Update stage:</span>
              <div className="flex items-center gap-1.5">
                {item.status !== 'Interview Scheduled' && (
                  <button
                    onClick={() => updateStatus(item.id, 'Interview Scheduled')}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-bold rounded-lg border border-amber-200"
                  >
                    Interview Call
                  </button>
                )}
                {item.status !== 'Offered' && (
                  <button
                    onClick={() => updateStatus(item.id, 'Offered')}
                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-lg border border-emerald-200"
                  >
                    Mark Offer
                  </button>
                )}
                {item.status !== 'Certified' && (
                  <button
                    onClick={() => updateStatus(item.id, 'Certified')}
                    className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-900 text-[10px] font-bold rounded-lg border border-teal-200"
                  >
                    Add Certificate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
