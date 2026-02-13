"use client";

import { forwardRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "I love your smile", 
  "The texture of your hair", 
  "The way you dress", 
  "How you look at me", 
  "The way you support me", 
  "Your determination", 
  "Your eyes", 
  "Your body 😏", 
  "Your care for me", 
  "How you're obsessed about me", 
  "How time flies when we talk", 
  "How short you are 😂", 
  "Your music taste", 
  "Your vision matches mine", 
  "Our debates", 
  "How smart you are", 
  "Your arts", 
  "Your crazy dreams 😂", 
  "Your story telling", 
  "How much you love me", 
];


const ReasonsScreen = forwardRef<HTMLElement>(function ReasonsScreen(_, ref) {
  const [selectedReason, setSelectedReason] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "shuffle">("grid");

  // Memoize shuffled reasons
  const shuffledReasons = useMemo(() => {
    return [...reasons].sort(() => Math.random() - 0.5);
  }, []);

  const displayReasons = viewMode === "grid" ? reasons : shuffledReasons;

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-20 px-6 overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
            20 Reasons Why I Love You 💖
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            (Though I could list a million more...)
          </p>

        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayReasons.map((reason, index) => (
            <motion.div
              key={`${viewMode}-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.02,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedReason(index)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 h-32 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                {/* Card number */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Heart icon */}
                <motion.div
                  className="text-4xl mb-2"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.1,
                  }}
                >
                  {index % 5 === 0
                    ? "💕"
                    : index % 5 === 1
                      ? "💖"
                      : index % 5 === 2
                        ? "💗"
                        : index % 5 === 3
                          ? "💝"
                          : "💓"}
                </motion.div>

                {/* Click hint */}
                <p className="text-xs text-gray-500 group-hover:text-red-500 transition-colors">
                  Click to read
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl text-red-600 font-bold">
            And you wonder why I love you🌹
          </p>
        </motion.div>
      </div>

      {/* Reason Modal */}
      <AnimatePresence>
        {selectedReason !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReason(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedReason(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>

                {/* Content */}
                <div className="text-center">
                  {/* Number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  >
                    {selectedReason + 1}
                  </motion.div>

                  {/* Heart animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-6xl mb-6"
                  >
                    💕
                  </motion.div>

                  {/* Reason text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl text-gray-800 leading-relaxed mb-8 font-medium"
                  >
                    {displayReasons[selectedReason]}
                  </motion.p>

                  {/* Navigation buttons */}
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReason(
                          selectedReason > 0
                            ? selectedReason - 1
                            : displayReasons.length - 1,
                        );
                      }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                    >
                      ← Previous
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReason(
                          selectedReason < displayReasons.length - 1
                            ? selectedReason + 1
                            : 0,
                        );
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
});

export default ReasonsScreen;
