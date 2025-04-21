export interface ConsentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  defaultValue: boolean;
}

export interface ConsentPreference {
  categoryId: string;
  granted: boolean;
  timestamp: string;
}

export interface UserConsent {
  id: string;
  userIdentifier?: string;
  preferences: ConsentPreference[];
  lastUpdated: string;
  version: string;
}

export interface ConsentLog {
  id: string;
  userIdentifier?: string;
  action: 'grant' | 'revoke' | 'update';
  categoryId: string;
  timestamp: string;
  previousState?: boolean;
  newState: boolean;
}

export interface ConsentSettings {
  bannerPosition: 'top' | 'bottom' | 'center';
  autoShowBanner: boolean;
  requireExplicitConsent: boolean;
  consentExpiryDays: number;
  ageVerificationRequired: boolean;
  minimumAge: number;
}