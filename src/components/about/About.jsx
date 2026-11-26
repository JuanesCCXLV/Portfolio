import Reveal from "../Reveal";
import "./About.css";

const INFO = [
  ["formacion", "\"Tecnólogo en Desarrollo de Software\""],
  ["estudiando", "\"Ingeniería de Sistemas\""],
  ["universidad", "\"Universidad del Valle\""],
  ["intereses", "[\"Desarrollo\", \"Seguridad\", \"Redes\"]"],
  ["trabajo_en_equipo", "true"],
];

function About() {
  return (
    <section id="sobre-mi" className="section about">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">// 01. sobre_mí</span>
          <h2 className="section-title">Un poco sobre mí</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              Soy <strong>Tecnólogo en Desarrollo de Software</strong> y estudiante de{" "}
              <strong>Ingeniería de Sistemas</strong>. Me interesa el desarrollo de
              aplicaciones, la seguridad informática y la infraestructura de redes. Me
              gusta aprender nuevas tecnologías y mejorar mis habilidades constantemente.
            </p>
            <p>
              En lo profesional he trabajado en proyectos de aplicaciones de escritorio,
              web y móviles, con tecnologías como <em>React, Java, Python, PHP, C++ y
              Kotlin</em>, entre otras. Disfruto trabajar en equipo y colaborar con otros
              para aprender mutuamente.
            </p>
          </Reveal>

          <Reveal className="about__code card" delay={120}>
            <div className="about__code-bar">
              <span /> <span /> <span />
              <code>juane.json</code>
            </div>
            <pre>
              <code>
                <span className="tok-punc">{"{"}</span>
                {"\n"}
                {INFO.map(([key, value], i) => (
                  <span key={key}>
                    {"  "}
                    <span className="tok-key">"{key}"</span>
                    <span className="tok-punc">: </span>
                    <span className={value === "true" ? "tok-bool" : "tok-str"}>{value}</span>
                    {i < INFO.length - 1 && <span className="tok-punc">,</span>}
                    {"\n"}
                  </span>
                ))}
                <span className="tok-punc">{"}"}</span>
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
