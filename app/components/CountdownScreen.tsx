"use client";

import { useEffect, useState, forwardRef } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownScreen = forwardRef<HTMLElement>(
  function CountdownScreen(_, ref) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
      months: 4,
      days: 28,
      hours: 1,
      minutes: 1,
      seconds: 40,
    });

    useEffect(() => {
      // Set your special date here (anniversary, next date, etc.)
      const targetDate = new Date("2025-02-14T00:00:00").getTime();

      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
          setTimeLeft({
            months: Math.floor(difference / (1000 * 60 * 60 * 24)),
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, []);

    const TimeBox = ({
      value,
      label,
      delay,
    }: {
      value: number;
      label: string;
      delay: number;
    }) => (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="flex flex-col items-center"
      >
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 min-w-25 md:min-w-35"
        >
          <div className="text-5xl md:text-7xl font-bold text-red-500 text-center">
            {value.toString().padStart(2, "0")}
          </div>
        </motion.div>
        <p className="mt-3 text-white/90 text-lg md:text-xl font-semibold">
          {label}
        </p>
      </motion.div>
    );

    return (
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-rose-400 via-pink-500 to-red-500 overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Time Together ⏰
          </motion.h2>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12"
          >
            Every second with you is precious 💕
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <TimeBox value={timeLeft.months} label="Months" delay={0.3} />
            <TimeBox value={timeLeft.days} label="Days" delay={0.3} />
            <TimeBox value={timeLeft.hours} label="Hours" delay={0.4} />
            <TimeBox value={timeLeft.minutes} label="Minutes" delay={0.5} />
            <TimeBox value={timeLeft.seconds} label="Seconds" delay={0.6} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-xl md:text-2xl text-white font-semibold"
          >
            Until our next adventure begins... 🌟
          </motion.p>
        </div>
      </section>
    );
  },
);

export default CountdownScreen;
