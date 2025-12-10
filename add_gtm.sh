#!/bin/bash
cd /srv/entersys-frontend

# Agregar GTM_ID si no existe, o actualizar si existe
if grep -q "VITE_GTM_ID=" .env.production; then
    sed -i 's/VITE_GTM_ID=.*/VITE_GTM_ID=GTM-WHH8V38W/' .env.production
    echo "GTM_ID actualizado"
else
    sed -i '/VITE_MATOMO_URL=/i VITE_GTM_ID=GTM-WHH8V38W' .env.production
    echo "GTM_ID agregado"
fi

cat .env.production | grep GTM
