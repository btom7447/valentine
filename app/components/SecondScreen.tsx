"use client";

import "../styles/secondScreen.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const SecondScreen = forwardRef<HTMLElement>(function SecondScreen(_, ref) {
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
        <h2 className="mb-4 text-3xl md:text-5xl font-serif">
          A playlist made for us 💖
        </h2>

        <p className="mb-8 max-w-md text-white/80">
          Every song here reminds me of you — your smile, your laugh, us.
        </p>

        {/* Spotify Embed */}
        <div className="mb-8 w-full max-w-md rounded-lg border border-white">
          <iframe
            src="https://open.spotify.com/embed/playlist/6e7XWGv1HiNKjhzYWrkd2M?utm_source=generator&theme=0"
            width="100%"
            height="152"
            style={{ borderRadius: "12px" }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

      
      </motion.div>

      {/* Decorative stars */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </section>
  );
});

export default SecondScreen;