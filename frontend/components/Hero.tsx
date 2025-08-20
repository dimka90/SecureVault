"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <>
    <Navbar />
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-semibold mb-6"
            >
              If life changes, your secrets stay safe
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Assign trusted friends or family as recovery contacts, so your
              assets are safe no matter what happens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="inline-block"
            >
              <Link
                href="/signup"
                className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-8 py-3 rounded-lg block transition-all duration-300 hover:from-indigo-600 hover:to-indigo-400 hover:scale-105 hover:shadow-xl text-sm sm:text-base font-medium"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/coins.png"
                alt="Hero Image"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-shadow duration-300"
              />

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
