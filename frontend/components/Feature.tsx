"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { MdSecurity } from "react-icons/md";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import { GrFingerPrint } from "react-icons/gr";



const Feature = () => {
  return (
    <section className=" flex items-center justify-center ">
      <div className="relative text-indigo-100 py-8 md:py-24 w-full bg-gray-900/40 md:h-screen min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className=" text-indigo-100 text-center "
          >
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-semibold mb-4'>Why trust us with your keys</h2>
          <p className='text-xl text-indigo-100/70 mx-7 md:mx-0'>Secure your seed phrase today and ensure that neither accidents, <br className='hidden md:block' /> inactivity, nor time itself can take your assets away.</p>
        </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
              <div className='md:w-full mx-12 md:mx-0 mt-20 text-indigo-100 rounded-lg p-10 hover:p-9 bg-transparent border-t border-r shadow-sm shadow-indigo-900 border-indigo-500'>
                <h2 className='text-indigo-500 text-3xl md:text-7xl mb-6 md:mb-6'><MdSecurity /></h2>
                <h3 className='text-xl font-bold md:text-2xl mb-4'>Military-Grade Security</h3>
                <p>Your seed phrase is encrypted with cutting-edge technology, ensuring only you or your verified trustee can access it.</p>
              </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className='md:w-full mx-12 md:mx-0 mt-20 text-indigo-100 rounded-lg p-10 hover:p-9 bg-transparent border-t border-r shadow-sm shadow-indigo-900 border-indigo-500'>
                <h2 className='text-indigo-500 text-3xl md:text-7xl mb-6 md:mb-6'><GrFingerPrint /></h2>
                <h3 className='text-xl font-bold md:text-2xl mb-4'>Inactivity Protection</h3>
                <p>If you're gone too long, our system detects inactivity and securely alerts your chosen trustee—so your assets never vanish into limbo.</p>
              </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
              <div className='md:w-full mx-12 mt-20 md:mt-0 md:mx-0 text-indigo-100 rounded-lg p-10 hover:p-9 bg-transparent border-t border-r shadow-sm shadow-indigo-900 border-indigo-500'>
                <h2 className='text-indigo-500 text-3xl md:text-7xl mb-6 md:mb-6'><MdOutlineFamilyRestroom /></h2>
                <h3 className='text-xl font-bold md:text-2xl mb-4'>Trustee Access You Control</h3>
                <p>Set up trusted family, friends, or partners who can inherit or recover your assets when you're unable to.</p>
              </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className='md:w-full mx-12 md:mx-0 mt-20 md:mt-0 text-indigo-100 rounded-lg p-10 hover:p-9 bg-transparent border-t border-r shadow-sm shadow-indigo-900 border-indigo-500'>
                <h2 className='text-indigo-500 text-3xl md:text-7xl mb-6 md:mb-6'><RiCoinsFill /></h2>
                <h3 className='text-xl font-bold md:text-2xl mb-4'>Future-Proofed for Web3</h3>
                <p>Whether you're investing, trading, or building, your crypto legacy is protected against the unexpected.</p>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Feature
