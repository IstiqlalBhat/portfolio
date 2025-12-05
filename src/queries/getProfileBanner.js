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
            profileSummary: `I bridge cutting-edge computer science with billion-dollar industry problems. As a Research Software Developer at Clemson University, I've published peer-reviewed research on using blockchain and AI to eliminate corruption in construction procurement and automate carbon emissions tracking with 98% accuracy. My work has appeared in Automation in Construction (Impact Factor 11.5), demonstrating that rigorous research and practical impact aren't mutually exclusive.

My focus is emerging technologies, particularly AI, blockchain, and multimodal systems applied to real construction challenges. I've built production systems that reduce procurement fraud by 100%, cut smart contract gas costs by 37%, and achieve sub-200ms response times on complex BIM queries. I'm equally comfortable writing Solidity smart contracts, fine-tuning multimodal AI models, or architecting full-stack applications and I use the right tool for the problem, not the trendy one.

What drives me: the $13 trillion construction industry is ripe for transformation. I'm the kind of engineer who doesn't just write papers about problems, I build systems, ship them, and measure their real-world impact. I'm also the first computer scientist from my hometown in Kashmir, which gives me unusual perspective on bringing technology to places that need it most.

Currently completing my Master's in Computer Science (Networks, Systems, and Security) at Clemson, I'm actively seeking roles where I can apply this combination of AI/blockchain expertise, construction domain knowledge, and entrepreneurial mindset to build the next generation of construction technology.`,
            linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
            resumeLink: { url: "#" }, // TODO: Add actual resume link if available
            backgroundImage: { url: "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" }
        };
    }
}
