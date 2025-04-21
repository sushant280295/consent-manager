import { useConsent } from '../hooks/useConsent';

export function YourComponent() {
  const { preferences } = useConsent();
  
  // Check if a specific category is consented to
  const isAnalyticsAllowed = preferences.find(
    p => p.categoryId === 'analytics'
  )?.granted || false;

  return (
    <div>
      {isAnalyticsAllowed && (
        // Render analytics-related content
      )}
    </div>
  );
}