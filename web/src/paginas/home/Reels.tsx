import { MesaReels } from "../../reels";
import { Olho, Revela, Titulo } from "../../ui";

/** The promise on the left, the real reels on the deck. Copy from the current site, word for word. */
export default function Reels() {
  return (
    <section id="reels" aria-labelledby="t-reels" className="seccao relative overflow-x-clip">
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
        <div>
          <Olho>01 · O trabalho</Olho>
          <Titulo id="t-reels" linhas={["Provavelmente", "já nos viste no teu feed."]} />
        </div>
        <Revela className="sobe">
          <p className="fio-topo text-pretty text-base font-light leading-relaxed text-marfim/75 sm:text-lg">
            Uma pessoa real do teu negócio, a falar para quem está do outro lado do ecrã. É isto que faz os clientes lembrarem-se de ti. Onze reels reais, de uma escola de condução, de um clube de padel, de uma marca de piscinas e de outros negócios locais.
          </p>
        </Revela>
      </div>
      <MesaReels className="mt-12 lg:mt-16" />
    </section>
  );
}
