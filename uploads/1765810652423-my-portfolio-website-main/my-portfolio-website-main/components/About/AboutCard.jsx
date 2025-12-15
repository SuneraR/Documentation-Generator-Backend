"use client";
import { motion } from "framer-motion";
export default function AboutCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="about"
      className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
    >
      <div className="flex-1 text-center md:text-left space-y-4">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
          Who I Am
        </span>
        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          I’m Sunera, a Computer Science student and MERN stack developer
          passionate about building modern, functional, and user-friendly web
          applications. I specialize in React, NextJS, Node.js, Express, Mysql and
          MongoDB, and I enjoy turning ideas into real full-stack projects. I’m
          currently learning Next.js and exploring AI tools to improve my
          development skills.
        </p>
        <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
          <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
            MERN Stack Developer
          </span>
          <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
            CS Student
          </span>
          <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
            10+ Projects
          </span>
          <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
            Learning AI
          </span>
        </div>

        {/* <a
          href="/resume.pdf" // replace with your resume link
          className="inline-block mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition"
        >
          View Resume
        </a> */}
      </div>
    </motion.section>
  );
}
