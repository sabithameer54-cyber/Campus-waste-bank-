import React, { useState } from 'react';
import { Users, Award, Calendar, ExternalLink, Check, Sparkles, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CampusClub {
  id: string;
  name: string;
  category: 'Technical' | 'Sustainability' | 'Cultural' | 'Sports' | 'Social';
  members: number;
  president: string;
  meetingTime: string;
  description: string;
  joined?: boolean;
}

const CLUBS: CampusClub[] = [
  {
    id: 'cl-1',
    name: 'Campus Eco Warriors & Zero-Waste Club',
    category: 'Sustainability',
    members: 245,
    president: 'Sabith Ameer',
    meetingTime: 'Wednesdays 4:30 PM @ Green Quad',
    description: 'Manages Campus Waste Bank drop-off booths, vermicomposting pits, and university e-waste drives.',
    joined: true,
  },
  {
    id: 'cl-2',
    name: 'IEEE Student Branch & Robotics Society',
    category: 'Technical',
    members: 310,
    president: 'Sam Wilson',
    meetingTime: 'Fridays 5:00 PM @ ECE Lab 2',
    description: 'Autonomous line-follower robots, drone swarm pilots, PCB printing workshops, and tech expos.',
    joined: false,
  },
  {
    id: 'cl-3',
    name: 'FOSS Club (Free & Open Source Software)',
    category: 'Technical',
    members: 190,
    president: 'Priya Patel',
    meetingTime: 'Saturdays 10:00 AM @ CS Lab 4',
    description: 'Linux install fests, open source contributions, Git workshops, and local model training.',
    joined: true,
  },
  {
    id: 'cl-4',
    name: 'Campus Philharmonic & Music Society',
    category: 'Cultural',
    members: 120,
    president: 'Ananya S',
    meetingTime: 'Tuesdays 5:30 PM @ Music Room',
    description: 'Classical, fusion, and rock bands preparing for annual university cultural fest TechFest.',
    joined: false,
  },
];

export const ClubHubTab: React.FC = () => {
  const { showToast } = useApp();
  const [clubsList, setClubsList] = useState<CampusClub[]>(CLUBS);

  const toggleJoin = (id: string) => {
    setClubsList(
      clubsList.map((c) => {
        if (c.id === id) {
          const nextState = !c.joined;
          showToast(
            nextState
              ? `You joined "${c.name}"! Welcome orientation link emailed.`
              : `You left "${c.name}".`
          );
          return {
            ...c,
            joined: nextState,
            members: nextState ? c.members + 1 : c.members - 1,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-teal-600" />
            <span>Student Societies & Community</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Club Hub & Student Chapters
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover peer clubs, attend weekly hack nights, eco drives, and earn leadership credits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clubsList.map((club) => (
          <div
            key={club.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  {club.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{club.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lead: {club.president} • {club.members} active students
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{club.description}</p>

            <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 flex items-center justify-between">
              <span className="font-medium text-slate-700">Weekly Assembly:</span>
              <span className="font-bold text-slate-900">{club.meetingTime}</span>
            </div>

            <button
              onClick={() => toggleJoin(club.id)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                club.joined
                  ? 'bg-teal-50 border border-teal-300 text-teal-900 hover:bg-teal-100'
                  : 'bg-teal-700 text-white hover:bg-teal-800'
              }`}
            >
              {club.joined ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span>Member (Joined)</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Join Society</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
