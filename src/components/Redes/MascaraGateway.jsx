import React from "react";
import NoteLayout from "../NoteLayout.jsx";

export default function MascaraGateway() {
  return (
    <NoteLayout
      title="Máscara de red y gateway"
      category="Redes"
      categoryPath="/Redes"
      tags={["IPv4", "Máscara de red", "Gateway", "Direccionamiento"]}
      previousNote={{
        label: "Tipos de IP",
        path: "/Redes/TiposDeIP",
      }}
      nextNote={{
        label: "Interfaces de red",
        path: "/Redes/InterfacesDeRed",
      }}
    >
      <div className="callout">
        Después de conocer el formato de una IP, el siguiente paso es entender
        cómo un equipo sabe si una dirección está dentro de su misma red o si
        debe enviar el tráfico hacia otra red.
      </div>

      <h2>Máscara de red</h2>
      <p>
        La <strong>máscara de red</strong> sirve para separar qué parte de una
        dirección IP identifica a la red y qué parte identifica al dispositivo
        dentro de esa red.
      </p>

      <p>
        Por ejemplo, si tenemos la IP <code>192.168.1.10</code> con la máscara{" "}
        <code>255.255.255.0</code>, los primeros tres octetos representan la red
        y el último octeto representa al dispositivo.
      </p>

      <pre><code>{`IP:       192.168.1.10
      Máscara:  255.255.255.0

      Red:      192.168.1.0
      Host:              .10`}</code></pre>

      <p>
        En este caso, los equipos con direcciones como <code>192.168.1.20</code>{" "}
        o <code>192.168.1.50</code> pertenecen a la misma red, porque comparten
        la parte <code>192.168.1</code>.
      </p>

      <h3>Notación CIDR</h3>
      <p>
        También es común escribir la máscara usando notación CIDR. Por ejemplo,{" "}
        <code>192.168.1.10/24</code> significa que los primeros 24 bits
        pertenecen a la red. Para ver ejemplos de las diferentes máscaras
        CIDR, <a href="https://www.ibm.com/docs/es/networkmanager/4.2.0?topic=tables-cidrinfo" target="_blank" rel="noopener noreferrer">
          <span className="text-fuchsia-500 hover:text-fuchsia-800 underline">clic aquí</span>
        </a>
      </p>

      <h3>Máscara más grande y más pequeña</h3>
      <p>
        En IPv4, la máscara se puede expresar desde <code>/0</code> hasta{" "}
        <code>/32</code>. Mientras más grande es el número de la máscara, más
        bits se reservan para identificar la red y menos direcciones quedan
        disponibles para dispositivos.
      </p>

      <p>
        En un contexto práctico de redes tradicionales, también se suele hablar
        de la máscara más pequeña y más grande según la cantidad de hosts
        disponibles:
      </p>

      <ul>
        <li>
          <code>255.0.0.0</code>, o <code>/8</code>, es una máscara grande en
          cantidad de direcciones disponibles, porque deja muchos bits para
          hosts.
        </li>
        <li>
          <code>255.255.255.252</code>, o <code>/30</code>, es una máscara muy
          pequeña para redes normales, porque solo deja 4 direcciones totales.
        </li>
      </ul>

      <ul>
        <li>
          <code>/0</code> es la máscara más pequeña: representa el rango más
          amplio posible.
        </li>
        <li>
          <code>/32</code> es la máscara más grande: representa una sola
          dirección IP.
        </li>
      </ul>

      <pre><code>{`Máscara /8
255.0.0.0
Muchas direcciones disponibles para hosts

Máscara /30
255.255.255.252
4 direcciones totales: 2 reservadas y 2 utilizables`}</code></pre>

      <p>
        Por eso, cuando se busca una red pequeña pero todavía usable con la
        regla clásica de reservar red y broadcast, se usa <code>/30</code>. Sus
        4 direcciones se dividen así:
      </p>

      <pre><code>{`Ejemplo: 192.168.1.0/30

Dirección de red:  192.168.1.0
Host utilizable:   192.168.1.1
Host utilizable:   192.168.1.2
Broadcast:         192.168.1.3`}</code></pre>

      <p>
        Un ejemplo común es una red <code>/24</code>. En este caso, los primeros
        24 bits identifican la red y quedan 8 bits para direcciones dentro de
        esa red. Con 8 bits se pueden formar <code>256</code> combinaciones,
        desde <code>0</code> hasta <code>255</code>.
      </p>

      <pre><code>{`Red:              192.168.1.0/24
Rango total:      192.168.1.0 - 192.168.1.255
Dirección de red: 192.168.1.0
Hosts usables:    192.168.1.1 - 192.168.1.254
Broadcast:        192.168.1.255`}</code></pre>

      <p>
        Aunque existen 256 direcciones posibles, normalmente se reservan 2 y no
        se asignan a equipos:
      </p>

      <ul>
        <li>
          La primera dirección identifica la red, por ejemplo{" "}
          <code>192.168.1.0</code>.
        </li>
        <li>
          La última dirección se usa como broadcast, por ejemplo{" "}
          <code>192.168.1.255</code>.
        </li>
      </ul>

      <p>
        Por eso, en una red <code>/24</code> normalmente quedan{" "}
        <strong>254 direcciones utilizables</strong> para hosts.
      </p>

      <h2>Gateway</h2>
      <p>
        La <strong>gateway</strong>, o puerta de enlace, es el dispositivo que
        permite salir de la red local hacia otras redes. Normalmente es el
        router.
      </p>

      <p>
        Si un computador quiere comunicarse con otro equipo dentro de la misma
        red, puede hacerlo directamente. Pero si quiere llegar a una dirección
        externa, como un servidor en internet, envía el tráfico a la gateway.
      </p>

      <pre><code>{`Equipo:   192.168.1.10
Máscara:  255.255.255.0
Gateway:  192.168.1.1`}</code></pre>

      <p>
        En este ejemplo, <code>192.168.1.1</code> suele ser el router. El equipo
        lo usa como salida cuando el destino no pertenece a su red local.
      </p>
    </NoteLayout>
  );
}
