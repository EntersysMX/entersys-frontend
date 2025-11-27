/**
 * CursoSeguridad.jsx
 * Página de capacitación obligatoria de seguridad con video anti-skip.
 * Implementa MD050 - Módulo de Validación de Video.
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import SecureVideoPlayer from '../components/SecureVideoPlayer';

// Configuración del video de seguridad
const VIDEO_CONFIG = {
  id: 'seguridad-2024',
  src: '/videos/Seguridad_Laboral.mp4',
  poster: null, // No usar poster
  title: 'Capacitación Obligatoria de Seguridad Laboral 2024'
};

export default function CursoSeguridad() {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [completionData, setCompletionData] = useState(null);

  // Obtener userId de los parámetros de URL o sesión
  useEffect(() => {
    // Intentar obtener userId de URL params (ej: /curso-seguridad?uid=123)
    const uidParam = searchParams.get('uid');
    if (uidParam) {
      setUserId(parseInt(uidParam, 10));
    }

    // Obtener nombre si está disponible
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setUserName(decodeURIComponent(nameParam));
    }

    // Si no hay userId en URL, intentar generar uno temporal basado en sesión
    if (!uidParam) {
      let sessionId = sessionStorage.getItem('temp_user_id');
      if (!sessionId) {
        sessionId = Date.now().toString();
        sessionStorage.setItem('temp_user_id', sessionId);
      }
      setUserId(parseInt(sessionId, 10));
    }
  }, [searchParams]);

  // Manejar completitud del video
  const handleVideoComplete = (data) => {
    setCompletionData(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Capacitación de Seguridad | Entersys"
        description="Capacitación obligatoria de seguridad industrial para personal de Entersys y clientes. Complete el video para obtener su certificación."
        keywords="capacitación seguridad, curso seguridad industrial, certificación seguridad, Entersys"
        url="/curso-seguridad"
        noIndex={true}
      />

      {/* Custom Header with Coca-Cola FEMSA logo */}
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-4 flex justify-center">
          <img src="/images/coca-cola-femsa-logo.png" alt="Coca-Cola FEMSA" className="h-20 md:h-24" />
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Capacitación Obligatoria de Seguridad
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Este módulo de capacitación es requisito indispensable para
              el acceso a las instalaciones y operaciones.
            </p>
            {userName && (
              <p className="mt-4 text-green-200">
                Bienvenido, <span className="font-semibold">{userName}</span>
              </p>
            )}
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Instrucciones */}
              <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                <h2 className="text-lg font-semibold text-amber-800 mb-2">
                  Instrucciones Importantes
                </h2>
                <ul className="text-amber-700 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Debe ver el video completo para poder acceder al examen de certificación.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    No es posible adelantar el video; solo puede retroceder si lo necesita.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Su progreso se guarda automáticamente cada 5 segundos.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Debe completar al menos el 90% del video para desbloquear el examen.
                  </li>
                </ul>
              </div>

              {/* Video Player */}
              {userId ? (
                <SecureVideoPlayer
                  videoSrc={VIDEO_CONFIG.src}
                  videoId={VIDEO_CONFIG.id}
                  userId={userId}
                  posterImage={VIDEO_CONFIG.poster}
                  title={VIDEO_CONFIG.title}
                  onComplete={handleVideoComplete}
                />
              ) : (
                <div className="p-8 bg-gray-100 rounded-lg text-center">
                  <p className="text-gray-600">
                    Cargando información del usuario...
                  </p>
                </div>
              )}

              {/* Mensaje de completitud */}
              {completionData?.authorized && (
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-green-600 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    ¡Felicidades! Ha completado el video
                  </h3>
                  <p className="text-green-700 mb-4">
                    Ahora puede proceder al examen de certificación.
                  </p>
                  <a
                    href={completionData.exam_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ir al Examen de Certificación
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-3xl mb-3">📹</div>
                <h3 className="font-semibold text-gray-800 mb-2">Video Completo</h3>
                <p className="text-sm text-gray-600">
                  Debe visualizar todo el contenido del video de capacitación.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-semibold text-gray-800 mb-2">Examen Final</h3>
                <p className="text-sm text-gray-600">
                  Responda el cuestionario para validar sus conocimientos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold text-gray-800 mb-2">Certificación</h3>
                <p className="text-sm text-gray-600">
                  Obtenga su constancia de capacitación en seguridad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-3">© {new Date().getFullYear()} Entersys. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/politica-de-privacidad" className="text-gray-500 hover:text-[#FFC600] transition-colors">Política de privacidad</Link>
            <Link to="/terminos-de-servicio" className="text-gray-500 hover:text-[#FFC600] transition-colors">Términos de servicio</Link>
            <Link to="/configuracion-de-cookies" className="text-gray-500 hover:text-[#FFC600] transition-colors">Configuración de cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
