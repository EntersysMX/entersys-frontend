import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * CertificacionSeguridad Page
 * Muestra la validacion exitosa de un certificado de seguridad - Branding FEMSA
 */
const CertificacionSeguridad = () => {

  return (
    <>
      <Helmet>
        <title>Onboarding Aprobado | FEMSA</title>
        <meta name="description" content="Tu certificación de Seguridad Industrial ha sido validada correctamente." />
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
            {/* Icono de exito */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-16 h-16 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="h-1 w-24 bg-[#FFC600] mx-auto rounded"></div>
            </div>

            {/* Mensaje principal */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Onboarding Aprobado
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Tu certificación de Seguridad Industrial ha sido validada correctamente.
              Has cumplido con todos los requisitos del curso y tu información ha sido
              aprobada conforme a los estándares de seguridad establecidos.
            </p>

            {/* Badge de estado */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-800 font-semibold mb-8">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Certificación Válida
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

export default CertificacionSeguridad;
