"use client";
import { useState } from "react";
// import ProgressStepper from "@/components/ProgressStepper";
import SeedPhraseEntry from "@/components/SeedPhraseEntry";
import BankDetailsEntry from "@/components/BankDetailsEntry";
// import { Step } from "@/types/steps";
import DocumentUpload from "@/components/Documents/DocumentUpload";

export default function AccountCreation() {
  const [activeTab, setActiveTab] = useState<"seed" | "bank" | "documents">(
    "seed"
  );

  // const steps: Step[] = [
  //   { id: "01", name: "Sign In", status: "current" },
  //   { id: "02", name: "Account Setup", status: "upcoming" },
  //   { id: "03", name: "Trustees", status: "upcoming" },
  //   { id: "04", name: "Documents", status: "upcoming" },
  // ];

  return (
    <div className="min-h-screen mt-20 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          {/* <ProgressStepper steps={steps} /> */}
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab("seed")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "seed"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Seed Phrase
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "bank"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Bank Details
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "documents"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Documents
            </button>
          </div>
        </div>

        {activeTab === "seed" ? (
          <SeedPhraseEntry />
        ) : activeTab === "bank" ? (
          <BankDetailsEntry />
        ) : (
          <DocumentUpload />
        )}
      </div>
    </div>
  );
}
