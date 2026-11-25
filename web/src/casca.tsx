import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig, MotionGlobalConfig } from "framer-motion";
import { CHAVE_CALMO, FALAR, NAV, R, TELEFONE, WA_HREF, curva } from "./base";
import { Ouro } from "./marca";
import { NOME } from "./marca-tracos";
import { Logotipo, MovContexto, Seta, WhatsApp } from "./ui";

/* ---------------- header ---------------- */
function Topo() {
  const [aberto, setAberto] = useState(false);
  const [solido, setSolido] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const f = () => setSolido(scrollY > 24);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    };
    document.addEventListener("keydown", tecla);
    document.documentElement.classList.add("menu-aberto");
    return () => {
      document.removeEventListener("keydown", tecla);
      document.documentElement.classList.remove("menu-aberto");
    };
  }, [aberto]);

  return (
    <>
      <header className={`topo ${solido || aberto ? "solido" : ""}`}>
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-6 px-5 sm:h-[76px] sm:px-8">
          <a href={R("")} aria-label="GoldenEra Marketing Digital, início" className="flex h-11 shrink-0 items-center">
            <Logotipo topo />
          </a>
          <nav aria-label="Principal" className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV.map(([t, h]) => (
              <a key={h} href={h} className="topo-link">
                {t}
              </a>
            ))}
          </nav>
          <a href={WA_HREF} target="_blank" rel="noopener" className="botao-linha hidden lg:inline-flex">
            <WhatsApp className="h-4 w-4" />
            {FALAR}
          </a>
          <button
            ref={botao}
            type="button"
            className="burger ml-auto lg:hidden"
            aria-expanded={aberto}
            aria-controls={aberto ? "menu-movel" : undefined}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto(!aberto)}
          >
            <span className={aberto ? "x" : ""} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {aberto && (
          <m.nav
            id="menu-movel"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: curva }}
            className="menu-movel lg:hidden"
          >
            <ol>
              {NAV.map(([t, h], i) => (
                <m.li key={h} initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: curva }}>
                  <a href={h} onClick={() => setAberto(false)}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </a>
                </m.li>
              ))}
            </ol>
            <a href={WA_HREF} target="_blank" rel="noopener" className="botao-ouro mt-10 w-full">
              <WhatsApp className="h-5 w-5" />
              {FALAR}
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- footer ---------------- */
function Rodape({ mov, setMov }: { mov: boolean; setMov: (v: boolean) => void }) {
  return (
    <footer className="rodape">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-20 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href={R("")} aria-label="GoldenEra Marketing Digital, início" className="inline-flex min-h-11 items-center">
            <Logotipo />
          </a>
          <p className="mt-6 max-w-sm text-pretty text-[15px] font-light leading-relaxed text-marfim/60">Conteúdo, redes sociais e anúncios para negócios locais. Caldas da Rainha, Leiria e Oeste.</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="olho">Secções</p>
          <ul className="rodape-lista">
            {NAV.map(([t, h]) => (
              <li key={h}>
                <a href={h}>{t}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="olho">Contacto</p>
          <ul className="rodape-lista">
            <li>
              <a href={WA_HREF} target="_blank" rel="noopener">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${TELEFONE.replace(/\s/g, "")}`}>{TELEFONE}</a>
            </li>
            <li>
              <a href={R("privacidade/")}>Privacidade e cookies</a>
            </li>
            <li>
              <button type="button" aria-pressed={!mov} onClick={() => setMov(!mov)}>
                {mov ? "Reduzir movimento" : "Ligar movimento"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="rodape-marca">
        <svg viewBox="0 0 983 172">
          <defs>
            <linearGradient id="ge-marca" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d8ae52" stopOpacity=".34" />
              <stop offset="1" stopColor="#d8ae52" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="url(#ge-marca)">
            {NOME.map((d, i) => (
              <path key={i} d={d} fillRule="evenodd" />
            ))}
          </g>
        </svg>
      </div>
      <p className="mx-auto max-w-7xl border-t border-areia/10 px-5 py-6 text-xs text-marfim/60 sm:px-8">GoldenEra Marketing Digital · conteúdo, redes sociais e anúncios para negócios locais</p>
    </footer>
  );
}

/* ---------------- fixed contact bar (every width) ---------------- */
function Fixo() {
  const [mostra, setMostra] = useState(false);
  useEffect(() => {
    const contacto = document.getElementById("contacto");
    let perto = false;
    const f = () => setMostra(window.scrollY > window.innerHeight * 0.7 && !perto);
    const io = new IntersectionObserver(
      ([e]) => {
        perto = e.isIntersecting;
        f();
      },
      { threshold: 0.15 },
    );
    if (contacto) io.observe(contacto);
    addEventListener("scroll", f, { passive: true });
    f();
    return () => {
      io.disconnect();
      removeEventListener("scroll", f);
    };
  }, []);
  return (
    <AnimatePresence>
      {mostra && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          <m.div initial={{ y: 110 }} animate={{ y: 0 }} exit={{ y: 110 }} transition={{ duration: 0.45, ease: curva }} className="fixo pointer-events-auto w-full sm:w-auto">
            <a href={WA_HREF} target="_blank" rel="noopener" data-cta="whatsapp-fixo">
              <span className="fixo-icone">
                <WhatsApp className="h-[18px] w-[18px]" />
              </span>
              {FALAR}
              <Seta className="ml-auto h-4 w-4 text-areia sm:ml-2" />
            </a>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- page ---------------- */
function guardaMov(mov: boolean) {
  document.documentElement.dataset.mov = mov ? "on" : "off";
  try {
    localStorage.setItem(CHAVE_CALMO, mov ? "0" : "1");
  } catch {
    /* no storage */
  }
}

/** The shell around the page: gold gradient, grain, header, page, footer, fixed bar, motion switch. */
export default function Casca({ children }: { children: (mov: boolean) => ReactNode }) {
  const [mov, setMov] = useState(() => document.documentElement.dataset.mov !== "off");
  const primeira = useRef(true);
  MotionGlobalConfig.skipAnimations = !mov;

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    guardaMov(mov);
  }, [mov]);

  // React draws after load, so the browser cannot find the anchor alone
  useEffect(() => {
    if (!location.hash) return;
    const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo) requestAnimationFrame(() => alvo.scrollIntoView({ behavior: "instant" as ScrollBehavior }));
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion={mov ? "never" : "always"}>
      <MovContexto.Provider value={mov}>
        <Ouro />
        <div className="grao" aria-hidden="true" />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-full focus:bg-marfim focus:px-4 focus:py-2 focus:text-ink">
          Saltar para o conteúdo
        </a>
        <Topo />
        <main id="conteudo" tabIndex={-1} className="overflow-x-clip outline-none">
          {children(mov)}
        </main>
        <Rodape mov={mov} setMov={setMov} />
        <Fixo />
      </MovContexto.Provider>
    </MotionConfig>
    </LazyMotion>
  );
}
