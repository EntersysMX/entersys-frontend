// src/hooks/useScrollAnimation.js
// Hook personalizado para animaciones de scroll con Framer Motion

import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * Hook para crear animaciones de scroll con Framer Motion
 * @param {Object} options - Opciones para la animación
 * @param {number} options.threshold - Umbral de visibilidad (0-1)
 * @param {boolean} options.once - Si la animación debe ocurrir solo una vez
 * @param {string} options.margin - Margen para activar la animación
 * @returns {Object} - Ref y estado de visibilidad
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: options.threshold || 0.1,
    once: options.once !== false,
    margin: options.margin || "0px 0px -100px 0px"
  });

  return { ref, isInView };
};

/**
 * Variantes de animación predefinidas para diferentes efectos
 */
export const animationVariants = {
  // Fade in desde abajo
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Fade in desde la izquierda
  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Fade in desde la derecha
  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Fade in simple
  fadeIn: {
    hidden: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  },

  // Escala desde pequeño
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },

  // Animación de stagger para listas
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },

  staggerItem: {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
};

/**
 * Hook específico para animaciones de contador numérico
 * @param {number} end - Número final del contador
 * @param {number} duration - Duración de la animación en segundos
 * @param {boolean} startAnimation - Si debe empezar la animación
 * @returns {number} - Valor actual del contador
 */
export const useCounterAnimation = (end, duration = 2, startAnimation = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = end / (duration * 60); // 60 FPS
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16); // ~60 FPS

    return () => clearInterval(timer);
  }, [end, duration, startAnimation]);

  return count;
};