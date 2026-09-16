import { Campaign, DonationRequest } from '../types';
import { INITIAL_CAMPAIGNS } from '../data/initialCampaigns';

const CAMPAIGNS_KEY = 'solfund_campaigns_v1';
const DONATION_REQUESTS_KEY = 'solfund_donation_requests_v1';

export function loadCampaigns(): Campaign[] {
  if (typeof window === 'undefined') return INITIAL_CAMPAIGNS;
  try {
    const raw = localStorage.getItem(CAMPAIGNS_KEY);
    if (!raw) {
      localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(INITIAL_CAMPAIGNS));
      return INITIAL_CAMPAIGNS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CAMPAIGNS;
  } catch (err) {
    console.error('Error reading campaigns from localStorage', err);
    return INITIAL_CAMPAIGNS;
  }
}

export function saveCampaigns(campaigns: Campaign[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  } catch (err) {
    console.error('Error saving campaigns to localStorage', err);
  }
}

export function loadDonationRequests(): DonationRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DONATION_REQUESTS_KEY);
    if (!raw) {
      // Seed a sample request so the admin inbox has a demonstrable workflow right away!
      const initial: DonationRequest[] = [
        {
          id: 'req-sample-1',
          campaignId: 'campaign-1',
          campaignTitle: 'Emergency Surgery & Recovery for Bella the Golden Retriever',
          creatorEmail: 'sarah.lindqvist@solhelp.example.com',
          creatorConfidentialWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          donorEmail: 'crypto_philanthropist@solmail.xyz',
          donorWalletOrTx: '4z8aQ7Kx49zYp...sol_tx',
          feeAmountSol: 0.15,
          status: 'pending_verification',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          notes: 'Sent 0.15 SOL from Phantom, looking forward to sending 5 SOL directly to Sarah for Bella!',
        }
      ];
      localStorage.setItem(DONATION_REQUESTS_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading donation requests', err);
    return [];
  }
}

export function saveDonationRequests(requests: DonationRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DONATION_REQUESTS_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Error saving donation requests', err);
  }
}
