/**
 * Generates a random ID string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Formats a timestamp into a human-readable date and time
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

/**
 * Creates a deep copy of an object
 */
export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Gets the consent status summary as a string
 */
export const getConsentStatusSummary = (
  preferences: { categoryId: string; granted: boolean }[],
  categories: { id: string; name: string }[]
): string => {
  const granted = preferences
    .filter(p => p.granted)
    .map(p => categories.find(c => c.id === p.categoryId)?.name || p.categoryId)
    .join(', ');
    
  if (!granted.length) return 'No consents granted';
  return `Consented to: ${granted}`;
};

/**
 * Checks if the age provided meets the minimum age requirement
 */
export const isValidAge = (age: number, minimumAge: number): boolean => {
  return age >= minimumAge;
};