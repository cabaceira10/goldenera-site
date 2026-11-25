// Renders the home share card to public/og.jpg, 1200x630: the GoldenEra logo, the line, a still of the real reels.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const PUB = resolve("public");
const b64 = (p) => readFileSync(resolve(PUB, p)).toString("base64");
const fonte = b64("fonts/jakarta.woff2");
const g = b64("brand/g.png");
const palavra = b64("brand/palavra.png");
const foto = b64("img/filme-reels.webp");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Plus Jakarta Sans"; src: url(data:font/woff2;base64,${fonte}) format("woff2"); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0b0a08; font-family: "Plus Jakarta Sans", sans-serif; color: #fff; position: relative; }
.grade { position: absolute; inset: 0; background-image: linear-gradient(rgba(212,175,94,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,94,.05) 1px, transparent 1px); background-size: 72px 72px; }
.luz { position: absolute; width: 900px; height: 700px; right: -260px; top: -260px; background: radial-gradient(closest-side, rgba(212,175,94,.3), transparent); }
.foto { position: absolute; right: 56px; top: 150px; width: 560px; aspect-ratio: 16/9; border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.14); box-shadow: 0 40px 120px -40px rgba(212,175,94,.6); }
.foto img { width: 100%; height: 100%; object-fit: cover; }
.c { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
.logo { display: flex; align-items: center; gap: 18px; } .logo img { height: 60px; width: auto; } .logo img + img { height: 38px; }
h1 { margin-top: auto; font-size: 62px; line-height: 1.04; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; width: 560px; }
h1 span { display: block; }
p { margin-top: 22px; font-size: 26px; color: #cfc8ba; letter-spacing: -0.01em; width: 560px; }
</style></head><body><div class="grade"></div><div class="luz"></div><div class="foto"><img src="data:image/webp;base64,${foto}" alt=""></div>
<div class="c"><div class="logo"><img src="data:image/png;base64,${g}" alt=""><img src="data:image/png;base64,${palavra}" alt=""></div>
<h1><span>O teu negócio</span><span>vai dar que falar.</span></h1>
<p>Conteúdo, redes sociais e anúncios para negócios locais.</p></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: resolve(PUB, "og.jpg"), type: "jpeg", quality: 88 });
await browser.close();
console.log("og.jpg written");
