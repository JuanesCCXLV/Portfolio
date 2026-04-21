import "./Header.css" 
const Encabezado = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <img src="public/images/foto.jpeg" alt="Juanes" className="profile-image" />
                <div className="header-text">
                    <h1>Juan E. Pereira</h1>
                    <p> Soy Técnologo en Desarrollo de Software de la Universidad del Valle (Colombia) y actualmente estoy cursando la carrera de Ingeniería de Sistemas en la misma universidad. En mi vida académica y personal he realizado proyectos enfocados en el desarrollo de aplicaciones web, escritorio y móviles.</p>
                </div>
            </div>
        </header>
    );
}

export default Encabezado;