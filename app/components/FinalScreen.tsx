"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Gift {
  id: number;
  title: string;
  emoji: string;
  content: string;
  color: string;
  ribbonColor: string;
}

const gifts: Gift[] = [
  {
    id: 1,
    title: "Dinner Date",
    emoji: "🍽️",
    content:
      "I promise to always make you laugh, even on your toughest days. To listen when you need to talk, and to be your biggest cheerleader in everything you do.",
    color: "from-pink-400 to-rose-500",
    ribbonColor: "bg-rose-600",
  },
  {
    id: 2,
    title: "Movie Date",
    emoji: "🎞️",
    content:
      "Let's explore the world together! From cozy coffee shops to grand adventures, every moment with you is a journey I want to take. Here's to all the places we'll go!",
    color: "from-red-400 to-pink-500",
    ribbonColor: "bg-pink-600",
  },
  {
    id: 3,
    title: "Do I have to spell it out",
    emoji: "🌚",
    content:
      "You deserve to be celebrated every single day, not just on special occasions. This is my reminder that you're amazing, beautiful, and loved beyond measure.",
    color: "from-rose-400 to-red-500",
    ribbonColor: "bg-red-600",
  },
  {
    id: 4,
    title: "Tour of Uyo",
    emoji: "🚘",
    content:
      "They say the best things in life are worth waiting for. I'm so glad I found you. Here's to us, to our story, and to all the beautiful chapters yet to come.",
    color: "from-pink-500 to-rose-600",
    ribbonColor: "bg-rose-700",
  },
];

const FinalScreen = forwardRef<HTMLElement>(function FinalScreen(_, ref) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const GiftBox = ({ gift, index }: { gift: Gift; index: number }) => (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.2,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.05,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedGift(gift)}
      className="cursor-pointer"
    >
      {/* Gift Box */}
      <div className="relative">
        {/* Box body */}
        <div
          className={`w-full aspect-square bg-linear-to-br ${gift.color} rounded-2xl shadow-2xl relative overflow-hidden`}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* Vertical Ribbon */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full ${gift.ribbonColor} shadow-md`}
          />

          {/* Horizontal Ribbon */}
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 ${gift.ribbonColor} shadow-md`}
          />

          {/* Bow */}
          <div className="absolute top-25 left-1/2 -translate-x-1/2 z-10">
            <div
              className={`relative w-16 h-16 ${gift.ribbonColor} rounded-full`}
            >
              {/* Bow loops */}
              <div
                className={`absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 ${gift.ribbonColor} rounded-full`}
              />
              <div
                className={`absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 ${gift.ribbonColor} rounded-full`}
              />
              {/* Bow center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>

        </div>

        {/* Gift label */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <p className="text-xl font-bold text-red-600">🤷 It's a surprise</p>
          <p className="text-sm text-gray-600 mt-1">Click to open! 🎁</p>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-pink-100 via-rose-100 to-red-100 overflow-hidden px-6 py-16"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: "120%",
              rotate: Math.random() * 360,
            }}
            animate={{
              y: "-20%",
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            💝
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
            I Have Gifts For You! 🎁
          </h2>
          <p className="text-xl text-gray-700">
            Click on any gift to see what's inside...
          </p>
        </motion.div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {gifts.map((gift, index) => (
            <GiftBox key={gift.id} gift={gift} index={index} />
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl text-red-600 font-bold mb-6">
            So, what do you say? 💕
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's make this Valentine's Day (and every day after) unforgettable
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Say Yes Again! 💖
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 bg-white text-red-500 border-2 border-red-500 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Over 🔄
            </motion.button>
          </div>

          {/* Heart beat */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="mt-12 text-6xl"
          >
            ❤️
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 text-gray-600 italic"
          >
            Made with all my love, just for you 💝
          </motion.p>
        </motion.div>
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {selectedGift && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGift(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedGift(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>

                {/* Gift content */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-7xl mb-4"
                  >
                    {selectedGift.emoji}
                  </motion.div>

                  <h3 className="text-3xl font-bold text-red-600 mb-4">
                    {selectedGift.title}
                  </h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-700 leading-relaxed mb-6"
                  >
                    {selectedGift.content}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGift(null)}
                    className={`px-8 py-3 bg-linear-to-r ${selectedGift.color} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all`}
                  >
                    Close 💕
                  </motion.button>
                </div>

                {/* Confetti effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -20, x: "50%", opacity: 1 }}
                      animate={{
                        y: "100%",
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        opacity: 0,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut",
                      }}
                      className="absolute text-2xl"
                    >
                      {["❤️", "💕", "💖", "🌹", "✨"][i % 5]}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
});

export default FinalScreen;