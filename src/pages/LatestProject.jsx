import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiTypescript, SiSupabase, SiVite } from 'react-icons/si';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";

// Helper for icons (duplicated from Projects.jsx for now to keep it self-contained or could be moved to util)
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
    'Three.js': <SiHtml5 />,
    'WebGL': <SiHtml5 />,
};


const LatestProject = () => {
    const [project, setProject] = useState(null)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await getProjects();
                // Filter for Scrollytelling project
                const latest = data.find(p => p.title.includes("Scrollytelling"));
                setProject(latest);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        fetchProject()
    }, [])

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found.</div>;

    return (
        <div className="projects-container">
            <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Latest Project</h2>
            <div className="projects-grid" style={{ justifyContent: 'center', display: 'flex' }}>
                <div
                    className="project-card"
                    style={{ '--delay': `0s`, maxWidth: '600px', width: '100%' }} // Expanded view for single project
                >
                    <img
                        src={project.image.url}
                        alt={project.title}
                        className="project-image"
                        loading="eager"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProject;
