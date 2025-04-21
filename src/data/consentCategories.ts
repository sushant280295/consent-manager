import { ConsentCategory } from '../types/consent';

export const consentCategories: ConsentCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'Essential cookies that enable core functionality of the website. These cannot be disabled as they are necessary for the website to function properly.',
    required: true,
    defaultValue: true
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Cookies that enhance the functionality of the website by storing your preferences.',
    required: false,
    defaultValue: false
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Cookies that help us analyze and understand how you use this website, which assists us in improving our services.',
    required: false,
    defaultValue: false
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies used to track visitors across websites to display relevant advertisements.',
    required: false,
    defaultValue: false
  },
  {
    id: 'third_party',
    name: 'Third-Party',
    description: 'Cookies from third-party services that may be embedded on our website.',
    required: false,
    defaultValue: false
  }
];

export const defaultSettings = {
  bannerPosition: 'bottom' as const,
  autoShowBanner: true,
  requireExplicitConsent: true,
  consentExpiryDays: 180,
  ageVerificationRequired: true,
  minimumAge: 18
};