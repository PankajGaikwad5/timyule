"use client";
import { useEffect, useState } from "react";

const DOTS_END_MS = 1350;
const LOGO_ANIM_MS = 1300;
const FADE_MS = 1200;

export default function AnimatedSignature() {
  // During animation: above the overlay (z-201) so it's actually visible
  // After overlay fully fades: drop to z-1 so the grid sits on top
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Drop z-index to background level only AFTER the loading overlay fully fades out
    const t = setTimeout(
      () => setSettled(true),
      DOTS_END_MS + LOGO_ANIM_MS + FADE_MS
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <img
      src="/timbg2.png"
      alt=""
      draggable={false}
      aria-hidden="true"
      className="mt-3 "
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        transformOrigin: "center center",
        pointerEvents: "none",
        userSelect: "none",
        // Above overlay while animating, behind grid once settled
        zIndex: settled ? 1 : 201,
        // fill-mode "both": locked at 0% state during delay, locked at 100% state forever after
        animation: `logoExplode ${LOGO_ANIM_MS}ms ${DOTS_END_MS}ms ease both`,
      }}
    />
  );
}
