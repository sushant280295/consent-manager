import { ConsentProvider } from './context/ConsentContext';
import { ConsentBanner } from './components/ConsentBanner';
import { ConsentDashboard } from './components/ConsentDashboard';
import { AgeVerification } from './components/AgeVerification';

function App() {
  return (
    <ConsentProvider>
      {/* Your existing app content */}
      <main>
        <h1>Your Website Content</h1>
        {/* ... other components */}
      </main>

      {/* Consent Management Components */}
      <ConsentBanner />
      <ConsentDashboard />
      <AgeVerification />
    </ConsentProvider>
  );
}

export default App;