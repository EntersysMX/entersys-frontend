import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '../SEO/schemas';
import { analyticsService } from '../../services/analytics';

/**
 * Breadcrumbs Component
 * Muestra navegación breadcrumb con Schema.org markup para SEO
 * Incluye analytics tracking de navegación
 */

// Mapeo de rutas a nombres legibles
const routeNames = {
  '': 'Inicio',
  'inicio': 'Inicio',
  'worksys': 'Worksys',
  'expersys': 'Expersys',
  'nosotros': 'Nosotros',
  'clientes': 'Clientes',
  'contacto': 'Contacto',
  'blog': 'Blog',
  'awalab': 'Awalab',
  'qhse': 'QHSE',
  'femsa': 'FEMSA',
  'ochoa': 'Ochoa'
};

const Breadcrumbs = ({ customItems = null, className = '' }) => {
  const location = useLocation();

  // Handler para tracking de clicks en breadcrumbs
  const handleBreadcrumbClick = (item, index) => {
    analyticsService.trackEvent(
      'Navigation',
      'Breadcrumb Click',
      `${item.name} (position: ${index + 1})`,
      item.url
    );
  };

  // Si se proporcionan items personalizados, usarlos
  if (customItems) {
    const schemaData = generateBreadcrumbSchema(customItems);

    return (
      <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>
        <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
          <ol className="flex items-center space-x-2 text-sm">
            {customItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
                {index === customItems.length - 1 ? (
                  <span className="text-gray-600 font-medium">{item.name}</span>
                ) : (
                  <Link
                    to={item.url}
                    onClick={() => handleBreadcrumbClick(item, index)}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </>
    );
  }

  // Generar breadcrumbs automáticamente desde la URL
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Si estamos en home, no mostrar breadcrumbs
  if (pathnames.length === 0) {
    return null;
  }

  // Construir items del breadcrumb
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({
      name,
      url: currentPath
    });
  });

  const schemaData = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
        <ol className="flex items-center flex-wrap space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-600 font-medium">{item.name}</span>
              ) : (
                <Link
                  to={item.url}
                  onClick={() => handleBreadcrumbClick(item, index)}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
