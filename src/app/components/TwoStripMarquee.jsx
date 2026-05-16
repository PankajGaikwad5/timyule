"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { data } from "../data";
import CommissionModal from "./CommissionModal";

const COMMISSION_INTERVAL = 4; // inject one CTA every N real products

function injectCommissionSlots(products) {
  const result = [];
  products.forEach((product, i) => {
    result.push(product);
    if ((i + 1) % COMMISSION_INTERVAL === 0) {
      result.push({ type: "commission", id: `commission-${i}` });
    }
  });
  return result;
}

function MarqueeRow({ products, direction = 1, itemWidth, itemHeight, gap, onCommissionClick }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const router = useRouter();

  // Physics state
  const pos = useRef({ x: 0 });
  const camera = useRef({ x: 0 });
  const velocity = useRef({ x: 0 });

  // Drag state
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0 });
  const dragDist = useRef(0);
  const clickedProduct = useRef(null);
  const animationRef = useRef(0);
  const lastTime = useRef(0);

  const withSlots = injectCommissionSlots(products);
  const displayProducts = withSlots.length < 10 ? [...withSlots, ...withSlots, ...withSlots] : withSlots;
  const totalItems = displayProducts.length;
  const tw = itemWidth + gap;
  const W = tw * totalItems;

  useEffect(() => {
    const update = () => {
      const now = performance.now();
      if (lastTime.current === 0) lastTime.current = now;
      const dt = Math.min(now - lastTime.current, 50);
      lastTime.current = now;

      if (!isDragging.current) {
        pos.current.x += (direction * 60 * dt) / 1000;
        pos.current.x += velocity.current.x;
        velocity.current.x *= 0.92;
      }

      camera.current.x += (pos.current.x - camera.current.x) * 0.05;

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const bx = i * tw;
        const rx = (((bx - camera.current.x + W / 2) % W) + W) % W - W / 2;
        el.style.transform = `translate3d(${rx}px, 0, 0)`;
      });

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current);
  }, [W, direction, tw]);

  const onPointerDown = (e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointer.current = { x: e.clientX };
    velocity.current = { x: 0 };
    dragDist.current = 0;

    const target = e.target.closest('[data-product-id]');
    if (target) {
      clickedProduct.current = target.getAttribute('data-product-id');
    } else {
      clickedProduct.current = null;
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    dragDist.current += Math.abs(dx);
    pos.current.x -= dx;
    velocity.current.x = -dx;
    lastPointer.current = { x: e.clientX };
  };

  const onPointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (dragDist.current < 10 && clickedProduct.current) {
      if (clickedProduct.current.startsWith("commission")) {
        onCommissionClick?.();
      } else {
        router.push(`/product/${clickedProduct.current}`);
      }
    }
    clickedProduct.current = null;
  };

  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    velocity.current.x += delta * 0.2;
    pos.current.x += delta;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-none ${isDragging.current ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ height: itemHeight, zIndex: 10, aspectRatio: "1/1" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div className="absolute top-0 left-1/2 w-0 h-0">
        {displayProducts.map((product, i) => {
          if (product.type === "commission") {
            return (
              <div
                key={`${product.id}-${i}`}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="absolute will-change-transform group overflow-hidden"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  marginLeft: -(itemWidth / 2),
                  transform: `translate3d(-9999px, 0, 0)`,
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  background: "rgba(20, 20, 20, 0.4)",
                }}
              >
                <div
                  className="relative w-full h-full flex flex-col items-center justify-center gap-5 px-8 cursor-pointer"
                  data-product-id={product.id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white transition-all duration-500 group-hover:scale-110"
                    style={{ pointerEvents: "none" }}
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span
                    className="font-(family-name:--font-display) font-normal text-white/75 group-hover:text-white text-2xl leading-tight tracking-[0.02em] text-center transition-colors duration-500"
                    style={{ pointerEvents: "none" }}
                  >
                    Get your piece<br />commissioned today
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 group-hover:text-white/75 transition-colors duration-500"
                    style={{ pointerEvents: "none" }}
                  >
                    Enquire →
                  </span>
                </div>
              </div>
            );
          }

          let overlayText = "";
          if (product.name === "MtSturgeon" || product.name === "Warrior Rise Up") {
            overlayText = "Commision sold";
          } else if (product.status === "instock") {
            overlayText = "Available";
          } else if (product.status === "commissioned" || product.status === "sold") {
            overlayText = "Available for Commision";
          }

          return (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="absolute group will-change-transform bg-[#1a1a1a] shadow-2xl overflow-hidden"
              style={{
                width: itemWidth,
                height: itemHeight,
                marginLeft: -(itemWidth / 2),
                transform: `translate3d(-9999px, 0, 0)`,
              }}
            >
              <div className="relative w-full h-full cursor-pointer" data-product-id={product.id}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover pointer-events-none select-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-15 group-hover:grayscale-0"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-center justify-center pointer-events-none z-10">
                  <span className="font-(family-name:--font-display) font-normal text-white text-xl md:text-3xl leading-none tracking-[0.03em] text-center px-4">
                    {overlayText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TwoStripMarquee() {
  const [dimensions, setDimensions] = useState({
    itemWidth: 320,
    itemHeight: 520,
    gap: 150
  });

  const [phase, setPhase] = useState("hidden");
  const [commissionOpen, setCommissionOpen] = useState(false);

  useEffect(() => {
    const DOTS_END_MS = 1350;
    const LOGO_ANIM_MS = 1300;
    const FADE_MS = 1200;

    const t1 = setTimeout(() => setPhase("fading"), DOTS_END_MS + LOGO_ANIM_MS);
    const t2 = setTimeout(() => setPhase("settled"), DOTS_END_MS + LOGO_ANIM_MS + FADE_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;

      if (window.innerWidth < 768) {
        const mobileSize = vh * 32;
        setDimensions({
          itemWidth: mobileSize,
          itemHeight: mobileSize,
          gap: 60
        });
      } else {
        const baseSize = vh * 38;
        setDimensions({
          itemWidth: baseSize,
          itemHeight: baseSize,
          gap: 150
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { itemWidth, itemHeight, gap } = dimensions;

  const mid = Math.ceil(data.length / 2);
  const row1Products = data.slice(0, mid);
  const row2Products = data.slice(mid);

  const zIndex = phase === "settled" ? 10 : phase === "fading" ? 210 : 5;

  return (
    <>
      <div
        className="absolute inset-0 w-full h-full flex flex-col justify-around overflow-hidden bg-transparent pt-[6vh] pb-[2vh]"
        style={{
          zIndex,
          opacity: phase === "hidden" ? 0 : 1,
          transition: "opacity 1.2s ease",
          pointerEvents: phase === "settled" ? "all" : "none"
        }}
      >
        <MarqueeRow
          products={row1Products}
          direction={1}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          gap={gap}
          onCommissionClick={() => setCommissionOpen(true)}
        />
        <MarqueeRow
          products={row2Products}
          direction={-1}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          gap={gap}
          onCommissionClick={() => setCommissionOpen(true)}
        />
      </div>
      <CommissionModal isOpen={commissionOpen} onClose={() => setCommissionOpen(false)} />
    </>
  );
}
