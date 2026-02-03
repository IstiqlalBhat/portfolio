import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs, FaImages, FaCode } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiTypescript, SiSupabase, SiVite, SiFastapi, SiNextdotjs, SiTailwindcss, SiThreedotjs, SiGooglegemini, SiShadcnui, SiFramer } from 'react-icons/si';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";
import ShowcaseModal from '../components/ShowcaseModal';

const techIcons = {
    "ReactJS": <FaReact />,
    "NodeJS": <FaNodeJs />,
    "AWS": <FaAws />,
    "PostgreSQL": <SiPostgresql />,
    "MongoDB": <SiMongodb />,
    "Ruby On Rails": <SiRubyonrails />,
    "Material UI": <SiMaterialdesign />,
    "HTML5": <SiHtml5 />,
    "CSS3": <SiCss3 />,
    "jQuery": <SiJquery />,
    "AWS-ECS": <SiAwsamplify />,
    'Cognito': <FaAws />,
    'Lambda': <FaAws />,
    'ECS': <FaAws />,
    'Jenkins': <FaJenkins />,
    'Docker': <FaDocker />,
    'GraphQL': <FaDatabase />,
    'CI/CD': <FaGitlab />,
    'GitLab': <FaGitlab />,
    'GitHub': <FaGithub />,
    'Heroku': <GrDeploy />,
    'Netlify': <GrDeploy />,
    'Firebase': <SiFirebase />,
    'GCP': <FaGoogle />,
    'Azure': <FaMicrosoft />,
    'Kubernetes': <GrKubernetes />,
    'Terraform': <SiTerraform />,
    'ArgoCD': <SiArgo />,
    'Java': <FaJava />,
    'Spring Boot': <FaJava />,
    'Python': <FaPython />,
    'Node.js': <FaNodeJs />,
    'Express.js': <FaNodeJs />,
    'Hibernate': <FaJava />,
    'Maven': <FaJava />,
    'Gradle': <FaJava />,
    'JUnit': <FaJava />,
    'Mockito': <FaJava />,
    'Jest': <FaReact />,
    'React': <FaReact />,
    'Angular': <FaAngular />,
    'Vue.js': <FaVuejs />,
    'Next.js': <SiNextdotjs />,
    'Gatsby': <FaReact />,
    'Nuxt.js': <FaVuejs />,
    'Redux': <FaReact />,
    'Vuex': <FaVuejs />,
    'Tailwind CSS': <SiTailwindcss />,
    'Bootstrap': <SiCss3 />,
    'JQuery': <SiJquery />,
    'TypeScript': <SiTypescript />,
    'Supabase': <SiSupabase />,
    'Vite': <SiVite />,
    'FastAPI': <SiFastapi />,
    'Gemini AI': <SiGooglegemini />,
    'Google Gemini AI': <SiGooglegemini />,
    'Three.js': <SiThreedotjs />,
    'Shadcn/ui': <SiShadcnui />,
    'WebGL': <SiHtml5 />,
    'Framer Motion': <SiFramer />,
};

const pptImages = [
    '/ppt/1.png', '/ppt/2.png', '/ppt/3.png', '/ppt/4.png',
    '/ppt/5.png', '/ppt/6.png', '/ppt/7.png', '/ppt/8.png',
    '/ppt/9.png', '/ppt/10.png', '/ppt/11.png', '/ppt/12.png'
];

const techLabels = Object.keys(techIcons).sort((a, b) => b.length - a.length);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const cleanTechToken = (token) => token.replace(/^[\s+/-]+|[\s+/-]+$/g, '').trim();

const splitCompoundTech = (token) => {
    const matches = [];

    for (const label of techLabels) {
        const pattern = new RegExp(`${escapeRegExp(label)}(?:\\s*v?\\d+(?:\\.\\d+)?)?`, 'gi');
        let match = pattern.exec(token);
        while (match) {
            matches.push({
                start: match.index,
                end: match.index + match[0].length,
                value: match[0].trim(),
                length: match[0].length,
            });
            match = pattern.exec(token);
        }
    }

    if (matches.length === 0) {
        return [token];
    }

    matches.sort((a, b) => a.start - b.start || b.length - a.length);

    const resolved = [];
    let lastEnd = -1;
    for (const match of matches) {
        if (match.start >= lastEnd) {
            resolved.push(match);
            lastEnd = match.end;
        }
    }

    const parts = [];
    let cursor = 0;
    for (const match of resolved) {
        const between = cleanTechToken(token.slice(cursor, match.start));
        if (between) parts.push(between);
        parts.push(match.value.trim());
        cursor = match.end;
    }
    const tail = cleanTechToken(token.slice(cursor));
    if (tail) parts.push(tail);
    return parts;
};

const normalizeTechUsed = (techUsed) => {
    let rawParts = [];
    if (Array.isArray(techUsed)) {
        rawParts = techUsed
            .map((item) => String(item).trim())
            .filter(Boolean);
    }
    if (typeof techUsed === 'string') {
        const cleaned = techUsed
            .replace(/[\u{1F300}-\u{1FAFF}]/gu, ',')
            .replace(/\s+/g, ' ')
            .trim();
        rawParts = cleaned
            .split(/[,\n|;\u2022\u00b7]+/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (rawParts.length === 0) {
        return [];
    }

    return rawParts
        .flatMap((part) => splitCompoundTech(part))
        .map((part) => cleanTechToken(part))
        .filter(Boolean);
};

const getProjectImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (Array.isArray(image)) {
        const firstImage = image.find(Boolean);
        if (!firstImage) return '';
        if (typeof firstImage === 'string') return firstImage;
        return firstImage.url || firstImage.src || '';
    }
    return image.url || image.src || '';
};

const getTechIcon = (tech) => {
    const rawTech = String(tech || '').trim();
    if (!rawTech) return null;
    const withoutVersion = rawTech.replace(/\s*v?\d+(\.\d+)?$/i, '');
    return techIcons[rawTech] || techIcons[withoutVersion] || <FaCode />;
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }

        fetchProjects()
    }, [])

    const openShowcase = (project) => {
        setSelectedProject(project);
        setIsShowcaseOpen(true);
    };

    if (projects.length === 0) return <div>Loading...</div>;

    return (
        <div className="projects-container">
            <div className="projects-grid">
                {projects.map((project, index) => {
                    const imageUrl = getProjectImageUrl(project.image) || '/assets/project_tech_bg.png';
                    const techList = normalizeTechUsed(project.techUsed);

                    return (
                        <div
                            key={index}
                            className="project-card"
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <img
                                src={imageUrl}
                                alt={project.title}
                                className="project-image"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="project-details">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="tech-used">
                                    {techList.map((tech, i) => {
                                        const icon = getTechIcon(tech);
                                        return (
                                            <span key={i} className="tech-badge">
                                                {icon && <span className="tech-icon">{icon}</span>}
                                                <span className="tech-label">{tech}</span>
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="project-links">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
                                            <FaGithub /> GitHub
                                        </a>
                                    )}

                                    {project.link && project.link.includes('maven-project') && (
                                        <button
                                            className="project-link-btn showcase-btn"
                                            onClick={() => openShowcase(project)}
                                            style={{
                                                background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                                border: 'none',
                                                fontSize: '0.8rem',
                                                padding: '6px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <FaImages /> Showcase
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ShowcaseModal
                isOpen={isShowcaseOpen}
                onClose={() => setIsShowcaseOpen(false)}
                images={pptImages}
                title={selectedProject?.title || "Project"}
            />
        </div>
    );
};

export default Projects;
