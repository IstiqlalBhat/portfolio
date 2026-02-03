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
      techUsed: tech_used
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
      techUsed: tech_used
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
        console.log("Fetching featured (collection) from DatoCMS...");
        const data = await datoCMSClient.request(GET_FEATURED_COLLECTION);
        console.log("DatoCMS collection response:", JSON.stringify(data, null, 2));
        if (data.allFeatured && data.allFeatured.length > 0) {
            console.log("Using CMS collection data:", data.allFeatured.length, "items");
            return data.allFeatured;
        }
    } catch (collectionError) {
        console.log("Collection query failed, trying singleton...");

        // Try singleton query
        try {
            const data = await datoCMSClient.request(GET_FEATURED_SINGLETON);
            console.log("DatoCMS singleton response:", JSON.stringify(data, null, 2));
            if (data.featured) {
                console.log("Using CMS singleton data");
                return [data.featured]; // Wrap in array for consistency
            }
        } catch (singletonError) {
            console.error("Both queries failed:", singletonError);
        }
    }

    console.log("No CMS data found, using hardcoded fallback");
    return hardcodedFeatured;
}

// Get just the primary featured item (first one by position)
export async function getPrimaryFeatured() {
    const featured = await getFeatured();
    return featured.length > 0 ? featured[0] : null;
}
