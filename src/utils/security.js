/**
 * Security Utilities
 * Herramientas de seguridad para protección XSS, CSRF, y rate limiting
 */

import { sentryService } from '../services/sentry';

/**
 * Rate Limiter
 * Previene abuso limitando acciones por tiempo
 */
export class RateLimiter {
  constructor(maxAttempts, windowMs) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  /**
   * Verifica si una acción está permitida
   */
  isAllowed(key) {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record) {
      this.attempts.set(key, {
        count: 1,
        startTime: now,
      });
      return true;
    }

    // Reset si pasó la ventana de tiempo
    if (now - record.startTime > this.windowMs) {
      this.attempts.set(key, {
        count: 1,
        startTime: now,
      });
      return true;
    }

    // Incrementar contador
    record.count++;

    if (record.count > this.maxAttempts) {
      // Reportar a Sentry si se excede significativamente
      if (record.count === this.maxAttempts + 1) {
        sentryService.captureMessage(
          `Rate limit exceeded for key: ${key}`,
          'warning',
          {
            security: {
              key,
              attempts: record.count,
              windowMs: this.windowMs,
            },
          }
        );
      }
      return false;
    }

    return true;
  }

  /**
   * Reset contador para una key
   */
  reset(key) {
    this.attempts.delete(key);
  }

  /**
   * Limpia registros antiguos
   */
  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now - record.startTime > this.windowMs) {
        this.attempts.delete(key);
      }
    }
  }
}

/**
 * Rate limiters pre-configurados
 */
export const rateLimiters = {
  // Formularios: 5 intentos por minuto
  formSubmission: new RateLimiter(5, 60 * 1000),

  // API calls: 30 por minuto
  apiCall: new RateLimiter(30, 60 * 1000),

  // Login attempts: 5 por 15 minutos
  login: new RateLimiter(5, 15 * 60 * 1000),

  // Newsletter signup: 2 por hora
  newsletter: new RateLimiter(2, 60 * 60 * 1000),
};

/**
 * XSS Protection
 * Sanitiza strings para prevenir XSS
 */
export const XSSProtection = {
  /**
   * Escapa HTML special characters
   */
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Sanitiza URL para prevenir javascript: y data: URIs
   */
  sanitizeURL(url) {
    const trimmed = url.trim().toLowerCase();

    // Bloquear esquemas peligrosos
    const dangerousSchemes = ['javascript:', 'data:', 'vbscript:', 'file:'];

    for (const scheme of dangerousSchemes) {
      if (trimmed.startsWith(scheme)) {
        console.warn(`Blocked dangerous URL scheme: ${scheme}`);
        return '#';
      }
    }

    return url;
  },

  /**
   * Sanitiza atributo HTML
   */
  sanitizeAttribute(attr) {
    return this.escapeHTML(attr)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /**
   * Detecta patrones sospechosos de XSS
   */
  detectXSS(input) {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi, // event handlers
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(input)) {
        return true;
      }
    }

    return false;
  },
};

/**
 * CSRF Protection
 * Genera y valida tokens CSRF
 */
export const CSRFProtection = {
  /**
   * Genera token CSRF
   */
  generateToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Guarda token en sessionStorage
   */
  setToken(token) {
    sessionStorage.setItem('csrf_token', token);
  },

  /**
   * Obtiene token actual
   */
  getToken() {
    let token = sessionStorage.getItem('csrf_token');

    if (!token) {
      token = this.generateToken();
      this.setToken(token);
    }

    return token;
  },

  /**
   * Valida token
   */
  validateToken(token) {
    const stored = this.getToken();
    return token === stored;
  },

  /**
   * Añade token a FormData
   */
  addToFormData(formData) {
    formData.append('csrf_token', this.getToken());
    return formData;
  },

  /**
   * Añade token a fetch headers
   */
  addToHeaders(headers = {}) {
    return {
      ...headers,
      'X-CSRF-Token': this.getToken(),
    };
  },
};

/**
 * Input Validation
 * Valida inputs comunes
 */
export const InputValidator = {
  /**
   * Valida email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valida teléfono mexicano
   */
  isValidMexicoPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return /^52\d{10}$|^\d{10}$/.test(cleaned);
  },

  /**
   * Valida que no contenga SQL injection patterns
   */
  detectSQLInjection(input) {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
      /(--|\#|\/\*|\*\/)/gi,
      /(\bOR\b.*=.*|1\s*=\s*1)/gi,
    ];

    for (const pattern of sqlPatterns) {
      if (pattern.test(input)) {
        return true;
      }
    }

    return false;
  },

  /**
   * Valida longitud de string
   */
  isValidLength(str, min, max) {
    const length = str.trim().length;
    return length >= min && length <= max;
  },

  /**
   * Sanitiza input general
   */
  sanitizeInput(input) {
    // Remove null bytes
    let sanitized = input.replace(/\0/g, '');

    // Trim whitespace
    sanitized = sanitized.trim();

    // Detectar XSS
    if (XSSProtection.detectXSS(sanitized)) {
      console.warn('XSS pattern detected and blocked');
      sentryService.captureMessage('XSS attempt detected', 'warning', {
        security: {
          input: sanitized.substring(0, 100), // Solo primeros 100 chars
        },
      });
      return '';
    }

    // Detectar SQL Injection
    if (this.detectSQLInjection(sanitized)) {
      console.warn('SQL Injection pattern detected and blocked');
      sentryService.captureMessage('SQL Injection attempt detected', 'warning', {
        security: {
          input: sanitized.substring(0, 100),
        },
      });
      return '';
    }

    return sanitized;
  },
};

/**
 * Security Headers Validator
 * Verifica que los headers de seguridad estén presentes
 */
export const SecurityHeadersValidator = {
  /**
   * Headers esperados
   */
  expectedHeaders: [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security',
    'Content-Security-Policy',
  ],

  /**
   * Verifica headers de respuesta
   */
  async validateHeaders(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const headers = response.headers;

      const missing = [];

      for (const header of this.expectedHeaders) {
        if (!headers.has(header)) {
          missing.push(header);
        }
      }

      if (missing.length > 0) {
        console.warn('Missing security headers:', missing);

        if (import.meta.env.DEV) {
          console.table(
            this.expectedHeaders.map((h) => ({
              header: h,
              present: headers.has(h) ? '✅' : '❌',
              value: headers.get(h) || 'N/A',
            }))
          );
        }
      }

      return {
        valid: missing.length === 0,
        missing,
        headers: Object.fromEntries(headers.entries()),
      };
    } catch (error) {
      console.error('Error validating headers:', error);
      return null;
    }
  },
};

/**
 * Secure Storage
 * Wrapper seguro para localStorage/sessionStorage
 */
export const SecureStorage = {
  /**
   * Guarda dato con timestamp
   */
  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl,
    };

    try {
      sessionStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('SecureStorage set error:', error);
    }
  },

  /**
   * Obtiene dato si no ha expirado
   */
  get(key) {
    try {
      const itemStr = sessionStorage.getItem(key);

      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);

      // Verificar TTL
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('SecureStorage get error:', error);
      return null;
    }
  },

  /**
   * Remueve item
   */
  remove(key) {
    sessionStorage.removeItem(key);
  },

  /**
   * Limpia items expirados
   */
  cleanup() {
    const keys = Object.keys(sessionStorage);

    for (const key of keys) {
      this.get(key); // Llamar get limpia automáticamente si expiró
    }
  },
};

/**
 * Inicializar protecciones de seguridad
 */
export const initSecurity = () => {
  // Limpiar rate limiters cada 5 minutos
  setInterval(() => {
    Object.values(rateLimiters).forEach((limiter) => limiter.cleanup());
  }, 5 * 60 * 1000);

  // Limpiar secure storage cada hora
  setInterval(() => {
    SecureStorage.cleanup();
  }, 60 * 60 * 1000);

  // Generar CSRF token inicial
  CSRFProtection.getToken();

  // Validar headers en desarrollo
  if (import.meta.env.DEV) {
    SecurityHeadersValidator.validateHeaders(window.location.origin);
  }

  console.log('🔒 Security initialized');
};

export default {
  RateLimiter,
  rateLimiters,
  XSSProtection,
  CSRFProtection,
  InputValidator,
  SecurityHeadersValidator,
  SecureStorage,
  initSecurity,
};
