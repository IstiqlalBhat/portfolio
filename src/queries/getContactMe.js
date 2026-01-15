// queries/getContactMe.js
import datoCMSClient from './datoCMSClient';
import { hardcodedContact } from '../data/mockData';

const GET_CONTACT_ME = `
  query {
    contactMe {
      profilePicture {
        url
      }
      name
      title
      summary
      companyUniversity
      linkedinLink
      email
      phoneNumber
    }
  }
`;

export async function getContactMe() {
  const hardcodedContact = {
    name: "Istiqlal Aurangzeb",
    title: "Software Developer",
    summary: "Full-stack developer and researcher specializing in Blockchain, AI, and Software Engineering.",
    companyUniversity: "Clemson University",
    linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
    githubLink: "https://github.com/IstiqlalBhat",
    email: "istiqlal1234@gmail.com",
    phoneNumber: "(864)-765-7973",
    profilePicture: { url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" } // Placeholder
  };

  try {
    const data = await datoCMSClient.request(GET_CONTACT_ME);
    if (data.contactMe) {
      return data.contactMe;
    }
    return hardcodedContact;
  } catch (error) {
    return hardcodedContact;
  }
}
