"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Small ring that trails the pointer. Over any element with data-cursor="plus"
 * it grows into a crosshair. Only mounts for fine pointers.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [plus, setPlus] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 500, damping: 40, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setPlus(!!target?.closest?.('[data-cursor="plus"]'));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 text-white"
        animate={{ scale: plus ? 1.6 : 1, rotate: plus ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {plus ? (
          <svg viewBox="0 0 24 24" className="size-6" fill="none">
            <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        ) : (
          <div className="size-3 rounded-full bg-white" />
        )}
      </motion.div>
    </motion.div>
  );
}
