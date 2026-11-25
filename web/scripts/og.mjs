// Renders the home share card to public/og-v2.jpg, 1200x630: the traced logo, the hero headline, the client proof
// and three real reel covers. Drawn at 2x and reduced in a canvas, so the text stays sharp after WhatsApp compresses it.
// A new card needs a new file name (og-v3.jpg): WhatsApp and Facebook keep the old image per URL.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const SAIDA = "og-v2.jpg";
const PUB = resolve("public");
const b64 = (p) => readFileSync(p).toString("base64");
const fonte = (f) => b64(resolve(PUB, "fonts", f));
const capa = (id) => `data:image/webp;base64,${b64(resolve("../public/campaign/film", `${id}.webp`))}`;

const ts = readFileSync(resolve("src/marca-tracos.ts"), "utf8");
const tracos = (nome) => JSON.parse(ts.match(new RegExp(`export const ${nome} = (\\[.*?\\]);`, "s"))[1]);
const caminhos = (lista, cor) => lista.map((d) => `<path d="${d}" fill="${cor}" fill-rule="evenodd"/>`).join("");

const ouro = `<linearGradient id="o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8c6614"/><stop offset=".3" stop-color="#d8ae52"/><stop offset=".5" stop-color="#f7e3a3"/><stop offset=".7" stop-color="#c99a33"/><stop offset=".85" stop-color="#8f6815"/><stop offset="1" stop-color="#d9b15c"/></linearGradient>`;
const simbolo = `<svg class="simbolo" viewBox="0 0 720 995"><defs>${ouro}</defs>${caminhos(tracos("G_OURO"), "url(#o)")}${caminhos(tracos("G_CLARO"), "#f5f2eb")}</svg>`;
const palavra = `<svg class="palavra" viewBox="0 0 983 222">${caminhos(tracos("NOME"), "#f5f2eb")}${caminhos(tracos("SUB"), "#c99d3c")}</svg>`;
const hex = `<svg class="hex" viewBox="-6 -6 732 1007"><path d="${tracos("G_OURO").join("")}" fill="none" stroke="#d8ae52" stroke-opacity=".11" stroke-width="2.4"/></svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Instrument Serif"; src: url(data:font/woff2;base64,${fonte("serif.woff2")}) format("woff2"); }
@font-face { font-family: "Instrument Serif"; font-style: italic; src: url(data:font/woff2;base64,${fonte("serif-it.woff2")}) format("woff2"); }
@font-face { font-family: "Plus Jakarta Sans"; src: url(data:font/woff2;base64,${fonte("jakarta.woff2")}) format("woff2"); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; color: #f4efe6; font-family: "Plus Jakarta Sans", sans-serif;
  background: radial-gradient(ellipse 60% 85% at 80% 45%, rgb(216 174 82 / .14), transparent 62%), radial-gradient(ellipse 50% 60% at 0% 100%, rgb(216 174 82 / .06), transparent 70%), #0a0907; }
.hex { position: absolute; height: 820px; right: 120px; top: -95px; }
.texto { position: absolute; left: 72px; top: 64px; bottom: 64px; width: 520px; display: flex; flex-direction: column; }
.marca { display: flex; align-items: center; gap: 16px; }
.simbolo { height: 66px; } .palavra { height: 40px; }
.olho { margin-top: auto; display: flex; align-items: center; gap: 14px; font-size: 14px; font-weight: 600; letter-spacing: .3em; text-transform: uppercase; color: #d8ae52; }
.olho::before { content: ""; width: 36px; height: 1px; background: #d8ae52; }
h1 { margin-top: 18px; font-family: "Instrument Serif", serif; font-weight: 400; font-size: 70px; line-height: .98; letter-spacing: -.01em; }
h1 em { font-style: italic; background: linear-gradient(100deg, #c99a33, #f7e3a3 45%, #d8ae52 70%, #a87d22); -webkit-background-clip: text; background-clip: text; color: transparent; padding-right: .06em; }
.prova { margin-top: 22px; font-size: 19px; line-height: 1.45; color: rgb(244 239 230 / .72); }
.prova b { font-weight: 600; color: #f4efe6; }
.visor { position: absolute; right: 72px; top: 50%; transform: translateY(-50%); width: 512px; height: 392px; display: flex; align-items: center; justify-content: center; gap: 14px; }
.canto { position: absolute; width: 28px; height: 28px; border-color: #d8ae52; border-style: solid; border-width: 0; }
.a { left: 0; top: 0; border-left-width: 2px; border-top-width: 2px; } .b { right: 0; top: 0; border-right-width: 2px; border-top-width: 2px; }
.c { left: 0; bottom: 0; border-left-width: 2px; border-bottom-width: 2px; } .d { right: 0; bottom: 0; border-right-width: 2px; border-bottom-width: 2px; }
.tel { width: 140px; aspect-ratio: 9 / 16; border-radius: 16px; overflow: hidden; border: 1.5px solid rgb(216 174 82 / .5); box-shadow: 0 30px 60px -24px rgb(0 0 0 / .9); }
.tel.meio { width: 180px; border-color: rgb(216 174 82 / .8); }
.tel img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style></head><body>${hex}
<div class="texto">
  <div class="marca">${simbolo}${palavra}</div>
  <p class="olho">Para negócios locais</p>
  <h1>Estás a perder clientes <em>para quem aparece no feed?</em></h1>
  <p class="prova">A equipa que já grava para a <b>OK Condutor</b>, a <b>Dream Maker Imobiliária</b> e o <b>Alverca Padel Club</b>.</p>
</div>
<div class="visor"><span class="canto a"></span><span class="canto b"></span><span class="canto c"></span><span class="canto d"></span>
  <div class="tel"><img src="${capa("ph-1")}" alt=""></div>
  <div class="tel meio"><img src="${capa("ph-atlaris")}" alt=""></div>
  <div class="tel"><img src="${capa("ph-padel-1")}" alt=""></div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
const reduz = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const jpg = await reduz.evaluate(async (src) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const c = Object.assign(document.createElement("canvas"), { width: 1200, height: 630 });
  const x = c.getContext("2d");
  x.imageSmoothingQuality = "high";
  x.drawImage(img, 0, 0, 1200, 630);
  return c.toDataURL("image/jpeg", 0.9).split(",")[1];
}, `data:image/png;base64,${png.toString("base64")}`);
writeFileSync(resolve(PUB, SAIDA), Buffer.from(jpg, "base64"));
await browser.close();
console.log(`${SAIDA} written`);
