// queries/getTimeline.js
import datoCMSClient from './datoCMSClient';
import { hardcodedTimeline } from '../data/mockData';

const GET_TIMELINE = `
{
  allTimelines {
   	name
    timelineType
    title
    techStack
    summaryPoints
    dateRange
  }
}
`;


export async function getTimeline() {
    try {
        const data = await datoCMSClient.request(GET_TIMELINE);
        return [...(data.allTimelines || []), ...hardcodedTimeline];
    } catch (error) {
        return hardcodedTimeline;
    }
}
