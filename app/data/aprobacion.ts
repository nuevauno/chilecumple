import type { EncuestaPunto } from "./types";

/**
 * Serie de tiempo de aprobacion presidencial. Se construye desde encuestas
 * publicas. La idea es contar la curva de los primeros 45 dias del gobierno.
 */
export const ENCUESTAS: EncuestaPunto[] = [
  // Linea base: votacion de segunda vuelta
  {
    slug: "segunda-vuelta-2025-12",
    encuestadora: "Cadem",
    fecha: "2025-12-15",
    aprobacion: 58,
    desaprobacion: 42,
    notas: "Resultado segunda vuelta presidencial: 58% vs 42%.",
  },
  // Marzo — primera semana
  {
    slug: "cadem-2026-03-13",
    encuestadora: "Cadem",
    fecha: "2026-03-13",
    aprobacion: 53,
    desaprobacion: 39,
    notas: "Primer corte tras asuncion el 11-mar. Luna de miel.",
  },
  {
    slug: "panel-udd-2026-03-13",
    encuestadora: "Panel UDD",
    fecha: "2026-03-13",
    aprobacion: 59,
    desaprobacion: 31,
    notas: "Linea base post-investidura.",
  },
  // Marzo — bencinazo y “Estado en quiebra”
  {
    slug: "cadem-2026-03-23",
    encuestadora: "Cadem",
    fecha: "2026-03-23",
    aprobacion: 47,
    desaprobacion: 49,
    notas: "Caida de 6 puntos. Anuncio del bencinazo.",
  },
  {
    slug: "cadem-2026-03-30",
    encuestadora: "Cadem",
    fecha: "2026-03-30",
    aprobacion: 45,
    desaprobacion: 51,
    notas: "Tras alza historica de combustibles. Quiroz y Sedini, los peor evaluados (50% y 51% desaprobacion).",
  },
  // Abril
  {
    slug: "cadem-2026-04-05",
    encuestadora: "Cadem",
    fecha: "2026-04-05",
    aprobacion: 42,
    desaprobacion: 52,
    notas: "78% considera que la economia esta estancada o retrocede. Inflacion como principal preocupacion (59%).",
  },
  {
    slug: "criteria-2026-04-12",
    encuestadora: "Criteria",
    fecha: "2026-04-12",
    aprobacion: 36,
    desaprobacion: 55,
    notas: "Tercera caida consecutiva en Criteria. Arrastrado por bencinazo y ataque a ministra Lincolao.",
  },
  {
    slug: "cadem-2026-04-12",
    encuestadora: "Cadem",
    fecha: "2026-04-12",
    aprobacion: 42,
    desaprobacion: 53,
    notas: "79% considera muy grave el ataque a la ministra Lincolao en la U. Austral.",
  },
  {
    slug: "cadem-2026-04-16",
    encuestadora: "Cadem",
    fecha: "2026-04-16",
    aprobacion: 40,
    desaprobacion: 55,
    notas: "62% desaprueba el almuerzo en La Moneda con 70 excompañeros de la PUC.",
  },
  {
    slug: "cadem-2026-04-19",
    encuestadora: "Cadem",
    fecha: "2026-04-19",
    aprobacion: 43,
    desaprobacion: 52,
    notas: "49% cree que la megareforma beneficia a los mas ricos.",
  },
  {
    slug: "cadem-2026-04-28",
    encuestadora: "Cadem",
    fecha: "2026-04-28",
    aprobacion: 40,
    desaprobacion: 57,
    notas:
      "Desaprobacion llega al maximo del mandato. Expectativas caen: controlar inmigracion 41% (-20), crecimiento 33% (-19), reducir delincuencia 33% (-21). 59% rechaza revisar/eliminar 142 programas y 54% rechaza recorte ministerial de 3%.",
    fuenteUrl:
      "https://www.biobiochile.cl/noticias/nacional/chile/2026/04/30/cadem-desaprobacion-de-kast-sube-a-57-y-caen-expectativas-en-economia-seguridad-e-inmigracion.shtml",
  },
  {
    slug: "cadem-2026-05-03",
    encuestadora: "Cadem",
    fecha: "2026-05-03",
    aprobacion: 39,
    desaprobacion: 57,
    notas:
      "Aprobacion cae a 39%, minimo desde la asuncion. 67% cree que el Estado esta sobrepasado por la delincuencia, 78% ve al crimen organizado como principal problema, 54% atribuye al Gobierno la principal responsabilidad y 85% califica mala o muy mala la situacion del empleo.",
    fuenteUrl:
      "https://www.latercera.com/nacional/noticia/cadem-aprobacion-de-kast-cae-a-su-nivel-mas-bajo-desde-que-asumio-y-67-cree-que-el-estado-esta-siendo-sobrepasado-por-la-delincuencia/?outputType=base-amp-type",
  },
  {
    slug: "pulso-ciudadano-2026-04-q2",
    encuestadora: "Pulso Ciudadano",
    fecha: "2026-04-30",
    aprobacion: 29.1,
    desaprobacion: 55.6,
    notas:
      "Pulso Ciudadano abril Q2 registra 29,1% de aprobacion presidencial y 55,6% de desaprobacion. El gabinete marca 24,1% de aprobacion y 62,7% de desaprobacion.",
    fuenteUrl:
      "https://www.biobiochile.cl/static/documentos/2026/05/260981_pulso_ciudadano_abril_q2_2026_0430_v1.pdf?title=PULSO_CIUDADANO_ABRIL_Q2_2026_0430_V1",
  },
];

export const SERIE_CADEM = ENCUESTAS.filter((e) => e.encuestadora === "Cadem")
  .sort((a, b) => a.fecha.localeCompare(b.fecha));

export const ULTIMA_APROBACION = (() => {
  const ultima = [...ENCUESTAS].sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  return ultima;
})();

/** Datos clave para el panel de “percepcion ciudadana”. */
export const PERCEPCION_CLAVES = [
  {
    valor: "78%",
    afirma: "considera que la economia esta estancada o retrocede",
    fuente: "Cadem 5-abr-2026",
  },
  {
    valor: "62%",
    afirma: "desaprueba el almuerzo de Kast con 70 excompañeros en La Moneda",
    fuente: "Cadem 16-abr-2026",
  },
  {
    valor: "79%",
    afirma: "considera muy grave el ataque a la ministra Lincolao",
    fuente: "Cadem 12-abr-2026",
  },
  {
    valor: "49%",
    afirma: "cree que la megareforma beneficia a los mas ricos",
    fuente: "Cadem 19-abr-2026",
  },
  {
    valor: "59%",
    afirma: "rechaza revisar o eliminar 142 programas estatales",
    fuente: "Cadem 28-abr-2026",
  },
  {
    valor: "57%",
    afirma: "desaprueba la gestion presidencial, maximo del mandato",
    fuente: "Cadem 28-abr-2026",
  },
  {
    valor: "39%",
    afirma: "aprueba la gestion presidencial, minimo desde la asuncion",
    fuente: "Cadem 3-may-2026",
  },
  {
    valor: "29,1%",
    afirma: "aprueba la gestion presidencial en Pulso Ciudadano abril Q2",
    fuente: "Pulso Ciudadano 30-abr-2026",
  },
  {
    valor: "24,1%",
    afirma: "aprueba al gabinete; 62,7% lo desaprueba",
    fuente: "Pulso Ciudadano 30-abr-2026",
  },
  {
    valor: "67%",
    afirma: "cree que el Estado esta sobrepasado por la delincuencia",
    fuente: "Cadem 3-may-2026",
  },
  {
    valor: "85%",
    afirma: "califica mala o muy mala la situacion del empleo",
    fuente: "Cadem 3-may-2026",
  },
  {
    valor: "59%",
    afirma: "ve la inflacion como principal preocupacion economica",
    fuente: "Cadem 5-abr-2026",
  },
  {
    valor: "+26 pts",
    afirma: "subio quienes creen que “Chile va por mal camino” desde el 11-mar",
    fuente: "Cadem 19-abr-2026",
  },
];
