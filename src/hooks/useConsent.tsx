import { useContext } from 'react';
import { ConsentContext } from '../context/ConsentContext';

export const useConsent = () => {
  const context = useContext(ConsentContext);
  
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  
  return context;
};