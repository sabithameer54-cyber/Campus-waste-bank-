import React from 'react';
import {
  Heart,
  MapPin,
  Sparkles,
  ArrowRightLeft,
  Clock,
  CheckCircle,
  Eye,
  IndianRupee,
  Layers,
  Check,
} from 'lucide-react';
import { CampusItem } from '../types';
import { useApp } from '../context/AppContext';

interface ItemCardProps {
  item: CampusItem;
  onOpenDetails: (item: CampusItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onOpenDetails }) => {
  const { wishlist, toggleWishlist, markAsReused, currentUser, showToast } = useApp();
  const isWishlisted = wishlist.includes(item.id);
  const isOwner = currentUser?.id === item.ownerId;
  const isReused = item.status === 'Reused';
  const isBorrowed = item.status === 'Borrowed';

  return (
    <div
      className={`group bg-white dark:bg-[#131b26] rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-lg ${
        isReused
          ? 'border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20'
          : isBorrowed
          ? 'border-amber-200 dark:border-amber-900/60'
          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600'
      }`}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Left: Listing Type Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {item.listingType === 'FREE' && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-xs shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                100% FREE
              </span>
            )}
            {item.listingType === 'SELL' && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-700 text-white font-bold text-xs shadow-xs flex items-center gap-0.5">
                <span>₹</span>
                <span>{item.price?.toLocaleString('en-IN')}</span>
              </span>
            )}
            {item.listingType === 'EXCHANGE' && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs shadow-xs flex items-center gap-1">
                <ArrowRightLeft className="w-3 h-3" />
                Swap
              </span>
            )}
            {item.listingType === 'BORROW' && (
              <span className="px-2.5 py-1 rounded-lg bg-teal-700 dark:bg-teal-600 text-white font-bold text-xs shadow-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Borrow ({item.borrowDurationDays || 7}d)
              </span>
            )}

            {/* Reused Status Overlay */}
            {isReused && (
              <span className="px-2 py-0.5 rounded-md bg-purple-700 text-white font-bold text-[10px] shadow-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Reused & Saved
              </span>
            )}
            {isBorrowed && !isReused && (
              <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white font-bold text-[10px] shadow-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> Currently on Loan
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Heart */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-xs transition shadow-xs ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/85 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Bottom Overlay: Department & Sub-category */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-800 dark:text-slate-200 font-semibold shadow-2xs">
              {item.department} • {item.yearOfStudy}
            </span>
            {item.sub_category && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-800/90 dark:bg-emerald-700/90 backdrop-blur-xs text-emerald-100 font-bold flex items-center gap-1 shadow-2xs">
                <Layers className="w-2.5 h-2.5" />
                {item.sub_category}
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.category}</span>
            <span>•</span>
            <span className="text-slate-600 dark:text-slate-400">{item.condition}</span>
          </div>

          <h3
            onClick={() => onOpenDetails(item)}
            className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition line-clamp-2 cursor-pointer mb-2"
          >
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>

          {/* Exchange or Borrow Note if applicable */}
          {item.listingType === 'EXCHANGE' && item.exchangeFor && (
            <div className="mb-3 p-2 bg-blue-50/80 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/70 text-[11px] text-blue-900 dark:text-blue-300 flex items-start gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-medium">Looking for: {item.exchangeFor}</span>
            </div>
          )}

          {/* Location & Owner */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{item.location}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{item.ownerName.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-3 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(item)}
          className="flex-1 py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        {!isReused && (
          <button
            onClick={() => markAsReused(item.id)}
            title="Mark as Reused to update Campus Sustainability stats"
            className="py-1.5 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold transition flex items-center gap-1"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mark Reused</span>
          </button>
        )}
      </div>
    </div>
  );
};
