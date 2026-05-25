# ApuntesDeOli

Portal web de apuntes universitarios de informática construido con Astro, React, Tailwind CSS y HeroUI. La aplicación publica contenido estático y usa islas React para las partes interactivas: navegación, glosarios, filtros, tooltips y lectura de apuntes.

Sitio publicado en GitHub Pages:

```text
https://KazutoBlack2004.github.io/ApuntesDeOli/
```

Repositorio:

[KazutoBlack2004/ApuntesDeOli](https://github.com/KazutoBlack2004/ApuntesDeOli)

## Contenido

- [Resumen](#resumen)
- [Tecnologías](#tecnologias)
- [Requisitos](#requisitos)
- [Comandos](#comandos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas principales](#rutas-principales)
- [Arquitectura funcional](#arquitectura-funcional)
- [Glosario interactivo](#glosario-interactivo)
- [Despliegue](#despliegue)
- [Documentación técnica](#documentacion-tecnica)

## Resumen

ApuntesDeOli funciona como una biblioteca digital por categorías. Cada categoría tiene una página de entrada, un aside con temas internos y páginas de apuntes renderizadas sobre un layout común.

La aplicación actualmente incluye:

- Fundamentos
- Ciencia de Datos
- Desarrollo de Software
- Bases de Datos
- Redes
- Desarrollo de Videojuegos

Las secciones más completas son Redes y Ciencia de Datos. Ambas tienen glosarios completos, tooltips de términos dentro del texto y botón flotante para abrir el glosario de la categoría.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| Astro 6 | Enrutamiento por archivos, build estático y layouts base. |
| React 19 | Componentes interactivos e islas hidratadas con `client:load`. |
| Tailwind CSS 4 | Utilidades de estilo y diseño responsivo. |
| HeroUI 3 | Componentes visuales puntuales como cards y tooltips. |
| Lucide React | Iconos de navegación y UI. |
| Framer Motion | Dependencia disponible para animaciones, aunque no es obligatoria en todos los componentes. |

## Requisitos

El proyecto declara Node.js `>=22.12.0`.

Instalación inicial:

```bash
npm install
```

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia Astro en desarrollo. Por defecto usa `http://localhost:4321`. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve localmente el build generado. |
| `npm run astro` | Ejecuta la CLI de Astro. |

## Estructura Del Proyecto

```text
.
├── .github/workflows/          # Workflows de GitHub Pages
├── public/                     # Archivos estáticos públicos
├── src/
│   ├── assets/                 # Recursos importables por Astro
│   ├── components/             # Componentes React/Astro
│   │   ├── CienciaDeDatos/     # Apuntes y glosario de Ciencia de Datos
│   │   ├── Fundamentos/        # Apuntes de Fundamentos
│   │   ├── Navigation/         # Header, Sidebar y Footer
│   │   ├── Redes/              # Apuntes y glosario de Redes
│   │   ├── AppLayout.jsx       # Layout global interactivo
│   │   ├── CategoryLanding.jsx # Página tipo índice de una categoría
│   │   ├── NoteLayout.jsx      # Plantilla común para apuntes
│   │   └── Term.jsx            # Tooltip de términos del glosario
│   ├── layouts/
│   │   └── Layout.astro        # Layout Astro base
│   ├── pages/                  # Rutas de la aplicación
│   ├── styles/
│   │   └── global.css          # Estilos globales
│   └── utils/
│       ├── glossary.js         # Diccionario central de términos
│       └── path.js             # Resolución de rutas con base dinámica
├── astro.config.mjs
├── package.json
└── README.md
```

## Rutas Principales

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio del portal. |
| `/Fundamentos` | Landing de Fundamentos. |
| `/Fundamentos/UnidadesDeInformacion` | Apunte de unidades de información. |
| `/CienciaDeDatos` | Landing de Ciencia de Datos. |
| `/CienciaDeDatos/Introduccion` | Introducción a Ciencia de Datos. |
| `/CienciaDeDatos/PandasNumPy` | Pandas y NumPy. |
| `/CienciaDeDatos/EDA` | Análisis exploratorio de datos. |
| `/CienciaDeDatos/Supervisado` | Machine Learning supervisado. |
| `/CienciaDeDatos/NoSupervisado` | Machine Learning no supervisado. |
| `/CienciaDeDatos/DataWarehouse` | Data Warehouse y ETL. |
| `/CienciaDeDatos/BigData` | Big Data y Spark. |
| `/CienciaDeDatos/BusinessIntelligence` | Business Intelligence. |
| `/CienciaDeDatos/PythonOperaciones` | Operaciones con Python. |
| `/CienciaDeDatos/Glosario` | Glosario filtrable de Ciencia de Datos. |
| `/Redes` | Landing de Redes. |
| `/Redes/TiposDeIP` | Tipos de IP. |
| `/Redes/MascaraGateway` | Máscara y gateway. |
| `/Redes/InterfacesDeRed` | Interfaces de red. |
| `/Redes/ModelosRedes` | Modelos de red. |
| `/Redes/ProtocolosDispositivos` | Protocolos y dispositivos. |
| `/Redes/CalculoDeRedes` | Cálculo de redes. |
| `/Redes/VlansEnrutamiento` | VLANs y enrutamiento. |
| `/Redes/Glosario` | Glosario filtrable de Redes. |
| `/DesarrolloSoftware` | Landing de Desarrollo de Software. |
| `/BasesDeDatos` | Landing de Bases de Datos. |
| `/DesarrolloVideoJuegos` | Apunte de conceptos de Unity. |

## Arquitectura Funcional

El flujo principal es:

```text
src/pages/**/index.astro
  -> src/layouts/Layout.astro
    -> src/components/AppLayout.jsx
      -> Header + Sidebar + contenido + Footer
```

Las páginas `.astro` son responsables de importar el componente React del apunte o landing. `Layout.astro` entrega `currentPath` a `AppLayout`, y `AppLayout` calcula la categoría activa, el tema visual, los subtemas del aside y el botón flotante del glosario.

Los apuntes usan `NoteLayout.jsx`, que entrega:

- breadcrumb
- etiquetas del apunte
- título
- estilos tipográficos para contenido
- navegación anterior/siguiente
- navegación con flechas del teclado

## Glosario Interactivo

El diccionario central está en:

```text
src/utils/glossary.js
```

Cada término tiene esta forma:

```js
clave: {
  title: "Nombre visible",
  def: "Definición del término."
}
```

Para usar un término dentro de un apunte:

```jsx
import Term from "../Term.jsx";

<Term id="machine_learning">Machine Learning</Term>
```

`Term.jsx` busca el `id` en `GLOSSARY_TERMS`. Si existe, muestra un tooltip al pasar el cursor o enfocar con teclado. Si no existe, renderiza el texto normal y en desarrollo muestra una advertencia en consola.

Los glosarios completos son:

- `src/components/Redes/GlosarioRedes.jsx`
- `src/components/CienciaDeDatos/GlosarioCienciaDatos.jsx`

## Despliegue

La configuración de Astro usa una base dinámica:

```js
base: (isDev || isVercel) ? "/" : "/ApuntesDeOli"
```

Esto significa:

- En desarrollo local, las rutas usan `/`.
- En Vercel, las rutas usan `/`.
- En GitHub Pages, las rutas usan `/ApuntesDeOli`.

El workflow recomendado para GitHub Pages es:

```text
.github/workflows/deploy.yml
```

Existe también:

```text
.github/workflows/static.yml
```

Ese workflow sube el repositorio completo como contenido estático y puede no representar el build final de Astro. Si se mantiene GitHub Pages como destino principal, conviene usar `deploy.yml` como referencia.

## Documentación Técnica

La documentación extendida está en:

- [Arquitectura](docs/ARCHITECTURE.md)
- [Guía de contenido y mantenimiento](docs/CONTENT_GUIDE.md)

## Estado Del Proyecto

La aplicación compila como sitio estático con:

```bash
npm run build
```

El build genera 26 páginas estáticas en `dist/`.
