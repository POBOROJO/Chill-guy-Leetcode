"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedHeader() {
  return (
    <div className="flex flex-col items-center mb-12 relative">
      <div className="flex items-center gap-6 mb-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="https://utfs.io/f/uv0QKkkaMro3gL0ElmtH9EdRViLjtUP6AQTYvDkaClZy2Ipx"
            alt="LeetCode Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </motion.div>
        
        <motion.h1
          className="text-2xl md:text-4xl font-bold tracking-tight text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          LeetCode Chill Guy Analyzer
        </motion.h1>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="https://utfs.io/f/uv0QKkkaMro3WjBRKLLogZ7eJTiwhp5YMc2q4ust61zyEVln"
            alt="Chill Guy"
            width={210}
            height={210}
            className="rounded-full"
          />
        </motion.div>
      </div>

      <motion.p
        className="text-muted-foreground text-center max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Enter your LeetCode username to discover your Chill Guy Score™ and see how
        your problem-solving journey aligns with the zen of coding.
      </motion.p>
    </div>
  );
}