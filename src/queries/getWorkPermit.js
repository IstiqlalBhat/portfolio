// queries/getWorkPermit.js
import datoCMSClient from './datoCMSClient';
import { hardcodedPermit } from '../data/mockData';

const GET_WORK_PERMIT = `
  query {
    workPermit {
      visaStatus
      expiryDate
      summary
      additionalInfo
    }
  }
`;


export async function getWorkPermit() {
  try {
    const data = await datoCMSClient.request(GET_WORK_PERMIT);
    if (data.workPermit) {
      return data.workPermit;
    }
    return hardcodedPermit;
  } catch (error) {
    return hardcodedPermit;
  }
}
