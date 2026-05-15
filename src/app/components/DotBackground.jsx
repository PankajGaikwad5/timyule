"use client";
import { useEffect, useState } from "react";
import { generateDots } from "./dotData";

export default function DotBackground() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    setDots(generateDots());
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.leftPct}%`,
            top: `${d.topPct}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            backgroundColor: d.color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
