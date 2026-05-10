# Guía de estilo unificada para webs

Este documento define el estilo visual, técnico y editorial que deben seguir todos los agentes, desarrolladores y asistentes IA al crear, rediseñar o modificar cualquiera de mis webs.

El objetivo es que todos los proyectos tengan una identidad coherente, profesional, moderna, rápida, mobile first, accesible, preparada para SEO y con soporte completo para modo claro y modo oscuro.

---

## 1. Principios generales

Todas las webs deben cumplir estos principios:

1. **Claridad antes que decoración**  
   El diseño debe ser bonito y vistoso, pero nunca dificultar la lectura, la navegación o la conversión.

2. **Mobile first real**  
   Se diseña primero para móvil y después se adapta a tablet y escritorio. No se acepta una versión móvil “encogida” de escritorio.

3. **Profesional, moderno y limpio**  
   El estilo debe transmitir confianza, producto cuidado y sensación de proyecto actual.

4. **Rápido y ligero**  
   Priorizar HTML semántico, CSS eficiente y JavaScript mínimo. No añadir librerías pesadas si se puede resolver con código propio sencillo.

5. **SEO desde la base**  
   Cada página debe estar pensada para posicionar bien: estructura semántica, títulos claros, metadatos, enlazado interno, rendimiento y contenido útil.

6. **Accesible por defecto**  
   Buen contraste, navegación por teclado, textos legibles, botones claros, estados visibles y etiquetas correctas.

7. **Sin fuentes externas**  
   No cargar Google Fonts, Adobe Fonts ni fuentes remotas. Usar fuentes del sistema para mejorar rendimiento, privacidad y SEO técnico.

8. **Modo claro y oscuro obligatorio**  
   Toda interfaz nueva debe funcionar correctamente en light y dark mode.

---

## 2. Identidad visual común

Aunque cada web pueda tener su tema concreto, todas deben compartir una misma base visual.

### 2.1 Personalidad visual

Las webs deben sentirse:

- Modernas.
- Limpias.
- Rápidas.
- Cercanas.
- Profesionales.
- Con un punto visual llamativo, pero sin parecer plantillas genéricas.
- Preparadas para contenido, herramientas, noticias, guías, juegos o proyectos personales.

Evitar:

- Diseños sobrecargados.
- Sombras exageradas.
- Gradientes sin sentido.
- Animaciones lentas.
- Colores chillones usados como base.
- Interfaces que parezcan antiguas.
- Botones pequeños o poco claros.
- Páginas que dependan de hero gigantes sin contenido real.

---

## 3. Sistema de diseño base

Todas las webs deben partir de variables CSS globales. Los nombres pueden adaptarse al framework, pero la idea debe mantenerse.

```css
:root {
  color-scheme: light;

  /* Tipografía */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  /* Colores base */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-soft: #f1f5f9;
  --color-surface-raised: #ffffff;

  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-text-soft: #64748b;

  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;

  /* Marca */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-soft: #dbeafe;

  --color-secondary: #7c3aed;
  --color-secondary-soft: #ede9fe;

  --color-accent: #f97316;
  --color-accent-soft: #ffedd5;

  /* Estados */
  --color-success: #16a34a;
  --color-success-soft: #dcfce7;
  --color-warning: #d97706;
  --color-warning-soft: #fef3c7;
  --color-danger: #dc2626;
  --color-danger-soft: #fee2e2;
  --color-info: #0284c7;
  --color-info-soft: #e0f2fe;

  /* Layout */
  --container-xs: 36rem;
  --container-sm: 48rem;
  --container-md: 64rem;
  --container-lg: 80rem;
  --container-xl: 96rem;

  /* Espaciado */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Radios */
  --radius-xs: 0.375rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
  --radius-2xl: 1.5rem;
  --radius-full: 999px;

  /* Sombras */
  --shadow-xs: 0 1px 2px rgb(15 23 42 / 0.06);
  --shadow-sm: 0 4px 12px rgb(15 23 42 / 0.08);
  --shadow-md: 0 12px 32px rgb(15 23 42 / 0.12);
  --shadow-lg: 0 24px 60px rgb(15 23 42 / 0.16);

  /* Transiciones */
  --transition-fast: 120ms ease;
  --transition-base: 180ms ease;
  --transition-slow: 260ms ease;

  /* Z-index */
  --z-header: 40;
  --z-dropdown: 50;
  --z-modal: 80;
  --z-toast: 100;
}

[data-theme="dark"] {
  color-scheme: dark;

  --color-bg: #020617;
  --color-surface: #0f172a;
  --color-surface-soft: #111827;
  --color-surface-raised: #1e293b;

  --color-text: #f8fafc;
  --color-text-muted: #cbd5e1;
  --color-text-soft: #94a3b8;

  --color-border: #1e293b;
  --color-border-strong: #334155;

  --color-primary: #60a5fa;
  --color-primary-hover: #93c5fd;
  --color-primary-soft: rgb(37 99 235 / 0.18);

  --color-secondary: #a78bfa;
  --color-secondary-soft: rgb(124 58 237 / 0.18);

  --color-accent: #fb923c;
  --color-accent-soft: rgb(249 115 22 / 0.18);

  --color-success: #4ade80;
  --color-success-soft: rgb(22 163 74 / 0.18);
  --color-warning: #fbbf24;
  --color-warning-soft: rgb(217 119 6 / 0.18);
  --color-danger: #f87171;
  --color-danger-soft: rgb(220 38 38 / 0.18);
  --color-info: #38bdf8;
  --color-info-soft: rgb(2 132 199 / 0.18);

  --shadow-xs: 0 1px 2px rgb(0 0 0 / 0.3);
  --shadow-sm: 0 4px 16px rgb(0 0 0 / 0.35);
  --shadow-md: 0 16px 40px rgb(0 0 0 / 0.45);
  --shadow-lg: 0 28px 80px rgb(0 0 0 / 0.55);
}
```

---

## 4. Tipografía

### 4.1 Fuente base

Usar siempre fuente del sistema:

```css
body {
  font-family: var(--font-sans);
}
```

No usar:

```html
<link href="https://fonts.googleapis.com/..." rel="stylesheet">
```

No usar `@import` de fuentes externas.

### 4.2 Escala tipográfica

Usar una escala consistente:

```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.65; }
.text-lg { font-size: 1.125rem; line-height: 1.75; }
.text-xl { font-size: 1.25rem; line-height: 1.75; }
.text-2xl { font-size: 1.5rem; line-height: 1.3; }
.text-3xl { font-size: 1.875rem; line-height: 1.2; }
.text-4xl { font-size: 2.25rem; line-height: 1.1; }
.text-5xl { font-size: clamp(2.5rem, 6vw, 4rem); line-height: 1; }
```

### 4.3 Reglas de legibilidad

- El texto principal debe tener al menos `16px`.
- En móvil, evitar párrafos demasiado anchos o densos.
- En escritorio, limitar el ancho de lectura a `65ch` o `72ch`.
- Usar `font-weight: 700` o `800` para titulares.
- Usar `font-weight: 400` o `500` para texto normal.
- No abusar de mayúsculas.
- No usar texto gris claro sobre fondo claro ni texto gris oscuro sobre fondo oscuro.

### 4.4 Jerarquía recomendada

Cada página debe tener un único `h1`.

Ejemplo:

```html
<h1>Título principal de la página</h1>
<h2>Bloque importante</h2>
<h3>Subapartado</h3>
```

No saltar niveles sin motivo:

```html
<!-- Mal -->
<h1>Título</h1>
<h4>Sección</h4>
```

---

## 5. Layout mobile first

### 5.1 Breakpoints recomendados

```css
/* Base: móvil */

/* Tablet */
@media (min-width: 640px) {}

/* Tablet grande */
@media (min-width: 768px) {}

/* Portátil */
@media (min-width: 1024px) {}

/* Escritorio */
@media (min-width: 1280px) {}

/* Escritorio grande */
@media (min-width: 1536px) {}
```

### 5.2 Contenedores

```css
.container {
  width: min(100% - 2rem, var(--container-lg));
  margin-inline: auto;
}

.container-narrow {
  width: min(100% - 2rem, var(--container-sm));
  margin-inline: auto;
}

.container-wide {
  width: min(100% - 2rem, var(--container-xl));
  margin-inline: auto;
}
```

En móvil:

- Márgenes laterales mínimos: `1rem`.
- Separación entre bloques: `2rem` a `3rem`.
- Botones grandes y fáciles de tocar.
- Evitar columnas estrechas.

En escritorio:

- Usar grid y columnas cuando aporte claridad.
- No estirar textos en líneas enormes.
- Mantener jerarquía visual.

---

## 6. Estructura base de página

Toda web debe seguir una estructura similar:

```html
<body>
  <a href="#main" class="skip-link">Saltar al contenido</a>

  <header class="site-header">
    <nav aria-label="Navegación principal">
      ...
    </nav>
  </header>

  <main id="main">
    ...
  </main>

  <footer class="site-footer">
    ...
  </footer>
</body>
```

### 6.1 Header

El header debe ser:

- Claro.
- Ligero.
- Sticky solo si aporta valor.
- Con logo/nombre visible.
- Con navegación principal.
- Con botón de modo claro/oscuro si procede.
- Con menú móvil accesible.

Evitar:

- Headers demasiado altos.
- Menús que ocupen media pantalla sin necesidad.
- Efectos que oculten navegación esencial.
- Animaciones que perjudiquen el rendimiento.

### 6.2 Footer

El footer debe incluir, cuando aplique:

- Nombre del proyecto.
- Breve descripción.
- Enlaces legales.
- Enlaces principales.
- Contacto o enlace al autor.
- Enlaces a páginas importantes para SEO.

---

## 7. Componentes UI

### 7.1 Botones

Los botones deben ser claros, grandes y con buen contraste.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    background-color var(--transition-base),
    border-color var(--transition-base),
    color var(--transition-base),
    box-shadow var(--transition-base);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus-visible {
  outline: 3px solid var(--color-primary-soft);
  outline-offset: 3px;
}

.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text);
}

.btn-danger {
  background: var(--color-danger);
  color: #ffffff;
}
```

Reglas:

- El CTA principal debe ser evidente.
- No debe haber más de un CTA principal por bloque.
- Los botones destructivos deben diferenciarse claramente.
- No usar enlaces como botones si realizan una acción.
- No usar botones como enlaces si navegan a otra URL.

### 7.2 Tarjetas

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xs);
  overflow: hidden;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}

.card-body {
  padding: var(--space-5);
}
```

Una tarjeta debe tener:

- Título claro.
- Descripción breve.
- Acción visible si es interactiva.
- Imagen solo si aporta valor.
- Estado hover/focus si es clicable.

### 7.3 Formularios

```css
.input,
.select,
.textarea {
  width: 100%;
  min-height: 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.75rem 0.9rem;
  font: inherit;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background-color var(--transition-base);
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}

.label {
  display: inline-block;
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: var(--color-text);
}

.help-text {
  margin-top: 0.4rem;
  color: var(--color-text-soft);
  font-size: 0.875rem;
}

.error-text {
  margin-top: 0.4rem;
  color: var(--color-danger);
  font-size: 0.875rem;
  font-weight: 600;
}
```

Reglas:

- Todo input debe tener `label`.
- Los errores deben ser claros y cercanos al campo.
- No usar placeholder como único label.
- En móvil, los campos deben ocupar el ancho completo.
- Los formularios deben poder usarse con teclado.

### 7.4 Badges y etiquetas

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: var(--radius-full);
  padding: 0.25rem 0.65rem;
  background: var(--color-surface-soft);
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 700;
}
```

Usar badges para:

- Categorías.
- Estados.
- Fechas.
- Tipos de herramienta.
- Etiquetas de contenido.

No abusar de ellos.

### 7.5 Alertas

```css
.alert {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  background: var(--color-surface);
}

.alert-info {
  border-color: var(--color-info);
  background: var(--color-info-soft);
}

.alert-success {
  border-color: var(--color-success);
  background: var(--color-success-soft);
}

.alert-warning {
  border-color: var(--color-warning);
  background: var(--color-warning-soft);
}

.alert-danger {
  border-color: var(--color-danger);
  background: var(--color-danger-soft);
}
```

---

## 8. Modo claro y modo oscuro

### 8.1 Reglas obligatorias

Cada nueva pantalla, componente o herramienta debe probarse en:

- Light mode.
- Dark mode.
- Móvil.
- Escritorio.
- Estados hover.
- Estados focus.
- Estados disabled.
- Estados de error.
- Estados vacíos.

### 8.2 Implementación recomendada

Usar atributo en `html` o `body`:

```html
<html lang="es" data-theme="light">
```

Cambiar a:

```html
<html lang="es" data-theme="dark">
```

También se puede respetar preferencia del sistema:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
  }
}
```

### 8.3 Botón de cambio de tema

Debe:

- Tener texto accesible.
- Guardar preferencia en `localStorage`.
- Evitar parpadeo inicial.
- No depender de frameworks pesados.

Ejemplo de script mínimo:

```html
<script>
  (() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  })();
</script>
```

### 8.4 Contraste

En dark mode:

- No usar blanco puro para grandes bloques si resulta agresivo.
- No usar fondos negros puros en todas partes.
- Usar superficies escalonadas.
- Mantener bordes visibles.
- Comprobar que enlaces y botones destacan.

---

## 9. Estilo visual moderno

### 9.1 Gradientes

Se pueden usar gradientes, pero con moderación.

Uso recomendado:

```css
.hero-gradient {
  background:
    radial-gradient(circle at top left, var(--color-primary-soft), transparent 32rem),
    radial-gradient(circle at top right, var(--color-secondary-soft), transparent 28rem),
    var(--color-bg);
}
```

Evitar:

- Gradientes arcoíris sin sentido.
- Fondos que dificulten leer.
- Gradientes animados pesados.
- Meter gradiente en todos los botones.

### 9.2 Sombras

Las sombras deben ser suaves.

Usar sombras para:

- Tarjetas importantes.
- Modales.
- Menús flotantes.
- Elementos elevados.

No usar sombras grandes en todos los elementos.

### 9.3 Bordes

Usar bordes sutiles para separar bloques:

```css
border: 1px solid var(--color-border);
```

En dark mode los bordes son especialmente importantes.

### 9.4 Animaciones

Las animaciones deben ser:

- Rápidas.
- Suaves.
- Útiles.
- No invasivas.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Permitido:

- Hover sutil en cards.
- Transición en botones.
- Aparición suave de menús.
- Indicadores de carga simples.

Evitar:

- Parallax pesado.
- Animaciones constantes.
- Carruseles automáticos.
- Efectos que bloqueen interacción.

---

## 10. Imágenes

### 10.1 Reglas generales

- Usar imágenes optimizadas.
- Definir siempre `width` y `height` cuando se conozcan.
- Usar `loading="lazy"` en imágenes no críticas.
- Usar `fetchpriority="high"` solo en imagen principal importante.
- Usar `alt` descriptivo.
- No usar imágenes enormes sin necesidad.
- Evitar imágenes externas lentas o inestables.

Ejemplo:

```html
<img
  src="/images/ejemplo.webp"
  width="1200"
  height="675"
  alt="Descripción clara de la imagen"
  loading="lazy"
  decoding="async"
/>
```

### 10.2 Imagen principal

En páginas de contenido, la imagen principal puede usar:

```html
<img
  src="/images/noticia.webp"
  width="1200"
  height="675"
  alt="Descripción de la noticia"
  fetchpriority="high"
  decoding="async"
/>
```

### 10.3 Aspect ratio

Evitar saltos de layout:

```css
.media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--color-surface-soft);
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 11. SEO técnico

Todas las páginas indexables deben tener:

```html
<title>Título único y descriptivo</title>
<meta name="description" content="Descripción clara, útil y atractiva.">
<link rel="canonical" href="https://example.com/url-canonica">
<meta name="robots" content="index,follow">
```

### 11.1 Title

Reglas:

- Debe ser único por página.
- Debe describir la intención principal.
- Debe incluir la palabra clave principal de forma natural.
- Longitud orientativa: 45-65 caracteres.
- Evitar relleno y repeticiones.

Ejemplo:

```html
<title>Comprimir PDF online gratis y sin subir archivos</title>
```

### 11.2 Meta description

Reglas:

- Debe resumir el valor de la página.
- Debe invitar al clic sin prometer cosas falsas.
- Longitud orientativa: 120-160 caracteres.
- No duplicar en varias páginas.

Ejemplo:

```html
<meta
  name="description"
  content="Comprime archivos PDF directamente en tu navegador, gratis, rápido y sin subir documentos a ningún servidor."
>
```

### 11.3 Encabezados

Reglas:

- Un solo `h1`.
- Usar `h2` para secciones importantes.
- Usar `h3` para subsecciones.
- No usar headings solo para tamaño visual.
- No ocultar el `h1`.

### 11.4 URLs

Las URLs deben ser:

- Cortas.
- Descriptivas.
- En minúsculas.
- Sin tildes.
- Sin caracteres raros.
- Separadas por guiones.

Correcto:

```text
/comprimir-pdf
/guias/caceres
/noticias/plasencia
```

Incorrecto:

```text
/page?id=123
/ComprimirPDFGratisOnlineRapido
/noticias/Artículo%20Nuevo
```

### 11.5 Open Graph y Twitter Cards

Incluir en páginas importantes:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Título de la página">
<meta property="og:description" content="Descripción de la página">
<meta property="og:url" content="https://example.com/url">
<meta property="og:image" content="https://example.com/og-image.jpg">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título de la página">
<meta name="twitter:description" content="Descripción de la página">
<meta name="twitter:image" content="https://example.com/og-image.jpg">
```

### 11.6 Datos estructurados

Usar JSON-LD cuando aplique.

Para una web o herramienta:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nombre de la herramienta",
  "url": "https://example.com/herramienta",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "description": "Descripción clara de la herramienta."
}
</script>
```

Para artículos:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Título de la noticia",
  "description": "Resumen de la noticia",
  "datePublished": "2026-01-01T10:00:00+01:00",
  "dateModified": "2026-01-01T10:30:00+01:00",
  "author": {
    "@type": "Organization",
    "name": "Nombre del sitio"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nombre del sitio"
  }
}
</script>
```

### 11.7 Enlazado interno

Cada página debe enlazar a:

- Su categoría principal.
- Páginas relacionadas.
- Páginas superiores o hubs.
- Herramientas o contenidos complementarios.

Evitar páginas huérfanas.

### 11.8 Sitemap y robots

Todo proyecto debe tener:

```text
/sitemap.xml
/robots.txt
```

`robots.txt` básico:

```text
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

---

## 12. SEO de contenido

### 12.1 Contenido útil

Cada página debe responder claramente a la intención del usuario.

Antes de crear una página, definir:

- ¿Qué busca el usuario?
- ¿Qué problema resuelve esta página?
- ¿Cuál es la acción principal?
- ¿Qué información necesita antes de actuar?
- ¿Qué enlaces internos ayudan a continuar?

### 12.2 Estructura recomendada para herramientas

Para una herramienta online:

```html
<h1>Comprimir PDF online</h1>

<section>
  <h2>Sube tu archivo</h2>
  <!-- herramienta -->
</section>

<section>
  <h2>Cómo comprimir un PDF</h2>
  <ol>
    <li>Selecciona tu archivo PDF.</li>
    <li>Elige el nivel de compresión.</li>
    <li>Descarga el nuevo archivo.</li>
  </ol>
</section>

<section>
  <h2>Ventajas de esta herramienta</h2>
  ...
</section>

<section>
  <h2>Preguntas frecuentes</h2>
  ...
</section>
```

### 12.3 Estructura recomendada para artículos

```html
<article>
  <header>
    <p>Categoría</p>
    <h1>Título de la noticia o artículo</h1>
    <p>Resumen breve.</p>
    <time datetime="2026-01-01">1 de enero de 2026</time>
  </header>

  <section>
    <h2>Primer bloque importante</h2>
    <p>...</p>
  </section>

  <section>
    <h2>Contexto</h2>
    <p>...</p>
  </section>
</article>
```

### 12.4 Preguntas frecuentes

Cuando tenga sentido, añadir FAQ visible en HTML.

```html
<section>
  <h2>Preguntas frecuentes</h2>

  <details>
    <summary>¿La herramienta sube mis archivos?</summary>
    <p>No, el procesamiento se realiza en tu navegador cuando técnicamente sea posible.</p>
  </details>
</section>
```

No añadir FAQ falsas ni preguntas irrelevantes.

---

## 13. Rendimiento

### 13.1 Objetivos

Toda web debe intentar cumplir:

- LCP inferior a 2,5 segundos.
- CLS inferior a 0,1.
- INP inferior a 200 ms.
- HTML renderizable aunque JavaScript falle.
- CSS crítico razonable.
- JavaScript mínimo.

### 13.2 Reglas prácticas

- No cargar fuentes externas.
- No cargar librerías si no son necesarias.
- Dividir JavaScript por páginas.
- Usar imágenes WebP o AVIF cuando sea posible.
- Evitar sliders pesados.
- Evitar dependencias de iconos enormes.
- No bloquear render con scripts innecesarios.
- Usar `defer` o módulos.
- Precargar solo recursos críticos reales.

Ejemplo:

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
<script type="module" src="/src/main.js"></script>
```

### 13.3 JavaScript

JavaScript debe usarse para mejorar la experiencia, no para renderizar contenido esencial salvo que el framework lo requiera.

Reglas:

- El contenido SEO importante debe estar en HTML.
- Las acciones deben tener estados de carga.
- Los errores deben mostrarse al usuario.
- No bloquear el hilo principal con tareas largas.
- Usar `requestIdleCallback`, `requestAnimationFrame` o particionado de tareas cuando convenga.
- Limpiar event listeners si el componente se desmonta.

---

## 14. Accesibilidad

### 14.1 Reglas obligatorias

- Usar HTML semántico.
- Todo botón debe ser `<button>` si ejecuta una acción.
- Todo enlace debe ser `<a>` si navega.
- Todo input debe tener label.
- Los modales deben gestionar foco.
- Los menús móviles deben poder cerrarse con teclado.
- Debe existir estado `:focus-visible`.
- No comunicar información solo con color.
- Los iconos decorativos deben tener `aria-hidden="true"`.
- Los iconos informativos deben tener texto accesible.

### 14.2 Skip link

```css
.skip-link {
  position: absolute;
  left: 1rem;
  top: 1rem;
  transform: translateY(-150%);
  background: var(--color-primary);
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  z-index: var(--z-toast);
}

.skip-link:focus {
  transform: translateY(0);
}
```

### 14.3 Modales

Un modal debe:

- Usar `role="dialog"`.
- Tener `aria-modal="true"`.
- Tener título asociado.
- Cerrar con Escape.
- Devolver el foco al elemento que lo abrió.
- Bloquear interacción con el fondo.

---

## 15. Estados de interfaz

Cada pantalla debe contemplar:

1. Estado inicial.
2. Estado cargando.
3. Estado con datos.
4. Estado vacío.
5. Estado error.
6. Estado éxito.
7. Estado sin conexión si aplica.
8. Estado disabled.
9. Estado de validación.

Ejemplo de estado vacío:

```html
<section class="empty-state">
  <h2>No hay resultados todavía</h2>
  <p>Prueba a cambiar los filtros o vuelve más tarde.</p>
</section>
```

---

## 16. Herramientas online

Para webs de herramientas, como utilidades PDF, JSON, imágenes, texto o similares:

### 16.1 Reglas UX

- Explicar claramente qué hace la herramienta.
- Mostrar una zona de carga o entrada muy visible.
- Soportar drag and drop si hay archivos.
- Mostrar errores comprensibles.
- Mostrar vista previa cuando aporte valor.
- Permitir descargar, copiar o limpiar resultados.
- No ocultar la acción principal.
- Avisar si el procesamiento es local.
- Mantener privacidad como argumento diferencial.

### 16.2 Estructura recomendada

```html
<section class="tool-hero">
  <p class="eyebrow">Herramienta gratuita</p>
  <h1>Editar PDF online</h1>
  <p>Modifica tus archivos PDF directamente en el navegador, sin subirlos a ningún servidor.</p>
</section>

<section class="tool-panel">
  <!-- interfaz principal -->
</section>

<section class="content-section">
  <h2>Cómo funciona</h2>
  ...
</section>

<section class="content-section">
  <h2>Privacidad</h2>
  ...
</section>

<section class="content-section">
  <h2>Herramientas relacionadas</h2>
  ...
</section>
```

### 16.3 Privacidad

Si una herramienta procesa en local, decirlo de forma clara, pero sin exagerar.

Correcto:

```text
El archivo se procesa en tu navegador y no se sube a ningún servidor.
```

Evitar:

```text
100% imposible que nadie vea tu archivo.
```

---

## 17. Páginas de noticias, blogs o contenido

### 17.1 Listados

Los listados deben tener:

- Título claro.
- Descripción de la sección.
- Tarjetas limpias.
- Fecha.
- Categoría.
- Imagen optimizada si aplica.
- Paginación o carga controlada.
- Enlaces internos.

### 17.2 Artículos

Los artículos deben tener:

- `article`.
- Header propio.
- Fecha visible.
- Autor o fuente si aplica.
- Imagen principal optimizada.
- Índice si el contenido es largo.
- Secciones con `h2`.
- Enlaces internos contextuales.
- Bloque de relacionados.
- Datos estructurados si aplica.

### 17.3 Estilo editorial

- Español natural.
- Frases claras.
- Evitar relleno.
- Evitar titulares engañosos.
- No abusar de negritas.
- No usar mayúsculas innecesarias.
- Mantener titulares con ortografía española: solo primera palabra y nombres propios en mayúscula.

Correcto:

```text
El tiempo en Cáceres este fin de semana
```

Incorrecto:

```text
El Tiempo En Cáceres Este Fin De Semana
```

---

## 18. Páginas de portada

La home debe responder rápido a:

- Qué es este sitio.
- Qué puedo hacer aquí.
- Qué contenido o herramientas son principales.
- Por dónde empiezo.
- Por qué debería confiar.

Estructura recomendada:

```html
<main>
  <section class="hero">
    <p class="eyebrow">Texto corto de contexto</p>
    <h1>Propuesta de valor clara</h1>
    <p>Descripción breve con beneficio real.</p>
    <a class="btn btn-primary" href="/accion-principal">Empezar</a>
  </section>

  <section>
    <h2>Herramientas o secciones principales</h2>
    ...
  </section>

  <section>
    <h2>Últimos contenidos o destacados</h2>
    ...
  </section>

  <section>
    <h2>Por qué usar esta web</h2>
    ...
  </section>
</main>
```

---

## 19. Navegación

### 19.1 Menú principal

Debe incluir solo lo importante.

Evitar menús con demasiadas opciones de primer nivel.

Si hay muchas herramientas o secciones, usar:

- Categorías.
- Buscador.
- Filtros.
- Páginas hub.
- Navegación secundaria.

### 19.2 Breadcrumbs

Usar breadcrumbs en webs con jerarquía:

```html
<nav aria-label="Migas de pan">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li><a href="/guias">Guías</a></li>
    <li aria-current="page">Cáceres</li>
  </ol>
</nav>
```

---

## 20. Colores por proyecto

Cada proyecto puede tener un color primario propio, pero debe respetar el sistema común.

Ejemplos:

```css
/* Proyecto de herramientas */
--color-primary: #2563eb;

/* Proyecto local/noticias */
--color-primary: #991b1b;

/* Proyecto turístico */
--color-primary: #0891b2;

/* Proyecto gastronómico */
--color-primary: #ea580c;

/* Proyecto juegos */
--color-primary: #7c3aed;
```

Reglas:

- El color primario debe funcionar en claro y oscuro.
- Debe tener contraste suficiente.
- Debe usarse para acciones principales, enlaces destacados y elementos de marca.
- No usar más de 2 colores protagonistas por proyecto.
- Los colores de estado no deben confundirse con colores de marca.

---

## 21. Iconos

Preferir:

- SVG inline pequeños.
- Sprites propios.
- Iconos mínimos.
- Iconos con `aria-hidden="true"` si son decorativos.

Evitar:

- Cargar librerías completas de iconos para usar 4 iconos.
- Iconos sin texto en botones importantes.
- Iconos que no se entiendan.

Ejemplo:

```html
<button class="btn btn-primary">
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"></svg>
  <span>Descargar</span>
</button>
```

---

## 22. Código CSS

### 22.1 Reglas

- Usar variables.
- Evitar colores hardcodeados salvo casos muy concretos.
- Agrupar estilos por componente.
- No usar selectores excesivamente específicos.
- No usar `!important` salvo emergencia.
- No duplicar estilos.
- No crear clases con nombres ligados a un color si realmente representan función.

Correcto:

```css
.btn-primary {}
.alert-danger {}
.card-featured {}
```

Incorrecto:

```css
.boton-azul {}
.caja-roja {}
.texto-grande-home-arriba {}
```

### 22.2 Nombres recomendados

Usar nombres semánticos:

```text
site-header
site-footer
hero
hero-content
section-header
card
card-body
tool-panel
empty-state
feature-grid
content-section
```

---

## 23. HTML semántico

Usar elementos adecuados:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `button`
- `form`
- `label`
- `time`
- `figure`
- `figcaption`

Evitar exceso de `div` cuando hay una etiqueta semántica mejor.

---

## 24. Frameworks

Estas reglas aplican con cualquier stack: Astro, Svelte, Vue, React, PHP, Twig, Laravel, HTML plano o similares.

### 24.1 Astro

- Mantener contenido renderizado en HTML siempre que sea posible.
- Hidratar componentes solo cuando haga falta.
- Usar islands para herramientas interactivas.
- Evitar meter toda la página como componente cliente.
- Generar metadatos por página.

### 24.2 Svelte

- Usar Svelte para interactividad real.
- Mantener componentes pequeños.
- Gestionar estados de error y carga.
- Destruir listeners correctamente.
- Evitar stores globales innecesarios.

### 24.3 PHP/Twig

- Separar layout, componentes y páginas.
- Crear macros o includes para tarjetas, imágenes, breadcrumbs y metadatos.
- Escapar salida por defecto.
- Generar canonical, title y description por plantilla.
- Evitar lógica pesada en Twig.

---

## 25. Plantilla base de metadatos

Toda página debería poder definir:

```ts
type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  robots?: "index,follow" | "noindex,follow" | "noindex,nofollow";
  ogType?: "website" | "article";
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
};
```

---

## 26. Checklist antes de terminar una página

Antes de dar una tarea por terminada, comprobar:

### Diseño

- [ ] Se ve bien en móvil.
- [ ] Se ve bien en escritorio.
- [ ] Tiene modo claro.
- [ ] Tiene modo oscuro.
- [ ] Usa variables de diseño.
- [ ] No parece una plantilla genérica.
- [ ] Los botones y tarjetas tienen estados hover/focus.
- [ ] Los espacios son consistentes.
- [ ] El contenido respira.

### Accesibilidad

- [ ] Hay un solo `h1`.
- [ ] Los headings siguen orden lógico.
- [ ] Los botones son botones.
- [ ] Los enlaces son enlaces.
- [ ] Los inputs tienen label.
- [ ] Hay estado `focus-visible`.
- [ ] El contraste es correcto.
- [ ] Se puede usar con teclado.
- [ ] Las imágenes tienen `alt`.

### SEO

- [ ] Tiene title único.
- [ ] Tiene meta description única.
- [ ] Tiene canonical.
- [ ] Tiene robots correcto.
- [ ] Tiene Open Graph.
- [ ] Tiene estructura semántica.
- [ ] Tiene enlaces internos.
- [ ] El contenido principal está en HTML.
- [ ] Tiene JSON-LD si aplica.
- [ ] La URL es limpia.

### Rendimiento

- [ ] No carga fuentes externas.
- [ ] No carga librerías innecesarias.
- [ ] Las imágenes están optimizadas.
- [ ] No hay CLS evidente.
- [ ] El JavaScript es mínimo.
- [ ] Los scripts no bloquean el render.
- [ ] La página funciona razonablemente aunque falle JS no esencial.

### UX

- [ ] La acción principal está clara.
- [ ] Hay estados de carga.
- [ ] Hay estados de error.
- [ ] Hay estados vacíos.
- [ ] Los textos son comprensibles.
- [ ] La navegación es sencilla.

---

## 27. Instrucciones específicas para agentes IA

Cuando un agente modifique o cree una web, debe seguir estas instrucciones:

1. Antes de tocar código, identificar:
   - Tipo de página.
   - Objetivo principal.
   - Usuario principal.
   - Acción principal.
   - Requisitos SEO.
   - Componentes reutilizables existentes.

2. No crear estilos aislados si existe un sistema global.

3. Si no existe sistema global, crear uno basado en este documento.

4. No introducir fuentes externas.

5. No introducir librerías pesadas sin justificación.

6. Implementar siempre light y dark mode.

7. Diseñar primero móvil.

8. Mantener HTML semántico.

9. Añadir metadatos SEO.

10. Optimizar imágenes y evitar saltos de layout.

11. Añadir estados de error, vacío, carga y éxito cuando aplique.

12. Revisar contraste y foco visible.

13. No copiar literalmente diseños de otras webs. Inspirarse en claridad y usabilidad, pero crear marca propia.

14. Mantener coherencia entre páginas del mismo proyecto.

15. Si se crea un nuevo componente útil, hacerlo reutilizable.

16. Si hay una decisión visual importante, dejarla resuelta en variables, no hardcodeada.

17. No sacrificar rendimiento por estética.

18. No ocultar contenido SEO importante detrás de JavaScript si se puede renderizar en servidor o HTML estático.

19. En herramientas frontend, priorizar privacidad y procesamiento local cuando sea posible.

20. Entregar el resultado con una breve explicación de:
    - Qué se ha cambiado.
    - Qué componentes se han tocado.
    - Cómo se ha respetado SEO, responsive, dark/light y accesibilidad.

---

## 28. Prompt corto reutilizable para agentes

Usa este prompt cuando quieras que un agente aplique esta guía:

```text
Actúa como diseñador UI senior, frontend engineer y experto SEO técnico.

Aplica la guía de estilo global del proyecto. La web debe ser mobile first, moderna, profesional, rápida, accesible, con modo claro y oscuro, sin fuentes externas y con buen SEO técnico.

Usa HTML semántico, variables CSS, componentes reutilizables, buen contraste, estados hover/focus/error/carga/vacío, imágenes optimizadas y metadatos SEO completos.

No copies literalmente diseños de otras webs. Crea una interfaz limpia, vistosa y coherente con el sistema visual común.
```

---

## 29. Prompt largo reutilizable para rediseños

```text
Actúa como director de arte senior, diseñador UI/UX, frontend engineer y experto SEO técnico.

Rediseña o implementa esta página siguiendo una identidad visual común para todas mis webs:

- Mobile first real.
- Diseño moderno, profesional, limpio y vistoso.
- Soporte completo para modo claro y modo oscuro.
- Sin cargar fuentes externas; usa system fonts.
- HTML semántico.
- CSS basado en variables globales.
- Componentes reutilizables.
- Buen contraste y accesibilidad.
- Estados hover, focus-visible, active, disabled, loading, error y empty.
- SEO técnico completo: title, description, canonical, robots, Open Graph, Twitter Card y JSON-LD si aplica.
- Buen rendimiento: imágenes optimizadas, sin CLS, JavaScript mínimo y sin dependencias pesadas innecesarias.
- Contenido principal visible en HTML.
- Navegación clara y enlaces internos útiles.

Antes de terminar, revisa que se vea bien en móvil, tablet, escritorio, light mode y dark mode.
```

---

## 30. Resumen ejecutivo

Todas mis webs deben compartir una base común:

- Diseño profesional.
- Mobile first.
- Light/dark mode.
- Sin fuentes externas.
- Rápidas.
- SEO friendly.
- Accesibles.
- Modernas.
- Con componentes reutilizables.
- Con identidad propia pero coherente.

El resultado debe parecer una familia de productos, no una colección de webs inconexas.