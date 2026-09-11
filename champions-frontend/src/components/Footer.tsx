import { mainSiteUrl } from "../lib/api";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-display text-lg font-semibold tracking-wide">
          <span className="text-white">SAVE A LIFE</span> <span className="text-gold">CHAMPIONS</span>
        </p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/60">
          <span>Real Champions</span>
          <span className="text-ember">❤</span>
          <span>Real Impact</span>
          <span className="text-ember">❤</span>
          <span>A Brighter Tomorrow</span>
        </p>
        <p className="mt-4 text-xs text-white/30">
          Part of the Save A Life Africa movement — visit{" "}
          <a href={mainSiteUrl()} className="underline hover:text-white/60">
            savealifeafrica.org
          </a>
        </p>
      </div>
    </footer>
  );
}
