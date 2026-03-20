import React, { useEffect, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';
import { hardcodedSkills } from '../data/mockData';

import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaJava, FaPython } from 'react-icons/fa';
import {
    SiTypescript, SiJavascript, SiPostgresql, SiMysql, SiCplusplus,
    SiSolidity, SiNextdotjs, SiTailwindcss, SiFastapi, SiRedis,
    SiPytorch, SiOpenai, SiIntellijidea,
    SiJupyter, SiFigma, SiFramer, SiHtml5, SiCss3
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const iconMap = {
    FaPython: <FaPython />,
    SiJavascript: <SiJavascript />,
    SiTypescript: <SiTypescript />,
    FaJava: <FaJava />,
    SiCplusplus: <SiCplusplus />,
    SiSolidity: <SiSolidity />,
    FaReact: <FaReact />,
    SiNextdotjs: <SiNextdotjs />,
    SiHtml5: <SiHtml5 />,
    SiTailwindcss: <SiTailwindcss />,
    SiFastapi: <SiFastapi />,
    FaNodeJs: <FaNodeJs />,
    SiPostgresql: <SiPostgresql />,
    SiMysql: <SiMysql />,
    SiRedis: <SiRedis />,
    SiPytorch: <SiPytorch />,
    SiOpenai: <SiOpenai />,
    FaDocker: <FaDocker />,
    FaGitAlt: <FaGitAlt />,
    VscCode: <VscCode />,
    SiIntellijidea: <SiIntellijidea />,
    SiJupyter: <SiJupyter />,
    SiFigma: <SiFigma />,
    SiFramer: <SiFramer />,
    FaAws: <FaAws />,
};


const Skills = () => {

    const [skillsData, setSkillsData] = useState(hardcodedSkills);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const data = await getSkills();
                setSkillsData(data);
            } catch (error) {
            }
        }

        fetchSkills()
    }, []);

    const skillsByCategory = skillsData.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});


    return (
        <div className="skills-container">
            <div className="skills-copy">
                <h1 className="skills-title">Technical Skills</h1>
                <p className="skills-intro">
                    Languages, frameworks, AI tooling, and engineering systems used by Istiqlal Aurangzeb across research software and product development.
                </p>
            </div>
            {Object.keys(skillsByCategory).map((category, index) => (
                <div key={index} className="skill-category">
                    <h3 className="category-title">{category}</h3>
                    <div className="skills-grid">
                        {skillsByCategory[category].map((skill, idx) => (
                            <div key={idx} className="skill-card">
                                <div className="icon">{iconMap[skill.icon] || <FaReact />}</div>
                                <h3 className="skill-name">{skill.name}</h3>
                                <p className="skill-description">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;
