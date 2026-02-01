"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FirstScreen from "./components/FirstScreen";
import SecondScreen from "./components/SecondScreen";
import MessageScreen from "./components/MessageScreen";
import MemoryScreen from "./components/MemoryScreen";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const secondScreenRef = useRef<HTMLElement | null>(null);
  const messageScreenRef = useRef<HTMLElement | null>(null);
  const memoryScreenRef = useRef<HTMLElement | null>(null);

  const handleYesClick = () => {
    if (!secondScreenRef.current) return;

    gsap.to(window, {
      scrollTo: secondScreenRef.current,
      duration: 1.6,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="overflow-x-hidden">
      <FirstScreen onYesClick={handleYesClick} />
      <SecondScreen ref={secondScreenRef} />
      <MessageScreen ref={messageScreenRef} />
      <MemoryScreen ref={memoryScreenRef} />
    </div>
  );
}
