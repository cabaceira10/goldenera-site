import { useEffect, useRef, useState } from "react";
import { A } from "../../base";
import { Olho, Revela, Seta, Titulo } from "../../ui";

// The event photos of the current site, grouped by event. Only 01 to 04 exist at 1600 px; the rest are 720 px.
const FOTOS = [
  { titulo: "Feira", fotos: ["01", "02", "03", "04", "atl-5-t", "atl-6-t"] },
  { titulo: "Torneio de padel", fotos: ["pd-85-t", "pd-145-t", "pd-175-t", "pd-305-t"] },
  { titulo: "Celebração", fotos: ["an-03-t", "an-04-t", "an-bolo-t"] },
  { titulo: "Dia de equipa", fotos: ["dm-02-t", "dm-06-t"] },
  { titulo: "Jantar", fotos: ["og-5-t", "og-6-t"] },
] as const;

// The two client quotes of the current site, word for word.
const CITACOES = [
  { texto: "Desde que começámos a trabalhar com a GoldenEra, a nossa página cresceu de forma consistente e, mais importante, as inscrições aumentaram. O conteúdo mensal que produzem reflete exatamente o que somos.", nome: "OK Condutor", papel: "Escola de condução" },
  { texto: "Ficou muito bem! Dá outra apresentação aos vídeos. Estou realmente satisfeito, e obrigado por teres isto pronto antes de sábado.", nome: "Telmo Cordeiro", papel: "Dream Maker Imobiliária" },
] as const;

const foto = (nome: string) => A(`assets/eventos/${nome}.webp`);

/** Full-screen photo viewer: arrows on screen and on the keyboard, Escape closes. */
function Visor({ fotos, titulo, i, muda, fecha }: { fotos: readonly string[]; titulo: string; i: number; muda: (i: number) => void; fecha: () => void }) {
  const n = fotos.length;
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fecha();
      if (e.key === "ArrowRight") muda((i + 1) % n);
      if (e.key === "ArrowLeft") muda((i + n - 1) % n);
    };
    document.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [i, n, muda, fecha]);
  const seta = "visor-seta";
  return (
    <div role="dialog" aria-modal="true" aria-label={`${titulo}, fotografia ${i + 1} de ${n}`} className="fixed inset-0 z-[90] flex flex-col bg-night/95 p-3 sm:p-6" onClick={fecha}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-areia">
        <span>
          {titulo} · {String(i + 1).padStart(2, "0")}/{n}
        </span>
        <button type="button" onClick={fecha} aria-label="Fechar" className={seta}>
          ×
        </button>
      </div>
      <div className="relative mt-3 min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        <img src={foto(fotos[i])} alt={`${titulo}, fotografia ${i + 1}`} className="h-full w-full object-contain" />
        <button type="button" onClick={() => muda((i + n - 1) % n)} aria-label="Fotografia anterior" className={`${seta} absolute left-1 top-1/2 -translate-y-1/2`}>
          ‹
        </button>
        <button type="button" onClick={() => muda((i + 1) % n)} aria-label="Fotografia seguinte" className={`${seta} absolute right-1 top-1/2 -translate-y-1/2`}>
          ›
        </button>
      </div>
    </div>
  );
}

/** The work: the event photos and the client quotes of the current site. */
export default function Portefolio() {
  const [grupo, setGrupo] = useState(0);
  const [aberta, setAberta] = useState<number | null>(null);
  const fita = useRef<HTMLDivElement>(null);
  const g = FOTOS[grupo];
  const anda = (d: number) => {
    const el = fita.current;
    const c = el?.firstElementChild as HTMLElement | null;
    if (el && c) el.scrollBy({ left: d * (c.offsetWidth + 16), behavior: "smooth" });
  };
  const muda = (i: number) => {
    setGrupo(i);
    fita.current?.scrollTo({ left: 0 });
  };
  return (
    <section id="portefolio" aria-labelledby="t-portefolio" className="seccao relative mx-auto max-w-7xl px-5 sm:px-8">
      <Olho>03 · Eventos</Olho>
      <Titulo id="t-portefolio" linhas={["Não acredites em nós.", "Vê o trabalho."]} />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
        <Titulo Tag="h3" className="titulo-m" linhas={["Eventos que continuam a ser falados no dia seguinte."]} />
        <Revela className="sobe">
          <p className="fio-topo text-pretty text-base font-light leading-relaxed text-marfim/75">Seja qual for o evento, filmamos e fotografamos com o mesmo nível dos nossos reels e entregamos tudo editado, pronto a publicar enquanto ainda se fala dele. Toca numa fotografia para a ver em grande.</p>
        </Revela>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div role="tablist" aria-label="Eventos fotografados" className="separadores">
          {FOTOS.map((f, i) => (
            <button key={f.titulo} type="button" role="tab" aria-selected={i === grupo} onClick={() => muda(i)} className="separador">
              {f.titulo}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => anda(-1)} aria-label="Fotografias anteriores" className="circulo">
            <Seta className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => anda(1)} aria-label="Fotografias seguintes" className="circulo">
            <Seta className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={fita} className="fita-fotos">
        {g.fotos.map((f, i) => (
          <button key={f} type="button" onClick={() => setAberta(i)} aria-label={`${g.titulo}, abrir a fotografia ${i + 1}`} className="foto-evento group">
            <img src={foto(f)} alt="" loading="lazy" decoding="async" draggable={false} />
            <span aria-hidden="true">
              {g.titulo} · {String(i + 1).padStart(2, "0")}/{String(g.fotos.length).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {CITACOES.map((c, i) => (
          <Revela as="figure" key={c.nome} className="citacao sobe" style={{ transitionDelay: `${i * 0.1}s` }}>
            <span aria-hidden="true" className="citacao-aspa">“</span>
            <blockquote>{c.texto}</blockquote>
            <figcaption>
              <b>{c.nome}</b>
              <span>{c.papel}</span>
            </figcaption>
          </Revela>
        ))}
      </div>

      {aberta !== null && <Visor fotos={g.fotos} titulo={g.titulo} i={aberta} muda={setAberta} fecha={() => setAberta(null)} />}
    </section>
  );
}
