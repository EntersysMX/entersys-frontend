/**
 * Plugin de Vite para inyectar meta tags en index.html según el ambiente
 *
 * - development/staging: Agrega <meta name="robots" content="noindex, nofollow">
 * - production: Permite indexación (sin cambios)
 */

export function htmlMetaPlugin() {
  let viteMode = 'development';

  return {
    name: 'vite-plugin-html-meta',

    configResolved(config) {
      viteMode = config.mode;
      console.log(`\n🏷️  HTML Meta Plugin: Modo detectado = ${viteMode}`);
    },

    transformIndexHtml(html) {
      const mode = viteMode || 'development';

      console.log(`🏷️  HTML Meta Plugin: Inyectando meta tags para modo = ${mode}`);

      // Si NO es producción, agregar meta robots noindex
      if (mode !== 'production') {
        // Buscar el cierre de </head> e inyectar antes
        const noindexMeta = `
    <!-- SEO: Bloquear indexación en ${mode.toUpperCase()} -->
    <meta name="robots" content="noindex, nofollow">
    <meta name="googlebot" content="noindex, nofollow">
    <meta name="environment" content="${mode}">
  `;

        html = html.replace('</head>', `${noindexMeta}</head>`);

        console.log(`⚠️  HTML Meta Plugin: NOINDEX inyectado (ambiente: ${mode})`);
        console.log(`   Meta tags agregados: robots, googlebot, environment`);
      } else {
        console.log(`✅ HTML Meta Plugin: Indexación permitida (producción)`);
      }

      return html;
    }
  };
}
