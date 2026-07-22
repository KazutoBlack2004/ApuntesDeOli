import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import { 
  Boxes,
  Heart,
  Shield,
  Layers,
  Sparkles,
  Play,
  RefreshCw,
  BookOpen,
  Code,
  Zap,
  Info
} from "lucide-react";

export default function POO() {
  // OOP Pillars active tab
  const [activePillar, setActivePillar] = useState("abstraccion");

  // Pet Simulator State
  const [petType, setPetType] = useState("Perro");
  const [petName, setPetName] = useState("Danko");
  const [dogBreed, setDogBreed] = useState("Golden");
  const [catLives, setCatLives] = useState(7);
  
  const [instantiatedPet, setInstantiatedPet] = useState(null);
  const [logs, setLogs] = useState(["Cargando compilador de JavaScript...", "Listo. Configura tu objeto y presiona 'Instanciar Objeto (new)'."]);
  const [energy, setEnergy] = useState(50);
  const [lives, setLives] = useState(7);
  const [actionEffect, setActionEffect] = useState("");

  const addLog = (newLog) => {
    setLogs(prev => [...prev, newLog]);
  };

  // Instantiation trigger
  const handleInstantiate = (e) => {
    e.preventDefault();
    if (!petName.trim()) return;

    const initialEnergy = 50;
    setEnergy(initialEnergy);

    if (petType === "Perro") {
      setInstantiatedPet({
        type: "Perro",
        name: petName.trim(),
        breed: dogBreed.trim() || "Mestizo",
      });
      setLogs([
        `// Definición e instanciación de clases en JS`,
        `class Animal {`,
        `  constructor(nombre) {`,
        `    this.nombre = nombre;`,
        `    this._energia = 50; // Atributo encapsulado (privado)`,
        `  }`,
        `  alimentar() { this._energia = 100; }`,
        `  getEnergia() { return this._energia; }`,
        `}`,
        ``,
        `class Perro extends Animal {`,
        `  constructor(nombre, raza) {`,
        `    super(nombre); // Llama al constructor padre`,
        `    this.raza = raza;`,
        `  }`,
        `  hacerSonido() { return "Guau"; } // Polimorfismo`,
        `  correr() { this._energia -= 20; }`,
        `}`,
        ``,
        `// Instanciando el objeto en memoria`,
        `const miMascota = new Perro("${petName.trim()}", "${dogBreed.trim() || "Mestizo"}");`,
        `console.log(miMascota.nombre); // "${petName.trim()}"`,
        `console.log(miMascota.getEnergia()); // 50 (energía inicial)`
      ]);
    } else {
      setLives(catLives);
      setInstantiatedPet({
        type: "Gato",
        name: petName.trim(),
        lives: catLives
      });
      setLogs([
        `// Definición e instanciación de clases en JS`,
        `class Animal {`,
        `  constructor(nombre) {`,
        `    this.nombre = nombre;`,
        `    this._energia = 50; // Atributo encapsulado (privado)`,
        `  }`,
        `  alimentar() { this._energia = 100; }`,
        `  getEnergia() { return this._energia; }`,
        `}`,
        ``,
        `class Gato extends Animal {`,
        `  constructor(nombre, vidas) {`,
        `    super(nombre); // Llama al constructor padre`,
        `    this.vidas = vidas;`,
        `  }`,
        `  hacerSonido() { return "Miau"; } // Polimorfismo`,
        `  aranar() { this._energia -= 15; }`,
        `}`,
        ``,
        `// Instanciando el objeto en memoria`,
        `const miMascota = new Gato("${petName.trim()}", ${catLives});`,
        `console.log(miMascota.nombre); // "${petName.trim()}"`,
        `console.log(miMascota.getEnergia()); // 50 (energía inicial)`
      ]);
    }

    setActionEffect("new instanciado! Objeto cargado en el Heap.");
    setTimeout(() => setActionEffect(""), 3000);
  };

  // OOP Methods simulation
  const handleAlimentar = () => {
    if (!instantiatedPet) return;
    setEnergy(100);
    setActionEffect("Alimentando... Energía incrementada al 100%.");
    addLog(`// Llamando al método HEREDADO de la clase base 'Animal'`);
    addLog(`miMascota.alimentar();`);
    addLog(`console.log(miMascota.getEnergia()); // 100`);
    setTimeout(() => setActionEffect(""), 3000);
  };

  const handleHacerSonido = () => {
    if (!instantiatedPet) return;
    const sound = instantiatedPet.type === "Perro" ? "Guau" : "Miau";
    setActionEffect(`Sonido polimórfico: ${sound}`);
    addLog(`// Llamando al método POLIMÓRFICO 'hacerSonido()'`);
    addLog(`console.log(miMascota.hacerSonido()); // "${sound}"`);
    setTimeout(() => setActionEffect(""), 3000);
  };

  const handleActionEspecífica = () => {
    if (!instantiatedPet) return;
    if (instantiatedPet.type === "Perro") {
      const newEnergy = Math.max(0, energy - 20);
      setEnergy(newEnergy);
      setActionEffect("Corriendo... Gastó 20 de energía.");
      addLog(`// Llamando al método específico de 'Perro'`);
      addLog(`miMascota.correr();`);
      addLog(`console.log(miMascota.getEnergia()); // ${newEnergy}`);
    } else {
      const newEnergy = Math.max(0, energy - 15);
      setEnergy(newEnergy);
      setActionEffect("Arañando el sofá... Gastó 15 de energía.");
      addLog(`// Llamando al método específico de 'Gato'`);
      addLog(`miMascota.aranar();`);
      addLog(`console.log(miMascota.getEnergia()); // ${newEnergy}`);
    }
    setTimeout(() => setActionEffect(""), 3000);
  };

  const handleReset = () => {
    setInstantiatedPet(null);
    setLogs(["Reseteando memoria virtual...", "Listo. Configura tu objeto y presiona 'Instanciar Objeto (new)'."]);
    setEnergy(50);
    setActionEffect("");
  };

  return (
    <NoteLayout
      title="Programación Orientada a Objetos (POO)"
      category="Software"
      categoryPath="/DesarrolloSoftware"
      tags={["POO", "Clases", "Objetos", "Modificadores de Acceso", "Pilares"]}
      previousNote={{ label: "Git y Convenciones", path: "/DesarrolloSoftware/ConvencionesCommits" }}
      nextNote={{ label: "Frameworks y Librerías", path: "/DesarrolloSoftware/FrameworksYLibrerias" }}
    >
      <div className="callout" style={{ borderLeftColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.06)" }}>
        La <strong>Programación Orientada a Objetos (POO)</strong> es un paradigma de programación que modela los sistemas 
        de software utilizando <strong>objetos</strong> y sus relaciones. Organiza el código agrupando los datos y 
        el comportamiento relacionado en unidades modulares y reutilizables.
      </div>

      <h2>¿Qué es una Clase y qué es un Objeto?</h2>
      <p>
        Para entender la POO de forma sencilla, imagina los siguientes conceptos cotidianos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
        <div className="p-5 border border-white/8 rounded-2xl bg-white/[0.01]">
          <h4 className="font-bold text-[#60a5fa] flex items-center gap-2 mb-2">
            <Layers size={18} />
            La Clase (El Plano / Molde)
          </h4>
          <p className="text-xs text-white/70 m-0 leading-relaxed">
            Es la plantilla teórica que define las propiedades y comportamientos comunes que tendrán los elementos creados. 
            No ocupa espacio real en memoria durante la ejecución, solo describe la estructura.
            <br /><br />
            <strong>Ejemplo:</strong> Los planos de arquitectura de una casa, o la receta detallada de un pastel.
          </p>
        </div>

        <div className="p-5 border border-white/8 rounded-2xl bg-white/[0.01]">
          <h4 className="font-bold text-[#60a5fa] flex items-center gap-2 mb-2">
            <Boxes size={18} />
            El Objeto (La Instancia Real)
          </h4>
          <p className="text-xs text-white/70 m-0 leading-relaxed">
            Es la manifestación concreta creada a partir del plano de la clase. Los objetos tienen un espacio reservado 
            en memoria de tu computadora, poseen su propio estado de datos e interactúan entre sí.
            <br /><br />
            <strong>Ejemplo:</strong> La casa física construida con ladrillos, o el pastel de chocolate horneado.
          </p>
        </div>
      </div>

      <h2>Atributos y Métodos</h2>
      <p>
        Un objeto de software se compone fundamentalmente de dos componentes clave:
      </p>
      <ul>
        <li><strong>Atributos (Datos / Propiedades):</strong> Representan las características o el estado actual del objeto (ej. <code>color</code>, <code>modelo</code>, <code>velocidad</code>, <code>altura</code>).</li>
        <li><strong>Métodos (Comportamientos / Acciones):</strong> Son las funciones internas que definen lo que el objeto puede realizar (ej. <code>acelerar()</code>, <code>frenar()</code>, <code>encender()</code>).</li>
      </ul>

      <h2>Los 4 Pilares de la POO</h2>
      <p>
        La potencia y flexibilidad de este paradigma radica en el cumplimiento de estos cuatro pilares fundamentales:
      </p>

      {/* Pillars Selector Widget */}
      <div className="border border-white/8 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-xl my-6 flex flex-col md:flex-row">
        
        {/* Left Side: Buttons */}
        <div className="md:w-[35%] bg-black/20 border-b md:border-b-0 md:border-r border-white/5 p-3 flex flex-col gap-1.5">
          <button
            onClick={() => setActivePillar("abstraccion")}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2 ${
              activePillar === "abstraccion"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Sparkles size={14} />
            1. Abstracción
          </button>
          
          <button
            onClick={() => setActivePillar("encapsulamiento")}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2 ${
              activePillar === "encapsulamiento"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Shield size={14} />
            2. Encapsulamiento
          </button>

          <button
            onClick={() => setActivePillar("herencia")}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2 ${
              activePillar === "herencia"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Layers size={14} />
            3. Herencia
          </button>

          <button
            onClick={() => setActivePillar("polimorfismo")}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2 ${
              activePillar === "polimorfismo"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Boxes size={14} />
            4. Polimorfismo
          </button>
        </div>

        {/* Right Side: Descriptions & Demos */}
        <div className="flex-1 p-5 min-h-[220px] flex flex-col justify-between">
          {activePillar === "abstraccion" && (
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <Sparkles size={15} className="text-blue-400" />
                Abstracción: Ocultar la Complejidad
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-3">
                Consiste en aislar o extraer los detalles esenciales de un objeto ignorando los detalles secundarios o complejos de su funcionamiento interno. Permite diseñar interfaces limpias y simples para el usuario.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-blue-300 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  <strong>Analogía:</strong> Al conducir un auto, presionas el acelerador (interfaz abstracta). No necesitas saber cómo se calcula la inyección de combustible o el comportamiento térmico de los pistones por dentro para moverte.
                </span>
              </div>
            </div>
          )}

          {activePillar === "encapsulamiento" && (
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <Shield size={15} className="text-emerald-400" />
                Encapsulamiento: Control y Seguridad
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-3">
                Es la restricción del acceso directo a los datos internos de un objeto (atributos), agrupándolos bajo una sola unidad y exponiendo el acceso seguro a través de métodos públicos específicos (Getters y Setters). Evita la alteración corrupta del estado.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-emerald-300 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  <strong>En código:</strong> Los atributos suelen declararse como privados (ej: <code>private _energia</code>). Para modificarlos, usas métodos de acceso, lo cual permite realizar validaciones previas (ej: verificar que la energía nunca sea menor a 0 o mayor a 100).
                </span>
              </div>
            </div>
          )}

          {activePillar === "herencia" && (
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <Layers size={15} className="text-yellow-400" />
                Herencia: Reutilización y Extensión
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-3">
                Es el mecanismo por el cual una clase nueva (hija / subclase) hereda la estructura de datos y métodos de una clase ya existente (padre / superclase). Permite estructurar sistemas jerárquicamente de manera limpia reduciendo la duplicación de código.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-yellow-300 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  <strong>En código:</strong> La clase base <code>Animal</code> tiene el atributo <code>nombre</code> y método <code>alimentar()</code>. La clase <code>Perro</code> extiende (<code>extends</code>) a Animal, heredando todo automáticamente sin tener que volver a programarlo.
                </span>
              </div>
            </div>
          )}

          {activePillar === "polimorfismo" && (
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <Boxes size={15} className="text-purple-400" />
                Polimorfismo: Muchas Formas
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-3">
                Es la propiedad de que un mismo método (nombre de función) actúe de manera distinta según el tipo de objeto que lo ejecute. Permite que el programador escriba código genérico sin preocuparse por la clase exacta de la instancia en tiempo de ejecución.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-purple-300 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  <strong>Ejemplo:</strong> Tanto la clase <code>Perro</code> como la clase <code>Gato</code> tienen la función <code>hacerSonido()</code>, pero al ejecutarse, Perro retorna "Guau" y Gato retorna "Miau".
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

      <h2>Simulador Interactivo: Virtual OOP Playground</h2>
      <p>
        Configura los parámetros iniciales de tu objeto en la sección izquierda (nombre, raza o cantidad de vidas) y presiona 
        <strong>"Instanciar Objeto (new)"</strong> para cargarlo en memoria virtual. Una vez instanciado, podrás 
        desencadenar sus métodos y auditar el comportamiento de los pilares de la POO:
      </p>

      {/* Interactive OOP Simulator Widget */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* Header Widget */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Boxes className="text-blue-500 animate-pulse" size={18} />
            <h3 className="font-bold text-white text-sm m-0">OOP Playground & Memory Visualizer</h3>
          </div>
          <button
            onClick={handleReset}
            className="cursor-pointer text-[10px] flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 transition-all"
            title="Borrar memoria"
          >
            <RefreshCw size={11} />
            Resetear Memoria
          </button>
        </div>

        {/* Builder Layout */}
        <div className="flex flex-col lg:flex-row min-h-[460px] w-full">
          
          {/* Column 1: Configuration Form (40% width) */}
          <div className="w-full lg:w-[40%] p-5 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/15 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1">
              Constructor y Propiedades
            </span>

            {/* Selector: Pet Type */}
            <div>
              <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                Seleccionar Clase de Destino
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPetType("Perro")}
                  disabled={!!instantiatedPet}
                  className={`cursor-pointer py-2 rounded-lg text-xs font-semibold border transition-all ${
                    petType === "Perro"
                      ? "bg-blue-600/10 border-blue-500 text-blue-300"
                      : "bg-neutral-900 border-white/10 text-white/60 hover:text-white"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  Clase Perro
                </button>
                <button
                  onClick={() => setPetType("Gato")}
                  disabled={!!instantiatedPet}
                  className={`cursor-pointer py-2 rounded-lg text-xs font-semibold border transition-all ${
                    petType === "Gato"
                      ? "bg-blue-600/10 border-blue-500 text-blue-300"
                      : "bg-neutral-900 border-white/10 text-white/60 hover:text-white"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  Clase Gato
                </button>
              </div>
            </div>

            {/* Input: Name */}
            <div>
              <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                Nombre de Mascota (Atributo `nombre`)
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                placeholder="ej: Danko"
                disabled={!!instantiatedPet}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* Input: Specific attributes */}
            {petType === "Perro" ? (
              <div>
                <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                  Raza (Atributo Específico de Perro)
                </label>
                <input
                  type="text"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="ej: Golden, Pastor"
                  disabled={!!instantiatedPet}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-mono"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                  Vidas iniciales (Atributo Específico de Gato)
                </label>
                <select
                  value={catLives}
                  onChange={(e) => setCatLives(parseInt(e.target.value))}
                  disabled={!!instantiatedPet}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value={7}>7 vidas (Estándar)</option>
                  <option value={9}>9 vidas (Anglosajón)</option>
                  <option value={5}>5 vidas (Aventurero)</option>
                </select>
              </div>
            )}

            {/* Instantiation Trigger */}
            <button
              onClick={handleInstantiate}
              disabled={!!instantiatedPet || !petName.trim()}
              className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-45 disabled:scale-100 disabled:cursor-not-allowed"
            >
              <Play size={15} />
              Instanciar Objeto (new)
            </button>

            {/* Class Heritage Visualizer Box */}
            <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] text-[10px] leading-relaxed text-white/50">
              <span className="text-white font-bold block mb-1">Jerarquía de Herencia:</span>
              <div className="font-mono">
                Animal <span className="text-white/30">(Clase Base)</span>
                <br />
                &nbsp; └─► {petType} <span className="text-white/30">(Clase Hija)</span>
              </div>
            </div>

          </div>

          {/* Column 2: Memory View & Interaction (60% width) */}
          <div className="flex-1 p-5 flex flex-col justify-between bg-black/25">
            
            {/* Visual object representation */}
            <div className="min-h-[190px]">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-3">
                Heap de Memoria (Instancia Activa)
              </span>

              {!instantiatedPet ? (
                <div className="h-[140px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center px-4">
                  <Boxes size={28} className="text-white/20 mb-2" />
                  <span className="text-xs text-white/40">Sin instancias activas en el Heap.</span>
                  <span className="text-[10px] text-white/25">Configura y presiona el botón "Instanciar" para comenzar.</span>
                </div>
              ) : (
                <div className="p-4 border border-white/10 rounded-2xl bg-neutral-900/60 backdrop-blur flex flex-col gap-4 relative overflow-hidden transition-all duration-300">
                  
                  {/* Status label overlay */}
                  <div className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold uppercase">
                    Clase: {instantiatedPet.type}
                  </div>

                  {/* Animal Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                      <Boxes size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">
                        miMascota <span className="text-white/45 font-normal text-xs">(id: 0x{instantiatedPet.type === "Perro" ? "7f3b" : "9a2c"})</span>
                      </strong>
                      <span className="text-xs text-white/50">
                        {instantiatedPet.type === "Perro" 
                          ? `Raza: ${instantiatedPet.breed}` 
                          : `Vidas restantes: ${lives}`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Attributes state indicators */}
                  <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-3">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-white/40 mb-1">
                        <span>nombre (Público)</span>
                        <span className="font-mono text-white/60">"{instantiatedPet.name}"</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-white/40 mb-1">
                        <span>energia (Privado/Encapsulado)</span>
                        <span className="font-mono text-emerald-400 font-bold">{energy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${energy}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions / Method execution buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleAlimentar}
                      className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-all"
                      title="Método heredado de Animal"
                    >
                      <Heart size={12} className="text-rose-500" />
                      alimentar()
                    </button>

                    <button
                      onClick={handleHacerSonido}
                      className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-all"
                      title="Método polimórfico en clase hija"
                    >
                      <Info size={12} className="text-blue-400" />
                      hacerSonido()
                    </button>

                    <button
                      onClick={handleActionEspecífica}
                      disabled={energy <= 0}
                      className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Método exclusivo de la clase hija"
                    >
                      <Zap size={12} className="text-yellow-400" />
                      {instantiatedPet.type === "Perro" ? "correr()" : "aranar()"}
                    </button>
                  </div>

                  {/* Live action visual feedback */}
                  {actionEffect && (
                    <div className="text-[11px] font-bold text-cyan-400 animate-pulse text-right">
                      {actionEffect}
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Logs console */}
            <div className="mt-5 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2.5">
                Consola: JavaScript Engine Execution Trace
              </span>

              <div className="relative">
                <pre className="m-0 p-4 bg-neutral-950 border border-white/5 rounded-xl text-[10.5px] font-mono text-emerald-450 overflow-y-auto max-h-[160px] whitespace-pre-wrap leading-relaxed">
                  {logs.join("\n")}
                </pre>
              </div>
            </div>

          </div>

        </div>

      </div>

      <h2>Resumen de Conceptos de POO en JS</h2>
      <p>
        Para estructurar programas en JavaScript moderno, es común emplear la palabra reservada <code>class</code>:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04]">
              <th className="px-4 py-3 text-left font-bold text-[#60a5fa] w-[25%]">Término</th>
              <th className="px-4 py-3 text-left font-bold text-white w-[35%]">Qué significa en JS</th>
              <th className="px-4 py-3 text-left font-bold text-white w-[40%]">Sintaxis de Ejemplo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">constructor</td>
              <td className="px-4 py-3 text-white/60">
                Es la función inicializadora que se ejecuta automáticamente al instanciar un objeto con <code>new</code>. Recibe los parámetros iniciales.
              </td>
              <td className="px-4 py-3 font-mono text-xs text-cyan-400">constructor(nombre, edad) &#123; ... &#125;</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">extends</td>
              <td className="px-4 py-3 text-white/60">
                Establece la relación de herencia, indicando que una clase hija hereda de una clase padre.
              </td>
              <td className="px-4 py-3 font-mono text-xs text-cyan-400">class Perro extends Animal</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">super()</td>
              <td className="px-4 py-3 text-white/60">
                Llama al constructor de la clase padre. Es obligatorio invocarlo antes de usar <code>this</code> en el constructor de la clase hija.
              </td>
              <td className="px-4 py-3 font-mono text-xs text-cyan-400">super(nombre);</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">this</td>
              <td className="px-4 py-3 text-white/60">
                Hace referencia al objeto actual que está ejecutando el método en ese instante.
              </td>
              <td className="px-4 py-3 font-mono text-xs text-cyan-400">this.nombre = nombre;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteLayout>
  );
}
