import { useEffect, useState } from "react";
import { A } from "../../base";
import { Surge, TituloBloco } from "../../ui";

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
  const seta = "grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20";
  return (
    <div role="dialog" aria-modal="true" aria-label={`${titulo}, fotografia ${i + 1} de ${n}`} className="fixed inset-0 z-[90] flex flex-col bg-night/95 p-3 sm:p-6" onClick={fecha}>
      <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.06em] text-white">
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
  const g = FOTOS[grupo];
  return (
    <section id="portefolio" aria-labelledby="t-portefolio" className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24">
      <TituloBloco id="t-portefolio" titulo={["Não acredites em nós.", "Vê o trabalho."]} />

      <Surge>
        <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-4xl">Eventos que continuam a ser falados no dia seguinte</h3>
        <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-mute">Seja qual for o evento, filmamos e fotografamos com o mesmo nível dos nossos reels e entregamos tudo editado, pronto a publicar enquanto ainda se fala dele. Toca numa fotografia para a ver em grande.</p>
      </Surge>
      <div role="tablist" aria-label="Eventos fotografados" className="mt-5 flex flex-wrap gap-2">
        {FOTOS.map((f, i) => (
          <button
            key={f.titulo}
            type="button"
            role="tab"
            aria-selected={i === grupo}
            onClick={() => setGrupo(i)}
            className={`h-10 rounded-full px-4 text-[13px] font-bold uppercase tracking-[0.02em] transition ${i === grupo ? "bg-areia text-ink" : "bg-white/[.06] text-soft ring-1 ring-white/10 hover:bg-white/[.12]"}`}
          >
            {f.titulo}
          </button>
        ))}
      </div>
      <div className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {g.fotos.map((f, i) => (
          <button key={f} type="button" onClick={() => setAberta(i)} aria-label={`${g.titulo}, abrir a fotografia ${i + 1}`} className="group relative aspect-[3/2] w-[86vw] max-w-[760px] flex-none snap-start overflow-hidden rounded-2xl bg-deep ring-1 ring-white/10">
            <img src={foto(f)} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
          </button>
        ))}
      </div>

      <Surge>
        <h3 className="mt-20 text-2xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-4xl">O que dizem os nossos clientes</h3>
      </Surge>
      <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
        {CITACOES.map((c, i) => (
          <Surge key={c.nome} atraso={i * 0.08}>
            <figure className="h-full rounded-3xl border border-white/[.08] bg-gradient-to-b from-deep/80 to-ink/80 p-6 sm:p-8">
              <blockquote className="text-pretty text-lg leading-relaxed text-white/90">“{c.texto}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <b className="font-extrabold uppercase tracking-[0.04em] text-areia">{c.nome}</b>
                <span className="text-mute"> · {c.papel}</span>
              </figcaption>
            </figure>
          </Surge>
        ))}
      </div>

      {aberta !== null && <Visor fotos={g.fotos} titulo={g.titulo} i={aberta} muda={setAberta} fecha={() => setAberta(null)} />}
    </section>
  );
}
