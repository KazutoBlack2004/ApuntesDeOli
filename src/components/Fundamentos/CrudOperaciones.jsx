import React, { useState, useEffect } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Server, 
  Database, 
  RefreshCw, 
  Send, 
  Globe, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  BookOpen
} from "lucide-react";

const INITIAL_DB = [
  { id: 1, titulo: "El Alquimista", autor: "Paulo Coelho", categoria: "Ficción" },
  { id: 2, titulo: "1984", autor: "George Orwell", categoria: "Distopía" }
];

export default function CrudOperaciones() {
  // Database Mock State
  const [db, setDb] = useState(INITIAL_DB);
  
  // Simulator State
  const [activeTab, setActiveTab] = useState("POST"); // POST (Create), GET (Read), PUT (Update), DELETE (Delete)
  const [loading, setLoading] = useState(false);
  const [animationStep, setAnimationStep] = useState(0); // 0: idle, 1: client -> server, 2: server -> db, 3: db updated, 4: server -> client (done)
  const [response, setResponse] = useState(null);
  const [sqlQuery, setSqlQuery] = useState("");

  // Input states for custom testing
  const [newTitle, setNewTitle] = useState("Ficciones");
  const [newAuthor, setNewAuthor] = useState("Jorge Luis Borges");
  const [newCategory, setNewCategory] = useState("Cuento");

  const [editTitle, setEditTitle] = useState("1984 (Edición Especial)");
  const [editAuthor, setEditAuthor] = useState("George Orwell");
  const [editCategory, setEditCategory] = useState("Ciencia Ficción");

  const [deleteId, setDeleteId] = useState(1);

  // Auto-reset response when switching tabs to avoid confusion
  useEffect(() => {
    setResponse(null);
    setAnimationStep(0);
    setLoading(false);

    // Pre-calculate queries for UI representation
    if (activeTab === "POST") {
      setSqlQuery(`INSERT INTO libros (titulo, autor, categoria) \nVALUES ('${newTitle}', '${newAuthor}', '${newCategory}');`);
    } else if (activeTab === "GET") {
      setSqlQuery("SELECT * FROM libros;");
    } else if (activeTab === "PUT") {
      setSqlQuery(`UPDATE libros \nSET titulo = '${editTitle}', autor = '${editAuthor}', categoria = '${editCategory}' \nWHERE id = 2;`);
    } else if (activeTab === "DELETE") {
      setSqlQuery(`DELETE FROM libros \nWHERE id = ${deleteId};`);
    }
  }, [activeTab, newTitle, newAuthor, newCategory, editTitle, editAuthor, editCategory, deleteId]);

  // Handler to run the visual simulation
  const handleSimulate = () => {
    if (loading) return;
    setLoading(true);
    setResponse(null);
    
    // Step 1: Client -> Server
    setAnimationStep(1);
    
    setTimeout(() => {
      // Step 2: Server -> DB
      setAnimationStep(2);
      
      setTimeout(() => {
        // Step 3: DB Updated / Query Executed
        let responsePayload = {};
        let statusText = "200 OK";
        let statusCode = 200;

        if (activeTab === "POST") {
          const newId = db.length > 0 ? Math.max(...db.map(item => item.id)) + 1 : 1;
          const newRecord = { id: newId, titulo: newTitle, autor: newAuthor, categoria: newCategory };
          setDb(prev => [...prev, newRecord]);
          responsePayload = newRecord;
          statusCode = 201;
          statusText = "201 Created";
        } 
        else if (activeTab === "GET") {
          responsePayload = db;
          statusCode = 200;
          statusText = "200 OK";
        } 
        else if (activeTab === "PUT") {
          const exists = db.some(item => item.id === 2);
          if (exists) {
            setDb(prev => prev.map(item => item.id === 2 ? { ...item, titulo: editTitle, autor: editAuthor, categoria: editCategory } : item));
            responsePayload = { id: 2, titulo: editTitle, autor: editAuthor, categoria: editCategory };
            statusCode = 200;
            statusText = "200 OK";
          } else {
            responsePayload = { error: "El libro con ID 2 no existe en la base de datos." };
            statusCode = 404;
            statusText = "404 Not Found";
          }
        } 
        else if (activeTab === "DELETE") {
          const exists = db.some(item => item.id === Number(deleteId));
          if (exists) {
            const deletedItem = db.find(item => item.id === Number(deleteId));
            setDb(prev => prev.filter(item => item.id !== Number(deleteId)));
            responsePayload = { mensaje: "Libro eliminado correctamente", libro: deletedItem };
            statusCode = 200;
            statusText = "200 OK";
          } else {
            responsePayload = { error: `El libro con ID ${deleteId} no existe en la base de datos.` };
            statusCode = 404;
            statusText = "404 Not Found";
          }
        }

        setAnimationStep(3);

        setTimeout(() => {
          // Step 4: Server -> Client Response
          setAnimationStep(4);
          setResponse({
            status: statusCode,
            statusText: statusText,
            headers: {
              "Content-Type": "application/json",
              "Server": "AstroMockServer/2.0",
              "Date": new Date().toUTCString(),
            },
            body: JSON.stringify(responsePayload, null, 2)
          });
          setLoading(false);
        }, 800);

      }, 1000);

    }, 800);
  };

  const handleResetDb = () => {
    setDb(INITIAL_DB);
    setResponse(null);
    setAnimationStep(0);
    setLoading(false);
  };

  return (
    <NoteLayout
      title="Operaciones CRUD"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["CRUD", "HTTP", "REST API", "Bases de Datos"]}
      previousNote={{ label: "¿Qué es NPM?", path: "/Fundamentos/QueEsNPM" }}
    >
      <div className="callout">
        El concepto de <Term id="crud">CRUD</Term> define las cuatro operaciones fundamentales 
        para gestionar la persistencia de datos en cualquier aplicación informática. Representa el ciclo 
        de vida básico de la información en un sistema: <strong>Crear, Leer, Actualizar y Eliminar</strong>.
      </div>

      <h2>¿Qué significa CRUD?</h2>
      <p>
        CRUD es un acrónimo que resume las acciones necesarias para interactuar con datos guardados de forma permanente 
        (por ejemplo, en un disco duro o en una base de datos). A continuación, se desglosa su significado con la analogía 
        de una biblioteca escolar:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent-text)] font-bold text-sm">
              C
            </span>
            <strong className="text-white">Create (Crear)</strong>
          </div>
          <p className="text-sm text-white/60">
            Añadir nuevos registros al sistema de almacenamiento.
            <br />
            <em className="text-xs text-[var(--accent-text)]">Ejemplo de biblioteca:</em> Registrar un libro nuevo que acaba de comprar la biblioteca para el catálogo.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent-text)] font-bold text-sm">
              R
            </span>
            <strong className="text-white">Read / Retrieve (Leer / Recuperar)</strong>
          </div>
          <p className="text-sm text-white/60">
            Consultar la información ya existente para visualizarla o procesarla.
            <br />
            <em className="text-xs text-[var(--accent-text)]">Ejemplo de biblioteca:</em> Buscar un libro en el ordenador para ver en qué estantería está ubicado.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent-text)] font-bold text-sm">
              U
            </span>
            <strong className="text-white">Update (Actualizar)</strong>
          </div>
          <p className="text-sm text-white/60">
            Modificar los valores de registros existentes que han cambiado o que tenían errores.
            <br />
            <em className="text-xs text-[var(--accent-text)]">Ejemplo de biblioteca:</em> Corregir el nombre del autor de un libro porque estaba mal escrito en el sistema.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent-text)] font-bold text-sm">
              D
            </span>
            <strong className="text-white">Delete / Destroy (Eliminar)</strong>
          </div>
          <p className="text-sm text-white/60">
            Remover de forma permanente registros que ya no son necesarios o válidos.
            <br />
            <em className="text-xs text-[var(--accent-text)]">Ejemplo de biblioteca:</em> Dar de baja y borrar del sistema un libro viejo que se ha roto y tirado a la basura.
          </p>
        </div>
      </div>

      <h2>Tabla Comparativa de Equivalencias</h2>
      <p>
        El concepto de CRUD no se limita a un lenguaje de programación específico, sino que se mapea directamente 
        con comandos de bases de datos relacionales (<Term id="subred">SQL</Term>) y con métodos del protocolo <Term id="http">HTTP</Term> en el desarrollo de <Term id="rest">APIs REST</Term>:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04]">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)]">Operación CRUD</th>
              <th className="px-4 py-3 text-left font-bold text-white">Comando SQL</th>
              <th className="px-4 py-3 text-left font-bold text-white">Método HTTP (API REST)</th>
              <th className="px-4 py-3 text-left font-bold text-white">Código de Respuesta Común</th>
              <th className="px-4 py-3 text-left font-bold text-white">Descripción técnica</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Crear (Create)</td>
              <td className="px-4 py-3 font-mono text-cyan-400">INSERT</td>
              <td className="px-4 py-3 font-mono font-bold text-emerald-400">POST</td>
              <td className="px-4 py-3 font-mono">201 Created</td>
              <td className="px-4 py-3 text-white/60">Envía datos nuevos al servidor para crear un recurso.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Leer (Read)</td>
              <td className="px-4 py-3 font-mono text-cyan-400">SELECT</td>
              <td className="px-4 py-3 font-mono font-bold text-sky-400">GET</td>
              <td className="px-4 py-3 font-mono">200 OK</td>
              <td className="px-4 py-3 text-white/60">Recupera o consulta uno o varios recursos existentes del servidor.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Actualizar (Update)</td>
              <td className="px-4 py-3 font-mono text-cyan-400">UPDATE</td>
              <td className="px-4 py-3 font-mono font-bold text-amber-400">PUT / PATCH</td>
              <td className="px-4 py-3 font-mono">200 OK</td>
              <td className="px-4 py-3 text-white/60">Reemplaza (PUT) o modifica parcialmente (PATCH) un recurso existente.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Eliminar (Delete)</td>
              <td className="px-4 py-3 font-mono text-cyan-400">DELETE</td>
              <td className="px-4 py-3 font-mono font-bold text-rose-400">DELETE</td>
              <td className="px-4 py-3 font-mono">200 OK / 204 No Content</td>
              <td className="px-4 py-3 text-white/60">Borra de forma física o lógica un recurso del servidor.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Simulador Interactivo de Peticiones y Respuestas</h2>
      <p>
        Para entender el funcionamiento real de estas peticiones, interactúa con el simulador de abajo. 
        Representa a un cliente (como una aplicación móvil o web) enviando peticiones <Term id="http">HTTP</Term> estructuradas en <Term id="json">JSON</Term> a un servidor, 
        el cual realiza operaciones de base de datos relacionales y retorna una respuesta.
      </p>

      {/* Simulator Card Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 backdrop-blur-md overflow-hidden shadow-2xl my-6 flex flex-col">
        {/* Simulator Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <h3 className="font-bold text-white text-base font-sans m-0">Consola de Simulación de Red</h3>
          </div>
          <button 
            onClick={handleResetDb} 
            className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            title="Restaurar base de datos a su estado original"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Reiniciar Base de Datos
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {[
            { key: "POST", label: "POST (Crear)", color: "text-emerald-400 border-emerald-500/40" },
            { key: "GET", label: "GET (Leer)", color: "text-sky-400 border-sky-500/40" },
            { key: "PUT", label: "PUT (Actualizar)", color: "text-amber-400 border-amber-500/40" },
            { key: "DELETE", label: "DELETE (Eliminar)", color: "text-rose-400 border-rose-500/40" }
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (!loading) setActiveTab(tab.key);
                }}
                disabled={loading}
                className={`px-5 py-3.5 text-sm font-semibold tracking-wide transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? `${tab.color} bg-white/[0.02] text-white` 
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row min-h-[480px] w-full">
          
          {/* Column 1: Client Request Builder (40%) */}
          <div className="w-full lg:w-[40%] p-5 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between bg-black/10">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-white/40 flex items-center gap-1.5">
                  <Globe size={13} />
                  Petición del Cliente
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/50">
                  HTTP/1.1
                </span>
              </div>

              {/* URL & Method Display */}
              <div className="flex items-center gap-1 bg-neutral-900 border border-white/8 rounded-lg p-2.5 mb-4 font-mono text-xs overflow-x-auto">
                <span className={`font-bold px-2 py-0.5 rounded ${
                  activeTab === "POST" ? "bg-emerald-500/10 text-emerald-400" :
                  activeTab === "GET" ? "bg-sky-500/10 text-sky-400" :
                  activeTab === "PUT" ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
                }`}>
                  {activeTab}
                </span>
                <span className="text-white/50 shrink-0">https://api.biblioteca.com/v1</span>
                <span className="text-white font-medium">
                  {activeTab === "POST" || activeTab === "GET" ? "/libros" : activeTab === "PUT" ? "/libros/2" : `/libros/${deleteId}`}
                </span>
              </div>

              {/* Request Headers */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest block mb-1">Cabeceras (Headers)</span>
                <pre className="m-0 p-2.5 bg-neutral-900/50 rounded-lg border border-white/5 text-[11px] font-mono text-white/60 leading-normal">
{`Accept: application/json
${activeTab === "POST" || activeTab === "PUT" ? "Content-Type: application/json" : "# Sin cuerpo de petición"}`}
                </pre>
              </div>

              {/* Request Body Inputs */}
              {(activeTab === "POST" || activeTab === "PUT") && (
                <div className="space-y-3">
                  <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest block">Cuerpo de la Petición (JSON)</span>
                  
                  {activeTab === "POST" ? (
                    <div className="p-3.5 rounded-lg border border-white/5 bg-neutral-900/40 space-y-2 text-xs">
                      <div>
                        <label className="block text-[10px] text-white/40 mb-1">Título del libro</label>
                        <input 
                          type="text" 
                          value={newTitle} 
                          onChange={(e) => setNewTitle(e.target.value)} 
                          className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-white/40 mb-1">Autor</label>
                          <input 
                            type="text" 
                            value={newAuthor} 
                            onChange={(e) => setNewAuthor(e.target.value)} 
                            className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 mb-1">Categoría</label>
                          <input 
                            type="text" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)} 
                            className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-lg border border-white/5 bg-neutral-900/40 space-y-2 text-xs">
                      <div className="text-[10px] text-amber-400 font-semibold mb-1">
                        Editando Libro ID: 2
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 mb-1">Título del libro</label>
                        <input 
                          type="text" 
                          value={editTitle} 
                          onChange={(e) => setEditTitle(e.target.value)} 
                          className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-white/40 mb-1">Autor</label>
                          <input 
                            type="text" 
                            value={editAuthor} 
                            onChange={(e) => setEditAuthor(e.target.value)} 
                            className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 mb-1">Categoría</label>
                          <input 
                            type="text" 
                            value={editCategory} 
                            onChange={(e) => setEditCategory(e.target.value)} 
                            className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* DELETE Target Selector */}
              {activeTab === "DELETE" && (
                <div className="p-3.5 rounded-lg border border-white/5 bg-neutral-900/40 text-xs">
                  <label className="block text-[10px] text-white/40 mb-1">Selecciona el ID del libro a eliminar:</label>
                  <select 
                    value={deleteId} 
                    onChange={(e) => setDeleteId(Number(e.target.value))} 
                    className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {db.map(item => (
                      <option key={item.id} value={item.id}>
                        ID {item.id} - {item.titulo} ({item.autor})
                      </option>
                    ))}
                    {!db.some(i => i.id === 1) && <option value={1}>ID 1 (Ya eliminado)</option>}
                    {!db.some(i => i.id === 2) && <option value={2}>ID 2 (Ya eliminado)</option>}
                    <option value={99}>ID 99 (Inexistente)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-5 border-t border-white/5 pt-4">
              <button
                onClick={handleSimulate}
                disabled={loading}
                className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-[var(--accent-color)] text-white shadow-[0_0_15px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <Send size={15} className={loading ? "animate-pulse" : ""} />
                {loading ? "Procesando..." : "Enviar Petición HTTP"}
              </button>
            </div>
          </div>

          {/* Column 2: Middleware Visual Pipeline & DB state (70% combined) */}
          <div className="flex-1 flex flex-col">
            
            {/* Top half: Network Flow Animation & DB Logic */}
            <div className="p-5 border-b border-white/5 flex-1 flex flex-col justify-between min-h-[220px]">
              
              {/* Network flow diagram */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-white/40 block mb-3">
                  Flujo de Red y Proceso
                </span>
                
                {/* Visual Pipeline nodes */}
                <div className="flex items-center justify-between px-3 py-4 rounded-xl bg-black/30 border border-white/5 relative overflow-hidden">
                  
                  {/* Nodes */}
                  <div className="z-10 flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      animationStep === 1 ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 scale-110 shadow-[0_0_12px_rgba(6,182,212,0.4)]" : "border-white/10 bg-white/5 text-white/40"
                    }`}>
                      <Globe size={18} />
                    </div>
                    <span className="text-[10px] font-semibold text-white/60">Cliente</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-1 relative">
                    {/* Animated Line */}
                    <div className="h-0.5 w-full bg-white/10 relative">
                      {animationStep === 1 && (
                        <div className="absolute top-0 bottom-0 left-0 bg-cyan-400 animate-[running-line_0.8s_infinite] shadow-[0_0_5px_rgba(6,182,212,1)]" style={{ width: "30%" }} />
                      )}
                      {animationStep === 4 && (
                        <div className="absolute top-0 bottom-0 right-0 bg-emerald-400 animate-[running-line-rev_0.8s_infinite] shadow-[0_0_5px_rgba(52,211,153,1)]" style={{ width: "30%" }} />
                      )}
                    </div>
                  </div>

                  <div className="z-10 flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      animationStep === 2 || animationStep === 3 ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 scale-110 shadow-[0_0_12px_rgba(6,182,212,0.4)]" : "border-white/10 bg-white/5 text-white/40"
                    }`}>
                      <Server size={18} />
                    </div>
                    <span className="text-[10px] font-semibold text-white/60">Servidor</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-1">
                    <div className="h-0.5 w-full bg-white/10 relative">
                      {animationStep === 2 && (
                        <div className="absolute top-0 bottom-0 left-0 bg-cyan-400 animate-[running-line_0.8s_infinite] shadow-[0_0_5px_rgba(6,182,212,1)]" style={{ width: "30%" }} />
                      )}
                      {animationStep === 3 && (
                        <div className="absolute top-0 bottom-0 right-0 bg-emerald-400 animate-[running-line-rev_0.8s_infinite] shadow-[0_0_5px_rgba(52,211,153,1)]" style={{ width: "30%" }} />
                      )}
                    </div>
                  </div>

                  <div className="z-10 flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      animationStep === 3 ? "border-emerald-400 bg-emerald-400/20 text-emerald-300 scale-110 shadow-[0_0_12px_rgba(52,211,153,0.4)]" : "border-white/10 bg-white/5 text-white/40"
                    }`}>
                      <Database size={18} />
                    </div>
                    <span className="text-[10px] font-semibold text-white/60">Base de Datos</span>
                  </div>
                </div>
              </div>

              {/* Status Logic explanations */}
              <div className="mt-3 p-3 rounded-lg border border-white/5 bg-white/[0.01] text-xs leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Operación de Servidor a Ejecutar:</span>
                {animationStep === 0 && (
                  <span className="text-white/40">Listo. Configura los parámetros en el cliente y presiona el botón.</span>
                )}
                {animationStep === 1 && (
                  <span className="text-cyan-400 animate-pulse flex items-center gap-1.5">
                    <Send size={12} /> Viajando: Petición HTTP {activeTab} hacia el endpoint del servidor...
                  </span>
                )}
                {animationStep === 2 && (
                  <span className="text-cyan-400 animate-pulse flex items-center gap-1.5">
                    <Server size={12} /> Servidor procesando. Traduciendo la acción a consulta de base de datos...
                  </span>
                )}
                {animationStep === 3 && (
                  <span className="text-emerald-400 animate-pulse flex items-center gap-1.5 font-semibold">
                    <Database size={12} /> ¡Base de Datos afectada! Consulta ejecutada correctamente.
                  </span>
                )}
                {animationStep === 4 && (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <CheckCircle size={12} /> Servidor respondió con estado {response?.status} {response?.statusText}.
                  </span>
                )}

                {/* SQL Query visualizer */}
                {(animationStep >= 2 || animationStep === 0) && (
                  <div className="mt-2 font-mono text-[10.5px] p-2 bg-neutral-900 border border-white/5 rounded text-white/70 overflow-x-auto whitespace-pre-wrap">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-1 font-sans">Consulta SQL Ejecutada en el Servidor</span>
                    {sqlQuery}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom half: Database State & HTTP Response (Split left-right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5 flex-1 min-h-[260px]">
              
              {/* Database state view */}
              <div className="p-5 border-r border-white/5 flex flex-col bg-white/[0.01]">
                <span className="text-xs uppercase tracking-wider font-semibold text-white/40 block mb-3 flex items-center gap-1">
                  <Database size={13} />
                  Tabla libros en DB
                </span>
                
                {/* Micro DB Table */}
                <div className="flex-1 overflow-y-auto border border-white/5 rounded-lg bg-neutral-900/50">
                  {db.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-4 text-center text-xs text-white/30 italic">
                      Base de datos vacía. Usa POST para registrar un libro.
                    </div>
                  ) : (
                    <table className="w-full text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-black/40 text-white/50 border-b border-white/5 text-left">
                          <th className="p-2 font-bold w-10">ID</th>
                          <th className="p-2 font-bold">Título</th>
                          <th className="p-2 font-bold">Autor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {db.map((row) => (
                          <tr 
                            key={row.id} 
                            className={`hover:bg-white/[0.02] transition-colors ${
                              animationStep === 3 && activeTab === "POST" && row.id === Math.max(...db.map(item => item.id)) ? "bg-emerald-500/10 text-emerald-300 font-semibold" :
                              animationStep === 3 && activeTab === "PUT" && row.id === 2 ? "bg-amber-500/10 text-amber-300 font-semibold" : ""
                            }`}
                          >
                            <td className="p-2 font-mono text-white/50">{row.id}</td>
                            <td className="p-2 font-medium truncate max-w-[90px]" title={row.titulo}>{row.titulo}</td>
                            <td className="p-2 text-white/60 truncate max-w-[80px]" title={row.autor}>{row.autor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Server response view */}
              <div className="p-5 flex flex-col justify-between bg-black/20">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/40 block mb-3 flex items-center gap-1.5">
                    <Server size={13} />
                    Respuesta del Servidor
                  </span>

                  {response ? (
                    <div className="space-y-3">
                      
                      {/* Response status line */}
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span className="text-white/40">Status:</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          response.status >= 200 && response.status < 300 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {response.status} {response.statusText}
                        </span>
                      </div>

                      {/* Response Headers */}
                      <div>
                        <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-0.5">Cabeceras de Respuesta</span>
                        <pre className="m-0 p-2 bg-neutral-900 border border-white/5 rounded text-[10px] font-mono text-white/60">
{`Content-Type: ${response.headers["Content-Type"]}
Server: ${response.headers["Server"]}`}
                        </pre>
                      </div>

                      {/* Response Body JSON */}
                      <div>
                        <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-0.5">Cuerpo de Respuesta (JSON)</span>
                        <pre className="m-0 p-2 bg-neutral-900 border border-white/5 rounded text-[10px] font-mono text-white/70 overflow-x-auto leading-relaxed max-h-[110px] overflow-y-auto">
                          {response.body}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full min-h-[140px] flex items-center justify-center border border-dashed border-white/10 rounded-lg p-4 text-center text-xs text-white/30 italic">
                      {loading ? "Esperando respuesta del servidor..." : "Pendiente de ejecutar la petición HTTP..."}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        @keyframes running-line {
          0% { left: -30%; }
          100% { left: 100%; }
        }
        @keyframes running-line-rev {
          0% { right: -30%; }
          100% { right: 100%; }
        }
      `}</style>

      <h2>Anatomía de las Peticiones y Respuestas HTTP</h2>
      <p>
        Para profundizar en la simulación, es fundamental entender que cada operación CRUD se comunica mediante una 
        estructura física de red dividida en dos componentes principales: la <strong>Petición (Request)</strong> y la 
        <strong>Respuesta (Response)</strong>.
      </p>

      <h3>1. La Petición HTTP (Cliente → Servidor)</h3>
      <p>
        Es el mensaje que el navegador o aplicación móvil envía al servidor solicitando realizar una acción. Se compone de:
      </p>
      <ul>
        <li><strong>Método HTTP / Verbo:</strong> Indica qué acción queremos hacer (GET, POST, PUT, DELETE).</li>
        <li><strong>Ruta (Endpoint) / URI:</strong> La dirección a la que hacemos la consulta (por ejemplo, <code>/v1/libros</code>).</li>
        <li><strong>Cabeceras (Headers):</strong> Metadatos adicionales que describen la petición (por ejemplo, <code>Content-Type: application/json</code> le indica al servidor que los datos que le enviamos están en formato JSON).</li>
        <li><strong>Cuerpo (Body):</strong> El payload o datos que enviamos para ser guardados. (Los métodos <code>GET</code> y <code>DELETE</code> normalmente no llevan cuerpo, ya que solo solicitan recuperar o borrar algo por su ID en la URL).</li>
      </ul>

      <h3>2. La Respuesta HTTP (Servidor → Cliente)</h3>
      <p>
        Es el mensaje de vuelta enviado por el servidor una vez que ha procesado la petición y guardado/recuperado los datos en la base de datos:
      </p>
      <ul>
        <li><strong>Código de Estado (HTTP Status Code):</strong> Un número estándar que indica si todo salió bien o si hubo un error. Se dividen en rangos:
          <ul>
            <li><code>2xx (Éxito):</code> Petición correcta. Ejemplos: <code>200 OK</code> o <code>201 Created</code>.</li>
            <li><code>4xx (Error del Cliente):</code> Problema del que solicita. Ejemplos: <code>400 Bad Request</code> (datos erróneos), <code>404 Not Found</code> (el recurso solicitado no existe) o <code>401 Unauthorized</code> (requiere autenticación).</li>
            <li><code>5xx (Error del Servidor):</code> Falla interna del propio servidor. Ejemplo: <code>500 Internal Server Error</code>.</li>
          </ul>
        </li>
        <li><strong>Cabeceras de Respuesta:</strong> Metadatos del servidor (como tipo de servidor, fecha, tiempo de respuesta o tamaño del archivo).</li>
        <li><strong>Cuerpo de Respuesta (Body):</strong> Los datos resultantes solicitados (usualmente formateados en JSON).</li>
      </ul>

      <h2>Ejemplos Detallados por Operación</h2>
      <p>
        A continuación, se detalla cómo se traduce cada operación en la vida real paso a paso para un recurso de tipo <code>/libros</code>:
      </p>

      <h3>1. CREATE (Crear) → POST</h3>
      <p>
        El cliente solicita registrar un nuevo libro. Envía los datos correspondientes en el cuerpo (body) de la petición HTTP.
      </p>
      <pre><code>{`// 1. PETICIÓN HTTP
POST /v1/libros HTTP/1.1
Host: api.biblioteca.com
Content-Type: application/json

{
  "titulo": "Ficciones",
  "autor": "Jorge Luis Borges",
  "categoria": "Cuentos"
}

// 2. OPERACIÓN BASE DE DATOS
INSERT INTO libros (titulo, autor, categoria) VALUES ('Ficciones', 'Jorge Luis Borges', 'Cuentos');

// 3. RESPUESTA HTTP DEL SERVIDOR
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 3,
  "titulo": "Ficciones",
  "autor": "Jorge Luis Borges",
  "categoria": "Cuentos"
}`}</code></pre>

      <h3>2. READ (Leer) → GET</h3>
      <p>
        El cliente solicita consultar un libro por su ID específico (en este caso, el ID 2) pasando el ID en la URL. No requiere cuerpo.
      </p>
      <pre><code>{`// 1. PETICIÓN HTTP
GET /v1/libros/2 HTTP/1.1
Host: api.biblioteca.com
Accept: application/json

// 2. OPERACIÓN BASE DE DATOS
SELECT * FROM libros WHERE id = 2;

// 3. RESPUESTA HTTP DEL SERVIDOR
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 2,
  "titulo": "1984",
  "autor": "George Orwell",
  "categoria": "Distopía"
}`}</code></pre>

      <h3>3. UPDATE (Actualizar) → PUT</h3>
      <p>
        El cliente solicita modificar los datos del libro con ID 2. Envía todo el nuevo objeto con las correcciones en el cuerpo de la petición.
      </p>
      <pre><code>{`// 1. PETICIÓN HTTP
PUT /v1/libros/2 HTTP/1.1
Host: api.biblioteca.com
Content-Type: application/json

{
  "titulo": "1984 (Edición Especial)",
  "autor": "George Orwell",
  "categoria": "Ciencia Ficción"
}

// 2. OPERACIÓN BASE DE DATOS
UPDATE libros SET titulo = '1984 (Edición Especial)', categoria = 'Ciencia Ficción' WHERE id = 2;

// 3. RESPUESTA HTTP DEL SERVIDOR
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 2,
  "titulo": "1984 (Edición Especial)",
  "autor": "George Orwell",
  "categoria": "Ciencia Ficción"
}`}</code></pre>

      <h3>4. DELETE (Eliminar) → DELETE</h3>
      <p>
        El cliente solicita borrar el libro con ID 1. Pasa el ID del libro en la URL de la petición. No requiere cuerpo.
      </p>
      <pre><code>{`// 1. PETICIÓN HTTP
DELETE /v1/libros/1 HTTP/1.1
Host: api.biblioteca.com

// 2. OPERACIÓN BASE DE DATOS
DELETE FROM libros WHERE id = 1;

// 3. RESPUESTA HTTP DEL SERVIDOR
HTTP/1.1 200 OK
Content-Type: application/json

{
  "mensaje": "Libro eliminado correctamente",
  "id": 1
}`}</code></pre>
    </NoteLayout>
  );
}
