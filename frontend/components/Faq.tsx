"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "Is my seed phrase really safe with you?",
    answer:
      "Yes. We use military-grade encryption and decentralized storage. Your seed phrase never leaves your device unencrypted, and only you or your verified trustee can decrypt it."
  },
  {
    question: "What happens if I lose my email or device?",
    answer:
      "No worries. As long as you still control your registered trustee contacts, recovery is possible. We provide additional identity checks before granting access."
  },
  {
    question: "How does trustee verification work?",
    answer:
      "You pre-select trusted individuals. In case of inactivity, death, or asset transfer, we notify and verify them using multi-step checks before access is granted."
  },
  {
    question: "What if I don't want a trustee?",
    answer:
      "You can still use our solution as a personal recovery vault. The trustee option is for inheritance or emergencies, but it's not mandatory."
  },
  {
    question: "Which blockchains and wallets do you support?",
    answer:
      "We are chain-agnostic and support all major wallets like MetaMask, Coinbase Wallet, and Ledger. Proof of storage and activity is recorded on-chain."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 md:py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="font-bold text-4xl sm:text-5xl  text-indigo-100 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-indigo-100/70 text-lg max-w-2xl mx-auto">
          Everything you need to know about securing, recovering, and
          inheriting your digital assets.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto mt-16 space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-indigo-500/40 rounded-xl overflow-hidden bg-gray-800/30 shadow-lg"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-5 text-left text-indigo-100 hover:text-indigo-400 transition relative"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="text-xl" />
              ) : (
                <FiChevronDown className="text-xl" />
              )}

              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-indigo-500 to-red-500 opacity-50"></span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="px-6 pb-6 text-indigo-100/70"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
