import { useCallback, useRef, useState } from "react";
import type { ImpactStory } from "../types";

function SingleSlider({ story }: { story: ImpactStory }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel/60">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none touch-none sm:aspect-[16/10]"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        {story.afterImage && (
          <img src={story.afterImage} alt={`${story.campaignTitle ?? "Impact"} — after`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        )}
        {story.beforeImage && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
            <img
              src={story.beforeImage}
              alt={`${story.campaignTitle ?? "Impact"} — before`}
              className="h-full object-cover"
              style={{ width: containerRef.current?.offsetWidth ?? "100vw", maxWidth: "none" }}
              draggable={false}
            />
          </div>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold tracking-wide">BEFORE</div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-ink">AFTER</div>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="h-full w-0.5 -translate-x-1/2 bg-white/80" />
          <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
            <span className="text-xs">⇔</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="font-display text-lg font-semibold">{story.campaignTitle ?? "Impact Story"}</p>
        {story.description && <p className="mt-1 text-sm text-white/60">{story.description}</p>}
        <p className="mt-3 text-sm italic text-gold">"This is what Champions make possible."</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ stories, loading }: { stories: ImpactStory[]; loading: boolean }) {
  const [active, setActive] = useState(0);

  if (loading && stories.length === 0) {
    return <div className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-white/5 sm:aspect-[16/10]" />;
  }

  if (stories.length === 0) return null;

  return (
    <div>
      <SingleSlider story={stories[active]} />
      {stories.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                i === active ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {s.campaignTitle ?? `Story ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
