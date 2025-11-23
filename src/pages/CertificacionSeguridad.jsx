import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/**
 * CertificacionSeguridad Page
 * Muestra la validacion exitosa de un certificado de seguridad
 */
const CertificacionSeguridad = () => {
  const { uuid } = useParams();

  return (
    <>
      <Helmet>
        <title>Certificado Validado | Entersys</title>
        <meta name="description" content="Certificado de seguridad industrial validado exitosamente." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-16">
        <div className="max-w-3xl w-full text-center">
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
            <div className="h-1 w-24 bg-green-600 mx-auto rounded"></div>
          </div>

          {/* Mensaje principal */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certificado Validado
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            El certificado de seguridad industrial ha sido verificado exitosamente.
            El portador de este certificado cumple con los requisitos de seguridad establecidos.
          </p>

          {/* Informacion del certificado */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles del Certificado
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Estado:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Valido
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">ID Certificado:</span>
                <span className="text-sm font-mono text-gray-900 break-all">
                  {uuid ? uuid.substring(0, 8) + '...' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Verificado:</span>
                <span className="text-gray-900">
                  {new Date().toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Mensaje de seguridad */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800 text-left">
                Esta persona ha completado exitosamente la capacitacion de seguridad industrial
                y esta autorizada para ingresar a las instalaciones.
              </p>
            </div>
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

export default CertificacionSeguridad;
