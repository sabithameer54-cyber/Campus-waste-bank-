import React, { useState } from 'react';
import {
  Leaf,
  Recycle,
  Sparkles,
  TrendingUp,
  Award,
  DollarSign,
  IndianRupee,
  Layers,
  Calculator,
  CheckCircle,
  Users,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EcoCalculatorPreset {
  name: string;
  category: string;
  wasteKg: number;
  co2Kg: number;
  savingsInr: number;
  isEWaste?: boolean;
}

const CALCULATOR_PRESETS: EcoCalculatorPreset[] = [
  { name: 'University Textbook (DSA / Math)', category: 'Paper', wasteKg: 1.2, co2Kg: 2.8, savingsInr: 750 },
  { name: 'Old Student Laptop (Lenovo/Dell)', category: 'E-Waste', wasteKg: 2.4, co2Kg: 45.0, savingsInr: 25000, isEWaste: true },
  { name: 'Scientific Calculator (Casio fx-991)', category: 'E-Waste', wasteKg: 0.3, co2Kg: 4.5, savingsInr: 1400, isEWaste: true },
  { name: 'Arduino / ESP32 Sensor Kit', category: 'E-Waste', wasteKg: 0.5, co2Kg: 5.5, savingsInr: 1200, isEWaste: true },
  { name: 'Engineering Mini Drafter', category: 'Metal & Plastic', wasteKg: 1.5, co2Kg: 3.8, savingsInr: 950 },
  { name: 'Cotton Lab Coat & Splash Goggles', category: 'Textiles', wasteKg: 0.6, co2Kg: 2.2, savingsInr: 450 },
  { name: 'Concrete Slump Cone Apparatus', category: 'Metal', wasteKg: 3.5, co2Kg: 6.8, savingsInr: 1800 },
  { name: 'Campus Backpack 35L', category: 'Textiles', wasteKg: 1.1, co2Kg: 4.0, savingsInr: 1500 },
];

export const SustainabilityDashboard: React.FC = () => {
  const { sustainabilityStats, registeredUsers, currentUser } = useApp();

  // Interactive Eco Calculator State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [customCalculated, setCustomCalculated] = useState(false);

  const activePreset = CALCULATOR_PRESETS[selectedPresetIndex];
  const totalWasteSaved = (activePreset.wasteKg * itemQuantity).toFixed(1);
  const totalCo2Saved = (activePreset.co2Kg * itemQuantity).toFixed(1);
  const totalSavingsInr = (activePreset.savingsInr * itemQuantity).toLocaleString('en-IN');
  const treeEquivalent = (Number(totalCo2Saved) / 21).toFixed(2); // ~21 kg CO2 absorbed per tree per year

  // Sort leaderboard by green points
  const sortedStudents = [...registeredUsers].sort((a, b) => b.greenPoints - a.greenPoints);

  const departmentMetrics = [
    { dept: 'Computer Science (CSE)', items: 48, points: 1420, rate: '92% Circularity' },
    { dept: 'Electronics & Comm (ECE)', items: 34, points: 980, rate: '85% Circularity' },
    { dept: 'Mechanical Engineering (ME)', items: 29, points: 890, rate: '81% Circularity' },
    { dept: 'Civil Engineering (CE)', items: 22, points: 740, rate: '78% Circularity' },
    { dept: 'Electrical & Electronics (EEE)', items: 19, points: 610, rate: '76% Circularity' },
    { dept: 'Information Technology (IT)', items: 17, points: 550, rate: '74% Circularity' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campus Circular Economy Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Sustainability Dashboard & Eco Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Real-time environmental and student financial indicators computed automatically from university item reuses, donations, swaps, and e-waste diversion.
          </p>
        </div>

        {currentUser && (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold font-display">
              {currentUser.greenPoints}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-emerald-700">
                Level 4 Campus Eco Ambassador
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Items Reused
          </div>
          <div className="text-2xl font-extrabold font-display text-slate-900">
            {sustainabilityStats.itemsReused}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            +12 this semester
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Items Donated
          </div>
          <div className="text-2xl font-extrabold font-display text-emerald-700">
            {sustainabilityStats.itemsDonated}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            100% Free pool
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Waste Avoided
          </div>
          <div className="text-2xl font-extrabold font-display text-teal-800">
            {sustainabilityStats.wasteAvoidedKg} <span className="text-xs font-normal">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Solid waste diverted
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            CO₂ Avoided
          </div>
          <div className="text-2xl font-extrabold font-display text-emerald-800">
            {sustainabilityStats.co2AvoidedKg} <span className="text-xs font-normal">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Emissions spared
          </div>
        </div>

        {/* Metric 5: Student Savings in INR */}
        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
            Student Savings
          </div>
          <div className="text-2xl font-extrabold font-display text-amber-900 flex items-center">
            <span>₹</span>
            <span>{(sustainabilityStats.studentSavingsInr / 1000).toFixed(0)}k</span>
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            ₹{sustainabilityStats.studentSavingsInr.toLocaleString('en-IN')} total
          </div>
        </div>

        {/* Metric 6: E-Waste Diverted */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            E-Waste Diverted
          </div>
          <div className="text-2xl font-extrabold font-display text-purple-900">
            {sustainabilityStats.eWasteDivertedKg} <span className="text-xs font-normal">kg</span>
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            Hazardous parts safe
          </div>
        </div>
      </div>

      {/* Interactive Eco Calculator */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">
                Interactive Campus Eco Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Select an item and quantity to calculate exact environmental savings before donating or reusing.
              </p>
            </div>
          </div>

          <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
            Formula calibrated to peer university sustainability benchmarks
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Choose Reusable Campus Item *
              </label>
              <select
                value={selectedPresetIndex}
                onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {CALCULATOR_PRESETS.map((preset, idx) => (
                  <option key={preset.name} value={idx}>
                    {preset.name} ({preset.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                <span>Quantity Reused / Donated</span>
                <span className="text-emerald-800 font-extrabold">{itemQuantity} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 unit</span>
                <span>10 units</span>
                <span>20 units</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">Campus Rule of Thumb:</span>
              Donating a single textbook or calculator prevents raw chemical & paper manufacturing cycles while saving junior students hundreds of rupees.
            </div>
          </div>

          {/* Results Visualizer */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                Landfill Waste Spared
              </span>
              <span className="text-3xl font-extrabold font-display text-emerald-950 block">
                {totalWasteSaved} <span className="text-sm font-normal">kg</span>
              </span>
              <span className="text-[11px] text-emerald-700 block mt-1">
                {activePreset.isEWaste ? 'Hazardous E-Waste Diverted' : 'Paper & Plastics Kept Out'}
              </span>
            </div>

            <div className="p-4 bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl border border-teal-200 text-center">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                CO₂ Emissions Avoided
              </span>
              <span className="text-3xl font-extrabold font-display text-teal-950 block">
                {totalCo2Saved} <span className="text-sm font-normal">kg</span>
              </span>
              <span className="text-[11px] text-teal-700 block mt-1">
                ≈ {treeEquivalent} mature trees offset
              </span>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-center">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                Student Funds Saved
              </span>
              <span className="text-3xl font-extrabold font-display text-amber-950 block">
                ₹{totalSavingsInr}
              </span>
              <span className="text-[11px] text-amber-800 block mt-1">
                Circulated within campus
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Leaderboard & Department Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sustainable Students */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold font-display text-slate-900">
                Top Sustainable Students (Leaderboard)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">Updated Daily</span>
          </div>

          <div className="divide-y divide-slate-100">
            {sortedStudents.map((student, index) => (
              <div
                key={student.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      index === 0
                        ? 'bg-amber-400 text-amber-950'
                        : index === 1
                        ? 'bg-slate-300 text-slate-800'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{student.name}</span>
                      {student.id === currentUser?.id && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                          You
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {student.department} • {student.itemsReused + student.itemsDonated} items given
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-800 block">
                    {student.greenPoints}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Green Pts
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">How to earn points:</span>
            <span className="text-[11px] text-emerald-800">
              Donate book (+20 pts) • Recycle E-Waste (+30 pts)
            </span>
          </div>
        </div>

        {/* Department-Wise Sustainability Activity */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold font-display text-slate-900">
                Department Circularity Index
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">Current Semester</span>
          </div>

          <div className="space-y-3.5">
            {departmentMetrics.map((dm) => (
              <div key={dm.dept} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{dm.dept}</span>
                  <span className="text-emerald-700">{dm.rate} ({dm.items} items)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${parseInt(dm.rate)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900 block">Dean’s Green Cup Incentive:</span>
            The branch with the highest end-of-year circularity index wins ₹50,000 lab equipment upgrade grant!
          </div>
        </div>
      </div>
    </div>
  );
};
