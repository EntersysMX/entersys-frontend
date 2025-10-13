# ✅ Configuración de la 6ta Custom Dimension en Matomo

## Estado Actual

✅ **Ya configuradas en la base de datos (IDs 1-5):**

| ID | Name | Scope | Status |
|----|------|-------|--------|
| 1 | User Type | Visit | ✅ Active |
| 2 | Industry | Visit | ✅ Active |
| 3 | Company Size | Visit | ✅ Active |
| 4 | Lead Source | Visit | ✅ Active |
| 5 | Mautic Lead ID | Visit | ✅ Active |

⚠️ **Falta configurar:**
| ID | Name | Scope | Status |
|----|------|-------|--------|
| 6 | User Journey Stage | Visit | ⏳ Pendiente |

---

## 📋 Instrucciones para Crear la Dimensión #6

### **Paso 1: Acceder a Custom Dimensions**

1. Ve a: **https://analytics.entersys.mx**
2. Inicia sesión con tus credenciales
3. Haz clic en el ícono **⚙️** (engranaje) en la esquina superior derecha
4. En el menú lateral izquierdo, busca **"Websites"**
5. Haz clic en **"Custom Dimensions"**

### **Paso 2: Verificar que puedes agregar una 6ta dimensión**

- Deberías ver un botón **"+ Add New Custom Dimension"** o **"+ Configure a Custom Dimension"**
- Si no lo ves, refresca la página (F5)
- **El límite ya fue aumentado a 6 dimensiones mediante comando de consola**

### **Paso 3: Crear la Dimensión #6**

Haz clic en el botón **"+ Add New Custom Dimension"** y completa:

```
Name:        User Journey Stage
Scope:       Visit  (⚠️ NO "Visitor", sino "Visit")
Active:      ✅ Marcado
Description: Etapa del journey del usuario: awareness, consideration, decision, retention
```

### **Paso 4: Guardar**

- Haz clic en **"Create New Dimension"** o **"Save"**
- Verifica que se creó con **ID = 6**

---

## ✅ Verificación Final

Una vez creada la dimensión #6, deberías ver esta tabla completa:

| ID | Name | Scope | Status |
|----|------|-------|--------|
| 1 | User Type | Visit | Active |
| 2 | Industry | Visit | Active |
| 3 | Company Size | Visit | Active |
| 4 | Lead Source | Visit | Active |
| 5 | Mautic Lead ID | Visit | Active |
| 6 | User Journey Stage | Visit | Active |

---

## 🧪 Prueba que Funciona

### **1. Abrir el sitio web**
Ve a: https://www.entersys.mx

### **2. Abrir la consola del navegador**
Presiona **F12** → pestaña **"Console"**

### **3. Ejecutar el test de Custom Dimensions**

```javascript
window.testAnalytics.run("CustomDimensions")
```

Deberías ver:
```
✅ PASS Set Single Dimension
✅ PASS Set Multiple Dimensions
✅ PASS Track User Context
```

### **4. Ejecutar todos los tests**

```javascript
window.testAnalytics.runAll()
```

Deberías ver:
```
12/12 tests passed
```

### **5. Verificar en Matomo Real-time**

1. En Matomo, ve a: **Visitors → Real-time → Visitor Log**
2. Navega por el sitio (haz clic en WhatsApp, llena el formulario de contacto, etc.)
3. Refresca el Visitor Log
4. Haz clic en tu sesión reciente
5. **Deberías ver las Custom Dimensions pobladas:**
   - User Type: visitor
   - Journey Stage: consideration
   - Lead Source: direct (o whatsapp si hiciste clic en el botón)

---

## 🔧 Solución de Problemas

### **Problema: No veo el botón "+ Add New Custom Dimension"**

**Solución:**
1. Refresca la página (F5)
2. Cierra sesión y vuelve a iniciar sesión
3. Verifica que estés en: Administration → Websites → Custom Dimensions
4. Si aún no aparece, ejecuta este comando desde tu máquina local:

```bash
gcloud compute ssh prod-server --zone=us-central1-c --command="docker exec matomo_app ./console customdimensions:info"
```

Deberías ver:
```
6 Custom Dimensions available in scope "visit"
```

### **Problema: El ID no es 6, es otro número**

**Solución:**
Si la dimensión se creó con un ID diferente (por ejemplo, 7 u 8), necesitaremos actualizar el código para usar ese ID. Avísame qué ID se le asignó.

### **Problema: La dimensión #5 tiene scope "Visit" en lugar de "Visitor"**

**Nota:** La dimensión #5 (Mautic Lead ID) debería idealmente tener scope **"Visitor"** para que persista a través de múltiples sesiones. Sin embargo, con scope "Visit" también funcionará, solo que el ID se re-enviará en cada visita.

Si quieres cambiarla a "Visitor", necesitarás:
1. Eliminar la dimensión #5 actual
2. Crear una nueva con scope "Visitor"

**IMPORTANTE:** Esto puede causar pérdida de datos históricos de esa dimensión.

---

## 📊 Siguiente Paso: Configurar Goals

Una vez que tengas las 6 dimensiones configuradas, el siguiente paso es configurar los **5 Goals** (metas) en Matomo:

1. Contact Form Submission - $100
2. WhatsApp Click - $50
3. Form Started - $10
4. Scroll to Bottom - $5
5. Lead Conversion - $100

Avísame cuando termines de configurar la dimensión #6 y te ayudo con los Goals.

---

## 📝 Notas Técnicas

### **¿Por qué no se puede crear desde línea de comandos?**

Matomo requiere dos pasos para crear Custom Dimensions:

1. **Paso 1 (CLI):** Aumentar el número disponible de dimensiones mediante cambios en el esquema de la base de datos
   - ✅ Ya ejecutado: `./console customdimensions:add-custom-dimension --scope=visit`
   - ✅ Resultado: Ahora hay 6 espacios disponibles

2. **Paso 2 (Dashboard UI):** Configurar cada dimensión con su nombre, scope y estado
   - ✅ Dimensiones 1-5: Ya configuradas
   - ⏳ Dimensión 6: Requiere configuración manual desde el dashboard

Esto es por diseño de Matomo para prevenir errores y asegurar que cada dimensión se configure correctamente.

---

## ✅ Checklist

- [ ] Iniciar sesión en https://analytics.entersys.mx
- [ ] Ir a Administration → Websites → Custom Dimensions
- [ ] Hacer clic en "+ Add New Custom Dimension"
- [ ] Crear dimensión #6:
  - Name: User Journey Stage
  - Scope: Visit
  - Active: ✅
- [ ] Verificar que el ID asignado es 6
- [ ] Ejecutar `window.testAnalytics.run("CustomDimensions")` en la consola
- [ ] Verificar en Matomo Real-time que los datos fluyen correctamente

---

Una vez que completes este checklist, ¡la implementación de Custom Dimensions estará 100% completa! 🎉
