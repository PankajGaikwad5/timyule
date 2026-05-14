"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { data } from "../data";

export default function InfiniteGrid() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const router = useRouter();

  // Physics state
  // Initial Y offset of 335 perfectly centers the horizontal gap between rows behind the text
  const pos = useRef({ x: 0, y: 335 });
  const camera = useRef({ x: 0, y: 335 });
  const velocity = useRef({ x: 0, y: 0 });

  // Drag state
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragDist = useRef(0);
  const clickedProduct = useRef(null);
  const animationRef = useRef(0);
  const lastTime = useRef(0);

  // Matrix configuration
  const cols = 10;
  const rows = 8;
  const totalItems = cols * rows;
  
  const [dimensions, setDimensions] = React.useState({
    itemWidth: 320,
    itemHeight: 520,
    gap: 150
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ itemWidth: 180, itemHeight: 290, gap: 80 });
      } else {
        setDimensions({ itemWidth: 320, itemHeight: 520, gap: 150 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { itemWidth, itemHeight, gap } = dimensions;
  
  const tw = itemWidth + gap;
  const th = itemHeight + gap;
  
  // Total size of the repeating grid boundary
  const W = tw * cols;
  const H = th * rows;

  useEffect(() => {
    const update = () => {
      const now = performance.now();
      if (lastTime.current === 0) lastTime.current = now;
      // Cap dt to avoid massive jumps if the tab was inactive
      const dt = Math.min(now - lastTime.current, 50); 
      lastTime.current = now;

      // Apply momentum if not dragging
      if (!isDragging.current) {
        // Continuous horizontal drift (e.g., 60px per second)
        // Drifting only horizontally keeps the text permanently in the vertical gap!
        pos.current.x -= (60 * dt) / 1000;

        pos.current.x += velocity.current.x;
        pos.current.y += velocity.current.y;
        
        // Friction allows smooth settling
        velocity.current.x *= 0.92;
        velocity.current.y *= 0.92;
      }

      // Smooth camera interpolation for that "premium heavy weight" feel
      camera.current.x += (pos.current.x - camera.current.x) * 0.05;
      camera.current.y += (pos.current.y - camera.current.y) * 0.05;

      // Update positions of all grid items
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        
        // Base coordinate inside grid
        const bx = (i % cols) * tw;
        const by = Math.floor(i / cols) * th;

        // Apply wrapping logic around the central viewport
        const rx = (((bx - camera.current.x + W / 2) % W) + W) % W - W / 2;
        const ry = (((by - camera.current.y + H / 2) % H) + H) % H - H / 2;

        el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      });

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationRef.current);
  }, [W, H, cols, gap, itemHeight, itemWidth, rows, th, tw]);

  // Event Handlers
  const onPointerDown = (e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
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
    const dy = e.clientY - lastPointer.current.y;

    dragDist.current += Math.abs(dx) + Math.abs(dy);

    pos.current.x -= dx;
    pos.current.y -= dy;

    // Record instantaneous velocity for release momentum
    velocity.current = { x: -dx, y: -dy };

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (dragDist.current < 10 && clickedProduct.current) {
      router.push(`/product/${clickedProduct.current}`);
    }
    clickedProduct.current = null;
  };

  // Allow scrolling inside the grid
  const onWheel = (e) => {
    const isTouchpad = Math.abs(e.deltaX) !== 0 || Math.abs(e.deltaY) < 15;
    
    if (isTouchpad) {
      // Natural fluid scrolling
      velocity.current.x += e.deltaX * 0.5;
      velocity.current.y += e.deltaY * 0.5;
      pos.current.x += e.deltaX;
      pos.current.y += e.deltaY;
    } else {
      // Mouse wheel stepped scrolling
      velocity.current.y += e.deltaY;
      pos.current.y += e.deltaY;
    }
  };

  const items = Array.from({ length: totalItems });

  return (
    <div
      ref={containerRef}
      className={`
        w-full h-full overflow-hidden relative select-none touch-none
        ${isDragging.current ? "cursor-grabbing" : "cursor-grab"}
      `}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      {/* Small UI Decoration replicating the original sample top left switch */}
      {/* <div className="absolute top-6 left-6 z-10 w-12 h-12 bg-black/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 shadow-2xl pointer-events-none">
        <div className="w-5 h-5 border-[2.5px] border-white/60 rounded-[4px]"></div>
      </div> */}

      <div
        className="absolute top-1/2 left-1/2 w-0 h-0 z-20"
      >
         <div className="fixed bottom-0 left-0 w-full h-screen flex justify-center items-center">
       <h1 className="font-[family-name:var(--font-display)] font-normal text-[clamp(64px,11vw,168px)] leading-[0.9] tracking-[0.03em] m-0 mb-7 text-[var(--ink)]">
            Tim
            Yule.
          </h1>
      </div>
        {items.map((_, i) => {
          const product = data[i % data.length];
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
            className="absolute shadow-2xl overflow-hidden group will-change-transform bg-[#1a1a1a]"
            style={{
              width: itemWidth,
              height: itemHeight,
              // Offset to center the anchors
              marginLeft: -(itemWidth / 2),
              marginTop: -(itemHeight / 2),
              // Initialize hidden off-screen to avoid flicker
              transform: `translate3d(-9999px, -9999px, 0)`,
            }}
          >
            {/* 
                We use high-res images to guarantee maximum fidelity 
                while zooming and scrolling. Applying greyscale slightly first mimicking the premium moody aesthetic.
            */}
            <div 
              className="relative w-full h-full cursor-pointer"
              data-product-id={product.id}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover pointer-events-none select-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-center justify-center pointer-events-none z-10">
                <span className="font-[family-name:var(--font-display)] font-normal text-white text-3xl md:text-4xl leading-[1] tracking-[0.03em] text-center px-4">
                  {overlayText}
                </span>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
