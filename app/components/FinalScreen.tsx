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
      "A dinner reservation for you and me — just us, good food, and uninterrupted time together.",
    color: "from-pink-400 to-rose-500",
    ribbonColor: "bg-rose-600",
  },
  {
    id: 2,
    title: "Movie Date",
    emoji: "🎞️",
    content:
      "A movie ticket for a film of your choice, plus my full attention (even if I pretend to watch).",
    color: "from-red-400 to-pink-500",
    ribbonColor: "bg-pink-600",
  },
  {
    id: 3,
    title: "Do I have to spell it out",
    emoji: "🌚",
    content:
      "Let's just say… the lights will be low, and there won't be much talking. I'll let your imagination do the rest 😏",
    color: "from-rose-400 to-red-500",
    ribbonColor: "bg-red-600",
  },
  {
    id: 4,
    title: "Tour of Uyo",
    emoji: "🚘",
    content:
      "A full tour of Uyo with me driving and you riding shotgun — stops, laughs, and memories included.",
    color: "from-pink-500 to-rose-600",
    ribbonColor: "bg-rose-700",
  },
];

const FinalScreen = forwardRef<HTMLElement>(function FinalScreen(_, ref) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Optional: Add a small delay then reload to reset everything
    setTimeout(() => window.location.reload(), 100);
  };

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
          className={`w-full aspect-square bg-gradient-to-br ${gift.color} rounded-2xl shadow-2xl relative overflow-hidden`}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 overflow-hidden px-6 py-16"
    >
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
            What's valentine without some gifts 😁
          </h2>
          {/* <p className="text-xl text-gray-700">
            Click on any gift to see what's inside...
          </p> */}
        </motion.div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {gifts.map((gift, index) => (
            <GiftBox key={gift.id} gift={gift} index={index} />
          ))}
        </div>

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
                    className={`px-8 py-3 bg-gradient-to-r ${selectedGift.color} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all`}
                  >
                    Close 💕
                  </motion.button>
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