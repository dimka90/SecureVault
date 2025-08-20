"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaCopy, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface SeedPhraseDisplayProps {
  seedPhrase: string;
}

export default function SeedPhraseDisplay({
  seedPhrase,
}: SeedPhraseDisplayProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard
      .writeText(seedPhrase)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err: Error) => {
        console.error("Failed to copy: ", err);
      });
  };

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
            {seedPhrase}
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
