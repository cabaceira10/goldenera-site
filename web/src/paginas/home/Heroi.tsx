import { useRef, useState } from "react";
import { m } from "framer-motion";
import { A, HERO_FILM, WA_HREF, curva } from "../../base";
import { Play, WhatsApp, useCortina, useMov } from "../../ui";

/** The video in a camera viewfinder: poster and play button; the tap itself starts it with sound (iOS needs play() inside the gesture). */
function Video() {
  const v = useRef<HTMLVideoElement>(null);
  const [anda, setAnda] = useState(false);
  const [src] = useState(() => (HERO_FILM.src1080 && innerWidth * (devicePixelRatio || 1) > 1000 ? HERO_FILM.src1080 : HERO_FILM.src720));
  const toca = () => {
    const el = v.current!;
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
    });
    setAnda(true);
  };
  return (
    <div className="visor">
      <span aria-hidden="true" className="visor-canto a" />
      <span aria-hidden="true" className="visor-canto b" />
      <span aria-hidden="true" className="visor-canto c" />
      <span aria-hidden="true" className="visor-canto d" />
      <div className="visor-ecra">
        <video
          ref={v}
          src={A(src)}
          poster={A(innerWidth > 700 ? HERO_FILM.poster : "img/filme-reels-960.webp")}
          preload="none"
          playsInline
          webkit-playsinline="true"
          controls={anda}
          aria-label={HERO_FILM.label}
          className="h-full w-full object-cover"
        />
        {!anda && (
          <button type="button" onClick={toca} aria-label="Ver o vídeo de 20 segundos" className="visor-isco">
            <span className="visor-play">
              <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Eyebrow, headline, sub, the film in its viewfinder, proof, CTA: one centred column on warm black. */
export default function Heroi() {
  const aberta = useCortina();
  const mov = useMov();
  // transform and blur only: the text is always painted, so contrast and LCP never wait for the intro
  const entra = (atraso: number) => ({
    initial: mov ? { y: 16, filter: "blur(8px)" } : false,
    animate: aberta ? { y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.8, delay: atraso, ease: curva },
  });

  return (
    <section id="top" aria-labelledby="t-topo" className="heroi">
      <div aria-hidden="true" className="heroi-fundo" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <m.p {...entra(0.05)} className="olho olho-centro">
          Para negócios locais<span className="hidden sm:inline"> · Caldas da Rainha · Leiria · Oeste</span>
        </m.p>

        <h1 id="t-topo" className="heroi-titulo">
          Estás a perder clientes para quem aparece no feed?
        </h1>

        <m.p {...entra(0.2)} className="mt-6 max-w-2xl text-pretty text-[17px] font-light leading-relaxed text-marfim/80 sm:text-xl">
          Gravamos, publicamos e anunciamos por ti. Um dia de gravação por mês chega para um mês inteiro de conteúdo.
        </m.p>

        <m.div {...entra(0.32)} className="mt-10 w-full max-w-[860px] sm:mt-14">
          <Video />
        </m.div>

        <m.p {...entra(0.44)} className="mt-9 max-w-xl text-pretty text-[15px] leading-relaxed text-marfim/65 sm:text-base">
          Vamos ao teu negócio e gravamos tudo de uma vez. Recebes <strong className="font-semibold text-marfim">8 reels por mês, com guião, editados e publicados por nós</strong>, feitos pela equipa que já grava para a OK Condutor, a Dream Maker Imobiliária e o Alverca Padel Club.
        </m.p>

        <m.div {...entra(0.54)} className="mb-14 mt-8 w-full sm:mb-24 sm:w-auto">
          <a href={WA_HREF} target="_blank" rel="noopener" data-cta="hero" className="botao-ouro w-full sm:w-auto">
            <WhatsApp className="h-5 w-5" />
            Quero isto para o meu negócio
          </a>
        </m.div>
      </div>
    </section>
  );
}
