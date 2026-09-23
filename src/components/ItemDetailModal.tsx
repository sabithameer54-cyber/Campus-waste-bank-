import React, { useState } from 'react';
import {
  X,
  MapPin,
  Sparkles,
  Share2,
  Heart,
  User,
  Clock,
  ArrowRightLeft,
  CheckCircle,
  IndianRupee,
  Layers,
  Leaf,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { CampusItem } from '../types';
import { useApp } from '../context/AppContext';

interface ItemDetailModalProps {
  item: CampusItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const { wishlist, toggleWishlist, markAsReused, currentUser, showToast } = useApp();
  const [exchangeOffer, setExchangeOffer] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!item) return null;

  const isWishlisted = wishlist.includes(item.id);
  const isOwner = currentUser?.id === item.ownerId;
  const isReused = item.status === 'Reused';

  const handleClaimOrRequest = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast(
        `Request dispatched to ${item.ownerName}! Handover arranged at ${item.location}.`
      );
      onClose();
    }, 600);
  };

  const handleProposeExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exchangeOffer.trim()) {
      showToast('Please specify what item you want to offer in exchange.');
      return;
    }
    showToast(
      `Exchange proposal for "${item.title}" sent to ${item.ownerName}! Check Notifications for updates.`
    );
    setExchangeOffer('');
    onClose();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Item link copied! Anyone with the link can log in with registered email.');
    } else {
      showToast('Link ready to share!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full transition backdrop-blur-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Container */}
          <div className="relative bg-slate-100 min-h-[280px] md:min-h-full">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {item.listingType === 'FREE' && (
                <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 100% FREE DONATION
                </span>
              )}
              {item.listingType === 'SELL' && (
                <span className="px-3 py-1 bg-slate-950 text-white font-bold text-sm rounded-lg shadow-md flex items-center gap-1">
                  <span>₹</span>
                  <span>{item.price?.toLocaleString('en-IN')}</span>
                </span>
              )}
              {item.listingType === 'EXCHANGE' && (
                <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1">
                  <ArrowRightLeft className="w-3.5 h-3.5" /> SWAP / EXCHANGE
                </span>
              )}
              {item.listingType === 'BORROW' && (
                <span className="px-3 py-1 bg-teal-700 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> BORROW ({item.borrowDurationDays || 7} DAYS)
                </span>
              )}
            </div>

            {/* Sub-category chip */}
            {item.sub_category && (
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 bg-emerald-900/90 text-emerald-100 backdrop-blur-xs font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {item.sub_category} Engineering
                </span>
              </div>
            )}
          </div>

          {/* Right: Details & Actions */}
          <div className="p-6 flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-emerald-700">{item.category}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">
                  {item.condition}
                </span>
              </div>

              <h2 className="text-lg font-bold font-display text-slate-900 leading-snug mb-2">
                {item.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Sub-category if any */}
              {item.sub_category && (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Indexed for <strong>{item.sub_category} Engineering</strong> curriculum and lab work.
                  </span>
                </div>
              )}

              {/* Exchange desired note */}
              {item.listingType === 'EXCHANGE' && item.exchangeFor && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 mb-3 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-blue-800">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    Exchange Request from Owner:
                  </div>
                  <p className="font-medium text-slate-800">{item.exchangeFor}</p>
                </div>
              )}

              {/* Eco Impact Stats */}
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5 mb-3">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Estimated Eco Impact (Campus Bank Telemetry)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white/80 p-1.5 rounded-lg border border-emerald-100">
                    <span className="block font-bold text-emerald-800 text-xs">
                      {item.ecoImpact.wasteAvoidedKg} kg
                    </span>
                    <span className="text-[10px] text-slate-500">Waste Saved</span>
                  </div>
                  <div className="bg-white/80 p-1.5 rounded-lg border border-emerald-100">
                    <span className="block font-bold text-teal-800 text-xs">
                      {item.ecoImpact.co2AvoidedKg} kg
                    </span>
                    <span className="text-[10px] text-slate-500">CO₂ Avoided</span>
                  </div>
                  <div className="bg-white/80 p-1.5 rounded-lg border border-emerald-100">
                    <span className="block font-bold text-amber-700 text-xs">
                      ₹{item.ecoImpact.savingsInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500">Student Saved</span>
                  </div>
                </div>
              </div>

              {/* Owner Info & Location */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="font-bold text-slate-900 block">{item.ownerName}</span>
                      <span className="text-[11px] text-slate-500">
                        {item.department} • {item.yearOfStudy}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">Owner</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Handover Spot: <strong className="text-slate-800">{item.location}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {item.listingType === 'EXCHANGE' ? (
                <form onSubmit={handleProposeExchange} className="space-y-2">
                  <input
                    type="text"
                    required
                    value={exchangeOffer}
                    onChange={(e) => setExchangeOffer(e.target.value)}
                    placeholder='What book/item will you offer in swap?'
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Exchange Proposal</span>
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  disabled={isSending || isReused}
                  onClick={handleClaimOrRequest}
                  className={`w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 ${
                    isReused
                      ? 'bg-purple-700 cursor-not-allowed opacity-90'
                      : item.listingType === 'FREE'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : item.listingType === 'BORROW'
                      ? 'bg-teal-700 hover:bg-teal-800'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isReused
                      ? 'Already Reused & Saved'
                      : item.listingType === 'FREE'
                      ? 'Claim Free Item'
                      : item.listingType === 'BORROW'
                      ? `Request to Borrow (${item.borrowDurationDays || 7} Days)`
                      : `Request to Buy (₹${item.price?.toLocaleString('en-IN')})`}
                  </span>
                </button>
              )}

              {/* Utility Row */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(item.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                  title="Share item link"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {!isReused && (
                  <button
                    type="button"
                    onClick={() => {
                      markAsReused(item.id);
                      onClose();
                    }}
                    className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                    <span>Confirm Reused</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
