import React, { useState } from 'react';
import { Sparkles, Copy, Check, QrCode, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { PLATFORM_TIP_WALLET } from '../data/constants';
import { useToast } from '../context/ToastContext';
import { QrModal } from './QrModal';

export const Footer: React.FC = () => {
  const { copyText } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = async () => {
    await copyText(PLATFORM_TIP_WALLET, 'Platform Donate Address');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 pb-28 pt-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Dedicated Persistent Platform Donate Section at Bottom */}
        <div 
          id="footer-donate-section"
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 text-slate-100 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-emerald-400">
                <Heart className="w-4 h-4 fill-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Support SolFund Infrastructure
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Official Solana Donation & Tip Wallet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We operate without invasive ads or corporate venture cuts. Every SOL tip sent to this address helps us keep the site running, maintain verified creator escrow, and expand community relief worldwide.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                id="footer-qr-btn"
                onClick={() => setShowQr(true)}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Show QR Code</span>
              </button>
              <button
                id="footer-copy-btn"
                onClick={handleCopy}
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Address Copied!' : 'Copy SOL Address'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">SOL:</span>
              <code className="text-xs font-mono text-slate-200 select-all break-all">
                {PLATFORM_TIP_WALLET}
              </code>
            </div>
            <a
              href={`https://solscan.io/account/${PLATFORM_TIP_WALLET}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 self-end sm:self-auto"
            >
              <span>Verify on Solscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer info & columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-emerald-400 text-lg">◎</span>
              <span className="text-base font-bold text-white">SolFund</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A simpler, decentralized crowdfunding platform built strictly for Solana. We empower creators to raise funds without browser wallet extension risks or platform percentage clawbacks.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anti-bot confidential creator wallet escrow</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Community Causes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Emergency & Disaster Relief</li>
              <li>Medical Operations & Care</li>
              <li>Animal Rescue & Sanctuaries</li>
              <li>Clean Water & Community Solar</li>
              <li>Education & Open Technology</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Safety & Terms
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>0.15 SOL Verification Model</li>
              <li>Direct Peer-to-Peer Settlement</li>
              <li>Zero Browser Wallet Permissions</li>
              <li>Solana Mainnet Compatible</li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SolFund. Decentralized community fundraising.</p>
          <p>Always verify receiving addresses on Solscan before sending high-value transactions.</p>
        </div>
      </div>

      <QrModal
        isOpen={showQr}
        onClose={() => setShowQr(false)}
        title="Official Solana Donation Address"
        subtitle="Send directly from your Phantom, Solflare, or exchange wallet"
        address={PLATFORM_TIP_WALLET}
      />
    </footer>
  );
};
