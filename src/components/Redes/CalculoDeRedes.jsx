import React from "react";
import NoteLayout from "../NoteLayout.jsx";

export default function CalculoDeRedes() {
  return (
    <NoteLayout
      title="Cálculo de redes"
      category="Redes"
      categoryPath="/Redes"
      tags={["Subnetting", "CIDR", "VLSM", "Clases IPv4"]}
      previousNote={{
        label: "Interfaces de red",
        path: "/Redes/InterfacesDeRed",
      }}
    >
      <div className="callout">
        En esta sección se trabajan las bases para calcular redes: clases IPv4,
        subredes, cantidad de hosts, rangos utilizables, broadcast y VLSM.
      </div>

      <h2>Clases de direcciones IPv4</h2>
      <p>
        Antes de CIDR, las direcciones IPv4 se organizaban por clases. La clase
        se reconoce mirando el primer octeto de la dirección IP.
      </p>

      <table>
        <thead>
          <tr>
            <th>Clase</th>
            <th>Primer octeto</th>
            <th>Máscara por defecto</th>
            <th>Uso principal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>1 - 126</td>
            <td>255.0.0.0 /8</td>
            <td>Redes muy grandes</td>
          </tr>
          <tr>
            <td>B</td>
            <td>128 - 191</td>
            <td>255.255.0.0 /16</td>
            <td>Redes medianas</td>
          </tr>
          <tr>
            <td>C</td>
            <td>192 - 223</td>
            <td>255.255.255.0 /24</td>
            <td>Redes pequeñas</td>
          </tr>
          <tr>
            <td>D</td>
            <td>224 - 239</td>
            <td>No aplica</td>
            <td>Multicast</td>
          </tr>
          <tr>
            <td>E</td>
            <td>240 - 255</td>
            <td>No aplica</td>
            <td>Experimental o reservado</td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        El rango <code>127.x.x.x</code> no se usa como clase A normal, porque se
        reserva para loopback. Por ejemplo, <code>127.0.0.1</code> apunta al
        propio equipo.
      </div>

      <h3>Ejemplos por clase</h3>
      <ul>
        <li><code>10.0.0.1</code> pertenece a clase A.</li>
        <li><code>172.16.5.20</code> pertenece a clase B.</li>
        <li><code>192.168.1.10</code> pertenece a clase C.</li>
        <li><code>224.0.0.5</code> pertenece a clase D y se usa para multicast.</li>
        <li><code>240.0.0.1</code> pertenece a clase E.</li>
      </ul>

      <h2>Qué es una subred</h2>
      <p>
        Una <strong>subred</strong> es una división más pequeña de una red
        principal. Subdividir una red permite organizar mejor los dispositivos y
        controlar cómo circula el tráfico.
      </p>

      <p>
        Por ejemplo, una red <code>192.168.1.0/24</code> se puede dividir en
        varias subredes más pequeñas para separar áreas como administración,
        estudiantes, servidores o invitados.
      </p>

      <h2>Ventajas de subdividir una red</h2>
      <ul>
        <li>Mejor organización de los equipos por área o función.</li>
        <li>Menos tráfico innecesario dentro de cada segmento.</li>
        <li>Mayor control de seguridad entre grupos de dispositivos.</li>
        <li>Uso más eficiente de las direcciones IP disponibles.</li>
        <li>Facilita el diagnóstico de problemas de conectividad.</li>
      </ul>

      <h2>Qué calcularemos</h2>
      <ul>
        <li>Dirección de red.</li>
        <li>Dirección de broadcast.</li>
        <li>Primer host utilizable.</li>
        <li>Último host utilizable.</li>
        <li>Cantidad de hosts disponibles.</li>
      </ul>

      <h2>Ejemplo base</h2>
      <p>
        Si tenemos la dirección <code>192.168.1.10/24</code>, podemos calcular
        qué parte identifica a la red y qué rango queda disponible para equipos.
      </p>

      <pre><code>{`IP:        192.168.1.10
CIDR:      /24
Máscara:   255.255.255.0

Red:       192.168.1.0
Broadcast: 192.168.1.255
Hosts:     192.168.1.1 - 192.168.1.254`}</code></pre>

      <h2>FLSM y VLSM</h2>
      <p>
        <strong>FLSM</strong> significa máscara de subred de longitud fija. En
        esta técnica, todas las subredes usan el mismo tamaño, aunque algunas
        necesiten muchos hosts y otras muy pocos.
      </p>

      <p>
        <strong>VLSM</strong> significa máscara de subred de longitud variable.
        Esta técnica permite crear subredes de distintos tamaños dentro de una
        misma red principal, ajustando cada subred a la cantidad real de hosts
        que necesita.
      </p>

      <h3>Cómo se calcula FLSM</h3>
      <p>
        En FLSM todas las subredes usan la misma máscara. Por eso, primero se
        toma la red que necesita más hosts y se elige una máscara que alcance
        para esa cantidad. Después esa misma máscara se aplica a todas las
        subredes, aunque algunas necesiten menos direcciones.
      </p>

      <ol>
        <li>Identificar cuántas subredes se necesitan.</li>
        <li>Buscar la subred que necesita más hosts.</li>
        <li>
          Usar la fórmula <code>2^n - 2 = hosts utilizables</code> para elegir
          la cantidad de bits de host.
        </li>
        <li>
          Calcular la máscara con <code>32 - n</code>.
        </li>
        <li>
          Aplicar esa misma máscara y el mismo salto a todas las subredes.
        </li>
      </ol>

      <pre><code>{`Ejemplo FLSM:
Red principal: 192.168.10.0/24
Se necesitan 4 subredes.
La red más grande necesita 50 hosts.

2^5 - 2 = 30   No alcanza
2^6 - 2 = 62   Sí alcanza

Entonces se necesitan 6 bits para hosts:
32 - 6 = /26

Máscara: 255.255.255.192
Salto:   256 - 192 = 64`}</code></pre>

      <table>
        <thead>
          <tr>
            <th>Subred</th>
            <th>Dirección de red</th>
            <th>Rango usable</th>
            <th>Broadcast</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>192.168.10.0/26</td>
            <td>192.168.10.1 - 192.168.10.62</td>
            <td>192.168.10.63</td>
          </tr>
          <tr>
            <td>2</td>
            <td>192.168.10.64/26</td>
            <td>192.168.10.65 - 192.168.10.126</td>
            <td>192.168.10.127</td>
          </tr>
          <tr>
            <td>3</td>
            <td>192.168.10.128/26</td>
            <td>192.168.10.129 - 192.168.10.190</td>
            <td>192.168.10.191</td>
          </tr>
          <tr>
            <td>4</td>
            <td>192.168.10.192/26</td>
            <td>192.168.10.193 - 192.168.10.254</td>
            <td>192.168.10.255</td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        FLSM es más simple porque todas las subredes tienen el mismo tamaño,
        pero puede desperdiciar direcciones si una subred necesita muchos hosts
        y otra necesita muy pocos.
      </div>

      <h3>Ventaja de VLSM</h3>
      <p>
        VLSM evita desperdiciar direcciones IP. En vez de entregar bloques del
        mismo tamaño para todos, asigna bloques grandes a redes grandes y
        bloques pequeños a redes pequeñas.
      </p>

      <h3>Pasos para calcular VLSM</h3>
      <ol>
        <li>
          Ordenar las redes de mayor a menor según la cantidad de hosts que
          necesita cada una.
        </li>
        <li>
          Recordar la fórmula <code>2^n - 2 = hosts utilizables</code>.
        </li>
        <li>
          Empezar con la red que necesita más hosts, porque esa define el
          bloque más grande que se debe reservar primero.
        </li>
        <li>
          Buscar el valor de <code>n</code> que entregue suficientes hosts
          utilizables y, desde ahí, obtener la máscara.
        </li>
      </ol>

      <p>
        En la fórmula, el <code>2</code> representa la base binaria, porque cada
        bit puede valer <code>0</code> o <code>1</code>. La <code>n</code>{" "}
        representa la cantidad de bits que quedan para hosts, y el resultado
        indica cuántos hosts utilizables permite esa subred. Se restan{" "}
        <code>2</code> direcciones porque normalmente una queda como dirección
        de red y otra como broadcast.
      </p>

      <pre><code>{`Ejemplo con 100 hosts necesarios:

2^6 - 2 = 62   No alcanza
2^7 - 2 = 126  Sí alcanza

Entonces se necesitan 7 bits para hosts.
IPv4 tiene 32 bits en total:
32 - 7 = /25

Máscara: 255.255.255.128`}</code></pre>

      <h3>Recordatorio binario de un octeto</h3>
      <p>
        Cada octeto IPv4 tiene 8 bits. Sus valores se leen de izquierda a
        derecha como potencias de 2. Para convertir a decimal, se suman los
        valores de los bits que están encendidos con <code>1</code>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Bit</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Valor</td>
            <td>128</td>
            <td>64</td>
            <td>32</td>
            <td>16</td>
            <td>8</td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Ejemplo</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>

      <pre><code>{`11111110
128 + 64 + 32 + 16 + 8 + 4 + 2 + 0 = 254

11111111
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255

10000000
128 + 0 + 0 + 0 + 0 + 0 + 0 + 0 = 128`}</code></pre>

      <h2>Ejemplo de VLSM</h2>
      <p>
        Supongamos que tenemos la red <code>192.168.10.0/24</code> y debemos
        crear subredes para cuatro áreas:
      </p>

      <table>
        <thead>
          <tr>
            <th>Área</th>
            <th>Hosts necesarios</th>
            <th>Máscara sugerida</th>
            <th>Hosts útiles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Administración</td>
            <td>100</td>
            <td>/25</td>
            <td>126</td>
          </tr>
          <tr>
            <td>Laboratorio</td>
            <td>50</td>
            <td>/26</td>
            <td>62</td>
          </tr>
          <tr>
            <td>Servidores</td>
            <td>25</td>
            <td>/27</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Invitados</td>
            <td>10</td>
            <td>/28</td>
            <td>14</td>
          </tr>
        </tbody>
      </table>

      <p>
        En VLSM se ordenan las necesidades desde la red más grande hasta la más
        pequeña. Luego se asignan los bloques de direcciones en ese mismo orden.
      </p>

      <pre><code>{`Red principal: 192.168.10.0/24

Administración: 192.168.10.0/25
Rango usable:   192.168.10.1 - 192.168.10.126
Broadcast:      192.168.10.127

Laboratorio:    192.168.10.128/26
Rango usable:   192.168.10.129 - 192.168.10.190
Broadcast:      192.168.10.191

Servidores:     192.168.10.192/27
Rango usable:   192.168.10.193 - 192.168.10.222
Broadcast:      192.168.10.223

Invitados:      192.168.10.224/28
Rango usable:   192.168.10.225 - 192.168.10.238
Broadcast:      192.168.10.239`}</code></pre>

      <h2>Calculadora online</h2>
      <p>
        Para comprobar ejercicios, puedes usar una calculadora VLSM online como{" "}
        <a
          href="https://www.subnetcalculator.dev/vlsm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-fuchsia-500 hover:text-fuchsia-800 underline">
            subnetcalculator.dev/vlsm
          </span>
        </a>
        . La idea es usarla para verificar resultados, no para saltarse el
        procedimiento.
      </p>

      <p>
        Para practicar conversiones entre binario y decimal, puedes usar una{" "}
        <a
          href="https://www.rapidtables.com/convert/number/binary-to-decimal.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-fuchsia-500 hover:text-fuchsia-800 underline">
            calculadora binaria
          </span>
        </a>
        .
      </p>

      <div className="callout">
        Para practicar, conviene resolver primero a mano: identificar la clase,
        convertir la máscara a CIDR, calcular saltos, red, broadcast y hosts.
        Después se compara el resultado con una calculadora.
      </div>
    </NoteLayout>
  );
}
