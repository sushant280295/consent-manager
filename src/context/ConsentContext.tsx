import React, { createContext, useState, useEffect, useCallback } from 'react';
import { 
  ConsentCategory, 
  ConsentPreference, 
  UserConsent, 
  ConsentLog,
  ConsentSettings
} from '../types/consent';
import { consentCategories, defaultSettings } from '../data/consentCategories';
import { generateId } from '../utils/helpers';

interface ConsentContextType {
  consentId: string;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  categories: ConsentCategory[];
  preferences: ConsentPreference[];
  updatePreference: (categoryId: string, granted: boolean) => void;
  saveConsent: () => void;
  resetConsent: () => void;
  consentLogs: ConsentLog[];
  settings: ConsentSettings;
  updateSettings: (newSettings: Partial<ConsentSettings>) => void;
  showDashboard: boolean;
  setShowDashboard: (show: boolean) => void;
  hasSetPreferences: boolean;
}

export const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consentId, setConsentId] = useState<string>('');
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [categories] = useState<ConsentCategory[]>(consentCategories);
  const [preferences, setPreferences] = useState<ConsentPreference[]>([]);
  const [consentLogs, setConsentLogs] = useState<ConsentLog[]>([]);
  const [settings, setSettings] = useState<ConsentSettings>(defaultSettings);
  const [hasSetPreferences, setHasSetPreferences] = useState<boolean>(false);

  // Initialize preferences from categories
  useEffect(() => {
    const storedConsent = localStorage.getItem('userConsent');
    
    if (storedConsent) {
      const parsedConsent: UserConsent = JSON.parse(storedConsent);
      setConsentId(parsedConsent.id);
      setPreferences(parsedConsent.preferences);
      setHasSetPreferences(true);
    } else {
      const newId = generateId();
      setConsentId(newId);
      
      const initialPreferences = categories.map(category => ({
        categoryId: category.id,
        granted: category.defaultValue,
        timestamp: new Date().toISOString()
      }));
      
      setPreferences(initialPreferences);
      
      if (settings.autoShowBanner) {
        setShowBanner(true);
      }
    }
    
    // Load logs if available
    const storedLogs = localStorage.getItem('consentLogs');
    if (storedLogs) {
      setConsentLogs(JSON.parse(storedLogs));
    }
    
    // Load settings if available
    const storedSettings = localStorage.getItem('consentSettings');
    if (storedSettings) {
      setSettings({...settings, ...JSON.parse(storedSettings)});
    }
  }, []);

  const updatePreference = useCallback((categoryId: string, granted: boolean) => {
    setPreferences(prev => {
      const timestamp = new Date().toISOString();
      
      const updated = prev.map(pref => 
        pref.categoryId === categoryId 
          ? { ...pref, granted, timestamp } 
          : pref
      );
      
      // Add to logs
      const previousState = prev.find(p => p.categoryId === categoryId)?.granted;
      const newLog: ConsentLog = {
        id: generateId(),
        categoryId,
        action: previousState === undefined ? 'grant' : (granted ? 'grant' : 'revoke'),
        timestamp,
        previousState,
        newState: granted
      };
      
      setConsentLogs(logs => {
        const updatedLogs = [...logs, newLog];
        localStorage.setItem('consentLogs', JSON.stringify(updatedLogs));
        return updatedLogs;
      });
      
      return updated;
    });
  }, []);

  const saveConsent = useCallback(() => {
    const consent: UserConsent = {
      id: consentId,
      preferences,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('userConsent', JSON.stringify(consent));
    setHasSetPreferences(true);
    setShowBanner(false);
  }, [consentId, preferences]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem('userConsent');
    
    const initialPreferences = categories.map(category => ({
      categoryId: category.id,
      granted: category.defaultValue,
      timestamp: new Date().toISOString()
    }));
    
    setPreferences(initialPreferences);
    setHasSetPreferences(false);
    setShowBanner(true);
  }, [categories]);

  const updateSettings = useCallback((newSettings: Partial<ConsentSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('consentSettings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const contextValue: ConsentContextType = {
    consentId,
    showBanner,
    setShowBanner,
    categories,
    preferences,
    updatePreference,
    saveConsent,
    resetConsent,
    consentLogs,
    settings,
    updateSettings,
    showDashboard,
    setShowDashboard,
    hasSetPreferences
  };

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
    </ConsentContext.Provider>
  );
};