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
            profileSummary: `Research Software Developer at Clemson University bridging AI and blockchain with construction technology.
             Published peer-reviewed research on eradicating procurement fraud and automating emissions tracking with 98% accuracy. Built systems delivering subcontractor procurement fraud reduction, 37% lower smart contract costs, and sub-200ms query speeds. 
             Proficient in Solidity, multimodal AI, and full-stack development. 
             Driven to transform the $13 trillion construction industry by building and shipping measurable solutions. 
             Completing a Master’s in Computer Science and seeking roles to apply AI/blockchain expertise in construction tech.`,
            linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
            resumeLink: { url: "#" }, // TODO: Add actual resume link if available
            backgroundImage: { url: "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" }
        };
    }
}
