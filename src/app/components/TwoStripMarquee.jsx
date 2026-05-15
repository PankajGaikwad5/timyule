"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { data } from "../data";

function MarqueeRow({ products, direction = 1, itemWidth, itemHeight, gap }) {
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

  // Ensure we have enough items for infinite feel by duplicating if needed
  const displayProducts = products.length < 10 ? [...products, ...products, ...products] : products;
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
        // Auto drift based on direction (60px per second)
        pos.current.x += (direction * 60 * dt) / 1000;
        pos.current.x += velocity.current.x;
        velocity.current.x *= 0.92;
      }

      // Smooth camera interpolation
      camera.current.x += (pos.current.x - camera.current.x) * 0.05;

      // Update positions
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const bx = i * tw;
        // Wrapping logic
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
      router.push(`/product/${clickedProduct.current}`);
    }
    clickedProduct.current = null;
  };

  const onWheel = (e) => {
    // Determine if it's horizontal or vertical wheel and apply to horizontal pos
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
                  className="w-full h-full object-cover pointer-events-none select-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-[15%] group-hover:grayscale-0"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-center justify-center pointer-events-none z-10">
                  <span className="font-[family-name:var(--font-display)] font-normal text-white text-xl md:text-3xl leading-[1] tracking-[0.03em] text-center px-4">
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

  const [phase, setPhase] = useState("hidden"); // hidden | fading | settled

  useEffect(() => {
    const DOTS_END_MS = 1350;
    const LOGO_ANIM_MS = 1300;
    const FADE_MS = 1200;

    // Phase 1: Wait for dots and logo animation
    const t1 = setTimeout(() => setPhase("fading"), DOTS_END_MS + LOGO_ANIM_MS);
    // Phase 2: Fade is complete
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
        // Enforced 1:1 Square sizing
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

  // Split data into two rows
  const mid = Math.ceil(data.length / 2);
  const row1Products = data.slice(0, mid);
  const row2Products = data.slice(mid);

  // Determine z-index based on loading phase
  // We need to be > 200 during fade to be over the signature (201)
  const zIndex = phase === "settled" ? 10 : phase === "fading" ? 210 : 5;

  return (
    <div 
      className="absolute inset-0 w-full h-full flex flex-col justify-around overflow-hidden bg-transparent pt-[6vh] pb-[2vh]"
      style={{ 
        zIndex,
        opacity: phase === "hidden" ? 0 : 1,
        transition: "opacity 1.2s ease",
        pointerEvents: phase === "settled" ? "all" : "none"
      }}
    >
      {/* Top Strip: Left to Right (direction 1) */}
      <MarqueeRow 
        products={row1Products} 
        direction={1} 
        itemWidth={itemWidth} 
        itemHeight={itemHeight} 
        gap={gap} 
      />
      {/* Bottom Strip: Right to Left (direction -1) */}
      <MarqueeRow 
        products={row2Products} 
        direction={-1} 
        itemWidth={itemWidth} 
        itemHeight={itemHeight} 
        gap={gap} 
      />
    </div>
  );
}
