// queries/getFeatured.js
import datoCMSClient from './datoCMSClient';
import { hardcodedFeatured } from '../data/mockData';

// Try collection query first, then singleton
const GET_FEATURED_COLLECTION = `
  query {
    allFeatured {
      id
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

const GET_FEATURED_SINGLETON = `
  query {
    featured {
      id
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

export async function getFeatured() {
    // Try collection query first
    try {
        const data = await datoCMSClient.request(GET_FEATURED_COLLECTION);
        if (data.allFeatured && data.allFeatured.length > 0) {
            return data.allFeatured;
        }
    } catch (collectionError) {
        // Try singleton query
        try {
            const data = await datoCMSClient.request(GET_FEATURED_SINGLETON);
            if (data.featured) {
                return [data.featured];
            }
        } catch (singletonError) {
            // Both queries failed, fall through to hardcoded
        }
    }

    return hardcodedFeatured;
}

// Get just the primary featured item (first one by position)
export async function getPrimaryFeatured() {
    const featured = await getFeatured();
    return featured.length > 0 ? featured[0] : null;
}
