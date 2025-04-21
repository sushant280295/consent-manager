import React, { useState } from 'react';
import { User, Download, Trash2, Send, AlertCircle } from 'lucide-react';

export const DataSubjectRights: React.FC = () => {
  const [rightType, setRightType] = useState<string>('access');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the request to a backend
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  const renderForm = () => {
    switch (rightType) {
      case 'access':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">
              Request a copy of all personal data we hold about you in accordance with the DPDP Act.
            </p>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="verification" className="block text-sm font-medium text-gray-700 mb-1">
                Identity Verification
              </label>
              <p className="text-xs text-gray-500 mb-2">
                To protect your information, we need to verify your identity. Please provide any identifier you've shared with us previously.
              </p>
              <input
                type="text"
                id="verification"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Phone number or account ID"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download size={16} className="mr-2" />
                Request My Data
              </button>
            </div>
          </form>
        );
        
      case 'correction':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">
              Request correction of inaccurate or incomplete personal data we hold about you.
            </p>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="correction" className="block text-sm font-medium text-gray-700 mb-1">
                Information to Correct
              </label>
              <textarea
                id="correction"
                required
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Describe what information you'd like to correct and what it should be changed to"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send size={16} className="mr-2" />
                Submit Correction Request
              </button>
            </div>
          </form>
        );
        
      case 'erasure':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-3">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-700">
                  Data erasure is irreversible. We will permanently delete your personal data as required by the DPDP Act, except where we have a legal obligation to retain it.
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Erasure (Optional)
              </label>
              <select
                id="reason"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a reason</option>
                <option value="no_longer_necessary">Data no longer necessary</option>
                <option value="consent_withdrawn">Withdrawing consent</option>
                <option value="unlawful_processing">Unlawful processing</option>
                <option value="legal_obligation">Legal obligation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="verification" className="block text-sm font-medium text-gray-700 mb-1">
                Type "DELETE MY DATA" to confirm
              </label>
              <input
                type="text"
                id="verification"
                required
                pattern="DELETE MY DATA"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="DELETE MY DATA"
              />
              <p className="text-xs text-gray-500 mt-1">
                This confirmation helps prevent accidental deletion requests.
              </p>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 size={16} className="mr-2" />
                Request Data Erasure
              </button>
            </div>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center text-blue-800">
          <User size={18} className="mr-2" />
          Your Rights Under DPDP Act 2023
        </h3>
        <p className="text-sm text-blue-800">
          Exercise your data subject rights as provided by the Digital Personal Data Protection Act
        </p>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setRightType('access')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                rightType === 'access'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Right to Access
            </button>
            
            <button
              onClick={() => setRightType('correction')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                rightType === 'correction'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Right to Correction
            </button>
            
            <button
              onClick={() => setRightType('erasure')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                rightType === 'erasure'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Right to Erasure
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {formSubmitted ? (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request submitted successfully</h3>
                <p className="mt-2 text-sm text-green-700">
                  We've received your request and will process it according to the DPDP Act requirements. 
                  You'll receive a confirmation email shortly.
                </p>
              </div>
            </div>
          ) : (
            renderForm()
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">About Your Rights</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            The Digital Personal Data Protection Act 2023 provides several rights to individuals regarding their personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right to Information:</strong> You have the right to obtain information about your personal data being processed.</li>
            <li><strong>Right to Correction:</strong> You can request correction of inaccurate or incomplete personal data.</li>
            <li><strong>Right to Erasure:</strong> You can request deletion of your personal data under certain circumstances.</li>
            <li><strong>Right to Grievance Redressal:</strong> You have the right to file a complaint with us or the Data Protection Board.</li>
          </ul>
          <p>
            We'll respond to all legitimate requests within 30 days as required by the DPDP Act.
          </p>
        </div>
      </div>
    </div>
  );
};