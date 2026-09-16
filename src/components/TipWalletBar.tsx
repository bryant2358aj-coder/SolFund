import React, { useState } from 'react';
import { Sparkles, Copy, Check, QrCode, ExternalLink, ShieldCheck } from 'lucide-react';
import { PLATFORM_TIP_WALLET } from '../data/constants';
import { useToast } from '../context/ToastContext';
import { QrModal } from './QrModal';

interface TipWalletBarProps {
  variant?: 'hero-card' | 'banner' | 'footer-sticky';
}

export const TipWalletBar: React.FC<TipWalletBarProps> = ({ variant = 'banner' }) => {
  const { copyText } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = async () => {
    await copyText(PLATFORM_TIP_WALLET, 'Platform Solana Wallet');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'hero-card') {
    return (
      <div 
        id="hero-tip-wallet-card" 
        className="w-full max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/30 p-5 sm:p-6 shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Platform Tip & Infrastructure Wallet
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SOL Only
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Support the platform or send directly from any Solana wallet (Phantom, Solflare, etc.)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              id="open-hero-tip-qr-btn"
              onClick={() => setShowQr(true)}
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>QR Code</span>
            </button>
            <button
              id="copy-hero-tip-wallet-btn"
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy SOL Address'}</span>
            </button>
          </div>
        </div>

        {/* Address display */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[11px] uppercase font-mono tracking-wider text-emerald-400/80 font-bold shrink-0">
              SOL:
            </span>
            <code className="text-xs sm:text-sm font-mono text-slate-200 select-all break-all sm:break-normal truncate">
              {PLATFORM_TIP_WALLET}
            </code>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Direct send (No wallet connect needed)
            </span>
            <a
              href={`https://solscan.io/account/${PLATFORM_TIP_WALLET}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs"
            >
              <span>Solscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <QrModal
          isOpen={showQr}
          onClose={() => setShowQr(false)}
          title="SolFund Platform Tip Wallet"
          subtitle="Scan with Phantom, Solflare, or any mobile Solana wallet"
          address={PLATFORM_TIP_WALLET}
        />
      </div>
    );
  }

  // Persistent sticky bottom bar
  return (
    <>
      <div 
        id="sticky-footer-tip-bar" 
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-emerald-500/30 px-3 sm:px-6 py-2.5 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />
            <div>
              <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Platform Tip & Escrow Wallet:</span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  SOL ONLY
                </span>
              </p>
              <p className="font-mono text-[11px] text-slate-400 truncate max-w-[280px] sm:max-w-md select-all">
                {PLATFORM_TIP_WALLET}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              id="sticky-qr-btn"
              onClick={() => setShowQr(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>QR Code</span>
            </button>
            <button
              id="sticky-copy-btn"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Address'}</span>
            </button>
          </div>
        </div>
      </div>

      <QrModal
        isOpen={showQr}
        onClose={() => setShowQr(false)}
        title="Platform Tip & Escrow Wallet"
        subtitle="Send directly from your Phantom, Solflare, or exchange wallet"
        address={PLATFORM_TIP_WALLET}
      />
    </>
  );
};
