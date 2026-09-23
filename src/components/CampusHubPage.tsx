import React, { useState } from 'react';
import {
  Users,
  Target,
  Bell,
  Wrench,
  Calendar,
  PiggyBank,
  Leaf,
  ShieldAlert,
  Car,
  Lightbulb,
  GraduationCap,
  Search,
  Clock,
  Sparkles,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { SkillExchangeTab } from './hub/SkillExchangeTab';
import { OpportunityHubTab } from './hub/OpportunityHubTab';
import { NoticeHubTab } from './hub/NoticeHubTab';
import { ClubHubTab } from './hub/ClubHubTab';
import { ServiceHubTab } from './hub/ServiceHubTab';
import { EventHubTab } from './hub/EventHubTab';
import { SavingsHubTab } from './hub/SavingsHubTab';
import { GreenTrackerTab } from './hub/GreenTrackerTab';
import { EmergencyHubTab } from './hub/EmergencyHubTab';
import { ParkingHubTab } from './hub/ParkingHubTab';
import { IdeaBoxTab } from './hub/IdeaBoxTab';
import { SeniorJuniorTab } from './hub/SeniorJuniorTab';
import { LostFoundTab } from './hub/LostFoundTab';
import { BorrowTrackerTab } from './hub/BorrowTrackerTab';

export type HubTabType =
  | 'skills'
  | 'opportunities'
  | 'notices'
  | 'clubs'
  | 'services'
  | 'events'
  | 'savings'
  | 'greentracker'
  | 'emergency'
  | 'parking'
  | 'ideabox'
  | 'seniorjunior'
  | 'lostfound'
  | 'borrow';

interface TabDefinition {
  id: HubTabType;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  description: string;
}

const HUB_TABS: TabDefinition[] = [
  { id: 'skills', label: 'Skill Exchange', icon: <Users className="w-4 h-4" />, description: 'Peer technical swaps & tutoring' },
  { id: 'opportunities', label: 'Opportunities & Internships', icon: <Target className="w-4 h-4" />, badge: 'Active', description: 'Placements, hackathons & certificates' },
  { id: 'notices', label: 'Campus Notices', icon: <Bell className="w-4 h-4" />, description: 'Exams, scholarships & circulars' },
  { id: 'clubs', label: 'Club Hub', icon: <Sparkles className="w-4 h-4" />, description: 'Technical & eco societies' },
  { id: 'services', label: 'Service Hub & Repairs', icon: <Wrench className="w-4 h-4" />, description: 'Report broken fixtures & repair desk' },
  { id: 'events', label: 'Events & Symposia', icon: <Calendar className="w-4 h-4" />, description: 'Fests, hackathons & book fairs' },
  { id: 'savings', label: 'Savings Hub (Free)', icon: <PiggyBank className="w-4 h-4" />, badge: 'Free', description: 'Zero-cost giveaways & vouchers' },
  { id: 'greentracker', label: 'Green Campus Tracker', icon: <Leaf className="w-4 h-4" />, description: 'Solar microgrid & 5-stream recycling' },
  { id: 'emergency', label: 'Emergency Hub', icon: <ShieldAlert className="w-4 h-4 text-red-500" />, badge: '24/7', description: 'SOS dispatch, ambulance & safety' },
  { id: 'parking', label: 'Parking & EV Slots', icon: <Car className="w-4 h-4" />, description: 'Real-time ultrasonic spot sensors' },
  { id: 'ideabox', label: 'Campus Idea Box', icon: <Lightbulb className="w-4 h-4" />, description: 'Student voice & innovation incubator' },
  { id: 'seniorjunior', label: 'Senior–Junior Connect', icon: <GraduationCap className="w-4 h-4" />, description: 'Lecture notes & syllabus tips' },
  { id: 'lostfound', label: 'Lost & Found', icon: <Search className="w-4 h-4" />, description: 'ID cards, calculators & campus items' },
  { id: 'borrow', label: 'Borrow & Return', icon: <Clock className="w-4 h-4" />, description: 'Short-term calculator & tool loans' },
];

export const CampusHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubTabType>('skills');

  const activeTabDef = HUB_TABS.find((t) => t.id === activeTab) || HUB_TABS[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Super-Hub Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Integrated Student Services Super-Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Campus Life & Resource Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Everything a student needs in one unified terminal: academic peer exchange, placement tracking, maintenance requests, campus emergency response, and circular sustainability.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs text-center border border-white/10">
            <span className="block text-2xl font-extrabold font-display text-emerald-400">14</span>
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">
              Connected Hubs
            </span>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs text-center border border-white/10">
            <span className="block text-2xl font-extrabold font-display text-teal-300">100%</span>
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">
              Student-Driven
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Tab Navigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {HUB_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                      isActive
                        ? 'bg-emerald-900 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content Router */}
      <main className="transition-all duration-150">
        {activeTab === 'skills' && <SkillExchangeTab />}
        {activeTab === 'opportunities' && <OpportunityHubTab />}
        {activeTab === 'notices' && <NoticeHubTab />}
        {activeTab === 'clubs' && <ClubHubTab />}
        {activeTab === 'services' && <ServiceHubTab />}
        {activeTab === 'events' && <EventHubTab />}
        {activeTab === 'savings' && <SavingsHubTab />}
        {activeTab === 'greentracker' && <GreenTrackerTab />}
        {activeTab === 'emergency' && <EmergencyHubTab />}
        {activeTab === 'parking' && <ParkingHubTab />}
        {activeTab === 'ideabox' && <IdeaBoxTab />}
        {activeTab === 'seniorjunior' && <SeniorJuniorTab />}
        {activeTab === 'lostfound' && <LostFoundTab />}
        {activeTab === 'borrow' && <BorrowTrackerTab />}
      </main>
    </div>
  );
};
