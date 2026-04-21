import "./Skills.css";

const Skills = () => {
    const skills = [
        { name: 'React JavaScript', level: 'Medio' },
        { name: 'Python', level: 'Alto' },
        { name: 'Kotlin + Android Studio', level: 'Bajo' },
        { name: 'Java + JavaSwing en ApacheNetBeans', level: 'Medio' },
        { name: 'C++', level: 'Medio' },
        { name: 'Bases de datos SQL', level: 'Medio' },
        { name: 'Bases de datos noSQL', level: 'Bajo' },
        { name: 'Metodologías Agiles (Scrum)', level: 'Alto' },
        { name: 'Fundamentos en redes y ciberseguridad', level: 'Medio' },
        { name: 'Diseño de contenido para interfaces de usuario', level: 'Bajo' }
    ];

    const getLevelPercentage = (level) => {
        switch (level) {
            case 'Alto':
                return '100%';
            case 'Medio':
                return '60%';
            case 'Bajo':
                return '30%';
            default:
                return '0%';
        }
    }; 

    return (
        <section className="skills-section">
            <h2>Mis Habilidades</h2>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <div className="skill-item" key={index}>
                        <div className="skill-info">
                            <span>{skill.name}</span>
                            <span>{skill.level}</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-progress"
                                style={{ width: getLevelPercentage(skill.level) }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    ); 
}

export default Skills; 