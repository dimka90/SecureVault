"use client";
import { useState, useCallback } from "react";
import { FaUpload, FaFile, FaSpinner, FaCalendarAlt } from "react-icons/fa";
import DocumentList from "./DocumentList";

export default function DocumentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pin, setPin] = useState("");
  const [trusteeEmail, setTrusteeEmail] = useState("");
  const [recoveryPeriod, setRecoveryPeriod] = useState("3"); // Default to 3 months

  const recoveryOptions = [
    { value: "1", label: "1 Month" },
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" },
  ];

  const handleUpload = useCallback(async () => {
    if (!uploadedFile || !pin || !trusteeEmail) return;

    setIsUploading(true);
    // Simulate IPFS upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    // Here you would call your IPFS upload function with all the data
    console.log({
      file: uploadedFile,
      pin,
      trusteeEmail,
      recoveryPeriod,
    });
  }, [uploadedFile, pin, trusteeEmail, recoveryPeriod]);

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg bg-gray-800 text-white mt-20">
      <div className="flex items-center mb-6">
        <FaUpload className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Upload Document</h2>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          uploadedFile
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-gray-600 hover:border-gray-500"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])}
        />

        {uploadedFile ? (
          <div className="flex items-center justify-center">
            <FaFile className="text-indigo-500 text-3xl mr-3" />
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-gray-400">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        ) : (
          <>
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-300">
              Click to select a file or drag and drop
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Files will be encrypted and stored on IPFS
            </p>
          </>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Recovery PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="••••"
            maxLength={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address of Trustee
          </label>
          <input
            type="email"
            value={trusteeEmail}
            onChange={(e) => setTrusteeEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="trustee@example.com"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <FaCalendarAlt className="text-indigo-400 mr-2" />
            Recovery After Inactivity
          </label>
          <div className="grid grid-cols-3 gap-3">
            {recoveryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRecoveryPeriod(option.value)}
                className={`py-2 rounded-lg border transition-colors ${
                  recoveryPeriod === option.value
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
      </div>

      <button
        onClick={handleUpload}
        disabled={!uploadedFile || isUploading || !pin || !trusteeEmail}
        className={`w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center ${
          uploadedFile && !isUploading && pin && trusteeEmail
            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isUploading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Uploading to IPFS...
          </>
        ) : (
          "Upload and Store CID"
        )}
      </button>
      <DocumentList />
    </div>
  );
}
