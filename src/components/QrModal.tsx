import React, { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { generateQrDataUrl } from '../utils/qr';
import { useToast } from '../context/ToastContext';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  address: string;
  subtitle?: string;
  expectedAmountSol?: number;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  title,
  address,
  subtitle,
  expectedAmountSol,
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { copyText } = useToast();

  useEffect(() => {
    if (isOpen && address) {
      // Create Solana pay compatible or raw address QR code
      const qrData = expectedAmountSol 
        ? `solana:${address}?amount=${expectedAmountSol}`
        : address;
        
      generateQrDataUrl(qrData).then(setQrUrl);
    }
  }, [isOpen, address, expectedAmountSol]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await copyText(address, 'Solana address');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        id="qr-modal-dialog"
        className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 text-center"
      >
        <button
          id="close-qr-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400">
          <QrCode className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        {subtitle && (
          <p className="text-xs text-slate-400 mb-4 px-2">{subtitle}</p>
        )}

        {expectedAmountSol && (
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            Send Exactly {expectedAmountSol} SOL
          </div>
        )}

        <div className="flex justify-center my-4">
          <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-200">
            {qrUrl ? (
              <img 
                src={qrUrl} 
                alt="Solana Wallet QR Code" 
                className="w-56 h-56 rounded-lg block mx-auto"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-slate-500 text-sm">
                Generating QR...
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-left">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Solana Wallet Address
          </label>
          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="font-mono text-xs text-slate-300 break-all select-all flex-1">
              {address}
            </span>
            <button
              id="copy-address-from-qr-btn"
              onClick={handleCopy}
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors shrink-0 flex items-center gap-1 text-xs font-medium"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>Solana Mainnet</span>
          <a
            href={`https://solscan.io/account/${address}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline"
          >
            <span>View on Solscan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
