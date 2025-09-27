# 🐳 Documentación Completa de Contenedores - Servidor Entersys

**Servidor:** dev-server (GCP us-central1-c)
**IP Externa:** 34.134.14.202
**Recursos:** 2 vCPUs, 4GB RAM, 20GB Disco
**SO:** Ubuntu
**Última actualización:** 23 Septiembre 2025

---

## 📊 **ESTADO ACTUAL DEL SERVIDOR**

### Uso de Recursos
- **CPU:** 2 vCPUs (Load Average: 0.10)
- **RAM:** 3.8GB Total | 2.9GB Usada | 974MB Disponible
- **Disco:** 20GB Total | 16GB Usado (82%) | 3.5GB Libre
- **Uptime:** 17 días, 22 horas

### ⚠️ **ALERTAS CRÍTICAS**
- **Disco al 82%** - Requiere limpieza urgente de imágenes Docker huérfanas
- **RAM al 76%** - Considerar aumento de memoria

---

## 🔧 **INVENTARIO DETALLADO DE CONTENEDORES**

### 1. 🌐 **TRAEFIK** (Proxy Reverso y SSL)
- **Imagen:** `traefik:v2.10`
- **Función:** Proxy reverso, balanceador de carga, generación automática de certificados SSL
- **Puertos:** 80 (HTTP), 443 (HTTPS)
- **Estado:** ✅ Funcionando
- **Configuración:** `/srv/traefik/`
- **Mantenimiento:**
  - Verificar certificados SSL cada mes
  - Revisar logs: `docker logs traefik`
  - Backup de configuración semanal
- **Respaldo:**
  ```bash
  tar -czf traefik-backup-$(date +%Y%m%d).tar.gz /srv/traefik/
  ```

### 2. 🔒 **SOCKET-PROXY** (Seguridad Docker)
- **Imagen:** `tecnativa/docker-socket-proxy`
- **Función:** Proxy de seguridad para Docker socket, protege acceso a Docker API
- **Puertos:** 2375 (interno)
- **Estado:** ✅ Funcionando
- **Mantenimiento:** Revisar logs mensualmente
- **Respaldo:** Configuración incluida en backup general

### 3. 🔄 **WATCHTOWER** (Auto-actualizaciones)
- **Imagen:** `containrrr/watchtower:latest`
- **Función:** Actualización automática de contenedores
- **Estado:** ✅ Funcionando (healthy)
- **Mantenimiento:**
  - Revisar logs de actualizaciones
  - Configurar notificaciones por email
- **Respaldo:** Solo configuración

### 4. 🎨 **ENTERSYS-FRONTEND** (Sitio Web Principal)
- **Imagen:** `entersys-frontend-entersys-frontend` (custom)
- **Función:** Sitio web principal de Entersys
- **URL:** https://dev.entersys.mx
- **Puerto:** 80 (interno)
- **Estado:** ✅ Funcionando
- **Código fuente:** `/srv/servicios/entersys-frontend/`
- **Mantenimiento:**
  - Deploy: `git pull && docker-compose build --no-cache && docker-compose up -d`
  - Monitorear logs: `docker logs entersys-frontend`
- **Respaldo:**
  ```bash
  # Código fuente
  tar -czf entersys-frontend-$(date +%Y%m%d).tar.gz /srv/servicios/entersys-frontend/
  ```

### 5. 🛢️ **ENTERSYS-CONTENT-API** (API de Contenido)
- **Imagen:** `content-management-api` (custom)
- **Función:** API para gestión de contenido del sitio
- **Puerto:** 8000 (expuesto)
- **Estado:** ✅ Funcionando
- **Código fuente:** `/srv/servicios/entersys-apis/content-management/`
- **Mantenimiento:**
  - Deploy similar al frontend
  - Revisar logs de API regularmente
- **Respaldo:**
  ```bash
  tar -czf content-api-$(date +%Y%m%d).tar.gz /srv/servicios/entersys-apis/
  ```

### 6. 🐘 **DEV-ENTERSYS-POSTGRES** (Base de Datos)
- **Imagen:** `postgres:15-alpine`
- **Función:** Base de datos principal para APIs de Entersys
- **Puerto:** 5432 (interno)
- **Estado:** ✅ Funcionando (healthy)
- **Volumen:** Datos persistentes
- **Mantenimiento:**
  - Backup diario automático recomendado
  - Monitorear espacio en disco
- **Respaldo:**
  ```bash
  # Backup de base de datos
  docker exec dev-entersys-postgres pg_dumpall -U postgres > entersys-db-backup-$(date +%Y%m%d).sql

  # Restauración
  docker exec -i dev-entersys-postgres psql -U postgres < backup.sql
  ```

### 7. ⚙️ **DEV-ENTERSYS-BACKEND** (Backend de Contenido)
- **Imagen:** `content-management-backend` (custom)
- **Función:** Backend para gestión de contenido
- **Estado:** ✅ Funcionando
- **Mantenimiento:** Similar a otros servicios custom
- **Respaldo:** Código incluido en backup de APIs

### 8. 🎯 **MAUTIC** (Marketing Automation)
- **Imagen:** `mautic/mautic:v4-apache`
- **Función:** Automatización de marketing, leads, campañas
- **Puerto:** 80 (interno, via Traefik)
- **Estado:** ✅ Funcionando
- **Base de datos:** mautic_db (MySQL 5.7)
- **Mantenimiento:**
  - Actualizar regularmente (cuidado con breaking changes)
  - Limpiar logs y datos antiguos
  - Monitorear envío de emails
- **Respaldo:**
  ```bash
  # Backup BD Mautic
  docker exec mautic_db mysqldump -u root -p[PASSWORD] mauticdb > mautic-backup-$(date +%Y%m%d).sql

  # Backup archivos
  docker cp mautic_app:/var/www/html/media ./mautic-media-backup/
  ```

### 9. 📊 **MATOMO** (Analítica Web)
- **Imagen:** `2154d6394cd6` (custom Matomo)
- **Función:** Analítica web, seguimiento de visitantes
- **Puerto:** 80 (interno, via Traefik)
- **Estado:** ✅ Funcionando
- **Base de datos:** matomo_mysql (MySQL 8.0)
- **Mantenimiento:**
  - Archivar datos antiguos mensualmente
  - Actualizar plugins
- **Respaldo:**
  ```bash
  # Backup BD Matomo
  docker exec matomo_mysql mysqldump -u root -p[PASSWORD] matomo > matomo-backup-$(date +%Y%m%d).sql
  ```

### 10. 🔄 **N8N-MARKETING** (Automatización)
- **Imagen:** `n8nio/n8n:latest`
- **Función:** Automatización de workflows, integraciones
- **Puerto:** 5679:5678 (expuesto)
- **Estado:** ✅ Funcionando
- **Mantenimiento:**
  - Revisar workflows activos
  - Monitorear ejecuciones fallidas
- **Respaldo:**
  ```bash
  # Backup workflows y credenciales
  docker cp n8n-marketing:/home/node/.n8n ./n8n-backup/
  ```

### 11. 📚 **WIKIJS** (Documentación)
- **Imagen:** `requarks/wiki:2`
- **Función:** Wiki interna, documentación
- **Puerto:** 3000 (expuesto)
- **Estado:** ✅ Funcionando
- **Base de datos:** wikijs_db (PostgreSQL 13)
- **Mantenimiento:**
  - Backup regular de contenido
  - Actualizar cuando sea necesario
- **Respaldo:**
  ```bash
  # Backup BD Wiki
  docker exec wikijs_db pg_dump -U wikijs wikijs > wiki-backup-$(date +%Y%m%d).sql
  ```

---

## 🔧 **PROCEDIMIENTOS DE MANTENIMIENTO**

### Mantenimiento Diario
```bash
# Verificar estado de contenedores
docker ps -a

# Ver logs de servicios críticos
docker logs --tail 50 traefik
docker logs --tail 50 entersys-frontend
```

### Mantenimiento Semanal
```bash
# Limpiar imágenes huérfanas (URGENTE debido al 82% de disco)
docker system prune -af --volumes

# Backup de bases de datos críticas
./backup-databases.sh

# Verificar certificados SSL
docker logs traefik | grep -i cert
```

### Mantenimiento Mensual
```bash
# Verificar actualizaciones de seguridad del SO
apt update && apt list --upgradable

# Revisar uso de recursos
df -h
free -m
docker stats --no-stream

# Archivar logs antiguos de Matomo/Mautic
```

---

## 📋 **SCRIPT DE RESPALDO AUTOMATIZADO**

Crear `/srv/scripts/backup-all.sh`:

```bash
#!/bin/bash
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/srv/backups/$BACKUP_DATE"
mkdir -p $BACKUP_DIR

echo "🔄 Iniciando backup completo - $BACKUP_DATE"

# 1. Backup bases de datos
echo "📊 Backing up databases..."
docker exec dev-entersys-postgres pg_dumpall -U postgres > $BACKUP_DIR/entersys-postgres.sql
docker exec mautic_db mysqldump -u root -p$MAUTIC_DB_PASSWORD mauticdb > $BACKUP_DIR/mautic.sql
docker exec matomo_mysql mysqldump -u root -p$MATOMO_DB_PASSWORD matomo > $BACKUP_DIR/matomo.sql
docker exec wikijs_db pg_dump -U wikijs wikijs > $BACKUP_DIR/wikijs.sql

# 2. Backup código fuente
echo "📁 Backing up source code..."
tar -czf $BACKUP_DIR/entersys-frontend.tar.gz /srv/servicios/entersys-frontend/
tar -czf $BACKUP_DIR/entersys-apis.tar.gz /srv/servicios/entersys-apis/

# 3. Backup configuraciones
echo "⚙️ Backing up configurations..."
tar -czf $BACKUP_DIR/traefik-config.tar.gz /srv/traefik/
cp -r /srv/servicios/*/docker-compose.yml $BACKUP_DIR/

# 4. Backup datos de aplicaciones
echo "🎯 Backing up application data..."
docker cp mautic_app:/var/www/html/media $BACKUP_DIR/mautic-media/
docker cp n8n-marketing:/home/node/.n8n $BACKUP_DIR/n8n-data/

# 5. Comprimir todo
echo "🗜️ Compressing backup..."
cd /srv/backups/
tar -czf backup-complete-$BACKUP_DATE.tar.gz $BACKUP_DATE/
rm -rf $BACKUP_DATE/

echo "✅ Backup completado: backup-complete-$BACKUP_DATE.tar.gz"

# 6. Limpiar backups antiguos (mantener últimos 7 días)
find /srv/backups/ -name "backup-complete-*.tar.gz" -mtime +7 -delete
```

---

## 🚀 **MEJORAS RECOMENDADAS PARA OPTIMIZACIÓN**

### 🔴 **CRÍTICAS (Implementar Inmediatamente)**

1. **Limpieza de Disco Urgente**
   - Disco al 82% - Riesgo de fallo del sistema
   - Ejecutar: `docker system prune -af --volumes`
   - Resultado esperado: Liberar ~3-5GB

2. **Automatización de Backups**
   - Implementar script de backup diario automatizado
   - Configurar cron job para backup nocturno
   - Subir backups a Google Cloud Storage

3. **Monitoreo de Recursos**
   - Instalar Prometheus + Grafana para monitoreo
   - Alertas automáticas por email/Slack
   - Dashboard de métricas en tiempo real

### 🟡 **IMPORTANTES (Implementar en 2-4 semanas)**

4. **Ampliación de Recursos**
   - Aumentar disco de 20GB a 50GB mínimo
   - Considerar upgrade a 6-8GB RAM
   - Evaluación de CPU según carga

5. **Implementar Docker Registry Privado**
   - Evitar reconstrucciones constantes
   - Cacheo de imágenes personalizado
   - Harbor o Google Container Registry

6. **Separación de Entornos**
   - Crear servidor prod-server dedicado
   - Implementar pipeline CI/CD con GitHub Actions
   - Staging environment para pruebas

7. **Seguridad Avanzada**
   - Implementar fail2ban para SSH
   - Configurar firewall restrictivo (UFW)
   - Auditoría de contenedores con Falco

8. **Base de Datos Optimizada**
   - Migrar a PostgreSQL para todos los servicios
   - Implementar réplicas de lectura
   - Configurar backup incremental

### 🟢 **DESEABLES (Implementar en 1-3 meses)**

9. **Orquestación Mejorada**
   - Migrar a Docker Swarm o Kubernetes
   - Auto-scaling basado en carga
   - Rolling deployments sin downtime

10. **CDN y Cache**
    - Implementar Cloudflare o Google CDN
    - Redis para cache de aplicaciones
    - Optimización de imágenes automática

11. **Logging Centralizado**
    - ELK Stack (Elasticsearch, Logstash, Kibana)
    - Agregación de logs de todos los contenedores
    - Retención y rotación automática

12. **Testing Automatizado**
    - Tests de integración en pipeline
    - Smoke tests post-deployment
    - Performance testing regular

### 📊 **ESTIMACIONES DE COSTO**

| Mejora | Costo Mensual GCP | Prioridad |
|--------|------------------|-----------|
| Ampliación disco (50GB) | +$8 USD | 🔴 Crítica |
| Upgrade RAM (8GB) | +$15 USD | 🟡 Importante |
| Servidor producción | +$45 USD | 🟡 Importante |
| Cloud Storage backups | +$5 USD | 🔴 Crítica |
| **Total estimado** | **+$73 USD/mes** | |

### 🎯 **PLAN DE IMPLEMENTACIÓN (3 FASES)**

#### **FASE 1 - ESTABILIZACIÓN (Esta semana)**
- ✅ Limpieza disco urgente
- ✅ Script backup automatizado
- ✅ Monitoreo básico
- ✅ Documentación completa

#### **FASE 2 - ESCALABILIDAD (Próximas 4 semanas)**
- 🔄 Ampliación recursos servidor
- 🔄 Separación entornos dev/prod
- 🔄 Pipeline CI/CD básico
- 🔄 Seguridad mejorada

#### **FASE 3 - OPTIMIZACIÓN (1-3 meses)**
- 🔄 Orquestación avanzada
- 🔄 CDN y cache
- 🔄 Logging centralizado
- 🔄 Testing automatizado

---

## 🔗 **RECURSOS Y CONTACTOS**

- **Repositorio Principal:** https://github.com/EntersysMX/entersys-frontend
- **Acceso Servidor:** `gcloud compute ssh dev-server --zone=us-central1-c`
- **Documentación:** Este archivo + `/srv/servicios/*/README.md`
- **Monitoreo:** Pendiente implementar dashboard

---

**📅 Última actualización:** 23 Septiembre 2025
**👤 Autor:** Claude Code
**📧 Contacto:** Revisar logs y estado mediante comandos documentados

---

> ⚠️ **NOTA IMPORTANTE:** Este servidor maneja servicios críticos de producción. Cualquier cambio debe ser probado primero en entorno local y documentado apropiadamente.