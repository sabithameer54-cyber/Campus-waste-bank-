import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MarketplaceView } from './components/MarketplaceView';
import { SustainabilityDashboard } from './components/SustainabilityDashboard';
import { CampusHubPage } from './components/CampusHubPage';
import { AdminTelemetryView } from './components/AdminTelemetryView';
import { AuthModal } from './components/AuthModal';
import { ListingModal } from './components/ListingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CampusItem } from './types';
import { MapPin, Recycle, Leaf, ShieldAlert, Sparkles, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'marketplace' | 'sustainability' | 'hub' | 'admin'>('marketplace');
  const [detailedItem, setDetailedItem] = useState<CampusItem | null>(null);

  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    isListingModalOpen,
    setIsListingModalOpen,
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    toastMessage,
    sustainabilityStats,
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 dark:selection:bg-emerald-800 dark:selection:text-emerald-100 transition-colors duration-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-sm">
          <div className="bg-slate-950 dark:bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-700 flex items-center gap-3 text-xs">
            <div className="p-1 rounded-full bg-emerald-500 text-slate-950 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="flex-1 font-medium leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeView === 'marketplace' && (
          <MarketplaceView onOpenItemDetails={(item) => setDetailedItem(item)} />
        )}

        {activeView === 'sustainability' && <SustainabilityDashboard />}

        {activeView === 'hub' && <CampusHubPage />}

        {activeView === 'admin' && <AdminTelemetryView />}
      </main>

      {/* Global Modals */}
      <AuthModal />
      <ListingModal />
      <NotificationsModal />
      <ItemDetailModal
        item={detailedItem}
        onClose={() => setDetailedItem(null)}
      />

      {/* Campus Footprint & Locations Footer */}
      <footer className="bg-white dark:bg-[#131b26] border-t border-slate-200 dark:border-slate-800 mt-auto py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Recycle className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-slate-900 dark:text-white text-sm">
                  Campus Waste Bank & Super-Hub Platform
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                Empowering university students with zero-waste material circularity, free textbook reuse, and transparent peer exchanges.
              </p>
            </div>

            {/* Designated Campus Hub Drop-off Locations */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Designated Handover & Drop-off Zones
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-medium flex items-center gap-1 border border-transparent dark:border-slate-700/60">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Central Library Foyer
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-medium flex items-center gap-1 border border-transparent dark:border-slate-700/60">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Department Blocks (CSE/ECE/ME/CE)
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-medium flex items-center gap-1 border border-transparent dark:border-slate-700/60">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Hostel 1 & 2 Porticos
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-medium flex items-center gap-1 border border-transparent dark:border-slate-700/60">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Main Block Portico
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-medium flex items-center gap-1 border border-transparent dark:border-slate-700/60">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> E-Waste & Recycling Center
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <p>© 2026 Campus Circularity Project. All prices strictly in Indian Rupees (₹).</p>
            <div className="flex items-center gap-4 text-emerald-800 dark:text-emerald-400 font-semibold">
              <span>{sustainabilityStats.wasteAvoidedKg} kg Solid Waste Prevented</span>
              <span>•</span>
              <span>₹{sustainabilityStats.studentSavingsInr.toLocaleString('en-IN')} Saved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
