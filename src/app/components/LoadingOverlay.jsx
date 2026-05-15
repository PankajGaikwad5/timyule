"use client";
import { useEffect, useRef, useState } from "react";
import { generateDots } from "./dotData";

// Dots animation ends, then logo animates for 1.3s, then overlay fades
const DOTS_END_MS = 1350;
const LOGO_ANIM_MS = 1300;

export default function LoadingOverlay() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("dots"); // dots | fade | done

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const cx = W / 2;
    const cy = H / 2;

    // Use the exact same dots as DotBackground — canvas animates them flying into position
    const dots = generateDots();
    const particles = dots.map((d) => ({
      tx: (d.leftPct / 100) * W,
      ty: (d.topPct / 100) * H,
      sx: cx + (Math.random() - 0.5) * 80,
      sy: cy + (Math.random() - 0.5) * 80,
      r: d.size / 2,
      color: d.color,
      delay: Math.random() * 750,
      dur: 350 + Math.random() * 500,
    }));

    let startTime = null;
    let rafId;
    let stopped = false;

    const draw = (elapsed) => {
      ctx.fillStyle = "#f5efe4";
      ctx.fillRect(0, 0, W, H);
      for (const p of particles) {
        if (elapsed < p.delay) continue;
        const rawT = Math.min((elapsed - p.delay) / p.dur, 1);
        const ease = 1 - Math.pow(1 - rawT, 3);
        const x = p.sx + (p.tx - p.sx) * ease;
        const y = p.sy + (p.ty - p.sy) * ease;
        const sc =
          rawT < 0.55
            ? rawT / 0.55
            : 1 + Math.sin(((rawT - 0.55) / 0.45) * Math.PI) * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, p.r * Math.max(0, sc), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    };

    const animate = (ts) => {
      if (stopped) return;
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      draw(elapsed);
      if (elapsed < DOTS_END_MS + 100) {
        rafId = requestAnimationFrame(animate);
      } else {
        draw(DOTS_END_MS);
      }
    };

    rafId = requestAnimationFrame(animate);

    // Overlay fades exactly when logo animation finishes
    const t1 = setTimeout(() => setPhase("fade"), DOTS_END_MS + LOGO_ANIM_MS);
    const t2 = setTimeout(() => setPhase("done"), DOTS_END_MS + LOGO_ANIM_MS + 1200);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: 200,
        background: "#f5efe4",
        opacity: phase === "fade" ? 0 : 1,
        transition: phase === "fade" ? "opacity 1.2s ease" : "none",
        pointerEvents: phase === "fade" ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
