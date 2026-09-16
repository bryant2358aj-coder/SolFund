import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, Mail, Copy, Check, ExternalLink, Send, ArrowUpRight, Search } from 'lucide-react';
import { DonationRequest } from '../types';
import { PLATFORM_TIP_WALLET, VERIFICATION_FEE_SOL } from '../data/constants';
import { useToast } from '../context/ToastContext';

interface AdminDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationRequests: DonationRequest[];
  onUpdateRequestStatus: (requestId: string, newStatus: DonationRequest['status']) => void;
}

export const AdminDeskModal: React.FC<AdminDeskModalProps> = ({
  isOpen,
  onClose,
  donationRequests,
  onUpdateRequestStatus,
}) => {
  const { copyText } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredRequests = donationRequests.filter((req) => {
    if (filter === 'pending' && req.status !== 'pending_verification') return false;
    if (filter === 'completed' && req.status === 'pending_verification') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        req.donorEmail.toLowerCase().includes(q) ||
        req.campaignTitle.toLowerCase().includes(q) ||
        (req.creatorConfidentialWallet && req.creatorConfidentialWallet.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const pendingCount = donationRequests.filter((r) => r.status === 'pending_verification').length;

  const handleCopyWallet = async (wallet: string, id: string) => {
    await copyText(wallet, 'Creator Solana Wallet');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateMailto = (req: DonationRequest) => {
    const subject = encodeURIComponent(`Verified Solana Wallet for: ${req.campaignTitle}`);
    const body = encodeURIComponent(
`Hello,

Thank you for supporting this cause on SolFund and submitting your ${VERIFICATION_FEE_SOL} SOL verification fee!

Here is the confidential, verified Solana receiving wallet address for the creator of "${req.campaignTitle}":

Solana Wallet Address:
${req.creatorConfidentialWallet}

Organizer Contact: ${req.creatorEmail}

You can now send your primary donation directly to this address on the Solana network with zero third-party platform deduction.

Thank you for your generosity!
SolFund Administration`
    );
    return `mailto:${req.donorEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="admin-desk-modal"
        className="relative w-full max-w-4xl my-6 p-5 sm:p-7 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl text-slate-100 text-left"
      >
        <button
          id="close-admin-desk-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-6">
          <div className="flex items-center gap-2 mb-1 text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Platform Owner Escrow & Verification Desk
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Pending Donor Verifications & Wallets
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Verify incoming 0.15 SOL fees, inspect confidential creator wallets, and email payment details to donors.
              </p>
            </div>
            <a
              href={`https://solscan.io/account/${PLATFORM_TIP_WALLET}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold self-start sm:self-auto transition-colors"
            >
              <span>Check 0.15 SOL on Solscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Platform wallet summary card */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400">Platform Verification Fee Wallet:</span>
            <div className="font-mono text-emerald-300 font-bold mt-0.5 break-all select-all">
              {PLATFORM_TIP_WALLET}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
              Fee: {VERIFICATION_FEE_SOL} SOL / Request
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All ({donationRequests.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                filter === 'pending'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending ({pendingCount})</span>
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'completed'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Completed ({donationRequests.length - pendingCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search donor email or campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Request Cards List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/60 rounded-xl border border-slate-800">
              <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-400">No donor verification requests found</p>
              <p className="text-xs text-slate-500 mt-1">
                When donors send 0.15 SOL to connect with a creator, their requests appear here.
              </p>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-xl border transition-all ${
                  req.status === 'pending_verification'
                    ? 'bg-slate-950 border-amber-500/40'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {req.campaignTitle}
                      </span>
                      {req.status === 'pending_verification' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Needs Wallet Email
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Wallet Emailed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Requested: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-xs font-bold text-emerald-400 shrink-0">
                    Fee: {req.feeAmountSol} SOL
                  </div>
                </div>

                {/* Donor & Creator Detail grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs mb-3">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Donor Contact:</span>
                    <div className="font-medium text-white flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="select-all">{req.donorEmail}</span>
                    </div>
                    {req.donorWalletOrTx && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        <span>Tx / Sender: </span>
                        <code className="text-slate-300 font-mono select-all break-all">
                          {req.donorWalletOrTx}
                        </code>
                      </div>
                    )}
                    {req.notes && (
                      <p className="text-[11px] text-slate-400 italic mt-1">
                        Note: "{req.notes}"
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold block mb-0.5 flex items-center gap-1">
                      <span>🔒 Creator Confidential Wallet:</span>
                    </span>
                    <div className="bg-slate-950 p-2 rounded border border-emerald-500/30 flex items-center justify-between gap-2">
                      <code className="font-mono text-[11px] text-slate-200 break-all select-all flex-1">
                        {req.creatorConfidentialWallet}
                      </code>
                      <button
                        onClick={() => handleCopyWallet(req.creatorConfidentialWallet, req.id)}
                        className="p-1 text-slate-400 hover:text-emerald-300 shrink-0"
                        title="Copy creator wallet"
                      >
                        {copiedId === req.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Creator Email: <span className="text-slate-300">{req.creatorEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={generateMailto(req)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Email Creator Wallet to Donor</span>
                    </a>
                    <button
                      onClick={() => copyText(req.donorEmail, 'Donor email')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'pending_verification' ? (
                      <button
                        onClick={() => onUpdateRequestStatus(req.id, 'wallet_emailed')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950/60 hover:text-emerald-300 text-slate-400 border border-slate-700 text-xs font-medium transition-colors"
                      >
                        Mark as Sent
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdateRequestStatus(req.id, 'pending_verification')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
                      >
                        Re-open as Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
