import React from "react";
import NoteLayout from "../NoteLayout.jsx";

export default function UnidadesDeInformacion() {
  return (
    <NoteLayout
      title="Unidades de información"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["Bit", "Byte", "Nomenclatura", "Almacenamiento"]}
    >
      <div className="callout">
        Las unidades de información permiten medir datos: desde un valor mínimo
        como un bit hasta cantidades enormes usadas en almacenamiento,
        transferencia de datos y sistemas distribuidos.
      </div>

      <h2>Bit</h2>
      <p>
        El <strong>bit</strong> es la unidad mínima de información. Puede tener
        solo dos valores: <code>0</code> o <code>1</code>.
      </p>

      <h2>Byte u octeto</h2>
      <p>
        Un <strong>byte</strong>, también llamado <strong>octeto</strong>, está
        formado por 8 bits. Por ejemplo, una letra en texto simple puede ocupar
        aproximadamente 1 byte.
      </p>

      <pre><code>{`1 byte = 8 bits
1 octeto = 8 bits`}</code></pre>

      <h2>Unidades principales</h2>
      <table>
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Símbolo</th>
            <th>Equivalencia decimal</th>
            <th>Ejemplo aproximado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bit</td>
            <td>bit</td>
            <td>0 o 1</td>
            <td>Un estado encendido/apagado</td>
          </tr>
          <tr>
            <td>Byte</td>
            <td>B</td>
            <td>8 bits</td>
            <td>Un carácter de texto simple</td>
          </tr>
          <tr>
            <td>Kilobyte</td>
            <td>KB</td>
            <td>1.000 bytes</td>
            <td>Un texto corto</td>
          </tr>
          <tr>
            <td>Megabyte</td>
            <td>MB</td>
            <td>1.000 KB</td>
            <td>Una imagen o canción comprimida</td>
          </tr>
          <tr>
            <td>Gigabyte</td>
            <td>GB</td>
            <td>1.000 MB</td>
            <td>Un video, juego pequeño o aplicación</td>
          </tr>
          <tr>
            <td>Terabyte</td>
            <td>TB</td>
            <td>1.000 GB</td>
            <td>Un disco de almacenamiento actual</td>
          </tr>
          <tr>
            <td>Petabyte</td>
            <td>PB</td>
            <td>1.000 TB</td>
            <td>Grandes centros de datos</td>
          </tr>
          <tr>
            <td>Exabyte</td>
            <td>EB</td>
            <td>1.000 PB</td>
            <td>Datos a escala global</td>
          </tr>
          <tr>
            <td>Zettabyte</td>
            <td>ZB</td>
            <td>1.000 EB</td>
            <td>Tráfico masivo de internet</td>
          </tr>
          <tr>
            <td>Yottabyte</td>
            <td>YB</td>
            <td>1.000 ZB</td>
            <td>Escalas extremadamente grandes</td>
          </tr>
        </tbody>
      </table>

      <h2>Decimal y binario</h2>
      <p>
        En almacenamiento comercial normalmente se usa el sistema decimal:
        <code>1 KB = 1.000 bytes</code>. En computación también existe la
        nomenclatura binaria, donde se usan potencias de 2.
      </p>

      <ul>
        <li><code>1 KB</code> equivale a 1.000 bytes</li>
        <li><code>1 KiB</code> equivale a 1.024 bytes</li>
        <li><code>1 MB</code> equivale a 1.000.000 bytes</li>
        <li><code>1 MiB</code> equivale a 1.048.576 bytes</li>
      </ul>

      <h2>Ejemplo rápido</h2>
      <p>
        Si un archivo pesa <code>5 MB</code>, significa que ocupa
        aproximadamente cinco millones de bytes. Si cada byte tiene 8 bits,
        entonces ese archivo contiene alrededor de cuarenta millones de bits.
      </p>

      <pre><code>{`5 MB ≈ 5.000.000 bytes
5.000.000 bytes x 8 bits = 40.000.000 bits`}</code></pre>
    </NoteLayout>
  );
}
