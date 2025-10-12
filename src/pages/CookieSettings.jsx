import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";

export default function CookieSettings() {
  // Estado para las preferencias de cookies
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Siempre activadas
    analytics: true,
    marketing: true,
    functional: true,
  });

  const [saved, setSaved] = useState(false);

  // Cargar preferencias guardadas al montar el componente
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Manejar cambios en las preferencias
  const handleToggle = (category) => {
    if (category === 'necessary') return; // No permitir desactivar cookies necesarias

    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
    setSaved(false);
  };

  // Guardar preferencias
  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Disparar evento personalizado para que otros componentes sepan que se actualizaron las preferencias
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', {
      detail: cookiePreferences
    }));
  };

  // Aceptar todas las cookies
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', {
      detail: allAccepted
    }));
  };

  // Rechazar todas las cookies opcionales
  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setCookiePreferences(onlyNecessary);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', {
      detail: onlyNecessary
    }));
  };

  const CookieToggle = ({ category, title, description, enabled, locked }) => (
    <div className="border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div className="ml-4">
          <button
            onClick={() => handleToggle(category)}
            disabled={locked}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? 'bg-blue-600' : 'bg-gray-300'
            } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      {locked && (
        <p className="text-sm text-gray-500 italic mt-2">
          Estas cookies son necesarias para el funcionamiento del sitio y no se pueden desactivar.
        </p>
      )}
    </div>
  );

  return (
    <div>
      <MetaTags
        title="Configuración de Cookies - Entersys"
        description="Gestiona tus preferencias de cookies en Entersys. Controla qué cookies aceptas y cómo usamos tu información."
        keywords="cookies, configuración de cookies, privacidad, preferencias"
        url="/configuracion-de-cookies"
      />
      <Header />

      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Configuración de Cookies
            </h1>
            <p className="text-gray-600 text-lg">
              Personaliza tu experiencia controlando el uso de cookies en nuestro sitio
            </p>
          </div>

          {saved && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              ✓ Tus preferencias han sido guardadas correctamente
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">¿Qué son las cookies?</h2>
            <p className="text-gray-600 mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
              Nos ayudan a mejorar tu experiencia, recordar tus preferencias y entender cómo utilizas nuestro sitio.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Gestiona tus Preferencias</h2>

            <CookieToggle
              category="necessary"
              title="Cookies Necesarias"
              description="Estas cookies son esenciales para el funcionamiento del sitio web. Permiten funciones básicas como la navegación segura y el acceso a áreas protegidas. El sitio no puede funcionar correctamente sin estas cookies."
              enabled={cookiePreferences.necessary}
              locked={true}
            />

            <CookieToggle
              category="analytics"
              title="Cookies Analíticas"
              description="Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web mediante la recopilación y reporte de información de forma anónima. Utilizamos Matomo para análisis web respetando tu privacidad."
              enabled={cookiePreferences.analytics}
              locked={false}
            />

            <CookieToggle
              category="functional"
              title="Cookies Funcionales"
              description="Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas. Pueden ser establecidas por nosotros o por terceros cuyos servicios hemos agregado a nuestras páginas."
              enabled={cookiePreferences.functional}
              locked={false}
            />

            <CookieToggle
              category="marketing"
              title="Cookies de Marketing"
              description="Estas cookies se utilizan para rastrear visitantes en los sitios web con el fin de mostrar anuncios relevantes y atractivos para el usuario individual, y por tanto, más valiosos para los editores y anunciantes de terceros."
              enabled={cookiePreferences.marketing}
              locked={false}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <button
              onClick={handleSave}
              className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar Preferencias
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Aceptar Todas
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Rechazar Opcionales
            </button>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies de Terceros</h2>
              <p className="mb-4">
                Utilizamos servicios de terceros que también pueden establecer cookies en tu dispositivo:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Matomo Analytics:</strong> Para análisis web respetando tu privacidad (datos alojados en nuestros servidores)</li>
                <li><strong>Google Fonts:</strong> Para mostrar fuentes tipográficas</li>
                <li><strong>CDN de Recursos:</strong> Para cargar recursos optimizados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Gestión de Cookies desde tu Navegador</h2>
              <p className="mb-4">
                También puedes gestionar las cookies directamente desde la configuración de tu navegador:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
                <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies y datos del sitio</li>
              </ul>
              <p className="mb-4 text-sm text-gray-600">
                Nota: Bloquear o eliminar todas las cookies puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Duración de las Cookies</h2>
              <p className="mb-4">
                Las cookies que utilizamos tienen diferentes duraciones:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador</li>
                <li><strong>Cookies persistentes:</strong> Permanecen hasta 2 años o hasta que las elimines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Más Información</h2>
              <p className="mb-4">
                Para más detalles sobre cómo manejamos tu información, consulta:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><a href="/politica-de-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</a></li>
                <li><a href="/terminos-de-servicio" className="text-blue-600 hover:underline">Términos de Servicio</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre el uso de cookies:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Entersys</strong></p>
                <p className="mb-2">Email: <a href="mailto:privacidad@entersys.mx" className="text-blue-600 hover:underline">privacidad@entersys.mx</a></p>
                <p className="mb-2">Teléfono: <a href="tel:+525625683662" className="text-blue-600 hover:underline">56 2568 3662</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
