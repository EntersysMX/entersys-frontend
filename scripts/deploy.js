#!/usr/bin/env node

/**
 * Script de deploy automático con versionado
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Colores para console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

class DeployManager {
  constructor() {
    this.startTime = Date.now();
    this.deployId = `deploy-${Date.now()}`;
  }

  // Ejecutar comando con logging
  exec(command, description) {
    try {
      log(`\n🔄 ${description}...`, 'cyan');
      log(`   Command: ${command}`, 'yellow');

      const result = execSync(command, {
        cwd: rootDir,
        encoding: 'utf8',
        stdio: 'inherit'
      });

      log(`✅ ${description} completed`, 'green');
      return result;
    } catch (error) {
      log(`❌ Error in ${description}:`, 'red');
      log(`   ${error.message}`, 'red');
      throw error;
    }
  }

  // Generar nueva versión
  generateVersion() {
    try {
      const gitHash = execSync('git rev-parse --short HEAD', {
        cwd: rootDir,
        encoding: 'utf8'
      }).trim();

      const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', {
        cwd: rootDir,
        encoding: 'utf8'
      }).trim();

      const now = new Date();
      const dateStr = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}`;
      const timeStr = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

      return {
        version: `${dateStr}-${timeStr}-${gitHash}`,
        branch: gitBranch,
        hash: gitHash,
        timestamp: now.toISOString()
      };
    } catch (error) {
      // Fallback sin git
      const now = new Date();
      const version = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}-${Math.random().toString(36).substr(2, 5)}`;

      return {
        version: version,
        branch: 'unknown',
        hash: 'no-git',
        timestamp: now.toISOString()
      };
    }
  }

  // Pre-deploy checks
  preDeployChecks() {
    log('\n🔍 Running pre-deploy checks...', 'bright');

    // Check if node_modules exists
    if (!fs.existsSync(path.join(rootDir, 'node_modules'))) {
      log('❌ node_modules not found. Run npm install first.', 'red');
      throw new Error('Missing node_modules');
    }

    // Check if src directory exists
    if (!fs.existsSync(path.join(rootDir, 'src'))) {
      log('❌ src directory not found.', 'red');
      throw new Error('Missing src directory');
    }

    log('✅ Pre-deploy checks passed', 'green');
  }

  // Crear archivo de deploy info
  createDeployInfo(versionInfo) {
    const deployInfo = {
      deployId: this.deployId,
      version: versionInfo.version,
      branch: versionInfo.branch,
      hash: versionInfo.hash,
      buildDate: versionInfo.timestamp,
      deployDate: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'production'
    };

    const deployInfoPath = path.join(rootDir, 'src', 'deploy-info.json');
    fs.writeFileSync(deployInfoPath, JSON.stringify(deployInfo, null, 2));

    log(`📝 Deploy info created: ${deployInfoPath}`, 'cyan');
    log(`   Version: ${deployInfo.version}`, 'cyan');
    log(`   Deploy ID: ${deployInfo.deployId}`, 'cyan');

    return deployInfo;
  }

  // Deploy local
  async deployLocal() {
    try {
      log('\n🚀 Starting LOCAL deployment...', 'bright');

      this.preDeployChecks();

      const versionInfo = this.generateVersion();
      this.createDeployInfo(versionInfo);

      // Build
      this.exec('npm run build', 'Building application');

      // Update local files
      const distPath = path.join(rootDir, 'dist');
      if (!fs.existsSync(distPath)) {
        throw new Error('Build failed - dist directory not found');
      }

      log(`✅ Local deployment completed in ${((Date.now() - this.startTime) / 1000).toFixed(2)}s`, 'green');
      log(`📦 Build output: ${distPath}`, 'cyan');

      return {
        success: true,
        version: versionInfo.version,
        buildPath: distPath
      };

    } catch (error) {
      log(`❌ Local deployment failed: ${error.message}`, 'red');
      throw error;
    }
  }

  // Deploy to server
  async deployServer(serverConfig = {}) {
    try {
      log('\n🚀 Starting SERVER deployment...', 'bright');

      // Deploy local first
      const localResult = await this.deployLocal();

      const {
        serverHost = 'dev-server',
        serverUser = 'armando-entersys',
        serverZone = 'us-central1-c',
        remotePath = '/srv/servicios/entersys-frontend'
      } = serverConfig;

      // Copy source code to server
      this.exec(
        `gcloud compute scp --recurse src/ ${serverUser}@${serverHost}:/tmp/frontend-src-${this.deployId}/ --zone=${serverZone}`,
        'Copying source code to server'
      );

      // Copy build files to server
      this.exec(
        `gcloud compute scp --recurse dist/* ${serverUser}@${serverHost}:/tmp/frontend-dist-${this.deployId}/ --zone=${serverZone}`,
        'Copying build files to server'
      );

      // Execute server-side deployment
      const serverCommands = [
        `mkdir -p /tmp/frontend-dist-${this.deployId}`,
        `cd ${remotePath}`,
        `sudo cp -r /tmp/frontend-src-${this.deployId}/* src/ || true`,
        `sudo chown -R ajcortest:ajcortest src/`,
        `sudo docker compose down`,
        `sudo docker compose up -d --build`,
        `sudo rm -rf /tmp/frontend-src-${this.deployId}`,
        `sudo rm -rf /tmp/frontend-dist-${this.deployId}`
      ].join(' && ');

      this.exec(
        `gcloud compute ssh ${serverUser}@${serverHost} --zone=${serverZone} --command="${serverCommands}"`,
        'Deploying to server'
      );

      const totalTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
      log(`\n🎉 SERVER deployment completed successfully!`, 'green');
      log(`⏱️  Total deployment time: ${totalTime}s`, 'cyan');
      log(`🌐 Version ${localResult.version} is now live!`, 'bright');

      return {
        success: true,
        version: localResult.version,
        deployTime: totalTime,
        deployId: this.deployId
      };

    } catch (error) {
      log(`❌ Server deployment failed: ${error.message}`, 'red');
      throw error;
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'local';

  const deployer = new DeployManager();

  try {
    switch (command) {
      case 'local':
        await deployer.deployLocal();
        break;

      case 'server':
        await deployer.deployServer();
        break;

      case 'help':
        log('\n📖 Deploy Script Usage:', 'bright');
        log('  node scripts/deploy.js local   - Build and deploy locally', 'cyan');
        log('  node scripts/deploy.js server  - Build and deploy to server', 'cyan');
        log('  node scripts/deploy.js help    - Show this help', 'cyan');
        break;

      default:
        log(`❌ Unknown command: ${command}`, 'red');
        log('Use "help" to see available commands', 'yellow');
        process.exit(1);
    }
  } catch (error) {
    log(`\n💥 Deployment failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DeployManager;