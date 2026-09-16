export const PLATFORM_TIP_WALLET = 'EauaQxvhksz5FYC87ADh3fFf9r7A9h23LXC33Qn8Wdfv';
export const VERIFICATION_FEE_SOL = 0.15;

export const CATEGORIES: Array<{
  id: string;
  name: import('../types').CampaignCategory;
  iconName: string;
  color: string;
}> = [
  { id: 'all', name: 'Community', iconName: 'Flame', color: 'emerald' },
  { id: 'medical', name: 'Medical', iconName: 'HeartPulse', color: 'rose' },
  { id: 'emergency', name: 'Emergency', iconName: 'AlertCircle', color: 'amber' },
  { id: 'animals', name: 'Animals & Pets', iconName: 'PawPrint', color: 'teal' },
  { id: 'community', name: 'Community', iconName: 'Users', color: 'sky' },
  { id: 'education', name: 'Education', iconName: 'GraduationCap', color: 'indigo' },
  { id: 'creative', name: 'Creative & Tech', iconName: 'Sparkles', color: 'purple' },
];

export const PRESET_IMAGES = [
  {
    label: 'Community & Aid',
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Medical Support',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Animal Shelter',
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Disaster Relief',
    url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Education & Kids',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Solar & Clean Tech',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
];
