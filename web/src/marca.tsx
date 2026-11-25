import type { ImgHTMLAttributes } from "react";
import { A } from "./base";

// The real GoldenEra mark (public/assets/brand), split by colour so the splash can build it:
// g-ouro.png is the gold hexagon, g-claro.png the light G inside it, g.png both together.
type Img = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { rotulo?: string };

const img = (src: string, w: number, h: number) =>
  function Logo({ rotulo, ...p }: Img) {
    return <img src={A(src)} width={w} height={h} alt={rotulo ?? ""} {...(rotulo ? {} : { "aria-hidden": true })} draggable={false} decoding="async" {...p} />;
  };

export const Simbolo = img("brand/g.png", 289, 400);
export const SimboloOuro = img("brand/g-ouro.png", 289, 400);
export const SimboloClaro = img("brand/g-claro.png", 289, 400);
/** GOLDENERA with MARKETING DIGITAL under it. */
export const Palavra = img("brand/palavra.png", 800, 181);
