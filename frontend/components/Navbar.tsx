"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WalletAddress from "./Wallet/WalletAddress";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-5 ${
        scrolled
          ? "bg-gray-900 backdrop-blur-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-[22px] hover:bg-gradient-to-r bg-gradient-to-tr from-red-500 via-indigo-100 to-indigo-400 text-transparent bg-clip-text font-bold hover:text-transparent transition-colors"
          >
            SecureVault
          </Link>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
           <div>
            <Link href='/signup' className="bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-bold hover:bg-indigo-600">Unlock</Link>
           </div>
           <div className="bg-gradient-to-tr rounded-lg p-[1px] from-red-500 via-indigo-100 to-indigo-400">
            <div className="bg-gray-900 px-4 py-1 rounded-md hover:bg-gray-800">
              <Link href='/signin' className=" font-bold text-white rounded-lg text-sm">Sign In</Link>
            </div>
           </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
