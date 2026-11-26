import { useEffect, useState } from "react";
import { FiExternalLink, FiFolder, FiGithub, FiStar } from "react-icons/fi";
import Reveal from "../Reveal";
import "./Projects.css";

const GITHUB_USER = "JuanesCCXLV";
const INITIAL_COUNT = 6;

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Java: "#b07219",
  Kotlin: "#a97bff",
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4f5d95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00b4ab",
  Shell: "#89e051",
};

/*
 * Repos ocultos: los que en GitHub (About → Description) tienen solo
 * "Exposición", "Demostración" o "Exposición y demostración".
 * No importan mayúsculas, tildes ni un punto final.
 */
const HIDDEN_DESCRIPTION =
  /^(exposicion|demostracion)(\s*(y|\/|,|-)\s*(exposicion|demostracion))?\.?$/;

const normalize = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const isShowcase = (repo) =>
  !repo.fork && !HIDDEN_DESCRIPTION.test(normalize(repo.description || ""));

const formatName = (name) => name.replace(/[-_]+/g, " ").trim();

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("es-CO", { month: "short", year: "numeric" });

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = data
            .filter(i
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
          setRepos(sorted);
        } else {
          console.error("GitHub API error:", data.message);
          setError("GitHub no respondió como se esperaba. Intenta de nuevo más tarde.");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Error:", err);
        setError("No se pudieron cargar los proyectos.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const visible = showAll ? repos : repos.slice(0, INITIAL_COUNT);

  return (
    <section id="proyectos" className="section projects">
      <div className="container">
        <Reveal className="section-head projects__head">
          <div>
            <span className="section-label">// 02. proyectos</span>
            <h2 className="section-title">Cosas que he construido</h2>
            <p className="section-sub">
              Repositorios públicos sincronizados directamente desde mi GitHub.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost projects__gh"
          >
            <FiGithub /> @{GITHUB_USER}
          </a>
        </Reveal>

        {error && <p className="projects__error">⚠ {error}</p>}

        <div className="projects__grid">
          {loading &&
            Array.from({ length: INITIAL_COUNT }).map((_, i) => (
              <div key={i} className="project-card card project-card--skeleton" aria-hidden="true">
                <span className="sk sk--icon" />
                <span className="sk sk--title" />
                <span className="sk sk--line" />
                <span className="sk sk--line sk--short" />
              </div>
            ))}

          {!loading &&
            visible.map((repo, i) => (
              <Reveal
                as="a"
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card card"
                delay={(i % 3) * 80}
              >
                <div className="project-card__top">
                  <FiFolder className="project-card__folder" />
                  <span className="project-card__links">
                    {repo.stargazers_count > 0 && (
                      <span className="project-card__stars">
                        <FiStar /> {repo.stargazers_count}
                      </span>
                    )}
                    <FiExternalLink />
                  </span>
                </div>

                <h3 className="project-card__title">{formatName(repo.name)}</h3>
                <p className="project-card__desc">
                  {repo.description || "Sin descripción por ahora."}
                </p>

                <div className="project-card__meta">
                  {repo.language && (
                    <span className="project-card__lang">
                      <span
                        className="project-card__lang-dot"
                        style={{ background: LANG_COLORS[repo.language] || "var(--muted)" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="project-card__date">{formatDate(repo.pushed_at)}</span>
                </div>
              </Reveal>
            ))}
        </div>

        {!loading && repos.length > INITIAL_COUNT && (
          <div className="projects__more">
            <button className="btn btn-ghost" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Ver menos" : `Ver todos (${repos.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
