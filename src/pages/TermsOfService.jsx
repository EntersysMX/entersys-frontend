import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";

export default function TermsOfService() {
  return (
    <div>
      <MetaTags
        title="Términos de Servicio - Entersys"
        description="Lee los términos y condiciones de uso de los servicios de Entersys. Software empresarial Worksys, Expersys y soluciones QHSE."
        keywords="términos de servicio, condiciones de uso, términos legales, Entersys"
        url="/terminos-de-servicio"
      />
      <Header />

      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Términos de Servicio
            </h1>
            <p className="text-gray-600">
              Última actualización: Octubre 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
              <p className="mb-4">
                Al acceder y utilizar los servicios de Entersys, aceptas estar sujeto a estos términos de servicio, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de las leyes locales aplicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Descripción de los Servicios</h2>
              <p className="mb-4">
                Entersys proporciona soluciones de software empresarial que incluyen:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Worksys:</strong> Sistema de gestión de órdenes de trabajo y mantenimiento</li>
                <li><strong>Expersys:</strong> Plataforma de gestión de expedientes clínicos</li>
                <li><strong>Soluciones QHSE:</strong> Sistemas de gestión de calidad, salud, seguridad y medio ambiente</li>
                <li><strong>Servicios de consultoría:</strong> Asesoría y soporte técnico especializado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Registro y Cuenta de Usuario</h2>
              <p className="mb-4">
                Para utilizar nuestros servicios, debes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Proporcionar información precisa, actual y completa durante el proceso de registro</li>
                <li>Mantener la seguridad de tu contraseña y cuenta</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
                <li>Ser responsable de todas las actividades que ocurran bajo tu cuenta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Uso Aceptable</h2>
              <p className="mb-4">
                Te comprometes a NO:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Utilizar los servicios para propósitos ilegales o no autorizados</li>
                <li>Intentar obtener acceso no autorizado a nuestros sistemas o redes</li>
                <li>Distribuir virus, malware o código malicioso</li>
                <li>Interferir con el funcionamiento adecuado de los servicios</li>
                <li>Copiar, modificar o distribuir el software sin autorización</li>
                <li>Realizar ingeniería inversa del software</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Propiedad Intelectual</h2>
              <p className="mb-4">
                Todo el contenido, características y funcionalidad de nuestros servicios son propiedad exclusiva de Entersys y están protegidos por leyes de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
              </p>
              <p className="mb-4">
                La licencia que te otorgamos es:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>No exclusiva y no transferible</li>
                <li>Limitada al uso interno de tu organización</li>
                <li>Sujeta al cumplimiento de estos términos</li>
                <li>Revocable en caso de incumplimiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Tarifas y Pagos</h2>
              <p className="mb-4">
                Los servicios están sujetos a las tarifas especificadas en tu contrato o plan de suscripción:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Los pagos deben realizarse según los términos acordados</li>
                <li>Las tarifas pueden estar sujetas a cambios con previo aviso</li>
                <li>Los pagos no son reembolsables excepto como se especifique en tu contrato</li>
                <li>El incumplimiento de pago puede resultar en la suspensión del servicio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Disponibilidad del Servicio</h2>
              <p className="mb-4">
                Nos esforzamos por mantener la disponibilidad continua de nuestros servicios, pero:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>No garantizamos que los servicios estarán disponibles el 100% del tiempo</li>
                <li>Puede haber interrupciones por mantenimiento programado</li>
                <li>No somos responsables de interrupciones fuera de nuestro control</li>
                <li>Proporcionaremos avisos razonables para mantenimiento planificado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Privacidad y Seguridad de Datos</h2>
              <p className="mb-4">
                El manejo de tus datos personales se rige por nuestra <a href="/politica-de-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</a>. Nos comprometemos a:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Proteger la confidencialidad de tus datos</li>
                <li>Implementar medidas de seguridad apropiadas</li>
                <li>Cumplir con las leyes de protección de datos aplicables</li>
                <li>Notificarte sobre brechas de seguridad según lo requiera la ley</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Limitación de Responsabilidad</h2>
              <p className="mb-4">
                En la medida permitida por la ley:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Entersys no será responsable de daños indirectos, incidentales o consecuentes</li>
                <li>Nuestra responsabilidad total no excederá las tarifas pagadas durante los 12 meses anteriores</li>
                <li>No garantizamos que el servicio será ininterrumpido o libre de errores</li>
                <li>Eres responsable de mantener copias de seguridad de tus datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Terminación</h2>
              <p className="mb-4">
                Podemos suspender o terminar tu acceso a los servicios:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Si violas estos términos de servicio</li>
                <li>Si no pagas las tarifas acordadas</li>
                <li>Si determinamos que tu uso representa un riesgo de seguridad</li>
                <li>Al finalizar tu período de suscripción sin renovación</li>
              </ul>
              <p className="mb-4">
                Tú puedes cancelar tu cuenta en cualquier momento contactándonos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Modificaciones a los Términos</h2>
              <p className="mb-4">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios materiales y tu uso continuado de los servicios después de dichos cambios constituye tu aceptación de los nuevos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Ley Aplicable</h2>
              <p className="mb-4">
                Estos términos se regirán e interpretarán de acuerdo con las leyes de México. Cualquier disputa se resolverá en los tribunales competentes de la Ciudad de México.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Contacto</h2>
              <p className="mb-4">
                Para preguntas sobre estos términos de servicio:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Entersys</strong></p>
                <p className="mb-2">Email: <a href="mailto:legal@entersys.com.mx" className="text-blue-600 hover:underline">legal@entersys.com.mx</a></p>
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
