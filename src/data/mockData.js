export const hardcodedGalleryItems = [
    {
        id: '01',
        title: 'Concrete Dreams',
        category: 'Architecture',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
        aspect: 'landscape',
        size: 'large',
    },
    {
        id: '02',
        title: 'Void State',
        category: 'Abstract',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1000&auto=format&fit=crop',
        aspect: 'square',
        size: 'medium',
    },
    {
        id: '03',
        title: 'Lumina',
        category: 'Light Study',
        year: '2023',
        src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
        aspect: 'portrait',
        size: 'medium',
    },
    {
        id: '04',
        title: 'Noir Étude',
        category: 'Editorial',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        aspect: 'portrait',
        size: 'large',
    },
    {
        id: '05',
        title: 'Chromatic',
        category: 'Experimental',
        year: '2023',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
        aspect: 'landscape',
        size: 'medium',
    },
    {
        id: '06',
        title: 'Structure IX',
        category: 'Geometry',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop',
        aspect: 'square',
        size: 'small',
    },
    {
        id: '07',
        title: 'Silhouette',
        category: 'Portrait',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        aspect: 'portrait',
        size: 'medium',
    },
    {
        id: '08',
        title: 'Meridian',
        category: 'Landscape',
        year: '2023',
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop',
        aspect: 'landscape',
        size: 'large',
    },
];

export const hardcodedProjects = [
    {
        title: "Full Circle Cafe - Scrollytelling",
        description: "A stunning, scroll-driven animated website for Full Circle Cafe featuring wood-fired pizza. Built with Next.js 16, Framer Motion, and Tailwind CSS.",
        techUsed: "Next.js 16, Tailwind CSS, Framer Motion, TypeScript",
        image: { url: "https://picsum.photos/seed/scrollytelling/300/200" },
        link: "https://scrollytelling.vercel.app",
        github: "https://github.com/IstiqlalBhat/scrollytelling"
    },
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

export const hardcodedSkills = [
    // Programming Languages
    { name: "Python", category: "Programming Languages", description: "Language", icon: "FaPython" },
    { name: "JavaScript", category: "Programming Languages", description: "Language", icon: "SiJavascript" },
    { name: "TypeScript", category: "Programming Languages", description: "Language", icon: "SiTypescript" },
    { name: "Java", category: "Programming Languages", description: "Language", icon: "FaJava" },
    { name: "C++", category: "Programming Languages", description: "Language", icon: "SiCplusplus" },
    { name: "SQL", category: "Programming Languages", description: "Query Language", icon: "" },
    { name: "Solidity", category: "Programming Languages", description: "Smart Contracts", icon: "SiSolidity" },
    // Frontend
    { name: "React", category: "Frontend", description: "Library", icon: "FaReact" },
    { name: "Next.js", category: "Frontend", description: "Framework", icon: "SiNextdotjs" },
    { name: "HTML/CSS", category: "Frontend", description: "Markup & Styling", icon: "SiHtml5" },
    { name: "Tailwind CSS", category: "Frontend", description: "CSS Framework", icon: "SiTailwindcss" },
    // Backend
    { name: "FastAPI", category: "Backend", description: "Framework", icon: "SiFastapi" },
    { name: "Node.js", category: "Backend", description: "Runtime", icon: "FaNodeJs" },
    { name: "Pydantic", category: "Backend", description: "Validation", icon: "FaPython" },
    // Databases & Storage
    { name: "PostgreSQL", category: "Databases & Storage", description: "Database", icon: "SiPostgresql" },
    { name: "Redis", category: "Databases & Storage", description: "In-memory Store", icon: "SiRedis" },
    { name: "Pinecone", category: "Databases & Storage", description: "Vector Database", icon: "" },
    { name: "FAISS", category: "Databases & Storage", description: "Vector Search", icon: "" },
    // AI/ML Frameworks
    { name: "PyTorch", category: "AI/ML Frameworks", description: "Deep Learning", icon: "SiPytorch" },
    { name: "LangChain", category: "AI/ML Frameworks", description: "LLM Framework", icon: "" },
    { name: "LangGraph", category: "AI/ML Frameworks", description: "Agent Framework", icon: "" },
    { name: "HuggingFace", category: "AI/ML Frameworks", description: "ML Hub", icon: "" },
    { name: "spaCy", category: "AI/ML Frameworks", description: "NLP Library", icon: "" },
    { name: "NLTK", category: "AI/ML Frameworks", description: "NLP Toolkit", icon: "" },
    { name: "NetworkX", category: "AI/ML Frameworks", description: "Graph Library", icon: "" },
    // AI Models & Techniques
    { name: "Claude", category: "AI Models & Techniques", description: "LLM", icon: "" },
    { name: "GPT-4", category: "AI Models & Techniques", description: "LLM", icon: "SiOpenai" },
    { name: "Gemini", category: "AI Models & Techniques", description: "LLM", icon: "" },
    { name: "RAG", category: "AI Models & Techniques", description: "Retrieval", icon: "" },
    { name: "Prompt Engineering", category: "AI Models & Techniques", description: "Technique", icon: "" },
    { name: "NLP", category: "AI Models & Techniques", description: "Field", icon: "" },
    { name: "Semantic Search", category: "AI Models & Techniques", description: "Technique", icon: "" },
    { name: "Text Processing", category: "AI Models & Techniques", description: "Technique", icon: "" },
    { name: "Document Extraction", category: "AI Models & Techniques", description: "Technique", icon: "" },
    { name: "Knowledge Graph Construction", category: "AI Models & Techniques", description: "Technique", icon: "" },
    // Blockchain/Web3
    { name: "Solidity", category: "Blockchain/Web3", description: "Language", icon: "SiSolidity" },
    { name: "Web3.js", category: "Blockchain/Web3", description: "Library", icon: "" },
    { name: "ethers.js", category: "Blockchain/Web3", description: "Library", icon: "" },
    { name: "Hardhat", category: "Blockchain/Web3", description: "Dev Framework", icon: "" },
    // DevOps
    { name: "Docker", category: "DevOps", description: "Containerization", icon: "FaDocker" },
    { name: "Git", category: "DevOps", description: "Version Control", icon: "FaGitAlt" },
    { name: "Multi-container Orchestration", category: "DevOps", description: "Infrastructure", icon: "" },
    // Practices & Patterns
    { name: "Agile/Scrum", category: "Practices & Patterns", description: "Methodology", icon: "" },
    { name: "Rapid MVP Development", category: "Practices & Patterns", description: "Approach", icon: "" },
    { name: "AI Prototyping", category: "Practices & Patterns", description: "Approach", icon: "" },
    { name: "Full-Stack Development", category: "Practices & Patterns", description: "Discipline", icon: "" },
    { name: "Blockchain Development", category: "Practices & Patterns", description: "Discipline", icon: "" },
    { name: "Workflow Orchestration", category: "Practices & Patterns", description: "Pattern", icon: "" },
    { name: "Schema Validation", category: "Practices & Patterns", description: "Pattern", icon: "" },
    { name: "Response Caching", category: "Practices & Patterns", description: "Pattern", icon: "" },
    { name: "Rate Limiting", category: "Practices & Patterns", description: "Pattern", icon: "" },
    // Tools & IDEs
    { name: "VS Code", category: "Tools & IDEs", description: "Editor", icon: "VscCode" },
    { name: "Cursor IDE", category: "Tools & IDEs", description: "AI Editor", icon: "" },
    { name: "IntelliJ", category: "Tools & IDEs", description: "IDE", icon: "SiIntellijidea" },
    { name: "Jupyter", category: "Tools & IDEs", description: "Notebook", icon: "SiJupyter" },
    { name: "Figma", category: "Tools & IDEs", description: "Design", icon: "SiFigma" },
    { name: "Framer", category: "Tools & IDEs", description: "Design", icon: "SiFramer" }
];

export const hardcodedTimeline = [
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

export const hardcodedPapers = [
    {
        title: "Artificial intelligence- and blockchain-enabled carbon emissions ledger system (AB-CELS) for sustainable construction processes",
        journal: "Automation in Construction",
        year: "2025",
        link: "https://doi.org/10.1016/j.autcon.2025.106286",
        citation: "Aurangzeb, I., & Yoon, J. H. (2025). Artificial intelligence- and blockchain-enabled carbon emissions ledger system (AB-CELS) for sustainable construction processes. Automation in Construction, 171, Article 105987."
    },
    {
        title: "BIM- and blockchain-enabled Automatic Procurement System (BBAPS) removing relationship bias",
        journal: "Automation in Construction",
        year: "2024",
        link: "https://doi.org/10.1016/j.autcon.2024.105779",
        citation: "Yoon, J. H., Aurangzeb, I., & McNamara, S. (2024). BIM- and blockchain-enabled automatic procurement system (BBAPS) removing relationship bias. Automation in Construction, 168(A), Article 105779."
    }
];

export const hardcodedBanner = {
    headline: "Istiqlal Aurangzeb",
    profileSummary: ` Software Developer at Clemson University.`,
    linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
    resumeLink: { url: "#" },
    backgroundImage: { url: "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" }
};

export const hardcodedContact = {
    name: "Istiqlal Aurangzeb",
    title: "Software Developer",
    summary: "Full-stack developer and researcher specializing in Blockchain, AI, and Software Engineering.",
    companyUniversity: "Clemson University",
    linkedinLink: "https://www.linkedin.com/in/istiqlalbhat/",
    githubLink: "https://github.com/IstiqlalBhat",
    email: "istiqlal1234@gmail.com",
    phoneNumber: "(864)-765-7973",
    profilePicture: { url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" }
};

export const hardcodedPermit = {
    visaStatus: "F1 OPT",
    expiryDate: "2027-01-31",
    summary: "Authorized to work in the US",
    additionalInfo: "Eligible for STEM OPT extension. Open to H1B sponsorship."
};
