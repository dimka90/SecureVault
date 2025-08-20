import React, { useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { Copy, Check, Wallet } from "lucide-react";

export default function WalletAddress() {
  const { wallets, ready } = useWallets();
  const [copied, setCopied] = useState<string | null>(null);

  if (!ready) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
        <span className="text-sm">Loading wallets...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {wallets.length > 0 ? (
        wallets.map((wallet) => {
          const addr = wallet.address;
          const short = `${addr.slice(0, 6)}...${addr.slice(-4)}`;
          const isCopied = copied === addr;

          return (
            <div
              key={addr}
              className="relative flex items-center gap-2 px-3 py-2 bg-inidg0-500 border border-gray-200 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Wallet size={16} className="text-gray-200" />
              <span className="font-mono text-sm text-gray-200">{short}</span>
              <button
                className="inline-flex items-center justify-center w-6 h-6 rounded hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(addr);
                    setCopied(addr);
                    setTimeout(() => setCopied(null), 2000);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }}
                title={isCopied ? "Copied!" : "Copy address"}
              >
                {isCopied ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} className="text-gray-600 hover:text-blue-600" />
                )}
              </button>
              
              {isCopied && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                  <span>Copied!</span>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 text-gray-200 bg-indigo-500 rounded-lg">
          <Wallet size={16} />
          <span className="text-sm">No wallets connected</span>
        </div>
      )}
    </div>
  );
}