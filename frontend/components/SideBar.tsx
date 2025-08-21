"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  // FaBox,
  // FaShieldAlt,
  // FaClock,
  // FaFile,
  FaKey,
  FaUpload,
  FaHome,
} from "react-icons/fa";
import { BsBank } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: FaHome,
      label: "Dashboard",
    },
    {
      href: "/dashboard/seed-phrase",
      icon: FaKey,
      label: "Seed Phrase",
    },
    {
      href: "/dashboard/bank-details",
      icon: BsBank,
      label: "Bank Details",
    },
    {
      href: "/dashboard/document-upload",
      icon: FaUpload,
      label: "Documents",
    },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col pt-20 pl-16">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
        <p className="text-xs text-gray-500">© 2023 Genwealth</p>
      </div>
    </div>
  );
}