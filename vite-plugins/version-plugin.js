/**
 * Plugin de Vite para generar versión automática
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function versionPlugin() {
  return {
    name: 'version-plugin',
    buildStart() {
      try {
        // Intentar obtener hash de git
        let version;
        try {
          const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
          const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
          const now = new Date();
          const dateStr = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}`;
          const timeStr = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

          version = `${dateStr}-${timeStr}-${gitHash}`;
          console.log(`📦 Building version: ${version} (branch: ${gitBranch})`);
        } catch (gitError) {
          // Si git no está disponible, usar timestamp
          const now = new Date();
          version = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}-${Math.random().toString(36).substr(2, 5)}`;
          console.log(`📦 Building version (no git): ${version}`);
        }

        // Crear archivo de versión
        const versionFile = path.join(process.cwd(), 'src', 'version.json');
        const versionData = {
          version: version,
          buildDate: new Date().toISOString(),
          nodeVersion: process.version,
          platform: process.platform
        };

        fs.writeFileSync(versionFile, JSON.stringify(versionData, null, 2));
        console.log(`✅ Version file created: ${versionFile}`);

        // Actualizar package.json
        try {
          const packageJsonPath = path.join(process.cwd(), 'package.json');
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          packageJson.version = version;
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
          console.log(`✅ Package.json version updated: ${version}`);
        } catch (error) {
          console.warn(`⚠️ Could not update package.json version: ${error.message}`);
        }

      } catch (error) {
        console.error('❌ Error generating version:', error);
        // Fallback version
        const fallbackVersion = Date.now().toString();
        const versionFile = path.join(process.cwd(), 'src', 'version.json');
        fs.writeFileSync(versionFile, JSON.stringify({
          version: fallbackVersion,
          buildDate: new Date().toISOString(),
          error: error.message
        }, null, 2));
      }
    },

    generateBundle(options, bundle) {
      try {
        // Leer versión generada
        const versionFile = path.join(process.cwd(), 'src', 'version.json');
        const versionData = JSON.parse(fs.readFileSync(versionFile, 'utf8'));

        // Inyectar versión en HTML
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (fileName.endsWith('.html') && chunk.source) {
            chunk.source = chunk.source.replace(
              '<head>',
              `<head>
    <meta name="app-version" content="${versionData.version}">
    <meta name="build-date" content="${versionData.buildDate}">`
            );
          }
        }

        console.log(`🏷️ Version ${versionData.version} injected into HTML`);
      } catch (error) {
        console.warn(`⚠️ Could not inject version into HTML: ${error.message}`);
      }
    }
  };
}

export default versionPlugin;