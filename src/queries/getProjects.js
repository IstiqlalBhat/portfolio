// queries/getProjects.js
import datoCMSClient from './datoCMSClient';

const GET_PROJECTS = `
  query {
    allProjects(orderBy: title_ASC) {
      title
      description
      techUsed
      image {
        url
      }
    }
  }
`;

export async function getProjects() {
    try {
        // const data = await datoCMSClient.request(GET_PROJECTS);
        // return data.allProjects;
        throw new Error("Using mock data");
    } catch (error) {
        return [
            {
                title: "My Graduation Story - Van Gogh Style",
                description: "An immersive 3D web experience recounting my graduation journey through the lens of Van Gogh's art style.",
                techUsed: "Three.js, React, WebGL, Vite",
                image: { url: "https://picsum.photos/seed/vangogh/300/200" },
                link: "https://van-gogh-three.vercel.app/",
                github: "https://github.com/IstiqlalBhat/van-gogh"
            },
            {
                title: "My Arsenal vs The Show ⚾",
                description: "A full-stack baseball pitch tracking platform that compares your pitches against real MLB Statcast data, powered by AI coaching.",
                techUsed: "Next.js, TypeScript, Supabase, Firebase, Gemini AI",
                image: { url: "https://picsum.photos/seed/baseball/300/200" },
                link: "https://maven-project-eta.vercel.app/",
                github: "https://github.com/IstiqlalBhat/maven-project"
            },
            {
                title: "XR Magic",
                description: "Gesture-controlled particle system using Three.js and MediaPipe.",
                techUsed: "Three.js, MediaPipe, WebGL",
                image: { url: "https://picsum.photos/seed/xr/300/200" },
                link: "https://xrmagic.vercel.app/",
                github: "https://github.com/IstiqlalBhat/XR"
            },
            {
                title: "Toby Watch (Aria)",
                description: "AI-powered smartwatch using Arduino Uno R4 WiFi and GPT-4o-mini.",
                techUsed: "Arduino, OpenAI, Firebase",
                image: { url: "https://picsum.photos/seed/watch/300/200" },
                link: "https://tobywatch.vercel.app/",
                github: "https://github.com/IstiqlalBhat/Arduino"
            },
            {
                title: "Mayor Quiz Game",
                description: "Browser-based application with vanilla JavaScript and Node.js/Express backend.",
                techUsed: "Vanilla JS, HTML5, CSS3, Node.js",
                image: { url: "https://picsum.photos/seed/game/300/200" },
                link: "https://mayormane.vercel.app/",
                github: "https://github.com/IstiqlalBhat/mayor-quiz-game"
            },
            {
                title: "LLM on Autonomous Vehicles",
                description: "Security pipeline to detect adversarial attacks on traffic signs using LMMs.",
                techUsed: "GPT-4o, LLaVA, Python",
                image: { url: "https://picsum.photos/seed/car/300/200" }
            },
            {
                title: "Pizza Management System",
                description: "Java-based pizza ordering system with MySQL backend.",
                techUsed: "Java, MySQL, AWS",
                image: { url: "https://picsum.photos/seed/pizza/300/200" }
            },
            {
                title: "Detecting Rude Tweets",
                description: "Web application to flag hate speech in tweets.",
                techUsed: "Web Development, NLP",
                image: { url: "https://picsum.photos/seed/twitter/300/200" }
            }
        ];
    }
}
