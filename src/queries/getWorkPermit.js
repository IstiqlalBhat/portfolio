// queries/getWorkPermit.js
import datoCMSClient from './datoCMSClient';

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
  // try {
  //   const data = await datoCMSClient.request(GET_WORK_PERMIT);
  //   return data.workPermit;
  // } catch (error) {
  //   console.warn("DatoCMS request failed, returning mock data for WorkPermit");
  return {
    visaStatus: "F1 OPT",
    expiryDate: "2027-01-31",
    summary: "Authorized to work in the US",
    additionalInfo: "Eligible for STEM OPT extension. Open to H1B sponsorship."
  };
  // }
}
