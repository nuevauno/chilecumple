export type CamaraLegislativa = "diputados" | "senado";
export type VotoParlamentario = "a_favor" | "en_contra" | "abstencion" | "pendiente";

export interface FuenteVotacion {
  medio: string;
  titulo: string;
  url: string;
}

export interface ParlamentarioVoto {
  nombre: string;
  partido: string;
  camara: CamaraLegislativa;
  voto: VotoParlamentario;
  distritoRegion?: string;
  nota?: string;
}

export interface VotacionClave {
  slug: string;
  fecha: string;
  camara: CamaraLegislativa;
  instancia: string;
  titulo: string;
  proyecto: string;
  resultado: string;
  cifras: {
    favor: number;
    contra: number;
    abstencion: number;
  };
  lectura: string;
  estadoSenado?: string;
  votos: ParlamentarioVoto[];
  fuentes: FuenteVotacion[];
}

export interface ContrasteVoto {
  slug: string;
  fecha: string;
  actor: string;
  cargo: string;
  reclamoActual: string;
  registroAnterior: string;
  lectura: string;
  fuente: FuenteVotacion;
  severidad: 1 | 2 | 3 | 4;
}

export interface AntecedenteVoto {
  slug: string;
  fecha: string;
  camara: CamaraLegislativa;
  titulo: string;
  resultado: string;
  cifras: {
    favor: number;
    contra: number;
    abstencion: number;
  };
  quienesRechazaron: string;
  lectura: string;
  fuente: FuenteVotacion;
}

export interface FuenteOficialVotacion {
  slug: string;
  camara: CamaraLegislativa | "congreso";
  nombre: string;
  frecuencia: string;
  queEntrega: string;
  usoEditorial: string;
  url: string;
}

export interface RegistroOficialVotacion {
  slug: string;
  fecha: string;
  camara: CamaraLegislativa;
  tipo: "sala" | "comision";
  boletin?: string;
  titulo: string;
  resultado: string;
  cifras?: {
    favor: number;
    contra: number;
    abstencion: number;
  };
  lectura: string;
  fuente: FuenteVotacion;
}

export interface FuenteDatosLegislativos {
  nombre: string;
  uso: string;
  url: string;
}

export const FUENTES_DATOS_LEGISLATIVOS: FuenteDatosLegislativos[] = [
  {
    nombre: "Datos Abiertos del Congreso Nacional",
    uso: "Base oficial para proyectos, votaciones por boletin, detalle de votacion de la Camara y antecedentes del Senado.",
    url: "https://opendata.congreso.cl/",
  },
  {
    nombre: "Camara de Diputadas y Diputados",
    uso: "Detalle nominal de votaciones, sesiones y actas de sala o comision cuando estan publicadas.",
    url: "https://www.camara.cl/",
  },
  {
    nombre: "Senado de Chile",
    uso: "Votaciones y tramitacion cuando un proyecto llega al Senado.",
    url: "https://www.senado.cl/",
  },
  {
    nombre: "Cochid Congreso",
    uso: "API consolidada de parlamentarios y votaciones en tiempo real, atribuida a fuentes publicas del Congreso.",
    url: "https://congreso.cochid.cl/",
  },
];

export const FUENTES_OFICIALES_VOTACION: FuenteOficialVotacion[] = [
  {
    slug: "camara-ultimas-votaciones",
    camara: "diputados",
    nombre: "Camara: ultimas votaciones de Sala",
    frecuencia: "Se actualiza cada vez que la Camara publica resultados de sala.",
    queEntrega:
      "Listado de las ultimas 20 votaciones, con fecha, boletin o documento, materia, tipo, resultado y conteo afirmativo/negativo/abstencion.",
    usoEditorial:
      "Sirve para detectar todo lo votado, no solo la megarreforma: resoluciones, acuerdos, reclamaciones, cierres de debate, articulos y proyectos.",
    url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
  },
  {
    slug: "camara-detalle-votacion",
    camara: "diputados",
    nombre: "Camara: detalle nominal por votacion",
    frecuencia: "Disponible por ID de votacion una vez publicado el detalle.",
    queEntrega:
      "Lista nominal de diputadas y diputados a favor, en contra, abstencion y dispensados, mas quorum, sesion y tramite cuando corresponde.",
    usoEditorial:
      "Es la fuente base para decir exactamente como voto cada diputado en una votacion especifica.",
    url: "https://www.camara.cl/legislacion/sala_sesiones/votacion_detalle.aspx",
  },
  {
    slug: "senado-votaciones-sala",
    camara: "senado",
    nombre: "Senado: votaciones de Sala",
    frecuencia: "Se consulta por legislatura y sesion de sala.",
    queEntrega:
      "Votaciones de senadoras y senadores por proyecto tratado en sala, con conteos de Si, No, abstenciones y pareos cuando hay sesion seleccionada.",
    usoEditorial:
      "Activa el tablero de senadores apenas la megarreforma u otro proyecto relevante llegue a Sala del Senado.",
    url: "https://tramitacion.senado.cl/appsenado/index.php?ac=votacionSala&legiini=462&mo=sesionessala",
  },
  {
    slug: "senado-ultimos-tratados",
    camara: "senado",
    nombre: "Senado: ultimos proyectos tratados",
    frecuencia: "Ventana de los ultimos 15 dias en sala y comisiones.",
    queEntrega:
      "Fecha, boletin, comision o sala, materia, etapa, acuerdo y estado de proyectos tratados recientemente.",
    usoEditorial:
      "Permite monitorear proyectos antes de que tengan votacion nominal de sala, marcando lo pendiente sin inventar votos.",
    url: "https://tramitacion.senado.cl/appsenado/index.php?ac=ultimos_vistos&etc=&mo=tramitacion",
  },
  {
    slug: "senado-sala-sesiones",
    camara: "senado",
    nombre: "Senado: sala de sesiones",
    frecuencia: "Actualizacion institucional de tabla, resumen, cuenta, asistencia y votaciones.",
    queEntrega:
      "Entrada oficial del Senado para tabla semanal, sesiones, asistencia, votaciones y plazos de indicaciones.",
    usoEditorial:
      "Sirve para revisar agenda legislativa y cruzarla con votaciones nominales cuando se publique el detalle.",
    url: "https://www.senado.cl/actividad-legislativa/sala-de-sesiones",
  },
];

export const ULTIMAS_VOTACIONES_CAMARA: RegistroOficialVotacion[] = [
  {
    slug: "camara-2026-05-06-quorum-inadmisibilidad-18107-07",
    fecha: "2026-05-06",
    camara: "diputados",
    tipo: "sala",
    boletin: "18107-07",
    titulo:
      "Modifica la ley organica del Congreso en materia de quorum para revertir inadmisibilidades",
    resultado: "Rechazado",
    cifras: { favor: 73, contra: 73, abstencion: 1 },
    lectura:
      "Empate politico en una regla interna sensible: 73 contra 73. Es el tipo de votacion que debe entrar al monitor aunque no tenga relacion directa con la megarreforma.",
    fuente: {
      medio: "Camara de Diputadas y Diputados",
      titulo: "Ultimas votaciones realizadas",
      url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
    },
  },
  {
    slug: "camara-2026-05-06-prorroga-control-migratorio-fronteras",
    fecha: "2026-05-06",
    camara: "diputados",
    tipo: "sala",
    titulo:
      "Prorroga por 90 dias presencia de Fuerzas Armadas para control migratorio en Arica, Tarapaca y Antofagasta",
    resultado: "Aprobado",
    cifras: { favor: 141, contra: 2, abstencion: 5 },
    lectura:
      "Votacion amplia en seguridad fronteriza. Permite comparar discurso migratorio con votos concretos por bancada y parlamentario.",
    fuente: {
      medio: "Camara de Diputadas y Diputados",
      titulo: "Ultimas votaciones realizadas",
      url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
    },
  },
  {
    slug: "camara-2026-05-06-recorte-salud-acuerdo-9",
    fecha: "2026-05-06",
    camara: "diputados",
    tipo: "sala",
    boletin: "P. Acuerdo N° 9",
    titulo:
      "Preocupacion por recorte de 3% al presupuesto de Salud y su impacto en usuarios y sistema publico",
    resultado: "Aprobado",
    cifras: { favor: 79, contra: 47, abstencion: 19 },
    lectura:
      "Este acuerdo conecta directamente con el barrido de recortes: muestra quien voto respaldar una alerta por Salud y quien voto contra ella.",
    fuente: {
      medio: "Camara de Diputadas y Diputados",
      titulo: "Ultimas votaciones realizadas",
      url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
    },
  },
  {
    slug: "camara-2026-05-05-mepco-restablecer-criterio",
    fecha: "2026-05-05",
    camara: "diputados",
    tipo: "sala",
    boletin: "P. Resolucion N° 94",
    titulo:
      "Solicita restablecer el antiguo criterio del MEPCO para contener alzas de combustibles",
    resultado: "Aprobado",
    cifras: { favor: 66, contra: 63, abstencion: 0 },
    lectura:
      "Votacion estrecha sobre bolsillo y combustibles. Es una pista para cruzar discurso de alivio economico con comportamiento legislativo.",
    fuente: {
      medio: "Camara de Diputadas y Diputados",
      titulo: "Ultimas votaciones realizadas",
      url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
    },
  },
  {
    slug: "camara-2026-05-05-servicios-sanitarios-17872-33",
    fecha: "2026-05-05",
    camara: "diputados",
    tipo: "sala",
    boletin: "17872-33",
    titulo:
      "Estandar minimo de reduccion de aguas no facturadas en servicios sanitarios",
    resultado: "General aprobado y votacion particular rechazada",
    cifras: { favor: 78, contra: 65, abstencion: 3 },
    lectura:
      "La Camara aprobo la idea general pero rechazo el articulo particular por falta de votos suficientes. El monitor debe distinguir resultado general y votaciones particulares.",
    fuente: {
      medio: "Camara de Diputadas y Diputados",
      titulo: "Ultimas votaciones realizadas",
      url: "https://www.camara.cl/legislacion/sala_sesiones/votaciones.aspx",
    },
  },
];

export const ULTIMOS_TRATADOS_SENADO: RegistroOficialVotacion[] = [
  {
    slug: "senado-2026-05-06-transportista-escolar-16433-18",
    fecha: "2026-05-06",
    camara: "senado",
    tipo: "sala",
    boletin: "16433-18",
    titulo:
      "Responsabilidad del transportista escolar durante traslado de niños, niñas y adolescentes",
    resultado: "Aprobado en general; indicaciones hasta el 4 de junio de 2026 a las 12:00.",
    lectura:
      "El Senado lo registra como proyecto tratado en sala. Aun no se incorpora voto nominal en el tablero hasta contar con detalle de votacion.",
    fuente: {
      medio: "Senado de Chile",
      titulo: "Proyectos tratados en los ultimos 15 dias",
      url: "https://tramitacion.senado.cl/appsenado/index.php?ac=ultimos_vistos&etc=&mo=tramitacion",
    },
  },
  {
    slug: "senado-2026-05-05-ingreso-clandestino-15261-25",
    fecha: "2026-05-05",
    camara: "senado",
    tipo: "sala",
    boletin: "15261-25",
    titulo:
      "Tipifica el delito de ingreso clandestino al territorio nacional",
    resultado: "Aprobado en general; indicaciones hasta el 28 de mayo de 2026 a las 12:00.",
    lectura:
      "Materia central para el eje migratorio. Debe seguirse hasta que exista detalle nominal de Sala.",
    fuente: {
      medio: "Senado de Chile",
      titulo: "Proyectos tratados en los ultimos 15 dias",
      url: "https://tramitacion.senado.cl/appsenado/index.php?ac=ultimos_vistos&etc=&mo=tramitacion",
    },
  },
  {
    slug: "senado-2026-05-05-permisos-urbanizacion-17287-14",
    fecha: "2026-05-05",
    camara: "senado",
    tipo: "sala",
    boletin: "17287-14",
    titulo:
      "Agiliza la obtencion de permisos de urbanizacion y edificacion",
    resultado: "Aprobado con modificaciones en discusion particular.",
    lectura:
      "Proyecto de vivienda y permisos. Es relevante para comparar el relato de acelerar inversion con votos y modificaciones concretas.",
    fuente: {
      medio: "Senado de Chile",
      titulo: "Proyectos tratados en los ultimos 15 dias",
      url: "https://tramitacion.senado.cl/appsenado/index.php?ac=ultimos_vistos&etc=&mo=tramitacion",
    },
  },
  {
    slug: "senado-2026-05-06-electrodependientes-voto-obligatorio-18003-35",
    fecha: "2026-05-06",
    camara: "senado",
    tipo: "comision",
    boletin: "18003-35",
    titulo:
      "Exime al Servel de denunciar a personas postradas y electrodependientes por incumplir obligacion de sufragar",
    resultado: "Se inicio la discusion; continuar en una proxima sesion.",
    lectura:
      "Aun no es voto de Sala, pero el Senado lo informa como tratado recientemente. Se marca pendiente para no confundir discusion con aprobacion.",
    fuente: {
      medio: "Senado de Chile",
      titulo: "Proyectos tratados en los ultimos 15 dias",
      url: "https://tramitacion.senado.cl/appsenado/index.php?ac=ultimos_vistos&etc=&mo=tramitacion",
    },
  },
];

export const VOTACIONES_CLAVE: VotacionClave[] = [
  {
    slug: "megarreforma-hacienda-idea-legislar-2026-05-07",
    fecha: "2026-05-07",
    camara: "diputados",
    instancia: "Comision de Hacienda de la Camara",
    titulo: "La megarreforma paso su primer filtro: 8 a favor, 4 en contra y 1 abstencion",
    proyecto: "Ley para la Reconstruccion Nacional y el Desarrollo Economico Social",
    resultado: "Aprobada en general en comision; pasa a discusion en particular.",
    cifras: {
      favor: 8,
      contra: 4,
      abstencion: 1,
    },
    lectura:
      "El primer registro nominal muestra que el oficialismo voto cerrado a favor y que la abstencion clave fue del PDG, justo cuando el gobierno acusaba obstruccion y negociaba a contrarreloj.",
    estadoSenado:
      "Al 9 de mayo de 2026 no hay votacion del Senado sobre este proyecto: el propio cronograma oficialista apunta a que la Camara lo vote antes del 18 de mayo y que el Senado empiece despues.",
    votos: [
      { nombre: "Agustin Romero", partido: "REP", camara: "diputados", voto: "a_favor", nota: "Presidio la instancia." },
      { nombre: "Felipe Ross", partido: "REP", camara: "diputados", voto: "a_favor" },
      { nombre: "Jose Carlos Meza", partido: "REP", camara: "diputados", voto: "a_favor" },
      { nombre: "Jaime Coloma", partido: "UDI", camara: "diputados", voto: "a_favor" },
      { nombre: "Flor Weisse", partido: "UDI", camara: "diputados", voto: "a_favor" },
      { nombre: "Eduardo Duran", partido: "RN", camara: "diputados", voto: "a_favor" },
      { nombre: "Diego Schalper", partido: "RN", camara: "diputados", voto: "a_favor" },
      { nombre: "Pier Karlezi", partido: "PNL", camara: "diputados", voto: "a_favor" },
      { nombre: "Carlos Bianchi", partido: "IND-PPD", camara: "diputados", voto: "en_contra" },
      { nombre: "Jorge Brito", partido: "FA", camara: "diputados", voto: "en_contra" },
      { nombre: "Priscilla Castillo", partido: "DC", camara: "diputados", voto: "en_contra" },
      { nombre: "Boris Barrera", partido: "PC", camara: "diputados", voto: "en_contra" },
      { nombre: "Zandra Parisi", partido: "PDG", camara: "diputados", voto: "abstencion", nota: "Unica abstencion." },
    ],
    fuentes: [
      {
        medio: "T13",
        titulo: "Comision de Hacienda aprueba idea de legislar proyecto de Reconstruccion nacional del Gobierno",
        url: "https://www.t13.cl/noticia/politica/comision-hacienda-aprueba-idea-legislar-proyecto-reconstruccion-gobierno",
      },
      {
        medio: "El Pais Chile",
        titulo: "La megarreforma de Kast supera su primer tramite legislativo",
        url: "https://elpais.com/chile/2026-05-07/la-megarreforma-de-kast-supera-su-primer-tramite-legislativo.html",
      },
    ],
  },
];

export const CONTRASTES_VOTO: ContrasteVoto[] = [
  {
    slug: "republicanos-boicot-vs-idea-legislar-boric",
    fecha: "2026-04-22",
    actor: "Bancada de diputados del Partido Republicano",
    cargo: "Diputados de oposicion durante el gobierno de Gabriel Boric",
    reclamoActual:
      "Kast y el oficialismo pidieron no rechazar siquiera la idea de legislar la megarreforma y calificaron como poco serio o mezquino bloquear el debate inicial.",
    registroAnterior:
      "La Tercera registro que la bancada republicana voto contra la idea de legislar o el contenido de reformas estructurales de Boric: reforma tributaria de 2023, sueldo minimo de 2023, cumplimiento tributario de 2024, pensiones de 2025 y Sistema Nacional de Cuidados de 2025.",
    lectura:
      "Si votar contra la idea de legislar hoy es 'boicot', entonces el mismo criterio debe aplicarse al historial republicano como oposicion. La vara no puede cambiar cuando el gobierno cambia de lado.",
    fuente: {
      medio: "La Tercera",
      titulo: "Las veces en que el Partido Republicano voto en contra de la idea de legislar los proyectos del gobierno de Boric",
      url: "https://www.latercera.com/politica/noticia/las-veces-en-que-el-partido-republicano-voto-en-contra-de-la-idea-de-legislar-los-proyectos-del-gobierno-de-boric/",
    },
    severidad: 4,
  },
  {
    slug: "tsunami-indicaciones-vs-paquete-40-medidas",
    fecha: "2026-05-07",
    actor: "Gobierno y oposiciones",
    cargo: "Tramitacion de la megarreforma",
    reclamoActual:
      "El gobierno acusa obstruccion ante la posibilidad de muchas indicaciones al proyecto.",
    registroAnterior:
      "El paquete tiene cerca de 40 medidas economicas, tributarias, laborales, ambientales y de vivienda; el Ejecutivo fijo suma urgencia y busca cerrar la Camara antes del 18 de mayo.",
    lectura:
      "Mientras mas materias distintas se concentran en una sola ley, mas indicaciones son esperables. La pregunta diaria no es solo quien bloquea, sino quien intenta legislar demasiado en un solo paquete.",
    fuente: {
      medio: "El Pais Chile",
      titulo: "La megarreforma de Kast supera su primer tramite legislativo",
      url: "https://elpais.com/chile/2026-05-07/la-megarreforma-de-kast-supera-su-primer-tramite-legislativo.html",
    },
    severidad: 3,
  },
  {
    slug: "pdg-quiebre-vs-negociacion-opaca",
    fecha: "2026-05-07",
    actor: "PDG y Gobierno",
    cargo: "Bancada bisagra en la Camara",
    reclamoActual:
      "El Ejecutivo necesita votos fuera de su coalicion y atribuye tension legislativa a la oposicion.",
    registroAnterior:
      "El Pais reporto que las derechas suman 76 escanos y las oposiciones 79, por lo que el gobierno negocia con el PDG. T13 consigno que Zandra Parisi se abstuvo en Hacienda tras el quiebre anunciado por su partido.",
    lectura:
      "La aritmetica explica mas que el relato: sin mayoria propia, cada voto se vuelve trazable. Esta seccion debe mostrar quien sostuvo, quien rechazo y quien dejo la puerta entreabierta.",
    fuente: {
      medio: "El Pais Chile / T13",
      titulo: "Aritmetica legislativa y abstencion PDG en la megarreforma",
      url: "https://elpais.com/chile/2026-05-07/la-megarreforma-de-kast-supera-su-primer-tramite-legislativo.html",
    },
    severidad: 3,
  },
];

export const HISTORIAL_VOTOS_BORIC: AntecedenteVoto[] = [
  {
    slug: "boric-reforma-tributaria-2023-rechazada",
    fecha: "2023-03-08",
    camara: "diputados",
    titulo: "Reforma tributaria de Boric rechazada en general",
    resultado: "La Camara rechazo la idea de legislar: 73 a favor, 71 en contra y 3 abstenciones.",
    cifras: {
      favor: 73,
      contra: 71,
      abstencion: 3,
    },
    quienesRechazaron:
      "Oposicion y votos clave fuera del oficialismo; fue una de las derrotas legislativas centrales del gobierno de Boric.",
    lectura:
      "La derecha uso el rechazo en general como herramienta politica en una reforma estructural. Ese antecedente importa cuando hoy se presenta el rechazo a una idea de legislar como boicot antidemocratico.",
    fuente: {
      medio: "Emol",
      titulo: "Como votaron los diputados al rechazar en general la reforma tributaria presentada por el gobierno",
      url: "https://www.emol.com/noticias/Economia/2023/03/08/1088739/votacion-diputados-reforma-tributaria-boric.html",
    },
  },
  {
    slug: "boric-sueldo-minimo-2023-republicanos-udi",
    fecha: "2023-05-10",
    camara: "diputados",
    titulo: "Sueldo minimo a $500 mil: UDI se cuadro con Republicanos en el rechazo",
    resultado: "La Camara aprobo el reajuste por 120 votos a favor, 24 en contra y 3 abstenciones.",
    cifras: {
      favor: 120,
      contra: 24,
      abstencion: 3,
    },
    quienesRechazaron:
      "BioBioChile consigno votos en contra de Republicanos y 10 votos UDI, incluyendo Flor Weisse.",
    lectura:
      "Cuando la derecha se opuso al alza gradual del minimo, tambien existia un relato de costo fiscal, pymes y empleo. Esa discusion ayuda a leer las votaciones actuales sobre salario, impuestos y empleo sin doble vara.",
    fuente: {
      medio: "BioBioChile",
      titulo: "La UDI se cuadro con Republicanos: como votaron los diputados el reajuste al salario minimo a $500 mil",
      url: "https://www.biobiochile.cl/noticias/nacional/chile/2023/05/10/la-udi-se-cuadro-con-republicanos-como-votaron-los-diputados-el-reajuste-al-salario-minimo-a-500-mil.shtml",
    },
  },
  {
    slug: "boric-pensiones-2024-chile-vamos-republicanos",
    fecha: "2024-01-24",
    camara: "diputados",
    titulo: "Pensiones: Chile Vamos y Republicanos votaron contra la idea de legislar",
    resultado: "La reforma previsional fue aprobada en general por 84 votos a favor, 64 en contra y 3 abstenciones.",
    cifras: {
      favor: 84,
      contra: 64,
      abstencion: 3,
    },
    quienesRechazaron:
      "La Tercera titulo el bloque de rechazo como Chile Vamos y Republicanos en contra.",
    lectura:
      "La reforma de pensiones si siguio tramitando, pero el voto inicial contra la idea de legislar existio. Hoy ese mismo gesto se condena cuando afecta a Kast.",
    fuente: {
      medio: "La Tercera",
      titulo: "Camara aprueba con 84 votos a favor idea de legislar de la reforma de pensiones",
      url: "https://www.latercera.com/la-tercera-pm/noticia/camara-aprueba-con-84-votos-a-favor-idea-de-legislar-de-la-reforma-de-pensiones/G3GTADHRPVAGJCQ6KH4QPBHI4U/",
    },
  },
  {
    slug: "boric-cumplimiento-tributario-2024-republicanos",
    fecha: "2024-04-10",
    camara: "diputados",
    titulo: "Cumplimiento tributario: solo Republicanos voto en contra",
    resultado: "La Camara aprobo en general el proyecto por 120 votos a favor, 18 en contra y 3 abstenciones.",
    cifras: {
      favor: 120,
      contra: 18,
      abstencion: 3,
    },
    quienesRechazaron:
      "Emol identifico que solo votaron en contra diputados de la bancada republicana.",
    lectura:
      "El antecedente muestra que el Partido Republicano tambien rechazo proyectos de recaudacion y control fiscal del gobierno anterior, incluso cuando otras derechas se abrieron a acuerdos.",
    fuente: {
      medio: "Emol",
      titulo: "Con el rechazo de republicanos: Camara aprueba proyecto de cumplimiento tributario, parte del pacto fiscal",
      url: "https://www.emol.com/noticias/Economia/2024/04/10/1127436/cumplimiento-tributario-pacto-fiscal.html",
    },
  },
];

export const PROXIMOS_HITOS_VOTACION = [
  {
    fecha: "2026-05-11",
    titulo: "Vence plazo para indicaciones en Hacienda",
    detalle: "La discusion en particular debe mostrar que cambios intenta introducir cada bancada.",
    fuente: VOTACIONES_CLAVE[0].fuentes[0],
  },
  {
    fecha: "2026-05-18",
    titulo: "Meta del oficialismo: votacion en la Camara",
    detalle: "El gobierno necesita 78 votos; las derechas suman 76 escanos segun El Pais.",
    fuente: VOTACIONES_CLAVE[0].fuentes[1],
  },
  {
    fecha: "2026-05-21",
    titulo: "Objetivo politico: iniciar Senado antes del feriado",
    detalle: "Cuando llegue al Senado se activa el tablero nominal de senadores.",
    fuente: VOTACIONES_CLAVE[0].fuentes[1],
  },
];

export function votacionesOrdenadas() {
  return [...VOTACIONES_CLAVE].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function contrastesVotoOrdenados() {
  return [...CONTRASTES_VOTO].sort((a, b) => b.severidad - a.severidad || b.fecha.localeCompare(a.fecha));
}

export function historialVotosBoricOrdenado() {
  return [...HISTORIAL_VOTOS_BORIC].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function ultimasVotacionesCamaraOrdenadas() {
  return [...ULTIMAS_VOTACIONES_CAMARA].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function ultimosTratadosSenadoOrdenados() {
  return [...ULTIMOS_TRATADOS_SENADO].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function votosPorTipo(votos: ParlamentarioVoto[]) {
  return votos.reduce(
    (acc, voto) => {
      acc[voto.voto] += 1;
      return acc;
    },
    { a_favor: 0, en_contra: 0, abstencion: 0, pendiente: 0 } satisfies Record<VotoParlamentario, number>
  );
}

export const VOTACIONES_STATS = {
  votaciones: VOTACIONES_CLAVE.length,
  parlamentariosRegistrados: VOTACIONES_CLAVE.reduce((sum, v) => sum + v.votos.length, 0),
  contrastes: CONTRASTES_VOTO.length,
  antecedentes: HISTORIAL_VOTOS_BORIC.length,
  oficialesCamara: ULTIMAS_VOTACIONES_CAMARA.length,
  oficialesSenado: ULTIMOS_TRATADOS_SENADO.length,
  fuentes: FUENTES_DATOS_LEGISLATIVOS.length,
  fuentesOficiales: FUENTES_OFICIALES_VOTACION.length,
};
