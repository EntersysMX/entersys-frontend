#!/bin/bash
cd /srv/servicios/entersys-frontend
echo "Current directory: $(pwd)"
echo "Stashing local changes..."
git stash
echo "Pulling latest changes..."
git pull origin main
echo "Building and restarting containers..."
docker compose down
docker compose up -d --build
echo "Deployment completed!"