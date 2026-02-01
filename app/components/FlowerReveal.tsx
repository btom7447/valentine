"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

const FlowerReveal = forwardRef((_, ref) => {
  const stemRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<SVGPathElement[]>([]);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Expose a method to trigger the bloom
  useImperativeHandle(ref, () => ({
    bloom: () => {
      const tl = gsap.timeline();

      tl.fromTo(
        stemRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.out" },
      )
        .fromTo(
          petalsRef.current,
          { scale: 0, rotation: -40, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          textRef.current,
          { width: 0 },
          { width: "100%", duration: 2, ease: "none" },
          "-=0.3",
        );
    },
  }));

  return (
    <div className="flex flex-col items-center">
      {/* Stem */}
      <div
        ref={stemRef}
        className="w-2 h-56 bg-green-600 origin-bottom rounded-full"
      />

      {/* Rose */}
      <svg width="220" height="220" viewBox="0 0 200 200" className="-mt-24">
        {[
          "M100 40 C40 80, 60 140, 100 160",
          "M100 40 C160 80, 140 140, 100 160",
          "M100 30 C60 60, 80 120, 100 150",
          "M100 30 C140 60, 120 120, 100 150",
        ].map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) petalsRef.current[i] = el;
            }}
            d={d}
            fill="#dc2626"
            transform-origin="center"
          />
        ))}
      </svg>

      {/* Typewriter text */}
      <p
        ref={textRef}
        className="mt-12 text-2xl md:text-3xl text-red-700 font-semibold overflow-hidden whitespace-nowrap"
        style={{ width: 0 }}
      >
        Happy Valentine’s Day, my love 💕
      </p>
    </div>
  );
});

export default FlowerReveal;