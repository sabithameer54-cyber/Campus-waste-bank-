import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Laptop,
  Wrench,
  FlaskConical,
  ShoppingBag,
  Sparkles,
  Filter,
  ArrowRightLeft,
  Clock,
  Layers,
  Search,
  IndianRupee,
  RefreshCw,
  Plus,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusItem, MainCategory, EngineeringSubCategory, ListingType, DepartmentType } from '../types';
import { ItemCard } from './ItemCard';

interface MarketplaceViewProps {
  onOpenItemDetails: (item: CampusItem) => void;
}

const CATEGORIES_CONFIG: { id: string; label: string; icon: React.ReactNode; countKey?: string }[] = [
  { id: 'All', label: 'All Items', icon: <Layers className="w-4 h-4" /> },
  { id: 'Study Material Hub', label: '📚 Study Material Hub', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'Electronics & Components', label: '💻 Electronics & Laptops (₹)', icon: <Laptop className="w-4 h-4" /> },
  { id: 'Engineering Tools', label: '🧪 Engineering Tools', icon: <Wrench className="w-4 h-4" /> },
  { id: 'Lab Materials', label: '🥼 Lab Materials', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'Student Marketplace', label: '🎒 Student Marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
];

const SUB_CATEGORIES: (EngineeringSubCategory | 'All')[] = ['All', 'Mechanical', 'Civil', 'Electrical', 'CS'];

const DEPARTMENTS: (DepartmentType | 'All')[] = [
  'All',
  'CSE',
  'ECE',
  'EEE',
  'ME',
  'CE',
  'IT',
  'Science',
  'Management',
];

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onOpenItemDetails }) => {
  const {
    items,
    currentUser,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedListingType,
    setSelectedListingType,
    selectedDepartment,
    setSelectedDepartment,
    setIsListingModalOpen,
    setIsAuthModalOpen,
  } = useApp();

  const isEnggOrLabCategory =
    selectedCategory === 'Engineering Tools' ||
    selectedCategory === 'Lab Materials' ||
    selectedCategory === 'All';

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        const matchSub = item.sub_category?.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchOwner = item.ownerName.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCat && !matchSub && !matchTags && !matchOwner) {
          return false;
        }
      }

      // Primary Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Sub-category for Engineering Tools & Lab Materials (Indexed Filter Search)
      if (selectedSubCategory !== 'All') {
        if (item.sub_category !== selectedSubCategory) {
          return false;
        }
      }

      // Listing Type (FREE, SELL, EXCHANGE, BORROW)
      if (selectedListingType !== 'All' && item.listingType !== selectedListingType) {
        return false;
      }

      // Department
      if (selectedDepartment !== 'All' && item.department !== selectedDepartment) {
        return false;
      }

      return true;
    });
  }, [items, searchTerm, selectedCategory, selectedSubCategory, selectedListingType, selectedDepartment]);

  // Smart Recommendations for current user
  const recommendedItems = useMemo(() => {
    if (!currentUser) return [];
    return items
      .filter(
        (i) =>
          i.department === currentUser.department ||
          i.tags.some((t) => ['Laptop', 'Calculator', 'DSA', 'Ubuntu'].includes(t))
      )
      .slice(0, 3);
  }, [items, currentUser]);

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Circular Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Campus Circular Economy & Zero Waste Initiative</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Give Unwanted Items a Second Life on Campus
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Pass on textbooks, laboratory instruments, drawing tools, calculators, and affordable old laptops
            to fellow juniors instead of throwing them away. Save student money and shrink our university footprint.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (!currentUser) setIsAuthModalOpen(true);
                else setIsListingModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>List Reusable Item (+25 Green Pts)</span>
            </button>
            <div className="flex items-center gap-4 text-xs text-emerald-200">
              <span>✓ All prices strictly in ₹ INR</span>
              <span>✓ Free donations & peer swaps</span>
            </div>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-16 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Smart Recommendations Bar for Current User */}
      {currentUser && recommendedItems.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Smart Suggestions for {currentUser.name} ({currentUser.department} {currentUser.year})
              </h2>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
              Tailored to your branch syllabus & search history
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenItemDetails(item)}
                className="p-2.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition cursor-pointer flex items-center gap-3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-emerald-700">{item.category}</div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                    {item.listingType === 'FREE' && <span className="text-emerald-700">FREE</span>}
                    {item.listingType === 'SELL' && <span>₹{item.price?.toLocaleString('en-IN')}</span>}
                    {item.listingType === 'EXCHANGE' && <span className="text-blue-700">Swap</span>}
                    {item.listingType === 'BORROW' && <span className="text-teal-700">Borrow</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Category Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const count =
              cat.id === 'All'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Category Filter Bar (Refactored schema: Indexed Filter Search for Engineering Tools & Lab Materials) */}
      {isEnggOrLabCategory && (
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-emerald-600 text-white">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                Engineering Tools & Lab Materials Sub-Category Index
              </span>
              <span className="text-[11px] text-emerald-700">
                Filter by specific engineering branch discipline
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {SUB_CATEGORIES.map((sub) => {
              const isSelected = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {sub === 'All' ? 'All Disciplines' : `${sub} Engineering`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary Filter Row: Listing Type & Department */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Listing Type Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Type:
          </span>
          {[
            { id: 'All', label: 'All Modes' },
            { id: 'FREE', label: '🤝 100% Free' },
            { id: 'SELL', label: '₹ Buy Low Rate' },
            { id: 'EXCHANGE', label: '🔄 Peer Swap' },
            { id: 'BORROW', label: '📦 Borrow Loan' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedListingType(type.id as ListingType | 'All')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedListingType === type.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Department Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Branch:</span>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value as DepartmentType | 'All')}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
        <div>
          Showing <strong className="text-slate-900">{filteredItems.length}</strong> usable items in{' '}
          <strong className="text-emerald-800">
            {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
          </strong>
          {selectedSubCategory !== 'All' && (
            <span> ({selectedSubCategory} Engineering)</span>
          )}
        </div>

        {(searchTerm ||
          selectedCategory !== 'All' ||
          selectedSubCategory !== 'All' ||
          selectedListingType !== 'All' ||
          selectedDepartment !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedSubCategory('All');
              setSelectedListingType('All');
              setSelectedDepartment('All');
            }}
            className="text-emerald-700 hover:underline font-bold text-xs"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Items */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No items match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your branch or category filter, or list the item yourself to help others in campus!
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedSubCategory('All');
              setSelectedListingType('All');
              setSelectedDepartment('All');
            }}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onOpenDetails={onOpenItemDetails} />
          ))}
        </div>
      )}
    </div>
  );
};
