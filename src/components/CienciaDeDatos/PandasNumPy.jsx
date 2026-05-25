import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

// Simulated dataset representing raw student data
const RAW_STUDENTS = [
  { id: 1, Nombre: "Sofía", Materia: "Algoritmos", Calificacion: 95, Genero: "F" },
  { id: 2, Nombre: "Mateo", Materia: "Redes", Calificacion: null, Genero: "M" },
  { id: 3, Nombre: "Valeria", Materia: "Bases de Datos", Calificacion: 88, Genero: "F" },
  { id: 4, Nombre: "Lucas", Materia: "Algoritmos", Calificacion: 72, Genero: "M" },
  { id: 5, Nombre: "Camila", Materia: "Bases de Datos", Calificacion: 91, Genero: "F" },
  { id: 6, Nombre: "Alejandro", Materia: "Redes", Calificacion: 64, Genero: "M" },
];

export default function PandasNumPy() {
  const [activeQuery, setActiveQuery] = useState("raw");

  // Logic to process data based on activeQuery
  let displayData = [];
  let codeSnippet = "";
  let description = "";

  switch (activeQuery) {
    case "head":
      displayData = RAW_STUDENTS.slice(0, 3);
      codeSnippet = "df.head(3)";
      description = "Muestra las primeras N filas del DataFrame. Útil para inspeccionar rápidamente la estructura básica.";
      break;
    case "describe":
      const califs = RAW_STUDENTS.filter(s => s.Calificacion !== null).map(s => s.Calificacion);
      const mean = (califs.reduce((a, b) => a + b, 0) / califs.length).toFixed(1);
      const min = Math.min(...califs);
      const max = Math.max(...califs);
      displayData = [
        { Metrica: "count (Cantidad)", Calificacion: califs.length },
        { Metrica: "mean (Promedio)", Calificacion: mean },
        { Metrica: "min (Mínima)", Calificacion: min },
        { Metrica: "max (Máxima)", Calificacion: max }
      ];
      codeSnippet = "df['Calificacion'].describe()";
      description = "Genera estadísticas descriptivas para columnas numéricas, excluyendo valores nulos automáticamente.";
      break;
    case "groupby":
      // Calculate averages by gender
      const fGrades = RAW_STUDENTS.filter(s => s.Genero === "F" && s.Calificacion !== null).map(s => s.Calificacion);
      const mGrades = RAW_STUDENTS.filter(s => s.Genero === "M" && s.Calificacion !== null).map(s => s.Calificacion);
      const fAvg = (fGrades.reduce((a,b)=>a+b, 0) / fGrades.length).toFixed(1);
      const mAvg = (mGrades.reduce((a,b)=>a+b, 0) / mGrades.length).toFixed(1);
      displayData = [
        { Genero: "F (Femenino)", Calificacion_Promedio: fAvg, Cantidad_Alumnos: fGrades.length },
        { Genero: "M (Masculino)", Calificacion_Promedio: mAvg, Cantidad_Alumnos: mGrades.length }
      ];
      codeSnippet = "df.groupby('Genero')['Calificacion'].mean()";
      description = "Agrupa el DataFrame basándose en categorías de una columna y calcula un estadístico de resumen.";
      break;
    case "fillna":
      displayData = RAW_STUDENTS.map(s => ({
        ...s,
        Calificacion: s.Calificacion === null ? 80 : s.Calificacion,
        Nombre: s.Calificacion === null ? `${s.Nombre} (Imputado)` : s.Nombre
      }));
      codeSnippet = "df['Calificacion'].fillna(80, inplace=True)";
      description = "Reemplaza los valores nulos (NaN) por un valor específico, realizando una imputación básica.";
      break;
    case "raw":
    default:
      displayData = RAW_STUDENTS;
      codeSnippet = "import pandas as pd\ndf = pd.read_csv('alumnos.csv')";
      description = "Estado inicial del dataset cargado desde un archivo CSV. Observa que el alumno Mateo tiene una calificación nula (NaN).";
      break;
  }

  return (
    <NoteLayout
      title="2. Manipulación de Datos con NumPy & Pandas"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Python", "NumPy", "Pandas", "Data Wrangling"]}
      previousNote={{
        label: "1. Introducción a la Ciencia de Datos",
        path: "/CienciaDeDatos/Introduccion",
      }}
      nextNote={{
        label: "3. Análisis Exploratorio de Datos (EDA)",
        path: "/CienciaDeDatos/EDA",
      }}
    >
      <div className="callout">
        Antes de entrenar cualquier modelo de Machine Learning, el 80% del tiempo de un proyecto se destina al <strong>Data Wrangling</strong>: la recopilación, limpieza y transformación de los datos crudos en tablas listas para analizar. En Python, esto se hace usando <Term id="numpy">NumPy</Term> y <Term id="pandas">Pandas</Term>.
      </div>

      <h2>NumPy: Computación Científica Rápida</h2>
      <p>
        <strong>NumPy</strong> es la librería fundacional. Su principal ventaja es el <code>ndarray</code> (arreglo n-dimensional), que permite 
        operaciones matemáticas vectorizadas ultra rápidas. A diferencia de las listas estándar de Python, los arreglos de NumPy se almacenan de 
        forma contigua en memoria y exigen un solo tipo de datos homogéneo, lo cual permite realizar cálculos masivos en lenguaje C optimizado.
      </p>

      <pre><code>{`import numpy as np

# Crear un arreglo de NumPy a partir de una lista
edades = np.array([21, 23, 19, 25, 22])

# Operaciones vectoriales directas (sin necesidad de bucles 'for')
edades_mas_cinco = edades + 5  # np.array([26, 28, 24, 30, 27])
edades_promedio = np.mean(edades)  # 22.0`}</code></pre>

      <h2>Pandas: La Navaja Suiza de los Datos</h2>
      <p>
        Construida sobre NumPy, <strong>Pandas</strong> proporciona estructuras de datos relacionales y de alto nivel. Los dos bloques de construcción básicos son:
      </p>
      <ul>
        <li><strong>Series:</strong> Un arreglo unidimensional indexado capaz de contener cualquier tipo de datos.</li>
        <li><strong>DataFrame:</strong> Una estructura bidimensional con columnas etiquetadas (semejante a una hoja de cálculo o una tabla SQL). Cada columna es internamente una Serie.</li>
      </ul>

      <div className="my-8 p-5 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--accent-color, #a855f7)', boxShadow: '0 0 10px var(--accent-color)' }} />
          Simulador Interactivo de Pandas DataFrame
        </h3>
        <p className="text-xs text-white/60 mb-5">
          Interactúa con los botones a continuación para simular comandos de Pandas y ver cómo se transforma el <Term id="dataframe">DataFrame</Term> de alumnos en tiempo real.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveQuery("raw")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeQuery === "raw"
                ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                : "bg-black/40 border-white/5 text-white/50 hover:border-white/15 hover:text-white"
            }`}
          >
            DataFrame Crudo
          </button>
          <button
            onClick={() => setActiveQuery("head")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeQuery === "head"
                ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                : "bg-black/40 border-white/5 text-white/50 hover:border-white/15 hover:text-white"
            }`}
          >
            df.head(3)
          </button>
          <button
            onClick={() => setActiveQuery("describe")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeQuery === "describe"
                ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                : "bg-black/40 border-white/5 text-white/50 hover:border-white/15 hover:text-white"
            }`}
          >
            df.describe()
          </button>
          <button
            onClick={() => setActiveQuery("groupby")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeQuery === "groupby"
                ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                : "bg-black/40 border-white/5 text-white/50 hover:border-white/15 hover:text-white"
            }`}
          >
            df.groupby().mean()
          </button>
          <button
            onClick={() => setActiveQuery("fillna")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeQuery === "fillna"
                ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                : "bg-black/40 border-white/5 text-white/50 hover:border-white/15 hover:text-white"
            }`}
          >
            df.fillna(80)
          </button>
        </div>

        {/* Code representation */}
        <div className="bg-black/60 rounded-xl p-3 border border-white/5 mb-4">
          <span className="text-[10px] text-white/35 block uppercase font-bold tracking-wider mb-1">Código Python Ejecutado:</span>
          <pre className="m-0 p-0 bg-transparent border-none text-xs text-white/80 font-mono">
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* Query explanation */}
        <p className="text-xs text-white/70 italic mb-4">
          {description}
        </p>

        {/* Render Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-left border-collapse m-0 text-xs">
            <thead>
              <tr style={{ backgroundColor: 'var(--accent-light)' }}>
                {displayData.length > 0 && Object.keys(displayData[0]).map((header) => (
                  <th key={header} className="p-3 text-white/90 border-b border-[var(--accent-border)] font-bold uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="p-3 text-white/85">
                      {val === null ? (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[10px]">
                          NaN (Null)
                        </span>
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2>Cheatsheet Rápido de Operaciones Pandas</h2>
      <table>
        <thead>
          <tr>
            <th>Operación</th>
            <th>Sintaxis en Python</th>
            <th>Explicación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carga de datos</td>
            <td><code>pd.read_csv('archivo.csv')</code></td>
            <td>Lee un archivo delimitado por comas y lo transforma en DataFrame.</td>
          </tr>
          <tr>
            <td>Filtrado condicional</td>
            <td><code>df[df['Edad'] &gt; 18]</code></td>
            <td>Filtra filas manteniendo solo las que cumplen la condición booleana.</td>
          </tr>
          <tr>
            <td>Eliminar nulos</td>
            <td><code>df.dropna(subset=['Calificacion'])</code></td>
            <td>Elimina las filas que contienen valores faltantes en esa columna.</td>
          </tr>
          <tr>
            <td>Crear nueva columna</td>
            <td><code>df['Aprobado'] = df['Nota'] &gt;= 70</code></td>
            <td>Evalúa la condición y guarda la serie booleana resultante en el DataFrame.</td>
          </tr>
          <tr>
            <td>Unión de DataFrames</td>
            <td><code>pd.merge(df1, df2, on='id_usuario')</code></td>
            <td>Combina dos tablas compartiendo una columna llave, similar a un INNER JOIN de SQL.</td>
          </tr>
        </tbody>
      </table>
    </NoteLayout>
  );
}
