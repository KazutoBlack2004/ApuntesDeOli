import React, { useState, useEffect } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Server,
  User,
  ShieldAlert,
  Fingerprint
} from "lucide-react";

// Helper for base64url encoding
const toBase64Url = (str) => {
  try {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (x) => String.fromCharCode(x)).join("");
    const b64 = btoa(binString);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch (e) {
    return "error";
  }
};

// Helper to check if a string is valid JSON
const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export default function TokensYJWT() {
  // Simulator state
  const [headerJson, setHeaderJson] = useState(
    JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)
  );
  const [payloadJson, setPayloadJson] = useState(
    JSON.stringify(
      {
        sub: "1234567890",
        name: "Oli",
        role: "estudiante",
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        admin: false
      },
      null,
      2
    )
  );
  const [secretKey, setSecretKey] = useState("mi_super_secreto_123_oli");
  const [showSecret, setShowSecret] = useState(false);

  // Output generated token parts
  const [headerB64, setHeaderB64] = useState("");
  const [payloadB64, setPayloadB64] = useState("");
  const [signatureB64, setSignatureB64] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  // Tampering simulation state
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedPayloadJson, setTamperedPayloadJson] = useState("");
  const [tamperedPayloadB64, setTamperedPayloadB64] = useState("");

  // Active highlight of JWT parts
  const [activePart, setActivePart] = useState(null); // 'header', 'payload', 'signature'

  // Server validation step-by-step state
  const [validationStep, setValidationStep] = useState("idle"); // idle, decoding, checking_signature, success, failed
  const [recalculatedSignature, setRecalculatedSignature] = useState("");

  // Update JWT token dynamically
  useEffect(() => {
    const updateToken = async () => {
      // 1. Encode Header & Payload
      const hB64 = isValidJson(headerJson) ? toBase64Url(headerJson.trim()) : "error";
      const pB64 = isValidJson(payloadJson) ? toBase64Url(payloadJson.trim()) : "error";

      setHeaderB64(hB64);
      setPayloadB64(pB64);

      if (hB64 === "error" || pB64 === "error") {
        setSignatureB64("");
        setJwtToken("JSON_Inválido");
        return;
      }

      // 2. Generate Signature using Web Crypto API
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(`${hB64}.${pB64}`);
        const keyData = encoder.encode(secretKey);
        const key = await crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
        const hashArray = Array.from(new Uint8Array(signatureBuffer));
        const hashString = hashArray.map(b => String.fromCharCode(b)).join("");
        const sB64 = btoa(hashString)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");

        setSignatureB64(sB64);
        setJwtToken(`${hB64}.${pB64}.${sB64}`);
      } catch (err) {
        setSignatureB64("error");
        setJwtToken("Error_Firma");
      }
    };

    updateToken();
  }, [headerJson, payloadJson, secretKey]);

  // Handle simulate verification
  const handleVerify = async () => {
    setValidationStep("decoding");

    // We simulate server steps with delays
    setTimeout(async () => {
      setValidationStep("checking_signature");

      // Calculate signature in server
      try {
        const currentHB64 = headerB64;
        const currentPB64 = isTampered ? tamperedPayloadB64 : payloadB64;

        const encoder = new TextEncoder();
        const data = encoder.encode(`${currentHB64}.${currentPB64}`);
        const keyData = encoder.encode(secretKey);
        const key = await crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
        const hashArray = Array.from(new Uint8Array(signatureBuffer));
        const hashString = hashArray.map(b => String.fromCharCode(b)).join("");
        const sB64 = btoa(hashString)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");

        setRecalculatedSignature(sB64);

        setTimeout(() => {
          if (isTampered) {
            setValidationStep("failed");
          } else {
            setValidationStep("success");
          }
        }, 1000);
      } catch (err) {
        setValidationStep("failed");
      }
    }, 800);
  };

  // Toggle hack/tamper state
  const handleToggleTamper = () => {
    if (!isTampered) {
      // Modify payload but keep the signature unchanged
      try {
        const obj = JSON.parse(payloadJson);
        const modifiedObj = {
          ...obj,
          role: "administrador",
          name: "Oli (HACKED)",
          admin: true
        };
        const tamJson = JSON.stringify(modifiedObj, null, 2);
        setTamperedPayloadJson(tamJson);
        setTamperedPayloadB64(toBase64Url(tamJson));
        setIsTampered(true);
        setValidationStep("idle");
      } catch (e) {
        setIsTampered(false);
      }
    } else {
      setIsTampered(false);
      setValidationStep("idle");
    }
  };

  const currentTokenString = isTampered
    ? `${headerB64}.${tamperedPayloadB64}.${signatureB64}`
    : jwtToken;

  return (
    <NoteLayout
      title="Tokens y JWT"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["Autenticación", "JWT", "Seguridad", "Tokens", "API"]}
      previousNote={{
        label: "Operaciones CRUD",
        path: "/Fundamentos/CrudOperaciones"
      }}
    >
      <div className="callout">
        Un <Term id="token">Token</Term> es un objeto digital autónomo que representa la autorización concedida
        a un usuario o dispositivo. En la web moderna, los tokens (especialmente los <Term id="jwt">JWT</Term>) permiten
        verificar la identidad de un cliente en cada petición HTTP sin necesidad de guardar estados o sesiones activas en el servidor.
      </div>

      <h2>¿Qué es un Token? (La Analogía Física)</h2>
      <p>
        Imagina que vas a una discoteca y dejas tu abrigo en el guardarropa. A cambio, te entregan un <strong>ticket numerado (un token)</strong>.
        Este ticket no contiene tu abrigo adentro, pero **representa el derecho** a retirarlo.
      </p>
      <p>
        Cuando quieres recuperar tu abrigo, le muestras el ticket al encargado. Él no te pregunta tu nombre ni verifica tu documento;
        simplemente mira el ticket, confirma su validez y te entrega el abrigo. El ticket es un **token de acceso**.
      </p>
      <p>
        En el software, un **token de acceso** es una cadena de texto (código) que el servidor genera tras una <Term id="autenticacion">autenticación</Term> exitosa. El cliente guarda este código y lo envía en la cabecera
        de cada petición posterior para demostrar que tiene <Term id="autorizacion">autorización</Term>.
      </p>

      <h2>Autenticación vs. Autorización</h2>
      <p>
        Aunque suenan parecido y trabajan juntas, representan dos fases completamente distintas del control de accesos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
            <User size={18} />
            Autenticación (¿Quién eres?)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Es el primer paso. El usuario introduce sus credenciales (como usuario y contraseña) para demostrar que es quien dice ser.
            El servidor verifica los datos en la base de datos.
          </p>
          <div className="text-[10px] bg-pink-500/5 border border-pink-500/10 rounded p-2 text-pink-300/80 font-mono">
            EJEMPLO: Iniciar sesión con email y contraseña, o escanear tu huella digital.
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Shield size={18} />
            Autorización (¿Qué puedes hacer?)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Es el segundo paso. Una vez conocida tu identidad, el sistema verifica tus permisos y roles para determinar
            si tienes permitido realizar una acción o acceder a un recurso.
          </p>
          <div className="text-[10px] bg-cyan-500/5 border border-cyan-500/10 rounded p-2 text-cyan-300/80 font-mono">
            EJEMPLO: Un estudiante puede ver sus notas, pero solo un profesor puede editarlas.
          </div>
        </div>
      </div>

      <h2>La Gran Diferencia: Cookies de Sesión vs. Tokens Autónomos (JWT)</h2>
      <p>
        Tradicionalmente, la web ha utilizado **sesiones con estado (Stateful)** basadas en Cookies. Sin embargo,
        las APIs modernas prefieren **tokens sin estado (Stateless)** como JWT. Veamos cómo se diferencian:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04]">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)]">Característica</th>
              <th className="px-4 py-3 text-left font-bold text-white">Sesión Clásica (Stateful Cookie)</th>
              <th className="px-4 py-3 text-left font-bold text-white">Token Autónomo (Stateless JWT)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Almacenamiento de Estado</td>
              <td className="px-4 py-3 text-white/60">
                **En el Servidor.** Guarda en memoria RAM o Base de Datos cada sesión activa (`Session ID`).
              </td>
              <td className="px-4 py-3 text-white/60">
                **En el Cliente.** El servidor no guarda nada de estado; toda la información viaja dentro del token.
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Consumo de Memoria</td>
              <td className="px-4 py-3 text-white/60">
                Alto. Con millones de usuarios activos, el servidor requiere servidores dedicados de caché (como Redis) para recordar las sesiones.
              </td>
              <td className="px-4 py-3 text-white/60">
                Nulo en el servidor. El servidor solo descifra y verifica la firma criptográfica del token recibido.
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Escalabilidad (Múltiples Servidores)</td>
              <td className="px-4 py-3 text-white/60">
                Compleja. Si tienes 3 servidores, deben compartir la base de datos de sesiones para que el usuario no pierda su login.
              </td>
              <td className="px-4 py-3 text-white/60">
                Excelente. Cualquier servidor puede validar el token de forma independiente usando la misma clave secreta.
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Soporte Multiplataforma</td>
              <td className="px-4 py-3 text-white/60">
                Limitado. Las cookies están diseñadas principalmente para navegadores web y dan dolores de cabeza en apps móviles (iOS/Android).
              </td>
              <td className="px-4 py-3 text-white/60">
                Universal. Al ser solo un String de texto, funciona perfectamente en Web, Móviles, IoT o comunicación entre servidores.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>¿Qué es un JWT?</h2>
      <p>
        Un **JWT (JSON Web Token)** es un estándar abierto (<Term id="jwt">RFC 7519</Term>) que define un formato compacto y seguro
        para enviar información estructurada en <Term id="json">JSON</Term>.
      </p>
      <p>
        Un JWT completo es una única cadena de texto compuesta por tres partes codificadas en <Term id="base64">Base64URL</Term>
        y separadas por puntos (<code>.</code>):
      </p>
      <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-center text-sm md:text-base my-4 leading-loose overflow-x-auto">
        <span className="text-pink-400 font-bold bg-pink-500/10 px-1 py-0.5 rounded" title="Header">Header</span>
        <span className="text-white/60">.</span>
        <span className="text-sky-400 font-bold bg-sky-500/10 px-1 py-0.5 rounded" title="Payload">Payload</span>
        <span className="text-white/60">.</span>
        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded" title="Signature">Signature</span>
      </div>

      <h3>Anatomía Detallada de las Partes de un JWT</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">

        {/* Header */}
        <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            1. Header (Cabecera)
          </div>
          <p className="text-[11px] text-white/60 leading-normal">
            Contiene metadatos sobre el propio token. Normalmente define el algoritmo de encriptación o firma utilizado
            (como HS256 o RS256) y el tipo de token, que siempre es "JWT".
          </p>
          <pre className="m-0 p-2.5 bg-black/40 rounded border border-white/5 text-[10px] font-mono text-pink-300">
            {`{
  "alg": "HS256",
  "typ": "JWT"
}`}
          </pre>
        </div>

        {/* Payload */}
        <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            2. Payload (Carga Útil)
          </div>
          <p className="text-[11px] text-white/60 leading-normal">
            Es el núcleo del token. Contiene los datos del usuario (llamados *claims* o declaraciones). Puedes añadir
            datos estándar (`sub` para ID, `exp` para expiración) o campos personalizados como roles.
          </p>
          <pre className="m-0 p-2.5 bg-black/40 rounded border border-white/5 text-[10px] font-mono text-sky-300">
            {`{
  "sub": "123456",
  "name": "Oli",
  "role": "estudiante"
}`}
          </pre>
        </div>

        {/* Signature */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            3. Signature (Firma)
          </div>
          <p className="text-[11px] text-white/60 leading-normal">
            Es la clave de seguridad. Se calcula tomando el Header en Base64, el Payload en Base64, juntándolos con un punto,
            y pasándolos por un algoritmo criptográfico usando una **clave secreta** que solo el servidor conoce.
          </p>
          <pre className="m-0 p-2.5 bg-black/40 rounded border border-white/5 text-[10.5px] font-mono text-emerald-300">
            {`HMACSHA256(
  base64Url(header) + "." +
  base64Url(payload),
  secreto_del_servidor
)`}
          </pre>
        </div>
      </div>

      <div className="callout text-xs">
        ⚠️ <strong>¡IMPORTANTE!</strong> Las secciones Header y Payload **NO están encriptadas**, solo están codificadas en
        Base64URL. Esto significa que **cualquiera puede decodificarlas** y leer los datos simplemente usando una herramienta online.
        Por ello, **NUNCA debes guardar contraseñas, claves ni datos altamente sensibles dentro del Payload de un JWT.**
      </div>

      <h2>Playground Interactivo de JWT</h2>
      <p>
        Edita el **Header**, el **Payload** o la **Clave Secreta** y observa cómo el token final se genera instantáneamente.
        Haz clic en cada parte coloreada del token para resaltar la caja correspondiente.
      </p>

      {/* Playground Card Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 backdrop-blur-md overflow-hidden shadow-2xl my-6 flex flex-col">

        {/* Card Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="text-pink-500 w-5 h-5" />
            <h3 className="font-bold text-white text-sm md:text-base font-sans m-0">Consola de Generación Criptográfica JWT</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
            Algoritmo: HMAC-SHA256
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row min-h-[500px] w-full">

          {/* Column 1: JSON Editor Panels (50% width) */}
          <div className="w-full lg:w-[50%] p-5 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col gap-4 bg-black/10">

            {/* Header Editor */}
            <div
              className={`flex flex-col gap-1.5 transition-all duration-200 p-2.5 rounded-xl border ${activePart === 'header'
                ? 'border-pink-500 bg-pink-500/[0.03]'
                : 'border-white/5 bg-transparent'
                }`}
              onMouseEnter={() => setActivePart('header')}
              onMouseLeave={() => setActivePart(null)}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  Header (JSON)
                </span>
                {!isValidJson(headerJson) && (
                  <span className="text-[9px] text-rose-400 font-bold">JSON Inválido</span>
                )}
              </div>
              <textarea
                value={headerJson}
                onChange={(e) => setHeaderJson(e.target.value)}
                rows={3}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 font-mono text-xs text-pink-200 focus:outline-none focus:border-pink-500 resize-none leading-relaxed"
                placeholder="Header JSON"
              />
            </div>

            {/* Payload Editor */}
            <div
              className={`flex flex-col gap-1.5 transition-all duration-200 p-2.5 rounded-xl border ${activePart === 'payload'
                ? 'border-sky-500 bg-sky-500/[0.03]'
                : 'border-white/5 bg-transparent'
                }`}
              onMouseEnter={() => setActivePart('payload')}
              onMouseLeave={() => setActivePart(null)}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Payload (JSON / Claims)
                </span>
                {!isValidJson(payloadJson) && (
                  <span className="text-[9px] text-rose-400 font-bold">JSON Inválido</span>
                )}
              </div>
              <textarea
                value={payloadJson}
                onChange={(e) => setPayloadJson(e.target.value)}
                rows={7}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 font-mono text-xs text-sky-200 focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
                placeholder="Payload JSON"
              />
            </div>

            {/* Secret Key Input */}
            <div
              className={`flex flex-col gap-1.5 transition-all duration-200 p-2.5 rounded-xl border ${activePart === 'signature'
                ? 'border-emerald-500 bg-emerald-500/[0.03]'
                : 'border-white/5 bg-transparent'
                }`}
              onMouseEnter={() => setActivePart('signature')}
              onMouseLeave={() => setActivePart(null)}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Clave Secreta del Servidor (HMAC Key)
                </span>
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-white/40 hover:text-white transition-colors p-0.5 cursor-pointer"
                >
                  {showSecret ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
              <input
                type={showSecret ? "text" : "password"}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-2 font-mono text-xs text-emerald-200 focus:outline-none focus:border-emerald-500"
                placeholder="Escribe el secreto de firma..."
              />
            </div>

          </div>

          {/* Column 2: Encoded Token & Tampering Simulation (50% width) */}
          <div className="flex-1 p-5 flex flex-col justify-between bg-black/20 gap-5">

            {/* Encoded JWT Output */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/40 block">
                Token JWT Codificado y Firmado (Base64URL)
              </span>

              <div className="border border-white/10 rounded-xl bg-neutral-900 overflow-hidden shadow-inner flex flex-col">
                {/* Main encoded string displaying colors */}
                <div className="p-4 font-mono text-xs md:text-sm break-all leading-loose bg-black/40 min-h-[90px] select-all">
                  <span
                    className={`transition-all duration-200 rounded px-0.5 ${activePart === 'header' ? 'bg-pink-500/30 text-pink-300 font-bold' : 'text-pink-400'
                      }`}
                    onMouseEnter={() => setActivePart('header')}
                    onMouseLeave={() => setActivePart(null)}
                  >
                    {headerB64}
                  </span>
                  <span className="text-white/40 font-normal">.</span>
                  <span
                    className={`transition-all duration-200 rounded px-0.5 ${activePart === 'payload' ? 'bg-sky-500/30 text-sky-300 font-bold' : 'text-sky-400'
                      }`}
                    onMouseEnter={() => setActivePart('payload')}
                    onMouseLeave={() => setActivePart(null)}
                  >
                    {isTampered ? tamperedPayloadB64 : payloadB64}
                  </span>
                  <span className="text-white/40 font-normal">.</span>
                  <span
                    className={`transition-all duration-200 rounded px-0.5 ${activePart === 'signature' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-emerald-400'
                      }`}
                    onMouseEnter={() => setActivePart('signature')}
                    onMouseLeave={() => setActivePart(null)}
                  >
                    {signatureB64}
                  </span>
                </div>

                {/* Footer labels */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.02] border-t border-white/5 text-[9px] text-white/30 font-semibold tracking-wider uppercase">
                  <span>Rojo: Cabecera</span>
                  <span>Azul: Payload</span>
                  <span>Verde: Firma</span>
                </div>
              </div>
            </div>

            {/* Tampering & Validation Simulator */}
            <div className="border border-white/5 rounded-xl bg-white/[0.01] p-4 flex flex-col gap-3 relative">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-white/40 flex items-center gap-1.5">
                  <Server size={13} />
                  Servidor: Simulación de Verificación
                </span>

                <button
                  onClick={handleToggleTamper}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${isTampered
                    ? "bg-rose-500/25 border-rose-500 text-rose-300"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    }`}
                >
                  <AlertTriangle size={13} />
                  {isTampered ? "Quitar Alteración" : "Simular Alterar Datos (Hackear)"}
                </button>
              </div>

              {/* Warning info context */}
              {isTampered ? (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg leading-relaxed">
                  <strong>⚠️ Token Alterado:</strong> Has modificado el Payload en el cliente (el rol pasó de <code>"estudiante"</code> a <code>"administrador"</code>), pero <strong>no has actualizado la firma</strong> (ya que no conoces la clave secreta del servidor). Veamos si el servidor se da cuenta.
                </div>
              ) : (
                <p className="text-xs text-white/60 m-0 leading-normal">
                  Cuando el cliente envía este JWT en sus peticiones HTTP, el servidor comprueba la firma matemática para verificar que no haya sido alterado en el camino.
                </p>
              )}

              {/* Authorization Header mock */}
              <div className="flex items-center gap-2 bg-neutral-900 border border-white/5 rounded-lg p-2.5 text-xs font-mono">
                <span className="text-white/40 uppercase tracking-widest text-[9px] shrink-0 font-sans font-bold">Cabecera HTTP:</span>
                <span className="text-sky-300 truncate">
                  Authorization: <span className="text-pink-400">Bearer</span> {currentTokenString.substring(0, 30)}...
                </span>
              </div>

              {/* Trigger Verify */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleVerify}
                  disabled={validationStep === "decoding" || validationStep === "checking_signature"}
                  className="cursor-pointer flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  <RefreshCw size={13} className={validationStep === "decoding" || validationStep === "checking_signature" ? "animate-spin" : ""} />
                  Verificar Token en el Servidor
                </button>

                {/* Visual Status Result */}
                <div className="flex-1 text-right">
                  {validationStep === "success" && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold font-sans">
                      <CheckCircle size={14} />
                      ¡Firma Válida! Acceso Autorizado
                    </span>
                  )}
                  {validationStep === "failed" && (
                    <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-bold font-sans">
                      <ShieldAlert size={14} />
                      Acceso Denegado: Firma Inválida
                    </span>
                  )}
                </div>
              </div>

              {/* Step-by-step validator logic details */}
              {validationStep !== "idle" && (
                <div className="mt-2.5 p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono leading-relaxed space-y-1.5 text-white/70">
                  <div className="flex items-center justify-between">
                    <span>1. Extrayendo Header y Payload...</span>
                    <span className="text-emerald-400">OK</span>
                  </div>

                  {(validationStep === "checking_signature" || validationStep === "success" || validationStep === "failed") && (
                    <div className="flex flex-col gap-1 border-t border-white/5 pt-1.5">
                      <div className="flex items-center justify-between">
                        <span>2. Recalculando Firma en el Servidor...</span>
                        <span className="text-emerald-400">Hecho</span>
                      </div>
                      <div className="text-[10px] text-white/40 pl-3">
                        Fórmula: HMAC(HeaderB64 + "." + PayloadB64, secreto_servidor)
                      </div>
                      <div className="text-[10px] text-white/40 pl-3 break-all">
                        Firma Recalculada: <span className="text-emerald-300">{recalculatedSignature || "Calculando..."}</span>
                      </div>
                    </div>
                  )}

                  {(validationStep === "success" || validationStep === "failed") && (
                    <div className="flex flex-col gap-1 border-t border-white/5 pt-1.5">
                      <div className="flex items-center justify-between">
                        <span>3. Comparando Firmas Recibida vs. Recalculada...</span>
                        <span className={validationStep === "success" ? "text-emerald-400" : "text-rose-400 font-bold"}>
                          {validationStep === "success" ? "Coinciden" : "¡No Coinciden!"}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/40 pl-3 break-all">
                        Firma Recibida: <span className="text-pink-300">{signatureB64}</span>
                      </div>
                      {validationStep === "failed" && (
                        <div className="mt-1 text-[10px] p-2 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded leading-normal">
                          <strong>Firma del Servidor:</strong> El hash calculado en base al payload alterado no coincide con la firma que traía el token. El servidor sabe que alguien (el cliente) modificó los datos de forma fraudulenta. ¡Acceso denegado!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <h2>Buenas Prácticas de Seguridad en el uso de JWT</h2>
      <p>
        Para utilizar JSON Web Tokens de forma profesional en producción, debes seguir ciertos estándares de seguridad:
      </p>
      <ul>
        <li>
          <strong>Expiración Corta (exp):</strong> Los tokens no deben ser eternos. Asigna un tiempo de expiración corto (ej: 15 minutos).
          Para que el usuario no deba re-autenticarse a cada rato, utiliza **Refresh Tokens** que se guardan de forma segura y sirven para obtener nuevos tokens de acceso automáticamente.
        </li>
        <li>
          <strong>No almacenes datos confidenciales:</strong> Recuerda que el Header y el Payload son legibles por cualquier persona.
          Nunca guardes contraseñas, números de tarjeta de crédito o información personal confidencial en el payload.
        </li>
        <li>
          <strong>Usa HTTPS siempre:</strong> Al viajar en las cabeceras HTTP, si la conexión no está cifrada mediante HTTPS, un atacante en la misma red Wi-Fi podría interceptar el token (ataque Man-in-the-Middle) y suplantar al usuario.
        </li>
        <li>
          <strong>Almacenamiento seguro:</strong>
          <ul>
            <li><code>LocalStorage / SessionStorage:</code> Son fáciles de usar en Javascript, pero vulnerables a ataques <strong>XSS (Cross-Site Scripting)</strong>. Si un atacante inyecta un script malicioso en tu web, podrá leer los tokens guardados allí de inmediato.</li>
            <li><code>Cookies con HttpOnly y Secure:</code> (Recomendado) Almacenar el token en una cookie configurada como <code>HttpOnly</code> impide que Javascript pueda acceder a ella, protegiéndola contra robo por XSS. La opción <code>Secure</code> garantiza que solo viaje sobre conexiones seguras HTTPS.</li>
          </ul>
        </li>
      </ul>
    </NoteLayout>
  );
}
