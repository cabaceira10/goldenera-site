import { Olho, Revela, Titulo } from "../../ui";

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
    <section id="perguntas" aria-labelledby="t-perguntas" className="seccao relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
      <div>
        <Olho>06 · Perguntas</Olho>
        <Titulo id="t-perguntas" linhas={["Perguntas", "que nos fazem."]} />
      </div>
      <Revela className="sobe">
        <div className="perguntas">
          {PERGUNTAS.map(([q, r], i) => (
            <details key={q} className="pergunta">
              <summary>
                <span className="pergunta-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{q}</span>
                <span aria-hidden="true" className="pergunta-mais" />
              </summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </Revela>
    </section>
  );
}
