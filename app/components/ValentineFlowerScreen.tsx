"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/FinalScreen.scss";

export default function ValentineFlowerScreen() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.body.classList.remove("not-loaded");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once bloomed, no need to keep observing
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="valentine-wrapper ">
      <div className="section-body min-h-[80dvh] lg:min-h-[130dvh]">
        <div className="night" />

        {/* Valentine Text Overlay */}
        <div className="valentine-text-overlay -top-30 lg:-top-60">
          <motion.div
            className="valentine-text-content"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Main heading */}
            <motion.h1
              className="valentine-heading"
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                type: "spring",
                stiffness: 100,
              }}
            >
              Happy Valentine's Day
            </motion.h1>

            {/* Name */}
            <motion.p
              className="valentine-name"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Seka
            </motion.p>

            {/* Divider */}
            <motion.div
              className="valentine-divider"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Flowers — only mount (and thus animate) once in view */}
        {inView && (
          <div className="flowers">
            {/* Flower 1 */}
            <div className="flower flower--1">
              <div className="flower__leafs flower__leafs--1">
                <div className="flower__leaf flower__leaf--1" />
                <div className="flower__leaf flower__leaf--2" />
                <div className="flower__leaf flower__leaf--3" />
                <div className="flower__leaf flower__leaf--4" />
                <div className="flower__white-circle" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__light flower__light--${i + 1}`}
                  />
                ))}
              </div>
              <div className="flower__line">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Flower 2 */}
            <div className="flower flower--2">
              <div className="flower__leafs flower__leafs--2">
                <div className="flower__leaf flower__leaf--1" />
                <div className="flower__leaf flower__leaf--2" />
                <div className="flower__leaf flower__leaf--3" />
                <div className="flower__leaf flower__leaf--4" />
                <div className="flower__white-circle" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__light flower__light--${i + 1}`}
                  />
                ))}
              </div>
              <div className="flower__line">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Flower 3 */}
            <div className="flower flower--3">
              <div className="flower__leafs flower__leafs--3">
                <div className="flower__leaf flower__leaf--1" />
                <div className="flower__leaf flower__leaf--2" />
                <div className="flower__leaf flower__leaf--3" />
                <div className="flower__leaf flower__leaf--4" />
                <div className="flower__white-circle" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__light flower__light--${i + 1}`}
                  />
                ))}
              </div>
              <div className="flower__line">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Flower long stem */}
            <div className="grow-ans" style={{ ["--d" as any]: "1.2s" }}>
              <div className="flower__g-long">
                <div className="flower__g-long__top" />
                <div className="flower__g-long__bottom" />
              </div>
            </div>

            {/* Growing grass 1 */}
            <div className="growing-grass">
              <div className="flower__grass flower__grass--1">
                <div className="flower__grass--top" />
                <div className="flower__grass--bottom" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
                  />
                ))}
                <div className="flower__grass__overlay" />
              </div>
            </div>

            {/* Growing grass 2 */}
            <div className="growing-grass">
              <div className="flower__grass flower__grass--2">
                <div className="flower__grass--top" />
                <div className="flower__grass--bottom" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
                  />
                ))}
                <div className="flower__grass__overlay" />
              </div>
            </div>

            {/* Flower right side */}
            <div className="grow-ans" style={{ ["--d" as any]: "2.4s" }}>
              <div className="flower__g-right flower__g-right--1">
                <div className="leaf" />
              </div>
            </div>
            <div className="grow-ans" style={{ ["--d" as any]: "2.8s" }}>
              <div className="flower__g-right flower__g-right--2">
                <div className="leaf" />
              </div>
            </div>

            {/* Flower front */}
            <div className="grow-ans" style={{ ["--d" as any]: "2.8s" }}>
              <div className="flower__g-front">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}
                  >
                    <div className="flower__g-front__leaf" />
                  </div>
                ))}
                <div className="flower__g-front__line" />
              </div>
            </div>

            {/* Flower front small */}
            <div className="grow-ans" style={{ ["--d" as any]: "3.2s" }}>
              <div className="flower__g-fr">
                <div className="leaf" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Long-g sections */}
            {[
              [3.5, 2.2, 3.4, 3.6],
              [3.6, 3.8, 4, 4.2],
              [4, 4.2, 4.4, 4.6],
              [4, 4.2, 3, 3.6],
              [4, 4.2, 3, 3.6],
              [4, 4.2, 3, 3.6],
              [4.2, 4.4, 4.6, 4.8],
              [3, 3.2, 3.5, 3.6],
            ].map((delays, sectionIndex) => (
              <div
                key={sectionIndex}
                className={`long-g long-g--${sectionIndex}`}
              >
                {delays.map((d, leafIndex) => (
                  <div
                    key={leafIndex}
                    className="grow-ans"
                    style={{ ["--d" as any]: `${d}s` }}
                  >
                    <div className={`leaf leaf--${leafIndex}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
