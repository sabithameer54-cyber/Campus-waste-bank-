import React from 'react';
import { ShieldAlert, PhoneCall, Ambulance, AlertTriangle, ShieldCheck, HeartPulse, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyHubTab: React.FC = () => {
  const { showToast } = useApp();

  const handleSos = (contactName: string, number: string) => {
    showToast(`Initiating emergency direct call to ${contactName} (${number})`);
  };

  const EMERGENCY_CONTACTS = [
    {
      name: 'Campus Security Main Gate 24/7',
      role: 'Quick Reaction Team & Patrol Officers',
      number: '+91 98450 11223',
      location: 'Main Gate Control Room & Hostel Post',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
    },
    {
      name: 'University Health Center & Ambulance',
      role: 'Resident Doctors, Trauma Care & Emergency Van',
      number: '+91 98450 44556',
      location: 'Ground Floor, Medical Annex Block',
      color: 'bg-red-50 border-red-200 text-red-900',
    },
    {
      name: 'Women’s Safety & Anti-Ragging Cell',
      role: 'Dean of Student Welfare & Grievance Council',
      number: '+91 1800 180 5522',
      location: 'Administrative Block Room 102',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    },
    {
      name: 'Campus Fire & Electrical Hazard Cell',
      role: 'Extinguishers & Rapid Power Grid Shutoff',
      number: '+91 98450 77889',
      location: 'Power Substation 1',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    },
  ];

  return (
    <div className="space-y-6">
      {/* SOS Alert Banner */}
      <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>24/7 Campus Emergency Protocol Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Emergency Hub & Student Safety Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl leading-relaxed">
            In case of medical emergencies, late-night transit escorts, lab hazards, or distress, tap below for immediate response.
          </p>
        </div>

        <button
          onClick={() => handleSos('All-Campus Emergency Dispatch', '112 / +91 98450 11223')}
          className="px-6 py-4 rounded-2xl bg-white text-red-700 hover:bg-red-50 text-sm font-extrabold shadow-2xl transition flex items-center justify-center gap-2 shrink-0 animate-bounce"
        >
          <PhoneCall className="w-5 h-5 text-red-600" />
          <span>INSTANT SOS CALL</span>
        </button>
      </div>

      {/* Directory of Emergency Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EMERGENCY_CONTACTS.map((item) => (
          <div
            key={item.name}
            className={`p-5 rounded-2xl border ${item.color} shadow-2xs space-y-3 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between">
                <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                <ShieldCheck className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-xs text-slate-600 mt-1">{item.role}</p>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Station: {item.location}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">{item.number}</span>
              <button
                onClick={() => handleSos(item.name, item.number)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
