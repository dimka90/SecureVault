"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiCopyleftFill } from "react-icons/ri";


const Problem = () => {
  return (
    <section className="relative py-14 md:py-64 px-6 sm:px-12 md:px-20 lg:px-32 bg-indigo-100 h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/problem7.jpg" 
            alt="Lost Wallet"
            width={700}
            height={200}
            className="drop-shadow-2xl rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl sm:text-5xl bg-gradient-to-tr from-red-500 via-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6">
            Have you ever worried about losing your wallet assets?
          </h2>

          <p className="md:text-xl text-lg text-gray-600 leading-relaxed mb-6">
            Billions of dollars in crypto assets are lost every year because
            people misplace their seed phrases or pass away without leaving
            recovery options. <span className="font-semibold">One mistake</span>{" "}
            could mean your entire digital fortune is gone forever.
          </p>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3 text-lg">
              <span className="text-indigo-500 text-2xl"><RiCopyleftFill /></span>
              Forgotten or misplaced seed phrases
            </li>
            <li className="flex items-start text-lg gap-3">
              <span className="text-indigo-500 text-2xl"><RiCopyleftFill /></span>
              No trusted recovery contacts in case of emergency
            </li>
            <li className="flex items-start text-lg gap-3">
              <span className="text-indigo-500 text-2xl"><RiCopyleftFill /></span>
              Assets locked forever after death or inactivity
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
