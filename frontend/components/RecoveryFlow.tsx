"use client";
import { useState, FormEvent } from "react";
import { FaEnvelope, FaWallet, FaArrowRight, FaCheck } from "react-icons/fa";
import { useLoginWithEmail } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
import SeedPhraseDisplay from "./SeedPhrase";

type Step = "email" | "code" | "recovery";

export default function RecoveryFlow() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [recoveryKey, setRecoveryKey] = useState<string>("");
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendCode, loginWithCode } = useLoginWithEmail();
  // const router = useRouter();

  const handleSendCode = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendCode({ email });
      toast.success(`Verification code sent to ${email}`);
      setStep("code");
    } catch (err) {
      toast.error("Failed to send verification code. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithCode({ code });
      toast.success("Successfully verified!");
      setStep("recovery");
    } catch (err) {
      toast.error("Invalid verification code. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoveryKeySubmit = (e: FormEvent): void => {
    e.preventDefault();
    // In a real app, this would verify the recovery key and fetch the seed phrase
    setIsLoading(true);
    setTimeout(() => {
      // Simulate API call to get seed phrase
      setSeedPhrase(
        "apple banana cherry dragon elephant flower grape hat ice juice kiwi lemon"
      );
      setIsLoading(false);
      toast.success("Recovery successful!");
    }, 1500);
  };

  const handleBack = (): void => {
    if (step === "code") {
      setStep("email");
      toast("Enter a different email if needed", { icon: "✏️" });
    } else if (step === "recovery") {
      setStep("code");
      setSeedPhrase("");
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
          {step === "email"
            ? "Recovery Process"
            : step === "code"
            ? "Validation"
            : "Recover Seed Phrase"}
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
              Enter your email to start the recovery process
            </p>

            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 outline-none text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  required
                />
              </div>

              <button
                type="submit"
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
                    Verify
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : step === "code" ? (
          <motion.div
            key="code-step"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-6 text-gray-300">
              We sent a 6-digit code to{" "}
              <span className="text-white font-medium">{email}</span>. Please
              enter it below to verify your email.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="123456"
                  className="bg-transparent flex-1 outline-none text-white text-center text-2xl tracking-widest"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  value={code}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
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
                      Validating
                    </>
                  ) : (
                    <>
                      Validate
                      <FaCheck />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="recovery-step"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-6 text-gray-300">
              Enter your recovery key to access your seed phrase
            </p>

            <form onSubmit={handleRecoveryKeySubmit} className="space-y-6">
              <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                <input
                  type="password"
                  placeholder="Recovery Key"
                  className="bg-transparent flex-1 outline-none text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRecoveryKey(e.target.value)
                  }
                  value={recoveryKey}
                  required
                />
              </div>

              {seedPhrase && <SeedPhraseDisplay seedPhrase={seedPhrase} />}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!recoveryKey || isLoading || !!seedPhrase}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                    recoveryKey && !isLoading && !seedPhrase
                      ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Recovering...
                    </>
                  ) : (
                    "Recover Seed Phrase"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
