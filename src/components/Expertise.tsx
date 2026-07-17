import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faNodeJs, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
// import '../styles/Expertise.scss';

const labelsFirst = [
    "React.js",
    "Next.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "jQuery"
];

const labelsSecond = [
    "Node.js",
    "Express.js",
    ".NET",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Firebase",
    "RESTful APIs"
];

const labelsThird = [
    "Redux Toolkit",
    "Context API",
    "Zustand",
    "Chart.js",
    "React Hook Form",
    "Axios",
    "Postman",
    "Figma"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Frontend Development</h3>
                    <p>Building responsive React.js and Next.js applications with SSR, SSG, dynamic routing, API routes, and performance optimization.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faNodeJs} size="3x"/>
                    <h3>Backend & Databases</h3>
                    <p>Hands-on experience with the MERN stack and .NET, building APIs and data-driven features across React.js, Node.js, and ASP.NET Core.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faMicrosoft} size="3x"/>
                    <h3>State Management & Tools</h3>
                    <p>Familiar with CI/CD workflows and Agile methodology, using modern state management and productivity tools to ship iterative, high-quality software.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;