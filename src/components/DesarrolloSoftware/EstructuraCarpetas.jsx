import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  Layout, 
  Server, 
  ArrowRight,
  Info,
  ChevronRight,
  Database,
  Lock,
  Compass
} from "lucide-react";

const FRONTEND_TREE = {
  id: "front",
  label: "frontend/",
  isFolder: true,
  children: [
    {
      id: "front_src",
      label: "src/",
      isFolder: true,
      children: [
        {
          id: "front_api",
          label: "api/",
          isFolder: true,
          description: "Manejo de llamadas de red. Centraliza todas las peticiones HTTP (fetch o axios) hacia servicios externos o tu propio backend.",
          fileExample: "api/users.js",
          codeExample: `import axios from 'axios';

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(\`/api/users/\${userId}\`);
  return response.data;
};`
        },
        {
          id: "front_assets",
          label: "assets/",
          isFolder: true,
          description: "Recursos estáticos requeridos por el código. Contiene imágenes, iconos (SVGs), logotipos, fuentes de texto y archivos multimedia locales.",
          fileExample: "assets/images/logo.svg",
          codeExample: `import React from 'react';
import logo from '../assets/images/logo.svg';

export default function Logo() {
  return <img src={logo} alt="Logotipo" className="h-8 w-auto" />;
}`
        },
        {
          id: "front_components",
          label: "components/",
          isFolder: true,
          description: "Bloques de interfaz reutilizables. Comúnmente divididos en ui/ (botones, modales puros) y layout/ (cabeceras, barras laterales).",
          fileExample: "components/ui/Button.jsx",
          codeExample: `import React from 'react';

export default function Button({ children, onClick, variant = 'primary' }) {
  const styles = variant === 'primary' 
    ? 'bg-pink-500 text-white font-bold' 
    : 'border border-white/10 text-white/80';

  return (
    <button onClick={onClick} className={\`px-4 py-2 rounded-lg \${styles}\`}>
      {children}
    </button>
  );
}`
        },
        {
          id: "front_context",
          label: "context/",
          isFolder: true,
          description: "Manejadores de estado global ligero. Almacena contextos de React para datos compartidos sencillos como el tema o el idioma.",
          fileExample: "context/AuthContext.jsx",
          codeExample: `import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}`
        },
        {
          id: "front_data",
          label: "data/",
          isFolder: true,
          description: "Datos locales estáticos y estables. Útil para mock-data, listas de navegación fijos o diccionarios.",
          fileExample: "data/navigation.js",
          codeExample: `export const sidebarLinks = [
  { id: 'dashboard', label: 'Inicio', path: '/dashboard' },
  { id: 'settings', label: 'Ajustes', path: '/settings' }
];`
        },
        {
          id: "front_hooks",
          label: "hooks/",
          isFolder: true,
          description: "Custom Hooks de React. Aislan la lógica y ciclos de vida del estado para mantener los componentes visuales limpios.",
          fileExample: "hooks/useLocalStorage.js",
          codeExample: `import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`
        },
        {
          id: "front_pages",
          label: "pages/",
          isFolder: true,
          description: "Contenedor de pantallas completas o rutas. En frameworks modernos como Astro o Next.js, define el enrutamiento de la app.",
          fileExample: "pages/dashboard/index.jsx",
          codeExample: `import React from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1>Bienvenido a tu panel de control</h1>
    </AppLayout>
  );
}`
        },
        {
          id: "front_redux",
          label: "redux/",
          isFolder: true,
          description: "Configuración del estado global complejo con Redux. Contiene el store principal, los reducers, acciones y slices de Redux Toolkit.",
          fileExample: "redux/store.js",
          codeExample: `import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});`
        },
        {
          id: "front_styles",
          label: "styles/",
          isFolder: true,
          description: "Archivos de diseño y hojas de estilo globales. Incluye archivos CSS/SCSS principales, temas, configuraciones y variables de estilos.",
          fileExample: "styles/global.css",
          codeExample: `@theme {
  --color-primary: #ec4899;
  --color-brand-dark: #0a0a0a;
}

body {
  background-color: var(--color-brand-dark);
  color: white;
  font-family: 'Inter', sans-serif;
}`
        },
        {
          id: "front_types",
          label: "types/",
          isFolder: true,
          description: "Definición de interfaces, tipos personalizados y tipos de datos de TypeScript para el tipado estático en el frontend.",
          fileExample: "types/index.ts",
          codeExample: `export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
}`
        },
        {
          id: "front_utils",
          label: "utils/",
          isFolder: true,
          description: "Funciones utilitarias puras de JavaScript que no dependen del ciclo de vida de React (ej: formateadores).",
          fileExample: "utils/format.js",
          codeExample: `export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value);
};`
        }
      ]
    }
  ]
};

const BACKEND_TREE = {
  id: "back",
  label: "backend/",
  isFolder: true,
  children: [
    {
      id: "back_src",
      label: "src/",
      isFolder: true,
      children: [
        {
          id: "back_config",
          label: "config/",
          isFolder: true,
          description: "Variables de configuración e inicializadores del sistema. Conexiones a bases de datos y validaciones de entorno.",
          fileExample: "config/database.js",
          codeExample: `const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Connection pooling configurado
  idleTimeoutMillis: 30000
});

module.exports = pool;`
        },
        {
          id: "back_controllers",
          label: "controllers/",
          isFolder: true,
          description: "Manejadores HTTP. Reciben los parámetros del cliente (req, res), llaman a los servicios y retornan las respuestas HTTP.",
          fileExample: "controllers/userController.js",
          codeExample: `const userService = require('../services/userService');

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile };`
        },
        {
          id: "back_db",
          label: "db/",
          isFolder: true,
          description: "Estructuras de bases de datos. Contiene scripts de migraciones, semillas (seeds) de prueba y esquemas de inicialización.",
          fileExample: "db/migrations/20260723_users.js",
          codeExample: `exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.timestamps(true, true);
  });
};`
        },
        {
          id: "back_middleware",
          label: "middleware/",
          isFolder: true,
          description: "Filtros intermedios de peticiones. Usado para validar tokens JWT, control de rate limiting o cors.",
          fileExample: "middleware/auth.js",
          codeExample: `const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.sub;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token invalido' });
  }
};`
        },
        {
          id: "back_models",
          label: "models/",
          isFolder: true,
          description: "Esquemas de bases de datos y definiciones ORM. Mapea las tablas de la base de datos a objetos de código.",
          fileExample: "models/User.js",
          codeExample: `const pool = require('../config/database');

const findById = async (id) => {
  const result = await pool.query(
    'SELECT id, email, created_at FROM users WHERE id = $1', 
    [id]
  );
  return result.rows[0];
};

module.exports = { findById };`
        },
        {
          id: "back_routes",
          label: "routes/",
          isFolder: true,
          description: "Definiciones de los endpoints HTTP. Mapea la ruta URL con los middlewares de seguridad y el controlador final.",
          fileExample: "routes/userRoutes.js",
          codeExample: `const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;`
        },
        {
          id: "back_services",
          label: "services/",
          isFolder: true,
          description: "Capa de lógica de negocio pura. Contiene cálculos de negocio e interacciones complejas independientes del protocolo HTTP.",
          fileExample: "services/userService.js",
          codeExample: `const userModel = require('../models/User');

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

module.exports = { getUserById };`
        },
        {
          id: "back_tests",
          label: "tests/",
          isFolder: true,
          description: "Pruebas automatizadas del sistema. Contiene pruebas unitarias, pruebas de integración y archivos de mock.",
          fileExample: "tests/user.test.js",
          codeExample: `const request = require('supertest');
const app = require('../app');

describe('User Endpoint', () => {
  it('should deny profile access without JWT', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.statusCode).toEqual(401);
  });
});`
        },
        {
          id: "back_utils",
          label: "utils/",
          isFolder: true,
          description: "Funciones utilitarias y asistentes (helpers) de lógica común para el servidor (criptografía, formateo, envío de emails).",
          fileExample: "utils/hash.js",
          codeExample: `const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { hashPassword };`
        }
      ]
    }
  ]
};

export default function EstructuraCarpetas() {
  const [selectedNode, setSelectedNode] = useState("front_hooks");
  const [activeStack, setActiveStack] = useState("front"); // 'front' or 'back'

  const searchNode = (node, id) => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = searchNode(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentNode = searchNode(activeStack === "front" ? FRONTEND_TREE : BACKEND_TREE, selectedNode) 
    || searchNode(FRONTEND_TREE, "front_hooks");

  const renderTree = (node, depth = 0) => {
    const isSelected = selectedNode === node.id;
    const isInteroperable = node.description;

    return (
      <div key={node.id} style={{ paddingLeft: `${depth * 12}px` }} className="flex flex-col">
        <button
          onClick={() => {
            if (isInteroperable) {
              setSelectedNode(node.id);
            }
          }}
          disabled={!isInteroperable}
          className={`flex items-center gap-2 py-1 px-2 rounded-lg text-left text-xs font-mono transition-all border border-transparent w-full ${
            isInteroperable 
              ? "cursor-pointer text-white hover:bg-white/5" 
              : "text-white/40 cursor-default"
          } ${
            isSelected 
              ? "bg-pink-500/10 border-pink-500/20 text-pink-300 font-bold" 
              : ""
          }`}
        >
          {node.isFolder ? (
            <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-pink-400" : "text-sky-400"}`} />
          ) : (
            <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span>{node.label}</span>
          {isInteroperable && (
            <ChevronRight size={10} className="ml-auto text-white/30" />
          )}
        </button>
        {node.children && node.children.map(child => renderTree(child, depth + 1))}
      </div>
    );
  };

  return (
    <NoteLayout
      title="Organización y Estructura de Carpetas"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Estructura", "Carpetas", "Frontend", "Backend", "Buenas Prácticas", "Arquitectura"]}
      previousNote={{ label: "Frameworks y Librerías", path: "/DesarrolloSoftware/FrameworksYLibrerias" }}
      nextNote={{ label: "SEO para Desarrollo Web", path: "/DesarrolloSoftware/SEO" }}
    >
      <div className="callout">
        Una <strong>Estructura de Carpetas Predecible</strong> es fundamental para el desarrollo sostenible. 
        Permite que cualquier desarrollador (o tu agente de IA) localice o inserte nuevos componentes, 
        servicios y configuraciones de forma lógica y sin cruzar responsabilidades de código.
      </div>

      <h2>La Separación de Responsabilidades (SoC)</h2>
      <p>
        El principio de <strong>Separación de Responsabilidades (Separation of Concerns)</strong> dicta que el software 
        debe dividirse en secciones independientes donde cada una resuelva una necesidad específica. 
        En desarrollo web, esto comienza separando el **Frontend** (interfaz de usuario) del **Backend** (lógica de servidor y datos).
      </p>

      <h2>Inspector de Directorios Interactivo</h2>
      <p>
        Haz clic en las pestañas para alternar entre la estructura recomendada para <strong>Frontend</strong> y 
        <strong>Backend</strong>. Explora las carpetas del árbol de archivos y haz clic en ellas para ver su propósito y un ejemplo real de código:
      </p>

      {/* Selector and Workspace Inspector */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* Header toolbar */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="text-pink-500 w-5 h-5 animate-spin-slow" />
            <h3 className="font-bold text-white text-sm m-0">Interactive Directory Tree Inspector</h3>
          </div>
          
          {/* Stack switcher */}
          <div className="flex bg-black/45 p-1 rounded-lg border border-white/5 self-start">
            <button
              onClick={() => {
                setActiveStack("front");
                setSelectedNode("front_hooks");
              }}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer ${
                activeStack === "front" 
                  ? "bg-pink-500 text-white shadow" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Frontend Layout
            </button>
            <button
              onClick={() => {
                setActiveStack("back");
                setSelectedNode("back_controllers");
              }}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer ${
                activeStack === "back" 
                  ? "bg-pink-500 text-white shadow" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Backend Layout (MVC)
            </button>
          </div>
        </div>

        {/* Panel content */}
        <div className="flex flex-col lg:flex-row min-h-[460px] w-full">
          
          {/* Tree Explorer (40% width) */}
          <div className="w-full lg:w-[40%] p-5 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/15 flex flex-col gap-2.5 overflow-y-auto max-h-[380px] lg:max-h-[500px]">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1.5">
              Estructura de Directorios
            </span>
            <div className="space-y-1">
              {activeStack === "front" 
                ? renderTree(FRONTEND_TREE) 
                : renderTree(BACKEND_TREE)
              }
            </div>
          </div>

          {/* Details & Live Code (60% width) */}
          <div className="flex-1 p-6 flex flex-col justify-between bg-black/25 gap-5 min-h-[320px]">
            
            {/* Folder purpose info */}
            {currentNode ? (
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">
                    Carpeta Seleccionada
                  </span>
                  <h4 className="font-extrabold text-white text-base font-mono m-0 flex items-center gap-1.5">
                    <FolderOpen className="text-pink-400 w-4 h-4" />
                    {currentNode.label}
                  </h4>
                </div>
                
                <p className="text-xs text-white/70 leading-relaxed m-0">
                  {currentNode.description}
                </p>

                <div className="p-3.5 rounded-lg bg-neutral-900 border border-white/5">
                  <span className="text-[10px] font-mono text-white/40 block mb-2 uppercase">
                    Estructura típica de archivo: {currentNode.fileExample}
                  </span>
                  <pre className="m-0 p-3 bg-black/50 rounded border border-white/5 text-[10px] font-mono text-emerald-450 overflow-x-auto leading-relaxed max-h-[220px]">
                    {currentNode.codeExample}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center my-auto">
                <Info className="text-white/20 mb-2" size={24} />
                <span className="text-xs text-white/40">Haz clic en una carpeta para inspeccionar su código y uso.</span>
              </div>
            )}

            {/* Note box */}
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg flex gap-2">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px] shrink-0 mt-0.5">Consejo:</span>
              <p className="text-white/75 text-[11px] leading-relaxed m-0">
                Al inicializar un proyecto con IA, asegúrate de indicarle previamente que respete esta distribución. 
                Evitará que mezcle consultas de SQL en los controladores o llamadas directas de fetch dentro de los botones de UI.
              </p>
            </div>

          </div>

        </div>

      </div>

      <h2>Buenas Prácticas en el Nombre de Archivos</h2>
      <p>
        Además de mantener las carpetas organizadas, establecer directrices de nomenclatura para los archivos previene 
        confusiones en importaciones sensibles:
      </p>
      <ul>
        <li>
          <strong>Componentes UI:</strong> Utilizan PascalCase y extensión `.jsx` o `.tsx` (ej: <code>UserProfile.jsx</code>).
        </li>
        <li>
          <strong>Hooks Personalizados:</strong> Utilizan camelCase y comienzan siempre con el prefijo "use" (ej: <code>useAuth.js</code>).
        </li>
        <li>
          <strong>Servicios y Controladores Backend:</strong> Utilizan camelCase y la extensión del rol (ej: <code>userController.js</code> o <code>userRoute.js</code>).
        </li>
      </ul>
    </NoteLayout>
  );
}
