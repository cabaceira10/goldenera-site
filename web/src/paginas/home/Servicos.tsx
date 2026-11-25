import { A } from "../../base";
import { Olho, Revela, Titulo } from "../../ui";

// What we do, in the words of the current site (no prices there either). One editorial row per service.
const SERVICOS = [
  { titulo: "Reels com guião", texto: "Escrevemos os vídeos a pensar no que os teus clientes perguntam. Nada de improviso no dia.", foto: "04", alt: "Gravação na feira, com a equipa da Atlaris", pos: "center 35%" },
  { titulo: "Gestão de redes", texto: "Publicamos por ti, com regularidade. A tua página nunca fica parada.", foto: "atl-5-t", alt: "Expositor a falar para a câmara na feira", pos: "60% center" },
  { titulo: "Anúncios", texto: "Levamos os teus vídeos a quem ainda não te conhece, no Instagram e no Facebook.", foto: "an-03-t", alt: "Celebração numa agência imobiliária", pos: "center 30%" },
  { titulo: "Um dia de gravação", texto: "Um dia por mês no teu negócio chega para um mês inteiro de conteúdo.", foto: "02", alt: "Bola da Atlaris numa piscina, na feira", pos: "center" },
  { titulo: "Eventos", texto: "Corporativos, desportivos, lançamentos, inaugurações, festas. Vídeo, reels curtos e fotografia editada, com entrega rápida.", foto: "pd-145-t", alt: "Aniversário do Alverca Padel Club", pos: "center 30%" },
] as const;

export default function Servicos() {
  return (
    <section id="servicos" aria-labelledby="t-servicos" className="seccao relative mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
        <div>
          <Olho>02 · Serviços</Olho>
          <Titulo id="t-servicos" linhas={["Gravamos, publicamos", "e anunciamos por ti."]} />
        </div>
        <Revela className="sobe">
          <p className="fio-topo text-pretty text-base font-light leading-relaxed text-marfim/75 sm:text-lg">Conteúdo, redes sociais e anúncios para negócios locais que querem mais notoriedade e mais clientes.</p>
        </Revela>
      </div>

      <ol className="servicos">
        {SERVICOS.map((s, n) => (
          <Revela as="li" key={s.titulo} className="servico">
            <span className="servico-num" aria-hidden="true">
              {String(n + 1).padStart(2, "0")}
            </span>
            <div className="servico-texto">
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </div>
            <div className="servico-foto">
              <img src={A(`assets/eventos/${s.foto}.webp`)} alt={s.alt} loading="lazy" decoding="async" draggable={false} style={{ objectPosition: s.pos }} />
            </div>
          </Revela>
        ))}
      </ol>

      <div className="planos">
        <Revela as="figure" className="plano sobe">
          <p className="plano-rotulo">Plano</p>
          <h3>Presença</h3>
          <p>Para estares nas redes todas as semanas, com conteúdo que mostra o teu negócio como ele é: 8 reels por mês com guião, um dia de gravação por mês, edição completa com legendas e grafismo, gestão das redes e fotos para posts e stories.</p>
        </Revela>
        <Revela as="figure" className="plano destaque sobe" style={{ transitionDelay: ".1s" }}>
          <p className="plano-rotulo">Plano · o mais completo</p>
          <h3>Crescimento</h3>
          <p>Tudo o que está no Presença, mais anúncios que levam o teu negócio a quem ainda não te conhece: criação e gestão de anúncios no Instagram e no Facebook, a apontar para quem te pode comprar.</p>
        </Revela>
      </div>
    </section>
  );
}
