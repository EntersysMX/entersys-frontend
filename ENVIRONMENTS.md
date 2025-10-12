# Gestión de Ambientes - Entersys Frontend

Este documento describe cómo gestionar y usar los diferentes ambientes (development, staging, production) en el proyecto Entersys Frontend.

## 📋 Tabla de Contenidos

- [Ambientes Disponibles](#ambientes-disponibles)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Scripts NPM](#scripts-npm)
- [URLs por Ambiente](#urls-por-ambiente)
- [Cómo Agregar Nuevas Variables](#cómo-agregar-nuevas-variables)
- [Workflows de Deployment](#workflows-de-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🌍 Ambientes Disponibles

### 1. **Development** (Desarrollo Local)
- **Propósito**: Desarrollo local en tu máquina
- **Características**:
  - Debug habilitado
  - Console logs habilitados
  - Analytics desactivado
  - Errores detallados en consola

### 2. **Staging** (Ambiente de Pruebas)
- **Propósito**: Pruebas antes de producción, QA, demos a clientes
- **Características**:
  - Debug habilitado
  - Console logs habilitados
  - Analytics habilitado (con Site ID diferente)
  - Datos de prueba

### 3. **Production** (Producción)
- **Propósito**: Sitio en vivo para usuarios finales
- **Características**:
  - Debug desactivado
  - Console logs desactivados
  - Analytics habilitado (con Site ID de producción)
  - Performance monitoring habilitado

---

## ⚙️ Configuración de Variables de Entorno

### Archivos de Configuración

```
.env.development       # Variables para desarrollo (NO se sube a Git)
.env.staging          # Variables para staging (NO se sube a Git)
.env.production       # Variables para producción (NO se sube a Git)
.env.example          # Plantilla de ejemplo (SÍ se sube a Git)
```

### Primera Vez - Setup Inicial

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/armando-entersys/entersys-frontend.git
   cd entersys-frontend
   ```

2. **Crear archivos de ambiente**

   Ya existen los archivos `.env.development`, `.env.staging`, y `.env.production` configurados.

   Si necesitas recrearlos:
   ```bash
   cp .env.example .env.development
   cp .env.example .env.staging
   cp .env.example .env.production
   ```

3. **Configurar cada archivo con sus valores**

   Ver sección [URLs por Ambiente](#urls-por-ambiente) para los valores correctos.

---

## 🚀 Scripts NPM

### Development (Desarrollo)

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de desarrollo
npm run build:dev
```

### Staging (Pruebas)

```bash
# Iniciar en modo staging
npm run dev:staging

# Build de staging
npm run build:staging

# Preview de staging
npm run preview:staging
```

### Production (Producción)

```bash
# Iniciar en modo producción (para testing local)
npm run dev:prod

# Build de producción
npm run build:prod
# o simplemente
npm run build

# Preview de producción
npm run preview
```

---

## 🌐 URLs por Ambiente

### Development (dev-server: 34.134.14.202)

```env
VITE_APP_URL=https://dev.entersys.mx
VITE_API_URL=https://dev.entersys.mx/api
VITE_SITE_URL=https://dev.entersys.mx
VITE_MATOMO_URL=https://dev.entersys.mx/analytics
VITE_MAUTIC_URL=https://dev.entersys.mx/crm
```

### Staging (usa dev-server)

```env
VITE_APP_URL=https://dev.entersys.mx
VITE_API_URL=https://dev.entersys.mx/api
VITE_SITE_URL=https://dev.entersys.mx
VITE_MATOMO_URL=https://dev.entersys.mx/analytics
VITE_MAUTIC_URL=https://dev.entersys.mx/crm
```

### Production (prod-server: 34.59.193.54)

```env
VITE_APP_URL=https://entersys.mx
VITE_API_URL=https://entersys.mx/api
VITE_SITE_URL=https://entersys.mx
VITE_MATOMO_URL=https://entersys.mx/analytics
VITE_MAUTIC_URL=https://entersys.mx/crm
```

## 🖥️ Servidores

### Development Server (dev-server)
- **Hostname**: dev-server
- **Zone**: us-central1-c
- **Machine Type**: e2-standard-2
- **Internal IP**: 10.128.0.2
- **External IP**: 34.134.14.202
- **Domain**: dev.entersys.mx
- **Status**: RUNNING

### Production Server (prod-server)
- **Hostname**: prod-server
- **Zone**: us-central1-c
- **Machine Type**: e2-standard-2
- **Internal IP**: 10.128.0.4
- **External IP**: 34.59.193.54
- **Domain**: entersys.mx
- **Status**: RUNNING

---

## 🔧 Cómo Agregar Nuevas Variables

### 1. Agregar la variable a todos los archivos `.env.*`

```bash
# .env.development
VITE_NUEVA_VARIABLE=valor_dev

# .env.staging
VITE_NUEVA_VARIABLE=valor_staging

# .env.production
VITE_NUEVA_VARIABLE=valor_prod
```

**⚠️ IMPORTANTE**: Las variables DEBEN comenzar con `VITE_` para ser accesibles en el código.

### 2. Agregar a `.env.example` (con valores de ejemplo)

```bash
# .env.example
VITE_NUEVA_VARIABLE=valor_ejemplo
```

### 3. Actualizar `src/config/environment.js`

```javascript
export const config = {
  // ... configuración existente ...

  nuevaSeccion: {
    variable: import.meta.env.VITE_NUEVA_VARIABLE || 'valor_default',
  },
};
```

### 4. Usar en tu código

```javascript
import { config } from '@/config/environment';

function MiComponente() {
  const valor = config.nuevaSeccion.variable;
  console.log(valor);
}
```

---

## 📦 Workflows de Deployment

### Workflow Recomendado

```
Development → Staging → Production
```

### 1. Desarrollo Local

```bash
# Trabajar en rama de feature
git checkout -b feature/nueva-funcionalidad

# Desarrollar con hot-reload
npm run dev

# Commit changes
git add .
git commit -m "feat: nueva funcionalidad"

# Push a rama
git push origin feature/nueva-funcionalidad
```

### 2. Deploy a Staging (QA/Testing)

```bash
# Merge a rama staging
git checkout staging
git merge feature/nueva-funcionalidad

# Build de staging
npm run build:staging

# Deploy a servidor staging
npm run deploy:server
```

### 3. Deploy a Production

```bash
# Merge a main (después de QA en staging)
git checkout main
git merge staging

# Build de producción
npm run build:prod

# Deploy a producción
npm run deploy:server
```

---

## 🐛 Troubleshooting

### Las variables de entorno no se están cargando

**Problema**: Las variables aparecen como `undefined`

**Solución**:
1. Verificar que la variable comience con `VITE_`
2. Reiniciar el servidor de desarrollo (`Ctrl+C` y `npm run dev`)
3. Limpiar cache: `npm run clean && npm install`

### Los cambios en `.env` no se reflejan

**Problema**: Modificaste `.env.development` pero no ves los cambios

**Solución**:
1. **SIEMPRE** reiniciar el servidor después de modificar archivos `.env`
2. Vite solo lee estos archivos al inicio

### Error: "Cannot find module '@/config/environment'"

**Problema**: El alias `@/` no está configurado

**Solución**:
- Usar path relativo: `import { config } from '../config/environment'`
- O verificar `vite.config.js` para el alias

### Variables sensibles expuestas en el código

**Problema**: Credenciales o secrets aparecen en el bundle de producción

**Solución**:
1. **NUNCA** poner secrets en variables `VITE_*` (son públicas)
2. Usar el backend para manejar secrets
3. Variables `VITE_` son visibles en el browser

---

## 📊 Feature Flags

Las feature flags permiten habilitar/deshabilitar funcionalidades por ambiente:

```javascript
import { config } from '@/config/environment';

// Solo mostrar info de debug en desarrollo
if (config.features.debug) {
  console.log('Debug info:', data);
}

// Solo reportar errores en producción
if (config.features.errorReporting) {
  reportErrorToSentry(error);
}

// Mostrar versión solo si está habilitado
if (config.features.versionInfo) {
  console.log('App version:', config.app.version);
}
```

### Feature Flags Disponibles

| Flag | Development | Staging | Production |
|------|------------|---------|------------|
| `debug` | ✅ true | ✅ true | ❌ false |
| `consoleLogs` | ✅ true | ✅ true | ❌ false |
| `versionInfo` | ✅ true | ✅ true | ❌ false |
| `errorReporting` | ❌ false | ✅ true | ✅ true |
| `analytics` | ❌ false | ✅ true | ✅ true |
| `webVitals` | ✅ true | ✅ true | ✅ true |
| `performanceMonitoring` | ❌ false | ✅ true | ✅ true |

---

## 🔐 Seguridad

### ✅ Buenas Prácticas

- ✅ Los archivos `.env.*` están en `.gitignore`
- ✅ Solo `.env.example` se sube a Git
- ✅ Variables públicas comienzan con `VITE_`
- ✅ Secrets se manejan en el backend
- ✅ Diferentes credenciales por ambiente

### ❌ Evitar

- ❌ Subir archivos `.env.*` a Git
- ❌ Poner passwords o API keys privadas en `VITE_*`
- ❌ Usar mismas credenciales en todos los ambientes
- ❌ Hardcodear valores en el código

---

## 📞 Contacto de Información Sensible

Para obtener valores reales de variables de entorno (API keys, credentials, etc):

1. **Slack**: Canal #entersys-dev
2. **Email**: dev@entersys.com.mx
3. **1Password**: Vault "Entersys Frontend"

---

## 🔄 Versionamiento

El proyecto usa versionamiento semántico automático:

```
version: YYYY.MM.DD-HHMM-{git-hash}
ejemplo: 2025.10.11-1905-ddbc2ee
```

Ver versión actual:
```bash
cat src/version.json
```

---

## 📚 Referencias

- [Vite - Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [12 Factor App - Config](https://12factor.net/config)

---

**Última actualización**: 2025-10-11
**Mantenido por**: Equipo Entersys Dev
