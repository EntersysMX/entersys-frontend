/**
 * Plugin de Vite para inyectar Google Analytics (GA4 o GTM) en index.html
 *
 * - development/staging: NO inyecta (evita tracking en desarrollo)
 * - production: Inyecta GA4 o GTM según configuración
 *
 * Variables de entorno:
 * - VITE_GA4_MEASUREMENT_ID: ID de GA4 (ej: G-XXXXXXXXXX)
 * - VITE_GTM_ID: ID de GTM (ej: GTM-XXXXXXX)
 */

export function gtmPlugin() {
  let viteMode = 'development';
  let gtmId = '';
  let ga4Id = '';

  return {
    name: 'vite-plugin-gtm',

    configResolved(config) {
      viteMode = config.mode;
      gtmId = config.env.VITE_GTM_ID || '';
      ga4Id = config.env.VITE_GA4_MEASUREMENT_ID || '';
      console.log(`\n📊 Analytics Plugin: Modo detectado = ${viteMode}`);
      if (ga4Id) {
        console.log(`📊 Analytics Plugin: GA4 ID encontrado = ${ga4Id}`);
      } else if (gtmId) {
        console.log(`📊 Analytics Plugin: GTM ID encontrado = ${gtmId}`);
      } else {
        console.log(`⚠️  Analytics Plugin: No hay GA4 ni GTM configurado`);
      }
    },

    transformIndexHtml(html) {
      const mode = viteMode || 'development';

      // Solo inyectar en producción
      if (mode !== 'production') {
        console.log(`⚠️  Analytics Plugin: NO inyectado (ambiente: ${mode})`);
        return html;
      }

      // Prioridad: GA4 > GTM
      if (ga4Id) {
        console.log(`📊 Analytics Plugin: Inyectando GA4 (${ga4Id}) en producción`);

        const ga4Script = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}');
    </script>`;

        html = html.replace('</head>', `${ga4Script}\n  </head>`);
        console.log(`✅ Analytics Plugin: Google Analytics 4 inyectado correctamente`);

      } else if (gtmId) {
        console.log(`📊 Analytics Plugin: Inyectando GTM (${gtmId}) en producción`);

        const gtmHeadScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`;

        const gtmBodyNoScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;

        html = html.replace('</head>', `${gtmHeadScript}\n  </head>`);
        html = html.replace('<body>', `<body>\n${gtmBodyNoScript}`);
        console.log(`✅ Analytics Plugin: Google Tag Manager inyectado correctamente`);

      } else {
        console.log(`⚠️  Analytics Plugin: NO inyectado (sin GA4_ID ni GTM_ID)`);
      }

      return html;
    }
  };
}
