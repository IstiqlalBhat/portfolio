
import datoCMSClient from './datoCMSClient.js';

const INTROSPECTION_QUERY = `
  query {
    __type(name: "GalleryItemRecord") {
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

async function inspect() {
    try {
        const data = await datoCMSClient.request(INTROSPECTION_QUERY);
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

inspect();
