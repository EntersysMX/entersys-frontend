#!/usr/bin/env python3
import subprocess
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("""
╔════════════════════════════════════════════════════════════╗
║   🔍 VERIFICACIÓN DE TAGS - ENTERSYS                      ║
╚════════════════════════════════════════════════════════════╝

Esperando a que GTM se propague (30 segundos)...
""")

time.sleep(30)

print("\n1️⃣  Verificando GA4 (G-3468MEXLPS)...\n")
result = subprocess.run(
    ["curl", "-s", "https://www.entersys.mx"],
    capture_output=True, text=True, timeout=15
)

if "G-3468MEXLPS" in result.stdout:
    print("✅ GA4 Detectado: G-3468MEXLPS")
else:
    print("❌ GA4 NO detectado (puede tardar unos minutos)")

print("\n2️⃣  Verificando Facebook Pixel (751110980341196)...\n")
if "751110980341196" in result.stdout:
    print("✅ Facebook Pixel Detectado: 751110980341196")
else:
    print("❌ Facebook Pixel NO detectado (puede tardar unos minutos)")

print("\n3️⃣  Verificando script de Facebook...\n")
if "fbevents.js" in result.stdout:
    print("✅ Script fbevents.js cargado")
else:
    print("❌ Script fbevents.js NO encontrado")

print("""
╔════════════════════════════════════════════════════════════╗
║   📋 SIGUIENTE PASO                                       ║
║                                                            ║
║   1. Abre https://www.entersys.mx en Chrome               ║
║   2. Presiona F12 (DevTools)                              ║
║   3. Ve a la pestaña "Console"                            ║
║   4. Ejecuta: console.log(window.dataLayer)               ║
║   5. Ejecuta: console.log(typeof fbq)                     ║
║                                                            ║
║   Deberías ver el dataLayer con eventos y fbq definido   ║
╚════════════════════════════════════════════════════════════╝
""")
