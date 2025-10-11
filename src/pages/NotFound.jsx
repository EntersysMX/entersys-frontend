import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/**
 * NotFound Page (404)
 * Página personalizada para rutas no encontradas
 */
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Página no encontrada | Entersys</title>
        <meta name="description" content="La página que buscas no existe. Vuelve al inicio de Entersys para explorar nuestras soluciones de automatización empresarial." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-16">
        <div className="max-w-3xl w-full text-center">
          {/* Número 404 grande */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
          </div>

          {/* Mensaje principal */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Página no encontrada
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            Verifica la URL o vuelve al inicio para explorar nuestras soluciones.
          </p>

          {/* Enlaces útiles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contactar
            </Link>
          </div>

          {/* Enlaces rápidos a secciones principales */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explora nuestras soluciones
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link
                to="/worksys"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-blue-600 font-semibold mb-1">Worksys</div>
                <div className="text-sm text-gray-600">Gestión de procesos</div>
              </Link>
              <Link
                to="/expersys"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-blue-600 font-semibold mb-1">Expersys</div>
                <div className="text-sm text-gray-600">Certificaciones</div>
              </Link>
              <Link
                to="/clientes"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-blue-600 font-semibold mb-1">Clientes</div>
                <div className="text-sm text-gray-600">Casos de éxito</div>
              </Link>
              <Link
                to="/nosotros"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-blue-600 font-semibold mb-1">Nosotros</div>
                <div className="text-sm text-gray-600">Conócenos</div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;
