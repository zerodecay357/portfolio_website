"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** Live media query, SSR-safe (server snapshot is `serverValue`). */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export function useReducedMotionPref() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True while the element is (nearly) on screen. Drives frameloop pausing. */
export function useOnScreen(ref: RefObject<Element | null>, rootMargin = "120px") {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return onScreen;
}
