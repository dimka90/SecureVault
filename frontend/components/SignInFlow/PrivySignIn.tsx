"use client";
import { useState } from "react";
import { FaEnvelope, FaWallet, FaArrowRight, FaCheck } from "react-icons/fa";
import { useLoginWithEmail } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import CreateWalletButton from "../Wallet/CreateWalletButton";

export default function PrivySignIn() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { sendCode, loginWithCode } = useLoginWithEmail();

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      await sendCode({ email });
      toast.success(`Verification code sent to ${email}`);
      setStep("code");
    } catch (err) {
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      await loginWithCode({ code });
      toast.success("Successfully signed in!");
    } catch (err) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1F2937",
            color: "#FFFFFF",
            border: "1px solid #374151",
          },
        }}
      />
      
      <div className="flex items-center mb-6">
        <FaWallet className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">
          {step === "email" ? "Sign In with Privy" : "Verify Your Email"}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" ? (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-6 text-gray-300">
              Enter your email to sign in. Privy will create a wallet for you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 outline-none text-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <button
                onClick={handleSendCode}
                disabled={!email.includes("@") || isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                  email.includes("@") && !isLoading
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending Code...
                  </>
                ) : (
                  <>
                    Continue with Email
                    <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="code-step"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-6 text-gray-300">
              We sent a 6-digit code to <span className="text-white font-medium">{email}</span>.
              Please enter it below to verify your email.
            </p>

            <div className="space-y-4">
              <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                <input
                  type="text"
                  placeholder="123456"
                  className="bg-transparent flex-1 outline-none text-white text-center text-2xl tracking-widest"
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  value={code}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep("email");
                    toast("Enter a different email if needed", {
                      icon: "✏️",
                    });
                  }}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={code.length < 6 || isLoading}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                    code.length >= 6 && !isLoading
                      ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <FaCheck />
                    </>
                  )}
                </button>
           
              </div>
                   <CreateWalletButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}