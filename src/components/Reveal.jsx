import { useEffect, useRef, useState } from "react";

/**
 * Envuelve contenido y lo hace aparecer suavemente
 * cuando entra en pantalla.
 */
const Reveal = ({ as: Tag = "div", delay = 0, className = "", children, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  // Quita el retraso cuando termina la animación, para que
  // los efectos hover respondan al instante.
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), delay + 750);
    return () => clearTimeout(t);
  }, [visible, delay]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={settled ? undefined : { transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
