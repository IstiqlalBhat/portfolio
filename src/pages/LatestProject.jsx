import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiTypescript, SiSupabase, SiVite, SiFramer, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import { getFeatured } from '../queries/getFeatured';
import { GrDeploy, GrKubernetes } from "react-icons/gr";

const techIcons = {
    "ReactJS": <FaReact />,
    "React": <FaReact />,
    "NodeJS": <FaNodeJs />,
    "Node.js": <FaNodeJs />,
    "AWS": <FaAws />,
    "PostgreSQL": <SiPostgresql />,
    "MongoDB": <SiMongodb />,
    "Ruby On Rails": <SiRubyonrails />,
    "Material UI": <SiMaterialdesign />,
    "HTML5": <SiHtml5 />,
    "CSS3": <SiCss3 />,
    "jQuery": <SiJquery />,
    "JQuery": <SiJquery />,
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
    'Express.js': <FaNodeJs />,
    'Hibernate': <FaJava />,
    'Maven': <FaJava />,
    'Gradle': <FaJava />,
    'JUnit': <FaJava />,
    'Mockito': <FaJava />,
    'Jest': <FaReact />,
    'Angular': <FaAngular />,
    'Vue.js': <FaVuejs />,
    'Next.js': <SiNextdotjs />,
    'Gatsby': <FaReact />,
    'Nuxt.js': <FaVuejs />,
    'Redux': <FaReact />,
    'Vuex': <FaVuejs />,
    'Tailwind CSS': <SiTailwindcss />,
    'Bootstrap': <SiCss3 />,
    'TypeScript': <SiTypescript />,
    'Supabase': <SiSupabase />,
    'Vite': <SiVite />,
    'Gemini AI': <FaGoogle />,
    'Three.js': <SiHtml5 />,
    'WebGL': <SiHtml5 />,
    'Framer Motion': <SiFramer />,
};

const normalizeTechUsed = (techUsed) => {
    if (Array.isArray(techUsed)) {
        return techUsed
            .map((item) => String(item).trim())
            .filter(Boolean);
    }
    if (typeof techUsed === 'string') {
        return techUsed
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
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

const LatestProject = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const data = await getFeatured();
                setFeaturedItems(data);
            } catch (error) {
                console.error("Error fetching featured:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFeatured();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!featuredItems || featuredItems.length === 0) return <div>No featured items found.</div>;

    const primaryFeatured = featuredItems[0];
    const otherFeatured = featuredItems.slice(1);

    const primaryImageUrl = getProjectImageUrl(primaryFeatured.image) || '/assets/project_tech_bg.png';
    const primaryTechList = normalizeTechUsed(primaryFeatured.techUsed);

    return (
        <div className="projects-container">
            <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Featured</h2>

            {/* Primary Featured Item - Larger Display */}
            <div className="projects-grid" style={{ justifyContent: 'center', display: 'flex', marginBottom: '40px' }}>
                <div
                    className="project-card"
                    style={{ '--delay': '0s', maxWidth: '700px', width: '100%' }}
                >
                    <img
                        src={primaryImageUrl}
                        alt={primaryFeatured.title}
                        className="project-image"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="project-details">
                        <h3>{primaryFeatured.title}</h3>
                        <p>{primaryFeatured.description}</p>
                        <div className="tech-used">
                            {primaryTechList.map((tech, i) => (
                                <span key={i} className="tech-badge">
                                    {techIcons[tech]} {tech}
                                </span>
                            ))}
                        </div>
                        <div className="project-links">
                            {primaryFeatured.link && (
                                <a href={primaryFeatured.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                    Live Demo
                                </a>
                            )}
                            {primaryFeatured.github && (
                                <a href={primaryFeatured.github} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
                                    <FaGithub /> GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Featured Items */}
            {otherFeatured.length > 0 && (
                <>
                    <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>More Featured Work</h3>
                    <div className="projects-grid">
                        {otherFeatured.map((project, index) => {
                            const imageUrl = getProjectImageUrl(project.image) || '/assets/project_tech_bg.png';
                            const techList = normalizeTechUsed(project.techUsed);
                            return (
                                <div
                                    key={project.id || index}
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
                                            {techList.map((tech, i) => (
                                                <span key={i} className="tech-badge">
                                                    {techIcons[tech]} {tech}
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
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default LatestProject;
