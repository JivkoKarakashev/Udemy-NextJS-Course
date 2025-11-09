import type { PostDate } from "../types/post.tsx";

const getDateStamp = (): PostDate => {
  const today = new Date();

  //ISO date Format: YYYY-MM-DDTHH:mm:ss
  const iso = today.toISOString();

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
  getDateStamp
}