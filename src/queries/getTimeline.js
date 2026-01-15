// queries/getTimeline.js
import datoCMSClient from './datoCMSClient';

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
        // const data = await datoCMSClient.request(GET_TIMELINE);
        // return data.allTimelines;
        throw new Error("Using mock data");
    } catch (error) {
        return [
            {
                name: "Clemson University",
                timelineType: "work",
                title: "Software Developer",
                techStack: "Solidity, Python, React, AWS",
                summaryPoints: "Led full-stack development of prototypes. Architected smart contracts. Built Web3 micro-services.",
                dateRange: "Feb 2024 -- Present"
            },
            {
                name: "IGNITE Club, Sri Venkateswara University",
                timelineType: "work",
                title: "Chief Operating Officer",
                techStack: "Management, Strategy",
                summaryPoints: "Directed strategy and operations. Mentored student teams. Built partnerships.",
                dateRange: "Aug 2021 -- July 2023"
            },
            {
                name: "Clemson University",
                timelineType: "education",
                title: "Master of Science in Computer Science",
                techStack: "GPA: 3.59/4.0",
                summaryPoints: "Specializing in CS.",
                dateRange: "December 2025"
            },
            {
                name: "Sri Venkateswara University",
                timelineType: "education",
                title: "Bachelor of Technology in CSE",
                techStack: "",
                summaryPoints: "Undergraduate studies.",
                dateRange: "May 2023"
            }
        ];
    }
}
