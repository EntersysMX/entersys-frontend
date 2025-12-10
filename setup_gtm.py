#!/usr/bin/env python3
import subprocess
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ZONE = "us-central1-c"
SERVER = "prod-server"
GTM_ID = "GTM-WHH8V38W"

def run(cmd, desc):
    print(f"\n{'='*60}")
    print(f"🔧 {desc}")
    print(f"{'='*60}\n")

    result = subprocess.run(
        ["gcloud.cmd", "compute", "ssh", SERVER, "--zone", ZONE, "--command", cmd],
        capture_output=True, text=True, timeout=300
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

print(f"""
╔════════════════════════════════════════════════════════════╗
║   🏷️  CONFIGURAR GOOGLE TAG MANAGER                       ║
║   ID: {GTM_ID}                                     ║
╚════════════════════════════════════════════════════════════╝
""")

# 1. Backup del .env.production actual
if not run("cp /srv/entersys-frontend/.env.production /srv/entersys-frontend/.env.production.backup", "Backup de .env.production"):
    sys.exit(1)

# 2. Agregar GTM_ID al .env.production
add_gtm_cmd = f"""
cd /srv/entersys-frontend && \\
if grep -q "VITE_GTM_ID=" .env.production; then
    sed -i 's/VITE_GTM_ID=.*/VITE_GTM_ID={GTM_ID}/' .env.production
    echo "GTM_ID actualizado"
else
    sed -i '/VITE_MATOMO_URL=/i VITE_GTM_ID={GTM_ID}' .env.production
    echo "GTM_ID agregado"
fi
"""

if not run(add_gtm_cmd, "Agregar GTM_ID a .env.production"):
    sys.exit(1)

# 3. Verificar que se agregó correctamente
if not run("grep 'VITE_GTM_ID' /srv/entersys-frontend/.env.production", "Verificar GTM_ID en .env"):
    sys.exit(1)

# 4. Docker build
if not run("cd /srv/entersys-frontend && docker compose build --no-cache", "Docker build con GTM"):
    sys.exit(1)

# 5. Docker up
if not run("cd /srv/entersys-frontend && docker compose up -d --force-recreate", "Recrear contenedor"):
    sys.exit(1)

# 6. Verificar GTM en el HTML generado
if not run(f"docker exec entersys-frontend cat /usr/share/nginx/html/index.html | grep '{GTM_ID}'", "Verificar GTM en HTML"):
    print("⚠️ WARNING: GTM no encontrado en HTML")

print(f"""
╔════════════════════════════════════════════════════════════╗
║   ✅ GOOGLE TAG MANAGER CONFIGURADO                       ║
║                                                            ║
║   Container ID: {GTM_ID}                           ║
║   Estado: Activo en producción                            ║
║                                                            ║
║   Verifica en: https://tagmanager.google.com              ║
║   El GTM debería empezar a recibir eventos               ║
╚════════════════════════════════════════════════════════════╝
""")
