import React from 'react';
import { Search, HeartPulse, AlertCircle, PawPrint, Users, GraduationCap, Sparkles, Flame, SlidersHorizontal } from 'lucide-react';
import { CampaignCategory } from '../types';
import { CATEGORIES } from '../data/constants';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'trending' | 'raised' | 'newest' | 'target';
  onSortChange: (sort: 'trending' | 'raised' | 'newest' | 'target') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'medical':
        return <HeartPulse className="w-3.5 h-3.5" />;
      case 'emergency':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'animals':
        return <PawPrint className="w-3.5 h-3.5" />;
      case 'community':
        return <Users className="w-3.5 h-3.5" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'creative':
        return <Sparkles className="w-3.5 h-3.5" />;
      default:
        return <Flame className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search and Sort controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            id="search-campaigns-input"
            type="text"
            placeholder="Search fundraisers by cause, animal, project..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Sort:</span>
          </div>
          <select
            id="sort-campaigns-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="trending">🔥 Trending & Popular</option>
            <option value="raised">💰 Most SOL Raised</option>
            <option value="newest">⏱️ Recently Created</option>
            <option value="target">🎯 Closest to Goal</option>
          </select>
        </div>
      </div>

      {/* Category Pills horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>All Causes</span>
        </button>

        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {getIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
