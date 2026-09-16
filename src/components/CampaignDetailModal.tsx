import React from 'react';
import { X, CheckCircle2, ShieldCheck, Share2, Users, Heart, Calendar, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { Campaign } from '../types';
import { VERIFICATION_FEE_SOL } from '../data/constants';

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onDonateClick: (campaign: Campaign) => void;
  onShareClick: (campaign: Campaign) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onDonateClick,
  onShareClick,
}) => {
  if (!isOpen || !campaign) return null;

  const percentRaised = Math.min(100, Math.round((campaign.raisedSol / campaign.targetSol) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="campaign-detail-modal"
        className="relative w-full max-w-3xl my-6 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl text-slate-100 overflow-hidden text-left"
      >
        <button
          id="close-campaign-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors backdrop-blur-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              {campaign.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Created {campaign.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-5 sm:p-7 space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {campaign.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Organizer:</span>
                <span>{campaign.organizerName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{campaign.donorCount} supporters</span>
              </div>
            </div>
          </div>

          {/* Funding Progress Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {campaign.raisedSol.toFixed(1)} SOL
                </span>
                <span className="text-xs sm:text-sm text-slate-400 ml-2">
                  raised of <strong className="text-white font-mono">{campaign.targetSol} SOL</strong> goal
                </span>
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                {percentRaised}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                style={{ width: `${percentRaised}%` }}
              />
            </div>

            {/* Quick Actions inside progress card */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="detail-donate-cta-btn"
                onClick={() => {
                  onClose();
                  onDonateClick(campaign);
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <span>Donate to this Cause</span>
                <span className="text-xs opacity-85 font-mono">({VERIFICATION_FEE_SOL} SOL Connect)</span>
              </button>

              <button
                id="detail-share-cta-btn"
                onClick={() => onShareClick(campaign)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Share on Socials</span>
              </button>
            </div>
          </div>

          {/* Privacy & Anti-Scraping Guarantee Banner */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-0.5">
                Creator Wallet Protected Against Scrapers
              </span>
              <p className="text-slate-400 leading-relaxed">
                To safeguard organizers from phishing, dusting attacks, and malicious bots, {campaign.organizerName}'s Solana address is not publicly indexed. Donors send a {VERIFICATION_FEE_SOL} SOL verification fee to our platform, and our admin manually emails the organizer's direct private Solana address to you.
              </p>
            </div>
          </div>

          {/* Story text */}
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              About this Fundraiser
            </h3>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {campaign.fullStory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
