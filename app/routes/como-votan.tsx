import { Link } from "react-router";
import {
  CONTRASTES_VOTO,
  FUENTES_OFICIALES_VOTACION,
  PROXIMOS_HITOS_VOTACION,
  VOTACIONES_STATS,
  contrastesVotoOrdenados,
  historialVotosBoricOrdenado,
  ultimasVotacionesCamaraOrdenadas,
  ultimosTratadosSenadoOrdenados,
  votacionesOrdenadas,
  votosPorTipo,
  type CamaraLegislativa,
  type FuenteVotacion,
  type RegistroOficialVotacion,
  type VotoParlamentario,
} from "~/data/votaciones";
import { createMeta } from "~/lib/meta";
import { PageShare, ShareButton } from "~/components/ShareButton";

export function meta() {
  return createMeta({
    title: "Como votan diputados y senadores — Chile Cumple",
    description:
      "Registro diario de como votan diputados y senadores, que significa cada votacion y que contradicciones aparecen cuando hoy acusan boicot.",
    path: "/como-votan",
  });
}

export async function loader() {
  return {
    votaciones: votacionesOrdenadas(),
    contrastes: contrastesVotoOrdenados(),
    historial: historialVotosBoricOrdenado(),
    camaraOficial: ultimasVotacionesCamaraOrdenadas(),
    senadoOficial: ultimosTratadosSenadoOrdenados(),
    fuentesOficiales: FUENTES_OFICIALES_VOTACION,
    hitos: PROXIMOS_HITOS_VOTACION,
  };
}

const votoLabel: Record<VotoParlamentario, string> = {
  a_favor: "A favor",
  en_contra: "En contra",
  abstencion: "Abstencion",
  pendiente: "Pendiente",
};

const votoClass: Record<VotoParlamentario, string> = {
  a_favor: "pill-bueno",
  en_contra: "pill-malo",
  abstencion: "pill-feo",
  pendiente: "pill-neutral",
};

const camaraLabel: Record<CamaraLegislativa, string> = {
  diputados: "Diputadas y Diputados",
  senado: "Senado",
};

const fecha = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Santiago",
  });

export default function ComoVotan({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
  const { votaciones, contrastes, hitos } = loaderData;
  const { historial, camaraOficial, senadoOficial, fuentesOficiales } = loaderData;
  const ultima = votaciones[0];
  const conteo = ultima ? votosPorTipo(ultima.votos) : { a_favor: 0, en_contra: 0, abstencion: 0, pendiente: 0 };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[--color-fg] impact-panel">
        <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="label text-[--color-malo]">Votos bajo lupa</p>
          <h1 className="mt-3 headline-display text-[clamp(3rem,9vw,8rem)] max-w-[11ch]">
            Como votan.
          </h1>
          <p className="mt-6 max-w-4xl text-lg sm:text-xl text-[--color-fg-2] leading-relaxed">
            Esta sección muestra qué votan diputados y senadores, qué significa cada votación para la gente
            y cuándo el discurso político choca con el voto real. No basta decir "estoy por la seguridad",
            "defiendo la salud" o "no hago obstrucción": acá se mira el botón que apretaron.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <PageShare title="Como votan diputados y senadores — Chile Cumple" path="/como-votan" />
            <a href="#donde-se-revisa" className="btn btn-secondary">Fuentes públicas</a>
            <a href="#votacion-dia" className="btn btn-primary">Votación clave</a>
            <a href="#ultimas-camara-senado" className="btn btn-secondary">Más votaciones</a>
            <a href="#contrastes" className="btn btn-secondary">Ver contradicciones</a>
          </div>

          <div className="mt-10 grid sm:grid-cols-4 gap-3 max-w-5xl">
            <StatCard label="Votaciones clave" value={String(VOTACIONES_STATS.votaciones)} />
            <StatCard label="Votos revisados" value={String(VOTACIONES_STATS.parlamentariosRegistrados)} tone="malo" />
            <StatCard label="Contrastes" value={String(CONTRASTES_VOTO.length)} tone="feo" />
            <StatCard label="Cámara" value={String(VOTACIONES_STATS.oficialesCamara)} tone="info" />
            <StatCard label="Senado" value={String(VOTACIONES_STATS.oficialesSenado)} tone="info" />
            <StatCard label="Archivo Boric" value={String(VOTACIONES_STATS.antecedentes)} tone="info" />
            <StatCard label="Fuentes públicas" value={String(VOTACIONES_STATS.fuentesOficiales)} tone="info" />
          </div>
        </div>
      </section>

      <section id="donde-se-revisa" className="border-b border-[--color-fg]" style={{ background: "linear-gradient(180deg, rgba(29,78,216,0.06), transparent)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <header className="lg:col-span-4">
              <p className="label text-[--color-info]">Fuentes públicas</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                El voto queda escrito.
              </h2>
              <p className="mt-5 text-sm text-[--color-fg-2] leading-relaxed">
                Cámara y Senado publican votaciones, sesiones y proyectos tratados. Esta sección ordena esos registros:
                explica de qué se trata cada votación, a quién afecta y qué contradicción política deja a la vista.
              </p>
            </header>
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-3">
              {fuentesOficiales.map((fuente) => (
                <article key={fuente.slug} className="card p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`pill ${fuente.camara === "senado" ? "pill-info" : fuente.camara === "diputados" ? "pill-bueno" : "pill-neutral"}`}>
                      {fuente.camara === "diputados" ? "Cámara" : fuente.camara === "senado" ? "Senado" : "Congreso"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black tracking-tight leading-tight">{fuente.nombre}</h3>
                  <p className="mt-3 text-sm text-[--color-fg-2] leading-relaxed">{fuente.queEntrega}</p>
                  <p className="mt-3 text-sm text-[--color-fg] leading-relaxed">
                    {fuente.usoEditorial}
                  </p>
                  <a href={fuente.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-xs font-bold text-[--color-accent] hover:text-[--color-accent-hover]">
                    Ver en el Congreso ↗
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ultimas-camara-senado" className="border-b border-[--color-border]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <header className="lg:col-span-4">
              <p className="label text-[--color-malo]">Lo último oficial</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                No solo la megarreforma.
              </h2>
              <p className="mt-5 text-sm text-[--color-fg-2] leading-relaxed">
                No todo pasa por la megarreforma. Salud, migración, combustibles, agua, vivienda y reglas del Congreso
                también se votan. Cada caso importa porque revela prioridades concretas.
              </p>
            </header>
            <div className="lg:col-span-8 grid gap-6">
              <OfficialFeed
                title="Últimas votaciones de la Cámara"
                description="Resultados publicados por la Cámara de Diputadas y Diputados. Aquí se explica qué estaba en juego en cada votación."
                items={camaraOficial}
              />
              <OfficialFeed
                title="Últimos proyectos tratados en Senado"
                description="Proyectos recientes vistos por el Senado. Cuando todavía no hay votación final, se explica que sigue abierto."
                items={senadoOficial}
              />
            </div>
          </div>
        </div>
      </section>

      {ultima && (
        <section id="votacion-dia" className="border-b border-[--color-border]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <header className="lg:col-span-4">
                <p className="label text-[--color-malo]">Votación clave</p>
                <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                  {ultima.titulo}
                </h2>
                <p className="mt-5 text-sm text-[--color-fg-2] leading-relaxed">
                  {ultima.lectura}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <MiniCount label="A favor" value={conteo.a_favor} cls="text-[--color-bueno]" />
                  <MiniCount label="En contra" value={conteo.en_contra} cls="text-[--color-malo]" />
                  <MiniCount label="Abst." value={conteo.abstencion} cls="text-[--color-feo]" />
                </div>
                {ultima.estadoSenado && (
                  <div className="mt-5 rounded-lg border border-[--color-border-strong] bg-[--color-surface-2] p-4">
                    <p className="label text-[10px]">Senadores</p>
                    <p className="mt-2 text-sm text-[--color-fg-2] leading-relaxed">{ultima.estadoSenado}</p>
                  </div>
                )}
              </header>

              <div className="lg:col-span-8">
                <article id={ultima.slug} className="card p-5 sm:p-7 scroll-mt-24">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="pill pill-info">{camaraLabel[ultima.camara]}</span>
                    <span className="text-[--color-fg-4]">·</span>
                    <span className="num text-[10px] uppercase tracking-wider text-[--color-fg-3]">
                      {fecha(ultima.fecha)}
                    </span>
                    <span className="text-[--color-fg-4]">·</span>
                    <span className="font-bold text-[--color-fg-2]">{ultima.instancia}</span>
                  </div>
                  <p className="mt-4 text-sm text-[--color-fg-2] leading-relaxed">
                    <span className="font-bold text-[--color-fg]">Proyecto:</span> {ultima.proyecto}
                  </p>
                  <p className="mt-2 text-sm text-[--color-fg-2] leading-relaxed">
                    <span className="font-bold text-[--color-fg]">Resultado:</span> {ultima.resultado}
                  </p>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[--color-border] text-left">
                          <th className="py-3 pr-4 label text-[10px]">Parlamentario</th>
                          <th className="py-3 pr-4 label text-[10px]">Partido</th>
                          <th className="py-3 pr-4 label text-[10px]">Voto</th>
                          <th className="py-3 label text-[10px]">Nota</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ultima.votos.map((voto) => (
                          <tr key={`${voto.nombre}-${voto.partido}`} className="border-b border-[--color-border] last:border-0">
                            <td className="py-3 pr-4 font-black text-[--color-fg] whitespace-nowrap">{voto.nombre}</td>
                            <td className="py-3 pr-4 num text-xs text-[--color-fg-3]">{voto.partido}</td>
                            <td className="py-3 pr-4">
                              <span className={`pill ${votoClass[voto.voto]}`}>{votoLabel[voto.voto]}</span>
                            </td>
                            <td className="py-3 text-xs text-[--color-fg-3]">{voto.nota ?? "Sin nota adicional"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 text-xs">
                    {ultima.fuentes.map((fuente) => (
                      <FuenteLink key={fuente.url} fuente={fuente} />
                    ))}
                    <ShareButton
                      title={ultima.titulo}
                      text={ultima.lectura}
                      path="/como-votan"
                      hash={ultima.slug}
                      variant="quiet"
                      className="sm:ml-auto"
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="contrastes" className="border-b border-[--color-fg]" style={{ background: "linear-gradient(180deg, rgba(185,28,28,0.05), transparent)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <header className="lg:col-span-4">
              <p className="label text-[--color-malo]">La vara vuelve</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                Lo que hoy llaman boicot.
              </h2>
              <p className="mt-5 text-sm text-[--color-fg-2] leading-relaxed">
                Votar en contra puede ser legítimo. El problema es la doble vara: cuando ellos lo hicieron,
                era fiscalización; cuando otros lo hacen, lo llaman boicot.
              </p>
            </header>

            <ol className="lg:col-span-8 grid gap-4">
              {contrastes.map((caso, index) => (
                <li key={caso.slug} id={caso.slug} className="scroll-mt-24">
                  <article className={`card kinetic-card p-6 sm:p-7 ${index < 6 ? `stagger-${(index % 6) + 1}` : ""}`}>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="pill pill-malo">Contraste</span>
                      <span className="text-[--color-fg-4]">·</span>
                      <span className="num text-[10px] uppercase tracking-wider text-[--color-fg-3]">{fecha(caso.fecha)}</span>
                      <span className="ml-auto num text-2xl font-black text-[--color-fg-4]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black tracking-tight leading-tight">{caso.actor}</h3>
                    <p className="mt-1 text-xs text-[--color-fg-3]">{caso.cargo}</p>
                    <div className="mt-5 grid md:grid-cols-3 gap-4">
                      <TextBlock label="Reclamo actual" text={caso.reclamoActual} />
                      <TextBlock label="Registro anterior" text={caso.registroAnterior} />
                      <TextBlock label="Lo que revela" text={caso.lectura} emphasis />
                    </div>
                    <div className="mt-5 pt-5 border-t border-[--color-border] flex flex-wrap gap-3 text-xs">
                      <FuenteLink fuente={caso.fuente} />
                      <ShareButton
                        title={`Como votan: ${caso.actor}`}
                        text={caso.lectura}
                        path="/como-votan"
                        hash={caso.slug}
                        variant="quiet"
                        className="sm:ml-auto"
                      />
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="archivo-boric-votaciones" className="border-b border-[--color-border]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <header className="lg:col-span-4">
              <p className="label text-[--color-malo]">Historial cuando eran oposición</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                También rechazaron legislar.
              </h2>
              <p className="mt-5 text-sm text-[--color-fg-2] leading-relaxed">
                Estos antecedentes no dicen que votar en contra sea ilegítimo. Dicen algo más preciso:
                si hoy se acusa boicot por votar contra una idea de legislar, entonces hay que medir
                con la misma regla el archivo republicano y de Chile Vamos durante Boric.
              </p>
            </header>

            <div className="lg:col-span-8 grid gap-4">
              {historial.map((caso) => (
                <article key={caso.slug} id={caso.slug} className="card p-6 sm:p-7 scroll-mt-24">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="pill pill-neutral">{camaraLabel[caso.camara]}</span>
                    <span className="text-[--color-fg-4]">·</span>
                    <span className="num text-[10px] uppercase tracking-wider text-[--color-fg-3]">{fecha(caso.fecha)}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight leading-tight">{caso.titulo}</h3>
                  <p className="mt-3 text-sm text-[--color-fg-2] leading-relaxed">{caso.resultado}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2 max-w-lg">
                    <MiniCount label="A favor" value={caso.cifras.favor} cls="text-[--color-bueno]" />
                    <MiniCount label="En contra" value={caso.cifras.contra} cls="text-[--color-malo]" />
                    <MiniCount label="Abst." value={caso.cifras.abstencion} cls="text-[--color-feo]" />
                  </div>

                  <div className="mt-5 grid md:grid-cols-2 gap-4">
                    <TextBlock label="Quienes rechazaron" text={caso.quienesRechazaron} />
                    <TextBlock label="Lo que revela" text={caso.lectura} emphasis />
                  </div>

                  <div className="mt-5 pt-5 border-t border-[--color-border] flex flex-wrap gap-3 text-xs">
                    <FuenteLink fuente={caso.fuente} />
                    <ShareButton
                      title={`Archivo de votos: ${caso.titulo}`}
                      text={caso.lectura}
                      path="/como-votan"
                      hash={caso.slug}
                      variant="quiet"
                      className="sm:ml-auto"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[--color-border]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <header className="lg:col-span-4">
              <p className="label text-[--color-info]">Lo próximo</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
                Que mirar esta semana.
              </h2>
            </header>
            <div className="lg:col-span-8 grid md:grid-cols-3 gap-3">
              {hitos.map((hito) => (
                <article key={hito.fecha} className="card p-5">
                  <p className="num text-xs font-black text-[--color-accent]">{fecha(hito.fecha)}</p>
                  <h3 className="mt-3 text-lg font-black tracking-tight leading-tight">{hito.titulo}</h3>
                  <p className="mt-3 text-sm text-[--color-fg-2] leading-relaxed">{hito.detalle}</p>
                  <div className="mt-4">
                    <FuenteLink fuente={hito.fuente} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function StatCard({ label, value, tone = "fg" }: { label: string; value: string; tone?: "fg" | "malo" | "feo" | "info" }) {
  const color =
    tone === "malo"
      ? "text-[--color-malo]"
      : tone === "feo"
      ? "text-[--color-feo]"
      : tone === "info"
      ? "text-[--color-info]"
      : "text-[--color-fg]";
  return (
    <div className="card kinetic-card p-5">
      <p className="label">{label}</p>
      <p className={`mt-2 num text-5xl font-black tracking-tighter number-kick ${color}`}>{value}</p>
    </div>
  );
}

function MiniCount({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="rounded-lg border border-[--color-border] bg-[--color-surface] p-4">
      <p className="label text-[10px]">{label}</p>
      <p className={`mt-2 num text-4xl font-black ${cls}`}>{value}</p>
    </div>
  );
}

function OfficialFeed({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: RegistroOficialVotacion[];
}) {
  return (
    <article className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-[--color-fg-2] leading-relaxed">{description}</p>
        </div>
        <span className="pill pill-info">{items.length} votaciones</span>
      </div>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item.slug} id={item.slug} className="rounded-xl border border-[--color-border] bg-[--color-bg] p-4 scroll-mt-24">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`pill ${item.camara === "senado" ? "pill-info" : "pill-bueno"}`}>
                {camaraLabel[item.camara]}
              </span>
              <span className="pill pill-neutral">{item.tipo === "sala" ? "Sala" : "Comisión"}</span>
              {item.boletin && <span className="num text-[10px] font-black text-[--color-fg-3]">{item.boletin}</span>}
              <span className="text-[--color-fg-4]">·</span>
              <span className="num text-[10px] uppercase tracking-wider text-[--color-fg-3]">{fecha(item.fecha)}</span>
            </div>
            <h4 className="mt-3 text-lg font-black tracking-tight leading-tight">{item.titulo}</h4>
            <p className="mt-2 text-sm font-bold text-[--color-fg]">{item.resultado}</p>
            {item.cifras && (
              <div className="mt-4 grid grid-cols-3 gap-2 max-w-md">
                <MiniCount label="A favor" value={item.cifras.favor} cls="text-[--color-bueno]" />
                <MiniCount label="En contra" value={item.cifras.contra} cls="text-[--color-malo]" />
                <MiniCount label="Abst." value={item.cifras.abstencion} cls="text-[--color-feo]" />
              </div>
            )}
            <div className="mt-4 rounded-xl bg-[--color-surface-2] p-4">
              <p className="label text-[10px] text-[--color-malo]">Qué estaba en juego</p>
              <p className="mt-2 text-sm text-[--color-fg-2] leading-relaxed">{item.lectura}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <FuenteLink fuente={item.fuente} />
              <ShareButton
                title={item.titulo}
                text={item.lectura}
                path="/como-votan"
                hash={item.slug}
                variant="quiet"
                className="sm:ml-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TextBlock({ label, text, emphasis = false }: { label: string; text: string; emphasis?: boolean }) {
  return (
    <div className={emphasis ? "rounded-xl bg-[--color-malo-soft] p-4 scanline" : "rounded-xl bg-[--color-surface-2] p-4"}>
      <p className={`label text-[10px] ${emphasis ? "text-[--color-malo]" : ""}`}>{label}</p>
      <p className="mt-2 text-sm text-[--color-fg-2] leading-relaxed">{text}</p>
    </div>
  );
}

function FuenteLink({ fuente }: { fuente: FuenteVotacion }) {
  return (
    <a href={fuente.url} target="_blank" rel="noopener noreferrer" className="font-bold text-[--color-accent] hover:text-[--color-accent-hover]">
      Fuente · {fuente.medio} ↗
    </a>
  );
}
