import React, { useState } from 'react';
import { X, ShieldAlert, Sparkles, Image, Check, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { Campaign, CampaignCategory } from '../types';
import { CATEGORIES, PRESET_IMAGES } from '../data/constants';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CampaignCategory>('Community');
  const [targetSol, setTargetSol] = useState('');
  const [summary, setSummary] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImage, setCustomImage] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [confidentialSolWallet, setConfidentialSolWallet] = useState('');
  const [error, setError] = useState('');
  const [hasLeakWarning, setHasLeakWarning] = useState(false);

  if (!isOpen) return null;

  // Check if user accidentally pasted a Solana address in public text
  const checkPublicLeak = (text: string) => {
    // Solana addresses are base58, 32-44 chars, no 0, O, I, l
    const base58Regex = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/;
    return base58Regex.test(text);
  };

  const handleStoryChange = (val: string) => {
    setFullStory(val);
    const leakedInStory = checkPublicLeak(val);
    const leakedInTitle = checkPublicLeak(title);
    const leakedInSummary = checkPublicLeak(summary);
    setHasLeakWarning(leakedInStory || leakedInTitle || leakedInSummary);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const leakedInStory = checkPublicLeak(fullStory);
    const leakedInTitle = checkPublicLeak(val);
    const leakedInSummary = checkPublicLeak(summary);
    setHasLeakWarning(leakedInStory || leakedInTitle || leakedInSummary);
  };

  const handleSummaryChange = (val: string) => {
    setSummary(val);
    const leakedInStory = checkPublicLeak(fullStory);
    const leakedInTitle = checkPublicLeak(title);
    const leakedInSummary = checkPublicLeak(val);
    setHasLeakWarning(leakedInStory || leakedInTitle || leakedInSummary);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !summary.trim() || !fullStory.trim()) {
      setError('Please fill in all campaign details.');
      return;
    }

    const solGoal = parseFloat(targetSol);
    if (isNaN(solGoal) || solGoal <= 0) {
      setError('Please enter a valid target goal in SOL (e.g., 15).');
      return;
    }

    if (!organizerEmail.trim() || !organizerEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!confidentialSolWallet.trim() || confidentialSolWallet.trim().length < 32) {
      setError('Please enter your valid Solana receiving wallet address (32-44 characters).');
      return;
    }

    if (hasLeakWarning) {
      setError('Please remove the wallet address from your public story or title before publishing!');
      return;
    }

    const finalImage = customImage.trim() || imageUrl;

    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      title: title.trim(),
      category,
      description: summary.trim(),
      fullStory: fullStory.trim(),
      imageUrl: finalImage,
      targetSol: solGoal,
      raisedSol: 0,
      donorCount: 0,
      organizerName: organizerName.trim() || 'Anonymous Organizer',
      organizerEmail: organizerEmail.trim(),
      confidentialSolWallet: confidentialSolWallet.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      verified: true,
    };

    onCampaignCreated(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="create-campaign-modal"
        className="relative w-full max-w-2xl my-8 p-5 sm:p-7 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl text-slate-100 text-left"
      >
        <button
          id="close-create-campaign-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-6">
          <div className="flex items-center gap-2 mb-1 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Start a SolFund</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Create Your Solana Fundraiser
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Easy sign-up with just your email. Your Solana receiving wallet is kept strictly confidential and only revealed to verified donors.
          </p>
        </div>

        {hasLeakWarning && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-200">
                Security Warning: Do not post your wallet address publicly!
              </strong>
              <span>
                We detected what looks like a Solana address in your public text. To prevent spam, bots, and fraud, keep your address ONLY in the confidential wallet field at the bottom.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Creator Information (Simple email sign up) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                1. Organizer Account (Email Only)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Organizer Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Lindqvist"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Organizer Email (Required):
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., sarah@example.com"
                  value={organizerEmail}
                  onChange={(e) => setOrganizerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              2. Fundraiser Story & Goal
            </span>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Campaign Title:
              </label>
              <input
                type="text"
                required
                maxLength={90}
                placeholder="e.g., Emergency Surgery for Bella the Golden Retriever"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CampaignCategory)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Fundraising Goal (in SOL):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    required
                    placeholder="e.g., 25.0"
                    value={targetSol}
                    onChange={(e) => setTargetSol(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-emerald-400">
                    SOL
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Short Summary (1-2 sentences for feed):
              </label>
              <input
                type="text"
                required
                maxLength={140}
                placeholder="Brief summary of why you are raising funds on Solana..."
                value={summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Full Story & Details:
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell your story. Why does this matter? How will the funds be used? (Remember: Do NOT write your wallet address here!)"
                value={fullStory}
                onChange={(e) => handleStoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* Image selection */}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-2 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cover Photo:</span>
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(img.url);
                      setCustomImage('');
                    }}
                    className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      imageUrl === img.url && !customImage
                        ? 'border-emerald-400 scale-[1.02]'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    {imageUrl === img.url && !customImage && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-300 drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <input
                type="url"
                placeholder="Or paste custom image URL (https://...)"
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Confidential Solana Receiving Wallet */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/30 p-4 rounded-xl border-2 border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                3. Confidential Solana Receiving Wallet
              </span>
              <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                🔒 ADMIN ONLY
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your actual Solana address where you will receive donations. 
              <strong className="text-white"> This will NEVER be shown publicly on your page.</strong> Donors pay a 0.15 SOL platform connection fee, after which the administrator emails your wallet directly to verified donors.
            </p>

            <div className="pt-1">
              <input
                type="text"
                required
                placeholder="Paste your private Solana address (e.g. 7xKXtg2CW87...)"
                value={confidentialSolWallet}
                onChange={(e) => setConfidentialSolWallet(e.target.value.trim())}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-xs sm:text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="publish-campaign-btn"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <span>Publish Fundraiser</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
