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
  },
  ciencia_de_datos: {
    title: "Ciencia de Datos (Data Science)",
    def: "Campo interdisciplinario que utiliza métodos científicos, algoritmos y sistemas para extraer conocimiento e insights de datos estructurados y no estructurados."
  },
  machine_learning: {
    title: "Machine Learning (Aprendizaje Automático)",
    def: "Subcampo de la Inteligencia Artificial que permite a los sistemas informáticos aprender de forma autónoma a partir de datos sin ser programados explícitamente."
  },
  supervisado: {
    title: "Aprendizaje Supervisado",
    def: "Tipo de Machine Learning donde el modelo se entrena utilizando datos ya etiquetados, es decir, datos donde conocemos previamente la respuesta correcta (ej. clasificación, regresión)."
  },
  no_supervisado: {
    title: "Aprendizaje No Supervisado",
    def: "Tipo de Machine Learning donde el modelo busca patrones y estructuras ocultas en datos no etiquetados ni clasificados (ej. agrupamiento en clusters)."
  },
  overfitting: {
    title: "Sobreajuste (Overfitting)",
    def: "Fallo de modelado donde un algoritmo aprende de memoria los datos de entrenamiento (incluyendo su ruido) y es incapaz de generalizar bien con datos nuevos."
  },
  underfitting: {
    title: "Subajuste (Underfitting)",
    def: "Fallo de modelado donde el modelo de Machine Learning es demasiado simple para capturar la estructura subyacente de los datos, dando malos resultados en entrenamiento y test."
  },
  pandas: {
    title: "Pandas",
    def: "Librería de código abierto para Python que proporciona estructuras de datos de alto rendimiento (DataFrames) y herramientas de análisis fáciles de usar."
  },
  numpy: {
    title: "NumPy",
    def: "Librería base para computación científica en Python que soporta arreglos y matrices multidimensionales de alta eficiencia y cálculo matemático optimizado."
  },
  dataframe: {
    title: "DataFrame",
    def: "Estructura de datos bidimensional (tipo tabla con filas y columnas) provista por Pandas. Cada columna puede almacenar tipos de datos diferentes."
  },
  dataset: {
    title: "Dataset (Conjunto de datos)",
    def: "Colección estructurada de datos recopilada con el propósito de ser analizada, entrenada en modelos o explorada estadísticamente."
  },
  eda: {
    title: "Análisis Exploratorio de Datos (EDA)",
    def: "Enfoque para analizar conjuntos de datos resumiendo sus características principales, a menudo utilizando métodos visuales y estadísticas descriptivas."
  },
  outlier: {
    title: "Valor Atípico (Outlier)",
    def: "Punto de datos que difiere significativamente del resto del conjunto de datos. Puede deberse a errores de medición o representar anomalías legítimas."
  },
  imputacion: {
    title: "Imputación de Datos",
    def: "Técnica estadística y computacional utilizada para reemplazar datos faltantes o nulos con valores estimados (como la media, mediana o modelos KNN)."
  },
  regresion: {
    title: "Regresión",
    def: "Tarea de aprendizaje supervisado enfocada en predecir un valor numérico continuo (ej. predecir el precio de una casa o la temperatura futura)."
  },
  clasificacion: {
    title: "Clasificación",
    def: "Tarea de aprendizaje supervisado donde el modelo asigna datos a categorías discretas o etiquetas predefinidas (ej. si un correo es Spam o No Spam)."
  },
  clustering: {
    title: "Clustering (Agrupamiento)",
    def: "Técnica no supervisada que divide un conjunto de datos en grupos (clusters) basados en similitudes inherentes de modo que los elementos de un grupo se parezcan entre sí."
  },
  kmeans: {
    title: "K-Means",
    def: "Algoritmo clásico de clustering que divide los datos en 'K' grupos asignando cada punto al centroide más cercano y recalculando consecutivamente sus centros."
  },
  pca: {
    title: "PCA (Principal Component Analysis)",
    def: "Análisis de Componentes Principales. Método estadístico de reducción de dimensionalidad que proyecta datos a menores dimensiones maximizando la varianza retenida."
  },
  big_data: {
    title: "Big Data",
    def: "Conjunto de datos tan voluminoso, rápido y complejo (las 3 o 5 V's) que resulta imposible de procesar con herramientas y bases de datos tradicionales."
  },
  data_warehouse: {
    title: "Almacén de Datos (Data Warehouse)",
    def: "Sistema centralizado diseñado para consolidar y almacenar datos estructurados provenientes de múltiples fuentes con el fin de realizar consultas analíticas e informes."
  },
  etl: {
    title: "ETL (Extract, Transform, Load)",
    def: "Proceso de Extracción (obtener datos de orígenes), Transformación (limpiarlos, estructurarlos y formatearlos) y Carga (guardarlos en un almacén de datos como un Data Warehouse)."
  },
  star_schema: {
    title: "Modelo en Estrella (Star Schema)",
    def: "Estructura de modelado de datos analítico compuesto por una gran tabla de hechos ('fact table') en el centro, rodeada por múltiples tablas de dimensiones."
  },
  business_intelligence: {
    title: "Business Intelligence (Inteligencia de Negocios)",
    def: "Conjunto de estrategias, tecnologías y herramientas de análisis utilizadas por empresas para transformar datos en bruto en información útil para la toma de decisiones estratégicas."
  },
  kpi: {
    title: "KPI (Key Performance Indicator)",
    def: "Indicador clave de rendimiento. Métrica cuantitativa utilizada para medir el éxito o eficacia de una actividad o proceso de negocio frente a sus objetivos."
  },
  hadoop: {
    title: "Apache Hadoop",
    def: "Framework de código abierto que permite el procesamiento y almacenamiento distribuido de conjuntos de datos masivos a través de clusters de computadoras usando HDFS."
  },
  spark: {
    title: "Apache Spark",
    def: "Motor de procesamiento y computación en cluster ultrarrápido y de código abierto para Big Data que trabaja principalmente en memoria RAM, superando la velocidad de Hadoop."
  },
  pipeline: {
    title: "Pipeline de Datos",
    def: "Conjunto de procesos automatizados de software que mueven datos desde un origen, aplicando transformaciones en serie, hasta guardarlos en un sistema de destino final."
  },
  url: {
    title: "URL (Uniform Resource Locator)",
    def: "Localizador Uniforme de Recursos. Es la dirección específica que se asigna a cada uno de los recursos disponibles en Internet (páginas, imágenes, videos) para que puedan ser localizados."
  },
  http: {
    title: "HTTP / HTTPS (Hypertext Transfer Protocol)",
    def: "Protocolo de Transferencia de Hipertexto. Es la base de la comunicación de datos en la World Wide Web. HTTPS es la versión segura y cifrada."
  },
  crud: {
    title: "CRUD (Create, Read, Update, Delete)",
    def: "Acrónimo que define las cuatro operaciones básicas para la gestión de datos persistentes: Crear, Leer, Actualizar y Eliminar."
  },
  api: {
    title: "API (Application Programming Interface)",
    def: "Interfaz de Programación de Aplicaciones. Conjunto de reglas y definiciones que permiten que diferentes aplicaciones de software se comuniquen entre sí."
  },
  rest: {
    title: "REST (Representational State Transfer)",
    def: "Estilo de arquitectura de desarrollo web que utiliza métodos HTTP estándar para manipular recursos a través de URLs únicas de forma sin estado."
  },
  json: {
    title: "JSON (JavaScript Object Notation)",
    def: "Formato de texto ligero y estructurado basado en pares clave-valor, ampliamente utilizado para enviar y recibir datos en peticiones y respuestas HTTP."
  },
  metodo_http: {
    title: "Métodos HTTP",
    def: "Verbos estándar (como GET, POST, PUT, DELETE) incluidos en una petición HTTP que le indican al servidor qué tipo de acción se desea realizar sobre un recurso."
  },
  token: {
    title: "Token",
    def: "Un objeto digital (cadena de caracteres) que representa una identidad, sesión o permisos de acceso, funcionando como una llave digital para consumir recursos protegidos."
  },
  jwt: {
    title: "JWT (JSON Web Token)",
    def: "Estándar abierto (RFC 7519) que define un formato compacto y autónomo para transmitir información estructurada en formato JSON de forma segura y firmada criptográficamente."
  },
  payload: {
    title: "Payload (Carga útil)",
    def: "Segunda sección de un JWT que contiene los datos reales (claims) transmitidos, como el ID del usuario, su rol o la fecha de expiración del token."
  },
  firma: {
    title: "Firma Digital (Signature)",
    def: "Tercera sección de un JWT calculada al codificar y firmar el Header y Payload usando una clave secreta. Sirve para verificar que el token no ha sido manipulado en el camino."
  },
  base64: {
    title: "Base64URL",
    def: "Esquema de codificación que traduce datos binarios a texto seguro para URLs, eliminando caracteres incompatibles como '+' o '/' y omitiendo el relleno '='."
  },
  autenticacion: {
    title: "Autenticación",
    def: "Proceso de verificar la identidad de una persona o sistema (ej. confirmar que eres quien dices ser mediante usuario y contraseña)."
  },
  autorizacion: {
    title: "Autorización",
    def: "Proceso de validar a qué recursos o acciones específicas tiene derecho a acceder un usuario previamente identificado."
  },
  lcp: {
    title: "LCP (Largest Contentful Paint)",
    def: "Métrica de rendimiento web (Core Web Vitals) que mide el tiempo que tarda en renderizarse el elemento visual más grande de la pantalla."
  },
  webp: {
    title: "WebP",
    def: "Formato de imagen de última generación desarrollado por Google que proporciona una compresión de imagen web muy superior con archivos más ligeros."
  },
  glasmorfismo: {
    title: "Glasmorfismo (Glassmorphism)",
    def: "Estilo de diseño que imita el aspecto del vidrio esmerilado translúcido usando transparencias, desenfoque de fondo (backdrop-filter: blur) y bordes finos."
  },
  neumorfismo: {
    title: "Neumorfismo (Neumorphism)",
    def: "Estilo que simula extrusiones o bajorrelieves suaves de plástico usando sombras paralelas dobles (una clara y una oscura) del color del fondo."
  },
  claymorfismo: {
    title: "Claymorfismo (Claymorphism)",
    def: "Estilo visual que imita figuras de arcilla o plastilina 3D suave, usando bordes redondeados pronunciados, sombras internas y colores pastel inflados."
  },
  esqueumorfismo: {
    title: "Esqueumorfismo (Skeuomorphism)",
    def: "Técnica de diseño que imita objetos y texturas del mundo real (como cuero, madera, metal pulido o botones con volumen) para hacerlos familiares al usuario."
  },
  brutalismo: {
    title: "Brutalismo Web (Neobrutalism)",
    def: "Estilo de diseño que utiliza colores de alto contraste (neón), bordes negros gruesos, sombras duras sin degradados y tipografías monoespaciadas, desafiando la simetría convencional."
  },
  vidrio_liquido: {
    title: "Vidrio Líquido (Liquid Glass / Aurora)",
    def: "Variación avanzada del glasmorfismo que incorpora degradados fluidos y formas orgánicas coloridas (blobs) que simulan auroras en constante movimiento detrás del vidrio."
  },
  bento_grid: {
    title: "Bento Grid",
    def: "Layout que organiza la información en bloques y tarjetas de diferentes tamaños agrupadas de forma compacta y armoniosa, similar a una bandeja de bento japonesa."
  },
  ui_espacial: {
    title: "UI Espacial (Spatial UI)",
    def: "Diseño para entornos tridimensionales y de realidad mixta que destaca por capas de vidrio flotantes sensibles a la luz física ambiental y sombras proyectadas ultraprofundas."
  }
};
