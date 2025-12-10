#!/usr/bin/env python3
import subprocess
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ZONE = "us-central1-c"
SERVER = "prod-server"

def run(cmd, desc):
    print(f"\n{'='*60}")
    print(f"🔧 {desc}")
    print(f"{'='*60}\n")

    result = subprocess.run(
        ["gcloud.cmd", "compute", "ssh", SERVER, "--zone", ZONE, "--command", cmd],
        capture_output=True, text=True, timeout=600
    )

    if result.stdout:
        print(result.stdout)
    if result.stderr and "Warning" not in result.stderr:
        print("STDERR:", result.stderr)

    if result.returncode != 0:
        print(f"❌ Error (código {result.returncode})")
        return False

    print(f"✅ {desc} completado")
    return True

print("""
╔════════════════════════════════════════════════════════════╗
║   🚀 DEPLOY DIRECTO - REBUILD DOCKER                      ║
╚════════════════════════════════════════════════════════════╝
""")

# 1. Fix git permissions
if not run("sudo chown -R Usuario:Usuario /srv/entersys-frontend/.git", "Arreglar permisos de git"):
    print("⚠️ Warning: Could not fix git permissions, trying anyway...")

# 2. Git pull con sudo
if not run("cd /srv/entersys-frontend && sudo -u Usuario git pull origin main", "Git pull"):
    sys.exit(1)

# 3. Docker build
if not run("cd /srv/entersys-frontend && docker compose build --no-cache", "Docker build"):
    sys.exit(1)

# 4. Docker up
if not run("cd /srv/entersys-frontend && docker compose up -d --force-recreate", "Docker up"):
    sys.exit(1)

# 5. Verificar nginx headers
if not run("docker exec entersys-frontend grep 'Strict-Transport-Security' /etc/nginx/conf.d/default.conf", "Verificar security headers"):
    print("⚠️ WARNING: Security headers not found in nginx config")

# 6. Test redirect y headers
if not run("docker exec entersys-frontend curl -I http://localhost/nosotros.html 2>&1 | grep 'HTTP\\|Location\\|strict-transport'", "Test redirect"):
    print("⚠️ WARNING: Test failed")

print("""
╔════════════════════════════════════════════════════════════╗
║   ✅ DEPLOY COMPLETADO                                    ║
╚════════════════════════════════════════════════════════════╝
""")
