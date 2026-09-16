import React from 'react';
import { X, ShieldCheck, Mail, Send, Sparkles, CheckCircle2, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { PLATFORM_TIP_WALLET, VERIFICATION_FEE_SOL } from '../data/constants';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFundraiser: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onStartFundraiser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="how-it-works-modal"
        className="relative w-full max-w-2xl my-6 p-5 sm:p-7 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl text-slate-100 text-left"
      >
        <button
          id="close-how-it-works-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-6">
          <div className="flex items-center gap-2 mb-1 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Solana Crowdfunding Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            How SolFund Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simple, transparent, direct Solana giving without complex wallet connects or security vulnerabilities.
          </p>
        </div>

        {/* 4 Step visual sequence */}
        <div className="space-y-4 mb-6">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                No Wallet Connect or Extension Barriers
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                You never have to connect your browser wallet, sign blind smart contracts, or risk approval exploits. You simply copy addresses or scan QR codes and send SOL directly from your favorite wallet (Phantom, Solflare, Backpack, or exchanges).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Creator Privacy & Anti-Scraping Protection</span>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Traditional crypto fundraising exposes creators to malicious bots, address poisoning, and targeted phishing. On SolFund, organizers sign up with just email, and their private receiving wallet is stored securely in confidential escrow.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {VERIFICATION_FEE_SOL} SOL Escrow Connection Fee
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                When you wish to donate to a fundraiser, you send the small <strong className="text-emerald-400">{VERIFICATION_FEE_SOL} SOL fee</strong> to the platform wallet (<code className="font-mono text-slate-300 select-all">{PLATFORM_TIP_WALLET.slice(0, 8)}...{PLATFORM_TIP_WALLET.slice(-6)}</code>) and provide your email. This filters out spam and verifies you are a genuine human supporter.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Direct Manual Wallet Delivery</span>
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Our platform owner verifies the {VERIFICATION_FEE_SOL} SOL transaction and manually emails the organizer's direct Solana wallet to your inbox. You can then transfer any amount of SOL directly to the creator with 100% peer-to-peer delivery!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 text-center sm:text-left">
            Have a cause you need support for? Launching takes under 2 minutes.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartFundraiser();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Start a SolFund</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
