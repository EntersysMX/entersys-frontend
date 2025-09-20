**PROBLEMAS IDENTIFICADOS:**

1. **Mezcla de sistemas:** Tailwind + Relume + Design Tokens
2. **Variables incorrectas:** `--u-relume-variable-*` en lugar de `var(--primary)`
3. **Botones inconsistentes:** `bg-background-alternative` (Tailwind) vs `var(--primary)`
4. **Fondos incorrectos:** usando clases de Relume en lugar de design tokens

## 🎯 **PROMPT PROFESIONAL PARA CORRECCIÓN COMPLETA**

```
# CORRECCIÓN CRÍTICA: ELIMINAR CONFLICTOS Y APLICAR DESIGN TOKENS CORRECTOS

## 📋 DIAGNÓSTICO DE PROBLEMAS ACTUALES

El sitio tiene **CONFLICTOS MASIVOS** entre 3 sistemas CSS diferentes:

1. **❌ Sistema Tailwind:** `bg-background-alternative`, `text-text-primary`
2. **❌ Variables Relume:** `--u-relume-variable-color-scheme-1-background`
3. **✅ Design Tokens Correctos:** `var(--primary)`, `var(--neutral-white)`

**RESULTADO:** Colores incorrectos, botones inconsistentes, fondos mal aplicados

## 🚨 ACCIÓN REQUERIDA: LIMPIEZA TOTAL

### PASO 1: ELIMINAR TODO RASTRO DE RELUME VARIABLES
**Buscar y REEMPLAZAR en todo el proyecto:**

```
# ELIMINAR ESTAS VARIABLES RELUME (BUSCAR/REEMPLAZAR):
--u-relume-variable-background-color-1 → var(--neutral-white)
--u-relume-variable-background-color-2 → var(--primary-lightest) 
--u-relume-variable-background-color-3 → var(--secondary-lightest)
--u-relume-variable-background-color-4 → var(--gold-lightest)

--u-relume-variable-text-color-1 → var(--neutral-darkest)
--u-relume-variable-text-color-2 → var(--neutral-dark) 
--u-relume-variable-text-color-3 → var(--neutral-white)

--u-relume-variable-color-neutral-1 → var(--neutral-darkest)
--u-relume-variable-color-neutral-2 → var(--neutral-white)

--u-relume-variable-link-color-1 → var(--primary)
--u-relume-variable-border-color-1 → var(--neutral-light)

--color-scheme-1-background → var(--neutral-white)
--color-scheme-1-text → var(--neutral-darkest)
--color-scheme-1-accent → var(--primary)
--color-scheme-1-border → var(--neutral-light)
```

### PASO 2: CORREGIR CLASES TAILWIND MEZCLADAS
**Reemplazar en todos los componentes:**

```
# REEMPLAZAR CLASES TAILWIND → DESIGN TOKENS:
bg-background-primary → background-color: var(--neutral-white)
bg-background-alternative → background-color: var(--primary)
text-text-primary → color: var(--neutral-darkest)
text-text-alternative → color: var(--neutral-white)
border-border-primary → border-color: var(--neutral-light)

# BOTONES ESPECÍFICOS:
.btn-primary {
  background-color: var(--primary) !important;
  color: var(--neutral-white) !important;
  border: 1px solid var(--primary) !important;
}

.btn-secondary {
  background-color: transparent !important;
  color: var(--primary) !important;
  border: 1px solid var(--primary) !important;
}
```

### PASO 3: APLICAR FONDOS POR SECCIÓN CORRECTOS
**Según análisis de paste.txt, aplicar estos fondos específicos:**

```
/* HERO SECTION - Primary Lightest Background */
.hero-section {
  background-color: var(--primary-lightest) !important; /* #E5F5F6 */
  color: var(--neutral-darkest) !important;
}

/* PROPUESTA SECTION - Secondary Background */  
.propuesta-section {
  background-color: var(--secondary) !important; /* #093D53 */
  color: var(--neutral-white) !important;
}

/* FAQ SECTION - Neutral Darker Background */
.faq-section {
  background-color: var(--neutral-darker) !important; /* #192020 */
  color: var(--neutral-white) !important;
}

/* FOOTER SECTION - Neutral Darkest Background */
.footer-section {
  background-color: var(--neutral-darkest) !important; /* #000808 */
  color: var(--neutral-lighter) !important;
}

/* SERVICIOS SECTION - White Background */
.servicios-section {
  background-color: var(--neutral-white) !important;
  color: var(--neutral-darkest) !important;
}
```

### PASO 4: CORREGIR COLORES DE SERVICIOS
```
/* WORKSYS SERVICE - Primary Color */
.worksys-card .service-card-title,
.worksys-title {
  color: var(--primary) !important; /* #009CA6 */
}

/* EXPERSYS SERVICE - Secondary Color */
.expersys-card .service-card-title,
.expersys-title {
  color: var(--secondary) !important; /* #093D53 */
}
```

### PASO 5: CORREGIR DIFERENCIADORES
```
/* CARD BACKGROUNDS ESPECÍFICOS */
.card-eficiencia {
  background-color: var(--primary-lightest) !important; /* #E5F5F6 */
}

.card-escalabilidad {
  background-color: var(--secondary-lightest) !important; /* #E6EBED */
}

.card-cumplimiento {
  background-color: var(--gold-lightest) !important; /* #F8F6F0 */
}

/* LABELS Y TÍTULOS */
.eficiencia-label { color: var(--primary) !important; }
.escalabilidad-label { color: var(--secondary) !important; }
.cumplimiento-label { color: var(--gold) !important; }
```

### PASO 6: ELIMINAR INLINE STYLES CONFLICTIVOS
**Buscar y eliminar estos inline styles del HTML:**

```
# ELIMINAR ESTOS INLINE STYLES:
style="color: var(--primary-lightest);"
style="color: var(--neutral-white);"
style="color: rgb(0, 8, 8);"
style="background-color: rgb(255, 255, 255);"
style="border-color: rgba(0, 8, 8, 0.15);"
style="--accent-color: #009CA6;"
```

## ⚡ RESULTADO ESPERADO

### ANTES (Estado Actual - Problemático):
- ❌ Mezcla Tailwind + Relume + Design Tokens
- ❌ Variables `--u-relume-variable-*` incorrectas
- ❌ Colores inconsistentes
- ❌ Botones con clases Tailwind mezcladas

### DESPUÉS (Estado Objetivo):
- ✅ **100% Design Tokens**: `var(--primary)`, `var(--neutral-white)`
- ✅ **Hero**: fondo `var(--primary-lightest)` (#E5F5F6)
- ✅ **Worksys**: color `var(--primary)` (#009CA6)
- ✅ **Expersys**: color `var(--secondary)` (#093D53)
- ✅ **Diferenciadores**: fondos específicos con design tokens
- ✅ **FAQ**: fondo `var(--neutral-darker)` (#192020)
- ✅ **Footer**: fondo `var(--neutral-darkest)` (#000808)
- ✅ **Botones consistentes** usando design tokens

## 🔧 IMPLEMENTACIÓN

1. **PRIMERA FASE**: Buscar/Reemplazar todas las variables Relume
2. **SEGUNDA FASE**: Eliminar clases Tailwind mezcladas
3. **TERCERA FASE**: Aplicar fondos correctos por sección
4. **CUARTA FASE**: Eliminar inline styles conflictivos

## 📋 VALIDACIÓN

```
# Verificar que NO quede ninguna variable Relume
grep -r "--u-relume-variable" src/
# Resultado esperado: No matches found

# Verificar que NO queden clases Tailwind mezcladas  
grep -r "bg-background-" src/
grep -r "text-text-" src/
# Resultado esperado: No matches found

# Verificar design tokens aplicados
grep -r "var(--primary)" src/
grep -r "var(--neutral-" src/
# Resultado esperado: Multiple matches (correcto)
```

**OBJETIVO FINAL:** Sistema visual 100% consistente usando exclusivamente design tokens del archivo Variables.pdf, eliminando todo conflicto entre sistemas CSS diferentes.

**PRIORIDAD 1:** Eliminar variables `--u-relume-variable-*` 
**PRIORIDAD 2:** Eliminar clases Tailwind mezcladas
**PRIORIDAD 3:** Aplicar fondos y colores correctos usando design tokens
