import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function Introduccion() {
  return (
    <NoteLayout
      title="1. Introducción a la Ciencia de Datos"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Data Science", "Pipeline", "CRISP-DM", "OSEMN"]}
      nextNote={{
        label: "2. Manipulación de Datos (Pandas & NumPy)",
        path: "/CienciaDeDatos/PandasNumPy",
      }}
    >
      <div className="callout">
        La <Term id="ciencia_de_datos">Ciencia de Datos</Term> es un campo interdisciplinario que combina matemáticas, 
        estadística, programación especializada y experiencia de dominio para extraer insights y conocimiento de valor a partir de los datos.
      </div>

      <h2>¿Qué es la Ciencia de Datos?</h2>
      <p>
        Hoy en día, las organizaciones están inundadas de datos de todo tipo. El propósito de la Ciencia de Datos no es simplemente recolectar 
        información, sino transformarla en decisiones estratégicas. Para lograrlo, los científicos de datos combinan habilidades de programación 
        para extraer y manipular datos, rigor matemático para entrenar modelos predictivos de <Term id="machine_learning">Machine Learning</Term>, 
        y capacidad de comunicación para explicar hallazgos comerciales.
      </p>

      <h2>El Ciclo de Vida de los Datos: Flujos de Trabajo</h2>
      <p>
        Para llevar a cabo un proyecto de análisis de forma rigurosa se emplean metodologías estándar. Las dos más influyentes en la industria son:
      </p>

      <h3>1. Metodología CRISP-DM</h3>
      <p>
        Es el acrónimo de <em>Cross-Industry Standard Process for Data Mining</em>. Es un proceso iterativo dividido en 6 fases fundamentales:
      </p>
      <ul>
        <li><strong>Comprensión del Negocio (Business Understanding):</strong> Definir el problema comercial, los objetivos del proyecto y los criterios de éxito.</li>
        <li><strong>Comprensión de los Datos (Data Understanding):</strong> Recolectar datos iniciales, explorar su estructura básica y evaluar su calidad.</li>
        <li><strong>Preparación de los Datos (Data Preparation):</strong> Seleccionar, limpiar, transformar y formatear los datos en un <Term id="dataset">dataset</Term> final. Es una de las etapas que más tiempo consume.</li>
        <li><strong>Modelado (Modeling):</strong> Seleccionar y aplicar diversas técnicas y algoritmos de modelado predictivo o de segmentación.</li>
        <li><strong>Evaluación (Evaluation):</strong> Analizar los modelos frente a los objetivos comerciales para asegurar que resuelven el problema original.</li>
        <li><strong>Despliegue (Deployment):</strong> Implementar el modelo en un entorno de producción para que empiece a aportar valor en la toma de decisiones diarias.</li>
      </ul>

      <h3>2. El Framework OSEMN</h3>
      <p>
        Es un pipeline lineal y práctico muy popular en la comunidad de ciencia de datos moderna:
      </p>
      <table>
        <thead>
          <tr>
            <th>Fase</th>
            <th>Acción</th>
            <th>Propósito principal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>O</strong> - Obtain</td>
            <td>Obtener</td>
            <td>Extraer datos de bases de datos, APIs, archivos CSV o mediante Web Scraping.</td>
          </tr>
          <tr>
            <td><strong>S</strong> - Scrub</td>
            <td>Limpiar</td>
            <td>Filtrar ruidos, eliminar duplicados, corregir tipos de datos y manejar datos faltantes (<Term id="imputacion">imputación</Term>).</td>
          </tr>
          <tr>
            <td><strong>E</strong> - Explore</td>
            <td>Explorar</td>
            <td>Realizar un <Term id="eda">Análisis Exploratorio de Datos (EDA)</Term> para identificar correlaciones, tendencias y anomalías.</td>
          </tr>
          <tr>
            <td><strong>M</strong> - Model</td>
            <td>Modelar</td>
            <td>Entrenar algoritmos de <Term id="supervisado">aprendizaje supervisado</Term> o <Term id="no-supervisado">no supervisado</Term>.</td>
          </tr>
          <tr>
            <td><strong>N</strong> - iNterpret</td>
            <td>Interpretar</td>
            <td>Traducir resultados matemáticos en conclusiones de negocio digeribles mediante visualizaciones claras.</td>
          </tr>
        </tbody>
      </table>

      <h2>Habilidades del Científico de Datos</h2>
      <p>
        El perfil clásico de un científico de datos se resume en el famoso diagrama de Venn compuesto por:
      </p>
      <ul>
        <li><strong>Ciencias de la Computación:</strong> Habilidad para escribir código estructurado en Python/R, manejar bases de datos SQL e interactuar con infraestructuras de almacenamiento analítico.</li>
        <li><strong>Matemáticas y Estadística:</strong> Comprensión profunda de distribuciones probabilísticas, álgebra lineal para procesamiento matricial y algoritmos numéricos.</li>
        <li><strong>Conocimiento del Dominio:</strong> Saber realizar las preguntas correctas para que el análisis de datos resuelva problemas reales de la empresa o investigación.</li>
      </ul>

      <div className="callout">
        En el siguiente apunte exploraremos la base práctica del análisis de datos en Python: el uso de <strong>NumPy</strong> para cálculo matricial rápido y <strong>Pandas</strong> para la manipulación intuitiva de tablas de datos estructurados.
      </div>
    </NoteLayout>
  );
}
