# 🚀 DEPLOY MANUAL TEMPORAL

## ✅ PROBLEMA IDENTIFICADO
- SSH keys no configurados en GitHub Secrets
- `SERVER_USER` y `SERVER_SSH_KEY` están vacíos o incorrectos
- Necesitas acceso de administrador al repositorio GitHub para configurar secrets

## 🔧 SOLUCIÓN INMEDIATA

### 1. Configurar GitHub Secrets
Ve a: https://github.com/EntersysMX/entersys-frontend/settings/secrets/actions

Crea estos secrets:
- `SERVER_USER`: usuario del servidor (ej: entersys, ubuntu, root)
- `SERVER_SSH_KEY`: clave SSH privada completa (incluir -----BEGIN/END-----)

### 2. Deploy Manual Alternativo
Mientras tanto, sube estos archivos manualmente al servidor:

```bash
# En el servidor (34.134.14.202)
cd /srv/servicios/entersys-frontend/dist/

# Reemplazar estos archivos:
- index.html (con hotfix incluido)
- assets/index-0abe8484.js (nuevo bundle sin analytics legacy)
- assets/index-6332d119.css
- hotfix.js
```

### 3. Verificar que funciona
Una vez subidos los archivos, el formulario y WhatsApp deberían funcionar sin errores de CORS.

## 📁 ARCHIVOS LISTOS PARA SUBIR
Los archivos están compilados en: `C:\Web_Entersys\entersys-frontend\dist\`

- `index.html` - Con hotfix anti-CORS
- `assets/index-0abe8484.js` - Nuevo código con Mautic
- `hotfix.js` - Bloquea APIs legacy