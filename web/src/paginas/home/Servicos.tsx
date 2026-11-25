import { A } from "../../base";
import { Celula, TituloBloco } from "../../ui";

function Foto({ src, alt, posicao = "center" }: { src: string; alt: string; posicao?: string }) {
  return (
    <img
      src={A(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{ objectPosition: posicao }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/c:scale-[1.04]"
    />
  );
}

const VEU = <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep/90 to-transparent" />;

/** What we do and the two plans, in the words of the current site (no prices there either). */
export default function Servicos() {
  return (
    <section id="servicos" aria-labelledby="t-servicos" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <TituloBloco id="t-servicos" titulo={["Gravamos, publicamos", "e anunciamos por ti."]} texto="Conteúdo, redes sociais e anúncios para negócios locais que querem mais notoriedade e mais clientes." />
      <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-6">
        <Celula className="group/c lg:col-span-4" alto="h-64 sm:h-80" titulo="Reels com guião" texto="Escrevemos os vídeos a pensar no que os teus clientes perguntam. Nada de improviso no dia.">
          <Foto src="assets/eventos/04.webp" alt="Gravação na feira, com a equipa da Atlaris" posicao="center 35%" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-80" titulo="Gestão de redes" texto="Publicamos por ti, com regularidade. A tua página nunca fica parada." atraso={0.06}>
          <Foto src="assets/eventos/atl-5-t.webp" alt="Expositor a falar para a câmara na feira" posicao="60% center" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Anúncios" texto="Levamos os teus vídeos a quem ainda não te conhece, no Instagram e no Facebook.">
          <Foto src="assets/eventos/an-03-t.webp" alt="Celebração numa agência imobiliária" posicao="center 30%" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Um dia de gravação" texto="Um dia por mês no teu negócio chega para um mês inteiro de conteúdo." atraso={0.06}>
          <Foto src="assets/eventos/02.webp" alt="Bola da Atlaris numa piscina, na feira" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Eventos" texto="Corporativos, desportivos, lançamentos, inaugurações, festas. Vídeo, reels curtos e fotografia editada, com entrega rápida." atraso={0.12}>
          <Foto src="assets/eventos/pd-145-t.webp" alt="Aniversário do Alverca Padel Club" posicao="center 30%" />
          {VEU}
        </Celula>
      </div>
      <div className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/[.08] bg-gradient-to-b from-deep/80 to-ink/80 p-6 sm:p-8">
          <span className="inline-block rounded-[3px] bg-white/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-areia">Plano</span>
          <h3 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-2xl">Presença</h3>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-mute">Para estares nas redes todas as semanas, com conteúdo que mostra o teu negócio como ele é: 8 reels por mês com guião, um dia de gravação por mês, edição completa com legendas e grafismo, gestão das redes e fotos para posts e stories.</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-areia p-6 text-ink sm:p-8">
          <span className="inline-block rounded-[3px] bg-ink px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-areia">Plano</span>
          <h3 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.01em] sm:text-2xl">Crescimento</h3>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/80">Tudo o que está no Presença, mais anúncios que levam o teu negócio a quem ainda não te conhece: criação e gestão de anúncios no Instagram e no Facebook, a apontar para quem te pode comprar.</p>
        </div>
      </div>
    </section>
  );
}
