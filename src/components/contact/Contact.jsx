import { useState } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FiArrowUpRight, FiSend } from "react-icons/fi";
import Reveal from "../Reveal";
import "./Contact.css";

const CONTACT_CARDS = [
  {
    label: "Gmail",
    value: "juanestebanpereiraneira@gmail.com",
    link: "mailto:juanestebanpereiraneira@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "Outlook",
    value: "juan.pereira.neira@outlook.com",
    link: "mailto:juan.pereira.neira@outlook.com",
    icon: <FaEnvelope />,
  },
  {
    label: "Correo Univalle",
    value: "juan.pereira.neira@correounivalle.edu.co",
    link: "mailto:juan.pereira.neira@correounivalle.edu.co",
    icon: <FaEnvelope />,
  },
  {
    label: "LinkedIn",
    value: "Juan Esteban Pereira Neira",
    link: "https://www.linkedin.com/in/juan-esteban-pereira-neira-4a64b6283/",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    value: "@JuanesCCXLV",
    link: "https://github.com/JuanesCCXLV",
    icon: <FaGithub />,
  },
  {
    label: "WhatsApp",
    value: "Escríbeme un mensaje",
    link: "https://wa.me/qr/Z2P66XXQPYYVG1",
    icon: <FaWhatsapp />,
  },
  {
    label: "Instagram",
    value: "@ccxlv.juanes.pereira",
    link: "https://www.instagram.com/ccxlv.juanes.pereira?igsh=MXAwaGxsazMweGlrOA==",
    icon: <FaInstagram />,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="section contact" id="contacto">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">// 04. contacto</span>
          <h2 className="section-title">Hablemos</h2>
          <p className="section-sub">
            ¿Tienes una idea, un proyecto o una pregunta? Escríbeme por el canal que
            prefieras o déjame un mensaje aquí.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal as="ul" className="contact__list">
            {CONTACT_CARDS.map((card) => (
              <li key={card.label}>
                <a
                  href={card.link}
                  target={card.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="contact__item"
                >
                  <span className="contact__icon">{card.icon}</span>
                  <span className="contact__text">
                    <span className="contact__label">{card.label}</span>
                    <span className="contact__value">{card.value}</span>
                  </span>
                  <FiArrowUpRight className="contact__arrow" />
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <form
              action="https://formsubmit.co/juanestebanpereiraneira@gmail.com"
              method="POST"
              className="contact__form card"
            >
              <input type="hidden" name="_subject" value="Nuevo mensaje de contacto" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://juane.dev/" />

              <p className="contact__form-title">
                <span className="contact__form-prompt">$</span> enviar_mensaje
              </p>

              <div className="field">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntame en qué puedo ayudarte…"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                Enviar mensaje <FiSend />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
