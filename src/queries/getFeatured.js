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
        console.log("[Featured] Trying collection query...");
        const data = await datoCMSClient.request(GET_FEATURED_COLLECTION);
        console.log("[Featured] Collection response:", JSON.stringify(data, null, 2));
        if (data.allFeatured && data.allFeatured.length > 0) {
            return data.allFeatured;
        }
        console.log("[Featured] Collection returned empty");
    } catch (collectionError) {
        console.error("[Featured] Collection error:", collectionError.message || collectionError);
        // Try singleton query
        try {
            console.log("[Featured] Trying singleton query...");
            const data = await datoCMSClient.request(GET_FEATURED_SINGLETON);
            console.log("[Featured] Singleton response:", JSON.stringify(data, null, 2));
            if (data.featured) {
                return [data.featured];
            }
        } catch (singletonError) {
            console.error("[Featured] Singleton error:", singletonError.message || singletonError);
        }
    }

    console.log("[Featured] Using hardcoded fallback");
    return hardcodedFeatured;
}

// Get just the primary featured item (first one by position)
export async function getPrimaryFeatured() {
    const featured = await getFeatured();
    return featured.length > 0 ? featured[0] : null;
}
