#!/usr/bin/env python3
import subprocess
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def run(cmd, desc):
    print(f"\n{'='*60}")
    print(f"🔧 {desc}")
    print(f"{'='*60}\n")

    result = subprocess.run(
        ["gcloud.cmd", "compute", "ssh", "prod-server", "--zone", "us-central1-c", "--command", cmd],
        capture_output=True, text=True, timeout=300
    )

    if result.stdout:
        print(result.stdout)
    if result.stderr and "Warning" not in result.stderr:
        print("STDERR:", result.stderr)

    if result.returncode != 0:
        print(f"❌ Error")
        return False

    print(f"✅ OK")
    return True

print("🏷️  Configurando GTM-WHH8V38W...\n")

# 1. Backup
run("cp /srv/entersys-frontend/.env.production /srv/entersys-frontend/.env.production.bak", "Backup")

# 2. Agregar línea GTM (simple append antes de MATOMO)
run("cd /srv/entersys-frontend && sed -i '0,/VITE_MATOMO_URL/s//VITE_GTM_ID=GTM-WHH8V38W\\n&/' .env.production", "Agregar GTM_ID")

# 3. Verificar
run("grep GTM /srv/entersys-frontend/.env.production", "Verificar GTM")

# 4. Build
run("cd /srv/entersys-frontend && docker compose build --no-cache 2>&1 | tail -5", "Docker build")

# 5. Up
run("cd /srv/entersys-frontend && docker compose up -d --force-recreate", "Docker up")

# 6. Test
run("docker exec entersys-frontend cat /usr/share/nginx/html/index.html | grep -o 'GTM-WHH8V38W' | head -1", "Verificar en HTML")

print("\n✅ GTM Configurado - Verifica en https://tagmanager.google.com")
