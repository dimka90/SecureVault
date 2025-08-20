"use client";
import { useState } from "react";
import { FaWallet, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateWallet } from '@privy-io/react-auth';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 

export default function CreateWalletButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { createWallet } = useCreateWallet();
  const router = useRouter(); 

  const handleClick = async () => {
    setStatus('loading');
    try {
      const wallet = await createWallet();
      setStatus('success');
      toast.success("Wallet created successfully!... Redirecting to account creation page");
      console.log('Wallet created:', wallet);

      // ✅ Redirect after small delay (optional)
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err) {
      setStatus('error');
      toast.error("Failed to create wallet");
      console.error('Wallet creation error:', err);

      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={handleClick}
        disabled={status !== 'idle'}
        className={`w-full relative overflow-hidden py-4 px-6 rounded-xl font-medium transition-all ${
          status === 'idle' 
            ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/30'
            : status === 'loading'
              ? 'bg-indigo-600/80 text-white'
              : status === 'success'
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3"
            >
              <FaWallet className="text-lg" />
              <span>Create New Wallet</span>
            </motion.span>
          )}

          {status === 'loading' && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <FaSpinner className="animate-spin text-lg" />
              <span>Creating Wallet...</span>
            </motion.span>
          )}

          {status === 'success' && (
            <motion.span
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <FaCheckCircle className="text-lg" />
              <span>Wallet Created!</span>
            </motion.span>
          )}

          {status === 'error' && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <FaExclamationTriangle className="text-lg" />
              <span>Creation Failed</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <p className="mt-3 text-center text-sm text-gray-400">
        {status === 'idle' && "Generate a new secure wallet address"}
        {status === 'loading' && "This may take a few seconds..."}
        {status === 'success' && "Your wallet is ready to use!"}
        {status === 'error' && "Please try again"}
      </p>
    </div>
  );
}
