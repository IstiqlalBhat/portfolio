import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs, FaImages } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiTypescript, SiSupabase, SiVite } from 'react-icons/si';
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
    'Next.js': <FaReact />,
    'Gatsby': <FaReact />,
    'Nuxt.js': <FaVuejs />,
    'Redux': <FaReact />,
    'Vuex': <FaVuejs />,
    'Tailwind CSS': <SiCss3 />,
    'Bootstrap': <SiCss3 />,
    'JQuery': <SiJquery />,
    'TypeScript': <SiTypescript />,
    'Supabase': <SiSupabase />,
    'Vite': <SiVite />,
    'Gemini AI': <FaGoogle />,
    'Three.js': <SiHtml5 />, // Fallback or use a specific one if available, simplified for now
    'WebGL': <SiHtml5 />,
};

const pptImages = [
    '/ppt/1.png', '/ppt/2.png', '/ppt/3.png', '/ppt/4.png',
    '/ppt/5.png', '/ppt/6.png', '/ppt/7.png', '/ppt/8.png',
    '/ppt/9.png', '/ppt/10.png', '/ppt/11.png', '/ppt/12.png'
];

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
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card"
                        style={{ '--delay': `${index * 0.1}s` }}
                    >
                        <img
                            src={project.image.url}
                            alt={project.title}
                            className="project-image"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="project-details">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-used">
                                {project.techUsed.split(', ').map((tech, i) => (
                                    <span key={i} className="tech-badge">
                                        {techIcons[tech] || "🔧"} {tech}
                                    </span>
                                ))}
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
                ))}
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
