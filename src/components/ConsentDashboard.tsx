import React, { useState } from 'react';
import { X, Shield, Settings, FileText, History, User, AlertCircle } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';
import { formatTimestamp, getConsentStatusSummary } from '../utils/helpers';
import { PrivacyPolicy } from './PrivacyPolicy';
import { ConsentHistoryLog } from './ConsentHistoryLog';
import { ConsentSettings } from './ConsentSettings';
import { DataSubjectRights } from './DataSubjectRights';

type Tab = 'preferences' | 'policy' | 'history' | 'settings' | 'rights';

export const ConsentDashboard: React.FC = () => {
  const {
    categories,
    preferences,
    updatePreference,
    saveConsent,
    resetConsent,
    consentLogs,
    showDashboard,
    setShowDashboard,
    settings
  } = useConsent();

  const [activeTab, setActiveTab] = useState<Tab>('preferences');

  const handleClose = () => {
    setShowDashboard(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center text-blue-800">
                <Shield size={18} className="mr-2" />
                Consent Status
              </h3>
              <p className="text-sm text-blue-800">
                {getConsentStatusSummary(preferences, categories)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Last updated: {formatTimestamp(preferences[0]?.timestamp || new Date().toISOString())}
              </p>
            </div>

            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      {category.required && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-2 inline-block">
                          Required
                        </span>
                      )}
                    </div>
                    
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.find(p => p.categoryId === category.id)?.granted || false}
                        onChange={(e) => updatePreference(category.id, e.target.checked)}
                        disabled={category.required}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={saveConsent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              
              <button
                onClick={resetConsent}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Reset Preferences
              </button>
            </div>
          </div>
        );
        
      case 'policy':
        return <PrivacyPolicy />;
        
      case 'history':
        return <ConsentHistoryLog logs={consentLogs} categories={categories} />;
        
      case 'settings':
        return <ConsentSettings />;
        
      case 'rights':
        return <DataSubjectRights />;
        
      default:
        return null;
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'preferences', label: 'Preferences', icon: <Shield size={18} /> },
    { id: 'policy', label: 'Privacy Policy', icon: <FileText size={18} /> },
    { id: 'history', label: 'Consent History', icon: <History size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'rights', label: 'Your Rights', icon: <User size={18} /> }
  ];

  if (!showDashboard) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="mr-2 text-blue-600" size={24} />
            Consent Management Dashboard
          </h2>
          
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <div className="border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 md:w-64 flex-shrink-0">
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              {settings.ageVerificationRequired && (
                <div className="mt-6 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex">
                    <AlertCircle size={18} className="text-yellow-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      Age verification is required by DPDP Act for processing children's data
                    </p>
                  </div>
                </div>
              )}
            </nav>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};