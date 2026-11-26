import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { SECTIONS } from "../navbar/Navbar";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const prefix = pathname === "/" ? "" : "/";

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href={pathname === "/" ? "#inicio" : "/"} className="footer__logo">
            <span>&lt;</span>juane<span> /&gt;</span>
          </a>
          <p>Desarrollo de software · Universidad del Valle</p>
        </div>

        <nav className="footer__links" aria-label="Secciones">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`${prefix}#${id}`}>
              {label}
            </a>
          ))}
          <Link to="/forum">Foro</Link>
        </nav>

        <div className="footer__social">
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

      <div className="container footer__bottom">
        <p>
          © {year} Juan Esteban Pereira Neira. Hecho con React + Vite.
        </p>
        <button
          className="footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
