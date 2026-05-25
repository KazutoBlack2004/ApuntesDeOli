import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function BusinessIntelligence() {
  return (
    <NoteLayout
      title="8. Inteligencia de Negocios (BI)"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["BI", "Business Intelligence", "Dashboards", "KPIs"]}
      previousNote={{
        label: "7. Big Data & Procesamiento Masivo",
        path: "/CienciaDeDatos/BigData",
      }}
      nextNote={{
        label: "9. Python & Operaciones",
        path: "/CienciaDeDatos/PythonOperaciones",
      }}
    >
      <div className="callout">
        La <Term id="business_intelligence">Inteligencia de Negocios (BI)</Term> abarca las estrategias, metodologías y 
        tecnologías que utilizan las empresas para consolidar, analizar y presentar datos históricos en paneles visuales (dashboards) 
        con el fin de guiar la toma de decisiones estratégicas.
      </div>

      <h2>El Propósito de Business Intelligence</h2>
      <p>
        El objetivo principal de BI es responder a preguntas cruciales de la gestión corporativa del día a día: 
        <em>"¿Qué sucedió en las ventas del último trimestre?", "¿Qué tiendas están rindiendo por debajo de su meta?", 
        "¿Cuáles son nuestros clientes más rentables?"</em>. BI traduce miles de millones de filas almacenadas en un 
        <Term id="data_warehouse">Data Warehouse</Term> en cuadros de mando interactivos que los gerentes y directores comerciales pueden interpretar con un solo vistazo.
      </p>

      <h2>KPIs (Key Performance Indicators)</h2>
      <p>
        Un <Term id="kpi">KPI (Indicador Clave de Rendimiento)</Term> es una métrica cuantificable que refleja el éxito 
        o la efectividad de una empresa frente a un objetivo de negocio establecido.
      </p>
      <ul>
        <li><strong>S.M.A.R.T:</strong> Los buenos KPIs deben ser Específicos (Specific), Medibles (Measurable), Alcanzables (Achievable), Relevantes (Relevant) y con un límite de tiempo definido (Time-bound).</li>
        <li><strong>Ejemplos comunes:</strong> Costo de Adquisición de Clientes (CAC), Tasa de Retención de Clientes (Retention Rate), Margen de Utilidad Neta, Ingresos Mensuales Recurrentes (MRR).</li>
      </ul>

      <h2>Dashboards e Informes Interactivos</h2>
      <p>
        Los dashboards son la cara visible de BI. Consisten en cuadros de mando gráficos que consolidan métricas clave y permiten realizar filtrados dinámicos por tiempo, región o tipo de producto. Las herramientas líderes de la industria para construirlos son:
      </p>
      <ul>
        <li><strong>Microsoft Power BI:</strong> Altamente integrado en el ecosistema Windows/Azure, utiliza el potente lenguaje DAX para cálculos personalizados y consultas analíticas rápidas sobre modelos dimensionales.</li>
        <li><strong>Tableau (Salesforce):</strong> Reconocido por sus avanzadas capacidades de visualización estética y facilidad para realizar exploración interactiva de datos mediante drag-and-drop.</li>
      </ul>

      <h2>Diferencias Clave: BI vs Ciencia de Datos</h2>
      <p>
        A menudo ambos términos se confunden en las empresas, pero tienen enfoques analíticos complementarios y cronológicamente distintos:
      </p>
      <table>
        <thead>
          <tr>
            <th>Dimensión de Comparación</th>
            <th>Inteligencia de Negocios (BI)</th>
            <th>Ciencia de Datos (Data Science)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Perspectiva Temporal</strong></td>
            <td><strong>El Pasado y Presente:</strong> Análisis retrospectivo de datos históricos históricos.</td>
            <td><strong>El Futuro:</strong> Análisis prospectivo para predecir tendencias o estimar probabilidades.</td>
          </tr>
          <tr>
            <td><strong>Pregunta Clave</strong></td>
            <td><em>¿Qué pasó?, ¿cuándo ocurrió?, ¿con qué frecuencia?</em></td>
            <td><em>¿Qué pasará?, ¿cómo podemos optimizarlo?, ¿por qué ocurrió?</em></td>
          </tr>
          <tr>
            <td><strong>Tipo de Análisis</strong></td>
            <td>Análisis Descriptivo y de Diagnóstico.</td>
            <td>Análisis Predictivo, Prescriptivo e Inteligencia Artificial.</td>
          </tr>
          <tr>
            <td><strong>Herramientas Primordiales</strong></td>
            <td>Dashboards, consultas SQL, modelos dimensionales en estrella, Power BI, Tableau.</td>
            <td>Python, R, Jupyter Notebooks, frameworks de Machine Learning (<Term id="supervisado">Scikit-learn</Term>, Tensorflow).</td>
          </tr>
          <tr>
            <td><strong>Naturaleza de Datos</strong></td>
            <td>Principalmente datos estructurados provenientes de bases de datos internas.</td>
            <td>Datos estructurados, semiestructurados y no estructurados de cualquier origen.</td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        Tanto BI como Data Science son dos caras de la misma moneda analítica. Mientras que BI te muestra con total claridad dónde se encuentra el barco de la empresa hoy basándose en la bitácora del viaje, la Ciencia de Datos te provee el radar predictivo para estimar las tormentas de mañana y optimizar la ruta de navegación.
      </div>
    </NoteLayout>
  );
}
