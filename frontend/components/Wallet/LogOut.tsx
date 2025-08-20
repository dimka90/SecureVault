"use client";
import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = usePrivy();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/signin"); 
  };

  return (
    <button
      onClick={handleLogout} 
      className="inline-flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 hover:text-red-400 text-xs"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}