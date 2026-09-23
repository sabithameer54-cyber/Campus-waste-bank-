import React, { useState } from 'react';
import { Car, Bike, Zap, MapPin, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ParkingZone {
  id: string;
  name: string;
  type: '2-Wheeler' | '4-Wheeler' | 'EV Charging' | 'Bicycle Stand';
  totalSlots: number;
  availableSlots: number;
  location: string;
  evPoints?: number;
}

const PARKING_ZONES: ParkingZone[] = [
  {
    id: 'pz-1',
    name: 'Main Academic Block Bay A',
    type: '2-Wheeler',
    totalSlots: 220,
    availableSlots: 48,
    location: 'North Gate Entrance, adjacent to Mechanical Block',
  },
  {
    id: 'pz-2',
    name: 'Central Library EV Fast-Charging Station',
    type: 'EV Charging',
    totalSlots: 12,
    availableSlots: 4,
    location: 'Behind Central Library Solarium',
    evPoints: 12,
  },
  {
    id: 'pz-3',
    name: 'Faculty & Student Car Lot C',
    type: '4-Wheeler',
    totalSlots: 80,
    availableSlots: 15,
    location: 'West Quadrangle Gate 3',
  },
  {
    id: 'pz-4',
    name: 'Eco Green Bicycle & E-Scooter Stand',
    type: 'Bicycle Stand',
    totalSlots: 150,
    availableSlots: 74,
    location: 'Hostel Block 3 Quadrangle (Free lock-ins)',
  },
];

export const ParkingHubTab: React.FC = () => {
  const { showToast } = useApp();
  const [zones, setZones] = useState<ParkingZone[]>(PARKING_ZONES);

  const refreshSensorData = () => {
    // slight jitter simulation for live sensor updates
    setZones(
      zones.map((z) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const nextAvail = Math.max(1, Math.min(z.totalSlots, z.availableSlots + delta));
        return { ...z, availableSlots: nextAvail };
      })
    );
    showToast('IoT Parking sensor data refreshed from campus gateway!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
            <Car className="w-4 h-4 text-sky-600" />
            <span>Smart Campus Mobility & EV Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Parking Hub & Live Slot Sensors
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ultrasonic and magnetic sensor feeds indicating real-time spot occupancy for bikes, cars, EV stations, and cycles.
          </p>
        </div>

        <button
          onClick={refreshSensorData}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Sensors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone) => {
          const occupancyPct = Math.round(((zone.totalSlots - zone.availableSlots) / zone.totalSlots) * 100);
          const isBusy = occupancyPct > 80;

          return (
            <div
              key={zone.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-xs transition space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    {zone.type}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{zone.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{zone.location}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-2xl font-extrabold font-display block ${
                      isBusy ? 'text-amber-600' : 'text-emerald-700'
                    }`}
                  >
                    {zone.availableSlots}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Slots Free / {zone.totalSlots}
                  </span>
                </div>
              </div>

              {/* Occupancy bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                  <span>Occupancy</span>
                  <span className="font-bold">{occupancyPct}% Filled</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isBusy ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-time IoT feed</span>
                </span>
                <button
                  onClick={() => showToast(`Navigation route to ${zone.name} opened on campus map.`)}
                  className="text-xs font-bold text-sky-700 hover:underline"
                >
                  Navigate Spot →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
