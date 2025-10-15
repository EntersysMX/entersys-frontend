# 📊 GUÍA COMPLETA: CONFIGURACIÓN DE EVENTOS EN GTM Y CONVERSIONES EN GA4

**Sitio:** www.entersys.mx
**GTM ID:** GTM-WHH8V38W
**GA4 ID:** G-3468MEXLPS
**Tiempo estimado:** 30-45 minutos
**Última actualización:** 13 de octubre 2025

---

## 📋 ÍNDICE

1. [Eventos que configuraremos](#eventos-que-configuraremos)
2. [Acceso a GTM](#acceso-a-gtm)
3. [Evento 1: Clic en WhatsApp](#evento-1-clic-en-whatsapp)
4. [Evento 2: Clic en "Quiero un diagnóstico"](#evento-2-clic-en-quiero-un-diagnóstico)
5. [Evento 3: Clic en "Quiero una demo"](#evento-3-clic-en-quiero-una-demo)
6. [Evento 4: Scroll Profundidad](#evento-4-scroll-profundidad)
7. [Evento 5: Envío de formulario](#evento-5-envío-de-formulario)
8. [Publicar cambios en GTM](#publicar-cambios-en-gtm)
9. [Probar los eventos](#probar-los-eventos)
10. [Configurar conversiones en GA4](#configurar-conversiones-en-ga4)

---

## 🎯 EVENTOS QUE CONFIGURAREMOS

| # | Evento | Importancia | Qué mide |
|---|--------|-------------|----------|
| 1 | **Clic WhatsApp** | ⭐⭐⭐ CRÍTICO | Leads que intentan contactarte |
| 2 | **Clic "Diagnóstico"** | ⭐⭐⭐ CRÍTICO | Interés en servicios |
| 3 | **Clic "Demo"** | ⭐⭐⭐ CRÍTICO | Interés en demostración |
| 4 | **Scroll Profundidad** | ⭐⭐ IMPORTANTE | Engagement con contenido |
| 5 | **Envío de formulario** | ⭐⭐⭐ CRÍTICO | Leads directos |

---

## 🔐 ACCESO A GTM

1. Abre tu navegador (Chrome recomendado)
2. Ve a: https://tagmanager.google.com/
3. Inicia sesión con tu cuenta de Google
4. Selecciona tu cuenta: **Entersys**
5. Selecciona tu contenedor: **GTM-WHH8V38W**

---

## 📱 EVENTO 1: CLIC EN WHATSAPP

Este es el evento MÁS IMPORTANTE porque mide leads potenciales.

### PASO 1.1: Crear Variable "Click Classes"

1. En el menú lateral izquierdo, haz clic en **"Variables"**
2. Desplázate hasta la sección **"Variables definidas por el usuario"**
3. Haz clic en el botón **"Nueva"**
4. Haz clic en el área de **"Configuración de la variable"** (ícono de lápiz)
5. En el panel lateral que aparece, busca y selecciona:
   ```
   Variables > Clics > Click Classes
   ```
6. En el campo **"Nombre"** (arriba), escribe:
   ```
   Click Classes
   ```
7. Haz clic en **"Guardar"** (esquina superior derecha)

✅ **Verificación:** Deberías ver "Click Classes" en tu lista de variables.

---

### PASO 1.2: Crear Activador "Click - WhatsApp Button"

1. En el menú lateral izquierdo, haz clic en **"Activadores"**
2. Haz clic en el botón **"Nuevo"** (esquina superior derecha)
3. Haz clic en el área de **"Configuración del activador"**
4. Selecciona el tipo: **"Todos los elementos"** (bajo "Clics")
5. Configura lo siguiente:

   **Este activador se activa en:**
   - Selecciona: ☑️ **"Algunos clics"**

   **Condiciones:**
   - Campo 1 (desplegable): Selecciona **"Click Classes"**
   - Campo 2 (desplegable): Selecciona **"contiene"**
   - Campo 3 (texto): Escribe `whatsapp-float-button`

   Debería verse así:
   ```
   Click Classes | contiene | whatsapp-float-button
   ```

6. En el campo **"Nombre"** (arriba), escribe:
   ```
   Click - WhatsApp Button
   ```
7. Haz clic en **"Guardar"**

✅ **Verificación:** Deberías ver "Click - WhatsApp Button" en tu lista de activadores.

---

### PASO 1.3: Crear Etiqueta GA4 "WhatsApp Click"

1. En el menú lateral izquierdo, haz clic en **"Etiquetas"**
2. Haz clic en el botón **"Nueva"**
3. Haz clic en el área de **"Configuración de la etiqueta"**
4. Busca y selecciona: **"Google Analytics: evento de GA4"**
5. Configura lo siguiente:

   **ID de configuración:**
   - Selecciona tu etiqueta existente: `Etiqueta de Google G-3468MEXLPS`

   **Nombre del evento:**
   - Escribe: `whatsapp_click`

   **Parámetros del evento:**
   - Haz clic en **"Agregar fila"**
   - Nombre del parámetro: `button_location`
   - Valor: `float`

   - Haz clic en **"Agregar fila"** nuevamente
   - Nombre del parámetro: `button_text`
   - Valor: `WhatsApp`

6. Haz clic en el área de **"Activación"** (abajo)
7. Selecciona: **"Click - WhatsApp Button"**
8. En el campo **"Nombre"** (arriba), escribe:
   ```
   GA4 - Event - WhatsApp Click
   ```
9. Haz clic en **"Guardar"**

✅ **Verificación:** Deberías ver "GA4 - Event - WhatsApp Click" en tu lista de etiquetas.

---

## 🎯 EVENTO 2: CLIC EN "QUIERO UN DIAGNÓSTICO"

### PASO 2.1: Crear Activador

1. **Activadores** > **"Nuevo"**
2. **Configuración del activador** > **"Todos los elementos"**
3. Configuración:
   - Este activador se activa en: ☑️ **"Algunos clics"**
   - Condición:
     ```
     Click Text | contiene | Quiero un diagnóstico
     ```
4. **Nombre:** `Click - Quiero Diagnóstico`
5. **Guardar**

---

### PASO 2.2: Crear Etiqueta GA4

1. **Etiquetas** > **"Nueva"**
2. **Configuración de la etiqueta** > **"Google Analytics: evento de GA4"**
3. Configuración:
   - **ID de configuración:** `Etiqueta de Google G-3468MEXLPS`
   - **Nombre del evento:** `cta_diagnostico_click`
   - **Parámetros:**
     - `button_text` : `Quiero un diagnóstico`
     - `event_category` : `engagement`
     - `event_label` : `cta_button`
4. **Activación:** `Click - Quiero Diagnóstico`
5. **Nombre:** `GA4 - Event - CTA Diagnóstico`
6. **Guardar**

---

## 🎯 EVENTO 3: CLIC EN "QUIERO UNA DEMO"

### PASO 3.1: Crear Activador

1. **Activadores** > **"Nuevo"**
2. **Configuración del activador** > **"Todos los elementos"**
3. Configuración:
   - Este activador se activa en: ☑️ **"Algunos clics"**
   - Condición:
     ```
     Click Text | contiene | Quiero una demo
     ```
4. **Nombre:** `Click - Quiero Demo`
5. **Guardar**

---

### PASO 3.2: Crear Etiqueta GA4

1. **Etiquetas** > **"Nueva"**
2. **Configuración de la etiqueta** > **"Google Analytics: evento de GA4"**
3. Configuración:
   - **ID de configuración:** `Etiqueta de Google G-3468MEXLPS`
   - **Nombre del evento:** `cta_demo_click`
   - **Parámetros:**
     - `button_text` : `Quiero una demo`
     - `event_category` : `engagement`
     - `event_label` : `cta_button`
4. **Activación:** `Click - Quiero Demo`
5. **Nombre:** `GA4 - Event - CTA Demo`
6. **Guardar**

---

## 📜 EVENTO 4: SCROLL PROFUNDIDAD

Este evento es MUY FÁCIL y muy útil para medir engagement.

### PASO 4.1: Habilitar Variables Incorporadas

1. En el menú lateral, haz clic en **"Variables"**
2. En la sección **"Variables incorporadas"**, haz clic en **"Configurar"**
3. Busca y activa (marca la casilla):
   - ☑️ **Scroll Depth Threshold**
   - ☑️ **Scroll Depth Units**
   - ☑️ **Percent Scrolled**
4. Haz clic en cualquier lugar fuera del panel para cerrar

✅ **Verificación:** Deberías ver estas 3 variables en "Variables incorporadas".

---

### PASO 4.2: Crear Activador

1. **Activadores** > **"Nuevo"**
2. **Configuración del activador** > Busca y selecciona: **"Profundidad de desplazamiento"**
3. Configuración:
   - **Porcentajes verticales de desplazamiento:**
     ```
     25,50,75,100
     ```
     (escribe exactamente así, separado por comas, sin espacios)

   - **Este activador se activa en:** `Todas las páginas`

4. **Nombre:** `Scroll - Depth Tracking`
5. **Guardar**

---

### PASO 4.3: Crear Etiqueta GA4

1. **Etiquetas** > **"Nueva"**
2. **Configuración de la etiqueta** > **"Google Analytics: evento de GA4"**
3. Configuración:
   - **ID de configuración:** `Etiqueta de Google G-3468MEXLPS`
   - **Nombre del evento:** `scroll`
   - **Parámetros:**
     - Nombre: `scroll_depth`
     - Valor: Haz clic en el ícono de "+" al lado del campo
     - Busca y selecciona: **{{Scroll Depth Threshold}}**
4. **Activación:** `Scroll - Depth Tracking`
5. **Nombre:** `GA4 - Event - Scroll Depth`
6. **Guardar**

---

## 📝 EVENTO 5: ENVÍO DE FORMULARIO

### PASO 5.1: Habilitar Variables Incorporadas

1. **Variables** > **"Configurar"** (en Variables incorporadas)
2. Activa:
   - ☑️ **Form ID**
   - ☑️ **Form Classes**
   - ☑️ **Form Text**
3. Cerrar panel

---

### PASO 5.2: Crear Activador

1. **Activadores** > **"Nuevo"**
2. **Configuración del activador** > **"Envío de formulario"**
3. Configuración:
   - ☑️ **Esperar la validación** (activado)
   - **Tiempo de espera:** `2000` (milisegundos)
   - **Este activador se activa en:** `Todos los formularios`
4. **Nombre:** `Form - Contact Submit`
5. **Guardar**

---

### PASO 5.3: Crear Etiqueta GA4

1. **Etiquetas** > **"Nueva"**
2. **Configuración de la etiqueta** > **"Google Analytics: evento de GA4"**
3. Configuración:
   - **ID de configuración:** `Etiqueta de Google G-3468MEXLPS`
   - **Nombre del evento:** `form_submit`
   - **Parámetros:**
     - `form_name` : `contact_form`
4. **Activación:** `Form - Contact Submit`
5. **Nombre:** `GA4 - Event - Form Submit`
6. **Guardar**

---

## 🚀 PUBLICAR CAMBIOS EN GTM

**IMPORTANTE:** Los cambios NO estarán activos hasta que publiques.

1. En la esquina superior derecha, haz clic en **"Enviar"**
2. En la pantalla que aparece:
   - **Nombre de la versión:** `Eventos de conversión v1`
   - **Descripción de la versión:**
     ```
     Agregados 5 eventos de conversión:
     - WhatsApp Click
     - CTA Diagnóstico
     - CTA Demo
     - Scroll Depth
     - Form Submit
     ```
3. Haz clic en **"Publicar"** (esquina superior derecha)
4. Espera a que aparezca la confirmación

✅ **Verificación:** Deberías ver un mensaje de éxito y el número de versión.

---

## 🧪 PROBAR LOS EVENTOS

### Método 1: Modo Vista Previa (Recomendado)

1. En GTM, haz clic en **"Vista previa"** (esquina superior derecha)
2. En el campo **"Your website's URL"**, escribe:
   ```
   https://www.entersys.mx
   ```
3. Haz clic en **"Connect"**
4. Se abrirá tu sitio web en una nueva pestaña con el debugger
5. Prueba los eventos:
   - ✅ Haz clic en el botón WhatsApp → Debe aparecer en el debugger
   - ✅ Haz clic en "Quiero un diagnóstico" → Debe aparecer
   - ✅ Haz clic en "Quiero una demo" → Debe aparecer
   - ✅ Scroll hasta el 50% de la página → Debe aparecer
   - ✅ Envía un formulario → Debe aparecer

---

### Método 2: Tiempo Real en GA4

1. Abre Google Analytics: https://analytics.google.com/
2. En el menú lateral, ve a: **Informes** > **Tiempo real**
3. Abre tu sitio en otra pestaña: https://www.entersys.mx
4. Realiza las acciones (clic en WhatsApp, CTAs, scroll, etc.)
5. En la sección **"Evento por nombre del evento"**, deberías ver:
   - `whatsapp_click`
   - `cta_diagnostico_click`
   - `cta_demo_click`
   - `scroll`
   - `form_submit`

**Nota:** Puede tardar 5-10 segundos en aparecer.

---

## 🎯 CONFIGURAR CONVERSIONES EN GA4

Después de 24-48 horas de que los eventos estén recopilando datos:

### PASO 1: Acceder a Eventos en GA4

1. Ve a: https://analytics.google.com/
2. Haz clic en **"Admin"** (engrane en la parte inferior izquierda)
3. En la columna **"Propiedad"**, haz clic en **"Eventos"**

---

### PASO 2: Marcar Eventos como Conversiones

Verás una lista de todos los eventos que GA4 ha recibido. Busca estos 4 eventos y marca cada uno como conversión:

1. Busca: **whatsapp_click**
   - Activa el toggle **"Marcar como conversión"** → 🟢

2. Busca: **cta_diagnostico_click**
   - Activa el toggle **"Marcar como conversión"** → 🟢

3. Busca: **cta_demo_click**
   - Activa el toggle **"Marcar como conversión"** → 🟢

4. Busca: **form_submit**
   - Activa el toggle **"Marcar como conversión"** → 🟢

**Nota:** El evento `scroll` NO lo marques como conversión, solo es para medir engagement.

---

### PASO 3: Verificar Conversiones

1. En **Admin** > **Conversiones** (en la columna Propiedad)
2. Deberías ver tus 4 conversiones listadas:
   - ✅ whatsapp_click
   - ✅ cta_diagnostico_click
   - ✅ cta_demo_click
   - ✅ form_submit

---

## ✅ CHECKLIST FINAL

Usa esta lista para verificar que TODO esté configurado:

### En GTM:
- [ ] 1 Variable creada: Click Classes
- [ ] 5 Activadores creados
- [ ] 5 Etiquetas GA4 creadas
- [ ] Contenedor publicado
- [ ] Eventos probados en Vista Previa

### En GA4:
- [ ] Eventos visibles en Tiempo Real
- [ ] 4 Eventos marcados como conversiones
- [ ] Conversiones visibles en Admin > Conversiones

---

## 📊 QUÉ ESPERAR

### En 24-48 horas:
- ✅ Verás datos de eventos acumulándose en GA4
- ✅ Podrás ver qué botones reciben más clics
- ✅ Sabrás cuántos visitantes hacen scroll completo
- ✅ Tendrás métricas de conversión

### En 1 semana:
- ✅ Patrones de comportamiento de usuarios
- ✅ Páginas con mejor engagement
- ✅ Tasa de conversión por página
- ✅ Fuentes de tráfico que convierten mejor

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### "No veo el evento en Vista Previa"
- Verifica que el activador tenga las condiciones correctas
- Verifica que el elemento exista en la página
- Prueba hacer clic varias veces

### "No veo eventos en Tiempo Real de GA4"
- Espera 5-10 minutos después de publicar GTM
- Verifica que usaste el ID correcto: G-3468MEXLPS
- Limpia caché del navegador y prueba en modo incógnito

### "No puedo marcar eventos como conversiones en GA4"
- Espera 24 horas después de que los eventos empiecen a enviar datos
- Verifica que estés en Admin > Eventos (no en Informes)
- Refresca la página

---

## 📞 CONTACTO Y SOPORTE

Si tienes dudas o problemas:
1. Revisa esta guía paso a paso
2. Usa el modo Vista Previa para debuggear
3. Consulta la documentación oficial:
   - GTM: https://support.google.com/tagmanager
   - GA4: https://support.google.com/analytics

---

## 🎉 ¡FELICIDADES!

Una vez completada esta guía, tendrás:
- ✅ Tracking completo de conversiones
- ✅ Datos para optimizar tu sitio
- ✅ Métricas de engagement
- ✅ Base para campañas de marketing

**Tiempo de configuración:** 30-45 minutos
**Valor para tu negocio:** INVALUABLE

---

**Última actualización:** 13 de octubre 2025
**Versión:** 1.0
**Creado para:** Entersys (www.entersys.mx)
