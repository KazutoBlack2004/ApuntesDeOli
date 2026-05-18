import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function VlansEnrutamiento() {
  return (
    <NoteLayout
      title="VLANs y Enrutamiento Básico"
      category="Redes"
      categoryPath="/Redes"
      tags={["VLANs", "802.1Q", "Trunking", "Routing", "Cisco CCNA"]}
      previousNote={{
        label: "Cálculo de redes",
        path: "/Redes/CalculoDeRedes",
      }}
    >
      <div className="callout">
        ¡Bienvenido al tema estrella de Cisco CCNA! En redes corporativas, no dejamos a miles de dispositivos
        en un mismo dominio físico. La segmentación lógica mediante <strong><Term id="vlan">VLANs</Term></strong> y el paso de datos entre ellas mediante
        el <strong>Enrutamiento (Routing)</strong> son esenciales para la seguridad, el orden y el rendimiento de cualquier red.
      </div>

      <h2>VLANs: Segmentación Lógica de Redes</h2>
      <p>
        Una <strong><Term id="vlan">VLAN</Term></strong> (Virtual Local Area Network) permite dividir un único switch físico
        en múltiples redes lógicas independientes. 
      </p>
      <p>
        Sin VLANs, si tienes un switch de 48 puertos, todos los puertos pertenecen al mismo <Term id="broadcast">dominio de broadcast</Term>.
        Con VLANs, puedes configurar que los puertos 1-10 sean para la <strong>VLAN 10 (Ventas)</strong> y los puertos 11-20 sean para la <strong>VLAN 20 (TI)</strong>.
      </p>

      <h3>¿Por qué usamos VLANs?</h3>
      <ul>
        <li><strong>Reducción de Broadcast:</strong> Las tormentas de difusión de la VLAN 10 nunca molestarán a la VLAN 20.</li>
        <li><strong>Seguridad Elevada:</strong> Por defecto, los dispositivos de diferentes VLANs <strong>no pueden comunicarse</strong> entre sí a menos que un router lo permita.</li>
        <li><strong>Flexibilidad Geográfica:</strong> Dos empleados de Ventas pueden estar en pisos diferentes conectados a switches distintos, y seguir perteneciendo a la misma VLAN lógica.</li>
      </ul>

      <h2>El Enlace Troncal (Trunking) y el Estándar 802.1Q</h2>
      <p>
        ¿Qué pasa si los hosts de la VLAN 10 están repartidos en varios switches conectados entre sí? No queremos tirar un cable físico por cada VLAN entre switches. 
        Para resolver esto, usamos un <strong><Term id="trunk">Enlace Troncal (Trunk)</Term></strong>.
      </p>
      <ul>
        <li>Un puerto troncal transmite datos de **múltiples VLANs** a través de una sola conexión física.</li>
        <li><strong>Estándar IEEE 802.1Q:</strong> Es el protocolo universal que añade una pequeña etiqueta (Tag) de 4 bytes a la trama de Capa 2. Esta etiqueta especifica a qué VLAN pertenece la trama para que el switch receptor sepa a dónde entregarla.</li>
        <li><strong>VLAN Nativa:</strong> Por compatibilidad y administración, el tráfico que viaja por el enlace troncal sin etiqueta se asigna automáticamente a la VLAN Nativa (por defecto, la VLAN 1).</li>
      </ul>

      <h2>Enrutamiento Inter-VLAN: Conectando los Mundos</h2>
      <p>
        Como las VLANs aíslan el tráfico, necesitamos un dispositivo de Capa 3 (<Term id="router">Router</Term> o switch multicapa) para permitirles hablar entre sí de forma controlada. 
        En Cisco CCNA estudiamos tres métodos clásicos:
      </p>

      <h3>1. Router-on-a-Stick (ROAS)</h3>
      <p>
        Es la solución clásica más común para redes medianas. Consiste en conectar un <Term id="router">Router</Term> y un <Term id="switch">Switch</Term> mediante **un único cable físico** configurado como troncal.
      </p>
      <ul>
        <li>En la interfaz física del router (ej. <code>GigabitEthernet0/0</code>) creamos **subinterfaces virtuales** (ej. <code>G0/0.10</code> y <code>G0/0.20</code>).</li>
        <li>Cada subinterfaz se asocia a una VLAN específica mediante encapsulamiento 802.1Q y actúa como la <Term id="gateway">gateway</Term> por defecto de esa VLAN.</li>
      </ul>

      <pre><code>{`+--------------+
|    Router    | (Subinterfaces: G0/0.10 e G0/0.20)
+------+-------+
       | Enlace Troncal (802.1Q)
+------+-------+
|    Switch    | (VLAN 10 y VLAN 20)
+--+--------+--+
   |        |
[Host A]  [Host B]
VLAN 10   VLAN 20`}</code></pre>

      <h3>2. Switch de Capa 3 (Multicapa)</h3>
      <p>
        En redes corporativas grandes, el enrutamiento se realiza directamente dentro de switches especiales que operan en Capas 2 y 3. 
        Utilizan **SVIs (Switch Virtual Interfaces)**. Al enrutar por hardware en lugar de software, las velocidades de transmisión son extremadamente veloces.
      </p>

      <h2>Introducción al Enrutamiento (Routing)</h2>
      <p>
        Cuando un paquete sale de su red local, el router toma la decisión de reenvío basándose en su tabla de enrutamiento. 
        Existen dos formas de alimentar esta tabla:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
          <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
            Enrutamiento Estático
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            El administrador de red ingresa las rutas manualmente en el router.
          </p>
          <ul className="text-xs text-white/70 list-disc pl-4 mt-2 space-y-1">
            <li><strong>Pros:</strong> No consume ancho de banda ni procesamiento del router; ideal para enlaces stub (salidas únicas).</li>
            <li><strong>Contras:</strong> Si un cable se corta, el router no se enterará y el tráfico se perderá; difícil de mantener en redes grandes.</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
          <h4 className="text-fuchsia-400 font-bold mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_6px_#d946ef]" />
            Enrutamiento Dinámico
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Los routers ejecutan protocolos para descubrir redes vecinas y calcular las mejores rutas automáticamente.
          </p>
          <ul className="text-xs text-white/70 list-disc pl-4 mt-2 space-y-1">
            <li><strong><Term id="ospf">OSPF</Term>:</strong> Protocolo de estado de enlace muy rápido y común en empresas.</li>
            <li><strong>RIP:</strong> Protocolo antiguo basado en distancia (número de saltos).</li>
            <li><strong>BGP:</strong> El protocolo gigante que enruta la Internet global entre países y proveedores.</li>
          </ul>
        </div>
      </div>

      <div className="callout">
        <strong>Conclusión de tu viaje de Redes:</strong> Ahora tienes las bases completas del funcionamiento de las redes:
        desde cómo se estructuran los bits en <Term id="ip">direcciones IP</Term> y máscaras, cómo se dividen en <Term id="subred">subredes</Term> eficientes,
        cómo viajan encapsulados en los <Term id="osi">modelos OSI/TCP-IP</Term>, bajo qué protocolos de transporte operan, hasta la creación de
        redes lógicas virtuales (<Term id="vlan">VLANs</Term>) y su enrutamiento. ¡Ya tienes el conocimiento teórico base de un administrador de redes CCNA!
      </div>
    </NoteLayout>
  );
}
