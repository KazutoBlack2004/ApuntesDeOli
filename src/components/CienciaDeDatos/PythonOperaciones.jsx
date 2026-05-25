import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function PythonOperaciones() {
  return (
    <NoteLayout
      title="9. Python & Operaciones: Laboratorio Conceptual"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Python", "Librerías", "Scikit-Learn", "Visualización"]}
      previousNote={{
        label: "8. Inteligencia de Negocios (BI)",
        path: "/CienciaDeDatos/BusinessIntelligence",
      }}
      nextNote={{
        label: "10. Glosario de Ciencia de Datos",
        path: "/CienciaDeDatos/Glosario",
      }}
    >
      <div className="callout font-sans">
        <strong>Python</strong> se ha consolidado como el lenguaje estándar absoluto de la <Term id="ciencia_de_datos">Ciencia de Datos</Term> y del Machine Learning a nivel global. Su sintaxis limpia, legible y su ecosistema inigualable de librerías científicas lo convierten en la opción preferida tanto por universidades como por gigantes tecnológicos.
      </div>

      <h2>¿Por qué Python es el Rey de los Datos?</h2>
      <p>
        El ascenso de Python en el análisis de datos no se debe a su velocidad de ejecución en bruto (que es menor que C o C++), sino a tres pilares fundamentales:
      </p>
      <ul>
        <li><strong>Legibilidad:</strong> La sintaxis limpia y expresiva permite que los científicos de datos se concentren en resolver problemas matemáticos y de negocio en lugar de lidiar con la complejidad semántica del lenguaje.</li>
        <li><strong>Comunidad Gigante:</strong> Si existe un problema analítico o de procesamiento que necesitas resolver, es extremadamente probable que alguien ya haya creado un paquete optimizado en Python para solucionarlo.</li>
        <li><strong>Pegamento de Alto Rendimiento:</strong> Aunque escribimos en Python, las librerías científicas pesadas (como NumPy y TensorFlow) están implementadas internamente en C, C++ o Fortran, ofreciendo rendimiento nativo ultra veloz por detrás.</li>
      </ul>

      <h2>El Arsenal Analítico: Principales Librerías</h2>
      <p>
        Un proyecto de Ciencia de Datos en Python utiliza un conjunto estandarizado de paquetes que se integran de forma nativa entre sí:
      </p>
      <table>
        <thead>
          <tr>
            <th>Librería</th>
            <th>Propósito Primordial</th>
            <th>Ejemplo de Operación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>NumPy</strong></td>
            <td>Cálculo numérico y manipulación de matrices.</td>
            <td>Multiplicación de matrices distribuidas, álgebra lineal.</td>
          </tr>
          <tr>
            <td><strong>Pandas</strong></td>
            <td>Lectura y modelado de datos tabulares.</td>
            <td>Limpieza de registros nulos, agrupamiento, cruce de tablas.</td>
          </tr>
          <tr>
            <td><strong>Matplotlib & Seaborn</strong></td>
            <td>Generación de gráficos estadísticos.</td>
            <td>Dibujar histogramas, mapas de correlación, boxplots.</td>
          </tr>
          <tr>
            <td><strong>Scikit-Learn</strong></td>
            <td>Algoritmos clásicos de Machine Learning.</td>
            <td>Entrenar regresiones lineales, árboles de decisión, K-Means.</td>
          </tr>
          <tr>
            <td><strong>Statsmodels</strong></td>
            <td>Rigor y modelado estadístico avanzado.</td>
            <td>Análisis de varianza (ANOVA), pruebas de hipótesis.</td>
          </tr>
        </tbody>
      </table>

      {/* Aesthetic Upcoming Coding Lab Preview Block */}
      <div 
        className="my-10 p-8 border border-white/5 rounded-3xl relative overflow-hidden backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(5,5,5,0.7) 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 25px rgba(168,85,247,0.04)'
        }}
      >
        {/* Glow Element */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--accent-color, #a855f7)' }}
        />
        
        <div className="flex items-center gap-3.5 mb-4">
          <div 
            className="p-2.5 rounded-2xl" 
            style={{ backgroundColor: 'var(--accent-light, rgba(168,85,247,0.15))', border: '1px solid var(--accent-border, rgba(168,85,247,0.2))' }}
          >
            <svg className="w-6 h-6 text-[var(--accent-text,#c084fc)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-extrabold text-lg tracking-tight">Próximamente: Laboratorio de Código Práctico</h4>
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[var(--accent-light)] text-[var(--accent-text)] border border-[var(--accent-border)]">Área de Desarrollo</span>
          </div>
        </div>

        <p className="text-xs text-white/70 leading-relaxed mb-4 max-w-xl">
          Esta sección está reservada para las lecciones de código interactivo avanzadas. En las siguientes fases del portal, 
          crearemos cuadernos de laboratorio interactivos en tiempo real con terminales emuladas para programar scripts de 
          importación, diagramar regresiones en vivo y manipular DataFrames directamente en tu navegador.
        </p>

        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/50 font-mono">
            df.isna().sum()
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/50 font-mono">
            sns.heatmap(df.corr())
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/50 font-mono">
            model.fit(X_train, y_train)
          </div>
        </div>
      </div>
    </NoteLayout>
  );
}
