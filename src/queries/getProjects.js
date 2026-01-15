// queries/getProjects.js
import datoCMSClient from './datoCMSClient';
import { hardcodedProjects } from '../data/mockData';


const GET_PROJECTS = `
  query {
    allProjects(orderBy: title_ASC) {
      title
      description
      techUsed
      image {
        url
      }
      link
      github
    }
  }
`;


export async function getProjects() {
    try {
        const data = await datoCMSClient.request(GET_PROJECTS);
        // Merge CMS data with hardcoded data. CMS data comes first.
        return [...(data.allProjects || []), ...hardcodedProjects];
    } catch (error) {
        return hardcodedProjects;
    }
}
