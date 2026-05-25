# Guia De Contenido Y Mantenimiento

Esta guía explica cómo agregar, modificar y mantener apuntes, categorías, rutas y glosarios dentro de ApuntesDeOli.

## Agregar Un Apunte Nuevo

Supongamos que quieres agregar:

```text
/CienciaDeDatos/Visualizacion
```

### 1. Crear El Componente Del Apunte

Crea:

```text
src/components/CienciaDeDatos/Visualizacion.jsx
```

Estructura recomendada:

```jsx
import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function Visualizacion() {
  return (
    <NoteLayout
      title="Visualización de Datos"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Visualización", "Gráficos", "Análisis"]}
      previousNote={{
        label: "9. Python & Operaciones",
        path: "/CienciaDeDatos/PythonOperaciones",
      }}
      nextNote={{
        label: "Glosario de Ciencia de Datos",
        path: "/CienciaDeDatos/Glosario",
      }}
    >
      <div className="callout">
        La visualización ayuda a convertir datos en patrones interpretables.
      </div>

      <h2>Objetivo</h2>
      <p>
        Un gráfico bien diseñado permite explicar tendencias, relaciones y
        anomalías dentro de un <Term id="dataset">dataset</Term>.
      </p>
    </NoteLayout>
  );
}
```

### 2. Crear La Ruta Astro

Crea:

```text
src/pages/CienciaDeDatos/Visualizacion/index.astro
```

Contenido:

```astro
---
import Layout from "../../../layouts/Layout.astro";
import Visualizacion from "../../../components/CienciaDeDatos/Visualizacion.jsx";
---

<Layout>
  <Visualizacion client:load />
</Layout>
```

### 3. Agregar El Tema Al Aside

Edita:

```text
src/components/AppLayout.jsx
```

Busca el arreglo:

```js
"/CienciaDeDatos": [
  ...
]
```

Agrega:

```js
{ id: "visualizacion", label: "Visualización", path: "/CienciaDeDatos/Visualizacion" },
```

### 4. Agregarlo Al Landing De La Categoría

Edita:

```text
src/pages/CienciaDeDatos/index.astro
```

Agrega el elemento en `topics`:

```js
{ label: "Visualización de Datos", path: "/CienciaDeDatos/Visualizacion" },
```

### 5. Revisar Navegación Anterior/Siguiente

Actualiza `previousNote` y `nextNote` en los apuntes vecinos para mantener una lectura lineal.

## Agregar Una Categoria Nueva

Para una categoría nueva, por ejemplo `SistemasOperativos`:

### 1. Crear Landing

```text
src/pages/SistemasOperativos/index.astro
```

```astro
---
import Layout from "../../layouts/Layout.astro";
import CategoryLanding from "../../components/CategoryLanding.jsx";
---

<Layout>
  <CategoryLanding
    client:load
    category="sistemas-operativos"
    title="Sistemas Operativos"
    description="Procesos, memoria, archivos y concurrencia."
    icon="Code"
    topics={[]}
  />
</Layout>
```

### 2. Agregarla Al Header

Edita:

```text
src/components/Navigation/Header.jsx
```

Agrega una entrada en `mainCategories`:

```js
{ id: "sistemas-operativos", label: "Sistemas Operativos", path: "/SistemasOperativos", icon: Code },
```

### 3. Agregar Color Temático

Edita `categoryColors` en:

```text
src/components/AppLayout.jsx
```

Agrega una entrada para el nuevo `id`:

```js
"sistemas-operativos": {
  accent: "#8b5cf6",
  accentRgb: "139,92,246",
  glow: "rgba(139,92,246,0.15)",
  border: "rgba(139,92,246,0.2)",
  bgLight: "rgba(139,92,246,0.1)",
  textAccent: "#a78bfa"
}
```

### 4. Agregar Subtemas

En `subTopics`, dentro de `AppLayout.jsx`:

```js
"/SistemasOperativos": [
  { id: "procesos", label: "Procesos", path: "/SistemasOperativos/Procesos" },
]
```

## Agregar Terminos Al Glosario

Edita:

```text
src/utils/glossary.js
```

Agrega una clave en minúscula. Usa guion bajo si el concepto tiene varias palabras.

```js
visualizacion_datos: {
  title: "Visualización de Datos",
  def: "Representación gráfica de datos para facilitar el análisis, la comunicación y la detección de patrones."
}
```

Uso dentro de un apunte:

```jsx
<Term id="visualizacion_datos">visualización de datos</Term>
```

Si el término se usará en el glosario filtrable de Ciencia de Datos, agrega su categoría en:

```text
src/components/CienciaDeDatos/GlosarioCienciaDatos.jsx
```

Ejemplo:

```js
visualizacion_datos: "General",
```

Si el término se usará en el glosario filtrable de Redes, agrega su categoría en:

```text
src/components/Redes/GlosarioRedes.jsx
```

## Convenciones De Escritura

Para que los apuntes se vean consistentes:

- Usa `NoteLayout` en páginas de contenido.
- Usa `CategoryLanding` para páginas índice.
- Usa `Term` solo en conceptos que tengan una definición útil.
- Usa `h2` para secciones principales.
- Usa `h3` para subsecciones.
- Usa `.callout` para ideas importantes o resúmenes.
- Evita poner explicaciones de UI dentro de la app; la interfaz debe ser autoexplicativa.

## Navegacion

Hay cuatro lugares donde una nueva ruta puede necesitar registrarse:

| Lugar | Archivo | Cuándo editar |
| --- | --- | --- |
| Header | `src/components/Navigation/Header.jsx` | Al crear una categoría nueva. |
| Aside | `src/components/AppLayout.jsx` | Al crear o reordenar apuntes dentro de una categoría. |
| Landing | `src/pages/<Categoria>/index.astro` | Al mostrar el apunte en la página índice. |
| Anterior/Siguiente | Componente del apunte | Al modificar el orden de lectura. |

## Rutas Y GitHub Pages

No escribas manualmente `/ApuntesDeOli` en los enlaces internos.

Usa siempre:

```jsx
resolvePath("/CienciaDeDatos")
```

o componentes que ya lo usan internamente.

Esto permite que el sitio funcione en:

- local: `/CienciaDeDatos`
- GitHub Pages: `/ApuntesDeOli/CienciaDeDatos`
- Vercel: `/CienciaDeDatos`

## Verificacion Antes De Publicar

Ejecuta:

```bash
npm run build
```

Revisa que:

- no haya errores de JSX
- las rutas nuevas aparezcan en el listado del build
- los enlaces del header y aside funcionen
- los tooltips de `Term` muestren definición
- el glosario filtrable incluya los términos nuevos si corresponde

## Problemas Comunes

### El link funciona local, pero falla en GitHub Pages

Probablemente el enlace no está usando `resolvePath`. Revisa `href`.

### El tooltip no muestra definición

Revisa que el `id` usado en `Term` exista en `GLOSSARY_TERMS`.

### El apunte existe, pero no aparece en el aside

Agrega la entrada correspondiente en `subTopics` dentro de `AppLayout.jsx`.

### El apunte existe, pero no aparece en el landing

Agrega el tema en el arreglo `topics` del `index.astro` de la categoría.

### Las flechas del teclado navegan a una página incorrecta

Corrige `previousNote` y `nextNote` en el componente del apunte.
