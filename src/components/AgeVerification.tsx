import React, { useState } from 'react';
import { AlertCircle, Shield, Check } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';
import { isValidAge } from '../utils/helpers';

export const AgeVerification: React.FC = () => {
  const { settings, setShowBanner } = useConsent();
  const [age, setAge] = useState<number | ''>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  
  // Skip if age verification is not required
  if (!settings.ageVerificationRequired || verified) {
    return null;
  }
  
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === '' ? '' : parseInt(value));
    setShowError(false);
  };
  
  const handleVerify = () => {
    if (age === '' || !isValidAge(age as number, settings.minimumAge)) {
      setShowError(true);
      return;
    }
    
    // Age verification successful
    setVerified(true);
    
    // Show consent banner after age verification
    setTimeout(() => {
      setShowBanner(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-blue-600 text-white rounded-t-lg p-4 flex items-center">
          <Shield className="mr-2" size={20} />
          <h2 className="text-lg font-semibold">Age Verification</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700">
              In compliance with India's Digital Personal Data Protection (DPDP) Act 2023, we need to verify your age before collecting any personal data.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
            <div className="flex">
              <AlertCircle size={18} className="text-yellow-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                The DPDP Act requires additional safeguards for processing children's data (individuals below {settings.minimumAge} years of age).
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Please enter your age
            </label>
            <input
              type="number"
              id="age"
              min="1"
              max="120"
              value={age}
              onChange={handleAgeChange}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                showError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="Enter your age"
            />
            {showError && (
              <p className="mt-2 text-sm text-red-600">
                You must be at least {settings.minimumAge} years old to use this website.
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleVerify}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify Age
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};