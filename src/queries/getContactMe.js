// queries/getContactMe.js
import datoCMSClient from './datoCMSClient';

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
  try {
    // const data = await datoCMSClient.request(GET_CONTACT_ME);
    // return data.contactMe;
    throw new Error("Using mock data");
  } catch (error) {
    return {
      name: "Istiqlal Aurangzeb",
      title: "Graduate Research Assistant – Software Engineer",
      summary: "Full-stack developer and researcher specializing in Blockchain, AI, and Software Engineering.",
      companyUniversity: "Clemson University",
      linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
      githubLink: "https://github.com/IstiqlalBhat",
      email: "istiqlal1234@gmail.com",
      phoneNumber: "(864)-765-7973",
      profilePicture: { url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" } // Placeholder
    };
  }
}
