# 📖 ApuntesDeOli — Portal Premium de Documentación Informática

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![HeroUI](https://img.shields.io/badge/HeroUI_v3-F43F5E?style=for-the-badge&logo=react-aria&logoColor=white)](https://heroui.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**ApuntesDeOli** es una plataforma web moderna, rápida y de alto rendimiento diseñada como un centro de documentación interactivo para asignaturas de la carrera de Informática.

Construido sobre una arquitectura estática (SSG) híbrida utilizando **Astro**, **React**, **Tailwind CSS v4** y **HeroUI v3**.

---

## 🌟 Características Destacadas

*   **🎨 Diseño Premium Glassmorphic**: Interfaz inmersiva diseñada en base a un sistema de modo oscuro puro con acentos rosa/fucsia vibrantes, gradientes armonizados y micro-animaciones fluidas de hover mediante Framer Motion.
*   **📖 Glosario de Redes Interactivo (Hover Tooltips)**: Sistema inteligente que enlaza términos técnicos automáticamente a lo largo de las notas de estudio. Al colocar el cursor sobre palabras clave (como *IP, MAC, OSPF, VLAN, Router*), emerge de forma instantánea una tarjeta informativa de HeroUI v3 con su significado técnico.
*   **🛎️ Botón Flotante de Estudio Ininterrumpido**: Un recurso de estudio contextualmente inteligente. Solo aparece dentro de la sección de Redes y abre un Glosario completo auto-filtrable en una nueva pestaña del navegador, evitando recargar y perder el hilo de lectura actual.
*   **🔍 Glosario Auto-Filtrable**: Buscador predictivo en tiempo real con filtrado rápido por categorías ("Protocolos", "Dispositivos", "Conceptos") para localizar instantáneamente cualquiera de las 34 definiciones técnicas cargadas en base de datos.
*   **⌨️ Atajos de Teclado Inteligentes**: Permite navegar entre notas contiguas de forma instantánea presionando las flechas de dirección izquierda ($\leftarrow$) y derecha ($\rightarrow$), con medidas de seguridad de UX integradas para evitar disparar la navegación al escribir dentro del buscador.
*   **📂 Multi-Categorías**: Estructura modular preparada para múltiples apuntes:
    *   `Redes` (Cisco CCNA completo)
    *   `Fundamentos de Informática`
    *   `Desarrollo de Software`
    *   `Bases de Datos`
    *   `Desarrollo de Videojuegos con Unity`

---

## 🛠️ Comandos de Desarrollo y Compilación

| Comando | Acción |
| :--- | :--- |
| **`npm install`** | Instala las dependencias y prepara el proyecto. |
| **`npm run dev`** | Inicia el servidor de desarrollo local interactivo en `localhost:4321`. |
| **`npm run build`** | Ejecuta la compilación de producción optimizando los paquetes de Vite. |
| **`npm run preview`** | Levanta un servidor web local apuntando al build estático compilado en `dist/`. |

---

## 🚀 Arquitectura y Despliegue Multi-Entorno

El proyecto implementa una configuración dinámica inteligente en `astro.config.mjs` para ajustar la base de rutas según el entorno de destino:


*   **Vercel (Dominio Raíz)**: Detecta automáticamente el entorno del build a través de `process.env.VERCEL` y compila en la raíz (`/`), garantizando un correcto enlace de recursos.
    *   Para desplegar en Vercel, simplemente vincula el repositorio a tu panel de Vercel y haz clic en **Deploy** (toda la configuración de Astro es autodetectada).
