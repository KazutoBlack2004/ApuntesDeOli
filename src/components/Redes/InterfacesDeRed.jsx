import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function InterfacesDeRed() {
  return (
    <NoteLayout
      title="Interfaces de red"
      category="Redes"
      categoryPath="/Redes"
      tags={["Ethernet", "Fast Ethernet", "Gigabit Ethernet", "Interfaces"]}
      previousNote={{
        label: "Máscara de red y gateway",
        path: "/Redes/MascaraGateway",
      }}
      nextNote={{
        label: "Modelos de red",
        path: "/Redes/ModelosRedes",
      }}
    >
      <div className="callout">
        Una <strong><Term id="nic">interfaz de red</Term></strong> es el punto por donde un dispositivo se conecta a
        una red. Puede ser física, como un puerto <Term id="ethernet">Ethernet</Term> (tarjeta <Term id="nic">NIC</Term>), o lógica, como una
        interfaz virtual configurada por software.
      </div>

      <h2>Qué es una interfaz de red</h2>
      <p>
        Una <strong><Term id="nic">interfaz de red</Term></strong> permite que un equipo envíe y
        reciba datos. En computadores, <Term id="switch">switches</Term> y <Term id="router">routers</Term>, normalmente se
        identifica como un puerto o adaptador de red.
      </p>

      <p>
        Cada interfaz puede tener su propia configuración, como dirección <Term id="ip">IP</Term>,
        máscara de red, <Term id="gateway">gateway</Term>, velocidad y estado de conexión.
      </p>

      <h2>Ethernet</h2>
      <p>
        <strong><Term id="ethernet">Ethernet</Term></strong> es una tecnología de red cableada muy común.
        Utiliza cables de red, normalmente con conector RJ45, para conectar
        dispositivos dentro de una red local.
      </p>

      <p>
        <Term id="ethernet">Ethernet</Term> trabaja con tramas, <Term id="mac">direcciones MAC</Term> y reglas de transmisión
        que permiten mover datos entre dispositivos conectados a la misma red.
      </p>

      <h2>Fast Ethernet</h2>
      <p>
        <strong>Fast Ethernet</strong> es una evolución de <Term id="ethernet">Ethernet</Term> que alcanza
        velocidades de hasta <code>100 Mbps</code>. Fue muy usada en redes
        domésticas, laboratorios y oficinas.
      </p>

      <h2>Gigabit Ethernet</h2>
      <p>
        <strong>Gigabit Ethernet</strong> alcanza velocidades de hasta{" "}
        <code>1 Gbps</code>, es decir, 1000 Mbps. Actualmente es común en
        computadores, <Term id="router">routers</Term>, <Term id="switch">switches</Term> y redes locales modernas.
      </p>

      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Velocidad</th>
            <th>Uso común</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ethernet</td>
            <td>10 Mbps</td>
            <td>Redes antiguas o equipos legacy</td>
          </tr>
          <tr>
            <td>Fast Ethernet</td>
            <td>100 Mbps</td>
            <td>Redes básicas de oficina o laboratorio</td>
          </tr>
          <tr>
            <td>Gigabit Ethernet</td>
            <td>1 Gbps</td>
            <td>Redes locales modernas</td>
          </tr>
        </tbody>
      </table>

      <h2>Interfaces en equipos de red</h2>
      <p>
        En <Term id="router">routers</Term> y <Term id="switch">switches</Term>, las interfaces suelen nombrarse según el tipo y
        la posición del puerto. Por ejemplo:
      </p>

      <ul>
        <li><code>Ethernet0/0</code>: interfaz <Term id="ethernet">Ethernet</Term>.</li>
        <li><code>FastEthernet0/1</code>: interfaz Fast Ethernet.</li>
        <li><code>GigabitEthernet0/0</code>: interfaz Gigabit Ethernet.</li>
      </ul>

      <p>
        Estos nombres ayudan a identificar dónde se conectan los cables y qué
        puerto se debe configurar.
      </p>

      <h2>Estado de una interfaz</h2>
      <p>
        Una interfaz puede estar activa o inactiva. Si está activa físicamente y
        configurada correctamente, puede enviar y recibir tráfico.
      </p>

      <pre><code>{`Interfaz: GigabitEthernet0/0
Estado:   activa
IP:       192.168.1.1
Máscara:  255.255.255.0`}</code></pre>

      <div className="callout">
        Después de conocer <Term id="ip">IP</Term>, máscara, <Term id="gateway">gateway</Term> e interfaces, el siguiente paso
        natural es comprender cómo estructuramos y organizamos las conversaciones entre dispositivos mediante
        los <strong>modelos de red (OSI y TCP/IP)</strong>.
      </div>
    </NoteLayout>
  );
}
