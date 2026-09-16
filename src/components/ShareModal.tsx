import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send, Globe, QrCode } from 'lucide-react';
import { Campaign } from '../types';
import { getShareUrls } from '../utils/share';
import { useToast } from '../context/ToastContext';
import { generateQrDataUrl } from '../utils/qr';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, campaign }) => {
  const { copyText } = useToast();
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [showQr, setShowQr] = useState(false);

  const shareUrls = getShareUrls(campaign);

  useEffect(() => {
    if (isOpen) {
      generateQrDataUrl(shareUrls.url).then(setQrUrl);
    }
  }, [isOpen, shareUrls.url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await copyText(shareUrls.url, 'Fundraiser link');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        id="share-modal-container"
        className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl text-slate-100 text-left"
      >
        <button
          id="close-share-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <Share2 className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Share This SolFund</h3>
        </div>

        <p className="text-xs text-slate-400 mb-5">
          Help <strong className="text-slate-200">{campaign.organizerName}</strong> reach their goal of <strong className="text-emerald-400">{campaign.targetSol} SOL</strong> by spreading the word!
        </p>

        {/* Social Share Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold text-slate-200 gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <span className="font-black text-sm">𝕏</span>
            </div>
            <span>Twitter / X</span>
          </a>

          <a
            href={shareUrls.telegram}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold text-slate-200 gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </div>
            <span>Telegram</span>
          </a>

          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold text-slate-200 gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-semibold gap-1.5 group ${
              showQr 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <QrCode className="w-4 h-4" />
            </div>
            <span>{showQr ? 'Hide QR' : 'Show QR'}</span>
          </button>
        </div>

        {/* QR Code toggle view */}
        {showQr && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center mb-5 animate-in fade-in duration-150">
            <div className="p-2.5 bg-white rounded-lg inline-block shadow-inner mx-auto mb-2">
              {qrUrl ? (
                <img src={qrUrl} alt="Campaign QR Code" className="w-44 h-44 rounded" />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-slate-500 text-xs">
                  Generating QR...
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Scan from mobile camera to open and share this campaign
            </p>
          </div>
        )}

        {/* Copy Link Input */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Direct Campaign Link
          </label>
          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <Globe className="w-4 h-4 text-slate-500 ml-2 shrink-0" />
            <span className="text-xs font-mono text-slate-300 truncate select-all flex-1">
              {shareUrls.url}
            </span>
            <button
              id="copy-share-url-btn"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
