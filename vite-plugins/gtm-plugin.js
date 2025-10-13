/**
 * Plugin de Vite para inyectar Google Tag Manager en index.html
 *
 * - development/staging: NO inyecta GTM (evita tracking en desarrollo)
 * - production: Inyecta GTM si existe VITE_GTM_ID
 */

export function gtmPlugin() {
  let viteMode = 'development';
  let gtmId = '';

  return {
    name: 'vite-plugin-gtm',

    configResolved(config) {
      viteMode = config.mode;
      gtmId = config.env.VITE_GTM_ID || '';
      console.log(`\n📊 GTM Plugin: Modo detectado = ${viteMode}`);
      if (gtmId) {
        console.log(`📊 GTM Plugin: GTM ID encontrado = ${gtmId}`);
      } else {
        console.log(`⚠️  GTM Plugin: GTM ID no configurado`);
      }
    },

    transformIndexHtml(html) {
      const mode = viteMode || 'development';

      // Solo inyectar GTM en producción y si existe GTM_ID
      if (mode === 'production' && gtmId) {
        console.log(`📊 GTM Plugin: Inyectando GTM (${gtmId}) en producción`);

        // Script para el <head>
        const gtmHeadScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`;

        // NoScript para el <body>
        const gtmBodyNoScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;

        // Inyectar script en <head>
        html = html.replace('</head>', `${gtmHeadScript}\n  </head>`);

        // Inyectar noscript después de <body>
        html = html.replace('<body>', `<body>\n${gtmBodyNoScript}`);

        console.log(`✅ GTM Plugin: Google Tag Manager inyectado correctamente`);
      } else if (mode !== 'production') {
        console.log(`⚠️  GTM Plugin: NO inyectado (ambiente: ${mode})`);
      } else if (!gtmId) {
        console.log(`⚠️  GTM Plugin: NO inyectado (GTM_ID no configurado)`);
      }

      return html;
    }
  };
}
