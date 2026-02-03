// queries/getFeatured.js
import datoCMSClient from './datoCMSClient';
import { hardcodedFeatured } from '../data/mockData';

const GET_FEATURED = `
  query {
    allFeatured(orderBy: sort_order_ASC) {
      id
      title
      description
      techUsed: tech_used
      image {
        url
      }
      link
      github
      sortOrder: sort_order
    }
  }
`;

export async function getFeatured() {
    try {
        console.log("Fetching featured from DatoCMS...");
        const data = await datoCMSClient.request(GET_FEATURED);
        console.log("DatoCMS response:", JSON.stringify(data, null, 2));
        // If CMS has data, use it; otherwise fall back to hardcoded
        if (data.allFeatured && data.allFeatured.length > 0) {
            console.log("Using CMS data:", data.allFeatured.length, "items");
            return data.allFeatured;
        }
        console.log("No CMS data found, using hardcoded fallback");
        return hardcodedFeatured;
    } catch (error) {
        console.error("Error fetching featured items:", error);
        console.error("Full error details:", JSON.stringify(error, null, 2));
        return hardcodedFeatured;
    }
}

// Get just the primary featured item (first one by position)
export async function getPrimaryFeatured() {
    const featured = await getFeatured();
    return featured.length > 0 ? featured[0] : null;
}
