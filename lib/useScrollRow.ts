"use client";

import { useEffect, useRef } from "react";

/**
 * Horizontal scroll-snap row with mouse drag and prev/next stepping, ported from the
 * drakken-website hero carousel. Returns a ref for the row and a `step(dir)` function
 * (1 = next item, -1 = previous item).
 */
export function useScrollRow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let down = false;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    const items = () => [...row.children].filter((c) => c.getBoundingClientRect().width > 0);
    const origin = () => row.getBoundingClientRect().left + (parseFloat(getComputedStyle(row).paddingLeft) || 0);
    const snap = () => {
      const o = origin();
      const list = items();
      let best = 0;
      list.forEach((c, i) => {
        if (Math.abs(c.getBoundingClientRect().left - o) < Math.abs(list[best].getBoundingClientRect().left - o)) best = i;
      });
      row.scrollBy({ left: list[best].getBoundingClientRect().left - o, behavior: "smooth" });
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      dragging = false;
      startX = e.clientX;
      startLeft = row.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) < 5) return;
      if (!dragging) {
        dragging = true;
        row.classList.add("is-dragging");
      }
      row.scrollLeft = startLeft - dx;
      e.preventDefault();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      row.classList.remove("is-dragging");
      if (dragging) snap();
    };
    // A drag must not also count as a click on a link inside the row.
    const onClick = (e: MouseEvent) => {
      if (dragging) {
        e.preventDefault();
        e.stopPropagation();
        dragging = false;
      }
    };
    const noDrag = (e: Event) => e.preventDefault();
    row.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    row.addEventListener("click", onClick, true);
    row.addEventListener("dragstart", noDrag);
    return () => {
      row.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      row.removeEventListener("click", onClick, true);
      row.removeEventListener("dragstart", noDrag);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const row = ref.current;
    if (!row) return;
    const o = row.getBoundingClientRect().left + (parseFloat(getComputedStyle(row).paddingLeft) || 0);
    const list = [...row.children].filter((c) => c.getBoundingClientRect().width > 0);
    const lefts = list.map((c) => c.getBoundingClientRect().left);
    const half = list[0].getBoundingClientRect().width / 2;
    let i = -1;
    if (dir === 1) i = lefts.findIndex((l) => l > o + half);
    else
      for (let k = lefts.length - 1; k >= 0; k--)
        if (lefts[k] < o - half) {
          i = k;
          break;
        }
    if (i < 0) return;
    row.scrollBy({ left: lefts[i] - o, behavior: "smooth" });
  };

  return [ref, step] as const;
}
