# Guía Completa de Configuración de Mautic CRM

**Fecha:** 13 de Octubre de 2025
**Servidor:** prod-server (34.59.193.54)
**URL Mautic:** https://crm.entersys.mx
**URL Web:** https://www.entersys.mx

---

## Índice

1. [Estado Actual de la Instalación](#1-estado-actual-de-la-instalación)
2. [Verificación de Acceso](#2-verificación-de-acceso)
3. [Configuración de CORS (Cross-Origin)](#3-configuración-de-cors-cross-origin)
4. [Configuración del Formulario de Contacto](#4-configuración-del-formulario-de-contacto)
5. [Configuración de API OAuth2](#5-configuración-de-api-oauth2)
6. [Configuración de Tracking](#6-configuración-de-tracking)
7. [Configuración de Segmentos](#7-configuración-de-segmentos)
8. [Configuración de Lead Scoring](#8-configuración-de-lead-scoring)
9. [Verificación de la Integración](#9-verificación-de-la-integración)
10. [Monitoreo y Mantenimiento](#10-monitoreo-y-mantenimiento)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Estado Actual de la Instalación

### Información del Servidor

```yaml
Contenedor: mautic_app
Imagen: mautic/mautic:v4-apache
Estado: Running (35+ horas)
URL: https://crm.entersys.mx
Base de Datos: mautic_db (MySQL 5.7)
```

### Configuración Actual Verificada

```php
site_url: 'https://crm.entersys.mx'
db_table_prefix: 'entersys'
mailer_from_email: 'armando.cortes@entersys.mx'
mailer_transport: 'gmail'
cookie_secure: true
locale: 'en_US'
trusted_proxies: ['172.16.0.0/12']
```

### Integración Web Actual

```javascript
// Frontend configurado para usar:
VITE_MAUTIC_URL=https://crm.entersys.mx
Form ID: 1
Backend API: https://api.entersys.mx/api
```

---

## 2. Verificación de Acceso

### 2.1 Verificar que Mautic está Accesible

**Paso 1:** Abre tu navegador y accede a:
```
https://crm.entersys.mx
```

**Resultado esperado:** Deberías ver la página de login de Mautic.

### 2.2 Iniciar Sesión

**Paso 1:** Ingresa tus credenciales de administrador.

**Nota:** Si es la primera vez que accedes o no recuerdas las credenciales, necesitarás crear un usuario administrador desde el contenedor:

```bash
# Conectarse al servidor de producción
gcloud compute ssh prod-server --zone=us-central1-c

# Crear usuario administrador en Mautic
docker exec -it mautic_app php /var/www/html/bin/console mautic:user:create \
  --username=admin \
  --email=admin@entersys.mx \
  --password=TuPasswordSeguro123! \
  --firstname=Admin \
  --lastname=Entersys \
  --role=administrator
```

**Paso 2:** Una vez dentro, verifica que estás en el dashboard principal de Mautic.

---

## 3. Configuración de CORS (Cross-Origin)

Para que tu sitio web (www.entersys.mx) pueda comunicarse con Mautic (crm.entersys.mx), necesitas configurar CORS.

### 3.1 Configurar CORS en Mautic

**Paso 1:** En Mautic, ve a **Settings** (⚙️ en la esquina superior derecha) → **Configuration**

**Paso 2:** En la pestaña **System Settings**, busca la sección **CORS Settings**

**Paso 3:** Configura los siguientes valores:

```
CORS Restrict Domains: No
Valid Domains: https://www.entersys.mx
```

**Alternativa más específica:**

Si prefieres ser más específico, puedes agregar una lista de dominios permitidos en el archivo de configuración:

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Editar el archivo .htaccess de Mautic
docker exec -it mautic_app bash

# Agregar headers CORS al inicio del archivo .htaccess
cat >> /var/www/html/.htaccess << 'EOF'
# CORS Headers para www.entersys.mx
<IfModule mod_headers.c>
    SetEnvIf Origin "^https://www\.entersys\.mx$" ORIGIN_DOMAIN=$0
    Header set Access-Control-Allow-Origin "%{ORIGIN_DOMAIN}e" env=ORIGIN_DOMAIN
    Header set Access-Control-Allow-Credentials "true"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</IfModule>
EOF

exit
```

**Paso 4:** Reinicia el contenedor de Mautic:

```bash
docker restart mautic_app
```

### 3.2 Verificar Configuración CORS

```bash
# Desde tu computadora local, ejecuta:
curl -I -X OPTIONS https://crm.entersys.mx/form/submit \
  -H "Origin: https://www.entersys.mx" \
  -H "Access-Control-Request-Method: POST"
```

**Resultado esperado:** Deberías ver headers que incluyan `Access-Control-Allow-Origin`.

---

## 4. Configuración del Formulario de Contacto

Tu sitio web está configurado para usar el Form ID 1. Necesitas crear o verificar este formulario en Mautic.

### 4.1 Crear Formulario de Contacto

**Paso 1:** En Mautic, ve a **Components** → **Forms**

**Paso 2:** Haz clic en **New** para crear un nuevo formulario

**Paso 3:** Configura el formulario:

```
Name: Formulario de Contacto Entersys
Form Type: Campaign Form
Description: Formulario principal de contacto del sitio web
```

**Paso 4:** Agrega los siguientes campos:

| Campo | Tipo | Label | Alias | Requerido |
|-------|------|-------|-------|-----------|
| Nombre | Text | Nombre | nombre | Sí |
| Email | Email | Email | email | Sí |
| Teléfono | Tel | Teléfono | telefono | No |
| Empresa | Text | Empresa | empresa | No |
| Mensaje | Textarea | Mensaje | mensaje | No |
| Producto | Select | Producto de Interés | producto | No |

**Paso 5:** Para el campo "Producto", agrega las opciones:

```
- Worksys
- Expersys
- Consultoría
- Otro
```

**Paso 6:** En la pestaña **Actions**, agrega las siguientes acciones:

1. **Add Contact to Segment** → Selecciona "Leads Web Entersys"
2. **Send Email** → Crea un email de bienvenida (opcional)
3. **Add Points** → Configura +10 puntos

**Paso 7:** Haz clic en **Save & Close**

**Paso 8:** **IMPORTANTE** - Verifica el ID del formulario:

- En la lista de formularios, el número que aparece en la primera columna es el Form ID
- **Si el Form ID no es 1**, necesitarás actualizar el código del frontend

### 4.2 Actualizar Form ID en el Frontend (si es necesario)

Si el Form ID no es 1, edita el archivo `src/config/mautic.js`:

```javascript
export const MAUTIC_CONFIG = {
  formId: 2, // Cambiar al ID correcto
  // ... resto de la configuración
};
```

### 4.3 Configurar Kiosk Mode (importante para formularios externos)

**Paso 1:** En el formulario, ve a la pestaña **Settings**

**Paso 2:** Activa las siguientes opciones:

```
✓ Kiosk Mode (permite envíos sin autenticación)
✓ No index (evita indexación en buscadores)
```

---

## 5. Configuración de API OAuth2

Tu código frontend usa credenciales OAuth2 para comunicarse con la API de Mautic. Necesitas crear estas credenciales.

### 5.1 Crear Credenciales OAuth2

**Paso 1:** En Mautic, ve a **Settings** (⚙️) → **API Credentials**

**Paso 2:** Haz clic en **New**

**Paso 3:** Configura los siguientes valores:

```
Name: Frontend Entersys Web
Authorization Protocol: OAuth 2
Redirect URI: https://www.entersys.mx/oauth/callback
Is Published: Yes
```

**Paso 4:** Haz clic en **Save & Close**

**Paso 5:** Mautic generará:
- **Client ID** (Public Key)
- **Client Secret** (Secret Key)

**Paso 6:** **IMPORTANTE** - Copia estas credenciales

### 5.2 Actualizar Credenciales en el Frontend

Edita el archivo `src/config/mautic.js` y actualiza las credenciales:

```javascript
export const MAUTIC_CONFIG = {
  // ...
  clientId: 'TU_CLIENT_ID_AQUI',
  clientSecret: 'TU_CLIENT_SECRET_AQUI',
  // ...
};
```

**NOTA DE SEGURIDAD:**
- Las credenciales OAuth2 actuales en el código son de ejemplo
- **NUNCA** expongas el Client Secret en el código del frontend
- Considera mover la autenticación OAuth2 al backend (API)

### 5.3 Configuración Recomendada (Más Segura)

Para mayor seguridad, la autenticación OAuth2 debería manejarse desde el backend:

**Backend (API):**
```python
# Archivo: backend/mautic_auth.py
MAUTIC_CLIENT_ID = os.environ.get('MAUTIC_CLIENT_ID')
MAUTIC_CLIENT_SECRET = os.environ.get('MAUTIC_CLIENT_SECRET')
```

**Frontend:**
```javascript
// NO incluir client_secret en el frontend
// Usar solo el endpoint del backend
const response = await fetch('/api/mautic/submit-lead', {
  method: 'POST',
  body: JSON.stringify(leadData)
});
```

---

## 6. Configuración de Tracking

El tracking permite seguir la actividad de los visitantes en tu sitio web.

### 6.1 Obtener el Código de Tracking

**Paso 1:** En Mautic, ve a **Settings** (⚙️) → **Configuration** → **Tracking Settings**

**Paso 2:** Copia el código de tracking JavaScript que aparece:

```javascript
(function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
    w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
    m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://crm.entersys.mx/mtc.js','mt');

mt('send', 'pageview');
```

### 6.2 Implementar Tracking en el Frontend

**Opción A: Via index.html (Recomendado)**

Crea un nuevo plugin de Vite para inyectar el tracking de Mautic:

```bash
# Crear archivo vite-plugins/mautic-tracking-plugin.js
```

```javascript
export function mauticTrackingPlugin() {
  let viteMode = 'development';

  return {
    name: 'vite-plugin-mautic-tracking',

    configResolved(config) {
      viteMode = config.mode;
    },

    transformIndexHtml(html) {
      // Solo inyectar en producción
      if (viteMode === 'production') {
        const trackingScript = `
    <!-- Mautic Tracking -->
    <script>
    (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
        m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://crm.entersys.mx/mtc.js','mt');

    mt('send', 'pageview');
    </script>
    <!-- End Mautic Tracking -->`;

        html = html.replace('</head>', `${trackingScript}\n  </head>`);
      }

      return html;
    }
  };
}
```

**Actualizar vite.config.js:**

```javascript
import { mauticTrackingPlugin } from './vite-plugins/mautic-tracking-plugin.js'

export default defineConfig({
  plugins: [
    react(),
    // ... otros plugins
    mauticTrackingPlugin()
  ],
  // ...
})
```

**Opción B: Via useEffect en App.jsx (Alternativa)**

Si prefieres control programático, puedes agregar el tracking en `src/App.jsx`:

```javascript
import { useEffect } from 'react';
import { config } from './config/environment';

function App() {
  useEffect(() => {
    if (config.analytics.enabled && config.analytics.mautic.url) {
      // Cargar script de tracking de Mautic
      const script = document.createElement('script');
      script.async = true;
      script.src = `${config.analytics.mautic.url}/mtc.js`;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.mt) {
          window.mt('send', 'pageview');
        }
      };
    }
  }, []);

  // ... resto del componente
}
```

### 6.3 Configurar Tracking Settings en Mautic

**Paso 1:** Ve a **Settings** → **Configuration** → **Tracking Settings**

**Paso 2:** Configura:

```
Track Page Visits: Yes
Track Identified Visitors Only: No (para trackear visitantes anónimos)
Track Page Hits: Yes
Track UTM Tags: Yes
Track by Fingerprint: Yes
```

---

## 7. Configuración de Segmentos

Los segmentos permiten agrupar contactos según criterios específicos.

### 7.1 Crear Segmento "Leads Web Entersys"

**Paso 1:** Ve a **Segments** → **New**

**Paso 2:** Configura:

```
Name: Leads Web Entersys
Description: Todos los leads que vienen del sitio web
Is Published: Yes
```

**Paso 3:** Agrega filtros:

```
Filter 1: Form → Equals → Formulario de Contacto Entersys
```

**Paso 4:** Haz clic en **Save & Close**

### 7.2 Crear Segmento "Interesados en Worksys"

**Paso 1:** Crea un nuevo segmento:

```
Name: Interesados en Worksys
Filter 1: Form Field Value → producto → Equals → Worksys
```

### 7.3 Crear Segmento "Leads Calientes"

**Paso 1:** Crea un nuevo segmento:

```
Name: Leads Calientes
Filter 1: Points → Greater than → 50
```

---

## 8. Configuración de Lead Scoring

El lead scoring asigna puntos a los contactos según sus acciones.

### 8.1 Crear Reglas de Puntuación

**Paso 1:** Ve a **Components** → **Points** → **Manage Actions**

**Paso 2:** Haz clic en **New**

**Paso 3:** Crea las siguientes reglas:

#### Regla 1: Envío de Formulario de Contacto

```
Name: Envío Formulario Contacto
Type: Form submission
Form: Formulario de Contacto Entersys
Points: +15
```

#### Regla 2: Visita a Página de Servicios

```
Name: Visita Página Worksys
Type: Page Hit
URL: https://www.entersys.mx/worksys
Points: +5
```

#### Regla 3: Visita a Página de Contacto

```
Name: Visita Página Contacto
Type: Page Hit
URL: https://www.entersys.mx/contacto
Points: +3
```

#### Regla 4: Click en WhatsApp

Esta regla requiere tracking de eventos desde el frontend. El código actual ya lo tiene implementado en `src/services/mautic.js`:

```javascript
trackWhatsAppClick: async (phoneNumber) => {
  // Trackea el evento en Mautic via backend API
}
```

```
Name: Click WhatsApp
Type: Custom Event (vía API)
Points: +8
```

### 8.2 Configurar Decremento de Puntos

Para leads inactivos, configura decremento automático:

**Paso 1:** Ve a **Points** → **Manage Triggers**

**Paso 2:** Crea un trigger:

```
Name: Decrementar por Inactividad
Type: Points
When a contact reaches this score: 30 days inactive
Action: Adjust contact points
Points: -10
```

---

## 9. Verificación de la Integración

Ahora vamos a verificar que todo funciona correctamente.

### 9.1 Verificar Formulario desde la Web

**Paso 1:** Abre tu sitio web: https://www.entersys.mx/contacto

**Paso 2:** Llena el formulario de contacto con datos de prueba

**Paso 3:** Envía el formulario

**Paso 4:** En Mautic, ve a **Contacts** y busca el email que ingresaste

**Resultado esperado:**
- Deberías ver el nuevo contacto en la lista
- El contacto debe tener 15 puntos (por el envío del formulario)
- El contacto debe estar en el segmento "Leads Web Entersys"

### 9.2 Verificar Tracking de Páginas

**Paso 1:** Con el navegador en modo incógnito, visita varias páginas de tu sitio:
- https://www.entersys.mx
- https://www.entersys.mx/worksys
- https://www.entersys.mx/contacto

**Paso 2:** En Mautic, ve a **Contacts** → **Anonymous**

**Resultado esperado:** Deberías ver un visitante anónimo con las páginas visitadas registradas.

### 9.3 Verificar Tracking de WhatsApp

**Paso 1:** En tu sitio web, haz click en el botón flotante de WhatsApp

**Paso 2:** Revisa la consola del navegador (F12)

**Resultado esperado:** Deberías ver mensajes de log indicando que el evento fue enviado.

### 9.4 Verificar API Backend

**Paso 1:** Verifica que el backend de Entersys esté recibiendo y procesando las peticiones:

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Ver logs del backend
docker logs entersys-content-api --tail 100 -f
```

**Paso 2:** Envía un formulario desde la web y observa los logs

**Resultado esperado:** Deberías ver las peticiones POST al endpoint de leads.

---

## 10. Monitoreo y Mantenimiento

### 10.1 Revisar Dashboard Diariamente

**Métricas clave a monitorear:**
- Número de nuevos contactos (día/semana/mes)
- Formularios enviados
- Tasa de conversión
- Puntos promedio de los leads
- Leads calientes (>50 puntos)

### 10.2 Limpiar Base de Datos Regularmente

**Comando para limpiar visitantes anónimos antiguos:**

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Limpiar visitantes anónimos de más de 90 días
docker exec mautic_app php /var/www/html/bin/console mautic:maintenance:cleanup --days-old=90
```

### 10.3 Backup de Mautic

**Script de backup (ejecutar semanalmente):**

```bash
#!/bin/bash
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/srv/backups/mautic"

mkdir -p $BACKUP_DIR

# Backup de base de datos
docker exec mautic_db mysqldump -u mautic -pMauticUserPassEntersysCRM321 mautic \
  > $BACKUP_DIR/mautic_db_$BACKUP_DATE.sql

# Backup de archivos media
docker cp mautic_app:/var/www/html/media $BACKUP_DIR/mautic_media_$BACKUP_DATE/

# Comprimir
tar -czf $BACKUP_DIR/mautic_backup_$BACKUP_DATE.tar.gz \
  $BACKUP_DIR/mautic_db_$BACKUP_DATE.sql \
  $BACKUP_DIR/mautic_media_$BACKUP_DATE/

# Limpiar archivos temporales
rm -rf $BACKUP_DIR/mautic_db_$BACKUP_DATE.sql
rm -rf $BACKUP_DIR/mautic_media_$BACKUP_DATE/

echo "Backup completado: mautic_backup_$BACKUP_DATE.tar.gz"
```

### 10.4 Actualizar Mautic

**Antes de actualizar:**
1. Hacer backup completo
2. Probar en ambiente de staging primero
3. Revisar changelog de Mautic

**Comando de actualización:**

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Detener contenedor
cd /srv/servicios/mautic
docker compose down

# Actualizar imagen
docker compose pull

# Iniciar con nueva versión
docker compose up -d

# Ver logs
docker logs mautic_app -f
```

---

## 11. Troubleshooting

### Problema 1: Formulario no se envía (Error CORS)

**Síntomas:**
- Error en consola: "Access to fetch has been blocked by CORS policy"
- Formulario no llega a Mautic

**Solución:**
1. Verificar configuración CORS en sección 3
2. Revisar que el dominio www.entersys.mx está en la lista de dominios permitidos
3. Verificar que el archivo .htaccess tiene los headers correctos

**Test:**
```bash
curl -I -X OPTIONS https://crm.entersys.mx/form/submit \
  -H "Origin: https://www.entersys.mx" \
  -H "Access-Control-Request-Method: POST"
```

### Problema 2: Tracking no funciona

**Síntomas:**
- No aparecen visitantes en Mautic
- No se registran page views

**Solución:**
1. Verificar que el script mtc.js se carga:
   - Abrir DevTools → Network → Buscar "mtc.js"
   - Debe aparecer con status 200

2. Verificar que VITE_MAUTIC_URL está configurado en producción

3. Revisar configuración de tracking en Mautic (sección 6.3)

### Problema 3: Contactos no reciben puntos

**Síntomas:**
- Contactos aparecen con 0 puntos
- Acciones no triggean puntos

**Solución:**
1. Verificar que las reglas de puntos están publicadas
2. Revisar que los eventos se están enviando correctamente
3. Verificar logs del backend:
   ```bash
   docker logs entersys-content-api --tail 100
   ```

### Problema 4: Emails no se envían

**Síntomas:**
- Acciones de "Send Email" no funcionan
- Contactos no reciben emails

**Solución:**
1. Verificar configuración de mailer en Mautic:
   - Settings → Configuration → Email Settings
   - Test Connection debe ser exitoso

2. Revisar cola de emails:
   ```bash
   docker exec mautic_app php /var/www/html/bin/console mautic:emails:send
   ```

3. Verificar que la contraseña de aplicación de Gmail es válida

### Problema 5: Base de datos llena

**Síntomas:**
- Mautic lento
- Errores de espacio en disco

**Solución:**
```bash
# Limpiar datos antiguos
docker exec mautic_app php /var/www/html/bin/console mautic:maintenance:cleanup --days-old=90

# Limpiar visitantes anónimos
docker exec mautic_app php /var/www/html/bin/console mautic:unusedip:delete

# Optimizar tablas de base de datos
docker exec mautic_db mysql -u mautic -pMauticUserPassEntersysCRM321 mautic \
  -e "OPTIMIZE TABLE entersys_page_hits, entersys_lead_event_log;"
```

### Problema 6: Contenedor no inicia

**Síntomas:**
- docker ps no muestra mautic_app
- docker logs muestra errores

**Solución:**
```bash
# Ver logs completos
docker logs mautic_app --tail 200

# Verificar conexión a base de datos
docker exec mautic_db mysql -u mautic -pMauticUserPassEntersysCRM321 -e "SHOW DATABASES;"

# Reiniciar servicios
cd /srv/servicios/mautic
docker compose down
docker compose up -d

# Si persiste, recrear contenedores
docker compose down -v  # ¡CUIDADO! Esto borra los volúmenes
docker compose up -d
```

---

## Checklist de Configuración Completa

Usa este checklist para verificar que todo está configurado correctamente:

### Acceso y Configuración Básica
- [ ] Puedo acceder a https://crm.entersys.mx
- [ ] Tengo credenciales de administrador
- [ ] Configuré el idioma y zona horaria
- [ ] Configuré el mailer (Gmail)

### CORS y Seguridad
- [ ] Configuré CORS para www.entersys.mx
- [ ] Verifiqué headers CORS con curl
- [ ] Cookie secure está habilitado

### Formularios
- [ ] Creé el formulario de contacto (ID 1)
- [ ] Activé Kiosk Mode
- [ ] Agregué todos los campos necesarios
- [ ] Configuré acciones del formulario

### API OAuth2
- [ ] Creé credenciales OAuth2 en Mautic
- [ ] Actualicé las credenciales en el código (o backend)
- [ ] Configuré redirect URI correctamente

### Tracking
- [ ] Implementé el código de tracking
- [ ] Verifiqué que mtc.js se carga
- [ ] Configuré tracking settings en Mautic
- [ ] Probé tracking con visitante anónimo

### Segmentos
- [ ] Creé segmento "Leads Web Entersys"
- [ ] Creé segmento "Interesados en Worksys"
- [ ] Creé segmento "Leads Calientes"

### Lead Scoring
- [ ] Configuré puntos para formulario (+15)
- [ ] Configuré puntos para visitas (+3-5)
- [ ] Configuré puntos para WhatsApp (+8)
- [ ] Configuré decremento por inactividad (-10)

### Testing y Verificación
- [ ] Envié formulario de prueba y apareció en Mautic
- [ ] Verifiqué que se asignan puntos correctamente
- [ ] Probé tracking de páginas
- [ ] Probé click en WhatsApp
- [ ] Revisé logs del backend

### Monitoreo
- [ ] Configuré backup semanal
- [ ] Documenté credenciales en lugar seguro
- [ ] Configuré alertas (opcional)
- [ ] Revisé dashboard y métricas

---

## Recursos Adicionales

### Documentación Oficial
- [Mautic Documentation](https://docs.mautic.org/)
- [Mautic API Documentation](https://developer.mautic.org/)
- [Mautic v4 Release Notes](https://github.com/mautic/mautic/releases)

### Comandos Útiles de Mautic

```bash
# Ver todos los comandos disponibles
docker exec mautic_app php /var/www/html/bin/console list

# Limpiar cache
docker exec mautic_app php /var/www/html/bin/console cache:clear

# Rebuild índices
docker exec mautic_app php /var/www/html/bin/console doctrine:migrations:migrate

# Ver estadísticas
docker exec mautic_app php /var/www/html/bin/console mautic:reports:scheduler

# Procesar colas
docker exec mautic_app php /var/www/html/bin/console mautic:campaigns:trigger
docker exec mautic_app php /var/www/html/bin/console mautic:emails:send

# Actualizar segmentos
docker exec mautic_app php /var/www/html/bin/console mautic:segments:update
```

### Archivos de Configuración Importantes

```
/var/www/html/app/config/local.php         # Configuración principal
/var/www/html/.htaccess                    # CORS y redirects
/var/www/html/var/logs/mautic_prod.php     # Logs de Mautic
```

---

## Soporte y Contacto

Si tienes problemas con la configuración:

1. **Revisar logs:**
   ```bash
   docker logs mautic_app --tail 200 -f
   docker logs mautic_db --tail 100 -f
   docker logs entersys-content-api --tail 100 -f
   ```

2. **Revisar documentación** de Mautic en https://docs.mautic.org/

3. **Revisar código** de integración en:
   - `src/services/mautic.js`
   - `src/config/mautic.js`
   - `src/components/pages/contacto/contact-06.jsx`

4. **Verificar variables de entorno** en el servidor:
   ```bash
   cat /srv/entersys-frontend/.env.production | grep MAUTIC
   ```

---

**Última actualización:** 13 de Octubre de 2025
**Autor:** Claude Code
**Versión:** 1.0
