"use client";

import { useEffect, useRef, forwardRef } from "react";
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
You’re my favorite thought, my safe place, my joy.
I just wanted to say… I really like you. 🌹`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      // Prepare typewriter text, keeping spaces
      const lines = messageText.split("\n");
      textRef.current.innerHTML = lines
        .map((line) => {
          if (line.trim() === "") return "<br/>";
          return Array.from(line)
            .map((char) =>
              char === " "
                ? `<span class="char opacity-0 inline-block">&nbsp;</span>`
                : `<span class="char opacity-0 inline-block">${char}</span>`,
            )
            .join("");
        })
        .join("<br/>");

      const chars = textRef.current.querySelectorAll(".char");
      if (!chars.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: envelopeRef.current,
          start: "top 70%",
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
        // Letter settles above envelope
        .to(letterRef.current, {
          y: -10,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.5,
        })
        // Typewriter animation
        .to(
          chars,
          { opacity: 1, y: 0, duration: 0.05, stagger: 0.03, ease: "none" },
          "-=0.5",
        )
        // Close flap
        .to(flapRef.current, {
          rotateX: 0,
          duration: 0.8,
          ease: "power2.inOut",
        })
        // Floating animation after typing
        .call(() => {
          gsap.to(letterRef.current, {
            y: "-=10",
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400 overflow-hidden px-4"
    >
      {/* Envelope */}
      <div
        className="relative w-[520px] h-96"
        ref={envelopeRef}
        style={{ perspective: 1200 }}
      >
        <div className="absolute w-full h-full bg-gray-100 rounded-lg shadow-2xl overflow-hidden">
          <div
            ref={flapRef}
            className="absolute top-0 w-full h-1/2 bg-gray-200 origin-top transform"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
          />
        </div>
      </div>

      {/* Letter */}
      <div
        ref={letterRef}
        className="absolute w-[500px] h-[360px] bg-red-100 rounded-lg p-6 shadow-lg opacity-0 z-20"
        style={{ bottom: "calc(50% - 180px)" }}
      >
        <p
          ref={textRef}
          className="text-gray-900 font-[Gloria Hallelujah] text-base md:text-lg leading-relaxed whitespace-pre-wrap"
        />
      </div>
    </section>
  );
});

export default MessageScreen;