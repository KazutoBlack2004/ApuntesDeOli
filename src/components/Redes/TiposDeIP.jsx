import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";


export default function TiposDeIP() {
  return (
    <NoteLayout
      title="Tipos de Direcciones IP"
      category="Redes"
      categoryPath="/Redes"
      tags={["IPv4", "IPv6", "Networking", "Protocolos"]}
      nextNote={{
        label: "Máscara de red y gateway",
        path: "/Redes/MascaraGateway",
      }}
    >

      {/* ── TU CONTENIDO AQUÍ ─────────────────────────────── */}

      <div className="callout">
        Para entender una dirección <Term id="ip">IP</Term>, primero conviene tener claro qué es un{" "}
        <Term id="bit">bit</Term> y qué es un <Term id="octeto">octeto</Term>. Esos conceptos son la base para comprender cómo
        se construye una dirección <Term id="ip">IPv4</Term>.
      </div>

      <h2>Conceptos básicos</h2>

      <h3>Bit</h3>
      <p>
        En una red, un bit puede representar la transmisión o recepción de un
        paquete de datos.
        <strong><Term id="bit">bit</Term></strong> es la unidad mínima de información en
        computación. Puede tener solo dos valores: <code>0</code> o{" "}
        <code>1</code>. Lo cual se puede traducir como encendido o apagado, o
        en algunos casos como verdadero o falso, o cualquier otro valor que se
        pueda representar con dos estados. Esto es asi por el flujo de corriente
        electrica que se traduce como si de un lenguaje se tratara permitiendo 
        a sistemas computacionales comunicarce o realizar tareas.
      </p>

      <h3>Octeto</h3>
      <p>
        Un <strong><Term id="octeto">octeto</Term></strong> es un conjunto de 8 <Term id="bit">bits</Term>. En una dirección{" "}
        <Term id="ip">IPv4</Term>, cada número separado por puntos representa un octeto.
      </p>
      <img className="mx-auto block max-w-full"
      src="https://www.glosariografico.com/sites/default/files/inline-images/byte_bit.png" alt="Imagen de  un octeto"></img>
      <h2>IPv4</h2>
      <p>
        Una dirección <strong>IPv4</strong> está formada por 4 octetos. Como
        cada octeto tiene 8 bits, una dirección IPv4 tiene un total de{" "}
        <strong>32 bits</strong>.
      </p>

      <p>
        Por ejemplo, en la dirección <code>192.168.1.10</code>, cada parte
        corresponde a un octeto:
      </p>

      <ul>
        <li><code>192</code> es el primer octeto</li>
        <li><code>168</code> es el segundo octeto</li>
        <li><code>1</code> es el tercer octeto</li>
        <li><code>10</code> es el cuarto octeto</li>
      </ul>

      <img className="mx-auto block max-w-full w-3/4" src="https://www.dreamhost.com/blog/wp-content/uploads/2024/07/01-Direccion-IPv4-en-notacion-decimal-con-puntos-1024x716.jpg"  alt="imagen ipv4"></img>

      <h2>IPv6</h2>
      <p>
        Una dirección <strong>IPv6</strong> es más larga que una IPv4. Está
        formada por 128 bits y se escribe en grupos de números hexadecimales
        separados por dos puntos.
      </p>

      <p>
        Un ejemplo de dirección IPv6 sería:
      </p>

      <pre><code>{`2001:0db8:0000:0000:0000:ff00:0042:8329`}</code></pre>

      <p>
        En IPv6 se pueden omitir ciertos ceros para escribir la dirección de
        forma más corta. Por ejemplo, los ceros a la izquierda dentro de cada
        grupo pueden eliminarse.
      </p>

      <pre><code>{`2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329`}</code></pre>

      <p>
        Además, una secuencia continua de grupos con valor <code>0</code> puede
        reemplazarse por <code>::</code>. Esta abreviación solo debe usarse una
        vez dentro de la misma dirección, para evitar ambigüedad.
      </p>

      <pre><code>{`2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329`}</code></pre>

      <div className="callout">
        En el siguiente apunte se explica la máscara de red y la gateway. Esos
        conceptos ayudan a entender cómo una máquina reconoce su red local y
        por dónde debe salir para comunicarse con otras redes.
      </div>

      {/* ── FIN DEL CONTENIDO ─────────────────────────────── */}

    </NoteLayout>
  );
}
