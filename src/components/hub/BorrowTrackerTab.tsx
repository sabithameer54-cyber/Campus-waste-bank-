import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, User, RefreshCw, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BorrowRecord {
  id: string;
  itemTitle: string;
  borrowerName: string;
  lenderName: string;
  borrowedDate: string;
  dueDate: string;
  status: 'Active' | 'Returned' | 'Extended';
  category: string;
}

const INITIAL_BORROWS: BorrowRecord[] = [
  {
    id: 'br-1',
    itemTitle: 'Casio fx-991CW ClassWiz Scientific Calculator',
    borrowerName: 'Sam Wilson (ECE)',
    lenderName: 'Sabith Ameer (CSE)',
    borrowedDate: '2026-09-18',
    dueDate: '2026-09-25',
    status: 'Active',
    category: 'Calculator',
  },
  {
    id: 'br-2',
    itemTitle: 'Omega Engineering Mini Drafter & Clamp Set',
    borrowerName: 'Aman Verma (CE)',
    lenderName: 'Karthik N (ME)',
    borrowedDate: '2026-09-15',
    dueDate: '2026-09-29',
    status: 'Active',
    category: 'Tool',
  },
  {
    id: 'br-3',
    itemTitle: 'Arduino Uno + 37 Sensors Starter Kit',
    borrowerName: 'Priya Patel (CSE)',
    lenderName: 'Sam Wilson (ECE)',
    borrowedDate: '2026-09-10',
    dueDate: '2026-09-20',
    status: 'Returned',
    category: 'Project Kit',
  },
];

export const BorrowTrackerTab: React.FC = () => {
  const { showToast } = useApp();
  const [borrows, setBorrows] = useState<BorrowRecord[]>(INITIAL_BORROWS);

  const markReturned = (id: string) => {
    setBorrows(
      borrows.map((b) => (b.id === id ? { ...b, status: 'Returned' } : b))
    );
    showToast('Item marked as Returned! Both borrower and lender earned +15 Green Points.');
  };

  const extendLoan = (id: string) => {
    setBorrows(
      borrows.map((b) => (b.id === id ? { ...b, status: 'Extended', dueDate: '2026-10-05' } : b))
    );
    showToast('Loan duration extended by 7 days. Lender notified via email.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Short-Term Resource Sharing</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Borrow & Return Tracker (Temporary Loans)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track temporary campus loans for scientific calculators, mini drafters, books, and project kits so items return on time.
          </p>
        </div>

        <button
          onClick={() => showToast('To borrow an item, browse Marketplace and click "Borrow" on any listing!')}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition shrink-0"
        >
          + Request New Loan
        </button>
      </div>

      <div className="space-y-4">
        {borrows.map((record) => (
          <div
            key={record.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  {record.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{record.itemTitle}</h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span>Borrower: <strong className="text-slate-800">{record.borrowerName}</strong></span>
                  <span>•</span>
                  <span>Lender: <strong className="text-slate-800">{record.lenderName}</strong></span>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full self-start ${
                  record.status === 'Returned'
                    ? 'bg-slate-100 text-slate-600'
                    : record.status === 'Extended'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {record.status === 'Active' ? 'Currently on Loan' : record.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Borrowed: {record.borrowedDate}</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Due Return: {record.dueDate}</span>
                </span>
              </div>

              {record.status !== 'Returned' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => extendLoan(record.id)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                  >
                    Extend +7 Days
                  </button>
                  <button
                    onClick={() => markReturned(record.id)}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Returned</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
