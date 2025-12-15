"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import github from "@/images/Logos/github.png";

export default function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg overflow-hidden hover:bg-white/15 transition-colors duration-300 w-full sm:max-w-[360px]"
    >
      <div className="relative w-full h-[200px] sm:h-[230px] overflow-hidden group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            className="bg-gray-900/80 backdrop-blur-sm p-2 sm:p-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 border border-white/10"
            aria-label="View source code"
          >
            <div className="relative w-4 h-4 sm:w-5 sm:h-5">
              <Image
                src={github}
                alt="github"
                fill
                className="object-contain invert"
              />
            </div>
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">{name}</h3>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className={`px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
