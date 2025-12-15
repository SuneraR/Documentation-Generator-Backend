"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import TextType from "./Text/TextType";
const StarsCanvas = dynamic(() => import("./StarsCanvas"), {
  ssr: false,
  loading: () => null,
});

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Hero() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%,${color})`;

  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeOut",
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror",
    });
  });
  return (
    <motion.section
      id="hero"
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-800 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 text-gray-200 mx-auto"
    >
      <div className="flex flex-col gap-4 sm:gap-6 text-center justify-center items-center max-w-4xl z-10 px-4">
        <p className="text-sm sm:text-base text-gray-300">
          Building Fast & Modern Web Experiences
        </p>
        <h1 className="mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hi, I'm Sunera — a <br />
          <TextType
            text={["MERN Stack Developer.", "Computer Science Student."]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl">
          I focus on crafting clean UIs, efficient backends, and smooth user
          experiences using React, Next.js, Node.js, MongoDB and MySql.
        </p>
        <a href="#contact" className="w-fit">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={{
              border,
              boxShadow,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-gray-50 transition-colors hover:bg-gray-800/50"
          >
            Let's collaborate
          </motion.button>
        </a>
      </div>
      <div className="absolute inset-0 z-0">
        <StarsCanvas />
      </div>
    </motion.section>
  );
}
