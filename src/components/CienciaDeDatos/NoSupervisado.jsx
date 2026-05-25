import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function NoSupervisado() {
  return (
    <NoteLayout
      title="5. Machine Learning: Aprendizaje No Supervisado"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Machine Learning", "No Supervisado", "Clustering", "K-Means", "PCA"]}
      previousNote={{
        label: "4. Machine Learning: Aprendizaje Supervisado",
        path: "/CienciaDeDatos/Supervisado",
      }}
      nextNote={{
        label: "6. Data Warehouse & ETL",
        path: "/CienciaDeDatos/DataWarehouse",
      }}
    >
      <div className="callout">
        El <strong>Aprendizaje No Supervisado</strong> trabaja con datos que no poseen etiquetas previas. Su propósito no es predecir un resultado concreto, sino descubrir patrones intrínsecos, agrupaciones naturales o estructuras ocultas dentro de la información.
      </div>

      <h2>¿Qué es el Aprendizaje No Supervisado?</h2>
      <p>
        A diferencia del aprendizaje supervisado, aquí no guiamos al modelo con respuestas correctas históricas. El algoritmo recibe únicamente 
        las características (features) y debe auto-organizar la información basándose en la distancia matemática entre los registros. 
        Las dos aplicaciones primordiales son el **Clustering (Agrupamiento)** y la **Reducción de Dimensionalidad**.
      </p>

      <h2>1. Algoritmos de Clustering (Agrupamiento)</h2>
      <p>
        El clustering busca clasificar las observaciones en subgrupos de tal manera que los elementos del mismo grupo tengan una alta similitud entre sí, 
        y una baja similitud con los elementos de otros grupos.
      </p>

      <h3>A. Algoritmo K-Means</h3>
      <p>
        Es el algoritmo de <Term id="clustering">clustering</Term> más popular y veloz. Funciona mediante un proceso iterativo:
      </p>
      <ol>
        <li>Definir previamente el valor de <strong>'K'</strong> (el número de grupos que deseamos crear).</li>
        <li>Colocar de forma aleatoria 'K' puntos llamados <strong>centroides</strong> en el espacio vectorial.</li>
        <li><strong>Asignación:</strong> Asociar cada registro del dataset al centroide más cercano.</li>
        <li><strong>Actualización:</strong> Recalcular la posición de cada centroide moviéndolo al centro geométrico (promedio) de todos los puntos asignados a su grupo.</li>
        <li>Repetir los pasos 3 y 4 secuencialmente hasta que los centroides dejen de cambiar de posición (convergencia).</li>
      </ol>

      <h4>El Método del Codo (Elbow Method)</h4>
      <p>
        Como K-Means requiere definir 'K' de antemano, se usa el Método del Codo para hallar el número óptimo de clusters. 
        Se entrena K-Means para múltiples 'K' (de 1 a 10) y se grafica la **Inercia** (suma de distancias al cuadrado de los puntos a su centroide). 
        Al graficarlo, la inercia disminuye abruptamente y luego se estabiliza; el punto donde la curva forma un "codo" claro indica el número ideal de clusters.
      </p>

      <h3>B. DBSCAN (Density-Based Spatial Clustering)</h3>
      <p>
        A diferencia de K-Means (que asume clusters esféricos y requiere fijar 'K'), <strong>DBSCAN</strong> agrupa puntos basándose en la densidad local de datos. 
        Es capaz de identificar formas geométricas complejas y aislar de forma nativa los valores que son ruido extremo (<Term id="outlier">outliers</Term>).
      </p>

      <h2>2. Reducción de Dimensionalidad: PCA</h2>
      <p>
        En Ciencia de Datos, trabajar con demasiadas columnas (características) puede provocar la <em>"maldición de la dimensionalidad"</em>: 
        los algoritmos se vuelven computacionalmente lentos, propensos a sobreajuste y la distancia entre puntos pierde su sentido geométrico.
      </p>
      <p>
        La técnica reina para mitigar esto es el <strong>Análisis de Componentes Principales (<Term id="pca">PCA</Term>)</strong>:
      </p>
      <ul>
        <li><strong>Proyección Matemática:</strong> Proyecta los datos de un espacio de alta dimensión (ej. 50 columnas) hacia una dimensión mucho menor (ej. 2 columnas).</li>
        <li><strong>Componentes Principales:</strong> Crea nuevas variables artificiales llamadas componentes principales que son combinaciones lineales de las originales.</li>
        <li><strong>Maximizar la Varianza:</strong> El primer componente captura la mayor variabilidad posible del dataset; el segundo componente captura la siguiente mayor cantidad de varianza ortogonal al primero, y así sucesivamente.</li>
        <li><strong>Visualización y Eficiencia:</strong> Permite graficar conjuntos de datos complejos en 2D y acelerar enormemente el tiempo de entrenamiento de modelos predictivos perdiendo un porcentaje mínimo de información.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Algoritmo</th>
            <th>Tipo</th>
            <th>Ventaja Principal</th>
            <th>Caso de Uso Típico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>K-Means</strong></td>
            <td>Clustering particional</td>
            <td>Rápido, escala muy bien a millones de registros.</td>
            <td>Segmentación clásica de clientes en marketing.</td>
          </tr>
          <tr>
            <td><strong>DBSCAN</strong></td>
            <td>Clustering por densidad</td>
            <td>No requiere fijar 'K', detecta ruido y formas complejas.</td>
            <td>Detección de anomalías en geolocalización.</td>
          </tr>
          <tr>
            <td><strong>PCA</strong></td>
            <td>Reducción de dimensión</td>
            <td>Simplifica modelos comprimiendo variables correlacionadas.</td>
            <td>Compresión de imágenes y preprocesamiento de características.</td>
          </tr>
        </tbody>
      </table>
    </NoteLayout>
  );
}
