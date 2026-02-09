"use client";

import { forwardRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "Your beautiful smile that lights up my whole world",
  "The way you blush when I compliment you",
  "How your lips twitch when you're shy 😂",
  "Your hyena cackle",
  "How you're the biggest baby I know",
  "Your beautiful eyes that I could stare into forever",
  "The way you get excited about gossip",
  "How soft and gentle you are",
  "How you hide your face when you're embarrassed",
  "Your kindness to me",
  "The way you fiddle with your fingers when you're nervous",
  "How you always ask 'are you sure?' when I say i'm not upset",
  "The fact you listen to my playlists",
  "The reels you send even though they are alot!",
  "How you cuddle",
  "The way you call me Ekemini",
  "How you're strong even when you don't think you are",
  "How you make the simplest moments feel special",
  "Your thoughtfulness in everything you do",
  "The agbero look in your pictures",
  "Your love for cute things",
  "The way you get protective over the people you love",
  "How beautifully unique you are",
  "Your random bursts of energy out of nowhere including the drama",
  "The way you pronounce certain words 😏",
  "Your love for late night conversations you can't keep",
  "The way you scrunch up when you're concentrating",
  "How you get shy when I stare at you for too long",
  "Your beautiful heart that cares so deeply",
  "How you make me laugh without even trying",
  "Your random cravings for concotion",
  "The way you light up when talking about things you love",
  "How patient you are with me",
  "The way you fidget with your hands when you're thinking",
  "How you always know when something's wrong",
  "Your beautiful soul that makes the world better",
  "How you make even bad days feel bearable",
  "Your random acts of kindness",
  "The way you hum songs without realizing it",
  "How jealous you get over me and still deny it",
  "Your tolerance for my spontaneous nature",
  "The adorable way you get excited about food",
  "How you always smell amazing",
  "Your childish mind that fascinates me",
  "How you make me want to be a better person",
  "Your quirky sense of humor",
  "How you're not afraid to be yourself with me",
  "Your random thoughts at 2am when we talk",
  "The way you play with my fingers",
  "How you make ordinary days extraordinary",
  "Your beautiful presence that calms me down",
  "The adorable way you get competitive",
  "How you always try to make me smile",
  "The way you get passionate about things you care about",
  "How you're the perfect little spoon",
  "Your random facts that you just have to share",
  "How you make me feel like the luckiest person alive",
  "Your beautiful energy that's contagious",
  "The way you get shy when I kiss your forehead",
  "How you make me feel safe and loved",
  "Your random bursts of confidence",
  "The cute way you steal glances at me",
  "How you're perfectly imperfect",
  "How you make my heart skip a beat",
  "How you're my best friend and my love",
  "How you make me believe in us",
  "Your beautiful spirit that shines through everything",
  "The cute way you apologize",
  "How you're the first person I think of every day",
  "Your love for matching outfits (even when I pretend to resist)",
  "The way you make me feel understood",
  "How you make every moment with you memorable",
  "Your beautiful soul that I'm so lucky to know",
  "The cute way you get excited about surprises",
  "How you're my favorite person in the whole world",
  "The way you always find space for me in your heart",
  "How your laughter instantly changes my mood",
  "The way you trust me with your softness",
  "How amazing you are to me",
  "The comfort I feel just being near you",
  "The way you look at me when you think I'm not watching",
  "How you turn simple conversations into something special",
  "The way you make love feel easy and natural",
  "How you bring warmth into every space you're in",
  "The way you feel like home to me",
  "How loving you feels like the best decision I've ever made",
  "The way you get sleepy and clingy",
  "How you always try to fix things even when you’re tired",
  "The sound of your voice when you first wake up",
  "How you make silence feel comfortable",
  "The way you laugh at my jokes even when they’re bad",
  "How you remember details I didn’t think mattered",
  "The way you lean into me without thinking",
  "How you make love feel gentle and safe",
  "The way your mood changes when you see me",
  "How you calm me down without saying a word",
  "The way you show love in your own quiet ways",
  "How being with you feels like peace",
  "The way you choose me, again and again",
  "And simply because you're YOU, and that's more than enough 💕",
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
            100 Reasons Why I Love You 💖
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
            Each reason is just a glimpse of why you're so special to me 🌹
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
