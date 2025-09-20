# 🚀 GUÍA DE DESPLIEGUE - ENTERSYS FRONTEND

## 📋 INFORMACIÓN GENERAL

**Servidor:** SCRAM Server (34.134.14.202)
**Método:** GitHub Actions CI/CD
**Contenedores:** Docker + Docker Compose
**Web Server:** Nginx

## 🏗️ ARQUITECTURA DE DESPLIEGUE

```
GitHub Repository (main branch)
        ↓ (push trigger)
GitHub Actions Workflow
        ↓ (build & deploy)
SCRAM Server (34.134.14.202)
        ↓
Docker Compose
    ├── entersys-frontend (Node.js app)
    └── nginx (Web server + proxy)
        ↓
Internet (Puerto 80/443)
```

## 🔧 CONFIGURACIÓN INICIAL DEL SERVIDOR

### 1. Secrets de GitHub
En el repositorio GitHub, configurar estos secrets:

```
Settings → Secrets and Variables → Actions → New repository secret

SERVER_USER: usuario_del_servidor
SERVER_SSH_KEY: clave_privada_ssh_completa
```

### 2. Estructura en el Servidor
```bash
# Crear directorio del proyecto
sudo mkdir -p /srv/servicios/entersys-frontend
sudo chown $USER:$USER /srv/servicios/entersys-frontend

# Clonar repositorio
cd /srv/servicios
git clone https://github.com/EntersysMX/entersys-frontend.git
cd entersys-frontend
```

### 3. Dependencias del Servidor
```bash
# Instalar Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalaciones
docker --version
docker-compose --version
node --version
npm --version
```

## 🔄 PROCESO DE CI/CD

### Workflow Automatizado (.github/workflows/deploy.yml)

**Disparadores:**
- Push a rama `main`
- Ejecución manual desde GitHub Actions

**Pasos del Pipeline:**
1. **Checkout:** Descarga el código fuente
2. **Setup Node.js:** Instala Node.js 18 con cache npm
3. **Install:** Instala dependencias con `npm ci`
4. **Lint:** Ejecuta linting si está disponible
5. **Build:** Construye la aplicación con `npm run build`
6. **Deploy:** Conecta por SSH y despliega en el servidor

### Script de Despliegue en Servidor
```bash
cd /srv/servicios/entersys-frontend
git pull origin main
npm ci
npm run build
docker compose down
docker compose up -d --build
```

## 🐳 CONFIGURACIÓN DOCKER

### Dockerfile (Multi-stage build)
```dockerfile
# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Services
```yaml
services:
  entersys-frontend:
    build: .
    container_name: entersys-frontend
    ports: ["3000:80"]

  nginx:
    image: nginx:alpine
    container_name: entersys-nginx
    ports: ["80:80", "443:443"]
    depends_on: [entersys-frontend]
```

## 🌐 CONFIGURACIÓN NGINX

### Características Implementadas:
- **SPA Routing:** `try_files $uri $uri/ /index.html`
- **Cache Estático:** 1 año para assets (js, css, imágenes)
- **Security Headers:** X-Frame-Options, X-Content-Type-Options, etc.
- **Gzip Compression:** Para texto, CSS, JavaScript
- **Performance:** Optimizado para archivos estáticos

## 🚦 COMANDOS DE GESTIÓN

### En el Servidor Local (Desarrollo)
```bash
# Desarrollo
npm run dev                    # Puerto 3000-3002 automático

# Build local
npm run build                  # Genera /dist
npm run preview               # Preview del build

# Docker local (testing)
docker compose up --build     # Simula producción
```

### En el Servidor SCRAM (Producción)
```bash
# Logs del despliegue
docker compose logs -f

# Estado de contenedores
docker compose ps

# Reiniciar servicios
docker compose restart

# Rebuild completo
docker compose down
docker compose up -d --build

# Verificar aplicación
curl -I http://localhost
```

## 🔍 MONITOREO Y DEBUGGING

### Verificar Despliegue Exitoso
```bash
# 1. Estado de contenedores
docker compose ps
# Debe mostrar: entersys-frontend (healthy), nginx (healthy)

# 2. Logs de aplicación
docker compose logs entersys-frontend

# 3. Logs de nginx
docker compose logs entersys-nginx

# 4. Verificar respuesta HTTP
curl -I http://34.134.14.202
# Debe retornar: 200 OK
```

### Problemas Comunes y Soluciones

**1. Build falla en GitHub Actions:**
```bash
# Verificar logs en Actions tab
# Común: dependencias faltantes o version de Node.js
```

**2. SSH Connection refused:**
```bash
# Verificar secrets: SERVER_USER, SERVER_SSH_KEY
# Verificar que la clave SSH esté correcta
```

**3. Docker build falla:**
```bash
# En el servidor, build manual
docker compose build --no-cache
docker compose up -d
```

**4. Nginx no sirve archivos:**
```bash
# Verificar que /dist existe y tiene contenido
ls -la dist/
# Verificar nginx config
docker compose exec nginx nginx -t
```

## 📊 MÉTRICAS Y PERFORMANCE

### Optimizaciones Implementadas:
- **Multi-stage Docker build:** Reduce tamaño de imagen final
- **Nginx caching:** Assets estáticos con cache de 1 año
- **Gzip compression:** Reduce transferencia de datos
- **Security headers:** Mejora seguridad del sitio

### Monitoreo Sugerido:
- **Uptime monitoring:** Ping periódico a 34.134.14.202
- **Performance:** Google PageSpeed Insights
- **Logs:** Agregador de logs para análisis

## 🔐 SEGURIDAD

### Implementado:
- **HTTPS ready:** Configuración para Let's Encrypt
- **Security headers:** Prevención XSS, clickjacking
- **Minimal Docker images:** Alpine Linux base
- **Non-root nginx:** Mejores prácticas de seguridad

### Pendiente:
- **SSL Certificate:** Let's Encrypt setup
- **Firewall rules:** Restricción de puertos
- **Monitoring:** Alertas de seguridad

## 📝 PRÓXIMOS PASOS

1. **SSL/HTTPS Setup:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tu-dominio.com
   ```

2. **Domain Setup:**
   - Configurar DNS A record apuntando a 34.134.14.202
   - Actualizar nginx.conf con el dominio real

3. **Monitoring:**
   - Setup Prometheus + Grafana
   - Configurar alertas de uptime

4. **Backup Strategy:**
   - Backup de configuraciones
   - Estrategia de rollback

---

## 🆘 CONTACTO DE EMERGENCIA

**En caso de problemas críticos:**
1. Revisar logs: `docker compose logs -f`
2. Rollback manual: `git reset --hard HEAD~1`
3. Rebuild: `docker compose up -d --build`

**Comandos de emergencia:**
```bash
# Parar todo
docker compose down

# Limpieza completa
docker system prune -a

# Restart desde cero
git pull origin main
docker compose up -d --build
```

Este archivo debe actualizarse con cambios en la infraestructura de despliegue.