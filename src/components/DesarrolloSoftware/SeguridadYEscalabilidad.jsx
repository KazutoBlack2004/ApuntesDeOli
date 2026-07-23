import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import {
  ShieldAlert,
  ShieldCheck,
  Copy,
  Check,
  Info,
  ExternalLink,
  Database,
  Lock,
  Globe
} from "lucide-react";

const SECURITY_TOPICS = {
  connection_pooling: {
    title: "Connection Pooling",
    termId: "connection_pooling",
    icon: Database,
    problem: "Las IAs suelen codificar conexiones únicas abriéndose y cerrándose por cada petición. Si miles de usuarios entran a la vez, la base de datos supera el límite de procesos activos y colapsa (HTTP 500 / Too many connections).",
    solution: "Usar un 'Pool' de conexiones. Mantiene un grupo de conexiones activas persistentes que se prestan y devuelven dinámicamente, multiplicando por 100 la capacidad de tráfico.",
    aiPrompt: "Configura el backend utilizando un Pool de conexiones (Connection Pool) reutilizable. Asegúrate de configurar límites máximos de conexiones simultáneas y de liberar la conexión del cliente de vuelta al pool tras completar la query.",
    badCode: `// [INSEGURO] CÓDIGO VULNERABLE (Típico de IA)
const { Client } = require('pg');

app.get('/api/users', async (req, res) => {
  // Abre una nueva conexión física por cada petición HTTP
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  
  const result = await client.query('SELECT * FROM users');
  res.json(result.rows);
  
  // Si la query falla arriba, esta línea nunca se ejecuta
  // y la conexión se queda colgada para siempre
  await client.end(); 
});`,
    goodCode: `//  CÓDIGO SEGURO (Producción)
const { Pool } = require('pg');

// Se inicializa una sola vez a nivel global del servidor
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Límite máximo de conexiones concurrentes
  idleTimeoutMillis: 30000
});

app.get('/api/users', async (req, res) => {
  let client;
  try {
    // Pide prestada una conexión libre del pool
    client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  } finally {
    // Garantiza que la conexión se libere de vuelta al pool
    if (client) client.release();
  }
});`
  },
  env_variables: {
    title: "Variables de Entorno",
    termId: "env_variables",
    icon: Lock,
    problem: "Las IAs escriben las credenciales y tokens directamente en el código fuente. Al subir el código a repositorios públicos como GitHub, bots automáticos roban las credenciales en segundos, resultando en robos de bases de datos o facturas millonarias de APIs.",
    solution: "Extraer todos los secretos a un archivo `.env` local, agregarlo al `.gitignore`, y consumir las variables a través del objeto global de entorno del sistema operativo.",
    aiPrompt: "No expongas credenciales o llaves de API de forma hardcodeada. Extrae todos los secretos a variables de entorno consumidas a través de process.env, y crea un archivo .env.example limpio con las claves vacías.",
    badCode: `// [INSEGURO] CÓDIGO VULNERABLE (Típico de IA)
const express = require('express');
const stripe = require('stripe')('sk_live_51N8x...LlavePrivadaSecretaDeStripe');

const dbUri = "mongodb+srv://admin:PasswordSuperSecreta123@cluster0.mongodb.net/prod";

// Configuración expuesta directamente en archivos de control de versiones`,
    goodCode: `//  CÓDIGO SEGURO (Producción)
require('dotenv').config(); // Carga las variables del archivo .env
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const dbUri = process.env.DATABASE_URL;

// En .gitignore:
// .env

// En .env.example (público para otros programadores):
// STRIPE_SECRET_KEY=
// DATABASE_URL=`
  },
  sql_injection: {
    title: "Validación e Inyección",
    termId: "sql_injection",
    icon: ShieldAlert,
    problem: "La IA concatena variables del usuario directamente en la query SQL. Un atacante puede mandar un valor como \`1; DROP TABLE users;\` alterando la query e interceptando o borrando toda la base de datos.",
    solution: "Usar Consultas Preparadas (Prepared Statements) donde los valores del usuario se tratan de forma aislada como strings inertes, y validar el esquema de datos con librerías como Zod.",
    aiPrompt: "Para prevenir inyecciones SQL, usa consultas preparadas parametrizadas en todas las queries de la base de datos. Valida la estructura y tipo de los inputs con un esquema de Zod antes de procesar cualquier dato.",
    badCode: `// [INSEGURO] CÓDIGO VULNERABLE (Típico de IA)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Concatenación directa: vulnerabilidad a Inyección SQL (SQLi)
  const query = \`SELECT * FROM users WHERE email = '\${email}' AND password = '\${password}'\`;
  const result = await db.query(query);
  
  res.json(result.rows);
});`,
    goodCode: `//  CÓDIGO SEGURO (Producción)
const { z } = require('zod');

// Schema de validación estricta de tipos e inputs
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

app.post('/api/login', async (req, res) => {
  try {
    // 1. Valida y sanitiza los datos de entrada
    const { email, password } = loginSchema.parse(req.body);
    
    // 2. Consulta parametrizada ($1, $2 actúan como marcadores inertes)
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await db.query(query, [email, password]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: 'Datos de entrada inválidos' });
  }
});`
  },
  rls: {
    title: "Reglas de Base de Datos / RLS",
    termId: "rls",
    icon: ShieldCheck,
    problem: "Para prototipos rápidos, las IAs sugieren deshabilitar las reglas de seguridad de bases de datos serverless (Firebase, Supabase) o habilitar lectura/escritura pública general. Si el vicoder lo despliega así, cualquiera puede borrar las tablas enviando comandos desde el cliente.",
    solution: "Activar RLS (Row Level Security) en PostgreSQL o configurar reglas IAM en Firestore. La base de datos debe validar de forma independiente el token de autenticación del usuario antes de devolver registros.",
    aiPrompt: "Escribe una política de seguridad a nivel de fila (RLS / Row Level Security) para PostgreSQL/Supabase que permita leer/escribir registros en la tabla únicamente si el ID del usuario coincide con el ID de su sesión autenticada (auth.uid()).",
    badCode: `// [INSEGURO] CONFIGURACIÓN VULNERABLE (Típico de IA)
-- Habilitar acceso general en Supabase sin RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- O reglas de Firebase Database abiertas:
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
-- Cualquier persona en el mundo puede leer y borrar todo`,
    goodCode: `//  CONFIGURACIÓN SEGURA (Producción)
-- 1. Forzar seguridad a nivel de fila (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Crear política estricta de vinculación de ID
CREATE POLICY "Usuarios pueden modificar solo su propio perfil" 
ON profiles 
FOR ALL 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Solo el usuario autenticado que posee la fila puede operar en ella`
  },
  rate_limiting: {
    title: "Rate Limiting",
    termId: "rate_limiting",
    icon: Globe,
    problem: "La IA no limita cuántas veces un usuario puede llamar a un endpoint. Un atacante puede programar un bucle infinito que llame a una ruta pesada (ej: una que invoque OpenAI API a costo del servidor) o realizar ataques de fuerza bruta para adivinar contraseñas.",
    solution: "Implementar un middleware de Rate Limiting que rastree la dirección IP del cliente y bloquee peticiones excesivas (ej: máximo 100 peticiones cada 15 minutos).",
    aiPrompt: "Añade un middleware de limitación de tasa (rate limiting) para evitar abusos y ataques de fuerza bruta. Limita los endpoints críticos de la API a un máximo de 50 peticiones por ventana de 15 minutos por dirección IP.",
    badCode: `// [INSEGURO] CÓDIGO VULNERABLE (Típico de IA)
app.post('/api/ask-ai', async (req, res) => {
  const { question } = req.body;
  
  // Endpoint expuesto a que un bot mande 50,000 requests por minuto
  // causando denegación de servicio (DoS) y facturas de hosting masivas
  const response = await openAI.createCompletion({ prompt: question });
  res.json(response.data);
});`,
    goodCode: `//  CÓDIGO SEGURO (Producción)
const rateLimit = require('express-rate-limit');

// Definir regla de limitación de tasa
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 50, // Límite de 50 peticiones por IP
  message: { error: 'Demasiadas solicitudes. Inténtalo más tarde.' },
  standardHeaders: true, // Devuelve headers RateLimit-*
  legacyHeaders: false,
});

// Aplicar middleware únicamente a la ruta crítica/costosa
app.post('/api/ask-ai', aiLimiter, async (req, res) => {
  const { question } = req.body;
  const response = await openAI.createCompletion({ prompt: question });
  res.json(response.data);
});`
  }
};

export default function SeguridadYEscalabilidad() {
  const [activeTab, setActiveTab] = useState("connection_pooling");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const topicData = SECURITY_TOPICS[activeTab];
  const TopicIcon = topicData.icon;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(topicData.aiPrompt).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  return (
    <NoteLayout
      title="Seguridad y Escalabilidad en Producción"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Seguridad", "Escalabilidad", "Variables de Entorno", "Pool de Conexiones", "Rate Limit", "OWASP"]}
      previousNote={{ label: "Convenciones de Nombres", path: "/DesarrolloSoftware/ConvencionesNombres" }}
      nextNote={{ label: "Testing de Software", path: "/DesarrolloSoftware/Testing" }}
    >
      <div className="callout">
        Muchos <strong>Vicoders</strong> o desarrolladores noveles utilizan inteligencia artificial para crear
        páginas web y aplicaciones SaaS (Software as a Service) funcionales. Sin embargo, por defecto, las IAs escriben
        código optimizado para un **único usuario concurrente**. Al desplegar a producción con miles de usuarios, estas aplicaciones
        suelen colapsar o sufrir brechas de seguridad críticas.
      </div>

      <h2>Los 5 Errores Fatales al Pasar a Producción</h2>
      <p>
        Para evitar hackeos y caídas de servicio, debes auditar tu código generado por IA en los siguientes pilares.
        Haz clic en cada pestaña para ver la diferencia de código y el **Prompt de Seguridad** que debes darle a tu agente para solucionarlo:
      </p>

      {/* Simulator Playground */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">

        {/* Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TopicIcon className="text-pink-500 w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-white text-sm md:text-base font-sans m-0">Auditoría: {topicData.title}</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono font-bold">
            Simulador de Vulnerabilidades
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.entries(SECURITY_TOPICS).map(([key, value]) => {
            const isActive = activeTab === key;
            const IconComponent = value.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setCopiedPrompt(false);
                }}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 flex items-center gap-2 ${isActive
                    ? "border-pink-500 bg-white/[0.02] text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                  }`}
              >
                <IconComponent size={12} />
                {value.title}
              </button>
            );
          })}
        </div>

        {/* Main Panel Content */}
        <div className="p-5 bg-neutral-950">

          {/* Explanation Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 text-xs">
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">El Riesgo</span>
              <p className="text-white/75 m-0 leading-relaxed">{topicData.problem}</p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">La Solución</span>
              <p className="text-white/75 m-0 leading-relaxed">{topicData.solution}</p>
            </div>
          </div>

          {/* Code Comparison (Flex Column on Mobile, Row on Large Screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Bad Code */}
            <div>
              <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest block mb-2">Código Inseguro (IA Típica)</span>
              <pre className="m-0 p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-[10.5px] font-mono text-rose-200/90 overflow-x-auto leading-relaxed h-[240px]">
                {topicData.badCode}
              </pre>
            </div>

            {/* Good Code */}
            <div>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">Código Seguro (Listo para Producción)</span>
              <pre className="m-0 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-[10.5px] font-mono text-emerald-200/90 overflow-x-auto leading-relaxed h-[240px]">
                {topicData.goodCode}
              </pre>
            </div>

          </div>

          {/* AI Prompting Guardrail */}
          <div className="relative mt-5 p-4 rounded-xl border border-pink-500/15 bg-pink-500/[0.03]">
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-wider block mb-1.5">
              Prompt de Seguridad para ordenar a tu Agente de IA:
            </span>
            <p className="text-[11.5px] text-white/80 leading-relaxed m-0 pr-12">
              "{topicData.aiPrompt}"
            </p>
            <button
              onClick={handleCopyPrompt}
              className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 cursor-pointer transition-all"
              title="Copiar prompt de seguridad"
            >
              {copiedPrompt ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>

        </div>

      </div>

      <h2>Consejos de Seguridad para Prototipos de IA</h2>
      <p>
        Cuando desarrollas de la mano con un copiloto de código, los desarrolladores visuales deben seguir este
        checklist mental antes de publicar su SaaS a internet:
      </p>
      <ul>
        <li>
          <strong>Nunca uses llaves de test de producción:</strong> Configura cuentas de prueba separadas (sandbox) para APIs como Stripe, Firebase o servicios de emails.
        </li>
        <li>
          <strong>Habilita HTTPS:</strong> Toda transferencia de datos (especialmente tokens <Term id="jwt">JWT</Term>) debe ir cifrada mediante SSL/TLS. Nunca permitas login en HTTP plano.
        </li>
        <li>
          <strong>Sanitiza las Respuestas del Servidor:</strong> No devuelvas objetos de base de datos crudos (ej: no hagas <code>res.json(user)</code> directamente si el objeto contiene el campo <code>password_hash</code>). Modela explícitamente lo que envías al cliente.
        </li>
        <li>
          <strong>Configura alertas de consumo:</strong> Pon topes de facturación mensuales en AWS, OpenAI, Firebase y servicios pagados por uso para que el hosting se apague antes de acumular deudas inesperadas por bucles o ataques.
        </li>
      </ul>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Regla de oro:</strong> Una IA siempre elegirá el camino más rápido para hacer que la demo funcione. Como desarrollador, tu labor es cuestionar el código de la IA y exigirle explicitamente el uso de variables de entorno, pools de conexión y esquemas de validación de datos.
        </p>
      </div>
    </NoteLayout>
  );
}
