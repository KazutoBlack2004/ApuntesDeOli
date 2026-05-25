import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function DataWarehouse() {
  return (
    <NoteLayout
      title="6. Data Warehouse & ETL"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Data Warehouse", "ETL", "OLAP", "Modelado Dimensional"]}
      previousNote={{
        label: "5. Machine Learning: Aprendizaje No Supervisado",
        path: "/CienciaDeDatos/NoSupervisado",
      }}
      nextNote={{
        label: "7. Big Data & Procesamiento Masivo",
        path: "/CienciaDeDatos/BigData",
      }}
    >
      <div className="callout">
        Un <Term id="data_warehouse">Data Warehouse (Almacén de Datos)</Term> es un sistema centralizado diseñado para consolidar y estructurar datos provenientes de múltiples orígenes transaccionales con el fin de realizar consultas analíticas rápidas y generar inteligencia de negocios.
      </div>

      <h2>Bases de Datos Transaccionales (OLTP) vs Analíticas (OLAP)</h2>
      <p>
        Para entender por qué se necesita un Data Warehouse, es vital diferenciar los dos tipos principales de sistemas de bases de datos:
      </p>
      <table>
        <thead>
          <tr>
            <th>Característica</th>
            <th>Sistemas OLTP (Transaccionales)</th>
            <th>Sistemas OLAP (Analíticos / Data Warehouse)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Propósito</strong></td>
            <td>Soportar la operación diaria del negocio en tiempo real.</td>
            <td>Facilitar el análisis histórico y la toma de decisiones.</td>
          </tr>
          <tr>
            <td><strong>Operaciones</strong></td>
            <td>Inserciones rápidas, actualizaciones y borrados constantes (CRUD).</td>
            <td>Lecturas masivas y complejas. Las actualizaciones son raras.</td>
          </tr>
          <tr>
            <td><strong>Estructura</strong></td>
            <td>Altamente normalizada (3ra Forma Normal) para evitar redundancias.</td>
            <td>Desnormalizada (esquemas de estrella) para acelerar consultas.</td>
          </tr>
          <tr>
            <td><strong>Ejemplo</strong></td>
            <td>Registrar un cobro en la caja registradora de un supermercado.</td>
            <td>Consultar las ventas anuales promedio por categoría de producto.</td>
          </tr>
        </tbody>
      </table>

      <h2>El Proceso ETL (Extraer, Transformar, Cargar)</h2>
      <p>
        Para alimentar un Data Warehouse se utiliza un <Term id="pipeline">pipeline</Term> automatizado conocido como **ETL** (o su variante moderna **ELT**):
      </p>
      <ol>
        <li><strong>Extraer (Extract):</strong> Conectarse a diversos orígenes (CRM, archivos planos, bases de datos SQL de producción, logs web) y extraer los datos necesarios.</li>
        <li><strong>Transformar (Transform):</strong> El paso más crítico. Limpiar duplicados, manejar campos nulos aplicando <Term id="imputacion">imputación</Term>, normalizar formatos de fechas, unificar monedas y realizar agregaciones necesarias.</li>
        <li><strong>Cargar (Load):</strong> Escribir e integrar de forma definitiva los datos limpios en la infraestructura del Data Warehouse.</li>
      </ol>
      <p>
        <em>Nota sobre ELT:</em> En entornos modernos en la nube, el almacenamiento es tan barato y los motores de bases de datos son tan rápidos que el orden cambia a <strong>ELT</strong>. Los datos se extraen y se cargan crudos en un lago de datos (Data Lake) y luego se transforman internamente.
      </p>

      <h2>Modelado Dimensional: Tablas de Hechos y Dimensiones</h2>
      <p>
        El diseño lógico de un Data Warehouse difiere del de bases de datos tradicionales y se basa en el **Modelado Dimensional**:
      </p>
      <ul>
        <li><strong>Tablas de Hechos (Fact Tables):</strong> Ubicadas en el centro del modelo. Contienen métricas cuantitativas numéricas medibles (ej. monto_venta, cantidad, descuento) y llaves foráneas que se conectan con las dimensiones. Representan eventos que ocurren en el negocio.</li>
        <li><strong>Tablas de Dimensiones (Dimension Tables):</strong> Rodean a la tabla de hechos. Contienen atributos descriptivos contextuales sobre el evento (ej. nombre_cliente, categoria_producto, sucursal, fecha completa).</li>
      </ul>

      <h2>Esquema en Estrella vs Copo de Nieve</h2>
      <p>
        Hay dos estructuras clásicas para organizar las dimensiones alrededor de la tabla de hechos:
      </p>

      <h3>1. Esquema en Estrella (Star Schema)</h3>
      <p>
        Es el modelo dimensional más simple. Cada dimensión está completamente desnormalizada en una única tabla directa.
      </p>
      <ul>
        <li><strong>Ventaja:</strong> Muy sencillo de entender y proporciona un rendimiento de consultas excepcionalmente rápido al requerir pocos JOINs lógicos.</li>
        <li><strong>Desventaja:</strong> Mayor redundancia de espacio al repetir descripciones categóricas en las tablas de dimensiones.</li>
      </ul>

      <h3>2. Esquema Copo de Nieve (Snowflake Schema)</h3>
      <p>
        Es una variante del esquema en estrella donde algunas tablas de dimensiones se normalizan dividiéndose en sub-tablas (ej. la dimensión <em>Producto</em> se conecta con una tabla externa <em>Subcategoría</em>, y esta a su vez a <em>Categoría</em>).
      </p>
      <ul>
        <li><strong>Ventaja:</strong> Reduce la redundancia de datos y ahorra almacenamiento.</li>
        <li><strong>Desventaja:</strong> Hace el modelo más complejo y ralentiza las consultas analíticas al exigir más uniones (JOINs) SQL para extraer el contexto del negocio.</li>
      </ul>
    </NoteLayout>
  );
}
