import React from 'react';
import { Sparkles, PlusCircle, HelpCircle, Shield, Copy, Check, QrCode } from 'lucide-react';
import { PLATFORM_TIP_WALLET } from '../data/constants';
import { useToast } from '../context/ToastContext';

interface NavbarProps {
  onStartFundraiser: () => void;
  onOpenHowItWorks: () => void;
  onOpenAdminDesk: () => void;
  pendingRequestsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartFundraiser,
  onOpenHowItWorks,
  onOpenAdminDesk,
  pendingRequestsCount,
}) => {
  const { copyText } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyTip = async () => {
    await copyText(PLATFORM_TIP_WALLET, 'Platform Tip Wallet');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-400 p-[1.5px] shadow-lg shadow-emerald-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-lg">
                ◎
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-display">
                SolFund
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                SOL ONLY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Simpler crypto crowdfunding • No wallet connects
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* How it works */}
          <button
            id="nav-how-it-works-btn"
            onClick={onOpenHowItWorks}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>How It Works</span>
          </button>

          {/* Platform Tip Wallet Quick Copy Pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 pl-3 pr-1.5 py-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold">Tip Wallet:</span>
            <code className="text-[11px] font-mono text-emerald-400">
              {PLATFORM_TIP_WALLET.slice(0, 4)}...{PLATFORM_TIP_WALLET.slice(-4)}
            </code>
            <button
              id="nav-copy-tip-btn"
              onClick={handleCopyTip}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-300 transition-colors"
              title="Copy Tip Wallet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Admin Desk */}
          <button
            id="nav-admin-desk-btn"
            onClick={onOpenAdminDesk}
            className="relative px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Open Admin Escrow & Verification Desk"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Admin Desk</span>
            {pendingRequestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Start a SolFund CTA */}
          <button
            id="nav-start-solfund-btn"
            onClick={onStartFundraiser}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start a SolFund</span>
          </button>
        </div>
      </div>
    </header>
  );
};
