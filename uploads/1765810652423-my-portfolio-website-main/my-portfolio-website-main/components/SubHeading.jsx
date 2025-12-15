'use client';

import { motion } from "framer-motion";

export default function SubHeading({ text }) {
    return(<motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.6,
              ease: "easeIn",
            }}
            className="text-sm sm:text-base text-gray-300"
          >
            {text}
          </motion.p>)
}