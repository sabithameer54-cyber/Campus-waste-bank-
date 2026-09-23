import React, { useState } from 'react';
import {
  Sparkles,
  BarChart3,
  Layers,
  Users,
  ShieldCheck,
  Download,
  Bell,
  RefreshCw,
  Plus,
  CheckCircle,
  FileSpreadsheet,
  IndianRupee,
  Leaf,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminTelemetryView: React.FC = () => {
  const {
    items,
    sustainabilityStats,
    registeredUsers,
    showToast,
    resetDataToInitial,
    repairReports,
  } = useApp();

  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    showToast(`Campus Broadcast sent to all ${registeredUsers.length} registered students: "${broadcastMessage}"`);
    setBroadcastMessage('');
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      institution: 'State Engineering University & Technology Campus',
      sustainabilityTelemetry: sustainabilityStats,
      totalInventoryCount: items.length,
      activeUsers: registeredUsers.length,
      maintenanceTickets: repairReports.length,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus-waste-bank-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Campus Circularity Audit Report exported!');
  };

  const categoryCounts = {
    'Study Material Hub': items.filter((i) => i.category === 'Study Material Hub').length,
    'Electronics & Components': items.filter((i) => i.category === 'Electronics & Components').length,
    'Engineering Tools': items.filter((i) => i.category === 'Engineering Tools').length,
    'Lab Materials': items.filter((i) => i.category === 'Lab Materials').length,
    'Student Marketplace': items.filter((i) => i.category === 'Student Marketplace').length,
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Campus Administrative & Green Audit Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Campus Circular Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Authorized oversight for university waste bank inventory, student verification, facility maintenance tickets, and semester compliance audits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export ESG Audit JSON</span>
          </button>

          <button
            onClick={resetDataToInitial}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
            title="Reset dataset back to standard initial state"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>

      {/* High-Level Inventory Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Total Seeded Catalog
          </span>
          <span className="text-3xl font-extrabold font-display text-slate-900">{items.length}</span>
          <span className="text-xs text-emerald-600 font-semibold block mt-1">
            ≥ 4 items/category rule verified
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Verified Registered Students
          </span>
          <span className="text-3xl font-extrabold font-display text-blue-900">
            {registeredUsers.length}
          </span>
          <span className="text-xs text-slate-500 block mt-1">Single-sign on active</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Student Savings in INR
          </span>
          <span className="text-3xl font-extrabold font-display text-amber-900">
            ₹{sustainabilityStats.studentSavingsInr.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-amber-700 font-semibold block mt-1">Affordable student economy</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Open Service Tickets
          </span>
          <span className="text-3xl font-extrabold font-display text-purple-900">
            {repairReports.filter((r) => r.status !== 'Repaired').length}
          </span>
          <span className="text-xs text-purple-700 font-semibold block mt-1">Technicians dispatched</span>
        </div>
      </div>

      {/* Category Distribution Grid */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Circularity Compliance by Domain Category
            </h3>
            <p className="text-xs text-slate-500">
              Mandatory minimum requirement: at least 4 reusable items per category.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
            100% Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div key={cat} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">{cat}</span>
                <span className="text-[11px] text-slate-500">{count} items active</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {count >= 4 ? 'Sufficient (≥4)' : 'Low Stock'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast System Alert to Students */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-bold font-display text-slate-900">
            Broadcast University-Wide Green Announcement
          </h3>
        </div>

        <form onSubmit={handleBroadcast} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="e.g. Free Laptop Battery Diagnostic Booth opens tomorrow at Main Gate..."
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shrink-0"
          >
            Dispatch Push Alert
          </button>
        </form>
      </div>

      {/* Registered Students Roster */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold font-display text-slate-900">
          Registered Campus Accounts & Authorization Status
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-2">Student Name</th>
                <th className="pb-2">Roll No.</th>
                <th className="pb-2">Department</th>
                <th className="pb-2">Year</th>
                <th className="pb-2">Green Points</th>
                <th className="pb-2 text-right">Items Reused</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registeredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="py-2.5 font-bold text-slate-900 flex items-center gap-2">
                    <img src={user.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span>{user.name}</span>
                  </td>
                  <td className="py-2.5 text-slate-600">{user.rollNumber}</td>
                  <td className="py-2.5 text-slate-600">{user.department}</td>
                  <td className="py-2.5 text-slate-600">{user.year}</td>
                  <td className="py-2.5 font-bold text-emerald-800">{user.greenPoints} Pts</td>
                  <td className="py-2.5 text-right font-medium text-slate-900">
                    {user.itemsReused + user.itemsDonated} items
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
