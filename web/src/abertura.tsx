import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ABRE, abreCortina } from "./base";
import { G_CLARO, G_OURO, NOME, SUB, VB_G, VB_NOME } from "./marca-tracos";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/*
 * Home intro, from the real mark only, as vectors. A gold line traces the hexagon and the G, the metal fills in,
 * GOLDENERA rises letter by letter. Then the screen opens as two doors while the logo flies to its place in the header.
 * The lockup has the header's exact proportions, so the flight is a pure translate and scale.
 * A tap or a key skips it. It only runs with html.abre (set in the head: no hash, not calm, not a bot).
 */
export default function Abertura() {
  const [ativa, setAtiva] = useState(ABRE);
  const caixa = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ativa) return;
    const html = document.documentElement;
    let fim = 0;
    let foi = false;
    const voa = (rapido: boolean) => {
      if (foi) return;
      foi = true;
      tira();
      const alvo = document.querySelector("[data-logo-topo]");
      const el = logo.current;
      if (alvo && el) {
        const de = el.getBoundingClientRect();
        const para = alvo.getBoundingClientRect();
        el.animate(
          [{ transform: "translate(0, 0) scale(1)" }, { transform: `translate(${para.left - de.left}px, ${para.top - de.top}px) scale(${para.height / de.height})` }],
          { duration: rapido ? 420 : 860, easing: "cubic-bezier(.7, 0, .2, 1)", fill: "forwards" },
        );
      }
      caixa.current?.classList.add("sai");
      abreCortina();
      fim = window.setTimeout(
        () => {
          html.classList.remove("abre");
          setAtiva(false);
        },
        rapido ? 560 : 1100,
      );
    };
    const salta = () => {
      caixa.current?.classList.add("salta");
      requestAnimationFrame(() => voa(true));
    };
    const gestos = ["pointerdown", "keydown"] as const;
    const tira = () => gestos.forEach((t) => removeEventListener(t, salta, true));
    gestos.forEach((t) => addEventListener(t, salta, true));
    const t = window.setTimeout(() => voa(false), 1300);
    return () => {
      clearTimeout(t);
      clearTimeout(fim);
      tira();
    };
  }, [ativa]);

  if (!ativa) return null;
  return (
    <div ref={caixa} className="abertura" aria-hidden="true">
      <span className="ab-porta e" />
      <span className="ab-porta d" />
      <div ref={logo} className="ab-logo">
        <div className="ab-trava">
          <svg viewBox={VB_G} className="ab-g">
            <g className="ab-cheio ouro" fill="url(#ge-ouro)">
              {G_OURO.map((d, n) => (
                <path key={n} d={d} />
              ))}
            </g>
            <g className="ab-cheio claro" fill="#f5f2eb">
              {G_CLARO.map((d, n) => (
                <path key={n} d={d} fillRule="evenodd" />
              ))}
            </g>
            <g className="ab-linha ouro" stroke="#e9c97c">
              {G_OURO.map((d, n) => (
                <path key={n} d={d} pathLength={1} style={i(n)} />
              ))}
            </g>
            <g className="ab-linha claro" stroke="#f5f2eb">
              {G_CLARO.map((d, n) => (
                <path key={n} d={d} pathLength={1} style={i(n + 1)} />
              ))}
            </g>
          </svg>
          <svg viewBox={VB_NOME} className="ab-nome">
            <clipPath id="ab-corte">
              <rect x="0" y="0" width="983" height="172" />
            </clipPath>
            <g clipPath="url(#ab-corte)" fill="#f5f2eb">
              {NOME.map((d, n) => (
                <path key={n} d={d} fillRule="evenodd" className="ab-letra" style={i(n)} />
              ))}
            </g>
            <g className="ab-sub" fill="#c99d3c">
              {SUB.map((d, n) => (
                <path key={n} d={d} fillRule="evenodd" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
