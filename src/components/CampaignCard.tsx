import React from 'react';
import { Heart, Share2, Users, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onSelectCampaign: (campaign: Campaign) => void;
  onDonateClick: (campaign: Campaign) => void;
  onShareClick: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onSelectCampaign,
  onDonateClick,
  onShareClick,
}) => {
  const percentRaised = Math.min(100, Math.round((campaign.raisedSol / campaign.targetSol) * 100));

  return (
    <div 
      id={`campaign-card-${campaign.id}`}
      className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/20"
    >
      {/* Image container with category pill */}
      <div 
        className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-slate-950"
        onClick={() => onSelectCampaign(campaign)}
      >
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
            {campaign.category}
          </span>
          {campaign.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/80 text-white backdrop-blur-md">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1 font-medium drop-shadow">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>by {campaign.organizerName}</span>
          </span>
          <span className="flex items-center gap-1 drop-shadow text-[11px] text-slate-300">
            <Users className="w-3 h-3 text-slate-400" />
            <span>{campaign.donorCount} supporters</span>
          </span>
        </div>
      </div>

      {/* Content body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelectCampaign(campaign)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {campaign.title}
          </h3>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Progress bar and metrics */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
          <div className="flex items-baseline justify-between text-xs">
            <div>
              <span className="text-base sm:text-lg font-extrabold text-white font-mono">
                {campaign.raisedSol.toFixed(1)} SOL
              </span>
              <span className="text-slate-400 ml-1">raised</span>
            </div>
            <div className="text-slate-400 text-xs">
              Goal: <strong className="text-slate-200 font-mono">{campaign.targetSol} SOL</strong>
            </div>
          </div>

          {/* Bar */}
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
            <span>{percentRaised}% funded</span>
            <span className="flex items-center gap-1 text-emerald-400/90 font-medium">
              <ShieldCheck className="w-3 h-3" />
              Verified Escrow
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-2 flex items-center gap-2">
          <button
            id={`donate-btn-${campaign.id}`}
            onClick={() => onDonateClick(campaign)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <span>Donate</span>
            <span className="text-[10px] opacity-80 font-mono">(0.15 SOL)</span>
          </button>

          <button
            id={`share-btn-${campaign.id}`}
            onClick={() => onShareClick(campaign)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Share this campaign on socials"
            aria-label="Share campaign"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
