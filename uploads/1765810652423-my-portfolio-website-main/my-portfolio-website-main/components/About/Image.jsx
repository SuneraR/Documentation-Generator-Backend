'use client';

import Image from "next/image";
import MyImage from "@/images/Me.jpg";
import { motion } from "framer-motion";

export default function MyImageCom() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }} className="w-[300px] h-[300px] rounded-full overflow-hidden">
      <Image  src={MyImage} alt="My Image" className="" />
    </motion.div>
  );
}
