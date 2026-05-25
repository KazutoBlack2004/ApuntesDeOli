import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function BigData() {
  return (
    <NoteLayout
      title="7. Big Data & Procesamiento Masivo"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Big Data", "Hadoop", "Spark", "MapReduce"]}
      previousNote={{
        label: "6. Data Warehouse & ETL",
        path: "/CienciaDeDatos/DataWarehouse",
      }}
      nextNote={{
        label: "8. Inteligencia de Negocios (BI)",
        path: "/CienciaDeDatos/BusinessIntelligence",
      }}
    >
      <div className="callout">
        El ecosistema de <Term id="big_data">Big Data</Term> surge cuando los volúmenes, la velocidad de llegada y la variedad 
        de los datos superan la capacidad de procesamiento y almacenamiento físico de un único servidor tradicional, obligándonos 
        a adoptar arquitecturas distribuidas basadas en clusters de computadoras.
      </div>

      <h2>Las 5 V's del Big Data</h2>
      <p>
        Para definir si un conjunto de datos califica como Big Data, la industria utiliza un conjunto de dimensiones llamadas las "5 V's":
      </p>
      <ul>
        <li><strong>Volumen:</strong> La inmensa cantidad de información generada cada segundo (escala de Terabytes, Petabytes o Exabytes).</li>
        <li><strong>Velocidad:</strong> La rapidez con la que se crean y reciben los datos en tiempo real (ej. streaming de sensores de IoT o feeds de redes sociales).</li>
        <li><strong>Variedad:</strong> Los diversos formatos y estructuras de los datos: estructurados (tablas SQL), semiestructurados (JSON, XML) y no estructurados (videos, imágenes, audios).</li>
        <li><strong>Veracidad:</strong> La calidad y confiabilidad de los datos recolectados. Limpiar el ruido para asegurar que la información sea fidedigna.</li>
        <li><strong>Valor:</strong> La utilidad real que aporta esta información masiva al negocio. De nada sirve almacenar Petabytes si no se traducen en insights valiosos.</li>
      </ul>

      <h2>El Ecosistema Clásico: Apache Hadoop</h2>
      <p>
        <Term id="hadoop">Apache Hadoop</Term> fue el framework pionero que popularizó la computación distribuida de bajo costo usando hardware convencional. Consta de dos componentes fundamentales:
      </p>

      <h3>1. HDFS (Hadoop Distributed File System)</h3>
      <p>
        Un sistema de archivos distribuido que divide los archivos masivos en bloques más pequeños (por defecto 128 MB) y los distribuye de forma redundante a lo largo de múltiples nodos en un cluster. Esto previene la pérdida de datos ante el fallo físico de cualquier computadora individual.
      </p>

      <h3>2. MapReduce</h3>
      <p>
        Es un paradigma de programación distribuida que procesa los datos en paralelo dividiendo el trabajo en dos etapas principales:
      </p>
      <ul>
        <li><strong>Map:</strong> Los nodos del cluster toman porciones locales de los datos distribuidos y aplican una función de filtrado o extracción para producir pares clave-valor intermedios.</li>
        <li><strong>Reduce:</strong> Agrupa y consolida todos los resultados intermedios ordenados por clave para generar el resultado final unificado.</li>
      </ul>

      <h2>El Motor Moderno: Apache Spark</h2>
      <p>
        Aunque robusto, Hadoop MapReduce tiene una gran limitación: escribe constantemente resultados intermedios en el disco duro físico (HDFS), lo cual ralentiza las operaciones iterativas complejas.
      </p>
      <p>
        Para resolver esto surgió <Term id="spark">Apache Spark</Term>:
      </p>
      <ul>
        <li><strong>Procesamiento en Memoria (In-Memory Processing):</strong> Spark mantiene los datos intermedios en la memoria RAM del cluster en lugar de escribir continuamente en disco. Esto hace que sea hasta <strong>100 veces más rápido</strong> que Hadoop MapReduce para tareas interactivas y entrenamiento de algoritmos de <Term id="machine_learning">Machine Learning</Term> distribuido.</li>
        <li><strong>Resilient Distributed Datasets (RDDs):</strong> La estructura base de Spark, que representa una colección de datos de solo lectura distribuida a lo largo de los nodos del cluster que puede recuperarse automáticamente ante fallos.</li>
        <li><strong>DataFrames Distribuidos:</strong> Abstracción de alto nivel similar a los DataFrames de Pandas, pero distribuida a escala Petabyte.</li>
      </ul>

      <h2>Arquitecturas de Procesamiento en Tiempo Real</h2>
      <p>
        En Big Data se diseñan arquitecturas de flujos para integrar el procesamiento por lotes (Batch) e inmediato (Streaming):
      </p>
      <ul>
        <li><strong>Arquitectura Lambda:</strong> Divide el flujo en dos caminos paralelos. Una capa rápida (speed layer) para análisis inmediato de baja latencia con procesamiento en streaming, y una capa por lotes (batch layer) que almacena de forma definitiva toda la información para cálculos históricos pesados de alta precisión.</li>
        <li><strong>Arquitectura Kappa:</strong> Simplifica el modelo eliminando la capa batch por completo. Absolutamente todos los datos se tratan como un flujo de eventos continuo (Streaming), y las consultas históricas se resuelven volviendo a procesar la cola de mensajes del flujo.</li>
      </ul>
    </NoteLayout>
  );
}
