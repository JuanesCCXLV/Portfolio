import { useEffect, useState } from "react";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import "./Hero.css";

const ROLES = [
  "Desarrollador de Software",
  "Estudiante de Ingeniería de Sistemas",
  "Web · Escritorio · Móvil",
];

// Texto que se escribe y borra solo
const useTypewriter = (words, { type = 70, erase = 35, pause = 1600 } = {}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? erase : type;

    if (!deleting && text === word) delay = pause;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words, type, erase, pause]);

  return text;
};

const Hero = () => {
  const role = useTypewriter(ROLES);

  return (
    <section id="inicio" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__prompt">
            <span className="hero__prompt-user">juane@univalle</span>
            <span className="hero__prompt-sep">:~$</span> whoami
          </p>

          <h1 className="hero__name">
            Juan Esteban
            <br />
            <span className="hero__name-accent">Pereira Neira</span>
          </h1>

          <p className="hero__role" aria-live="polite">
            <span className="hero__role-arrow">&gt;</span> {role}
            <span className="hero__caret" aria-hidden="true" />
          </p>

          <p className="hero__bio">
            Tecnólogo en Desarrollo de Software de la Universidad del Valle (Colombia),
            actualmente cursando Ingeniería de Sistemas. Construyo aplicaciones web,
            de escritorio y móviles.
          </p>

          <div className="hero__actions">
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn btn-ghost">
              Contactar
            </a>
          </div>

          <div className="hero__social">
            <a
              href="https://github.com/JuanesCCXLV"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/juan-esteban-pereira-neira-4a64b6283/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href="mailto:juanestebanpereiraneira@gmail.com" aria-label="Correo">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-frame">
            <img src="/images/foto.jpeg" alt="Foto de Juan Esteban Pereira" className="hero__photo" />
          </div>
          <div className="hero__badge hero__badge--top">
            <span className="hero__dot" /> Ing. de Sistemas · Univalle
          </div>
          <div className="hero__badge hero__badge--bottom">
            <code>📍 Colombia</code>
          </div>
        </div>
      </div>

      <a href="#sobre-mi" className="hero__scroll" aria-label="Bajar a Sobre mí">
        <FiArrowDown />
      </a>
    </section>
  );
};

export default Hero;
