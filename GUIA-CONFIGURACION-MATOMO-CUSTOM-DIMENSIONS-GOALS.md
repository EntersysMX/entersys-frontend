# Guía de Configuración: Custom Dimensions y Goals en Matomo

**Fecha:** 13 de Octubre de 2025
**URL Matomo:** https://analytics.entersys.mx
**Sitio Web:** https://www.entersys.mx

---

## Índice

1. [Configuración de Custom Dimensions](#1-configuración-de-custom-dimensions)
2. [Configuración de Goals](#2-configuración-de-goals)
3. [Verificación y Testing](#3-verificación-y-testing)
4. [Troubleshooting](#4-troubleshooting)

---

## 1. Configuración de Custom Dimensions

Las **Custom Dimensions** permiten segmentar y analizar usuarios con datos personalizados. Ya están implementadas en el código, solo necesitan configurarse en Matomo.

### 1.1 Acceder a Custom Dimensions

1. **Login a Matomo**
   - URL: https://analytics.entersys.mx
   - Usar credenciales de administrador

2. **Navegar a Custom Dimensions**
   ```
   Administration (engrane superior derecha)
   → Websites
   → Custom Dimensions
   ```

### 1.2 Crear las 6 Custom Dimensions

Crear estas dimensiones **en orden** (importante para que los IDs coincidan con el código):

---

#### **Dimensión 1: User Type**

| Campo | Valor |
|-------|-------|
| **Name** | User Type |
| **Scope** | Visit |
| **Active** | Yes ✓ |
| **Description** | Tipo de usuario: visitor, lead, customer, partner |
| **Extracts** | Leave empty |

**Valores esperados:** visitor, lead, customer, partner

**Botón:** Click **"Create Custom Dimension"**

---

#### **Dimensión 2: Industry**

| Campo | Valor |
|-------|-------|
| **Name** | Industry |
| **Scope** | Visit |
| **Active** | Yes ✓ |
| **Description** | Industria o sector del usuario |
| **Extracts** | Leave empty |

**Valores esperados:** automation, integration, consulting, development, manufacturing, retail, services, etc.

**Botón:** Click **"Create Custom Dimension"**

---

#### **Dimensión 3: Company Size**

| Campo | Valor |
|-------|-------|
| **Name** | Company Size |
| **Scope** | Visit |
| **Active** | Yes ✓ |
| **Description** | Tamaño de la empresa del usuario |
| **Extracts** | Leave empty |

**Valores esperados:** small, medium, large, unknown

**Botón:** Click **"Create Custom Dimension"**

---

#### **Dimensión 4: Lead Source**

| Campo | Valor |
|-------|-------|
| **Name** | Lead Source |
| **Scope** | Visit |
| **Active** | Yes ✓ |
| **Description** | Origen del lead: cómo nos encontró |
| **Extracts** | Leave empty |

**Valores esperados:** referral, social_media, web_search, whatsapp, event, recommendation, direct

**Botón:** Click **"Create Custom Dimension"**

---

#### **Dimensión 5: Mautic Lead ID**

| Campo | Valor |
|-------|-------|
| **Name** | Mautic Lead ID |
| **Scope** | **Visitor** ← IMPORTANTE |
| **Active** | Yes ✓ |
| **Description** | ID del lead en Mautic CRM para sincronización |
| **Extracts** | Leave empty |

**Valores esperados:** Números (IDs de Mautic)

**⚠️ NOTA:** Esta dimensión usa scope **"Visitor"** (no "Visit") para persistir entre sesiones.

**Botón:** Click **"Create Custom Dimension"**

---

#### **Dimensión 6: User Journey Stage**

| Campo | Valor |
|-------|-------|
| **Name** | User Journey Stage |
| **Scope** | Visit |
| **Active** | Yes ✓ |
| **Description** | Etapa del usuario en el funnel de conversión |
| **Extracts** | Leave empty |

**Valores esperados:** awareness, consideration, decision, retention

**Botón:** Click **"Create Custom Dimension"**

---

### 1.3 Verificar IDs de Custom Dimensions

Después de crear las 6 dimensiones, **verificar que los IDs sean correctos**:

```
Settings → Websites → Custom Dimensions
```

Deberías ver:

| ID | Name | Scope | Active |
|----|------|-------|--------|
| 1 | User Type | Visit | ✓ |
| 2 | Industry | Visit | ✓ |
| 3 | Company Size | Visit | ✓ |
| 4 | Lead Source | Visit | ✓ |
| 5 | Mautic Lead ID | **Visitor** | ✓ |
| 6 | User Journey Stage | Visit | ✓ |

**⚠️ IMPORTANTE:** Si los IDs no coinciden (1-6), necesitas eliminarlas y recrearlas en orden.

---

## 2. Configuración de Goals

Los **Goals** miden conversiones específicas. Aquí configuramos los más importantes.

### 2.1 Acceder a Goals

```
Administration (engrane superior derecha)
→ Websites
→ Goals
```

Click en **"Add a new goal"**

---

### 2.2 Crear los Goals

---

#### **Goal 1: Contact Form Submission**

**Configuración:**

| Campo | Valor |
|-------|-------|
| **Goal name** | Contact Form Submission |
| **Goal description** | Usuario envió formulario de contacto |
| **Goal is triggered** | Manually (using JavaScript tracking code) |
| **Match attribute** | Event |
| **Event Category** | Form |
| **Event Action** | Submit |
| **Event Name** | contact_form |
| **Revenue** | $100 (valor estimado del lead) |
| **Allow multiple conversions per visit** | No |

**Botón:** Click **"Add Goal"**

**ID asignado:** Goal ID 1

---

#### **Goal 2: WhatsApp Click**

**Configuración:**

| Campo | Valor |
|-------|-------|
| **Goal name** | WhatsApp Click |
| **Goal description** | Usuario hizo clic en botón de WhatsApp |
| **Goal is triggered** | Manually (using JavaScript tracking code) |
| **Match attribute** | Event |
| **Event Category** | CTA |
| **Event Action** | WhatsApp Click |
| **Event Name** | Leave empty (matches all) |
| **Revenue** | $50 (valor estimado) |
| **Allow multiple conversions per visit** | No |

**Botón:** Click **"Add Goal"**

**ID asignado:** Goal ID 2

---

#### **Goal 3: Form Started**

**Configuración:**

| Campo | Valor |
|-------|-------|
| **Goal name** | Form Started |
| **Goal description** | Usuario empezó a llenar formulario |
| **Goal is triggered** | Manually (using JavaScript tracking code) |
| **Match attribute** | Event |
| **Event Category** | Form |
| **Event Action** | Form Start |
| **Event Name** | contact_form |
| **Revenue** | $10 (indica interés) |
| **Allow multiple conversions per visit** | No |

**Botón:** Click **"Add Goal"**

**ID asignado:** Goal ID 3

---

#### **Goal 4: Scroll to Bottom**

**Configuración:**

| Campo | Valor |
|-------|-------|
| **Goal name** | Scroll to Bottom |
| **Goal description** | Usuario scrolleó hasta el final de la página |
| **Goal is triggered** | Manually (using JavaScript tracking code) |
| **Match attribute** | Event |
| **Event Category** | Engagement |
| **Event Action** | Scroll Depth |
| **Event Name** | 100% |
| **Revenue** | $5 (indica engagement) |
| **Allow multiple conversions per visit** | No |

**Botón:** Click **"Add Goal"**

**ID asignado:** Goal ID 4

---

#### **Goal 5: Lead Conversion (cualquier método)**

**Configuración:**

| Campo | Valor |
|-------|-------|
| **Goal name** | Lead Conversion |
| **Goal description** | Usuario se convirtió en lead por cualquier canal |
| **Goal is triggered** | Manually (using JavaScript tracking code) |
| **Match attribute** | Event |
| **Event Category** | Conversion |
| **Event Action** | Leave empty (matches all) |
| **Event Name** | Leave empty |
| **Revenue** | $100 |
| **Allow multiple conversions per visit** | No |

**Botón:** Click **"Add Goal"**

**ID asignado:** Goal ID 5

---

### 2.3 Verificar Goals Creados

Después de crear los 5 goals, verificar:

```
Settings → Websites → Goals
```

Deberías ver:

| ID | Name | Trigger | Revenue |
|----|------|---------|---------|
| 1 | Contact Form Submission | Event: Form / Submit / contact_form | $100 |
| 2 | WhatsApp Click | Event: CTA / WhatsApp Click | $50 |
| 3 | Form Started | Event: Form / Form Start / contact_form | $10 |
| 4 | Scroll to Bottom | Event: Engagement / Scroll Depth / 100% | $5 |
| 5 | Lead Conversion | Event: Conversion | $100 |

---

## 3. Verificación y Testing

### 3.1 Verificar Custom Dimensions

1. **Navegar a reportes:**
   ```
   Visitors → Custom Dimensions
   ```

2. **Seleccionar cada dimensión** (User Type, Industry, etc.)

3. **Deberías ver:**
   - Datos empezando a llegar
   - Valores como "visitor", "lead", etc.
   - Número de visits por cada valor

### 3.2 Verificar Goals

1. **Navegar a reportes:**
   ```
   Goals → Overview
   ```

2. **Deberías ver:**
   - Los 5 goals listados
   - Conversiones empezando a registrarse
   - Revenue total

### 3.3 Test Manual Completo

**Flujo a probar:**

1. **Abrir sitio en incognito:**
   ```
   https://www.entersys.mx
   ```

2. **Abrir consola (F12) y ejecutar:**
   ```javascript
   // Verificar que analytics esté cargado
   window.entersysAnalytics.getStatus()
   ```

   Deberías ver:
   ```javascript
   {
     initialized: true,
     scriptLoaded: true,
     scrollTrackingEnabled: true,
     paqAvailable: true,
     paqLength: > 0
   }
   ```

3. **Scrollear hasta el final de la página**
   - Debería triggerar Goal 4 (Scroll to Bottom)

4. **Ir a página de contacto:**
   ```
   https://www.entersys.mx/contacto
   ```

5. **Llenar formulario parcialmente (solo nombre)**
   - Debería triggerar Goal 3 (Form Started)

6. **Completar y enviar formulario**
   - Debería triggerar Goal 1 (Contact Form Submission)
   - Custom Dimensions deberían actualizarse a "lead"

7. **Click en botón de WhatsApp**
   - Debería triggerar Goal 2 (WhatsApp Click)

8. **Verificar en Matomo (esperar 1-2 minutos):**
   ```
   Visitors → Real-time → Visitor Log
   ```

   Deberías ver:
   - Tu visita con todos los eventos
   - Custom dimensions aplicadas
   - Goals convertidos

---

## 4. Troubleshooting

### 4.1 Custom Dimensions no aparecen

**Síntoma:** No veo datos en Visitors → Custom Dimensions

**Soluciones:**

1. **Verificar IDs en código vs Matomo:**
   ```javascript
   // En consola del navegador
   window.entersysAnalytics.testConnection()
   ```

2. **Verificar que dimensions estén Active:**
   ```
   Settings → Websites → Custom Dimensions
   ```
   Todas deben tener ✓ en "Active"

3. **Forzar un tracking manual:**
   ```javascript
   window.entersysAnalytics.trackUserContext({
     userType: 'lead',
     industry: 'test',
     leadSource: 'test',
     journeyStage: 'decision'
   })
   ```

4. **Esperar 5 minutos** y refrescar reportes

---

### 4.2 Goals no se están triggerando

**Síntoma:** Goals en 0 conversiones

**Soluciones:**

1. **Verificar Event tracking:**
   ```javascript
   // En consola
   window.entersysAnalytics.trackEvent('Form', 'Submit', 'contact_form')
   ```

2. **Revisar configuración de Goals:**
   - Event Category debe coincidir EXACTAMENTE
   - Event Action debe coincidir EXACTAMENTE
   - Event Name debe coincidir o estar vacío

3. **Verificar en Real-time log:**
   ```
   Visitors → Real-time → Visitor Log
   ```
   Click en tu visita → Ver eventos → Verificar Category/Action/Name

4. **Regex vs Exact match:**
   - Matomo usa "contains" por defecto
   - Asegúrate que Event Category = "Form" (no "form" o "FORM")

---

### 4.3 Datos aparecen pero son incorrectos

**Síntoma:** Custom dimensions muestran valores extraños

**Soluciones:**

1. **Limpiar localStorage:**
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   ```

2. **Verificar que estés en producción:**
   ```javascript
   // Verificar environment
   import.meta.env.MODE
   // Debe ser "production"
   ```

3. **Revisar console logs (solo en dev):**
   - No debe haber errores en la consola
   - Verificar que `trackUserContext()` se llame correctamente

---

### 4.4 Script de Matomo no carga

**Síntoma:** `window._paq` no está definido

**Soluciones:**

1. **Verificar URL de Matomo:**
   ```javascript
   // En consola
   console.log(config.analytics.matomo.url)
   // Debe ser: https://analytics.entersys.mx
   ```

2. **Verificar conectividad:**
   ```bash
   curl -I https://analytics.entersys.mx/matomo.js
   # Debe retornar HTTP/2 200
   ```

3. **Revisar Content Security Policy:**
   - Asegurarse que analytics.entersys.mx esté permitido

4. **Revisar ad blockers:**
   - Desactivar AdBlock/uBlock para testing
   - Matomo puede ser bloqueado por extensiones

---

## 5. Comandos Útiles para Testing

### 5.1 Testing desde Consola del Navegador

```javascript
// === VERIFICACIÓN INICIAL ===

// 1. Verificar que analytics esté cargado
window.entersysAnalytics.getStatus()

// 2. Test de conexión
window.entersysAnalytics.testConnection()

// === TESTING DE EVENTOS ===

// 3. Track page view manual
window.entersysAnalytics.trackPageView('Test Page')

// 4. Track evento genérico
window.entersysAnalytics.trackEvent('Test', 'Manual Event', 'Testing')

// 5. Track form submission
window.entersysAnalytics.trackFormSubmission('test_form')

// 6. Track WhatsApp click
window.entersysAnalytics.trackWhatsApp('test_source')

// === TESTING DE CUSTOM DIMENSIONS ===

// 7. Set dimensión individual
window.entersysAnalytics.setCustomDimension(1, 'test_user')

// 8. Track user context completo
window.entersysAnalytics.trackUserContext({
  userType: 'lead',
  industry: 'testing',
  companySize: 'small',
  leadSource: 'manual_test',
  mauticLeadId: '12345',
  journeyStage: 'decision'
})

// === TESTING DE CONTENT ===

// 9. Track download
window.entersysAnalytics.trackDownload('test-file.pdf', 'PDF')

// 10. Track scroll depth
window.entersysAnalytics.setupScrollTracking()

// === VERIFICACIÓN DE DATOS ===

// 11. Verificar queue de Matomo
console.log(window._paq)

// 12. Ver localStorage
console.log({
  leadEmail: localStorage.getItem('leadEmail'),
  mauticLeadId: localStorage.getItem('mauticLeadId'),
  userType: localStorage.getItem('userType')
})
```

### 5.2 Verificación en Matomo Dashboard

**Real-time Visitor Log:**
```
Visitors → Real-time → Visitor Log
```
- Refrescar cada 10 segundos
- Ver tu visita en tiempo real
- Click en tu IP → Ver detalles completos

**Custom Dimensions Report:**
```
Visitors → Custom Dimensions → [Seleccionar dimensión]
```
- Ver distribución de valores
- Comparar periods

**Events Report:**
```
Behaviour → Events
```
- Ver todas las categorías
- Drill down: Category → Action → Name

**Goals Report:**
```
Goals → Overview
```
- Ver conversiones totales
- Revenue generado
- Conversion rate

---

## 6. Próximos Pasos Opcionales

### 6.1 Crear Segmentos Avanzados

Una vez que tengas datos, puedes crear segmentos:

```
Administration → Websites → Segments
```

**Ejemplos:**

1. **Leads de Alta Intención:**
   - User Type = "lead"
   - Journey Stage = "decision"
   - Goal WhatsApp Click convertido

2. **Visitantes Comprometidos:**
   - Scroll Depth = 100%
   - Time on site > 2 minutos
   - Páginas vistas > 3

3. **Leads por Fuente:**
   - User Type = "lead"
   - Lead Source = "social_media"

### 6.2 Configurar Email Reports

```
Personal → Email Reports
```

Crear reporte semanal con:
- Total visits
- Goals conversions
- Custom dimensions breakdown
- Top events

### 6.3 Integrar con Google Data Studio

Puedes exportar datos de Matomo a Google Data Studio para dashboards más visuales:

1. Install Matomo plugin "Google Analytics Importer"
2. Configure API access
3. Connect to Data Studio

---

## 7. Checklist de Configuración

### ✅ Custom Dimensions

- [ ] Dimensión 1: User Type (Visit scope)
- [ ] Dimensión 2: Industry (Visit scope)
- [ ] Dimensión 3: Company Size (Visit scope)
- [ ] Dimensión 4: Lead Source (Visit scope)
- [ ] Dimensión 5: Mautic Lead ID (Visitor scope) ⚠️
- [ ] Dimensión 6: User Journey Stage (Visit scope)
- [ ] Verificar IDs 1-6 correctos
- [ ] Todas activas (✓)

### ✅ Goals

- [ ] Goal 1: Contact Form Submission ($100)
- [ ] Goal 2: WhatsApp Click ($50)
- [ ] Goal 3: Form Started ($10)
- [ ] Goal 4: Scroll to Bottom ($5)
- [ ] Goal 5: Lead Conversion ($100)
- [ ] Verificar triggers configurados correctamente

### ✅ Testing

- [ ] Status check: `window.entersysAnalytics.getStatus()`
- [ ] Test connection: `window.entersysAnalytics.testConnection()`
- [ ] Track manual event y verificar en Real-time
- [ ] Llenar formulario y verificar Goal 1
- [ ] Click WhatsApp y verificar Goal 2
- [ ] Scrollear y verificar Goal 4
- [ ] Verificar Custom Dimensions en reportes

### ✅ Monitoreo

- [ ] Configurar email alerts para goals
- [ ] Revisar datos diariamente primera semana
- [ ] Crear dashboards personalizados
- [ ] Documentar hallazgos y optimizaciones

---

## 8. Recursos Adicionales

**Documentación oficial Matomo:**
- Custom Dimensions: https://matomo.org/docs/custom-dimensions/
- Goals: https://matomo.org/docs/tracking-goals-web-analytics/
- Events: https://matomo.org/docs/event-tracking/

**Soporte:**
- Matomo Forum: https://forum.matomo.org/
- GitHub Issues: https://github.com/matomo-org/matomo/issues

**Videos tutoriales:**
- Matomo Academy: https://matomo.org/academy/

---

**Última actualización:** 13 de Octubre de 2025
**Autor:** Claude Code
**Versión:** 1.0
