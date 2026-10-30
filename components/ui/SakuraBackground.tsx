"use client";

import { useMemo } from "react";

export default function SakuraBackground() {
  const petals = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        left: (index * 37 + 11) % 100,
        delay: (index % 11) * -2.7,
        duration: 13 + ((index * 7) % 12),
        size: 7 + (index % 5) * 2,
        drift: index % 2 === 0 ? "drift-left" : "drift-right",
      })),
    [],
  );

  return (
    <div className="sakura-layer pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className={`sakura-petal ${petal.drift}`}
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: petal.size,
            height: petal.size * 0.72,
          }}
        />
      ))}
    </div>
  );
}