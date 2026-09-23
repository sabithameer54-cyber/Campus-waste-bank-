import React, { useState } from 'react';
import { Bell, FileText, Download, Calendar, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CampusNotice {
  id: string;
  title: string;
  department: string;
  date: string;
  category: 'Exams' | 'Scholarships' | 'Admin' | 'Green Initiative';
  summary: string;
  pdfSize: string;
  isImportant?: boolean;
}

const NOTICES: CampusNotice[] = [
  {
    id: 'not-1',
    title: 'University End-Semester Theory & Practical Exam Schedule (Nov/Dec 2026)',
    department: 'Controller of Examinations',
    date: '2026-09-20',
    category: 'Exams',
    summary: 'Detailed timetable for all UG & PG branches. Hall tickets will be issued via campus portal from Oct 10.',
    pdfSize: '1.4 MB',
    isImportant: true,
  },
  {
    id: 'not-2',
    title: 'Post-Matric & State Merit-cum-Means Scholarship Portal Re-Opened',
    department: 'Dean of Student Welfare',
    date: '2026-09-18',
    category: 'Scholarships',
    summary: 'Eligible students can submit verified caste/income certificates and bonafide letters before Oct 25.',
    pdfSize: '820 KB',
  },
  {
    id: 'not-3',
    title: 'Campus Waste Bank Green Credit Policy & Exam Fee Concession Circular',
    department: 'Office of the Registrar',
    date: '2026-09-16',
    category: 'Green Initiative',
    summary: 'Students earning >250 Green Points by donating textbooks and recycling e-waste are eligible for campus bookstore coupons.',
    pdfSize: '540 KB',
    isImportant: true,
  },
  {
    id: 'not-4',
    title: 'Inter-Collegiate Cultural & Technical Symposium "TechFest 2026" Registrations',
    department: 'Student Union Council',
    date: '2026-09-12',
    category: 'Admin',
    summary: 'Over 30 competitive hackathons, paper presentations, and robotics arenas open for student participation.',
    pdfSize: '2.1 MB',
  },
];

export const NoticeHubTab: React.FC = () => {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredNotices =
    selectedCategory === 'All'
      ? NOTICES
      : NOTICES.filter((n) => n.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-amber-600" />
            <span>Official University Gazettes</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Notice Hub & Administrative Circulars
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified circulars from the Dean of Academics, Controller of Examinations, and Scholarship Cells.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {['All', 'Exams', 'Scholarships', 'Admin', 'Green Initiative'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedCategory === cat
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-5 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              notice.isImportant
                ? 'bg-amber-50/50 border-amber-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {notice.category}
                </span>
                <span className="text-xs font-bold text-amber-900">{notice.department}</span>
                <span className="text-[11px] text-slate-400">• {notice.date}</span>
                {notice.isImportant && (
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.2 rounded-md">
                    High Priority
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{notice.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{notice.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => showToast(`Downloaded "${notice.title.substring(0, 30)}..." (${notice.pdfSize})`)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF ({notice.pdfSize})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
