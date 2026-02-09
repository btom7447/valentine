"use client";

import { useEffect, useRef, forwardRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MemoryScreenProps {
  photos?: { src: string; date?: string }[];
}

const MemoryScreen = forwardRef<HTMLElement, MemoryScreenProps>(
  function MemoryScreen({ photos = [] }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
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
        left: gsap.utils.random(5, 75), // Keep away from edges
        top: gsap.utils.random(5, 65),
        rotate: gsap.utils.random(-15, 15),
      }));
    }

    // Animate on mount
    useEffect(() => {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Animate cards in
        const cards =
          containerRef.current?.querySelectorAll<HTMLDivElement>(
            ".memory-card",
          );
        if (!cards) return;

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

        // Subtle floating animation for each card
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: () => gsap.utils.random(-10, 10),
            rotate: () => gsap.utils.random(-3, 3),
            duration: () => gsap.utils.random(3, 5),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.1,
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
        // Close the active card
        setActiveIdx(null);
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
            ease: "power2.out",
          });
        });
      } else {
        // Open clicked card
        setActiveIdx(idx);
        cards.forEach((card, i) => {
          if (i === idx) {
            gsap.to(card, {
              scale: 1.8,
              zIndex: 50,
              x: 0,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "back.out(1.2)",
            });
          } else {
            gsap.to(card, {
              scale: 0.9,
              zIndex: 1,
              filter: "blur(4px)",
              opacity: 0.5,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });
      }
    };

    // Reset active state if clicking outside any card
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!containerRef.current) return;

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
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
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
        className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-red-50 px-6 py-16 overflow-hidden"
      >
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center text-red-600 mb-12 z-10"
        >
          Our Beautiful Moments 💖
        </h2>

        {/* Scattered Polaroids Container */}
        <div
          ref={containerRef}
          className="relative w-full min-w-screen max-w-7xl h-175 md:h-200"
        >
          {memoryPhotos.map((photo, idx) => {
            const pos = positionsRef.current[idx];

            return (
              <div
                key={idx}
                className="memory-card absolute w-30 md:w-50 bg-white shadow-xl rounded-lg cursor-pointer hover:shadow-2xl transition-shadow"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(idx);
                }}
              >
                {/* Polaroid image area */}
                <div className="w-full h-30 md:h-50 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={photo.src}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Polaroid date/caption */}
                <div className="mt-2 md:mt-3 text-center text-xs md:text-sm text-gray-700 font-mono">
                  {photo.date ??
                    `2025-01-${(idx + 1).toString().padStart(2, "0")}`}
                </div>

                {/* Heart decoration (only show when not active) */}
                {activeIdx !== idx && (
                  <motion.div
                    className="absolute top-0 right-0 text-2xl"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: idx * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    ❤️
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-center z-10"
        >
          <p className="text-xl text-red-500 font-semibold">
            And so many more to come... 💕
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Click any photo to see it up close
          </p>
        </motion.div>
      </section>
    );
  },
);

export default MemoryScreen;