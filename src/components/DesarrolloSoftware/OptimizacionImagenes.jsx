import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Zap, 
  Info, 
  ExternalLink, 
  CheckCircle,
  FileImage,
  Layers,
  ArrowRight,
  TrendingDown
} from "lucide-react";

export default function OptimizacionImagenes() {
  return (
    <NoteLayout
      title="Optimización y Compresión de Imágenes"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Performance", "Imágenes", "WebP", "Squoosh", "Optimización", "LCP"]}
      previousNote={{ label: "SEO para Desarrollo Web", path: "/DesarrolloSoftware/SEO" }}
      nextNote={{ label: "Estilos de Interfaz (UI)", path: "/DesarrolloSoftware/EstilosUI" }}
    >
      <div className="callout">
        La <strong>Optimización y Compresión de Imágenes</strong> es el proceso de reducir el peso físico 
        (en bytes) de los archivos de imagen utilizados en una aplicación sin comprometer de forma perceptible 
        su calidad visual. Es la acción con mayor impacto inmediato en la velocidad de carga de un sitio web.
      </div>

      <h2>¿Por qué es Crucial Optimizar Imágenes?</h2>
      <p>
        En el desarrollo de software moderno, especialmente en la web, el rendimiento lo es todo. Las imágenes suelen representar 
        el **60% al 70% del peso total** de transferencia de datos de una página promedio.
      </p>
      <ul>
        <li>
          <strong>Impacto en Core Web Vitals (LCP):</strong> El <Term id="lcp">LCP</Term> mide la velocidad con la que se muestra el elemento principal de la pantalla. Si tu banner principal pesa 3 MB, el LCP será malo, lo que provocará que Google penalice tu posicionamiento SEO.
        </li>
        <li>
          <strong>Experiencia de Usuario en Móviles:</strong> Los usuarios con conexiones móviles (3G/4G inestables) o planes de datos limitados sufren directamente las páginas pesadas. Un sitio lento incrementa drásticamente la tasa de rebote.
        </li>
        <li>
          <strong>Costos de Infraestructura:</strong> Menos peso significa menos consumo de ancho de banda en tus servidores o CDN (Content Delivery Network), lo que se traduce directamente en un ahorro de costos de hosting.
        </li>
      </ul>

      <h2>Compresión con Pérdida (Lossy) vs. Sin Pérdida (Lossless)</h2>
      <p>
        Existen dos métodos fundamentales para reducir el peso de las imágenes:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
            <TrendingDown size={18} />
            Compresión con Pérdida (Lossy)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Elimina datos e información redundante de la imagen que el ojo humano no es capaz de distinguir con facilidad. 
            Permite reducciones masivas de peso (hasta un 80%-90%), pero si se abusa de ella, la imagen mostrará artefactos o pixelado.
          </p>
          <div className="text-[10px] bg-pink-500/5 border border-pink-500/10 rounded p-2 text-pink-300/80 font-mono">
            IDEAL PARA: Fotografías, banners, ilustraciones complejas de fondo.
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <CheckCircle size={18} />
            Compresión sin Pérdida (Lossless)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Reduce el peso optimizando la forma en que se almacena internamente la información del archivo, sin eliminar ningún píxel o detalle original. 
            La calidad es 100% idéntica, pero las reducciones de peso son mucho más discretas (usualmente entre un 5% y un 20%).
          </p>
          <div className="text-[10px] bg-cyan-500/5 border border-cyan-500/10 rounded p-2 text-cyan-300/80 font-mono">
            IDEAL PARA: Logotipos con textos definidos, iconos vectoriales pixelados, gráficos con transparencias.
          </div>
        </div>
      </div>

      <h2>Formatos de Imagen Clásicos vs. Nueva Generación</h2>
      <p>
        El formato de archivo determina los algoritmos de compresión disponibles. Reemplazar formatos heredados por formatos de nueva generación es clave:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] text-xs">Formato</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Tipo de Compresión</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Transparencias (Alpha)</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Caso de Uso Web</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">JPEG (JPG)</td>
              <td className="px-4 py-3 text-white/65 text-xs">Con pérdida (Lossy)</td>
              <td className="px-4 py-3 text-rose-400 text-xs">No</td>
              <td className="px-4 py-3 text-white/50 text-xs">Fotografías complejas y banners antiguos.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">PNG</td>
              <td className="px-4 py-3 text-white/65 text-xs">Sin pérdida (Lossless)</td>
              <td className="px-4 py-3 text-emerald-400 text-xs">Sí</td>
              <td className="px-4 py-3 text-white/50 text-xs">Logos, capturas de pantalla, gráficos con bordes definidos. Muy pesado para fotos.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-emerald-300 text-xs">WebP</td>
              <td className="px-4 py-3 text-white/65 text-xs">Ambas (Lossy / Lossless)</td>
              <td className="px-4 py-3 text-emerald-400 text-xs">Sí</td>
              <td className="px-4 py-3 text-emerald-400/80 text-xs font-semibold">El estándar actual. Soporta transparencias y pesa 30% menos que JPEG/PNG.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-cyan-300 text-xs">AVIF</td>
              <td className="px-4 py-3 text-white/65 text-xs">Ambas (Lossy / Lossless)</td>
              <td className="px-4 py-3 text-emerald-400 text-xs">Sí</td>
              <td className="px-4 py-3 text-cyan-400/80 text-xs font-semibold">Nueva generación (50% más ligero que JPEG). Soporte en navegadores modernos.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>El Impacto de la Optimización (Ejemplo de Peso)</h2>
      <p>
        Analicemos el caso real de una fotografía en alta resolución utilizada como banner de fondo (Hero Banner) en un sitio web. 
        Mira cómo disminuye radicalmente el peso y el tiempo estimado de carga sobre redes móviles en función de su formato y optimización:
      </p>

      {/* Visual representation of image sizes */}
      <div className="space-y-3.5 my-6">
        
        {/* original */}
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileImage size={14} />
              1. Imagen Original (PNG exportado directo)
            </span>
            <span className="font-mono text-xs font-bold text-white">4.2 Megabytes (4,300 KB)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded overflow-hidden mb-2">
            <div className="h-full bg-rose-500 w-full" />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>Calidad: 100% (Lossless)</span>
            <span>Tiempo de carga (Móvil 3G): ~12.5 segundos (Crítico)</span>
          </div>
        </div>

        {/* jpeg */}
        <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} />
              2. Comprimido Estándar (JPEG @ 75% calidad)
            </span>
            <span className="font-mono text-xs font-bold text-white">650 Kilobytes (KB)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded overflow-hidden mb-2">
            <div className="h-full bg-yellow-500 w-[15.1%]" />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>Calidad: 75% (Ahorro del 84.5%)</span>
            <span>Tiempo de carga (Móvil 3G): ~1.8 segundos</span>
          </div>
        </div>

        {/* webp */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-400" />
              3. Formato Web de Nueva Generación (<Term id="webp">WebP</Term>)
            </span>
            <span className="font-mono text-xs font-bold text-emerald-300">180 Kilobytes (KB)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded overflow-hidden mb-2">
            <div className="h-full bg-emerald-500 w-[4.1%]" />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>Calidad: Inteligente (Ahorro del 95.7% del peso inicial)</span>
            <span>Tiempo de carga (Móvil 3G): ~0.4 segundos (Excelente)</span>
          </div>
        </div>

      </div>

      <h2>Herramienta Destacada: Squoosh</h2>
      <p>
        <strong>Squoosh</strong> (squoosh.app) es una herramienta web de código abierto desarrollada por Google 
        que permite comprimir y convertir imágenes en una amplia variedad de formatos en tu navegador.
      </p>
      
      <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 my-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="font-bold text-emerald-300 text-sm font-sans m-0">¿Por qué Squoosh es tan revolucionaria?</h3>
        </div>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          A diferencia de otras webs que suben tus fotos a sus servidores para procesarlas, Squoosh realiza todo el trabajo 
          <strong> localmente en tu ordenador</strong>. Utiliza tecnologías como **WebAssembly** para ejecutar los mismos códecs C++ 
          nativos del sistema operativo directamente en la sandbox de tu navegador. Esto garantiza:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Privacidad Absoluta</span>
            <span className="text-xs text-white/55 leading-normal">Tus imágenes nunca salen de tu dispositivo ni se envían a ningún servidor externo.</span>
          </div>
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Comparación Visual</span>
            <span className="text-xs text-white/55 leading-normal">Ofrece un slider interactivo "antes/después" para ver si hay pérdida de calidad antes de descargar.</span>
          </div>
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Control de Códecs</span>
            <span className="text-xs text-white/55 leading-normal">Puedes elegir algoritmos avanzados como MozJPEG, WebP, AVIF o OxiPNG de forma manual.</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a 
            href="https://squoosh.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors no-underline"
          >
            Visitar Squoosh.app
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <h2>Otras Herramientas de Compresión</h2>
      <p>
        Dependiendo de si necesitas una optimización rápida o automatizar el proceso en tu código de software, tienes varias opciones:
      </p>
      <ul>
        <li>
          <strong>TinyPNG / TinyJPG:</strong> (Web y API) Excelente para comprimir de forma masiva arrastrando y soltando archivos. 
          Aplica cuantización inteligente (reduce la paleta de colores del archivo) logrando reducciones de peso notables.
        </li>
        <li>
          <strong>Librería `sharp` (para Node.js):</strong> (Automatización) Si creas un backend o un flujo de compilación, 
          `sharp` es la librería más rápida basada en libvips para redimensionar, comprimir y transformar imágenes a WebP o AVIF de forma programática.
          <pre className="mt-2.5 p-3.5 bg-black/50 border border-white/5 rounded-lg font-mono text-[11px] text-white/70 overflow-x-auto">
{`const sharp = require('sharp');

sharp('entrada.png')
  .resize(800) // Redimensionar ancho a 800px
  .webp({ quality: 80 }) // Convertir a WebP con 80% de calidad
  .toFile('salida.webp');`}
          </pre>
        </li>
        <li>
          <strong>Plugins para Bundlers (Vite/Webpack):</strong> Puedes usar plugins como <code>vite-plugin-imagemin</code> 
          para que, al ejecutar la compilación de producción del sitio, todas tus imágenes locales se optimicen automáticamente en el build.
        </li>
      </ul>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Consejo Pro:</strong> No uses imágenes sobredimensionadas. 
          Si tu sitio web muestra una foto de perfil en 150x150 píxeles, no subas una foto de 3000x3000px, 
          aunque esté optimizada. Recorta y ajusta el tamaño en píxeles antes de comprimirla.
        </p>
      </div>
    </NoteLayout>
  );
}
