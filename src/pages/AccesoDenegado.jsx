import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * AccesoDenegado Page
 * Muestra cuando un certificado no es valido o el score es menor a 80 - Branding FEMSA
 */
const AccesoDenegado = () => {
  return (
    <>
      <Helmet>
        <title>Onboarding No Aprobado | FEMSA</title>
        <meta name="description" content="Tu certificación de Seguridad Industrial no pudo ser validada." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {/* Header con logo FEMSA */}
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-4xl mx-auto px-4 flex justify-center">
            <img
              src="/images/femsa-logo.png"
              alt="FEMSA"
              className="h-12"
            />
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full text-center">
            {/* Icono de error */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4">
                <svg
                  className="w-16 h-16 text-[#D91E18]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="h-1 w-24 bg-[#FFC600] mx-auto rounded"></div>
            </div>

            {/* Mensaje principal */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Onboarding No Aprobado
            </h1>

            <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
              Tu certificación de Seguridad Industrial no pudo ser validada.
              La información proporcionada o los requisitos del curso no cumplen
              con los estándares mínimos de seguridad establecidos.
            </p>

            <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Por favor revisa las observaciones enviadas, corrige la información
              o completa los requisitos faltantes para volver a enviar tu solicitud
              de validación.
            </p>

            {/* Badge de estado */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-100 text-[#D91E18] font-semibold mb-8">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Certificación No Válida
            </div>

            {/* Fecha de verificación */}
            <p className="text-sm text-gray-500 mb-8">
              Verificado el {new Date().toLocaleDateString('es-MX', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Footer minimalista */}
        <footer className="bg-gray-100 py-6">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-600 mb-3">
              © {new Date().getFullYear()} Entersys. Todos los derechos reservados.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/politica-de-privacidad" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                Política de privacidad
              </Link>
              <Link to="/terminos-de-servicio" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                Términos de servicio
              </Link>
              <Link to="/configuracion-de-cookies" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                Configuración de cookies
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default AccesoDenegado;
