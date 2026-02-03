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
        const data = await datoCMSClient.request(GET_FEATURED);
        // If CMS has data, use it; otherwise fall back to hardcoded
        if (data.allFeatured && data.allFeatured.length > 0) {
            return data.allFeatured;
        }
        return hardcodedFeatured;
    } catch (error) {
        console.error("Error fetching featured items:", error);
        return hardcodedFeatured;
    }
}

// Get just the primary featured item (first one by position)
export async function getPrimaryFeatured() {
    const featured = await getFeatured();
    return featured.length > 0 ? featured[0] : null;
}
