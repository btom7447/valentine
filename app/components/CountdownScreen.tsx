"use client";

import { useEffect, useState, useMemo, forwardRef, memo } from "react";
import { motion } from "framer-motion";

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Particle {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  duration: number;
}

// Memoized TimeBox component - won't re-render unless value changes
const TimeBox = memo(
  ({
    value,
    label,
    delay,
  }: {
    value: number;
    label: string;
    delay: number;
  }) => {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="flex flex-col items-center"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 min-w-[100px] md:min-w-[140px]">
          {/* Odometer-style number with smooth transition */}
          <div
            className="text-5xl md:text-7xl font-bold text-red-500 text-center tabular-nums transition-all duration-300 ease-out"
            style={{ willChange: "contents" }}
          >
            {value.toString().padStart(2, "0")}
          </div>
        </div>
        <p className="mt-3 text-white/90 text-lg md:text-xl font-semibold">
          {label}
        </p>
      </motion.div>
    );
  },
);

TimeBox.displayName = "TimeBox";

const CountdownScreen = forwardRef<HTMLElement>(
  function CountdownScreen(_, ref) {
    const [timeElapsed, setTimeElapsed] = useState<TimeElapsed | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Memoize particle positions - only calculate once
    const particles = useMemo<Particle[]>(() => {
      if (typeof window === "undefined") return [];

      return [...Array(30)].map((_, i) => ({
        id: i,
        startX: Math.random() * window.innerWidth,
        endX: Math.random() * window.innerWidth,
        startY: Math.random() * window.innerHeight,
        endY: Math.random() * window.innerHeight,
        duration: 10 + Math.random() * 20,
      }));
    }, [mounted]);

    useEffect(() => {
      if (!mounted) return;

      // Set your anniversary date here (when you first met/started dating)
      const anniversaryDate = new Date("2025-09-17T06:20:50").getTime();

      const calculateTimeElapsed = () => {
        const now = new Date().getTime();
        const difference = now - anniversaryDate;

        if (difference > 0) {
          const totalSeconds = Math.floor(difference / 1000);
          const totalMinutes = Math.floor(totalSeconds / 60);
          const totalHours = Math.floor(totalMinutes / 60);
          const totalDays = Math.floor(totalHours / 24);
          const totalMonths = Math.floor(totalDays / 30);
          const totalYears = Math.floor(totalDays / 365);

          const years = totalYears;
          const months = totalMonths % 12;
          const days = totalDays % 30;
          const hours = totalHours % 24;
          const minutes = totalMinutes % 60;
          const seconds = totalSeconds % 60;

          setTimeElapsed((prev) => {
            // Only update if values actually changed
            if (
              prev &&
              prev.years === years &&
              prev.months === months &&
              prev.days === days &&
              prev.hours === hours &&
              prev.minutes === minutes &&
              prev.seconds === seconds
            ) {
              return prev;
            }

            return {
              years,
              months,
              days,
              hours,
              minutes,
              seconds,
            };
          });
        }
      };

      calculateTimeElapsed();
      const timer = setInterval(calculateTimeElapsed, 1000);

      return () => clearInterval(timer);
    }, [mounted]);

    return (
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 overflow-hidden"
      >
        {/* Animated background particles */}
        {mounted && (
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  x: [particle.startX, particle.endX],
                  y: [particle.startY, particle.endY],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Time Together ⏰
          </motion.h2>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12"
          >
            Every second with you is precious 💕
          </motion.p>

          {/* Show timer when loaded */}
          {timeElapsed ? (
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <TimeBox value={timeElapsed.years} label="Years" delay={0.2} />
              <TimeBox value={timeElapsed.months} label="Months" delay={0.3} />
              <TimeBox value={timeElapsed.days} label="Days" delay={0.4} />
              <TimeBox value={timeElapsed.hours} label="Hours" delay={0.5} />
              <TimeBox
                value={timeElapsed.minutes}
                label="Minutes"
                delay={0.6}
              />
              <TimeBox
                value={timeElapsed.seconds}
                label="Seconds"
                delay={0.7}
              />
            </div>
          ) : (
            // Loading state
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 min-w-[100px] md:min-w-[140px] animate-pulse"
                >
                  <div className="h-16 md:h-20 bg-white/30 rounded"></div>
                </div>
              ))}
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-xl md:text-2xl text-white font-semibold"
          >
            ...and counting! 🌟
          </motion.p>
        </div>
      </section>
    );
  },
);

export default CountdownScreen;