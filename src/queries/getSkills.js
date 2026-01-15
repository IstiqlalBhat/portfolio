// queries/getSkills.js
import datoCMSClient from './datoCMSClient';
import { hardcodedSkills } from '../data/mockData';

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
    const data = await datoCMSClient.request(GET_SKILLS);
    return [...(data.allSkills || []), ...hardcodedSkills];
  } catch (error) {
    return hardcodedSkills;
  }
}
