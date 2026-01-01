// queries/getProfileBanner.js
import datoCMSClient from './datoCMSClient';

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
    // const data = await datoCMSClient.request(GET_PROFILE_BANNER);
    // return data.profilebanner;
    throw new Error("Using mock data");
  } catch (error) {
    return {
      headline: "Istiqlal Aurangzeb",
      profileSummary: ` Software Developer at Clemson University.`,
      linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
      resumeLink: { url: "#" }, // TODO: Add actual resume link if available
      backgroundImage: { url: "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" }
    };
  }
}
