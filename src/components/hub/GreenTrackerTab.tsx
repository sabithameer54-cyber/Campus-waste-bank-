import React, { useState } from 'react';
import {
  Leaf,
  Sun,
  BatteryCharging,
  Recycle,
  Sparkles,
  TreePine,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RecyclingStream {
  id: string;
  name: string;
  color: string;
  collectedKg: number;
  dropOffLocation: string;
  instructions: string;
  status: 'Accepting Drop-offs' | 'Collection En-Route';
}

const RECYCLING_STREAMS: RecyclingStream[] = [
  {
    id: 'stream-1',
    name: 'E-Waste & Damaged Electronics',
    color: 'from-purple-500 to-indigo-600',
    collectedKg: 284,
    dropOffLocation: 'ECE Block Ground Floor & Main Gate Booth',
    instructions: 'Broken laptop motherboards, lithium batteries, dead power banks, burnt ICs, and frayed phone cables.',
    status: 'Accepting Drop-offs',
  },
  {
    id: 'stream-2',
    name: 'Paper & Old Semester Records',
    color: 'from-amber-500 to-yellow-600',
    collectedKg: 890,
    dropOffLocation: 'Central Library Rear Portico & Exam Cell',
    instructions: 'Rough sheets, spiral bound notebooks, assignment papers, and shredded lab journals.',
    status: 'Accepting Drop-offs',
  },
  {
    id: 'stream-3',
    name: 'Plastics & PET Bottles',
    color: 'from-blue-500 to-cyan-600',
    collectedKg: 430,
    dropOffLocation: 'Hostel Canteen Hubs & Mechanical Workshop',
    instructions: 'Clean crushable beverage bottles, 3D printing PLA scrap filaments, and packaging bubble wrap.',
    status: 'Collection En-Route',
  },
  {
    id: 'stream-4',
    name: 'Metals & Hardware Scrap',
    color: 'from-slate-600 to-slate-800',
    collectedKg: 310,
    dropOffLocation: 'Mechanical Foundry & Civil Surveying Yard',
    instructions: 'Turned lathe swarf, broken aluminium drawing frames, copper wires, and steel brackets.',
    status: 'Accepting Drop-offs',
  },
  {
    id: 'stream-5',
    name: 'Dry Cell & Lead Batteries',
    color: 'from-rose-500 to-red-600',
    collectedKg: 95,
    dropOffLocation: 'Chemistry Lab Hazardous Locker & Physics Quad',
    instructions: 'Alkaline AA/AAA cells, multimeter 9V blocks, and robotics LiPo swollen packs.',
    status: 'Accepting Drop-offs',
  },
];

export const GreenTrackerTab: React.FC = () => {
  const { sustainabilityStats, showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Campus Microgrid & Material Stream Telemetry</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Green Campus Tracker & Specialized Recycling Hub
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Live sensor feeds from rooftop solar microgrids, organic composting pits, and our 5 dedicated campus recycling segregations.
          </p>
        </div>

        <button
          onClick={() => showToast('Campus Drop-off QR Pass generated on your student account!')}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shrink-0"
        >
          Generate Drop-off Pass
        </button>
      </div>

      {/* Campus Live Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900 uppercase">Rooftop Solar Generation</span>
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-display text-amber-950">
            184.2 <span className="text-sm font-normal">kWh today</span>
          </div>
          <p className="text-[11px] text-amber-800">Powers Library AC & Computer Labs with 100% clean sun power.</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-900 uppercase">Campus Native Trees Planted</span>
            <TreePine className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-display text-emerald-950">
            1,240 <span className="text-sm font-normal">trees</span>
          </div>
          <p className="text-[11px] text-emerald-800">12 trees sponsored this week through student item reuse credits.</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-900 uppercase">Organic Mess Composting</span>
            <Recycle className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold font-display text-teal-950">
            620 <span className="text-sm font-normal">kg / month</span>
          </div>
          <p className="text-[11px] text-teal-800">Hostel food scrap converted to fertilizer for campus botanical gardens.</p>
        </div>
      </div>

      {/* Specialized Recycling Streams */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Dedicated Segregated Recycling Streams
            </h3>
            <p className="text-xs text-slate-500">
              Never mix waste. Drop items at the designated collection booths across university blocks.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
            5 Active Streams
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECYCLING_STREAMS.map((stream) => (
            <div
              key={stream.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{stream.name}</h4>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      stream.status === 'Accepting Drop-offs'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {stream.status}
                  </span>
                </div>

                <div className="p-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Collected This Term:</span>
                  <span className="text-emerald-700">{stream.collectedKg} kg</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{stream.instructions}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{stream.dropOffLocation}</span>
                </div>
                <button
                  onClick={() => showToast(`Directions to ${stream.dropOffLocation} loaded.`)}
                  className="w-full py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Locate Bin on Campus Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
