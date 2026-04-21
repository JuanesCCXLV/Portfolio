import { useState, useEffect } from "react";
import "./Projects.css";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch('https://api.github.com/users/JuanesCCXLV/repos')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setRepos(data);
      } else {
        console.error('GitHub API error:', data.message);
        setError(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('No se pudieron cargar los proyectos.');
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <section className="projects-section">
      <h2>Mis Proyectos</h2>

      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="error-msg">⚠️ {error}</p>}

      <div className="projects-grid">
        {repos.map(repo => (
          <div className="project-card" key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              Ver en GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;