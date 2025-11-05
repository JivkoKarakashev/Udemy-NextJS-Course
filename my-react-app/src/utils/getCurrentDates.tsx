import type { PostDate } from "../types/postProps.tsx";

const getCurrentDates = (): PostDate => {
  const today = new Date();

  // Format: YYYY-MM-DD
  const iso = today.toISOString().split('T')[0];

  // Format: Month DD, YYYY
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const long = today.toLocaleDateString('en-US', options);

  return {
    iso,
    long
  };
}

export {
  getCurrentDates
}