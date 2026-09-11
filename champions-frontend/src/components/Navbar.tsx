import { Link } from "react-router-dom";
import LiveBadge from "./LiveBadge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="font-display text-lg font-semibold tracking-wide">
          <span className="text-white">SAVE A LIFE</span> <span className="text-gold">CHAMPIONS</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
          <a href="/#champion-board" className="hover:text-white">
            Leaderboard
          </a>
          <a href="/#impact" className="hover:text-white">
            Impact
          </a>
          <Link to="/live" className="hover:text-white">
            TV Mode
          </Link>
        </div>
        <LiveBadge label="LIVE" />
      </div>
    </header>
  );
}
