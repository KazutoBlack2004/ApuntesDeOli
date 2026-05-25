import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function EDA() {
  return (
    <NoteLayout
      title="3. Análisis Exploratorio de Datos (EDA)"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["EDA", "Estadística", "Visualización", "Matplotlib", "Seaborn"]}
      previousNote={{
        label: "2. Manipulación de Datos (Pandas & NumPy)",
        path: "/CienciaDeDatos/PandasNumPy",
      }}
      nextNote={{
        label: "4. Machine Learning: Aprendizaje Supervisado",
        path: "/CienciaDeDatos/Supervisado",
      }}
    >
      <div className="callout">
        El <strong>Análisis Exploratorio de Datos (EDA)</strong> es el proceso sistemático de investigar un <Term id="dataset">dataset</Term> antes de modelarlo, resumiendo sus características estadísticas y usando visualizaciones para entender distribuciones, correlaciones e identificar anomalías.
      </div>

      <h2>¿Por qué es Crucial el EDA?</h2>
      <p>
        En Ciencia de Datos existe una regla de oro: <em>"Garbage in, Garbage out"</em> (Si entra basura, sale basura). Si entrenas un modelo 
        predictivo complejo con datos sesgados, nulos mal manejados o atípicos extremos, el modelo dará respuestas inútiles o erróneas. 
        El <Term id="eda">EDA</Term> permite conocer a fondo la estructura interna de los datos y validar hipótesis comerciales antes de programar algoritmos predictivos.
      </p>

      <h2>1. Clasificación de Variables</h2>
      <p>
        El primer paso en un análisis exploratorio consiste en clasificar las columnas según el tipo de datos que almacenan:
      </p>
      <ul>
        <li><strong>Variables Numéricas Continuas:</strong> Valores infinitos medibles (ej. salario, altura, temperatura).</li>
        <li><strong>Variables Numéricas Discretas:</strong> Conteos enteros (ej. cantidad de hijos, número de visitas).</li>
        <li><strong>Variables Categóricas Nominales:</strong> Etiquetas sin orden lógico (ej. género, país de residencia, color favorito).</li>
        <li><strong>Variables Categóricas Ordinales:</strong> Categorías con una jerarquía u orden implícito (ej. nivel educativo, rango militar, satisfacción del cliente).</li>
      </ul>

      <h2>2. Tratamiento de Datos Nulos</h2>
      <p>
        Los valores faltantes representan uno de los problemas más comunes en la práctica debido a fallos de sistemas o encuestas incompletas. 
        Las estrategias para manejarlos son:
      </p>
      <table>
        <thead>
          <tr>
            <th>Estrategia</th>
            <th>Técnica</th>
            <th>Cuándo Usarla</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Eliminación (Drop)</strong></td>
            <td><code>df.dropna()</code></td>
            <td>Cuando el volumen de filas nulas es mínimo (&lt; 2%) y no sesga la muestra.</td>
          </tr>
          <tr>
            <td><strong>Imputación Simple</strong></td>
            <td><code>df.fillna(df.mean())</code></td>
            <td>Reemplazar por la media (distribuciones normales) o la mediana (distribuciones sesgadas o con outliers).</td>
          </tr>
          <tr>
            <td><strong>Imputación Categórica</strong></td>
            <td>Reemplazo por la Moda</td>
            <td>Llenar campos categóricos con la etiqueta más frecuente en el conjunto.</td>
          </tr>
          <tr>
            <td><strong>Imputación Avanzada</strong></td>
            <td>Imputación por Modelos (KNN)</td>
            <td>Usar algoritmos que estimen los valores nulos basándose en registros similares de otros campos.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Detección de Valores Atípicos (Outliers)</h2>
      <p>
        Un <Term id="outlier">outlier</Term> es una observación numérica que se aleja de forma anómala del resto de observaciones. 
        La técnica estadística clásica para detectarlos es el **Método del Rango Intercuartílico (IQR)**:
      </p>
      <ol>
        <li>Calcular el <strong>Cuartil 1 (Q1)</strong> (percentil 25) y el <strong>Cuartil 3 (Q3)</strong> (percentil 75).</li>
        <li>Obtener el rango intercuartil: <code>IQR = Q3 - Q1</code>.</li>
        <li>Definir los límites inferior y superior aceptables:
          <pre><code>{`Límite Inferior = Q1 - 1.5 * IQR
Límite Superior = Q3 + 1.5 * IQR`}</code></pre>
        </li>
        <li>Cualquier observación que se encuentre fuera de este intervalo cerrado se considera un valor atípico y se evalúa su eliminación o imputación.</li>
      </ol>

      <h2>4. Visualizaciones Estadísticas Clave</h2>
      <p>
        El EDA se apoya firmemente en representaciones gráficas mediante librerías de Python como <em>Matplotlib</em> y <em>Seaborn</em>:
      </p>
      
      <h3>Histograma</h3>
      <p>
        Representa la distribución de frecuencias de una única variable continua. Ayuda a identificar la simetría y si los datos siguen una campana de Gauss normal.
      </p>

      <h3>Diagrama de Cajas (Boxplot)</h3>
      <p>
        Es la representación gráfica directa del método del IQR. Muestra la mediana, cuartiles Q1 y Q3, mínimos, máximos y dibuja de forma aislada (generalmente como pequeños círculos) los valores atípicos detectados.
      </p>

      <h3>Gráfico de Dispersión (Scatter Plot)</h3>
      <p>
        Muestra la relación mutua entre dos variables numéricas continuas. Permite discernir si existe una relación lineal, cuadrática o ausencia total de correlación.
      </p>

      <h3>Mapa de Calor de Correlación (Correlation Heatmap)</h3>
      <p>
        Muestra una matriz de correlaciones (usualmente de Pearson) entre todas las variables cuantitativas del DataFrame. Los coeficientes varían de <code>-1</code> (correlación negativa perfecta), pasando por <code>0</code> (sin relación), hasta <code>+1</code> (correlación positiva perfecta).
      </p>

      <div className="callout">
        Una vez que hemos limpiado y entendido a fondo la naturaleza y correlación de los datos mediante el EDA, estamos listos para alimentar los algoritmos predictivos del <strong>Aprendizaje Supervisado</strong>.
      </div>
    </NoteLayout>
  );
}
