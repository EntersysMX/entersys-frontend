# ✅ Custom Dimensions - Configuración Completada

## 🎉 Estado: COMPLETADO

Todas las 6 Custom Dimensions han sido configuradas exitosamente en Matomo.

---

## 📊 Dimensiones Configuradas

| ID | Name | Scope | Status | Columna DB | Descripción |
|----|------|-------|--------|------------|-------------|
| 1 | User Type | Visit | ✅ Active | custom_dimension_1 | Tipo de usuario: visitor, lead, customer, partner |
| 2 | Industry | Visit | ✅ Active | custom_dimension_2 | Industria: automation, integration, consulting, development |
| 3 | Company Size | Visit | ✅ Active | custom_dimension_3 | Tamaño de empresa: small, medium, large, unknown |
| 4 | Lead Source | Visit | ✅ Active | custom_dimension_4 | Fuente del lead: direct, referral, social_media, web_search, whatsapp, event |
| 5 | Mautic Lead ID | Visit | ✅ Active | custom_dimension_5 | ID del lead en Mautic CRM (numérico) |
| 6 | User Journey Stage | Visit | ✅ Active | custom_dimension_6 | Etapa del journey: awareness, consideration, decision, retention |

---

## ✅ Verificación Técnica

### **1. Estructura de Base de Datos**
```sql
-- Tabla: matomo_custom_dimensions
✅ 6 registros configurados (idsite=1, scope=visit, active=1)

-- Tabla: matomo_log_visit
✅ 6 columnas creadas: custom_dimension_1 a custom_dimension_6 (varchar(255))

-- Tabla: matomo_log_conversion
✅ 6 columnas sincronizadas automáticamente
```

### **2. Configuración de Matomo**
```bash
$ docker exec matomo_app ./console customdimensions:info

✅ 6 Custom Dimensions available in scope "visit"
✅ Installed indexes: 1, 2, 3, 4, 5, 6
✅ Cache cleared
```

### **3. Código de Frontend**
```javascript
// src/services/analytics.js
✅ trackUserContext() implementado
✅ setCustomDimension() implementado
✅ setCustomDimensions() implementado

// Uso en componentes:
✅ src/components/pages/contacto/contact-06.jsx
✅ src/components/WhatsAppFloatButton.jsx
```

---

## 🧪 Cómo Probar

### **Opción 1: Test Suite Automatizado**

1. Abre https://www.entersys.mx
2. Abre la consola del navegador (F12)
3. Ejecuta:
```javascript
window.testAnalytics.run("CustomDimensions")
```

**Resultado esperado:**
```
✅ PASS Set Single Dimension
✅ PASS Set Multiple Dimensions
✅ PASS Track User Context
```

### **Opción 2: Test Manual**

```javascript
// En la consola de https://www.entersys.mx

// Test individual de cada dimensión
window.entersysAnalytics.setCustomDimension(1, 'lead');
window.entersysAnalytics.setCustomDimension(6, 'consideration');

// Test de contexto completo
window.entersysAnalytics.trackUserContext({
  userType: 'lead',
  industry: 'automation',
  companySize: 'medium',
  leadSource: 'web_search',
  mauticLeadId: '12345',
  journeyStage: 'decision'
});
```

### **Opción 3: Verificar en Matomo Real-time**

1. Ve a: https://analytics.entersys.mx
2. Navega a: **Visitors → Real-time → Visitor Log**
3. En otra pestaña, visita https://www.entersys.mx y navega por el sitio
4. Haz clic en el botón de WhatsApp o llena el formulario de contacto
5. Refresca el Visitor Log
6. Haz clic en tu sesión reciente
7. **Deberías ver las Custom Dimensions pobladas:**
   - User Type: visitor o lead
   - Journey Stage: consideration o decision
   - Lead Source: direct, whatsapp, etc.

---

## 📈 Casos de Uso Implementados

### **Caso 1: Visitante Nuevo**
```javascript
// Al cargar cualquier página
analyticsService.trackUserContext({
  userType: 'visitor',
  leadSource: 'direct',
  journeyStage: 'awareness'
});
```

### **Caso 2: Formulario de Contacto Iniciado**
```javascript
// Cuando el usuario empieza a llenar el formulario
analyticsService.trackEvent('Form', 'Form Start', 'contact_form');
analyticsService.trackUserContext({
  userType: 'visitor',
  journeyStage: 'consideration'
});
```

### **Caso 3: Formulario Enviado con Éxito**
```javascript
// Cuando el formulario se envía correctamente
analyticsService.trackUserContext({
  userType: 'lead',
  industry: formData.interest,
  leadSource: 'website_contact_form',
  mauticLeadId: result.leadId,
  journeyStage: 'decision'
});
```

### **Caso 4: Click en WhatsApp**
```javascript
// Cuando el usuario hace clic en el botón de WhatsApp
analyticsService.trackUserContext({
  userType: userEmail ? 'lead' : 'visitor',
  leadSource: 'whatsapp',
  mauticLeadId: localStorage.getItem('mauticLeadId'),
  journeyStage: userEmail ? 'decision' : 'consideration'
});
```

---

## 📊 Reportes Disponibles en Matomo

Una vez que hayas navegado el sitio y generado datos, estos reportes estarán disponibles:

### **1. Custom Dimensions Reports**
- **Ubicación:** Visitors → Custom Dimensions
- **Reportes:**
  - User Type Distribution
  - Industry Analysis
  - Company Size Breakdown
  - Lead Source Attribution
  - Journey Stage Funnel

### **2. Segmentación Avanzada**
Ahora puedes crear segmentos como:
- "Leads de la industria automation en etapa decision"
- "Visitors que llegaron por WhatsApp"
- "Empresas grandes en etapa consideration"

### **3. Goals con Custom Dimensions**
Los Goals (metas) que configuraremos próximamente podrán segmentarse por:
- Tipo de usuario que convirtió
- Fuente que generó la conversión
- Etapa del journey en la que ocurrió

---

## 🔧 Comandos Útiles para Administración

```bash
# Verificar estado de Custom Dimensions
docker exec matomo_app ./console customdimensions:info

# Ver dimensiones en la base de datos
docker exec -i matomo_mysql mysql -u matomo -pMatomoUserPassAnalytics321 matomo \
  -e "SELECT idcustomdimension, name, \`index\`, scope, active FROM matomo_custom_dimensions WHERE idsite=1;"

# Limpiar caché de Matomo
docker exec matomo_app ./console core:clear-caches

# Ver columnas de tracking
docker exec -i matomo_mysql mysql -u matomo -pMatomoUserPassAnalytics321 matomo \
  -e "SHOW COLUMNS FROM matomo_log_visit LIKE 'custom_dimension_%';"
```

---

## 🎯 Siguiente Paso: Configurar Goals

Ahora que las Custom Dimensions están configuradas, el siguiente paso es configurar **Goals (Metas)** para trackear conversiones con valores de revenue:

### **Goals a Configurar:**

| ID | Goal Name | Trigger Event | Revenue | Descripción |
|----|-----------|---------------|---------|-------------|
| 1 | Contact Form Submission | `Form/Submit/contact_form` | $100 | Envío exitoso del formulario de contacto |
| 2 | WhatsApp Click | `CTA/WhatsApp Click` | $50 | Click en el botón de WhatsApp |
| 3 | Form Started | `Form/Form Start` | $10 | Usuario comenzó a llenar el formulario |
| 4 | Scroll to Bottom | `Engagement/Scroll Depth/100%` | $5 | Usuario llegó al final de la página |
| 5 | Lead Conversion | `Conversion` | $100 | Conversión general de lead |

### **Beneficios de Goals + Custom Dimensions:**
- Ver qué tipo de usuario convierte más
- Identificar las fuentes que generan más conversiones
- Analizar en qué etapa del journey ocurren las conversiones
- Calcular el valor de cada segmento de usuarios

---

## 📝 Notas Importantes

### **⚠️ Sobre el Scope "Visit" vs "Visitor"**

Todas las dimensiones están configuradas con scope **"Visit"**:
- ✅ **Ventaja:** Los datos se actualizan en cada visita, permitiendo ver la evolución del usuario
- ⚠️ **Consideración:** La dimensión #5 (Mautic Lead ID) con scope "Visit" funciona, pero idealmente debería ser "Visitor" para persistir a través de múltiples sesiones

Si en el futuro quieres cambiar la dimensión #5 a scope "Visitor":
```bash
# 1. Eliminar la dimensión actual
docker exec matomo_mysql mysql -u matomo -pMatomoUserPassAnalytics321 matomo \
  -e "DELETE FROM matomo_custom_dimensions WHERE idsite=1 AND \`index\`=5 AND scope='visit';"

# 2. Crear nueva dimensión con scope visitor
docker exec matomo_app ./console customdimensions:add-custom-dimension --scope=visitor

# 3. Actualizar el nombre en la base de datos
docker exec matomo_mysql mysql -u matomo -pMatomoUserPassAnalytics321 matomo \
  -e "UPDATE matomo_custom_dimensions SET name='Mautic Lead ID' WHERE idsite=1 AND \`index\`=1 AND scope='visitor';"
```

### **🔒 Seguridad y Privacidad**

Las Custom Dimensions pueden contener información sensible (como Lead IDs). Asegúrate de:
- ✅ Configurar correctamente los permisos de usuario en Matomo
- ✅ No almacenar información personal identificable (PII) en dimensiones públicas
- ✅ Revisar las políticas de privacidad y GDPR/CCPA si aplica

---

## ✅ Checklist Final

- [x] 6 Custom Dimensions configuradas en la base de datos
- [x] Nombres y descripciones asignadas correctamente
- [x] Columnas de tracking creadas en matomo_log_visit
- [x] Código de frontend implementado
- [x] Test suite disponible
- [x] Documentación completa
- [x] Cache de Matomo limpiada
- [ ] **Próximo:** Configurar Goals (5 metas con revenue)
- [ ] **Próximo:** Verificar datos en Real-time Visitor Log
- [ ] **Próximo:** Crear segmentos personalizados

---

## 📚 Documentación de Referencia

- **Guía Completa:** `GUIA-CONFIGURACION-MATOMO-CUSTOM-DIMENSIONS-GOALS.md`
- **Taxonomía de Eventos:** `src/config/analytics-events.js`
- **Test Suite:** `src/utils/testAnalytics.js`
- **Servicio de Analytics:** `src/services/analytics.js`
- **Componente TrackedLink:** `src/components/TrackedLink.jsx`

---

## 🎉 ¡Configuración Completada!

Las 6 Custom Dimensions están 100% configuradas y listas para usar. Ahora puedes:

1. **Navegar por el sitio** y ver los datos en Real-time
2. **Ejecutar tests** para verificar el tracking
3. **Configurar Goals** para medir conversiones
4. **Crear segmentos** para análisis avanzado
5. **Integrar con Mautic** para sincronización de leads

---

**Creado:** 2025-10-13
**Estado:** ✅ COMPLETADO
**Versión:** 1.0
