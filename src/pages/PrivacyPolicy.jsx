import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";

export default function PrivacyPolicy() {
  return (
    <div>
      <MetaTags
        title="Política de Privacidad - Entersys"
        description="Conoce cómo Entersys protege y gestiona tu información personal. Política de privacidad actualizada conforme a la LFPDPPP de México."
        keywords="política de privacidad, protección de datos, LFPDPPP, datos personales"
        url="/politica-de-privacidad"
      />
      <Header />

      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Política de Privacidad
            </h1>
            <p className="text-gray-600">
              Última actualización: Octubre 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
              <p className="mb-4">
                En Entersys, nos comprometemos a proteger tu privacidad. Recopilamos la siguiente información:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Información de contacto:</strong> Nombre, correo electrónico, teléfono y empresa</li>
                <li><strong>Información de uso:</strong> Datos de navegación, dirección IP y cookies</li>
                <li><strong>Información empresarial:</strong> Datos necesarios para la prestación de nuestros servicios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
              <p className="mb-4">
                Utilizamos tu información para:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios de software empresarial</li>
                <li>Procesar solicitudes de demos y cotizaciones</li>
                <li>Enviar comunicaciones relacionadas con nuestros productos</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
                <li>Analizar y mejorar la experiencia del usuario</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Protección de Datos</h2>
              <p className="mb-4">
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, pérdida o alteración.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cifrado SSL/TLS para transmisión de datos</li>
                <li>Almacenamiento seguro en servidores protegidos</li>
                <li>Acceso restringido solo a personal autorizado</li>
                <li>Auditorías de seguridad periódicas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Derechos ARCO</h2>
              <p className="mb-4">
                De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes derecho a:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
                <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para fines específicos</li>
              </ul>
              <p className="mb-4">
                Para ejercer estos derechos, envía un correo a: <a href="mailto:privacidad@entersys.mx" className="text-blue-600 hover:underline">privacidad@entersys.mx</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies y Tecnologías Similares</h2>
              <p className="mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Puedes gestionar tus preferencias de cookies en nuestra <a href="/configuracion-de-cookies" className="text-blue-600 hover:underline">configuración de cookies</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Compartir Información</h2>
              <p className="mb-4">
                No vendemos ni compartimos tu información personal con terceros, excepto:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cuando sea necesario para prestar nuestros servicios</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>Cuando sea requerido por ley o autoridad competente</li>
                <li>Con tu consentimiento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Retención de Datos</h2>
              <p className="mb-4">
                Conservamos tu información personal durante el tiempo necesario para cumplir con los fines para los que fue recopilada y cumplir con obligaciones legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Cambios a esta Política</h2>
              <p className="mb-4">
                Nos reservamos el derecho de actualizar esta política de privacidad. Te notificaremos sobre cambios significativos publicando la nueva política en nuestro sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
              <p className="mb-4">
                Para cualquier pregunta sobre esta política de privacidad, contáctanos:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Entersys</strong></p>
                <p className="mb-2">Email: <a href="mailto:privacidad@entersys.mx" className="text-blue-600 hover:underline">privacidad@entersys.mx</a></p>
                <p className="mb-2">Teléfono: <a href="tel:+525625683662" className="text-blue-600 hover:underline">56 2568 3662</a></p>
                <p className="mb-2">WhatsApp: <a href="https://wa.me/525625683662" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">56 2568 3662</a></p>
                <p>Dirección: Ciudad de México, México</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
