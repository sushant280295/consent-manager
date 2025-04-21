import React, { useState } from 'react';
import { Shield, Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';

export const ConsentBanner: React.FC = () => {
  const { 
    categories,
    preferences,
    updatePreference,
    saveConsent,
    settings,
    setShowDashboard
  } = useConsent();
  
  const [showDetails, setShowDetails] = useState(false);
  
  const handleAcceptAll = () => {
    categories.forEach(category => {
      updatePreference(category.id, true);
    });
    saveConsent();
  };
  
  const handleRejectAll = () => {
    categories.forEach(category => {
      if (!category.required) {
        updatePreference(category.id, false);
      }
    });
    saveConsent();
  };
  
  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };
  
  const getPositionClass = () => {
    switch (settings.bannerPosition) {
      case 'top':
        return 'top-0 left-0 right-0';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full mx-auto';
      default:
        return 'bottom-0 left-0 right-0';
    }
  };
  
  return (
    <div className={`fixed z-50 ${getPositionClass()} bg-white shadow-lg rounded-lg m-4 overflow-hidden transform transition-transform duration-500 ease-in-out`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center text-blue-700 mb-4">
            <Shield className="mr-2" size={24} />
            <h2 className="text-xl font-bold">Consent Management</h2>
          </div>
          
          <button 
            onClick={() => setShowDashboard(true)} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Open Dashboard"
          >
            <Settings size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">
            In compliance with India's Digital Personal Data Protection (DPDP) Act 2023, we request your consent to collect and process your personal data. We value your privacy and want to ensure transparency in how we handle your information.
          </p>
        </div>
        
        {showDetails && (
          <div className="mt-4 mb-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Customize Consent Preferences</h3>
            
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category.id} className="flex items-start justify-between border-b border-gray-200 pb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    {category.required && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
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
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
          
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reject All
          </button>
          
          <button
            onClick={handleCustomize}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors flex items-center"
          >
            Customize
            {showDetails ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
          
          {showDetails && (
            <button
              onClick={saveConsent}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ml-auto"
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
};