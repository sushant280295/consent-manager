import { Shield } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';

export function Header() {
  const { setShowDashboard } = useConsent();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Your existing header content */}
          </div>
          
          <button
            onClick={() => setShowDashboard(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Shield className="inline-block w-4 h-4 mr-2" />
            Manage Consent
          </button>
        </div>
      </div>
    </header>
  );
}