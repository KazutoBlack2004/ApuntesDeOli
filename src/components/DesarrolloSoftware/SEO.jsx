import React, { useState, useMemo } from "react";
import NoteLayout from "../NoteLayout.jsx";
import {
  Search,
  Globe,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Eye,
  Code,
  Share2,
  BarChart2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── SEO Analyzer Tool ────────────────────────────────────────────────────────

const MAX_TITLE = 60;
const MIN_TITLE = 30;
const MAX_DESC = 160;
const MIN_DESC = 120;

function getStatus(value, min, max) {
  if (!value || value.length === 0) return "missing";
  if (value.length < min) return "short";
  if (value.length > max) return "long";
  return "ok";
}

function StatusBadge({ status }) {
  const map = {
    ok: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", label: "Optimo" },
    short: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Muy corto" },
    long: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", label: "Muy largo" },
    missing: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "Faltante" },
  };
  const s = map[status] || map.missing;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.color}`}>
      <Icon size={9} />
      {s.label}
    </span>
  );
}

function CharCounter({ value, min, max }) {
  const len = value?.length || 0;
  const status = getStatus(value, min, max);
  const color =
    status === "ok" ? "text-emerald-400" :
    status === "missing" ? "text-red-400" :
    "text-yellow-400";
  return (
    <span className={`text-[10px] font-mono ${color}`}>
      {len} / {max}
    </span>
  );
}

function SERPPreview({ title, description, url }) {
  const displayTitle = title || "Título de tu página";
  const displayDesc = description || "Aquí aparecerá tu meta descripción. Escribe algo atractivo que invite al usuario a hacer clic en tu resultado.";
  const displayUrl = url || "https://tu-sitio.com/pagina";

  const truncTitle = displayTitle.length > MAX_TITLE ? displayTitle.slice(0, MAX_TITLE) + "..." : displayTitle;
  const truncDesc = displayDesc.length > MAX_DESC ? displayDesc.slice(0, MAX_DESC) + "..." : displayDesc;

  return (
    <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] font-sans">
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 block mb-3">Vista previa en Google</span>
      <div className="space-y-0.5">
        {/* URL breadcrumb */}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Globe size={9} className="text-white/40" />
          </div>
          <span className="text-[11px] text-white/50 truncate">{displayUrl}</span>
        </div>
        {/* Title */}
        <p className="text-[17px] font-normal text-blue-400 hover:underline cursor-pointer leading-snug m-0 truncate">
          {truncTitle}
        </p>
        {/* Description */}
        <p className="text-[13px] text-white/55 leading-snug m-0 line-clamp-2">
          {truncDesc}
        </p>
      </div>
    </div>
  );
}

function OGPreview({ title, description, url, imageUrl }) {
  const displayTitle = title || "Título de tu página";
  const displayDesc = description || "Tu meta descripción aparecerá aquí al compartir en redes sociales.";
  const displayUrl = url ? new URL(url.startsWith("http") ? url : "https://" + url).hostname : "tu-sitio.com";

  return (
    <div className="rounded-xl border border-white/8 overflow-hidden font-sans bg-white/[0.02]">
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 block px-4 pt-3 pb-2">Vista previa al compartir (Open Graph)</span>
      {/* OG Image */}
      <div className="w-full h-28 bg-gradient-to-br from-[var(--accent-color)]/20 to-purple-900/20 border-y border-white/5 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="OG" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
        ) : (
          <div className="text-center">
            <Share2 size={20} className="text-white/20 mx-auto mb-1" />
            <span className="text-[10px] text-white/20">Agrega una og:image URL</span>
          </div>
        )}
      </div>
      {/* OG Meta */}
      <div className="px-4 py-3 space-y-0.5">
        <span className="text-[10px] uppercase tracking-widest text-white/30">{displayUrl}</span>
        <p className="text-sm font-bold text-white m-0 leading-snug line-clamp-2">{displayTitle}</p>
        <p className="text-[12px] text-white/50 m-0 line-clamp-2 leading-snug">{displayDesc}</p>
      </div>
    </div>
  );
}

function ScoreGauge({ score }) {
  const color =
    score >= 80 ? "text-emerald-400" :
    score >= 50 ? "text-yellow-400" :
    "text-red-400";
  const bg =
    score >= 80 ? "bg-emerald-500" :
    score >= 50 ? "bg-yellow-500" :
    "bg-red-500";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={score >= 80 ? "#34d399" : score >= 50 ? "#facc15" : "#f87171"}
            strokeWidth="3"
            strokeDasharray={`${score} ${100 - score}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-lg font-black ${color}`}>
          {score}
        </span>
      </div>
      <span className="text-[10px] text-white/40 font-semibold">SEO Score</span>
    </div>
  );
}

function CodeBlock({ code, onCopy, copied }) {
  return (
    <div className="relative">
      <pre className="m-0 p-4 bg-black/60 border border-white/8 rounded-xl text-[11px] font-mono text-white/70 overflow-x-auto leading-relaxed">
        {code}
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] border border-white/10 bg-white/5 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-all"
      >
        {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} className="text-white/50" />}
        <span className={copied ? "text-emerald-400" : "text-white/50"}>{copied ? "Copiado" : "Copiar"}</span>
      </button>
    </div>
  );
}

function SEOTool() {
  const [title, setTitle] = useState("Aprende SEO desde cero | Apuntes de Oli");
  const [description, setDescription] = useState("Guía completa de SEO para desarrolladores web. Aprende a optimizar tus páginas, entender el algoritmo de Google y aumentar tu tráfico orgánico.");
  const [url, setUrl] = useState("https://apuntesdeoli.com/seo");
  const [imageUrl, setImageUrl] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [canonical, setCanonical] = useState("");
  const [activeView, setActiveView] = useState("serp");
  const [copied, setCopied] = useState(false);

  const titleStatus = getStatus(title, MIN_TITLE, MAX_TITLE);
  const descStatus = getStatus(description, MIN_DESC, MAX_DESC);
  const urlOk = url && url.startsWith("http");
  const imageOk = !!imageUrl;
  const canonicalOk = !!canonical;

  const score = useMemo(() => {
    let s = 0;
    if (titleStatus === "ok") s += 30;
    else if (titleStatus !== "missing") s += 15;
    if (descStatus === "ok") s += 30;
    else if (descStatus !== "missing") s += 15;
    if (urlOk) s += 10;
    if (imageOk) s += 15;
    if (canonicalOk) s += 10;
    if (robots === "index, follow") s += 5;
    return Math.min(s, 100);
  }, [titleStatus, descStatus, urlOk, imageOk, canonicalOk, robots]);

  const generatedHTML = `<!-- SEO Basico -->
<title>${title || "Título de la página"}</title>
<meta name="description" content="${description || "Descripción de la página"}">
<meta name="robots" content="${robots}">
${canonical ? `<link rel="canonical" href="${canonical}">` : `<!-- <link rel="canonical" href="URL canonica"> -->`}

<!-- Open Graph (Redes Sociales) -->
<meta property="og:title" content="${title || "Título de la página"}">
<meta property="og:description" content="${description || "Descripción de la página"}">
<meta property="og:url" content="${url || "https://tu-sitio.com"}">
${imageUrl ? `<meta property="og:image" content="${imageUrl}">` : `<!-- <meta property="og:image" content="URL de imagen"> -->`}
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title || "Título de la página"}">
<meta name="twitter:description" content="${description || "Descripción de la página"}">
${imageUrl ? `<meta name="twitter:image" content="${imageUrl}">` : `<!-- <meta name="twitter:image" content="URL de imagen"> -->`}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHTML).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6">
      {/* Header */}
      <div className="bg-white/[0.03] border-b border-white/8 px-5 py-3.5 flex items-center gap-2">
        <Search size={15} className="text-[var(--accent-text)]" />
        <span className="text-sm font-bold text-white">Generador y Analizador de Meta Tags SEO</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Left: Inputs */}
        <div className="p-5 border-r border-white/5 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Configuracion</span>
            <ScoreGauge score={score} />
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/70">
                Titulo de la pagina <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <CharCounter value={title} min={MIN_TITLE} max={MAX_TITLE} />
                <StatusBadge status={titleStatus} />
              </div>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mi sitio | Descripcion corta"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-sans focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
            <p className="text-[10px] text-white/30 mt-1">
              Optimo: {MIN_TITLE}–{MAX_TITLE} caracteres. Incluye la keyword principal al inicio.
            </p>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/70">
                Meta descripcion <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <CharCounter value={description} min={MIN_DESC} max={MAX_DESC} />
                <StatusBadge status={descStatus} />
              </div>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripcion atractiva de la pagina..."
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-sans focus:outline-none focus:border-[var(--accent-color)] transition-colors resize-none"
            />
            <p className="text-[10px] text-white/30 mt-1">
              Optimo: {MIN_DESC}–{MAX_DESC} caracteres. Debe incitar al clic con una propuesta de valor clara.
            </p>
          </div>

          {/* URL */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/70">URL de la pagina</label>
              <StatusBadge status={urlOk ? "ok" : "missing"} />
            </div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://mi-sitio.com/pagina"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
          </div>

          {/* Canonical */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/70">URL Canonica</label>
              <StatusBadge status={canonicalOk ? "ok" : "short"} />
            </div>
            <input
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
              placeholder="https://mi-sitio.com/pagina (generalmente igual a URL)"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
            <p className="text-[10px] text-white/30 mt-1">
              Evita contenido duplicado indicandole a Google cual es la URL "oficial" de la pagina.
            </p>
          </div>

          {/* OG Image */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/70">URL de imagen OG</label>
              <StatusBadge status={imageOk ? "ok" : "missing"} />
            </div>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://mi-sitio.com/og-image.png (1200x630px)"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
            <p className="text-[10px] text-white/30 mt-1">
              Imagen que aparece al compartir en redes. Recomendado: 1200×630px, menos de 1MB.
            </p>
          </div>

          {/* Robots */}
          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Meta Robots</label>
            <select
              value={robots}
              onChange={(e) => setRobots(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            >
              <option value="index, follow">index, follow (recomendado)</option>
              <option value="noindex, follow">noindex, follow (no indexar pero seguir links)</option>
              <option value="index, nofollow">index, nofollow (indexar pero no seguir links)</option>
              <option value="noindex, nofollow">noindex, nofollow (paginas privadas)</option>
            </select>
          </div>
        </div>

        {/* Right: Preview & Code */}
        <div className="flex flex-col">
          {/* Tab Switcher */}
          <div className="flex border-b border-white/5 bg-white/[0.01]">
            {[
              { key: "serp", icon: Search, label: "SERP Google" },
              { key: "og", icon: Share2, label: "Open Graph" },
              { key: "code", icon: Code, label: "Codigo HTML" },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveView(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold cursor-pointer transition-all border-b-2 ${
                    activeView === tab.key
                      ? "border-[var(--accent-color)] text-[var(--accent-text)] bg-[var(--accent-color)]/5"
                      : "border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  <Icon size={12} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {activeView === "serp" && (
              <>
                <SERPPreview title={title} description={description} url={url} />
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 block">Analisis</span>
                  {[
                    { label: "Titulo", status: titleStatus, detail: `${title?.length || 0} chars (ideal: ${MIN_TITLE}–${MAX_TITLE})` },
                    { label: "Descripcion", status: descStatus, detail: `${description?.length || 0} chars (ideal: ${MIN_DESC}–${MAX_DESC})` },
                    { label: "URL configurada", status: urlOk ? "ok" : "missing", detail: urlOk ? url : "No configurada" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-white/60">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/30 font-mono">{item.detail}</span>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === "og" && (
              <>
                <OGPreview title={title} description={description} url={url} imageUrl={imageUrl} />
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 block">Analisis Open Graph</span>
                  {[
                    { label: "og:title", status: titleStatus },
                    { label: "og:description", status: descStatus },
                    { label: "og:url", status: urlOk ? "ok" : "missing" },
                    { label: "og:image", status: imageOk ? "ok" : "missing" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2">
                      <code className="text-[11px] text-cyan-400">{item.label}</code>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === "code" && (
              <CodeBlock code={generatedHTML} onCopy={handleCopy} copied={copied} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SEO Checklist ────────────────────────────────────────────────────────────

const CHECKLIST_ITEMS = [
  {
    category: "Contenido",
    color: "sky",
    items: [
      { label: "Una sola etiqueta <h1> por pagina", detail: "El H1 es el titulo principal. Solo debe existir uno por pagina y debe contener la keyword principal." },
      { label: "Jerarquia de encabezados correcta (H1 > H2 > H3)", detail: "Los encabezados deben tener un orden logico. No saltes de H1 a H3 directamente." },
      { label: "Keyword principal en el primer parrafo", detail: "Google le da mas peso al texto que aparece en las primeras 100 palabras de la pagina." },
      { label: "Contenido original y de mas de 300 palabras", detail: "El contenido duplicado penaliza. Las paginas con poco texto raramente rankean bien." },
      { label: "Texto alternativo (alt) en todas las imagenes", detail: "El atributo alt describe la imagen para buscadores y lectores de pantalla (accesibilidad)." },
    ],
  },
  {
    category: "Meta Tags",
    color: "purple",
    items: [
      { label: "Title tag entre 30 y 60 caracteres", detail: "Un titulo mas largo sera truncado en los resultados de Google." },
      { label: "Meta descripcion entre 120 y 160 caracteres", detail: "Una descripcion optima aumenta el CTR (tasa de clics) en los resultados de busqueda." },
      { label: "URL canonica configurada", detail: "Evita que Google indexe multiples versiones de la misma pagina (con www, sin www, con /index.html, etc.)." },
      { label: "Open Graph tags (og:title, og:image, og:description)", detail: "Controla como se ve tu pagina al compartirla en Facebook, LinkedIn y otras redes." },
      { label: "Twitter Card configurada", detail: "Permite personalizar el aspecto de tus links en Twitter/X." },
    ],
  },
  {
    category: "Tecnico",
    color: "emerald",
    items: [
      { label: "Sitio en HTTPS", detail: "Google da preferencia a sitios seguros. Es un factor de ranking confirmado desde 2014." },
      { label: "Sitemap.xml generado y enviado a Search Console", detail: "El sitemap le dice a Google todas las paginas de tu sitio que deben ser indexadas." },
      { label: "robots.txt correctamente configurado", detail: "Este archivo le indica a los bots que partes del sitio pueden y no pueden rastrear." },
      { label: "Velocidad de carga menor a 3 segundos", detail: "Core Web Vitals es un factor de ranking. Las paginas lentas tienen peor posicionamiento." },
      { label: "Sitio responsive (mobile-first)", detail: "Google usa el contenido movil para determinar el ranking. Un sitio que no es mobile perdera posiciones." },
    ],
  },
  {
    category: "Estructura y Links",
    color: "orange",
    items: [
      { label: "URLs descriptivas y en minusculas con guiones", detail: "Usa /aprende-seo en vez de /p?id=123. Las URLs limpias son mas faciles de entender para Google y usuarios." },
      { label: "Datos estructurados (Schema.org) implementados", detail: "Le permite a Google mostrar rich snippets (estrellas, precios, FAQs) en los resultados." },
      { label: "Links internos entre paginas relacionadas", detail: "Distribuir el link juice internamente ayuda a Google a descubrir y priorizar tus paginas." },
      { label: "Sin links rotos (404)", detail: "Los enlaces rotos perjudican la experiencia del usuario y el rastreo de Google." },
    ],
  },
];

const COLOR_MAP = {
  sky: { border: "border-sky-500/20", bg: "bg-sky-500/5", text: "text-sky-400", check: "border-sky-500/30 text-sky-400" },
  purple: { border: "border-purple-500/20", bg: "bg-purple-500/5", text: "text-purple-400", check: "border-purple-500/30 text-purple-400" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400", check: "border-emerald-500/30 text-emerald-400" },
  orange: { border: "border-orange-500/20", bg: "bg-orange-500/5", text: "text-orange-400", check: "border-orange-500/30 text-orange-400" },
};

function SEOChecklist() {
  const initialState = {};
  CHECKLIST_ITEMS.forEach((cat) => cat.items.forEach((item, i) => { initialState[`${cat.category}-${i}`] = false; }));
  const [checked, setChecked] = useState(initialState);
  const [expanded, setExpanded] = useState({});

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleExpand = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = Object.keys(checked).length;
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneItems / totalItems) * 100);

  return (
    <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-xl my-6">
      {/* Header */}
      <div className="bg-white/[0.03] border-b border-white/8 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 size={15} className="text-[var(--accent-text)]" />
          <span className="text-sm font-bold text-white">Checklist de SEO</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-white">{doneItems}/{totalItems}</span>
            <span className="text-[10px] text-white/30 ml-1">completados</span>
          </div>
          <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent-color)] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-black text-[var(--accent-text)]">{pct}%</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {CHECKLIST_ITEMS.map((cat) => {
          const c = COLOR_MAP[cat.color];
          const catDone = cat.items.filter((_, i) => checked[`${cat.category}-${i}`]).length;
          return (
            <div key={cat.category} className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden`}>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${c.text}`}>{cat.category}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${c.text} bg-white/5`}>
                    {catDone}/{cat.items.length}
                  </span>
                </div>
              </div>
              <div className="px-4 pb-3 space-y-2">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isExpanded = expanded[key];
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => toggle(key)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                            checked[key] ? `bg-emerald-500 border-emerald-500` : `border-white/20 hover:border-white/40`
                          }`}
                        >
                          {checked[key] && <Check size={10} className="text-white" />}
                        </button>
                        <button
                          onClick={() => toggleExpand(key)}
                          className={`flex-1 text-left text-xs leading-snug cursor-pointer transition-colors ${
                            checked[key] ? "text-white/30 line-through" : "text-white/75 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                        <button
                          onClick={() => toggleExpand(key)}
                          className="text-white/20 hover:text-white/50 transition-colors cursor-pointer shrink-0 mt-0.5"
                        >
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="ml-6 pl-2 border-l border-white/10">
                          <p className="text-[11px] text-white/45 leading-relaxed m-0">{item.detail}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SEO() {
  return (
    <NoteLayout
      title="SEO para Desarrollo Web"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["SEO", "Meta Tags", "Google", "Open Graph", "Core Web Vitals", "Posicionamiento"]}
      previousNote={{ label: "Estructura de Carpetas", path: "/DesarrolloSoftware/EstructuraCarpetas" }}
      nextNote={{ label: "Optimización de Imágenes", path: "/DesarrolloSoftware/OptimizacionImagenes" }}
    >
      <div className="callout">
        El <strong>SEO (Search Engine Optimization)</strong> es el conjunto de prácticas técnicas y de contenido 
        que buscan mejorar la visibilidad y el posicionamiento de un sitio web en los resultados orgánicos 
        de motores de búsqueda como Google. No es magia: es ingeniería aplicada al contenido.
      </div>

      <h2>Los 3 Pilares del SEO</h2>
      <p>
        El SEO moderno se estructura en tres dimensiones complementarias que deben trabajarse en conjunto:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-xl border border-sky-500/20 bg-sky-500/5">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-3">
            <Code size={18} className="text-sky-400" />
          </div>
          <h3 className="text-sm font-bold text-white m-0 mb-2">SEO Tecnico</h3>
          <p className="text-xs text-white/60 leading-relaxed m-0">
            Asegura que los bots de Google puedan rastrear e indexar tu sitio correctamente. 
            Cubre velocidad, HTTPS, mobile-first, sitemap, robots.txt y datos estructurados.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
            <Eye size={18} className="text-purple-400" />
          </div>
          <h3 className="text-sm font-bold text-white m-0 mb-2">SEO On-Page</h3>
          <p className="text-xs text-white/60 leading-relaxed m-0">
            Optimización del contenido dentro de tu sitio: estructura de encabezados, 
            keywords, meta tags, texto alternativo de imágenes y links internos.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-orange-500/20 bg-orange-500/5">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
            <Globe size={18} className="text-orange-400" />
          </div>
          <h3 className="text-sm font-bold text-white m-0 mb-2">SEO Off-Page</h3>
          <p className="text-xs text-white/60 leading-relaxed m-0">
            Todo lo que ocurre fuera de tu sitio: backlinks de calidad, menciones en redes 
            sociales, presencia en directorios y autoridad de dominio (DA).
          </p>
        </div>
      </div>

      <h2>Como Funciona el Algoritmo de Google</h2>
      <p>
        Google usa tres procesos secuenciales para posicionar tu contenido:
      </p>
      <ul>
        <li>
          <strong>Rastreo (Crawling):</strong> Googlebot visita tu sitio siguiendo enlaces y descubre 
          tus páginas. Si tu <code>robots.txt</code> bloquea al bot o tu sitio tarda mucho en cargar, 
          puede que no llegue a todas tus páginas.
        </li>
        <li>
          <strong>Indexacion:</strong> Las páginas rastreadas se almacenan en el índice de Google 
          si tienen contenido de calidad y no tienen la directiva <code>noindex</code>. 
          Un sitemap ayuda a que todas tus URLs sean descubiertas.
        </li>
        <li>
          <strong>Posicionamiento (Ranking):</strong> Cuando alguien busca algo, Google evalúa 
          más de 200 factores (relevancia, autoridad, velocidad, Core Web Vitals, UX) para 
          decidir qué páginas mostrar y en qué orden.
        </li>
      </ul>

      <h2>Meta Tags Esenciales</h2>
      <p>
        Las etiquetas meta son fragmentos de HTML que van en el <code>&lt;head&gt;</code> de tu página 
        y le comunican información clave a los buscadores y a las redes sociales. Son invisibles 
        para el usuario pero fundamentales para el SEO:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] text-xs">Etiqueta</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Para que sirve</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Longitud recomendada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">&lt;title&gt;</td>
              <td className="px-4 py-3 text-white/70 text-xs">Titulo que aparece en pestanas y resultados de Google (SERP)</td>
              <td className="px-4 py-3 text-white/50 text-xs">30–60 caracteres</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">meta description</td>
              <td className="px-4 py-3 text-white/70 text-xs">Texto del snippet en Google. Influye en el CTR pero no directamente en el ranking</td>
              <td className="px-4 py-3 text-white/50 text-xs">120–160 caracteres</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">og:title / og:description</td>
              <td className="px-4 py-3 text-white/70 text-xs">Titulo y descripcion al compartir en Facebook, LinkedIn, WhatsApp</td>
              <td className="px-4 py-3 text-white/50 text-xs">Igual que title/desc</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">og:image</td>
              <td className="px-4 py-3 text-white/70 text-xs">Imagen de preview al compartir en redes sociales</td>
              <td className="px-4 py-3 text-white/50 text-xs">1200×630px, menos de 1MB</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">canonical</td>
              <td className="px-4 py-3 text-white/70 text-xs">Indica la URL "oficial" para evitar contenido duplicado</td>
              <td className="px-4 py-3 text-white/50 text-xs">URL completa</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-xs text-yellow-400">meta robots</td>
              <td className="px-4 py-3 text-white/70 text-xs">Controla si Google puede indexar la pagina y seguir sus links</td>
              <td className="px-4 py-3 text-white/50 text-xs">index, follow (default)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Herramienta: Generador de Meta Tags SEO</h2>
      <p>
        Completa los campos y obtén al instante una vista previa de cómo verán tu página Google 
        y las redes sociales, junto con el código HTML listo para copiar en tu proyecto:
      </p>

      <SEOTool />

      <h2>Profundizando en Open Graph y Meta Etiquetas</h2>
      <p>
        Las meta etiquetas no solo sirven para el motor de búsqueda, sino que definen cómo se visualiza tu sitio
        cuando se comparte en redes sociales y plataformas de mensajería (WhatsApp, Telegram, Slack, LinkedIn). Esto
        es vital para el <strong>CTR Social</strong> (la tasa de clics que obtienes fuera de los buscadores).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-5 rounded-xl border border-sky-500/20 bg-sky-500/5">
          <div className="flex items-center gap-2 mb-3">
            <Share2 size={16} className="text-sky-400" />
            <h3 className="text-sm font-bold text-white m-0">¿Qué es el Protocolo Open Graph?</h3>
          </div>
          <p className="text-xs text-white/60 leading-relaxed m-0 mb-3">
            Creado originalmente por Facebook en 2010, Open Graph permite convertir cualquier página web en un objeto rico
            dentro del gráfico social. Al estructurar tus metadatos con el prefijo <code>og:</code>, le das control total a las
            redes sociales sobre cómo renderizar una vista previa atractiva (título, descripción, imagen y dominio).
          </p>
          <ul className="text-xs text-white/60 space-y-1.5 pl-4 m-0">
            <li><strong>og:title:</strong> El título del artículo (debe ser conciso e impactante).</li>
            <li><strong>og:description:</strong> Breve sinopsis del contenido (idealmente sin keywords forzadas).</li>
            <li><strong>og:url:</strong> La dirección web canónica que actuará como ID único.</li>
            <li><strong>og:type:</strong> Generalmente <code>website</code> o <code>article</code>.</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-white m-0">La Importancia de og:image</h3>
          </div>
          <p className="text-xs text-white/60 leading-relaxed m-0 mb-3">
            La imagen de vista previa es el elemento visual más influyente al compartir un enlace. Una página sin <code>og:image</code> o con una imagen genérica rota
            pierde hasta un 80% de clics potenciales en plataformas como WhatsApp o Twitter.
          </p>
          <ul className="text-xs text-white/60 space-y-1.5 pl-4 m-0">
            <li><strong>Resolución Ideal:</strong> <code>1200 x 630 px</code> (relación de aspecto 1.91:1) para previsualizaciones grandes de alta calidad.</li>
            <li><strong>Formato y Peso:</strong> Formatos modernos como WebP o PNG optimizado. Mantén el archivo por debajo de <code>1 MB</code> (recomendado: &lt; 300 KB).</li>
            <li><strong>Rutas Absolutas:</strong> Siempre usa una URL absoluta (ej: <code>https://tu-sitio.com/og-image.png</code>). Las redes sociales ignoran rutas relativas.</li>
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <div className="text-xs text-white/70 leading-relaxed">
          <strong className="text-amber-400">Error común - Rutas relativas:</strong> Escribir <code>&lt;meta property="og:image" content="/images/preview.png"&gt;</code>
          es el error más frecuente en producción. Los scrapers de redes sociales no pueden resolver la ruta relativa desde su dominio y no mostrarán la imagen.
          Asegúrate de que tus meta etiquetas usen siempre la URL absoluta con <code>https://</code>.
        </div>
      </div>

      <h2>Core Web Vitals: El SEO Tecnico de Performance</h2>
      <p>
        Desde 2021, Google incorporó las <strong>Core Web Vitals</strong> como factor oficial de ranking. 
        Son métricas que miden la experiencia real del usuario al cargar una página:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          {
            acronym: "LCP",
            name: "Largest Contentful Paint",
            desc: "Mide el tiempo que tarda en renderizarse el elemento visual mas grande de la pantalla (imagen hero, titulo grande, etc.).",
            good: "menor a 2.5s",
            needs: "2.5s – 4s",
            poor: "mayor a 4s",
            color: "sky",
          },
          {
            acronym: "CLS",
            name: "Cumulative Layout Shift",
            desc: "Mide cuanto se mueven los elementos de la pagina mientras carga (el famoso salto de contenido que hace que le des clic a lo incorrecto).",
            good: "menor a 0.1",
            needs: "0.1 – 0.25",
            poor: "mayor a 0.25",
            color: "purple",
          },
          {
            acronym: "INP",
            name: "Interaction to Next Paint",
            desc: "Mide la capacidad de respuesta de la pagina al interactuar con ella. Reemplaza al FID desde 2024 como metrica oficial.",
            good: "menor a 200ms",
            needs: "200ms – 500ms",
            poor: "mayor a 500ms",
            color: "orange",
          },
        ].map((cwv) => {
          const cmap = {
            sky: "border-sky-500/20 bg-sky-500/5 text-sky-400",
            purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
            orange: "border-orange-500/20 bg-orange-500/5 text-orange-400",
          };
          return (
            <div key={cwv.acronym} className={`p-4 rounded-xl border ${cmap[cwv.color].split(" ").slice(0, 2).join(" ")} ${cmap[cwv.color].split(" ")[2]}`}>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-2xl font-black ${cmap[cwv.color].split(" ").pop()}`}>{cwv.acronym}</span>
                <span className="text-[10px] text-white/40 font-mono">{cwv.name}</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-3 m-0">{cwv.desc}</p>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">Bueno</span>
                  <span className="text-white/50 font-mono">{cwv.good}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400 font-bold">Necesita mejora</span>
                  <span className="text-white/50 font-mono">{cwv.needs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400 font-bold">Malo</span>
                  <span className="text-white/50 font-mono">{cwv.poor}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Herramienta oficial:</strong> Puedes medir las Core Web Vitals 
          de cualquier URL con <strong>PageSpeed Insights</strong> (pagespeed.web.dev) y con el reporte 
          de <strong>Google Search Console</strong> para datos reales de tus usuarios.
        </p>
      </div>

      <h2>Checklist SEO Completo</h2>
      <p>
        Usa este checklist para auditar cada pagina nueva antes de publicarla. 
        Marca cada item completado y expande para ver mas detalles:
      </p>

      <SEOChecklist />

      <h2>Estructura HTML Semantica y SEO</h2>
      <p>
        HTML semántico no es solo una buena práctica de código: es SEO directo. Google lee tu HTML 
        para entender la jerarquía y el contexto de tu contenido:
      </p>
      <ul>
        <li>
          <strong>Un solo &lt;h1&gt; por pagina:</strong> Es el título principal del contenido y debe 
          contener tu keyword primaria. Múltiples H1 confunden al algoritmo.
        </li>
        <li>
          <strong>Encabezados jerarquicos:</strong> Usa H2 para secciones, H3 para subsecciones. 
          Esta estructura ayuda a Google a entender la organización del contenido.
        </li>
        <li>
          <strong>Texto alternativo en imagenes:</strong> El atributo <code>alt</code> es la única forma 
          que tiene Google de "ver" una imagen. Descríbela con keywords naturales.
        </li>
        <li>
          <strong>Elementos semanticos de HTML5:</strong> Usa <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, 
          <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code> en lugar 
          de <code>&lt;div&gt;</code> para todo. Le dan contexto estructural a los bots.
        </li>
        <li>
          <strong>URLs limpias y descriptivas:</strong> Prefiere <code>/aprende-seo</code> sobre 
          <code>/p?id=42</code>. Los guiones medios separan palabras; los guiones bajos no.
        </li>
      </ul>

      <h2>Unlighthouse: Auditoria Lighthouse para Todo el Sitio</h2>
      <p>
        Mientras que Lighthouse analiza una sola pagina a la vez, <strong>Unlighthouse</strong> rastra 
        automaticamente todas las URLs de un sitio y ejecuta una auditoria completa en paralelo, generando 
        un reporte visual unificado de performance, SEO y accesibilidad para cada pagina. Es ideal para detectar 
        problemas sistematicos en proyectos con multiples paginas.
      </p>

      <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 my-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={15} className="text-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">Como usar Unlighthouse</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          No requiere instalacion previa. Ejecuta el siguiente comando en tu terminal apuntando a cualquier URL publica 
          y se abrira automaticamente un dashboard en el navegador con los resultados en tiempo real:
        </p>
        <pre className="m-0 p-4 bg-black/60 border border-white/8 rounded-xl text-[12px] font-mono text-white/80 overflow-x-auto leading-relaxed">
{`# Auditar cualquier sitio publico
npx unlighthouse --site https://tu-sitio.com

# Especificar un directorio de salida para el reporte
npx unlighthouse --site https://tu-sitio.com --output-path ./mi-reporte

# Limitar el numero de paginas a auditar
npx unlighthouse --site https://tu-sitio.com --throttle`}
        </pre>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Performance", detail: "LCP, CLS, INP y tiempo total de carga por pagina" },
            { label: "SEO", detail: "Titulo, meta description, canonicals, robots y estructura" },
            { label: "Accesibilidad", detail: "Contraste, roles ARIA, alt texts y navegacion por teclado" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">{item.label}</span>
              <span className="text-[11px] text-white/55 leading-snug">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>Herramientas Recomendadas</h2>
      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] text-xs">Herramienta</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Para que sirve</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Precio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">Google Search Console</td>
              <td className="px-4 py-3 text-white/60 text-xs">Ver indexacion, keywords, Core Web Vitals reales, errores de rastreo</td>
              <td className="px-4 py-3 text-emerald-400 text-xs font-bold">Gratis</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">PageSpeed Insights</td>
              <td className="px-4 py-3 text-white/60 text-xs">Medir Core Web Vitals y recibir sugerencias de optimizacion de performance</td>
              <td className="px-4 py-3 text-emerald-400 text-xs font-bold">Gratis</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">Ahrefs / Semrush</td>
              <td className="px-4 py-3 text-white/60 text-xs">Investigacion de keywords, analisis de competencia, auditoria de backlinks</td>
              <td className="px-4 py-3 text-yellow-400 text-xs font-bold">Pago</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">Screaming Frog</td>
              <td className="px-4 py-3 text-white/60 text-xs">Rastrear todo tu sitio para encontrar errores 404, titulos duplicados, redirects</td>
              <td className="px-4 py-3 text-yellow-400 text-xs font-bold">Gratis / Pago</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">schema.org + JSON-LD</td>
              <td className="px-4 py-3 text-white/60 text-xs">Implementar datos estructurados para rich snippets en Google</td>
              <td className="px-4 py-3 text-emerald-400 text-xs font-bold">Gratis (estandar)</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white text-xs">Lighthouse (DevTools)</td>
              <td className="px-4 py-3 text-white/60 text-xs">Auditoria completa de performance, accesibilidad, SEO y best practices desde el navegador</td>
              <td className="px-4 py-3 text-emerald-400 text-xs font-bold">Gratis (integrado)</td>
            </tr>
            <tr className="hover:bg-white/[0.01] border-t-2 border-emerald-500/20">
              <td className="px-4 py-3 font-semibold text-emerald-300 text-xs">Unlighthouse (CLI)</td>
              <td className="px-4 py-3 text-white/60 text-xs">Lighthouse para <strong className="text-white/80">todas las paginas</strong> del sitio a la vez. Dashboard visual con scores por URL. <code className="text-emerald-400 text-[10px]">npx unlighthouse --site https://tu-sitio.com</code></td>
              <td className="px-4 py-3 text-emerald-400 text-xs font-bold">Gratis (npx)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteLayout>
  );
}
