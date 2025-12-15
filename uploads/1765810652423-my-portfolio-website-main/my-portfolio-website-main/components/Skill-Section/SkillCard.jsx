"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SkillCard({ name, image, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="w-[100px] h-[100px] p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
    >
      <div className="relative w-full h-full">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
    </motion.div>
  );
}
