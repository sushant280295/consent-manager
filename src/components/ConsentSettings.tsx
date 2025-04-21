import React from 'react';
import { Settings, AlertCircle } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';

export const ConsentSettings: React.FC = () => {
  const { settings, updateSettings } = useConsent();
  
  const handlePositionChange = (position: 'top' | 'bottom' | 'center') => {
    updateSettings({ bannerPosition: position });
  };
  
  const handleToggleAutoShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ autoShowBanner: e.target.checked });
  };
  
  const handleToggleExplicitConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ requireExplicitConsent: e.target.checked });
  };
  
  const handleExpiryDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ consentExpiryDays: parseInt(e.target.value) || 180 });
  };
  
  const handleToggleAgeVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ ageVerificationRequired: e.target.checked });
  };
  
  const handleMinimumAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ minimumAge: parseInt(e.target.value) || 18 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center text-blue-800">
          <Settings size={18} className="mr-2" />
          Consent Settings
        </h3>
        <p className="text-sm text-blue-800">
          Configure how consent is collected and managed on your website
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 border-b pb-2">Banner Display</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Position
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="bannerPosition"
                  value="top"
                  checked={settings.bannerPosition === 'top'}
                  onChange={() => handlePositionChange('top')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Top</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="bannerPosition"
                  value="bottom"
                  checked={settings.bannerPosition === 'bottom'}
                  onChange={() => handlePositionChange('bottom')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Bottom</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="bannerPosition"
                  value="center"
                  checked={settings.bannerPosition === 'center'}
                  onChange={() => handlePositionChange('center')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Center</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Auto-show Banner</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.autoShowBanner}
                  onChange={handleToggleAutoShow}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Show the consent banner automatically when a user visits for the first time
            </p>
          </div>
          
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Require Explicit Consent</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.requireExplicitConsent}
                  onChange={handleToggleExplicitConsent}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Require users to explicitly consent before using the website (recommended for DPDP compliance)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consent Expiry (days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={settings.consentExpiryDays}
              onChange={handleExpiryDaysChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Days until consent expires and needs to be renewed (180 days recommended)
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 border-b pb-2">DPDP Compliance Settings</h4>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                The DPDP Act 2023 requires additional safeguards when processing children's data. Configure these settings to ensure compliance.
              </p>
            </div>
          </div>
          
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Enable Age Verification</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.ageVerificationRequired}
                  onChange={handleToggleAgeVerification}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Verify users' age before collecting data (required by DPDP Act for minors)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Age Requirement
            </label>
            <input
              type="number"
              min="13"
              max="21"
              value={settings.minimumAge}
              onChange={handleMinimumAgeChange}
              disabled={!settings.ageVerificationRequired}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${!settings.ageVerificationRequired ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum age for consent (DPDP Act defines a child as under 18 years)
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Data Protection Officer (DPO) Info</h5>
            <p className="text-xs text-gray-600">
              The DPDP Act requires organizations to appoint a Data Protection Officer or other designated person for handling data protection matters.
            </p>
            
            <div className="mt-3 grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  DPO Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  DPO Email
                </label>
                <input
                  type="email"
                  placeholder="e.g., dpo@example.com"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};