import React, { useState } from 'react';
import { Users, Sparkles, MessageSquare, ArrowRightLeft, BookOpen, Code, Cpu, Languages, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SkillOffer {
  id: string;
  name: string;
  dept: string;
  year: string;
  offering: string;
  seeking: string;
  category: 'Coding' | 'CAD / 3D' | 'Electronics' | 'Languages' | 'Math / Gate';
  avatar: string;
}

const INITIAL_SKILLS: SkillOffer[] = [
  {
    id: 'sk-1',
    name: 'Sabith Ameer',
    dept: 'CSE',
    year: '3rd Year',
    offering: 'Full Stack React, TypeScript & Docker Setup',
    seeking: 'SolidWorks 3D Modeling or Ansys basics',
    category: 'Coding',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'sk-2',
    name: 'Karthik N',
    dept: 'ME',
    year: '4th Year',
    offering: 'AutoCAD 2D Drafting & CNC G-Code generation',
    seeking: 'Python for Data Analysis & Pandas',
    category: 'CAD / 3D',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'sk-3',
    name: 'Sam Wilson',
    dept: 'ECE',
    year: '3rd Year',
    offering: 'Embedded C, Arduino & PCB Layout in KiCad',
    seeking: 'German / Japanese Language Conversation',
    category: 'Electronics',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'sk-4',
    name: 'Priya Patel',
    dept: 'CSE',
    year: '2nd Year',
    offering: 'Data Structures in C++ & LeetCode DP patterns',
    seeking: 'Analog Circuit Analysis & Op-Amp feedback',
    category: 'Coding',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

export const SkillExchangeTab: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [skills, setSkills] = useState<SkillOffer[]>(INITIAL_SKILLS);
  const [isPosting, setIsPosting] = useState(false);
  const [offering, setOffering] = useState('');
  const [seeking, setSeeking] = useState('');
  const [category, setCategory] = useState<'Coding' | 'CAD / 3D' | 'Electronics' | 'Languages' | 'Math / Gate'>('Coding');

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offering.trim() || !seeking.trim()) return;

    const newOffer: SkillOffer = {
      id: `sk-${Date.now()}`,
      name: currentUser ? currentUser.name : 'Student Peer',
      dept: currentUser ? currentUser.department : 'CSE',
      year: currentUser ? currentUser.year : '3rd Year',
      offering: offering.trim(),
      seeking: seeking.trim(),
      category,
      avatar: currentUser ? currentUser.avatarUrl : 'https://api.dicebear.com/7.x/bottts/svg?seed=Peer',
    };

    setSkills([newOffer, ...skills]);
    setIsPosting(false);
    setOffering('');
    setSeeking('');
    showToast('Your Skill Exchange proposal was posted to campus peers!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Peer-to-Peer Knowledge Economy</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Skill Exchange & Peer Swap
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Trade your technical know-how: teach coding or KiCad PCB design in return for CAD, mathematics, or foreign languages.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shrink-0"
        >
          {isPosting ? 'Cancel Post' : '+ Propose Skill Swap'}
        </button>
      </div>

      {/* Creation form */}
      {isPosting && (
        <form onSubmit={handleCreateOffer} className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-emerald-950">Post Your Skill Exchange Proposal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                What Can You Teach? *
              </label>
              <input
                type="text"
                required
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                placeholder="e.g. React & Node.js or KiCad PCB design"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                What Do You Want to Learn? *
              </label>
              <input
                type="text"
                required
                value={seeking}
                onChange={(e) => setSeeking(e.target.value)}
                placeholder="e.g. SolidWorks CAD or GATE Aptitude"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Coding">Coding & Software</option>
                <option value="CAD / 3D">CAD / 3D Modeling</option>
                <option value="Electronics">Electronics & Hardware</option>
                <option value="Languages">Languages & Soft Skills</option>
                <option value="Math / Gate">Math / GATE Prep</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
            >
              Post Skill Swap
            </button>
          </div>
        </form>
      )}

      {/* Grid of skill exchange listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={skill.avatar}
                  alt={skill.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                  <span className="text-[11px] text-slate-500">
                    {skill.dept} • {skill.year}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {skill.category}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-0.5">
                  I can teach you:
                </span>
                <p className="font-semibold text-emerald-950">{skill.offering}</p>
              </div>

              <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold uppercase text-blue-800 block mb-0.5">
                  In return, I need help with:
                </span>
                <p className="font-semibold text-blue-950">{skill.seeking}</p>
              </div>
            </div>

            <button
              onClick={() => showToast(`Connect message sent to ${skill.name} via campus email!`)}
              className="w-full py-2 bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect for Skill Swap</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
