import React, { useState, useEffect, useMemo } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { DonateModal } from './components/DonateModal';
import { CreateCampaignModal } from './components/CreateCampaignModal';
import { ShareModal } from './components/ShareModal';
import { AdminDeskModal } from './components/AdminDeskModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { TipWalletBar } from './components/TipWalletBar';
import { Footer } from './components/Footer';
import { Campaign, DonationRequest } from './types';
import { loadCampaigns, saveCampaigns, loadDonationRequests, saveDonationRequests } from './utils/storage';
import { VERIFICATION_FEE_SOL } from './data/constants';
import { Sparkles, Heart, PlusCircle, Search } from 'lucide-react';

function SolFundApp() {
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => loadCampaigns());
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>(() => loadDonationRequests());

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'trending' | 'raised' | 'newest' | 'target'>('trending');

  // Modal active states
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donatingCampaign, setDonatingCampaign] = useState<Campaign | null>(null);
  const [sharingCampaign, setSharingCampaign] = useState<Campaign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAdminDeskOpen, setIsAdminDeskOpen] = useState(false);

  // Sync to localStorage whenever data changes
  useEffect(() => {
    saveCampaigns(campaigns);
  }, [campaigns]);

  useEffect(() => {
    saveDonationRequests(donationRequests);
  }, [donationRequests]);

  // Deep-link check for shared campaign in URL query (?campaign=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedCampaignId = params.get('campaign');
      if (sharedCampaignId) {
        const found = campaigns.find((c) => c.id === sharedCampaignId);
        if (found) {
          setSelectedCampaign(found);
        }
      }
    }
  }, [campaigns]);

  // Filtered and sorted campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((camp) => {
        const matchesCategory =
          selectedCategory === 'all' || camp.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          !searchQuery.trim() ||
          camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          camp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          camp.organizerName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') {
          return b.donorCount - a.donorCount;
        }
        if (sortBy === 'raised') {
          return b.raisedSol - a.raisedSol;
        }
        if (sortBy === 'target') {
          const aRatio = a.raisedSol / a.targetSol;
          const bRatio = b.raisedSol / b.targetSol;
          return bRatio - aRatio;
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
  }, [campaigns, selectedCategory, searchQuery, sortBy]);

  // Pending verification count for Admin Desk badge
  const pendingRequestsCount = donationRequests.filter(
    (r) => r.status === 'pending_verification'
  ).length;

  // Handler: New campaign created
  const handleCampaignCreated = (newCamp: Campaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    setSelectedCampaign(newCamp);
    showToast('Fundraiser published successfully! Creator wallet is secured in escrow.', 'success');
  };

  // Handler: Donor requested creator wallet with 0.15 SOL fee
  const handleDonationRequest = (newReq: Omit<DonationRequest, 'id' | 'createdAt'>) => {
    const created: DonationRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setDonationRequests((prev) => [created, ...prev]);

    // Increment donor count on the campaign
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === newReq.campaignId
          ? {
              ...c,
              donorCount: c.donorCount + 1,
            }
          : c
      )
    );

    showToast('Donation connection request submitted! Admin will email creator wallet upon verification.', 'success');
  };

  // Handler: Admin status toggle
  const handleUpdateStatus = (requestId: string, newStatus: DonationRequest['status']) => {
    setDonationRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
    showToast(
      newStatus === 'wallet_emailed'
        ? 'Marked as wallet emailed to donor!'
        : 'Request re-opened as pending verification.',
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Navbar */}
      <Navbar
        onStartFundraiser={() => setIsCreateOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenAdminDesk={() => setIsAdminDeskOpen(true)}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* Hero with GoFundMe-style mission & Prominent Main Page Tip Wallet */}
      <Hero
        campaigns={campaigns}
        onStartFundraiser={() => setIsCreateOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Main Campaign Discovery Feed */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Community Fundraisers</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono">
                {filteredCampaigns.length} Active
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Explore causes needing immediate Solana support. 0.15 SOL connection fee protects creators.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto hover:underline"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Have a cause to fund?</span>
          </button>
        </div>

        {/* Category Filters, Search, and Sort */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onSelectCampaign={(c) => setSelectedCampaign(c)}
                onDonateClick={(c) => setDonatingCampaign(c)}
                onShareClick={(c) => setSharingCampaign(c)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No fundraisers match your search</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your category filters or search query, or be the first to create a fundraiser in this category!
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Start a Fundraiser</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Solana Donate Address & Footer */}
      <Footer />

      {/* Sticky Bottom Floating Bar (always shows the user's requested tip wallet EauaQxvhksz5FYC87ADh3fFf9r7A9h23LXC33Qn8Wdfv) */}
      <TipWalletBar variant="footer-sticky" />

      {/* Modals */}
      {/* 1. Campaign Details */}
      <CampaignDetailModal
        isOpen={Boolean(selectedCampaign)}
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onDonateClick={(c) => setDonatingCampaign(c)}
        onShareClick={(c) => setSharingCampaign(c)}
      />

      {/* 2. Donate / Connect 0.15 SOL Flow */}
      {donatingCampaign && (
        <DonateModal
          isOpen={Boolean(donatingCampaign)}
          campaign={donatingCampaign}
          onClose={() => setDonatingCampaign(null)}
          onSubmitDonationRequest={handleDonationRequest}
        />
      )}

      {/* 3. Create Fundraiser (Email sign-up + Confidential Wallet) */}
      <CreateCampaignModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCampaignCreated={handleCampaignCreated}
      />

      {/* 4. Social Sharing Modal */}
      {sharingCampaign && (
        <ShareModal
          isOpen={Boolean(sharingCampaign)}
          campaign={sharingCampaign}
          onClose={() => setSharingCampaign(null)}
        />
      )}

      {/* 5. How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStartFundraiser={() => setIsCreateOpen(true)}
      />

      {/* 6. Admin Escrow & Verification Desk */}
      <AdminDeskModal
        isOpen={isAdminDeskOpen}
        onClose={() => setIsAdminDeskOpen(false)}
        donationRequests={donationRequests}
        onUpdateRequestStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SolFundApp />
    </ToastProvider>
  );
}
