import React from 'react';
import {
  Recycle,
  Search,
  Bell,
  Plus,
  Sparkles,
  Heart,
  User,
  LogOut,
  LogIn,
  IndianRupee,
  Leaf,
  Layers,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeView: 'marketplace' | 'sustainability' | 'hub' | 'admin';
  setActiveView: (view: 'marketplace' | 'sustainability' | 'hub' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const {
    currentUser,
    setIsAuthModalOpen,
    setIsListingModalOpen,
    setIsNotificationsModalOpen,
    unreadNotifsCount,
    logout,
    searchTerm,
    setSearchTerm,
    wishlist,
    sustainabilityStats,
    registeredUsers,
    switchUser,
    darkMode,
    toggleDarkMode,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131b26]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('marketplace')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                    Campus Waste Bank
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Super-Hub
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight mt-0.5">
                  Circular Campus Marketplace & Student Life
                </span>
              </div>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search laptops, books, calculators, mini drafters..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Theme Toggle, Savings, Notifications, Add Item, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent dark:border-slate-750 transition"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-400 transition transform hover:rotate-45" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-600 transition transform hover:-rotate-12" />
              )}
            </button>

            {/* Campus Savings Chip */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-xs text-emerald-900 dark:text-emerald-300">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">Campus Saved:</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                ₹{(sustainabilityStats.studentSavingsInr / 1000).toFixed(0)}k+
              </span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsModalOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Campus Notifications"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Create Listing Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsListingModalOpen(true);
                }
              }}
              className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">List Reusable Item</span>
              <span className="sm:hidden">List</span>
            </button>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-700">
                {/* Green points badge */}
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-900 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{currentUser.greenPoints} Pts</span>
                </div>

                {/* Profile pill */}
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    />
                    <div className="hidden xl:block text-left">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-none">
                        {currentUser.department}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 hidden group-hover:block hover:block z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center justify-between text-[10px] font-medium text-emerald-800 dark:text-emerald-400">
                        <span>{currentUser.department} • {currentUser.year}</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">{currentUser.greenPoints} Green Pts</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <span className="px-4 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                        Switch Registered Student:
                      </span>
                      {registeredUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => switchUser(user.id)}
                          className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                            currentUser.id === user.id
                              ? 'font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{user.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{user.department}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl border border-emerald-700 dark:border-emerald-500 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold transition flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Student Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveView('marketplace')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'marketplace'
                ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Recycle className="w-4 h-4" />
            <span>Waste Bank Marketplace</span>
          </button>

          <button
            onClick={() => setActiveView('sustainability')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'sustainability'
                ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Sustainability & Eco Calculator</span>
          </button>

          <button
            onClick={() => setActiveView('hub')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'hub'
                ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Campus Super-Hub (14 Services)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Admin Dashboard & Telemetry</span>
          </button>
        </div>
      </div>
    </header>
  );
};
