"use client";

import { useEffect, useRef, forwardRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MemoryScreenProps {
  photos?: { src: string; date?: string }[];
}

const MemoryScreen = forwardRef<HTMLElement, MemoryScreenProps>(
  function MemoryScreen({ photos = [] }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    // Positions stored in a ref to avoid re-renders
    const positionsRef = useRef<
      { left: number; top: number; rotate: number }[]
    >([]);

    const defaultPhotos = [
      { src: "/memory/memory-1.jpeg", date: "2025-11-26" },
      { src: "/memory/memory-2.jpeg", date: "2025-09-20" },
      { src: "/memory/memory-3.jpeg", date: "2025-11-18" },
      { src: "/memory/memory-4.jpeg", date: "2025-10-10" },
      { src: "/memory/memory-5.jpeg", date: "2025-11-19" },
      { src: "/memory/memory-6.jpeg", date: "2025-11-19" },
      { src: "/memory/memory-7.jpeg", date: "2025-10-13" },
      { src: "/memory/memory-8.jpeg", date: "2025-11-21" },
      { src: "/memory/memory-9.jpeg", date: "2025-09-22" },
      { src: "/memory/memory-10.jpeg", date: "2025-11-19" },
      { src: "/memory/memory-11.jpeg", date: "2026-01-07" },
      { src: "/memory/memory-12.jpeg", date: "2025-12-15" },
    ];

    const memoryPhotos = photos.length ? photos : defaultPhotos;

    // Generate positions only once
    if (positionsRef.current.length === 0) {
      positionsRef.current = memoryPhotos.map(() => ({
        left: gsap.utils.random(0, 80),
        top: gsap.utils.random(0, 70),
        rotate: gsap.utils.random(-15, 15),
      }));
    }

    // Animate on mount
    useEffect(() => {
      const cards =
        containerRef.current?.querySelectorAll<HTMLDivElement>(".memory-card");
      if (!cards) return;

      const ctx = gsap.context(() => {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          rotate: () => gsap.utils.random(-10, 10),
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });

        cards.forEach((card) => {
          gsap.to(card, {
            rotate: () => gsap.utils.random(-5, 5),
            duration: () => gsap.utils.random(3, 5),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
      });

      return () => ctx.revert();
    }, []);

    // Handle clicking a polaroid
    const handleCardClick = (idx: number) => {
      const cards =
        containerRef.current?.querySelectorAll<HTMLDivElement>(".memory-card");
      if (!cards) return;

      if (activeIdx === idx) {
        setActiveIdx(null);
        cards.forEach((card) => {
          gsap.to(card, {
            scale: 1,
            zIndex: 1,
            filter: "blur(0px)",
            duration: 0.5,
          });
        });
      } else {
        setActiveIdx(idx);
        cards.forEach((card, i) => {
          if (i === idx) {
            gsap.to(card, {
              scale: 1.5,
              zIndex: 50,
              x: 0,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              duration: 0.5,
            });
          } else {
            gsap.to(card, {
              scale: 1,
              zIndex: 1,
              filter: "blur(4px)",
              duration: 0.5,
            });
          }
        });
      }
    };

    // Reset active state if clicking outside any card
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!containerRef.current) return;

        // Check if the click target is inside any memory-card
        const target = e.target as HTMLElement;
        if (!target.closest(".memory-card") && activeIdx !== null) {
          const cards =
            containerRef.current.querySelectorAll<HTMLDivElement>(
              ".memory-card",
            );
          cards.forEach((card, i) => {
            const pos = positionsRef.current[i];
            gsap.to(card, {
              scale: 1,
              zIndex: 1,
              x: 0,
              y: 0,
              rotate: pos.rotate,
              filter: "blur(0px)",
              duration: 0.5,
            });
          });
          setActiveIdx(null);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => document.removeEventListener("click", handleClickOutside);
    }, [activeIdx]);

    return (
      <section
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 via-rose-100 to-pink-50 px-6 py-16 overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-serif mb-12 text-rose-800">
          Memories 💕
        </h2>

        <div ref={containerRef} className="relative w-full h-[800px]">
          {memoryPhotos.map((photo, idx) => {
            const pos = positionsRef.current[idx];

            return (
              <div
                key={idx}
                className="memory-card absolute w-[160px] h-[180px] bg-white p-3 shadow-lg rounded-lg cursor-pointer"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
                onClick={(e) => {
                  e.stopPropagation(); // prevent container click from firing
                  handleCardClick(idx);
                }}
              >
                <div className="w-full h-[140px] overflow-hidden rounded-lg">
                  <img
                    src={photo.src}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="mt-2 text-center text-sm text-gray-800 font-mono">
                  {photo.date ?? `2025-01-${idx + 1}`}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  },
);

export default MemoryScreen;