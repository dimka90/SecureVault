"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Step = () => {
  return (
    <section className="relative md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 bg-gray-900 md:h-screen">
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className=" text-indigo-100 text-center "
            >
            <h2 className="font-bold text-4xl sm:text-5xl bg-gradient-to-tr from-red-500 via-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6">From Registration to Recovery <br /> Here's How</h2>            
        </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 mt-20 gap-20 md-gap-0 md:mt-32 items-center">
        
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center">

            <div className="rounded-full size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-5">
                <div className="bg-gray-900 size-[145px] -ml-[6px] -mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-4xl font-[900] bg-gray-900 rounded-full size-16 p-3 relative top-10 -left-9">1</p>
                    <Image
                    src="/eyestetix-studio-_rqDHdrKIJs-unsplash-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-1 -top-9 relative"
                    />
                </div>
            </div>
            <div className="w-2 h-[40px] my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-2xl font-bold">
                    Sign In with Your Email
                </h3>
                <div className=" h-5 my-2 mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="text-indigo-100/70 w-80 text-lg text-center">
                    Log in instantly using Privy, your wallet is created automatically in the background.
                </p>
            </div>
            
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center">

            <div className="rounded-full size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-5">
                <div className="bg-gray-900 size-[145px] -ml-[6px] -mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-4xl font-[900] bg-gray-900 rounded-full size-16 p-3 relative top-10 -left-9">2</p>
                    <Image
                    src="/block1-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-3 -top-14 relative"
                    />
                </div>
            </div>
            <div className="w-2 h-[40px] my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-2xl font-bold">
                    Encrypt & Assign Trustees
                </h3>
                <div className=" h-5 my-2 mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="text-indigo-100/70 w-80 text-lg text-center">
                    Enter your secret, we encrypt it on your device, and split the key among three trusted contacts.
                </p>
            </div>
            
        </motion.div>
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center">

            <div className="rounded-full size-44 bg-gradient-to-bl from-red-500 via-indigo-400 to-indigo-500 p-5">
                <div className="bg-gray-900 size-[145px] -ml-[6px] -mt-[6px] rounded-full">
                    <p className="text-indigo-100 text-4xl font-[900] bg-gray-900 rounded-full size-16 p-3 relative top-10 -left-7">3</p>
                    <Image
                    src="/block-removebg-preview.png" 
                    alt="Lost Wallet"
                    width={200}
                    height={2}
                    className=" left-1 -top-9 relative"
                    />
                </div>
            </div>
            <div className="w-2 h-[40px] my-4 bg-gradient-to-br from-red-500 via-indigo-500 to-red-500"></div>
            <div>
                <h3 className="text-indigo-100 text-center text-2xl font-bold">
                    Store on Blockchain
                </h3>
                <div className=" h-5 my-2 mx-20 rounded bg-gradient-to-br from-red-400 via-transparent to-transparent"></div>
                <p className="w-80 text-indigo-100/70 text-lg text-center">
                    Upload your documents to IPFS, with proof recorded on-chain for tamper-proof security.
                </p>
            </div>
            
        </motion.div>
        </div>
    </section>
  )
}

export default Step
