import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#about">Sobre mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#skills">Habilidades</a>
          <a href="#contact">Contacto</a>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/JuanEPN" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="hhttps://www.linkedin.com/in/juan-esteban-pereira-neira-4a64b6283/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="juan.pereira.neira@correounivalle.edu.co " target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="social-icon" />
          </a>
          <a href="juanestebanpereiraneira@gmail.com">
            <FaEnvelope className="social-icon" />
          </a>
          <a href="juan.pereira.neira@outlook.com">
            <FaEnvelope className="social-icon" />
          </a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} Juan Esteban Pereira Neira. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;