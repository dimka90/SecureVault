"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Step = () => {
  return (
    <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="py-10 md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 bg-gray-900 min-h-screen">  
        <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }} 
            className="font-bold text-center leading-16 text-4xl sm:text-5xl bg-gradient-to-tr from-red-500 via-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6">From Registration to Recovery <br /> Here's How
        </motion.h2>            
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 mt-20 gap-20 md-gap-0 md:mt-20 items-center">
        
        <div className="flex flex-col items-center justify-center">
            <div className="rounded-full size-36 md:size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-2 md:p-5">
                <div className="bg-gray-900 size-32 md:size-[145px] md:-ml-[6px] md:-mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-3xl md:text-4xl font-[900] bg-gray-900 rounded-full size-14 md:size-16 p-3 relative top-10 -left-6 md:-left-9">1</p>
                    <Image
                    src="/eyestetix-studio-_rqDHdrKIJs-unsplash-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-1 -top-9 relative"
                    />
                </div>
            </div>
            <div className="w-[6] md:w-2 h-8 md:h-10 my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-xl md:text-2xl font-bold">
                    Sign In with Your Email
                </h3>
                <div className="h-3 md:h-5 my-2 mx-16 md:mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="text-indigo-100/70 w-72 md:w-80 md:text-lg text-center">
                    Log in instantly using Privy, your wallet is created automatically in the background.
                </p>
            </div>
            
        </div>

        <div
            className="flex flex-col items-center justify-center">

            <div className="rounded-full size-36 md:size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-2 md:p-5">
                <div className="bg-gray-900 size-32 md:size-[145px] md:-ml-[6px] md:-mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-3xl md:text-4xl font-[900] bg-gray-900 rounded-full size-14 md:size-16 p-3 relative top-10 -left-6 md:-left-9">2</p>
                    <Image
                    src="/block1-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-3 -top-14 relative"
                    />
                </div>
            </div>
            <div className="w-[6] md:w-2 h-8 md:h-10 my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-xl md:text-2xl font-bold">
                    Encrypt & Assign Trustees
                </h3>
                <div className="h-3 md:h-5 my-2 mx-16 md:mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="text-indigo-100/70 w-72 md:w-80 md:text-lg text-center">
                    Enter your secret, we encrypt it on your device, and split the key among three trusted contacts.
                </p>
            </div>
            
        </div>
        <div className="flex flex-col items-center justify-center">

            <div className="rounded-full size-36 md:size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-2 md:p-5">
                <div className="bg-gray-900 size-32 md:size-[145px] md:-ml-[6px] md:-mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-3xl md:text-4xl font-[900] bg-gray-900 rounded-full size-14 md:size-16 p-3 relative top-10 -left-6 md:-left-9">3</p>
                    <Image
                    src="/block-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-1 -top-9 relative"
                    />
                </div>
            </div>
            <div className="w-[6] md:w-2 h-8 md:h-10 my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-xl md:text-2xl font-bold">
                    Store on Blockchain
                </h3>
                <div className="h-3 md:h-5 my-2 mx-16 md:mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="text-indigo-100/70 w-72 md:w-80 md:text-lg text-center">
                    Upload your documents to IPFS, with proof recorded on-chain for tamper-proof security.
                </p>
            </div>
            
        </div>
        </motion.div>
    </motion.section>
  )
}

export default Step
