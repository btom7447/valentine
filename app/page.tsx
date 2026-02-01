"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600">
          Hey You ❤️
        </h1>

        <p className="mt-4 text-lg text-pink-400">
          I made something special for you…
        </p>
      </motion.div>
    </main>
  );
};