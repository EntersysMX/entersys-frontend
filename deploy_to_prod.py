#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deploy script para entersys-frontend en producción
Usa Google Cloud CLI para conectarse al servidor de producción
"""

import subprocess
import sys
import time
import io

# Fix encoding for Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configuración
ZONE = "us-central1-c"
SERVER = "prod-server"
PROJECT_DIR = "/srv/entersys-frontend"

def run_ssh_command(command, description):
    """Ejecuta un comando en el servidor de producción via SSH"""
    print(f"\n{'='*60}")
    print(f"🔧 {description}")
    print(f"{'='*60}")

    # Use gcloud.cmd on Windows
    gcloud_cmd = "gcloud.cmd" if sys.platform == "win32" else "gcloud"

    full_command = [
        gcloud_cmd, "compute", "ssh", SERVER,
        "--zone", ZONE,
        "--command", command
    ]

    print(f"Ejecutando: {command[:100]}...")

    try:
        result = subprocess.run(
            full_command,
            capture_output=True,
            text=True,
            timeout=300
        )

        if result.stdout:
            print(result.stdout)

        if result.stderr and "Warning" not in result.stderr:
            print("STDERR:", result.stderr)

        if result.returncode != 0:
            print(f"❌ Error (código {result.returncode})")
            return False

        print(f"✅ {description} completado")
        return True

    except subprocess.TimeoutExpired:
        print("❌ Timeout - el comando tardó demasiado")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║   🚀 DEPLOY ENTERSYS FRONTEND A PRODUCCIÓN                ║
    ║                                                            ║
    ║   Servidor: prod-server (34.59.193.54)                    ║
    ║   Proyecto: /srv/entersys-frontend                        ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    """)

    steps = [
        # Paso 1: Verificar directorio
        {
            "command": f"cd {PROJECT_DIR} && pwd",
            "description": "Verificar directorio del proyecto"
        },

        # Paso 2: Stash cambios locales
        {
            "command": f"cd {PROJECT_DIR} && git stash",
            "description": "Guardar cambios locales (stash)"
        },

        # Paso 3: Pull últimos cambios
        {
            "command": f"cd {PROJECT_DIR} && git pull origin main",
            "description": "Descargar últimos cambios desde GitHub"
        },

        # Paso 4: Instalar dependencias
        {
            "command": f"cd {PROJECT_DIR} && npm ci",
            "description": "Instalar dependencias de Node.js"
        },

        # Paso 5: Build de la aplicación
        {
            "command": f"cd {PROJECT_DIR} && npm run build",
            "description": "Build de la aplicación (Vite)"
        },

        # Paso 6: Verificar que el build existe
        {
            "command": f"cd {PROJECT_DIR} && ls -lh dist/",
            "description": "Verificar directorio dist/"
        },

        # Paso 7: Restart contenedor Docker
        {
            "command": "cd /srv/entersys-frontend && docker compose restart entersys-frontend",
            "description": "Reiniciar contenedor Docker"
        },

        # Paso 8: Verificar estado del contenedor
        {
            "command": "docker ps | grep entersys-frontend",
            "description": "Verificar que el contenedor esté corriendo"
        }
    ]

    # Ejecutar todos los pasos
    for i, step in enumerate(steps, 1):
        print(f"\n📍 PASO {i}/{len(steps)}")
        time.sleep(1)  # Pequeña pausa entre comandos

        success = run_ssh_command(
            step["command"],
            step["description"]
        )

        if not success:
            print(f"\n❌ Deploy falló en el paso {i}: {step['description']}")
            print("\n🔍 Revisa los logs arriba para más detalles")
            sys.exit(1)

    print("""

    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║   ✅ DEPLOY COMPLETADO EXITOSAMENTE                       ║
    ║                                                            ║
    ║   El tracking de referrer y UTM ahora está activo en:     ║
    ║   https://entersys.mx/contacto                            ║
    ║                                                            ║
    ║   Próximos leads capturarán:                              ║
    ║   • Referrer URL (de dónde vienen)                        ║
    ║   • Landing Page (primera página visitada)                ║
    ║   • UTM Parameters (source, medium, campaign, etc.)       ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    """)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Deploy cancelado por el usuario")
        sys.exit(1)
