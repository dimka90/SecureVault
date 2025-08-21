"use client";
import { useState, FormEvent } from "react";
import {
  FaWallet,
  FaKey,
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
  FaUnlock,
  FaSeedling,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import SeedPhraseDisplay from "./SeedPhrase";

type Step = "vaultId" | "otp" | "recovery" | "seed";

export default function RecoveryFlow() {
  const [trusteeVaultId, setTrusteeVaultId] = useState("");
  const [otp, setOtp] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [step, setStep] = useState<Step>("vaultId");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(""); // Store the actual user ID

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!trusteeVaultId) return toast.error("Enter your Trustee Vault ID");

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/trustee/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trusteeVaultId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification code sent to your email!");
        setStep("otp");
        console.log("Response:", data);
      } else {
        toast.error(data.error || data.message || "Failed to send code");
        console.error("Backend error:", data);
      }
    } catch (err) {
      toast.error("Server error. Check console.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter the verification code");

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/trustee/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trusteeVaultId, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");
        setStep("recovery");
        console.log("OTP Response:", data);
      } else {
        toast.error(data.error || data.message || "Invalid verification code");
        console.error("OTP error:", data);
      }
    } catch (err) {
      toast.error("Server error. Check console.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async () => {
    if (!recoveryKey) return toast.error("Enter your recovery key");

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/trustee/verify-recovery-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trusteeVaultId,
            otp,
            recoveryPassword: recoveryKey,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account recovered successfully!");
        console.log("Recovery Response:", data);

       
        const actualUserId = data.userId || data.user?.id || trusteeVaultId;
        setUserId(actualUserId);

        // Transition to the seed phrase display step
        setStep("seed");
      } else {
        toast.error(data.error || data.message || "Invalid recovery key");
        console.error("Recovery error:", data);
      }
    } catch (err) {
      toast.error("Server error. Check console.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "vaultId":
        return "Start Account Recovery";
      case "otp":
        return "Verify Trustee Code";
      case "recovery":
        return "Enter Recovery Key";
      case "seed":
        return "Your Seed Phrase";
      default:
        return "Account Recovery";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case "vaultId":
        return <FaWallet className="text-indigo-500 text-2xl mr-3" />;
      case "otp":
        return <FaShieldAlt className="text-indigo-500 text-2xl mr-3" />;
      case "recovery":
        return <FaKey className="text-indigo-500 text-2xl mr-3" />;
      case "seed":
        return <FaSeedling className="text-green-500 text-2xl mr-3" />;
      default:
        return <FaWallet className="text-indigo-500 text-2xl mr-3" />;
    }
  };

  const resetFlow = () => {
    setTrusteeVaultId("");
    setOtp("");
    setRecoveryKey("");
    setUserId("");
    setStep("vaultId");
    toast("Starting over - enter your Vault ID");
  };

  return (
    <div className="min-h-screen p-4 text-white">
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

      <div className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white relative">
        <div className="flex items-center mb-6">
          {getStepIcon()}
          <h2 className="text-xl font-bold">{getStepTitle()}</h2>
        </div>

        <AnimatePresence mode="wait">
          {step === "vaultId" && (
            <motion.div
              key="vault-id-step"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-6 text-gray-300">
                Enter your Trustee Vault ID to begin the recovery process. We
                will send a verification code to you.
              </p>

              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                  <FaWallet className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Trustee Vault ID"
                    value={trusteeVaultId}
                    onChange={(e) => setTrusteeVaultId(e.target.value.trim())}
                    className="bg-transparent flex-1 outline-none text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!trusteeVaultId || isLoading}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                    trusteeVaultId && !isLoading
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
                      Send Verification Code
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-6 text-gray-300">
                We sent a verification code to your email. Please enter the code
                below to proceed.
              </p>

              <div className="space-y-4">
                <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="bg-transparent flex-1 outline-none text-white text-center text-2xl tracking-widest"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep("vaultId");
                      toast("Enter a different Vault ID if needed");
                    }}
                    className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length < 6 || isLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                      otp.length >= 6 && !isLoading
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
              </div>
            </motion.div>
          )}

          {step === "recovery" && (
            <motion.div
              key="recovery-step"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-6 text-gray-300">
                Enter your recovery key to unlock your account.
              </p>

              <div className="space-y-4">
                <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
                  <FaKey className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    placeholder="Enter your recovery key"
                    value={recoveryKey}
                    onChange={(e) => setRecoveryKey(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-white"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep("otp");
                      toast("Re-enter the verification code");
                    }}
                    className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleUnlock}
                    disabled={!recoveryKey || isLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                      recoveryKey && !isLoading
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Unlocking...
                      </>
                    ) : (
                      <>
                        Unlock Account
                        <FaUnlock />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "seed" && (
            <motion.div
              key="seed-step"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SeedPhraseDisplay
                recoveryPin={recoveryKey}
                userId={1} ///// hardcoded
              />

              <div className="mt-6 space-y-3">
                <button
                  onClick={resetFlow}
                  className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Start New Recovery
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
