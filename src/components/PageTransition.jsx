// src/components/PageTransition.jsx
// Componente para transiciones suaves entre páginas

import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * Variantes de transición para páginas
 */
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

/**
 * Componente wrapper para transiciones de página
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido de la página
 * @param {string} props.className - Clases CSS adicionales
 * @returns {React.Component} - Página con transiciones
 */
const PageTransition = ({ children, className = "" }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageTransitionVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Componente de loading skeleton para contenido
 */
export const LoadingSkeleton = ({ className = "", lines = 3 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded mb-3 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

/**
 * Componente de loading spinner animado
 */
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="w-full h-full border-2 border-primary border-t-transparent rounded-full"></div>
    </motion.div>
  );
};

/**
 * Botón con estado de loading animado
 */
export const LoadingButton = ({
  children,
  isLoading = false,
  className = "",
  onClick,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      whileTap={isLoading ? {} : { scale: 0.95 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <LoadingSpinner size="sm" />
            <span>Cargando...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default PageTransition;