
import datoCMSClient from './datoCMSClient';
import { hardcodedGalleryItems } from '../data/mockData';

const GET_GALLERY_ITEMS = `
  query {
    allGalleryItems(orderBy: position_ASC) {
      id
      title
      category
      year
      image {
        url
      }
      video {
        mux: video {
          streamingUrl
          thumbnailUrl
          mp4Url
          duration
          width
          height
        }
      }
      aspect
      size
    }
  }
`;

export async function getGalleryItems() {
    try {
        const data = await datoCMSClient.request(GET_GALLERY_ITEMS);

        // If CMS data exists, map it to match our component's expected structure if needed.
        // Assuming CMS returns fields matching our props, but we might need to map 'image.url' to 'src'.
        const cmsItems = data.allGalleryItems?.map(item => {
            const muxData = item.video?.mux;
            return {
                ...item,
                src: item.image?.url, // Map nested image url to src
                // Map video fields for HLS streaming (Asset -> video -> muxFields)
                isVideo: !!muxData?.streamingUrl,
                videoUrl: muxData?.streamingUrl || muxData?.mp4Url,
                videoPoster: muxData?.thumbnailUrl,
                videoDuration: muxData?.duration,
            };
        }) || [];

        console.log("MAPPED_ITEMS", cmsItems);

        // Return CMS items if available, otherwise fallback.
        // Or if you want to mix them, you can merge. But typically we want CMS to override.
        // If CMS returns empty array (but successful), we might want to show nothing or fallback?
        // Usually if CMS is connected but empty, we show empty. But for this portfolio, fallback to hardcoded if empty makes sense for demo.
        return cmsItems.length > 0 ? cmsItems : hardcodedGalleryItems;
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return hardcodedGalleryItems;
    }
}
