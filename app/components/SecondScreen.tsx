"use client";

import "../styles/secondScreen.css";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";

const SecondScreen = forwardRef<HTMLElement>(function SecondScreen(_, ref) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-screen overflow-hidden star-container"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-4 text-3xl md:text-5xl font-serif"
        >
          A playlist made for us 💖
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 max-w-md text-white/80 text-lg"
        >
          Each song feels different when they remind me of you.
        </motion.p>

        {/* Spotify Embed with animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="mb-8 w-full max-w-md rounded-lg border-2 border-white/30 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/5"
          onMouseEnter={() => setIsPlaying(true)}
          onMouseLeave={() => setIsPlaying(false)}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/2HE6fxQRB7fcTxIvbkMtTq?utm_source=generator&theme=0"
            width="100%"
            height="352"
            style={{ borderRadius: "12px" }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </motion.div>

        {/* Additional message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/70 italic max-w-lg"
        >
          Play on shuffle. Think of Me 🎧
        </motion.p>
      </motion.div>

      {/* Decorative stars */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </section>
  );
});

export default SecondScreen;