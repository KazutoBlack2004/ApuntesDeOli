import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function Supervisado() {
  const [modelType, setModelType] = useState("simple");
  const [trainingState, setTrainingState] = useState("idle"); // idle, training, finished
  const [consoleLogs, setConsoleLogs] = useState([]);
  
  const handleTrain = () => {
    setTrainingState("training");
    setConsoleLogs(["[INFO] Iniciando pipeline de entrenamiento..."]);
    
    // Simulate training phases step by step
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "[INFO] Cargando dataset sintético (N=1000)..."]);
    }, 250);
    
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "[INFO] Dividiendo datos: 80% Entrenamiento, 20% Prueba..."]);
    }, 500);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev, 
        modelType === "deep" 
          ? "[WARN] Entrenando Árbol de Decisión Profundo (max_depth=25)..." 
          : "[INFO] Entrenando Árbol de Decisión Simple (max_depth=3)..."
      ]);
    }, 750);

    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "[INFO] Minimizando función de pérdida de entropía cruzada..."]);
    }, 1000);

    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "[SUCCESS] ¡Entrenamiento completado y evaluado con éxito!"]);
      setTrainingState("finished");
    }, 1250);
  };

  // Performance outputs depending on chosen modelType
  const metrics = modelType === "deep" ? {
    trainAcc: "99.2%",
    testAcc: "76.4%",
    precision: "75.1%",
    recall: "72.8%",
    f1: "73.9%",
    tp: 364, tn: 400, fp: 120, fn: 116,
    isOverfitted: true
  } : {
    trainAcc: "85.4%",
    testAcc: "84.8%",
    precision: "84.2%",
    recall: "83.6%",
    f1: "83.9%",
    tp: 418, tn: 430, fp: 78, fn: 74,
    isOverfitted: false
  };

  return (
    <NoteLayout
      title="4. Machine Learning: Aprendizaje Supervisado"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Machine Learning", "Supervisado", "Regresión", "Clasificación", "Métricas"]}
      previousNote={{
        label: "3. Análisis Exploratorio de Datos (EDA)",
        path: "/CienciaDeDatos/EDA",
      }}
      nextNote={{
        label: "5. Machine Learning: Aprendizaje No Supervisado",
        path: "/CienciaDeDatos/NoSupervisado",
      }}
    >
      <div className="callout">
        El <strong>Aprendizaje Supervisado</strong> consiste en entrenar un modelo a partir de datos etiquetados (donde conocemos la respuesta correcta previa). El objetivo del algoritmo es encontrar la función matemática que mapea las características de entrada con el objetivo de salida.
      </div>

      <h2>Tareas Principales: Regresión vs Clasificación</h2>
      <p>
        Los algoritmos supervisados se dividen en dos familias según el tipo de variable que deseamos predecir:
      </p>

      <h3>1. Regresión (Variables Continuas)</h3>
      <p>
        Se utiliza cuando la salida buscada es un número real continuo (ej. predecir precios, temperatura, tiempo).
      </p>
      <ul>
        <li><strong>Regresión Lineal Simple:</strong> Ajusta una línea recta (<code>y = mx + b</code>) minimizando la distancia de todos los puntos al vector de regresión (mínimos cuadrados ordinarios).</li>
        <li><strong>Regresión Polinomial:</strong> Agrega curvatura matemática para modelar relaciones no lineales de mayor complejidad.</li>
      </ul>

      <h3>2. Clasificación (Variables Categóricas)</h3>
      <p>
        Se utiliza cuando la salida pertenece a clases discretas o categorías (ej. decidir si una transacción es fraude o no).
      </p>
      <ul>
        <li><strong>Regresión Logística:</strong> A pesar de su nombre, se usa para clasificación binaria aplicando la función sigmoide para retornar una probabilidad entre 0 y 1.</li>
        <li><strong>K-Nearest Neighbors (KNN):</strong> Clasifica un punto nuevo basándose en la clase mayoritaria de sus 'K' vecinos más cercanos en el espacio vectorial.</li>
        <li><strong>Árboles de Decisión:</strong> Divide el espacio de datos en ramas jerárquicas usando condiciones lógicas de sí/no basadas en la pureza de la división (Índice Gini o Entropía).</li>
      </ul>

      {/* Interactive Machine Learning Simulator */}
      <div className="my-8 p-5 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--accent-color, #a855f7)', boxShadow: '0 0 10px var(--accent-color)' }} />
          Simulador Interactivo de Entrenamiento de Modelos
        </h3>
        <p className="text-xs text-white/60 mb-5">
          Elige los hiperparámetros del Árbol de Decisión, presiona entrenar y observa cómo afecta la complejidad al rendimiento general y la propensión al sobreajuste.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Hyperparameter Controls */}
          <div className="space-y-4 p-4 bg-black/30 rounded-xl border border-white/5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Parámetros del Árbol</h4>
            
            <div className="space-y-2">
              <label className="text-[11px] text-white/50 block">Profundidad del Árbol (max_depth)</label>
              <div className="flex gap-2">
                <button
                  disabled={trainingState === "training"}
                  onClick={() => { setModelType("simple"); setTrainingState("idle"); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    modelType === "simple"
                      ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                      : "bg-black/40 border-white/5 text-white/50 hover:border-white/15"
                  }`}
                >
                  3 (Simple)
                </button>
                <button
                  disabled={trainingState === "training"}
                  onClick={() => { setModelType("deep"); setTrainingState("idle"); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    modelType === "deep"
                      ? "bg-[var(--accent-light)] border-[var(--accent-color)] text-[var(--accent-text)]"
                      : "bg-black/40 border-white/5 text-white/50 hover:border-white/15"
                  }`}
                >
                  25 (Profundo)
                </button>
              </div>
            </div>

            <button
              onClick={handleTrain}
              disabled={trainingState === "training"}
              className="w-full py-2 bg-[var(--accent-color,#a855f7)] text-white hover:opacity-90 transition-opacity font-bold rounded-lg text-xs shadow-lg cursor-pointer disabled:opacity-50"
            >
              {trainingState === "training" ? "Entrenando..." : "Entrenar Modelo ⚙️"}
            </button>
          </div>

          {/* Simulated Logs Console */}
          <div className="md:col-span-2 p-4 bg-black/70 rounded-xl border border-white/5 font-mono text-[10px] text-green-400 flex flex-col justify-between min-h-[140px] shadow-inner">
            <div className="space-y-1.5 overflow-y-auto max-h-[120px]">
              <span className="text-white/30 block mb-1">=== Consola de Entrenamiento ===</span>
              {consoleLogs.length === 0 ? (
                <span className="text-white/40 italic">Esperando que inicie el entrenamiento del modelo...</span>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div key={idx} className={log.includes("[WARN]") ? "text-yellow-400" : log.includes("[SUCCESS]") ? "text-purple-300 font-bold" : "text-green-400"}>
                    {log}
                  </div>
                ))
              )}
            </div>
            {trainingState === "training" && (
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-[var(--accent-color)] animate-[pulse_1s_infinite]" style={{ width: '100%' }} />
              </div>
            )}
          </div>
        </div>

        {/* Results and Metrics */}
        {trainingState === "finished" && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Resultados y Evaluación del Modelo</h4>
            
            {metrics.isOverfitted && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-xl flex items-start gap-2.5">
                <span className="text-lg">⚠️</span>
                <div>
                  <strong>¡Alerta de <Term id="overfitting">Sobreajuste (Overfitting)</Term> detectada!</strong> El árbol es demasiado profundo y ha memorizado el ruido de entrenamiento. Observa cómo la exactitud de entrenamiento es de casi 100%, pero se desploma al evaluar datos reales de prueba.
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-white/45 block">Exactitud Entrenamiento</span>
                <span className="text-lg font-bold text-white">{metrics.trainAcc}</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-white/45 block">Exactitud Prueba (Test)</span>
                <span className="text-lg font-bold text-[var(--accent-text)]">{metrics.testAcc}</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-white/45 block">Precisión</span>
                <span className="text-lg font-bold text-white">{metrics.precision}</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-white/45 block">Sensibilidad (Recall)</span>
                <span className="text-lg font-bold text-white">{metrics.recall}</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center col-span-2 md:col-span-1">
                <span className="text-[10px] text-white/45 block">F1-Score</span>
                <span className="text-lg font-bold text-[var(--accent-text)]">{metrics.f1}</span>
              </div>
            </div>

            {/* Confusion Matrix */}
            <div>
              <span className="text-[11px] text-white/50 block mb-2 font-semibold">Matriz de Confusión Resultante (Datos de Test):</span>
              <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20 max-w-md">
                <table className="w-full text-center border-collapse m-0 text-xs">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--accent-light)' }}>
                      <th className="p-2.5 text-white/40 font-bold uppercase tracking-wider text-[10px]">Real \ Predicho</th>
                      <th className="p-2.5 text-[var(--accent-text)] font-bold uppercase tracking-wider text-[10px]">Prediccion Negativo (0)</th>
                      <th className="p-2.5 text-[var(--accent-text)] font-bold uppercase tracking-wider text-[10px]">Prediccion Positivo (1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-2.5 font-bold text-white/50 bg-white/5 text-[10px] uppercase">Clase Negativa (0)</td>
                      <td className="p-4">
                        <span className="block font-bold text-white">{metrics.tn}</span>
                        <span className="text-[9px] text-white/30 block font-mono">Verdadero Negativo (TN)</span>
                      </td>
                      <td className="p-4 bg-red-500/5">
                        <span className="block font-bold text-red-400">{metrics.fp}</span>
                        <span className="text-[9px] text-red-400/40 block font-mono">Falso Positivo (FP)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2.5 font-bold text-white/50 bg-white/5 text-[10px] uppercase">Clase Positiva (1)</td>
                      <td className="p-4 bg-red-500/5">
                        <span className="block font-bold text-red-400">{metrics.fn}</span>
                        <span className="text-[9px] text-red-400/40 block font-mono">Falso Negativo (FN)</span>
                      </td>
                      <td className="p-4 bg-green-500/5">
                        <span className="block font-bold text-green-400">{metrics.tp}</span>
                        <span className="text-[9px] text-green-400/40 block font-mono">Verdadero Positivo (TP)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2>Métricas de Evaluación Clave</h2>
      
      <h3>Para Regresión</h3>
      <ul>
        <li><strong>Error Cuadrático Medio (MSE):</strong> Mide el promedio de los errores al cuadrado. Castiga significativamente los errores grandes debido a la elevación cuadrática.</li>
        <li><strong>Coeficiente de Determinación (R²):</strong> Proporción de la varianza total explicada por el modelo de regresión. Varía de 0 a 1 (100% de la varianza explicada).</li>
      </ul>

      <h3>Para Clasificación</h3>
      <ul>
        <li><strong>Exactitud (Accuracy):</strong> Proporción de predicciones correctas totales entre el total de muestras analizadas. Puede ser engañosa en <Term id="dataset">datasets</Term> desbalanceados.</li>
        <li><strong>Precisión (Precision):</strong> De todos los elementos predichos como positivos, cuántos eran realmente correctos. Clave cuando el costo de un falso positivo es alto.</li>
        <li><strong>Sensibilidad (Recall / TPR):</strong> De todos los elementos positivos reales, cuántos logramos capturar correctamente. Clave en medicina y ciberseguridad.</li>
        <li><strong>F1-Score:</strong> Media armónica que equilibra la Precisión y el Recall en un único estadístico de comparación.</li>
      </ul>
    </NoteLayout>
  );
}
