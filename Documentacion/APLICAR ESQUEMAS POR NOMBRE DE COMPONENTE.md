## 🎨 **PROMPT PARA CLAUDE CODE - APLICAR ESQUEMAS POR NOMBRE DE COMPONENTE**

```markdown
# OBJETIVO: Aplicar esquemas de color a componentes existentes usando Nombre de Componente Relume

## 📁 RUTA DE TRABAJO LOCAL
```
C:\Web_Entersys\entersys-frontend\
```

## ⚠️ RESTRICCIONES CRÍTICAS
- **NO modificar** esquemas de color existentes
- **NO cambiar** estructura de componentes existentes  
- **NO crear** nuevos archivos CSS
- **SOLO aplicar** clases de esquemas a componentes existentes

## 🎯 TAREA: MAPEO POR NOMBRE DE COMPONENTE RELUME

Localizar cada componente por su **Nombre de Componente** (identificadores Relume) y aplicar el esquema correspondiente:

### PÁGINA INICIO:
- **Header 5** → Aplicar clase: `scheme-4`
- **Layout 363** → Aplicar clase: `scheme-4`
- **Layout 394** → Aplicar clase: `scheme-1`
- **Layout 245** → Aplicar clase: `scheme-2`
- **Layout 501** → Aplicar clase: `scheme-4`
- **Layout 241** → Aplicar clase: `scheme-2`
- **FAQ 4** → Aplicar clase: `scheme-1`

### PÁGINA NOSOTROS:
- **Header 114** → Aplicar clase: `scheme-4`
- **Header 141** → Aplicar clase: `scheme-2`
- **Layout 93** → Aplicar clase: `scheme-2`
- **Timeline 20** → Aplicar clase: `scheme-4`
- **Layout 213** → Aplicar clase: `scheme-1`
- **Logo 3** → Aplicar clase: `scheme-3`
- **CTA 39** → Aplicar clase: `scheme-1`

### PÁGINA WORKSYS:
- **Header 30** → Aplicar clase: `scheme-2`
- **Layout 421** → Aplicar clase: `scheme-2`
- **Layout 74** → Aplicar clase: `scheme-4`
- **Layout 243** → Aplicar clase: `scheme-1`
- **Layout 109** → Aplicar clase: `scheme-4`
- **Layout 237** (primer instancia) → Aplicar clase: `scheme-2`
- **FAQ 3** → Aplicar clase: `scheme-2`
- **Layout 237** (segunda instancia) → Aplicar clase: `scheme-4`
- **CTA 39** → Aplicar clase: `scheme-3`
- **Blog 37** → Aplicar clase: `scheme-2`
- **FAQ 5** → Aplicar clase: `scheme-1`

### PÁGINA EXPERSYS:
- **Header 30** → Aplicar clase: `scheme-2`
- **Layout 16** → Aplicar clase: `scheme-2`
- **Layout 492** → Aplicar clase: `scheme-4`
- **Layout 121** → Aplicar clase: `scheme-2`
- **Layout 253** → Aplicar clase: `scheme-1`
- **Layout 239** → Aplicar clase: `scheme-4`
- **Blog 37** → Aplicar clase: `scheme-2`
- **CTA 39** → Aplicar clase: `scheme-3`
- **FAQ 5** → Aplicar clase: `scheme-1`

### PÁGINA CLIENTES:
- **Header 64** → Aplicar clase: `scheme-2`
- **Portfolio 9** → Aplicar clase: `scheme-1`
- **CTA 39** → Aplicar clase: `scheme-3`
- **Event 23** → Aplicar clase: `scheme-1`

### PÁGINA CLIENT-ENTRY:
- **Blog post Header 1** → Aplicar clase: `scheme-1`
- **Content 27** → Aplicar clase: `scheme-1`
- **Stats 30** → Aplicar clase: `scheme-2`
- **Testimonial 17** → Aplicar clase: `scheme-1`
- **Gallery 1** → Aplicar clase: `scheme-4`
- **CTA 39** → Aplicar clase: `scheme-3`

### PÁGINA BLOG:
- **Blog 30** → Aplicar clase: `scheme-2`
- **Blog 68** → Aplicar clase: `scheme-4`
- **Contact 13** → Aplicar clase: `scheme-2`
- **FAQ 5** → Aplicar clase: `scheme-2`

### PÁGINA BLOG-ENTRY:
- **Blog Post Header 4** → Aplicar clase: `scheme-2`
- **Content 27** → Aplicar clase: `scheme-1`
- **Blog 30** → Aplicar clase: `scheme-2`
- **Blog 68** → Aplicar clase: `scheme-4`

### PÁGINA CONTACTO:
- **Header 64** → Aplicar clase: `scheme-2`
- **Contact 6** → Aplicar clase: `scheme-1`
- **Contact 13** → Aplicar clase: `scheme-1`
- **Contact 26** → Aplicar clase: `scheme-2`

## 🔧 MÉTODO DE IDENTIFICACIÓN

Los componentes pueden estar identificados de varias formas:
```
<!-- Posibles identificadores a buscar: -->
<section class="header-5">          <!-- Por nombre de componente -->
<div data-component="Header 5">     <!-- Por data attribute -->
<section id="header-5">             <!-- Por ID -->
<!-- Header 5 -->                   <!-- Por comentario -->
```

## 🔧 IMPLEMENTACIÓN REQUERIDA

**ANTES:**
```
<section class="header-component" data-component="Header 5">
    <!-- contenido existente -->
</section>
```

**DESPUÉS:**
```
<section class="header-component scheme-4" data-component="Header 5">
    <!-- contenido existente - SIN MODIFICAR -->
</section>
```

## 📋 PROCESO DE TRABAJO

1. **Buscar** cada componente por su nombre Relume (Header 5, Layout 363, etc.)
2. **Identificar** el elemento contenedor principal 
3. **Añadir** la clase de esquema correspondiente
4. **NO modificar** ningún otro código existente

## 🎯 RESULTADO ESPERADO

Cada componente Relume tendrá aplicado su esquema de color correcto:
- **scheme-1**: Fondo blanco (#ffffff)
- **scheme-2**: Fondo verde claro (#E5F5F6)  
- **scheme-3**: Fondo verde azulado (#009CA6)
- **scheme-4**: Fondo azul oscuro (#093D53)

Revisa la documentacion y localiza cada componente por su Nombre y aplicar los esquemas correspondientes