// queries/getResearchPapers.js
import datoCMSClient from './datoCMSClient';
import { FaBook } from 'react-icons/fa';

const GET_RESEARCH_PAPERS = `
  query {
    allResearchPapers {
      title
      journal
      year
      link
      citation
    }
  }
`;

export async function getResearchPapers() {
    try {
        // const data = await datoCMSClient.request(GET_RESEARCH_PAPERS);
        // return data.allResearchPapers;
        throw new Error("Using mock data");
    } catch (error) {
        return [
            {
                title: "Artificial intelligence- and blockchain-enabled carbon emissions ledger system (AB-CELS) for sustainable construction processes",
                journal: "Automation in Construction",
                year: "2025",
                link: "https://doi.org/10.1016/j.autcon.2025.106286",
                citation: "Aurangzeb, I., & Yoon, J. H. (2025). Artificial intelligence- and blockchain-enabled carbon emissions ledger system (AB-CELS) for sustainable construction processes. Automation in Construction, 171, Article 105987."
            },
            {
                title: "BIM- and blockchain-enabled Automatic Procurement System (BBAPS) removing relationship bias",
                journal: "Automation in Construction",
                year: "2024",
                link: "https://doi.org/10.1016/j.autcon.2024.105779",
                citation: "Yoon, J. H., Aurangzeb, I., & McNamara, S. (2024). BIM- and blockchain-enabled automatic procurement system (BBAPS) removing relationship bias. Automation in Construction, 168(A), Article 105779."
            }
        ];
    }
}
