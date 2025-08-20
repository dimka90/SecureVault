"use client";
import { useState } from "react";
import {
  FaBox,
  FaShieldAlt,
  FaClock,
  FaFile,
  FaKey,
  FaUpload,
  FaHome,
} from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import SeedPhraseEntry from "@/components/SeedPhraseEntry";
import BankDetailsEntry from "@/components/BankDetailsEntry";
import DocumentUpload from "@/components/Documents/DocumentUpload";
import Nav from "@/components/Nav";

export default function AccountCreationDashboard() {
  const [activeTab, setActiveTab] = useState<
    "seed" | "bank" | "documents" | "dashboard"
  >("dashboard");

  const stats = [
    {
      name: "Documents Stored",
      value: "12",
      icon: FaFile,
      change: "+2",
      changeType: "positive",
    },
    {
      name: "Active Trustees",
      value: "1/1",
      icon: FaShieldAlt,
      change: "0",
      changeType: "neutral",
    },
    {
      name: "Days Until Check-in",
      value: "42",
      icon: FaClock,
      change: "-7",
      changeType: "negative",
    },
    {
      name: "IPFS Storage",
      value: "24.5 MB",
      icon: FaBox,
      change: "+3.2",
      changeType: "positive",
    },
  ];

  return (
    <>
      <Nav />
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col pt-20 pl-16">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("seed")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "seed"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaKey className="text-lg" />
              <span>Seed Phrase</span>
            </button>

            <button
              onClick={() => setActiveTab("bank")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "bank"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <BsBank className="text-lg" />
              <span>Bank Details</span>
            </button>

            <button
              onClick={() => setActiveTab("documents")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "documents"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaUpload className="text-lg" />
              <span>Documents</span>
            </button>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">Version 1.0.0</p>
            <p className="text-xs text-gray-500">© 2023 Genwealth</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "dashboard" ? (
            <>
              <h2 className="text-2xl font-bold mb-8">Account Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          {stat.name}
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full ${
                          stat.changeType === "positive"
                            ? "bg-green-900/30 text-green-400"
                            : stat.changeType === "negative"
                            ? "bg-red-900/30 text-red-400"
                            : "bg-gray-700 text-indigo-400"
                        }`}
                      >
                        <stat.icon className="text-xl" />
                      </div>
                    </div>
                    <div
                      className={`mt-2 text-xs font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-400"
                          : stat.changeType === "negative"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {stat.changeType === "positive"
                        ? "↑"
                        : stat.changeType === "negative"
                        ? "↓"
                        : ""}
                      {stat.change} this month
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FaClock className="text-indigo-400" />
                      Account Activity
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-900/30 text-indigo-400">
                      Active
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Check-in progress</span>
                        <span>42 days remaining</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                      Perform Early Check-in
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-5">
                    <FaShieldAlt className="text-indigo-400" />
                    Recovery Status
                  </h3>

                  <div className="bg-gray-700/30 rounded-lg p-4 mb-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">trustee@example.com</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Primary contact
                        </p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-green-900/30 text-green-400">
                        Verified
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg font-medium transition-colors">
                    Update Trustee Details
                  </button>
                </div>
              </div>
            </>
          ) : activeTab === "seed" ? (
            <SeedPhraseEntry />
          ) : activeTab === "bank" ? (
            <BankDetailsEntry />
          ) : (
            <DocumentUpload />
          )}
        </div>
      </div>
    </>
  );
}
