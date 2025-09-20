#!/bin/bash

# Script de deploy para actualizar el proyecto en el servidor
echo "🚀 Iniciando deploy de entersys-frontend..."

# Navegar al directorio del proyecto
cd /srv/servicios/entersys-frontend

# Configurar git safe directory (por si es necesario)
git config --global --add safe.directory /srv/servicios/entersys-frontend

# Hacer stash de cambios locales
echo "📦 Guardando cambios locales..."
git stash save "local docker configs - $(date)"

# Hacer pull del repositorio
echo "⬇️ Descargando últimos cambios..."
git pull origin main

# Verificar si hay contenedores corriendo
echo "🔍 Verificando contenedores..."
if docker ps | grep -q entersys-frontend; then
    echo "♻️ Reiniciando contenedores..."
    docker-compose down
    docker-compose up -d --build
else
    echo "🆙 Iniciando contenedores..."
    docker-compose up -d --build
fi

echo "✅ Deploy completado exitosamente!"
echo "🌐 El proyecto está disponible en el servidor"