# 🧪 Guía de Pruebas - Mejoras Silicon Valley

Documento para verificar que todas las mejoras implementadas funcionan correctamente en local.

---

## 🌐 **Servidor Local**

**URL:** http://localhost:3005 (o puerto disponible)

El servidor está corriendo y listo para pruebas.

---

## ✅ **Lista de Verificación**

### 1. Error Tracking con Sentry
- [ ] Abrir DevTools Console
- [ ] Verificar mensaje: "✅ Sentry initialized successfully" (solo si está habilitado)
- [ ] En desarrollo, Sentry está deshabilitado por defecto (comportamiento correcto)

**Cómo probar:**
```javascript
// En la consola del navegador
throw new Error('Test error for Sentry')
// Este error debería ser capturado (si Sentry está habilitado)
```

---

### 2. Image Optimization (42 archivos)
- [ ] Navegar a cualquier página (Inicio, QHSE, FEMSA, Ochoa)
- [ ] Abrir DevTools → Network → Filter: Img
- [ ] Hacer scroll y observar:
  - ✅ Imágenes se cargan solo cuando entran en viewport
  - ✅ Efecto blur mientras carga
  - ✅ Imágenes usan formato WebP

**Páginas para probar:**
- `/` - Inicio
- `/clientes/qhse` - Case study con muchas imágenes
- `/clientes/femsa` - Hero image grande
- `/worksys` - Product page con imágenes

---

### 3. Loading Skeletons
- [ ] Navegar entre páginas rápidamente
- [ ] Observar skeleton loaders durante la carga
- [ ] Verificar que los skeletons coinciden con la estructura de la página

**Cómo probar:**
```javascript
// En DevTools → Network
// Throttle: Fast 3G o Slow 3G
// Navegar a: /nosotros, /worksys, /expersys
```

---

### 4. Toast Notifications
- [ ] Abrir DevTools Console
- [ ] Probar diferentes tipos de toast:

```javascript
// En la consola del navegador
import toastService from './src/services/toast'

// Success
toastService.success('¡Operación exitosa!')

// Error
toastService.error('Error al procesar')

// Warning
toastService.warning('Advertencia importante')

// Info
toastService.info('Información general')

// Loading
const loadingToast = toastService.loading('Cargando...')
setTimeout(() => toastService.dismiss(loadingToast), 2000)
```

**Ubicación:** Top-right corner

---

### 5. Web Vitals Monitoring
- [ ] Abrir DevTools Console
- [ ] Buscar logs de Web Vitals con emojis:
  - ✅ LCP (Largest Contentful Paint)
  - ✅ INP (Interaction to Next Paint) - **Reemplaza FID desde 2024**
  - ✅ CLS (Cumulative Layout Shift)
  - ✅ FCP (First Contentful Paint)
  - ✅ TTFB (Time to First Byte)

**Nota:** FID (First Input Delay) fue deprecado en web-vitals v4 y reemplazado por INP como Core Web Vital oficial.

**Ejemplo de log:**
```
✅ LCP: { value: 1234, rating: 'good', device: 'desktop', connection: '4g' }
✅ INP: { value: 89, rating: 'good', device: 'desktop', connection: '4g' }
✅ FCP: { value: 567, rating: 'good', device: 'desktop', connection: '4g' }
```

---

### 6. Code Splitting Optimizado
- [ ] Hacer build de producción:
```bash
npm run build
```

- [ ] Verificar en `dist/stats.html`:
  - ✅ vendor-react.js
  - ✅ vendor-router.js
  - ✅ vendor-motion.js
  - ✅ vendor-relume.js
  - ✅ vendor-analytics.js
  - ✅ vendor-ui.js
  - ✅ vendor-other.js

**Cómo verificar:**
```bash
# Después del build
# Abrir dist/stats.html en el navegador
# Visualizar el bundle analyzer
```

---

### 7. Accessibility (a11y)
- [ ] Presionar **TAB** al cargar la página
- [ ] Verificar que aparece "Saltar al contenido principal"
- [ ] Presionar **ENTER** en el skip link
- [ ] Debe saltar al contenido principal

**Navegación por teclado:**
- TAB: Siguiente elemento
- SHIFT + TAB: Elemento anterior
- ENTER/SPACE: Activar botón/link

**Screen readers:**
- Windows: NVDA (gratuito)
- Mac: VoiceOver (integrado)

---

## 🎯 **Pruebas Funcionales**

### Navegación
- [ ] Home → Nosotros → Worksys → Expersys
- [ ] Todas las páginas cargan correctamente
- [ ] Skeletons aparecen durante carga
- [ ] Imágenes con lazy loading

### Botones y Forms
- [ ] Todos los botones tienen cursor pointer
- [ ] Todos los botones son navegables por teclado
- [ ] Formularios tienen labels asociados

### Performance
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Lighthouse DevTools:
  - Performance: >90
  - Accessibility: >90
  - Best Practices: >90
  - SEO: >90

---

## 🔍 **Verificación en DevTools**

### Console
```
✅ All services initialized successfully
✅ Web Vitals tracking initialized
📊 Web Vitals: Disabled in development (o metrics si está habilitado)
```

### Network
- Imágenes: Lazy loaded
- JS Chunks: Code split por vendor
- CSS: Minificado

### Application → Service Workers
- PWA dependencies instaladas (workbox)
- Service Worker: Listo para configuración

---

## 📊 **Métricas Esperadas (Development)**

| Métrica | Target | Actual |
|---------|--------|--------|
| LCP | <2.5s | Medir |
| INP | <200ms | Medir |
| CLS | <0.1 | Medir |
| FCP | <1.8s | Medir |
| TTFB | <800ms | Medir |

**Nota:** INP (Interaction to Next Paint) reemplazó a FID (First Input Delay) como Core Web Vital oficial en 2024.

---

## 🐛 **Problemas Conocidos**

1. **Sentry en desarrollo**: Deshabilitado por defecto (comportamiento esperado)
2. **Web Vitals en desarrollo**: Algunas métricas pueden no aparecer
3. **Toast global**: Asegúrate de importar el servicio correctamente

---

## 🎉 **Prueba Final**

**Checklist Completo:**
- [ ] Servidor local corriendo
- [ ] Todas las páginas cargan
- [ ] Imágenes con lazy loading
- [ ] Skeletons visibles durante carga
- [ ] SkipLink funciona con TAB
- [ ] Web Vitals en console
- [ ] Sin errores en console
- [ ] Navegación fluida

---

## 📞 **Soporte**

Si encuentras algún problema:
1. Verificar console de DevTools
2. Revisar Network tab
3. Limpiar cache del navegador
4. Reiniciar dev server

---

**Estado: ✅ Todas las mejoras implementadas y listas para pruebas**

**Última actualización:** 2025-10-13
