"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HowTo() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="bg-black overflow-hidden">
      <div 
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-8 px-4 sm:px-8 md:px-16 lg:px-28"
      >
        <motion.div 
          className="border-b sm:border-b-0 sm:border-r border-gray-800 pb-4 sm:pb-0 sm:pr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.h3 
            className="font-semibold text-sm sm:text-base"
            whileHover={{ color: "#818cf8" }}
          >
            Sign In with Your Email
          </motion.h3>
          <motion.p className="text-gray-400 text-xs sm:text-sm">
            Log in instantly using Privy, your wallet is created automatically
            in the background.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="border-b sm:border-b-0 sm:border-r border-gray-800 pb-4 sm:pb-0 sm:pr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.h3 
            className="font-semibold text-sm sm:text-base"
            whileHover={{ color: "#818cf8" }}
          >
            Encrypt & Assign Trustees
          </motion.h3>
          <motion.p className="text-gray-400 text-xs sm:text-sm">
            Enter your secret, we encrypt it on your device, and split the key
            among three trusted contacts.
          </motion.p>
        </motion.div>

        <motion.div 
          className="pb-4 sm:pb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.h3 
            className="font-semibold text-sm sm:text-base"
            whileHover={{ color: "#818cf8" }}
          >
            Store on Blockchain
          </motion.h3>
          <motion.p className="text-gray-400 text-xs sm:text-sm">
            Upload your documents to IPFS, with proof recorded on-chain for
            tamper-proof security.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}