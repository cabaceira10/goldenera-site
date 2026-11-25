import { Olho, Revela, Titulo } from "../../ui";

const PASSOS = [
  ["Conversa", "Falamos no WhatsApp, conhecemos o teu negócio e o que te traz clientes."],
  ["Guiões", "Escrevemos os vídeos do mês, ou trabalhamos a partir das tuas ideias, e enviamos-tos antes de gravar."],
  ["Um dia de gravação", "Vamos ao teu negócio e gravamos tudo de uma vez."],
  ["Publicação", "Editamos os vídeos e publicamos por ti ao longo do mês. No plano Crescimento, também criamos e gerimos os anúncios."],
] as const;

/** The 4 steps of the current site on the ivory band, joined by a gold line that fills as the band scrolls past. */
export default function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="t-como" className="faixa-clara">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Olho className="olho-escuro">04 · Como funciona</Olho>
        <Titulo id="t-como" className="titulo-escuro" linhas={["Do WhatsApp ao feed.", "Em quatro passos."]} />
        <ol className="passos">
          {PASSOS.map(([t, p], i) => (
            <Revela as="li" key={t} className="passo sobe" style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="passo-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sr-only">Passo {i + 1}: </span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Revela>
          ))}
        </ol>
      </div>
    </section>
  );
}
