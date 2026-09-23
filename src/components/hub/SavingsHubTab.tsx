import React from 'react';
import { PiggyBank, Sparkles, BookOpen, Gift, Tag, IndianRupee, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ItemCard } from '../ItemCard';

interface Voucher {
  id: string;
  title: string;
  partner: string;
  discount: string;
  code: string;
  validUntil: string;
}

const CAMPUS_VOUCHERS: Voucher[] = [
  {
    id: 'v-1',
    title: 'University Bookstore & Printing Press',
    partner: 'Central Co-operative Stores',
    discount: '15% OFF Spiral Binding & Records',
    code: 'GREENBIND15',
    validUntil: 'Nov 30, 2026',
  },
  {
    id: 'v-2',
    title: 'Campus Cafeteria & Juice Bar',
    partner: 'Green Bites Canteen',
    discount: 'Free Fresh Lime with any Lunch Meal (Zero Single-Use Cup)',
    code: 'BYOCUP26',
    validUntil: 'Dec 15, 2026',
  },
  {
    id: 'v-3',
    title: 'Electronic Components & Prototyping Lab',
    partner: 'RoboSpark Tech Supplies',
    discount: '₹200 OFF on orders above ₹1,000 for verified students',
    code: 'CAMPUSROBO',
    validUntil: 'Oct 31, 2026',
  },
];

export const SavingsHubTab: React.FC = () => {
  const { items, sustainabilityStats, showToast } = useApp();

  // Filter 100% Free items
  const freeItems = items.filter((i) => i.listingType === 'FREE');

  const copyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast(`Coupon code "${code}" copied to clipboard!`);
    } else {
      showToast(`Code: ${code}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100 mb-1">
          <PiggyBank className="w-4 h-4" />
          <span>Student Affordability & Collective Wealth</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
          Campus Savings Hub & Book Bank
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl leading-relaxed">
          Access 100% free textbook donations, zero-cost lab stationery, student cooperative vouchers, and track our university collective savings of ₹{sustainabilityStats.studentSavingsInr.toLocaleString('en-IN')}.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-amber-200" />
            <span>{freeItems.length} items 100% Free right now</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-amber-200" />
            <span>3 Verified Campus Merchant Discounts</span>
          </div>
        </div>
      </div>

      {/* 100% Free Donations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span>Free Giveaways & Senior Donations</span>
            </h3>
            <p className="text-xs text-slate-500">
              Claimed at zero rupee cost. Arrange instant pickup from campus spots.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            {freeItems.length} Free Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {freeItems.map((item) => (
            <ItemCard key={item.id} item={item} onOpenDetails={() => {}} />
          ))}
        </div>
      </div>

      {/* Campus Vouchers */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-600" />
          <span>Student Co-Op & Campus Merchant Discount Vouchers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPUS_VOUCHERS.map((voucher) => (
            <div
              key={voucher.id}
              className="p-5 bg-white rounded-2xl border border-amber-200 hover:border-amber-300 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  {voucher.partner}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{voucher.title}</h4>
                <p className="text-xs font-semibold text-emerald-700 mt-2 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  {voucher.discount}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Valid until {voucher.validUntil}</span>
                </div>
                <button
                  onClick={() => copyCode(voucher.code)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>Code: {voucher.code}</span>
                  <span className="text-[10px] text-amber-300">(Click to Copy)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
