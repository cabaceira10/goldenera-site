import type { SVGProps } from "react";
import { G_CLARO, G_OURO, NOME, SUB, VB_G, VB_NOME } from "./marca-tracos";

// The real GoldenEra mark and wordmark as vectors (traced from public/assets/brand), sharp at any size.
// Gold pieces paint with the shared #ge-ouro gradient that <Ouro /> defines once per page.
type P = SVGProps<SVGSVGElement> & { rotulo?: string };

const rotular = (rotulo?: string) => (rotulo ? { role: "img", "aria-label": rotulo } : { "aria-hidden": true as const });

export function Ouro() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ge-ouro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8c6614" />
          <stop offset=".3" stopColor="#d8ae52" />
          <stop offset=".46" stopColor="#f7e3a3" />
          <stop offset=".6" stopColor="#c99a33" />
          <stop offset=".84" stopColor="#8f6815" />
          <stop offset="1" stopColor="#d9b15c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** The G: gold hexagon with the light G inside. */
export function Simbolo({ rotulo, style, ...p }: P) {
  return (
    <svg viewBox={VB_G} style={{ aspectRatio: "720 / 995", ...style }} {...rotular(rotulo)} {...p}>
      <g fill="url(#ge-ouro)">
        {G_OURO.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="#f5f2eb">
        {G_CLARO.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </g>
    </svg>
  );
}

/** GOLDENERA with MARKETING DIGITAL under it. */
export function Palavra({ rotulo, style, ...p }: P) {
  return (
    <svg viewBox={VB_NOME} style={{ aspectRatio: "983 / 222", ...style }} {...rotular(rotulo)} {...p}>
      <g fill="#f5f2eb">
        {NOME.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </g>
      <g fill="#c99d3c">
        {SUB.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </g>
    </svg>
  );
}
