import { Surge, TituloBloco } from "../../ui";

// Every answer comes from a sentence of the current site; nothing here is new.
const PERGUNTAS = [
  ["Quanto custa?", "Depende do plano e do teu negócio. Fala connosco no WhatsApp e enviamos a proposta."],
  ["Tenho de saber falar para a câmara?", "Não. Escrevemos os vídeos a pensar no que os teus clientes perguntam e enviamos-tos antes de gravar. Nada de improviso no dia."],
  ["Quantos reels recebo por mês?", "No plano Presença, 8 reels por mês, com guião escrito por nós ou por ti, e edição completa com legendas e grafismo."],
  ["Quanto tempo têm de estar no meu negócio?", "Um dia por mês. Gravamos tudo de uma vez e chega para um mês inteiro de conteúdo."],
  ["Quem publica nas minhas redes?", "Nós. Publicamos por ti, com regularidade, ao longo do mês. A tua página nunca fica parada."],
  ["Qual é a diferença entre os dois planos?", "O Crescimento tem tudo o que está no Presença, mais a criação e a gestão de anúncios no Instagram e no Facebook, a apontar para quem te pode comprar."],
  ["Também filmam eventos?", "Sim. Corporativos, desportivos, lançamentos, inaugurações, festas. Entregamos o vídeo do evento, reels curtos e fotografia editada, com entrega rápida."],
] as const;

export default function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="t-perguntas" className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <TituloBloco id="t-perguntas" titulo={["Perguntas", "que nos fazem."]} />
      <Surge atraso={0.08}>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {PERGUNTAS.map(([q, r]) => (
            <details key={q} className="pergunta group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-semibold tracking-[-0.01em] text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-areia" />
                  <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-areia transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-5 pr-10 text-pretty text-[15px] leading-relaxed text-mute sm:text-base">{r}</p>
            </details>
          ))}
        </div>
      </Surge>
    </section>
  );
}
