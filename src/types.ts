export type CampaignCategory = 
  | 'Medical' 
  | 'Emergency' 
  | 'Animals & Pets' 
  | 'Community' 
  | 'Education' 
  | 'Creative & Tech';

export interface Campaign {
  id: string;
  title: string;
  category: CampaignCategory;
  description: string;
  fullStory: string;
  imageUrl: string;
  targetSol: number;
  raisedSol: number;
  donorCount: number;
  organizerName: string;
  organizerEmail: string;
  /** Confidential: strictly withheld from public UI, only accessible by admin */
  confidentialSolWallet: string;
  createdAt: string;
  verified: boolean;
  featured?: boolean;
}

export interface DonationRequest {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorEmail: string;
  creatorConfidentialWallet: string;
  donorEmail: string;
  donorWalletOrTx?: string;
  feeAmountSol: number; // 0.15
  status: 'pending_verification' | 'wallet_emailed' | 'completed';
  createdAt: string;
  notes?: string;
}
