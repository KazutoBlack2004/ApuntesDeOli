/**
 * glossary.js
 * ───────────
 * Diccionario centralizado de términos técnicos de redes para el sistema de tooltips.
 * Cada término tiene un 'title' (título a mostrar) y un 'def' (definición en lenguaje comprensible).
 */
export const GLOSSARY_TERMS = {
  ip: {
    title: "Dirección IP (Internet Protocol)",
    def: "Identificador numérico lógico asignado a cada dispositivo conectado a una red, que permite su localización y comunicación utilizando el protocolo IP."
  },
  mac: {
    title: "Dirección MAC (Media Access Control)",
    def: "Identificador físico único de 48 bits grabado de fábrica en la tarjeta de red (NIC). Funciona en la Capa 2 (Enlace de datos) y no cambia."
  },
  pdu: {
    title: "PDU (Protocol Data Unit)",
    def: "Unidad de Datos de Protocolo. Es el formato que toman los datos en cada capa del modelo OSI: Bits (Capa 1), Tramas (Capa 2), Paquetes (Capa 3), Segmentos (Capa 4)."
  },
  router: {
    title: "Router (Enrutador)",
    def: "Dispositivo de Capa 3 (Red) que conecta diferentes redes locales o externas, tomando decisiones inteligentes sobre la mejor ruta para enviar los paquetes de datos."
  },
  switch: {
    title: "Switch (Conmutador)",
    def: "Dispositivo de Capa 2 (Enlace de datos) que conecta múltiples equipos dentro de una misma red local (LAN) y les envía los datos basándose en sus direcciones MAC."
  },
  vlan: {
    title: "VLAN (Virtual Local Area Network)",
    def: "Tecnología que permite segmentar una red física de switches en múltiples redes lógicas independientes, reduciendo los dominios de difusión (broadcast) y aumentando la seguridad."
  },
  arp: {
    title: "ARP (Address Resolution Protocol)",
    def: "Protocolo de Resolución de Direcciones. Se encarga de asociar una dirección IP conocida de Capa 3 con la dirección MAC física correspondiente de Capa 2."
  },
  dhcp: {
    title: "DHCP (Dynamic Host Configuration Protocol)",
    def: "Protocolo que asigna automáticamente una dirección IP, máscara de red, gateway y servidores DNS a cualquier dispositivo que se conecte a la red."
  },
  dns: {
    title: "DNS (Domain Name System)",
    def: "Sistema de Nombres de Dominio. Funciona como la libreta de contactos de Internet, traduciendo nombres legibles (google.com) en direcciones IP numéricas."
  },
  tcp: {
    title: "TCP (Transmission Control Protocol)",
    def: "Protocolo de transporte orientado a conexión y altamente confiable. Garantiza que todos los datos lleguen completos, ordenados y sin errores mediante confirmación de recepción."
  },
  udp: {
    title: "UDP (User Datagram Protocol)",
    def: "Protocolo de transporte rápido y no orientado a conexión. Envía datos sin verificar si llegaron o no; ideal para streaming de video, voz sobre IP o videojuegos."
  },
  icmp: {
    title: "ICMP (Internet Control Message Protocol)",
    def: "Protocolo de mensajes de control para diagnóstico. Es utilizado por herramientas de red como 'ping' y 'traceroute' para comprobar el estado de los enlaces."
  },
  broadcast: {
    title: "Dominio de Broadcast (Difusión)",
    def: "Área de la red en la que un mensaje de difusión ('para todos') es recibido por cualquier dispositivo. Los switches propagan la difusión; los routers la detienen."
  },
  collision: {
    title: "Dominio de Colisión",
    def: "Segmento de red física donde dos dispositivos pueden transmitir datos al mismo tiempo, provocando que las señales choquen y se corrompan."
  },
  cidr: {
    title: "CIDR (Classless Inter-Domain Routing)",
    def: "Enrutamiento entre dominios sin clases. Sistema que permite flexibilizar la máscara de red usando prefijos (ej: /24) en lugar de las clases rígidas (A, B, C)."
  },
  vlsm: {
    title: "VLSM (Variable Length Subnet Mask)",
    def: "Máscara de subred de longitud variable. Técnica de subnetting que crea subredes adaptadas exactamente al número de hosts requerido, evitando el desperdicio de direcciones IP."
  },
  flsm: {
    title: "FLSM (Fixed Length Subnet Mask)",
    def: "Máscara de subred de longitud fija. Técnica clásica donde todas las subredes divididas tienen exactamente el mismo tamaño y la misma máscara de red."
  },
  gateway: {
    title: "Gateway (Puerta de enlace)",
    def: "Dispositivo (usualmente un router) configurado como la salida de la red local hacia el exterior (otras redes o Internet). Toda IP fuera del rango local pasa por ella."
  },
  ethernet: {
    title: "Ethernet",
    def: "Estándar tecnológico de redes cableadas locales (LAN) que opera en las Capas 1 y 2 del modelo OSI, definiendo tipos de cables, conectores y tramas de datos."
  },
  trunk: {
    title: "Trunking (Enlace Troncal)",
    def: "Conexión física y lógica entre dos switches que permite transportar el tráfico de múltiples VLANs a la vez por un solo cable, identificándolas con la etiqueta 802.1Q."
  },
  hub: {
    title: "Hub (Concentrador)",
    def: "Dispositivo antiguo de Capa 1 (Física) que recibe datos por un puerto y los retransmite a absolutamente todos los demás puertos, creando un único y enorme dominio de colisión."
  },
  osi: {
    title: "Modelo OSI",
    def: "Modelo de Interconexión de Sistemas Abiertos. Marco conceptual de 7 capas desarrollado por la ISO que estandariza la comunicación y protocolos en sistemas de computadoras."
  },
  subred: {
    title: "Subred",
    def: "División lógica y de menor tamaño creada a partir de una red principal más grande para mejorar la organización del tráfico y optimizar el direccionamiento."
  },
  nic: {
    title: "NIC (Network Interface Card)",
    def: "Tarjeta de Interfaz de Red. Adaptador de hardware físico (cableado o Wi-Fi) integrado en un dispositivo para permitirle conectarse a un medio de red."
  },
  encapsulacion: {
    title: "Encapsulación",
    def: "Proceso donde los datos originales descienden por las capas del modelo OSI y en cada capa se les agrega información de control o cabecera (Header)."
  },
  desencapsulacion: {
    title: "Desencapsulación",
    def: "Proceso inverso en el equipo receptor: los datos suben por el modelo OSI y en cada capa se remueve la cabecera correspondiente hasta extraer los datos puros."
  },
  bit: {
    title: "Bit (Binary Digit)",
    def: "Unidad mínima de información en computación, con dos estados posibles: 0 o 1, que representan impulsos eléctricos, de luz u ondas de radio."
  },
  octeto: {
    title: "Octeto",
    def: "Conjunto organizado de 8 bits consecutivos que equivale a un Byte. En direccionamiento IPv4, representa a cada número decimal separado por puntos."
  },
  ping: {
    title: "Ping (Packet Internet Groper)",
    def: "Utilidad de diagnóstico que envía paquetes de solicitud de eco (ICMP) a un destino remoto para verificar si está activo y medir el tiempo de respuesta (latencia)."
  },
  traceroute: {
    title: "Traceroute (Trazado de Ruta)",
    def: "Herramienta que rastrea el camino que sigue un paquete de datos a través de los routers en Internet, mostrando la IP de cada salto intermedio."
  },
  subnetting: {
    title: "Subnetting (Subneteo)",
    def: "El arte de dividir una red física o lógica principal en subredes más pequeñas y manejables tomando prestados bits de host para sumarlos a la porción de red."
  },
  ospf: {
    title: "OSPF (Open Shortest Path First)",
    def: "Protocolo de enrutamiento dinámico de estado de enlace muy común en redes corporativas grandes, que calcula automáticamente el camino más corto hacia un destino."
  },
  ssh: {
    title: "SSH (Secure Shell)",
    def: "Protocolo de red que permite acceder de manera remota y segura a la consola de administración de switches, routers y servidores mediante encriptación."
  },
  telnet: {
    title: "Telnet",
    def: "Protocolo de acceso remoto antiguo. Envía toda la información (incluyendo contraseñas) en texto plano, por lo que ha sido reemplazado totalmente por SSH por seguridad."
  }
};
