"use client";
import { motion } from "framer-motion";


export default function Heading({ text }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        ease: "easeIn",
      }}
      className="font-bold text-3xl text-white sm:text-2xl lg:text-4xl"
    >
      {text}
    </motion.h1>
  );
}
