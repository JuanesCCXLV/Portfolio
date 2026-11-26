import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

export const SECTIONS = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contacto", label: "Contacto" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Fondo del menú al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta la sección visible
  useEffect(() => {
    if (!isHome || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Bloquea el scroll del fondo con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const href = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`}>
      <nav className="navbar__inner container" aria-label="Principal">
        <a href={isHome ? "#inicio" : "/"} className="navbar__logo" onClick={close}>
          <span className="navbar__logo-bracket">&lt;</span>
          juane
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="navbar-links"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <ul id="navbar-links" className={`navbar__links ${open ? "is-open" : ""}`}>
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={href(id)}
                className={active === id ? "is-active" : ""}
                onClick={close}
              >
                <span className="navbar__num">0{i + 1}.</span>
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/forum"
              className={`navbar__cta ${pathname === "/forum" ? "is-active" : ""}`}
              onClick={close}
            >
              Foro
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
