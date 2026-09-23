import React, { useState } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Clock, Plus, MapPin, Sparkles, User, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ServiceHubTab: React.FC = () => {
  const { repairReports, addRepairReport, currentUser, showToast } = useApp();
  const [isReporting, setIsReporting] = useState(false);

  const [itemTitle, setItemTitle] = useState('');
  const [category, setCategory] = useState('Electrical Fixtures (Fans / Lights)');
  const [issueDescription, setIssueDescription] = useState('');
  const [location, setLocation] = useState('Main Block');
  const [assignedTo, setAssignedTo] = useState('Campus Maintenance Technicians');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !issueDescription.trim()) return;

    addRepairReport({
      itemTitle: itemTitle.trim(),
      category,
      issueDescription: issueDescription.trim(),
      location,
      reportedBy: currentUser ? `${currentUser.name} (${currentUser.rollNumber})` : 'Student Anonymous',
      assignedTo,
    });

    setIsReporting(false);
    setItemTitle('');
    setIssueDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4 text-slate-700" />
            <span>Campus Maintenance & Circular Refurbishment</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Service Hub & Repair & Reuse Desk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Report broken classroom fans, lab instruments, water dispensers or damaged electronics. Connect directly with campus technicians and IEEE student repair clubs.
          </p>
        </div>

        <button
          onClick={() => setIsReporting(!isReporting)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{isReporting ? 'Cancel' : 'Report Broken Item'}</span>
        </button>
      </div>

      {isReporting && (
        <form onSubmit={handleReportSubmit} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Submit Repair or Maintenance Ticket</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Item / Fixture Needing Repair *
              </label>
              <input
                type="text"
                required
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="e.g. Oscilloscope Probe or Ceiling Fan Regulator"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Service Domain *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Electrical Fixtures (Fans / Lights)">Electrical Fixtures (Fans / Lights)</option>
                <option value="Lab Instruments & Electronics">Lab Instruments & Electronics</option>
                <option value="Plumbing & Water Coolers">Plumbing & Water Coolers</option>
                <option value="Hostel Wi-Fi & IT Peripherals">Hostel Wi-Fi & IT Peripherals</option>
                <option value="Classroom Furniture & Desks">Classroom Furniture & Desks</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Exact Location / Room *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mechanical Workshop Room 204 or Library 2nd Floor"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Dispatch To *
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Campus Maintenance Technicians">Campus Maintenance Technicians</option>
                <option value="IEEE Student Repair Club">IEEE Student Repair Club</option>
                <option value="FOSS Club Hardware Volunteers">FOSS Club Hardware Volunteers</option>
                <option value="Estate Plumbing Cell">Estate Plumbing Cell</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Issue Diagnosis *
            </label>
            <textarea
              rows={2}
              required
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe symptoms, noise, sparking, or broken plastic clip."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
            >
              Dispatch Ticket
            </button>
          </div>
        </form>
      )}

      {/* List of active tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repairReports.map((report) => (
          <div
            key={report.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {report.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{report.itemTitle}</h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  report.status === 'Repaired'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : report.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {report.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{report.issueDescription}</p>

            <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{report.location}</span>
                </span>
                <span>Reported: {report.reportedAt}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span>By: {report.reportedBy}</span>
                <span className="font-semibold text-slate-800">Assignee: {report.assignedTo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
