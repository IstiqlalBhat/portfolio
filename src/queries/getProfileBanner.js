// queries/getProfileBanner.js
import datoCMSClient from './datoCMSClient';
import { hardcodedBanner } from '../data/mockData';

const GET_PROFILE_BANNER = `
 {
  profilebanner {
    backgroundImage {
      url
    }
    headline
    resumeLink {
      url
    }
    linkedinLink
    profileSummary
  }
}
`;


export async function getProfileBanner() {
  try {
    const data = await datoCMSClient.request(GET_PROFILE_BANNER);
    // If we get data, return it. If not (or error), fallback.
    // Since this is a single object, we prefer CMS if available.
    if (data.profilebanner) {
      return data.profilebanner;
    }
    return hardcodedBanner;
  } catch (error) {
    return hardcodedBanner;
  }
}
