// src/components/AnimatedSection.jsx
// Componente wrapper para animaciones de scroll automáticas

import { motion } from "framer-motion";
import { useScrollAnimation, animationVariants } from "../hooks/useScrollAnimation";

/**
 * Componente wrapper que añade animaciones de scroll a cualquier contenido
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido a animar
 * @param {string} props.animation - Tipo de animación (fadeInUp, fadeInLeft, fadeInRight, fadeIn, scaleIn)
 * @param {number} props.delay - Retraso antes de la animación en segundos
 * @param {number} props.threshold - Umbral de visibilidad (0-1)
 * @param {boolean} props.once - Si la animación debe ocurrir solo una vez
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.as - Elemento HTML a renderizar (default: div)
 * @returns {React.Component} - Componente animado
 */
const AnimatedSection = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  once = true,
  className = "",
  as = "div",
  ...props
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold, once });

  const MotionComponent = motion[as] || motion.div;

  const selectedVariant = animationVariants[animation] || animationVariants.fadeInUp;

  // Aplicar delay si se especifica
  const variantWithDelay = {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        delay: delay
      }
    }
  };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variantWithDelay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Componente para animar listas con efecto stagger
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Elementos de la lista
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.as - Elemento HTML contenedor (default: div)
 * @returns {React.Component} - Lista animada con stagger
 */
export const AnimatedStaggerList = ({
  children,
  className = "",
  as = "div",
  ...props
}) => {
  const { ref, isInView } = useScrollAnimation();
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={animationVariants.staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Elemento de lista animado para usar con AnimatedStaggerList
 */
export const AnimatedStaggerItem = ({ children, className = "", as = "div", ...props }) => {
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      variants={animationVariants.staggerItem}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedSection;