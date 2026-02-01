"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FirstScreen from "./FirstScreen";

interface PreloaderProps {
  onYesClick: () => void;
}

export default function Preloader({ onYesClick }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  // Preloader duration (can match your animation length)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 4s animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-pink-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Your loader SVG & box */}
            <div className="loader relative">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <mask id="clipping">
                    <polygon points="0,0 100,0 100,100 0,100" fill="black" />
                    <polygon points="25,25 75,25 50,75" fill="white" />
                    <polygon points="50,25 75,75 25,75" fill="white" />
                    <polygon points="35,35 65,35 50,65" fill="white" />
                    <polygon points="35,35 65,35 50,65" fill="white" />
                    <polygon points="35,35 65,35 50,65" fill="white" />
                    <polygon points="35,35 65,35 50,65" fill="white" />
                  </mask>
                </defs>
              </svg>
              <div className="box"></div>
            </div>

            {/* Spotify embed */}
            {!musicStarted && (
              <div className="mt-6 flex flex-col items-center">
                <p className="mb-2 font-semibold text-red-500">
                  Click to start the Valentine playlist 🎶
                </p>
                <button
                  onClick={() => setMusicStarted(true)}
                  className="px-6 py-3 bg-red-400 text-white rounded-full font-bold shadow-lg"
                >
                  Play Music
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main First Screen */}
      {(!loading || musicStarted) && <FirstScreen onYesClick={onYesClick} />}

      {/* Music iframe (hidden until user clicks Play) */}
      {musicStarted && (
        <iframe
          src="https://open.spotify.com/embed/playlist/6e7XWGv1HiNKjhzYWrkd2M?utm_source=generator"
          width="0"
          height="0"
          allow="autoplay; encrypted-media"
          style={{ display: "none" }}
        ></iframe>
      )}
    </>
  );
}
