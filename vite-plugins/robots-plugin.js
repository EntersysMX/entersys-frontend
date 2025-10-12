/**
 * Plugin de Vite para copiar el archivo robots.txt correcto según el ambiente
 *
 * - development: robots.development.txt → robots.txt (NOINDEX, NOFOLLOW)
 * - staging: robots.staging.txt → robots.txt (NOINDEX, NOFOLLOW)
 * - production: robots.production.txt → robots.txt (INDEX, FOLLOW)
 */

import fs from 'fs';
import path from 'path';

export function robotsPlugin() {
  let viteMode = 'development';

  return {
    name: 'vite-plugin-robots',

    configResolved(config) {
      viteMode = config.mode;
      console.log(`\n🤖 Robots Plugin: Modo detectado = ${viteMode}`);
    },

    buildStart() {
      const publicDir = path.resolve(process.cwd(), 'public');
      const mode = viteMode || 'development';

      // Mapear modo a archivo robots correspondiente
      let sourceFile;
      if (mode === 'production') {
        sourceFile = 'robots.production.txt';
      } else if (mode === 'staging') {
        sourceFile = 'robots.staging.txt';
      } else {
        sourceFile = 'robots.development.txt';
      }

      const sourcePath = path.join(publicDir, sourceFile);
      const targetPath = path.join(publicDir, 'robots.txt');

      try {
        // Verificar que el archivo fuente existe
        if (!fs.existsSync(sourcePath)) {
          console.error(`❌ Robots Plugin: Archivo no encontrado: ${sourcePath}`);
          return;
        }

        // Copiar archivo
        fs.copyFileSync(sourcePath, targetPath);

        // Leer primera línea para mostrar info
        const content = fs.readFileSync(targetPath, 'utf-8');
        const firstLine = content.split('\n')[0];

        console.log(`✅ Robots Plugin: ${sourceFile} → robots.txt`);
        console.log(`   ${firstLine}`);

        // Mostrar advertencia si NO es producción
        if (mode !== 'production') {
          console.log(`⚠️  Robots Plugin: INDEXACIÓN BLOQUEADA (ambiente: ${mode})`);
          console.log(`   Los motores de búsqueda NO indexarán este sitio.`);
        } else {
          console.log(`✅ Robots Plugin: INDEXACIÓN PERMITIDA (producción)`);
        }
      } catch (error) {
        console.error(`❌ Robots Plugin: Error copiando robots.txt:`, error);
      }
    },

    // También ejecutar en modo dev cuando inicia el servidor
    configureServer(server) {
      const publicDir = path.resolve(process.cwd(), 'public');
      const mode = viteMode || 'development';

      let sourceFile;
      if (mode === 'production') {
        sourceFile = 'robots.production.txt';
      } else if (mode === 'staging') {
        sourceFile = 'robots.staging.txt';
      } else {
        sourceFile = 'robots.development.txt';
      }

      const sourcePath = path.join(publicDir, sourceFile);
      const targetPath = path.join(publicDir, 'robots.txt');

      try {
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, targetPath);
        }
      } catch (error) {
        console.error(`❌ Robots Plugin: Error en servidor dev:`, error);
      }
    }
  };
}
