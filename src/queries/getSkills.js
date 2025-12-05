// queries/getSkills.js
import datoCMSClient from './datoCMSClient';

const GET_SKILLS = `
{
  allSkills(orderBy: category_ASC) {
    name
    category
    description
    icon
  }
}
`;

export async function getSkills() {
    try {
        // const data = await datoCMSClient.request(GET_SKILLS);
        // return data.allSkills;
        throw new Error("Using mock data");
    } catch (error) {
        const skills = [
            // Programming
            { name: "Python", category: "Programming", description: "Language", icon: "FaPython" },
            { name: "Solidity", category: "Programming", description: "Blockchain", icon: "SiSolidity" },
            { name: "JavaScript", category: "Programming", description: "Language", icon: "FaJs" },
            { name: "Node.js", category: "Programming", description: "Runtime", icon: "FaNodeJs" },
            { name: "React.js", category: "Programming", description: "Library", icon: "FaReact" },
            { name: "HTML/CSS", category: "Programming", description: "Web", icon: "SiHtml5" },
            { name: "SQL", category: "Programming", description: "Database", icon: "SiPostgresql" },

            // AI/ML Tools
            { name: "PyTorch", category: "AI/ML Tools", description: "Framework", icon: "SiPytorch" },
            { name: "Hugging Face", category: "AI/ML Tools", description: "Platform", icon: "SiHuggingface" },
            { name: "LLMs", category: "AI/ML Tools", description: "AI Models", icon: "FaBrain" },

            // Development Tools
            { name: "AWS", category: "Development Tools", description: "Cloud", icon: "FaAws" },
            { name: "Git/GitHub", category: "Development Tools", description: "Version Control", icon: "FaGithub" },
            { name: "Docker", category: "Development Tools", description: "Containerization", icon: "FaDocker" },
            { name: "Figma", category: "Development Tools", description: "Design", icon: "FaFigma" },

            // Specialized Skills
            { name: "Blockchain", category: "Specialized Skills", description: "Development", icon: "FaLink" },
            { name: "Smart Contracts", category: "Specialized Skills", description: "Auditing", icon: "FaFileContract" },
            { name: "CI/CD", category: "Specialized Skills", description: "DevOps", icon: "FaInfinity" }
        ];
        return skills;
    }
}
