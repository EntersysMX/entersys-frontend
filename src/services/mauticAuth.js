/**
 * Servicio de Autenticación OAuth2 para Mautic
 */

import { getCurrentConfig } from '../config/mautic';

const config = getCurrentConfig();

export class MauticAuth {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Obtener token de acceso OAuth2
   */
  async getAccessToken() {
    try {
      // Si ya tenemos un token válido, devolverlo
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      console.log('🔐 Solicitando nuevo token OAuth2 a Mautic...');

      const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: config.clientId,
          client_secret: config.clientSecret
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OAuth2 error response:', errorText);
        throw new Error(`OAuth2 request failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      if (!data.access_token) {
        console.error('❌ No access token in response:', data);
        throw new Error('No access token received from Mautic');
      }

      // Guardar token y calcular expiración (con margen de seguridad)
      this.accessToken = data.access_token;
      const expiresIn = data.expires_in || 3600; // Default 1 hora
      this.tokenExpiry = Date.now() + ((expiresIn - 60) * 1000); // 60 segundos de margen

      console.log('✅ Token OAuth2 obtenido exitosamente');
      if (config.debug) {
        console.log('🔍 Token expires in:', expiresIn, 'seconds');
      }

      return this.accessToken;

    } catch (error) {
      console.error('❌ Error obteniendo token OAuth2:', error);

      // Reset token en caso de error
      this.accessToken = null;
      this.tokenExpiry = null;

      throw error;
    }
  }

  /**
   * Hacer request autenticado a la API de Mautic
   */
  async authenticatedRequest(url, options = {}) {
    try {
      const token = await this.getAccessToken();

      const authOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const response = await fetch(url, authOptions);

      if (response.status === 401) {
        console.warn('⚠️ Token expired, refreshing...');
        // Reset token y reintentar una vez
        this.accessToken = null;
        this.tokenExpiry = null;

        const newToken = await this.getAccessToken();
        authOptions.headers['Authorization'] = `Bearer ${newToken}`;

        return await fetch(url, authOptions);
      }

      return response;

    } catch (error) {
      console.error('❌ Authenticated request failed:', error);
      throw error;
    }
  }

  /**
   * Limpiar tokens (logout)
   */
  clearTokens() {
    this.accessToken = null;
    this.tokenExpiry = null;
    console.log('🔒 Tokens cleared');
  }

  /**
   * Verificar si tenemos un token válido
   */
  isAuthenticated() {
    return this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }
}

// Instancia singleton
export const mauticAuth = new MauticAuth();