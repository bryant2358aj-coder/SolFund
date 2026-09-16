import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Campaign, DonationRequest } from '../types';
import { PLATFORM_TIP_WALLET, VERIFICATION_FEE_SOL } from '../data/constants';
import { useToast } from '../context/ToastContext';
import { QrModal } from './QrModal';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  onSubmitDonationRequest: (request: Omit<DonationRequest, 'id' | 'createdAt'>) => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onSubmitDonationRequest,
}) => {
  const { copyText } = useToast();
  const [donorEmail, setDonorEmail] = useState('');
  const [donorTx, setDonorTx] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCopyWallet = async () => {
    await copyText(PLATFORM_TIP_WALLET, 'Platform Escrow Wallet');
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setError('Please provide a valid email address so we can send you the creator wallet.');
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmitDonationRequest({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        creatorEmail: campaign.organizerEmail,
        creatorConfidentialWallet: campaign.confidentialSolWallet,
        donorEmail: donorEmail.trim(),
        donorWalletOrTx: donorTx.trim() || undefined,
        feeAmountSol: VERIFICATION_FEE_SOL,
        status: 'pending_verification',
        notes: notes.trim() || undefined,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setDonorEmail('');
    setDonorTx('');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="donate-modal-container"
        className="relative w-full max-w-xl my-6 p-5 sm:p-7 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 text-left"
      >
        <button
          id="close-donate-modal-btn"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-4 pr-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Escrow Connection
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Support {campaign.organizerName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1">
                For: <span className="text-slate-300 font-medium">{campaign.title}</span>
              </p>
            </div>

            {/* Explanatory banner */}
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 mb-5 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>How Solana-Direct Donations Work</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                To protect campaign creators against spam, bot scraping, and targeted fraud, creators do not post their wallets publicly. 
                Instead, donors send the <strong className="text-white">{VERIFICATION_FEE_SOL} SOL verification fee</strong> to our platform wallet below. Once verified, our administrator manually emails you this organizer's direct private Solana wallet so 100% of your primary donation reaches them directly!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Send 0.15 SOL */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Send Exactly {VERIFICATION_FEE_SOL} SOL to Platform Wallet
                    </span>
                  </div>
                  <button
                    type="button"
                    id="open-donate-qr-btn"
                    onClick={() => setShowQr(true)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <code className="text-xs font-mono text-slate-200 break-all select-all flex-1">
                    {PLATFORM_TIP_WALLET}
                  </code>
                  <button
                    type="button"
                    id="copy-donate-wallet-btn"
                    onClick={handleCopyWallet}
                    className="px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                  >
                    {copiedWallet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWallet ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>No wallet connect required — send from any exchange or wallet</span>
                  <a
                    href={`https://solscan.io/account/${PLATFORM_TIP_WALLET}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Solscan</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Step 2: Donor Email info */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <label htmlFor="donor-email-input" className="text-xs font-bold text-white uppercase tracking-wider">
                    Your Email (Where We Send the Creator Wallet)
                  </label>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      id="donor-email-input"
                      type="email"
                      required
                      placeholder="e.g., yourname@email.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We will manually email you {campaign.organizerName}'s verified Solana wallet address as soon as your 0.15 SOL is confirmed.
                  </p>
                </div>

                <div>
                  <label htmlFor="donor-tx-input" className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Your Solana Address or Tx Signature (Optional for fast verification):
                  </label>
                  <input
                    id="donor-tx-input"
                    type="text"
                    placeholder="e.g., your sender wallet or Solscan tx hash"
                    value={donorTx}
                    onChange={(e) => setDonorTx(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="donor-notes-input" className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Message to Organizer (Optional):
                  </label>
                  <input
                    id="donor-notes-input"
                    type="text"
                    placeholder="e.g., Wishing you a speedy recovery!"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-donation-req-btn"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  <span>Confirm & Request Creator Wallet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 px-2 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                Verification Request Logged!
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                Receipt queued for {donorEmail}
              </p>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <p className="font-semibold text-white">Next Steps:</p>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-400">
                <li>
                  Ensure you transferred <strong className="text-emerald-400">{VERIFICATION_FEE_SOL} SOL</strong> to <code className="text-slate-300 select-all font-mono">{PLATFORM_TIP_WALLET.slice(0, 8)}...{PLATFORM_TIP_WALLET.slice(-6)}</code>.
                </li>
                <li>
                  Our administrator will verify the incoming transfer on the Solana network.
                </li>
                <li>
                  You will receive an email at <span className="text-white font-medium">{donorEmail}</span> containing <strong className="text-white">{campaign.organizerName}'s</strong> confidential Solana wallet.
                </li>
                <li>
                  You can then send your primary donation directly to them with 0 middleman deductions!
                </li>
              </ol>
            </div>

            <div className="pt-2">
              <button
                id="close-confirmation-btn"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
              >
                Back to Fundraiser
              </button>
            </div>
          </div>
        )}

        <QrModal
          isOpen={showQr}
          onClose={() => setShowQr(false)}
          title="Send 0.15 SOL Verification Fee"
          subtitle={`Platform escrow wallet for "${campaign.title}"`}
          address={PLATFORM_TIP_WALLET}
          expectedAmountSol={VERIFICATION_FEE_SOL}
        />
      </div>
    </div>
  );
};
