"use client";

import { useEffect, useRef, forwardRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MessageScreen = forwardRef<HTMLElement>(function MessageScreen(_, ref) {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const messageText = `Ima,

I love the way your smile brightens my day.
Even your little quirks make me fall for you more.
I love laughing with you, talking with you, just being with you.
Every moment with you feels like my favorite song.
I hope this letter makes you smile, just like you make me smile every day. 💖
You're my favorite thought, my safe place, my joy.
I just wanted to say… I really love you. 🌹`;

  const setupAnimation = useCallback(() => {
    if (!textRef.current) return;

    // Split by line first, then by WORD — not character
    // Each word becomes one span so it never breaks mid-word
    const lines = messageText.split("\n");
    textRef.current.innerHTML = lines
      .map((line) => {
        if (line.trim() === "") return `<span class="block h-4"></span>`;
        const words = line.split(" ");
        return `<span class="block">${words
          .map(
            (word) =>
              `<span class="word opacity-0 inline-block mr-[0.3em]">${word}</span>`,
          )
          .join("")}</span>`;
      })
      .join("");

    const words = textRef.current.querySelectorAll(".word");
    if (!words.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: envelopeRef.current,
        start: "top 70%",
        once: true,
      },
    });

    tl.from(envelopeRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        envelopeRef.current,
        {
          y: "-=10",
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "-=0.5",
      )
      .to(flapRef.current, {
        rotateX: -180,
        transformOrigin: "top center",
        duration: 1,
        ease: "power2.inOut",
      })
      .fromTo(
        letterRef.current,
        { y: 0, opacity: 0 },
        { y: -180, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.5",
      )
      .to(letterRef.current, {
        y: -10,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5,
      })
      // Animate word by word — smooth and readable
      .to(
        words,
        {
          opacity: 1,
          duration: 0.01,
          stagger: 0.08, // slight pause between words
          ease: "none",
        },
        "-=0.5",
      )
      .to(flapRef.current, {
        rotateX: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .call(() => {
        gsap.to(letterRef.current, {
          y: "-=10",
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
  }, [messageText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setupAnimation();
    });

    return () => ctx.revert();
  }, [setupAnimation]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400 overflow-hidden px-5"
    >
      {/* Envelope */}
      <div
        className="relative w-full max-w-[380px] h-80"
        ref={envelopeRef}
        style={{ perspective: 1200 }}
      >
        <div className="absolute w-full h-full bg-gray-100 rounded-lg shadow-2xl overflow-hidden">
          <div
            ref={flapRef}
            className="absolute top-0 w-full h-1/2 bg-gray-200 origin-top transform"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
          />

          {/* Envelope seal */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-400 rounded-full opacity-30 flex items-center justify-center">
            <span className="text-white text-2xl">💕</span>
          </div>
        </div>
      </div>

      {/* Letter */}
      <div
        ref={letterRef}
        className="absolute mx-10 w-full max-w-[360px]  min-h-[300px] max-h-[1200px] bg-red-100 rounded-lg p-6 shadow-2xl opacity-0 z-20 border-2 border-red-200"
        style={{ bottom: "calc(50% - 180px)" }}
      >
        <p
          ref={textRef}
          className="text-gray-900 font-[Gloria_Hallelujah] text-base md:text-lg leading-relaxed"
        />
      </div>
    </section>
  );
});

export default MessageScreen;