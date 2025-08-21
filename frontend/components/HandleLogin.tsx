"use client";
import { useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { FaEnvelope, FaWallet, FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function HandleLogin() {
  const { login, user } = usePrivy();
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
      if (user) {
        const wallet = wallets[0];
        console.log("Wallet Address:", wallet.address);
        console.log("User Email:", user.email?.address);

        await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email?.address,
            walletAddress: wallet.address,
            publicKey:
              "04bfcab1e1f63d92ecab4870c23d37e0d8a0a6b3e6b0ab0e86f1b59c3d2e2b1fbc567f32f7c0f2e726a9c77d1e3f55b0f902c6f4c9c8b1f1a0f02e5a2e37f9b2e3",
            recoveryThreshold: 2,
            inactivityMonths: 1,
          }),
        });

        toast.success("Successfully signed in!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      }
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      console.error("Login error:", error);
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
        <h2 className="text-xl font-bold">Welcome to Secure Vault</h2>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-medium transition-all duration-200 ${
          !isLoading
            ? "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-transparent"></div>
            login in...
          </>
        ) : (
          <>
            <FaEnvelope className="text-lg" />
            Login with Email
            <FaArrowRight className="text-sm" />
          </>
        )}
      </button>
    </div>
  );
}
