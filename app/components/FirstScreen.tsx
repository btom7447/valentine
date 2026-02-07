"use client";

import "../styles/firstScreen.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface FirstScreenProps {
  onYesClick: () => void;
}

const tooltipMessages = [
  "You can't say no 😌",
  "Really? 😒",
  "C'mon 😑",
  "One last time 😏",
  "Just kidding 😁",
  "Say YES! 🥺",
];

const ICONS = [
  "/heart-cutout.png",
  "/heart.gif",
  "/rose-bloom.png",
  "/rose-cutout.png",
  "/arrow-heart.png",
  "/cupid-bow.gif",
  "/start.gif",
  "/tulip.png",
  "/heart-arrow.png",
  "/arrow-heart.png",
];

export default function FirstScreen({ onYesClick }: FirstScreenProps) {
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [tooltip, setTooltip] = useState(false);
  const [yesButtons, setYesButtons] = useState<
    Array<{ id: number; x: number; y: number }>
  >([{ id: 1, x: 0, y: 0 }]);
  const [typedText, setTypedText] = useState("");
  const [icons, setIcons] = useState<
    Array<{
      src: string;
      x: number;
      y: number;
      rotation: number;
      scale: number;
    }>
  >([]);
  const [tooltipIndex, setTooltipIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const fullText = "Ima, Will you be my Valentine? 💖";

  // Memoized click handler
  const handleNoClick = useCallback(() => {
    // Add Yes button
    setYesButtons((prev) => {
      const newId = prev.length + 1;
      const padding = 100; // Keep buttons away from edges
      const newBtn = {
        id: newId,
        x:
          Math.random() * (window.innerWidth - padding * 2) -
          window.innerWidth / 2 +
          padding,
        y:
          Math.random() * (window.innerHeight - padding * 2) -
          window.innerHeight / 2 +
          padding,
      };
      return [...prev, newBtn];
    });

    setTooltip(true);

    // Cycle tooltip message
    setTooltipIndex((prev) => Math.min(prev + 1, tooltipMessages.length - 1));

    setTimeout(() => setTooltip(false), 1500);
  }, []);

  // Optimized Yes click with confetti
  const handleYesClickWithConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      onYesClick();
    }, 500);
  }, [onYesClick]);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Initialize decorative icons (optimized)
  useEffect(() => {
    const padding = 20;
    const iconElements = [...ICONS, ...ICONS].map((src) => {
      return {
        src,
        x: padding + Math.random() * (window.innerWidth - padding * 2),
        y: padding + Math.random() * (window.innerHeight - padding * 2),
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.2,
      };
    });
    setIcons(iconElements);
  }, []);

  // Hover → dodge No button
  const dodgeNo = useCallback(() => {
    if (!noBtnRef.current) return;

    const x = Math.random() * 150 - 75;
    const y = Math.random() * 100 - 50;

    gsap.to(noBtnRef.current, {
      x,
      y,
      duration: 0.5,
      ease: "power2.out",
    });

    setTooltip(true);
    setTimeout(() => setTooltip(false), 1500);
  }, []);

  return (
    <section className="first-screen min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  scale: [0, 1, 0.8],
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              >
                {["❤️", "💕", "💖", "🌹", "💝"][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Icons */}
      {icons.map((icon, idx) => (
        <motion.img
          key={idx}
          src={icon.src}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.7,
            scale: icon.scale,
            rotate: icon.rotation,
            y: [icon.y, icon.y - 50, icon.y],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute pointer-events-none w-12 h-12 md:w-16 md:h-16"
          style={{ left: icon.x, top: icon.y, zIndex: 0 }}
        />
      ))}

      {/* Typewriter Text */}
      <motion.h1
        className="text-4xl md:text-6xl text-red-600 font-bold text-center mb-12 z-10 px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {typedText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      </motion.h1>

      {/* Initial Buttons Row */}
      <div className="flex gap-6 z-10 pt-10">
        {/* Yes button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClickWithConfetti}
          className="px-8 py-5 rounded-full bg-red-400 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow relative z-10"
        >
          Yes 💖
        </motion.button>

        {/* No button wrapper */}
        <div className="relative">
          <button
            ref={noBtnRef}
            onMouseEnter={dodgeNo}
            onClick={handleNoClick}
            className="px-8 py-5 rounded-full bg-white text-red-500 font-semibold shadow-lg hover:shadow-xl transition-shadow relative"
          >
            No 💔
          </button>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: 50, scale: 1 }}
                exit={{ opacity: 0, y: 0, scale: 0.8 }}
                className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-red-500 font-bold bg-white px-4 py-2 rounded-lg shadow-md z-1000"
                style={{
                  width: "max-content",
                  minWidth: "160px",
                  textAlign: "center",
                }}
              >
                {tooltipMessages[tooltipIndex]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Spread Yes Buttons */}
      {yesButtons.slice(1).map((btn) => (
        <motion.button
          key={btn.id}
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{ x: btn.x, y: btn.y, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClickWithConfetti}
          className="px-8 py-4 rounded-full bg-red-400 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow absolute z-10"
        >
          Yes 💖
        </motion.button>
      ))}
    </section>
  );
}
