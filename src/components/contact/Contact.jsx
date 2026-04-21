import { useState } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import "./Contact.css";

// Array de tarjetas de contacto con iconos
const CONTACT_CARDS = [
  {
    label: "Correo 1",
    value: "juanestebanpereiraneira@gmail.com",
    type: "email",
    link: "mailto:juanestebanpereiraneira@gmail.com",
    icon: <FaEnvelope color="#e74c3c" />,
  },
  {
    label: "Correo 2",
    value: "juan.pereira.neira@outlook.com",
    type: "email",
    link: "mailto:juan.pereira.neira@outlook.com",
    icon: <FaEnvelope color="#e67e22" />,
  },
  {
    label: "Correo 3",
    value: "juan.pereira.neira@correounivalle.edu.co",
    type: "email",
    link: "mailto:juan.pereira.neira@correounivalle.edu.co",
    icon: <FaEnvelope color="#3498db" />,
  },
  {
    label: "LinkedIn",
    value: "Perfil",
    type: "linkedin",
    link: "https://www.linkedin.com/in/juan-esteban-pereira-neira-4a64b6283/",
    icon: <FaLinkedin color="#0077b5" />,
  },
  {
    label: "GitHub",
    value: "JuanesCCXLV",
    type: "github",
    link: "https://github.com/JuanesCCXLV",
    icon: <FaGithub color="#24292e" />,
  },
  {
    label: "WhatsApp",
    value: "Chat",
    type: "whatsapp",
    link: "https://wa.me/qr/Z2P66XXQPYYVG1",
    icon: <FaWhatsapp color="#25d366" />,
  },
  {
    label: "Instagram",
    value: "ccxlv.juanes.pereira",
    type: "instagram",
    link: "https://www.instagram.com/ccxlv.juanes.pereira?igsh=MXAwaGxsazMweGlrOA==",
    icon: <FaInstagram color="#e4405f" />,
  },
];

// Componente para mostrar las tarjetas de contacto
const ContactCards = () => (
  <div className="contact-cards-container">
    {CONTACT_CARDS.map((card) => (
      <div className="contact-card" key={card.label}>
        <div className="contact-card-icon">{card.icon}</div>
        <span className="contact-card-label">{card.label}</span>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`contact-card-link ${card.type}`}
        >
          {card.value}
        </a>
      </div>
    ))}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Contacto</h2>
      {/* Tarjetas de contacto */}
      <ContactCards />

      <h2>Envíame un mensaje</h2>
      <form
        action="https://formsubmit.co/juanestebanpereiraneira@gmail.com"
        method="POST"
        className="contact-form"
      >
        <input type="hidden" name="_subject" value="Nuevo mensaje de contacto" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://juane.dev/" />

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contact;
