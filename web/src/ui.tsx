import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { useInView } from "framer-motion";
import { abreCortina, cortinaAberta } from "./base";
import { Palavra, Simbolo } from "./marca";

/* ---------------- motion state ---------------- */
export const MovContexto = createContext(true);
/** true while motion is allowed (footer toggle and OS preference). */
export const useMov = () => useContext(MovContexto);

/** true once the home intro starts to lift (at once when there is no intro or it is skipped). */
export function useCortina() {
  const [aberta, setAberta] = useState(cortinaAberta);
  useEffect(() => {
    if (aberta) return;
    const f = () => setAberta(true);
    addEventListener("lv-cortina", f);
    const seguro = setTimeout(() => {
      abreCortina();
      setAberta(true);
    }, 4600);
    return () => {
      removeEventListener("lv-cortina", f);
      clearTimeout(seguro);
    };
  }, [aberta]);
  return aberta;
}

/* ---------------- reveal ---------------- */
/**
 * Adds .vis once the block is a little inside the viewport. The CSS does the motion (transform and blur on text,
 * never opacity, so the Lighthouse contrast check never sees half-painted text). With motion off nothing is hidden.
 */
export function Revela({ children, className = "", as: Tag = "div", style }: { children: ReactNode; className?: string; as?: "div" | "li" | "figure" | "ol" | "ul"; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    // @ts-expect-error the ref fits every tag in the list
    <Tag ref={ref} style={style} className={`rv ${visto ? "vis" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Section title, one masked line per entry: each line rises out of its own window.
 * `claro` is for the ivory band.
 */
export function Titulo({ id, linhas, className = "", Tag = "h2" }: { id?: string; linhas: readonly string[]; className?: string; Tag?: "h2" | "h3" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const visto = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag ref={ref} id={id} className={`titulo ${visto ? "vis" : ""} ${className}`}>
      {linhas.map((l, n) => (
        <span key={l} className="lm">
          <span className="li" style={{ "--n": n } as CSSProperties}>
            {l}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/** Small gold label with a hairline before it. */
export function Olho({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`olho ${className}`}>{children}</p>;
}

/* ---------------- brand ---------------- */
/** The real G mark and the GOLDENERA word, at the header size. The intro lockup keeps these proportions. */
export function Logotipo({ className = "", topo = false }: { className?: string; topo?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`} {...(topo ? { "data-logo-topo": "" } : {})}>
      <Simbolo className="h-[32px] w-auto" />
      <Palavra className="h-[20px] w-auto" />
    </span>
  );
}

/* ---------------- icons ---------------- */
type Icone = (p: SVGProps<SVGSVGElement>) => JSX.Element;

export const Seta: Icone = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);
export const Play: Icone = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M7 4.5v15l12.5-7.5z" />
  </svg>
);
export const WhatsApp: Icone = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.870 9.870 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.860 9.860 0 0 1-1.510-5.260c.001-5.450 4.436-9.884 9.888-9.884 2.640 0 5.122 1.030 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.450-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.050 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.480-8.413z" />
  </svg>
);
