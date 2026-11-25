import { MesaReels } from "../../reels";
import { DuasLinhas, Surge, tituloH2 } from "../../ui";

/** The format: the promise on the left, the real reels on the deck. Copy from the current site, word for word. */
export default function Reels() {
  return (
    <section id="reels" aria-labelledby="t-reels" className="relative overflow-x-clip py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Surge>
          <h2 id="t-reels" className={`${tituloH2} lg:text-[3.2rem]`}>
            <DuasLinhas l={["Provavelmente", "já nos viste no teu feed."]} />
          </h2>
        </Surge>
        <Surge atraso={0.12} className="lg:pt-3">
          <p className="border-t border-white/15 pt-5 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Uma pessoa real do teu negócio, a falar para quem está do outro lado do ecrã. É isto que faz os clientes lembrarem-se de ti. Onze reels reais, de uma escola de condução, de um clube de padel, de uma marca de piscinas e de outros negócios locais.
          </p>
        </Surge>
      </div>
      <MesaReels className="mt-10 lg:mt-12" />
    </section>
  );
}
