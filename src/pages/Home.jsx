import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMessageSquare, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import Reveal from "../components/Reveal";
import "./Home.css";

const Home = () => {
  const { hash } = useLocation();

  // Si se llega con un ancla (p. ej. desde el foro: /#proyectos), baja a esa sección
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [hash]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />

        <section className="forum-cta">
          <div className="container">
            <Reveal className="forum-cta__box card">
              <div className="forum-cta__icon">
                <FiMessageSquare />
              </div>
              <div className="forum-cta__text">
                <h2>Visita mi blog / foro</h2>
                <p>Deja un comentario, una pregunta o una idea. Me encantará leerte.</p>
              </div>
              <Link to="/forum" className="btn btn-primary">
                Ir al foro <FiArrowRight />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
