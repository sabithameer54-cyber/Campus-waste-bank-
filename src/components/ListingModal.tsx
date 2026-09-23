import React, { useState } from 'react';
import { X, Upload, IndianRupee, Sparkles, AlertCircle, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  MainCategory,
  EngineeringSubCategory,
  ListingType,
  ItemCondition,
  CampusLocation,
  DepartmentType,
} from '../types';

const CATEGORIES: MainCategory[] = [
  'Study Material Hub',
  'Electronics & Components',
  'Engineering Tools',
  'Lab Materials',
  'Student Marketplace',
];

const SUB_CATEGORIES: EngineeringSubCategory[] = ['Mechanical', 'Civil', 'Electrical', 'CS'];

const DEPARTMENTS: DepartmentType[] = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT', 'Science', 'Management'];

const LOCATIONS: CampusLocation[] = [
  'Library',
  'Department',
  'Hostel',
  'Main block',
  'Waste collection point',
  'Recycling center',
];

const SAMPLE_IMAGE_PRESETS = [
  { label: 'Laptop', url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80' },
  { label: 'Textbook / Notes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Engineering Tool', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'Lab Equipment', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
  { label: 'Student Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
];

export const ListingModal: React.FC = () => {
  const { isListingModalOpen, setIsListingModalOpen, addItem, currentUser, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MainCategory>('Study Material Hub');
  // Sub-category state: conditionally required for Engineering Tools & Lab Materials
  const [subCategory, setSubCategory] = useState<EngineeringSubCategory>('Mechanical');
  const [listingType, setListingType] = useState<ListingType>('FREE');
  const [price, setPrice] = useState<string>('');
  const [exchangeFor, setExchangeFor] = useState('');
  const [borrowDurationDays, setBorrowDurationDays] = useState('7');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGE_PRESETS[1].url);
  const [department, setDepartment] = useState<DepartmentType>(currentUser?.department || 'CSE');
  const [yearOfStudy, setYearOfStudy] = useState<'1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'PG / Research'>(
    currentUser?.year || '3rd Year'
  );
  const [location, setLocation] = useState<CampusLocation>('Library');
  const [tagsInput, setTagsInput] = useState('');

  if (!isListingModalOpen) return null;

  const isEngineeringOrLab = category === 'Engineering Tools' || category === 'Lab Materials';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please enter an item name');
      return;
    }

    if (!currentUser) {
      showToast('Please log in first to create a listing.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Compute automatic eco impact estimates based on category & price
    let wasteAvoidedKg = 1.0;
    let co2AvoidedKg = 2.5;
    let savingsInr = listingType === 'SELL' ? Number(price) || 300 : 800;
    let isEWaste = false;

    if (category === 'Electronics & Components') {
      isEWaste = true;
      wasteAvoidedKg = title.toLowerCase().includes('laptop') ? 2.5 : 0.6;
      co2AvoidedKg = title.toLowerCase().includes('laptop') ? 45.0 : 5.0;
      savingsInr = title.toLowerCase().includes('laptop') ? 25000 : 1200;
    } else if (category === 'Engineering Tools') {
      wasteAvoidedKg = 1.8;
      co2AvoidedKg = 4.2;
    } else if (category === 'Lab Materials') {
      wasteAvoidedKg = 1.2;
      co2AvoidedKg = 3.0;
    }

    addItem({
      title: title.trim(),
      category,
      sub_category: isEngineeringOrLab ? subCategory : undefined,
      listingType,
      price: listingType === 'SELL' ? Number(price) || 0 : undefined,
      exchangeFor: listingType === 'EXCHANGE' ? exchangeFor.trim() : undefined,
      borrowDurationDays: listingType === 'BORROW' ? Number(borrowDurationDays) || 7 : undefined,
      condition,
      description: description.trim() || 'No description provided.',
      imageUrl: imageUrl.trim() || SAMPLE_IMAGE_PRESETS[1].url,
      department,
      yearOfStudy,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerEmail: currentUser.email,
      location,
      tags: tags.length > 0 ? tags : [category.split(' ')[0], listingType],
      ecoImpact: {
        wasteAvoidedKg,
        co2AvoidedKg,
        savingsInr,
        isEWaste,
      },
    });

    setIsListingModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setExchangeFor('');
    setTagsInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Circular Economy</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-0.5">
              List an Item for Campus Reuse
            </h2>
          </div>
          <button
            onClick={() => setIsListingModalOpen(false)}
            className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Name & Model *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lenovo ThinkPad T440p (Core i5) or Casio fx-991EX Calculator"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* Primary Category & Conditional Sub-Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MainCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category Dropdown (Populates conditionally for Engineering Tools & Lab Materials) */}
            {isEngineeringOrLab ? (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Engineering Sub-Category *</span>
                </div>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value as EngineeringSubCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-300 text-sm bg-white font-medium text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {SUB_CATEGORIES.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub} Engineering
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Indexed for targeted semester branch searches.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Item Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ItemCondition)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Like New">Like New (Mint / Unmarked)</option>
                  <option value="Good">Good (Working, minor cosmetic wear)</option>
                  <option value="Fair">Fair (Fully functional, visible use)</option>
                  <option value="Needs Minor Repair">Needs Minor Repair (Refurbishable)</option>
                </select>
              </div>
            )}
          </div>

          {/* If engineering was selected, show condition below it */}
          {isEngineeringOrLab && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Item Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Like New">Like New (Mint / Unmarked)</option>
                <option value="Good">Good (Working, minor cosmetic wear)</option>
                <option value="Fair">Fair (Fully functional, visible use)</option>
                <option value="Needs Minor Repair">Needs Minor Repair (Refurbishable)</option>
              </select>
            </div>
          )}

          {/* Listing Option: FREE, SELL, EXCHANGE, BORROW */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Listing Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: 'FREE', label: '🤝 Free Donation', desc: '100% Free gift' },
                { type: 'SELL', label: '₹ Sell (Low Rate)', desc: 'Affordable INR' },
                { type: 'EXCHANGE', label: '🔄 Swap / Trade', desc: 'Item-for-item' },
                { type: 'BORROW', label: '📦 Borrow & Return', desc: 'Short-term loan' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.type}
                  onClick={() => setListingType(opt.type as ListingType)}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    listingType === opt.type
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600 text-emerald-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Fields based on Listing Type */}
          {listingType === 'SELL' && (
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
                Price in Indian Rupees (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">₹</span>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 250 or 6500 for old laptop"
                  className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <p className="text-[11px] text-amber-800">
                Keep prices low to assist fellow juniors. Laptops, books, and calculators are highly recommended at student-friendly rates!
              </p>
            </div>
          )}

          {listingType === 'EXCHANGE' && (
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
                Desired Exchange Item *
              </label>
              <input
                type="text"
                required
                value={exchangeFor}
                onChange={(e) => setExchangeFor(e.target.value)}
                placeholder='e.g. "I have a Java book and need a DSA book in C++"'
                className="w-full px-3.5 py-2 rounded-lg border border-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-blue-700">
                Specify what textbook, tool, or component you would like in swap.
              </p>
            </div>
          )}

          {listingType === 'BORROW' && (
            <div className="p-3.5 bg-teal-50/80 border border-teal-200 rounded-xl space-y-1">
              <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                Borrow Duration (Days) *
              </label>
              <select
                value={borrowDurationDays}
                onChange={(e) => setBorrowDurationDays(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-teal-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="3">3 Days (Quick exam or lab test)</option>
                <option value="7">7 Days (1 Week evaluation)</option>
                <option value="14">14 Days (Semester mid-term study)</option>
                <option value="30">30 Days (Entire graphics or project month)</option>
              </select>
              <p className="text-[11px] text-teal-700">
                Borrowers receive return reminders and earn +15 Green Points upon timely return.
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Details & Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention edition, specs, any missing accessories, battery health, or specific instructions."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Photograph URL / Presets
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 font-medium">Quick presets:</span>
              {SAMPLE_IMAGE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition ${
                    imageUrl === preset.url
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campus Location & Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Collection / Handover Spot *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as CampusLocation)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as DepartmentType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Search Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. laptop, ubuntu, 8gb, low rate, student, exam"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Eco Points preview badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Green Incentive for this Listing:
            </span>
            <span className="font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[11px]">
              +{listingType === 'FREE' ? '25' : '15'} Green Points
            </span>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsListingModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Listing to Campus</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
