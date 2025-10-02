# 🔍 Verificación Manual de CTAs - dev.entersys.mx

**INSTRUCCIONES DE TESTING EN VIVO**

## 🚀 Paso 1: Preparación

1. **Abre Chrome** (o tu navegador preferido)
2. **Navega a:** https://dev.entersys.mx
3. **Presiona F12** para abrir DevTools
4. **Ve a la pestaña "Network"**
5. **Recarga la página** (Ctrl+F5)

## 📱 Paso 2: Test WhatsApp Button

### Verificaciones:
- [ ] **Botón visible:** ¿Ves un botón flotante de WhatsApp en la esquina inferior derecha?
- [ ] **Estilo correcto:** ¿Es un círculo verde con ícono de WhatsApp?
- [ ] **Hover funciona:** ¿Cambia de color al pasar el mouse?

### Testing del Click:
1. **Haz click** en el botón de WhatsApp
2. **En DevTools Network busca:**
   - [ ] Requests a `crm.entersys.mx`
   - [ ] `mtracking.gif` (pixel de tracking)
   - [ ] Cualquier request con "mautic" en la URL

### Console Debugging:
1. **Ve a la pestaña "Console"** en DevTools
2. **Busca mensajes como:**
   - `🔍 WhatsApp Button Debug Info:`
   - `📱 WhatsApp button clicked`
   - `📝 Anonymous WhatsApp lead captured`
   - `✅ WhatsApp opened successfully`

## 📧 Paso 3: Test Contact Form

### Navegar a Contacto:
1. **Ve a:** https://dev.entersys.mx/contacto
2. **Espera** a que cargue completamente

### Verificar Formulario:
- [ ] **Form visible:** ¿Ves un formulario de contacto?
- [ ] **Campos presentes:** Nombre, Email, Empresa, Mensaje
- [ ] **Botón Submit:** ¿Hay un botón de envío?

### Test de Envío:
1. **Llena los campos** con datos de prueba:
   ```
   Nombre: Test CTA Usuario
   Email: test-cta@entersys-test.com
   Empresa: Test Company
   Mensaje: Probando integración CTA con analytics
   ```

2. **Antes de enviar**, verifica Network tab está abierto

3. **Haz click en Submit**

4. **Busca en Network:**
   - [ ] POST requests a APIs
   - [ ] Requests a `crm.entersys.mx`
   - [ ] Response 200/201 exitoso

## 🔘 Paso 4: Test CTAs por Página

### Homepage (/)
**Verifica elementos:**
- [ ] Botón "Conocer" en hero section
- [ ] Botón "Explorar" en hero section
- [ ] CTAs en secciones de servicios
- [ ] Navigation links funcionan

### Servicios (/servicios)
**Verifica elementos:**
- [ ] Botones de cotización
- [ ] CTAs específicos por servicio
- [ ] Enlaces a contacto

### Sobre Nosotros (/sobre-nosotros)
**Verifica elementos:**
- [ ] CTAs institucionales
- [ ] Enlaces informativos

### Cada página debe tener:
- [ ] WhatsApp button flotante
- [ ] Navigation working
- [ ] Sin errores 404 en Console

## 🔧 Paso 5: Debugging Avanzado

### En Console, ejecuta:
```javascript
// Verificar carga de servicios
console.log('Mautic Config:', window.MAUTIC_CONFIG);
console.log('Mautic Service:', typeof window.mauticService);

// Test manual si está disponible
if (window.mauticService) {
    console.log('✅ Mautic service loaded');
    // window.mauticService.trackEvent('manual-test', 'cta-verification');
}

// Verificar WhatsApp button
const whatsappBtn = document.querySelector('.whatsapp-float-button') ||
                   document.querySelector('[class*="whatsapp"]');
console.log('WhatsApp Button:', whatsappBtn ? '✅ Found' : '❌ Not found');
```

### Network Monitoring:
**Durante todo el testing, monitorea:**
- [ ] **Sin errores 404/500** en resources
- [ ] **SSL certificates** válidos (🔒 en URL)
- [ ] **Requests a crm.entersys.mx** se ejecutan
- [ ] **Response times** < 3 segundos

## 📊 Paso 6: Reporte de Resultados

### Formato del Reporte:
```
✅/❌ WhatsApp Button: [Funcional/No funcional]
   - Visible: [Sí/No]
   - Click funciona: [Sí/No]
   - Analytics tracking: [Detectado/No detectado]

✅/❌ Contact Form: [Funcional/No funcional]
   - Form visible: [Sí/No]
   - Submit funciona: [Sí/No]
   - CRM integration: [Detectado/No detectado]

✅/❌ CTAs por página:
   - Home: [X/Y CTAs funcionando]
   - Servicios: [X/Y CTAs funcionando]
   - Sobre Nosotros: [X/Y CTAs funcionando]
   - Contacto: [X/Y CTAs funcionando]

🐛 Errores encontrados:
   - [Lista de errores si los hay]

📈 Analytics/CRM Requests observados:
   - [Lista de requests a crm.entersys.mx]
```

## 🎯 Criterios de Éxito

### ✅ TEST EXITOSO SI:
- WhatsApp button visible y funcional
- Form de contacto envía correctamente
- CTAs principales operativos
- Requests a CRM detectados en Network
- Sin errores críticos en Console

### ❌ REQUIERE ATENCIÓN SI:
- Elementos no visibles
- Clicks no generan requests
- Errores 404/500 en Console
- Formulario no envía
- Sin tracking de analytics

## 🆘 Troubleshooting

### Si WhatsApp no funciona:
1. Verificar en Console: mensajes de error
2. Network tab: ¿hay requests bloqueados?
3. Verificar que no hay Ad Blockers activos

### Si Formulario falla:
1. Console: errores de validación
2. Network: requests POST fallando
3. Verificar campos requeridos

### Si CTAs no responden:
1. Console: errores de JavaScript
2. Verificar que los enlaces son válidos
3. Comprobar que no hay overlays bloqueando clicks

---

**💡 TIP:** Mantén DevTools abierto durante todo el testing para capturar toda la información de debugging.

**⏰ Tiempo estimado:** 15-20 minutos para testing completo.