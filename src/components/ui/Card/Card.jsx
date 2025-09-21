// src/components/Card.jsx

import React from 'react';

// Este es el componente principal de la tarjeta
export const Card = ({ className, children }) => {
  return (
    <div className={`overflow-hidden rounded-lg border border-neutral-300 bg-transparent ${className}`}>
      {children}
    </div>
  );
};


// Sub-componente para la imagen
export const CardImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={`w-full object-cover ${className}`} />;
};

// Sub-componente para el encabezado
export const CardHeader = ({ className, children }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

// Sub-componente para el contenido principal
export const CardContent = ({ className, children }) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
};

// Sub-componente para el pie de página
export const CardFooter = ({ className, children }) => {
  return <div className={`border-t border-neutral-300 bg-neutral-100 px-6 py-4 ${className}`}>{children}</div>;
};

// Agrupamos los sub-componentes para una importación más limpia
Card.Image = CardImage;
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;