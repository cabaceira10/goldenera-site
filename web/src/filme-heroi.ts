export interface Filme {
  src720: string;
  src1080?: string;
  poster: string;
  vtt?: string;
  label: string;
  seconds: number;
  /** Seconds to skip at the start of the file (a black or unrelated lead-in). Every restart goes here, not to 0. */
  inicio?: number;
  /** The captions are burned into the picture: no caption bar over the frame, only the one under it on phones. */
  legendasQueimadas?: boolean;
}

// The hero film: twelve real GoldenEra reels, three phones at a time, at the clips' own size (432x768, never scaled up).
// Swap for a longer film with sound when the originals arrive: same two files, same poster path.
export const HERO_FILM: Filme = {
  src720: "campaign/film/filme-reels-720.mp4",
  src1080: "campaign/film/filme-reels-1080.mp4",
  poster: "img/filme-reels.webp",
  label: "Reels da GoldenEra para negócios locais, três de cada vez",
  seconds: 20.2,
  legendasQueimadas: true,
};
