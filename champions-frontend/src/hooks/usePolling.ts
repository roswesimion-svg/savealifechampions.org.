import { useEffect, useRef, useState } from "react";

interface PollingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Polls `fetcher` every `intervalMs`. Used instead of a websocket layer —
 * the existing backend has no realtime infrastructure, so a lightweight
 * refresh keeps the Champions experience feeling live without introducing
 * new infra (per the "don't over-engineer" guidance in the brief).
 */
export function usePolling<T>(fetcher: () => Promise<T>, intervalMs: number, deps: unknown[] = []) {
  const [state, setState] = useState<PollingState<T>>({ data: null, loading: true, error: null });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const data = await fetcherRef.current();
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (err: any) {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false, error: err?.message || "Failed to load" }));
      }
    }

    run();
    const id = setInterval(run, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
