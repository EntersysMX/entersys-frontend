// src/components/AnimatedCounter.jsx
// Componente para números animados con efecto de contador

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/**
 * Componente de contador animado que se activa al scroll
 * @param {Object} props - Props del componente
 * @param {number} props.from - Número inicial (default: 0)
 * @param {number} props.to - Número final
 * @param {number} props.duration - Duración de la animación en segundos (default: 2)
 * @param {string} props.suffix - Sufijo a mostrar (ej: "+", "%", "K")
 * @param {string} props.prefix - Prefijo a mostrar (ej: "$")
 * @param {string} props.className - Clases CSS
 * @param {boolean} props.decimals - Si mostrar decimales
 * @returns {React.Component} - Contador animado
 */
const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = false,
  ...props
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.5, once: true });
  const count = useMotionValue(from);

  const rounded = useTransform(count, (latest) => {
    return decimals ? latest.toFixed(1) : Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [count, to, duration, isInView]);

  return (
    <motion.span
      ref={ref}
      className={className}
      {...props}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;