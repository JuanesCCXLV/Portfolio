import Reveal from "../Reveal";
import "./Skills.css";

const LEVELS = { Bajo: 1, Medio: 2, Alto: 3 };

const GROUPS = [
  {
    title: "Lenguajes y frameworks",
    items: [
      { name: "Python", level: "Alto" },
      { name: "React / JavaScript", level: "Medio" },
      { name: "Java + Swing (NetBeans)", level: "Medio" },
      { name: "C++", level: "Medio" },
      { name: "Kotlin + Android Studio", level: "Bajo" },
    ],
  },
  {
    title: "Datos e infraestructura",
    items: [
      { name: "Bases de datos SQL", level: "Medio" },
      { name: "Bases de datos NoSQL", level: "Bajo" },
      { name: "Fundamentos de redes y ciberseguridad", level: "Medio" },
    ],
  },
  {
    title: "Metodologías y diseño",
    items: [
      { name: "Metodologías ágiles (Scrum)", level: "Alto" },
      { name: "Diseño de contenido para interfaces", level: "Bajo" },
    ],
  },
];

const Skills = () => (
  <section id="habilidades" className="section skills">
    <div className="container">
      <Reveal className="section-head">
        <span className="section-label">// 03. habilidades</span>
        <h2 className="section-title">Con qué trabajo</h2>
        <p className="section-sub">
          Tecnologías y prácticas que he usado en proyectos académicos y personales.
        </p>
      </Reveal>

      <div className="skills__grid">
        {GROUPS.map((group, g) => (
          <Reveal key={group.title} className="skills__group card" delay={g * 100}>
            <h3 className="skills__group-title">{group.title}</h3>
            <ul className="skills__list">
              {group.items.map((skill) => (
                <li key={skill.name} className="skills__item">
                  <span className="skills__name">{skill.name}</span>
                  <span
                    className="skills__meter"
                    role="img"
                    aria-label={`Nivel ${skill.level.toLowerCase()}`}
                  >
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`skills__seg ${n <= LEVELS[skill.level] ? "is-on" : ""}`}
                      />
                    ))}
                    <span className="skills__level">{skill.level}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
