import { Campaign } from '../types';

export function getShareUrls(campaign: Campaign) {
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?campaign=${campaign.id}` 
    : `https://solfund.app?campaign=${campaign.id}`;

  const text = `Support "${campaign.title}" on SolFund - Solana Crowdfunding! Every SOL makes an impact:`;

  return {
    url: currentUrl,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}&hashtags=Solana,SolFund,Crowdfunding`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${currentUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };
}
