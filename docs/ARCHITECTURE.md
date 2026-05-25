# Arquitectura De ApuntesDeOli

Este documento describe cómo está organizada la aplicación a nivel técnico.

## Modelo General

ApuntesDeOli es un sitio estático generado por Astro con componentes React hidratados donde hace falta interacción. Astro resuelve las rutas por archivos dentro de `src/pages`, mientras React se usa para la experiencia de lectura, navegación, glosarios y filtros.

Flujo simplificado:

```text
src/pages
  -> Layout.astro
    -> AppLayout.jsx
      -> Header.jsx
      -> Sidebar.jsx
      -> slot de contenido
      -> Footer.jsx
```

## Capas Principales

### `src/pages`

Define las rutas reales del sitio. Cada carpeta con `index.astro` corresponde a una URL.

Ejemplo:

```text
src/pages/CienciaDeDatos/Introduccion/index.astro
```

genera:

```text
/CienciaDeDatos/Introduccion
```

En GitHub Pages se publica como:

```text
/ApuntesDeOli/CienciaDeDatos/Introduccion
```

### `src/layouts/Layout.astro`

Es el layout Astro base. Importa estilos globales, define el `<head>` con `BaseHead` y monta `AppLayout` como isla React.

Responsabilidades:

- cargar `global.css`
- leer `Astro.url.pathname`
- pasar `currentPath` a `AppLayout`
- envolver el contenido con el layout global

### `src/components/AppLayout.jsx`

Es el centro de la navegación global.

Responsabilidades:

- detectar la categoría activa según `currentPath`
- aplicar colores temáticos mediante variables CSS
- renderizar `Header`
- renderizar `Sidebar`
- renderizar el contenido principal y `Footer`
- mostrar el botón flotante de glosario para Redes y Ciencia de Datos
- definir los subtemas visibles en el aside

Variables CSS generadas:

```css
--accent-color
--accent-glow
--accent-border
--accent-light
--accent-text
```

Estas variables permiten que los apuntes, tags, glosarios y tooltips respeten el color de la categoría activa.

### `src/components/Navigation/Header.jsx`

Renderiza la barra superior.

Exporta también `mainCategories`, que es la lista central de categorías del portal:

```js
[
  { id, label, path, icon }
]
```

El header usa enlaces HTML reales (`<a href="...">`) para que la navegación funcione aunque React tarde en hidratar.

### `src/components/Navigation/Sidebar.jsx`

Renderiza el aside de temas de la categoría activa.

Incluye:

- versión desktop colapsable
- versión móvil como drawer
- enlaces reales para cada subtema
- lista de otras secciones en móvil

El aside recibe desde `AppLayout`:

```js
activeCategory
activeSubTopics
currentPath
```

### `src/components/CategoryLanding.jsx`

Renderiza la página índice de una categoría.

Props principales:

```js
category
title
description
icon
topics
```

Si `topics` está vacío, muestra un estado "Próximamente". Si tiene elementos, muestra una grilla de cards enlazadas.

### `src/components/NoteLayout.jsx`

Plantilla base para apuntes.

Props:

```js
title
category
categoryPath
tags
previousNote
nextNote
children
```

Incluye:

- breadcrumb
- tags del apunte
- título
- estilos para encabezados, listas, tablas, código y callouts
- navegación anterior/siguiente
- navegación por teclado con `ArrowLeft` y `ArrowRight`

La navegación por teclado se desactiva cuando el foco está en `input`, `textarea` o un elemento editable.

### `src/components/Term.jsx`

Componente para términos con definición.

Uso:

```jsx
<Term id="vlan">VLAN</Term>
```

Busca la clave en `src/utils/glossary.js`. Si la encuentra, muestra un tooltip propio con CSS y React. Si no la encuentra, renderiza solo el texto.

### `src/utils/path.js`

Contiene `resolvePath(path)`.

Su objetivo es evitar rutas rotas cuando el sitio se publica bajo `/ApuntesDeOli` en GitHub Pages.

Reglas:

- enlaces externos (`http://`, `https://`) quedan igual
- anclas (`#...`) quedan igual
- rutas internas que empiezan con `/` reciben `import.meta.env.BASE_URL`

## Datos De Navegación

Hay dos listas importantes:

### Categorías Principales

Están en:

```text
src/components/Navigation/Header.jsx
```

Sirven para:

- links del header
- detectar categoría activa en `AppLayout`
- mostrar otras secciones en el drawer móvil

### Subtemas Por Categoría

Están en:

```text
src/components/AppLayout.jsx
```

Sirven para:

- links del aside
- estado activo del tema actual
- navegación rápida dentro de una categoría

Cuando se agrega un apunte nuevo, normalmente hay que agregarlo en `subTopics`.

## Sistema De Rutas

Astro usa rutas por archivos. Para crear:

```text
/Redes/NuevoTema
```

se necesita:

```text
src/pages/Redes/NuevoTema/index.astro
```

Ese archivo importa el componente del contenido:

```astro
---
import Layout from "../../../layouts/Layout.astro";
import NuevoTema from "../../../components/Redes/NuevoTema.jsx";
---

<Layout>
  <NuevoTema client:load />
</Layout>
```

## Sistema De Temas Visuales

Los colores por categoría están en `categoryColors` dentro de `AppLayout.jsx`.

Cada entrada define:

```js
accent
accentRgb
glow
border
bgLight
textAccent
```

Los componentes consumen esos valores mediante variables CSS. Por eso los apuntes de Ciencia de Datos usan morado, Redes usa rosado, Fundamentos usa cyan, etc.

## Glosarios

El diccionario común está en:

```text
src/utils/glossary.js
```

Los glosarios filtrables usan el mismo diccionario, pero cada glosario decide qué términos mostrar y cómo categorizarlos:

```text
src/components/Redes/GlosarioRedes.jsx
src/components/CienciaDeDatos/GlosarioCienciaDatos.jsx
```

Esto permite reutilizar términos entre secciones y mantener una sola fuente de definiciones.

## Build Y Salida

El comando:

```bash
npm run build
```

genera:

```text
dist/
```

La salida es estática y puede publicarse en GitHub Pages, Vercel u otro hosting estático.

## Workflows De GitHub

Hay dos workflows:

```text
.github/workflows/deploy.yml
.github/workflows/static.yml
```

`deploy.yml` usa `withastro/action@v3` y despliega el build de Astro. Es el flujo recomendado.

`static.yml` sube el repositorio completo como artifact de Pages. Puede ser útil para pruebas simples, pero no es ideal para una app Astro con build.
