import React from 'react';
import { PlusCircle, HelpCircle, ShieldCheck, Zap, Heart, ArrowDown } from 'lucide-react';
import { TipWalletBar } from './TipWalletBar';
import { Campaign } from '../types';

interface HeroProps {
  onStartFundraiser: () => void;
  onOpenHowItWorks: () => void;
  campaigns: Campaign[];
}

export const Hero: React.FC<HeroProps> = ({
  onStartFundraiser,
  onOpenHowItWorks,
  campaigns,
}) => {
  const totalRaisedSol = campaigns.reduce((acc, curr) => acc + curr.raisedSol, 0);
  const totalDonors = campaigns.reduce((acc, curr) => acc + curr.donorCount, 0);

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 text-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[300px] h-[250px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 space-y-5">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>The Simpler, Safer Solana-Only Crowdfunding Platform</span>
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Direct Support for Real Causes, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
            Powered 100% by Solana
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Inspired by GoFundMe, simplified for crypto. No wallet-connect popups or risky browser extensions. Support organizers directly from your favorite wallet with verified creator escrow.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="hero-start-btn"
            onClick={onStartFundraiser}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Start a Fundraiser</span>
          </button>

          <button
            id="hero-how-it-works-btn"
            onClick={onOpenHowItWorks}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 text-sm sm:text-base font-semibold flex items-center gap-2 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>How It Works</span>
          </button>
        </div>

        {/* Platform Stat counters */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Raised
            </span>
            <span className="text-lg sm:text-xl font-black text-white font-mono">
              {totalRaisedSol.toFixed(1)} SOL
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Causes
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              {campaigns.length}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Direct Donors
            </span>
            <span className="text-lg sm:text-xl font-black text-white font-mono">
              {totalDonors}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Connect Fee
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-300 font-mono">
              0.15 SOL
            </span>
          </div>
        </div>

        {/* Featured Tip Wallet on Main Page (as requested by user) */}
        <div className="pt-6">
          <TipWalletBar variant="hero-card" />
        </div>
      </div>
    </section>
  );
};
