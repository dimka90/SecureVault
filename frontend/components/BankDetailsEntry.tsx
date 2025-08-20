"use client";
import { useState } from "react";
import { FaLock, FaCalendarAlt } from "react-icons/fa";
import { BsBank } from "react-icons/bs";

export default function BankDetailsEntry() {
  const [bankDetails, setBankDetails] = useState({
    PIN: "",
    accountName: "",
    recoveryPeriod: "3" // default to 3 months
  });

  const recoveryOptions = [
    { value: "1", label: "1 Month" },
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg bg-gray-800 text-white mt-20">
      <div className="flex items-center mb-6">
        <BsBank className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Enter Bank Details</h2>
      </div>

      <p className="mb-6 text-gray-300">
        Your bank details will be encrypted client-side before storage.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Account Name</label>
          <input
            type="text"
            value={bankDetails.accountName}
            onChange={(e) =>
              setBankDetails({ ...bankDetails, accountName: e.target.value })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Recovery PIN</label>
          <input
            type="password"
            value={bankDetails.PIN}
            onChange={(e) =>
              setBankDetails({ ...bankDetails, PIN: e.target.value })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="••••"
            maxLength={4}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center text-sm font-medium mb-2">
            <FaCalendarAlt className="text-indigo-400 mr-2" />
            Recovery After Inactivity
          </label>
          <div className="grid grid-cols-3 gap-3">
            {recoveryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setBankDetails({...bankDetails, recoveryPeriod: option.value})}
                className={`py-2 rounded-lg border transition-colors ${
                  bankDetails.recoveryPeriod === option.value
                    ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                    : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Trustees will be notified after this period of inactivity
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-400 pt-2">
          <FaLock className="mr-2" />
          <span>End-to-end encrypted</span>
        </div>

        <button
          className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${
            bankDetails.accountName && bankDetails.PIN
              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!bankDetails.accountName || !bankDetails.PIN}
        >
          Encrypt and Continue
        </button>
      </div>
    </div>
  );
}