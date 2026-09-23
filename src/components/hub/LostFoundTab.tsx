import React, { useState } from 'react';
import { Search, MapPin, Plus, CheckCircle, Clock, ShieldCheck, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  location: string;
  date: string;
  postedBy: string;
  status: 'Open' | 'Returned to Owner';
  contact: string;
}

const INITIAL_LOST_FOUND: LostFoundItem[] = [
  {
    id: 'lf-1',
    type: 'Lost',
    title: 'Casio fx-991EX Scientific Calculator with Blue Sticker',
    location: 'Mechanical Block Seminar Hall 2',
    date: '2026-09-21 (Today)',
    postedBy: 'Sam Wilson (ECE)',
    status: 'Open',
    contact: 'Contact at Hostel 2 Room 104',
  },
  {
    id: 'lf-2',
    type: 'Found',
    title: 'College Student Identity Card (Roll No: 22CS089)',
    location: 'Central Library Photocopy Counter',
    date: '2026-09-20',
    postedBy: 'Library Security Desk',
    status: 'Open',
    contact: 'Collect with proof from Security Desk',
  },
  {
    id: 'lf-3',
    type: 'Found',
    title: 'Blue Water Bottle & Mechanical Drafter Case',
    location: 'Drawing Hall B, 3rd Floor',
    date: '2026-09-19',
    postedBy: 'Karthik N (ME)',
    status: 'Returned to Owner',
    contact: 'Returned to Civil 2nd Year student',
  },
];

export const LostFoundTab: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [itemsList, setItemsList] = useState<LostFoundItem[]>(INITIAL_LOST_FOUND);
  const [isPosting, setIsPosting] = useState(false);
  const [type, setType] = useState<'Lost' | 'Found'>('Lost');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    const newItem: LostFoundItem = {
      id: `lf-${Date.now()}`,
      type,
      title: title.trim(),
      location: location.trim(),
      date: 'Today',
      postedBy: currentUser ? currentUser.name : 'Campus Student',
      status: 'Open',
      contact: contact.trim() || 'Direct message via Campus Waste Bank',
    };

    setItemsList([newItem, ...itemsList]);
    setIsPosting(false);
    setTitle('');
    setLocation('');
    setContact('');
    showToast(`New ${type} item notice broadcast to campus!`);
  };

  const markResolved = (id: string) => {
    setItemsList(
      itemsList.map((i) =>
        i.id === id ? { ...i, status: 'Returned to Owner' } : i
      )
    );
    showToast('Notice marked as Returned to Owner! Thank you for helping fellow students.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            <Search className="w-4 h-4 text-slate-600" />
            <span>Campus Community Lost & Found Register</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Lost & Found Desk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Report misplaced student ID cards, calculators, laboratory instruments, and bags across university zones.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{isPosting ? 'Cancel' : 'Report Lost / Found'}</span>
        </button>
      </div>

      {isPosting && (
        <form onSubmit={handlePost} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Report an Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Notice Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'Lost' | 'Found')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Lost">Lost Item (I misplaced something)</option>
                <option value="Found">Found Item (I discovered an item)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Item Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Blue Titan Octane Watch"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Location *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Block Audi Row 4"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Contact / Handover *</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. Deposited with Library Staff"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
            >
              Broadcast Report
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itemsList.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.type === 'Lost'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {item.type.toUpperCase()}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Returned to Owner'
                      ? 'bg-slate-100 text-slate-600 line-through'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>

              <div className="mt-2 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Spot: <strong className="text-slate-800">{item.location}</strong></span>
                </div>
                <p className="text-[11px] text-slate-600">Handover: {item.contact}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">By {item.postedBy} • {item.date}</span>
              {item.status !== 'Returned to Owner' && (
                <button
                  onClick={() => markResolved(item.id)}
                  className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Returned</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
