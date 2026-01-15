// queries/getResearchPapers.js
import datoCMSClient from './datoCMSClient';
import { hardcodedPapers } from '../data/mockData';
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
    const data = await datoCMSClient.request(GET_RESEARCH_PAPERS);
    return [...(data.allResearchPapers || []), ...hardcodedPapers];
  } catch (error) {
    return hardcodedPapers;
  }
}
