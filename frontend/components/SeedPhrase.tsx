"use client";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaCopy, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { decryptData } from "@/lib/encryption"; // adjust import path
import toast from "react-hot-toast";

interface Vault {
  _id: string;
  userId: string;
  secretType: string;
  encryptedSecret: string;
  createdAt: string;
  updatedAt: string;
}

interface SeedPhraseDisplayProps {
  recoveryPin: string;
  walletAddress: string;
}
export default function SeedPhraseDisplay({
  recoveryPin,
  walletAddress,
}: SeedPhraseDisplayProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [encryptedSecret, setEncryptedSecret] = useState<string>("");
  const [decryptedSeed, setDecryptedSeed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEncryptedSeed = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/vaults/wallet/${walletAddress}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch vault data");
        }

        const data: Vault[] = await res.json();

        if (data.length === 0) {
          toast.error("No vault found for this user");
          return;
        }

        setEncryptedSecret(data[0].encryptedSecret);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Unable to fetch encrypted seed phrase");
      } finally {
        setLoading(false);
      }
    };

    fetchEncryptedSeed();
  }, [walletAddress]);

  const toggleVisibility = async (): Promise<void> => {
    if (!isVisible && encryptedSecret) {
      try {
        const plain = await decryptData(encryptedSecret, recoveryPin);
        setDecryptedSeed(plain);
      } catch (err) {
        console.error("Decryption failed:", err);
        setDecryptedSeed("Invalid PIN or corrupted data");
        toast.error("Failed to decrypt seed phrase");
      }
    }
    setIsVisible(!isVisible);
  };

  const copyToClipboard = (): void => {
    if (!decryptedSeed) return;

    navigator.clipboard
      .writeText(decryptedSeed)
      .then(() => {
        setCopied(true);
        toast.success("Seed phrase copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err: Error) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy seed phrase");
      });
  };

  if (loading) {
    return (
      <p className="text-gray-500 p-4 bg-gray-900 rounded-lg border border-gray-700">
        Loading seed phrase...
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-4 rounded-lg border border-gray-700"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-300">Your Seed Phrase</h3>
        <div className="flex space-x-2">
          <button
            onClick={toggleVisibility}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label={isVisible ? "Hide seed phrase" : "Show seed phrase"}
            type="button"
            disabled={!encryptedSecret}
          >
            {isVisible ? (
              <FaEyeSlash className="text-gray-400" />
            ) : (
              <FaEye className="text-gray-400" />
            )}
          </button>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Copy to clipboard"
            type="button"
            disabled={!decryptedSeed}
          >
            {copied ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaCopy className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {isVisible ? (
        <div className="p-3 bg-gray-800 rounded-md">
          <p className="text-white font-mono text-sm leading-relaxed">
            {decryptedSeed}
          </p>
        </div>
      ) : (
        <div className="p-3 bg-gray-800 rounded-md flex items-center justify-center h-16">
          <p className="text-gray-500">
            Click the eye icon to reveal your seed phrase
          </p>
        </div>
      )}

      <p className="text-xs text-red-400 mt-3">
        ⚠️ Warning: Never share your seed phrase with anyone!
      </p>
    </motion.div>
  );
}
