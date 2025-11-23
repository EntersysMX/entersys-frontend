import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/**
 * AccesoDenegado Page
 * Muestra cuando un certificado no es valido o el score es menor a 80
 */
const AccesoDenegado = () => {
  return (
    <>
      <Helmet>
        <title>Acceso Denegado | Entersys</title>
        <meta name="description" content="El certificado de seguridad no es valido." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-16">
        <div className="max-w-3xl w-full text-center">
          {/* Icono de error */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4">
              <svg
                className="w-16 h-16 text-red-600"
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
            <div className="h-1 w-24 bg-red-600 mx-auto rounded"></div>
          </div>

          {/* Mensaje principal */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Acceso Denegado
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            El certificado de seguridad no es valido o ha expirado.
            El portador de este codigo QR no esta autorizado para ingresar a las instalaciones.
          </p>

          {/* Mensaje de advertencia */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Certificado No Valido
                </p>
                <p className="text-sm text-red-700">
                  Esta persona no ha completado exitosamente la capacitacion de seguridad industrial
                  o su certificacion ha expirado.
                </p>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-sm text-gray-600 text-left">
              <strong>Para el personal de seguridad:</strong> No permita el acceso a las instalaciones.
              Solicite al visitante que contacte a su supervisor para obtener una nueva certificacion.
            </p>
          </div>

          {/* Boton de regreso */}
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AccesoDenegado;
