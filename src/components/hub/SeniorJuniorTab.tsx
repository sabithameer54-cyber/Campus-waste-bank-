import React, { useState } from 'react';
import { BookOpen, GraduationCap, Download, FileText, Sparkles, MessageCircle, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SeniorNote {
  id: string;
  subject: string;
  semester: string;
  seniorName: string;
  dept: string;
  advice: string;
  downloadCount: number;
  rating: number;
}

const SENIOR_RESOURCES: SeniorNote[] = [
  {
    id: 'sn-1',
    subject: 'Data Structures & Algorithms Handwritten Cheatsheet + Lab Code',
    semester: 'Semester 3 (CSE/IT)',
    seniorName: 'Sabith Ameer (Rank 2)',
    dept: 'CSE 3rd Year',
    advice: 'Focus heavily on Tree Traversals and Dynamic Programming for internal assessments. Don’t skip pointer memory trace diagrams.',
    downloadCount: 184,
    rating: 4.9,
  },
  {
    id: 'sn-2',
    subject: 'Signals & Systems Solved Question Bank & Formula Sheet',
    semester: 'Semester 4 (ECE/EEE)',
    seniorName: 'Sam Wilson',
    dept: 'ECE 3rd Year',
    advice: 'Laplace transforms and convolution integrals are 40 marks guaranteed. Practice past 5-year Anna/VTU/JNTU university questions.',
    downloadCount: 142,
    rating: 4.8,
  },
  {
    id: 'sn-3',
    subject: 'Fluid Mechanics & Thermodynamics Lab Viva Model Q&A',
    semester: 'Semester 4 (ME/CE)',
    seniorName: 'Karthik N',
    dept: 'ME 4th Year',
    advice: 'External examiners always question Bernoulli equation assumptions and Pelton turbine velocity triangles. Keep calculations clear in observation book.',
    downloadCount: 119,
    rating: 4.9,
  },
];

export const SeniorJuniorTab: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Academic Mentorship & Knowledge Heritage</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Senior–Junior Connect & Academic Vault
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified lecture notes, laboratory viva tips, past year solution guides, and peer advice passed down between student batches.
          </p>
        </div>

        <button
          onClick={() => showToast('Upload modal opened: submit your notes to earn +30 Green Points!')}
          className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition shrink-0"
        >
          + Share Senior Notes
        </button>
      </div>

      <div className="space-y-4">
        {SENIOR_RESOURCES.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {item.semester}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{item.subject}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Uploaded by <strong className="text-slate-800">{item.seniorName}</strong> ({item.dept})
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 self-start">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{item.rating} / 5.0</span>
                <span className="text-[10px] text-slate-400 font-normal">({item.downloadCount} dl)</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950">
              <span className="font-bold text-indigo-900 block mb-0.5">Senior Advice & Exam Strategy:</span>
              <p className="leading-relaxed">{item.advice}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => showToast(`Direct chat with ${item.seniorName} opened!`)}
                className="text-xs font-semibold text-slate-600 hover:text-indigo-700 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask Senior a Doubt</span>
              </button>

              <button
                onClick={() => showToast(`Downloaded "${item.subject}" PDF package!`)}
                className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes (PDF)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
