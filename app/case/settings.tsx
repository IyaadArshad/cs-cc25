"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CaseSettings() {
  const [copied, setCopied] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleResetApp = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      return;
    }
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    setResetConfirm(false);
    window.location.reload();
  };

  const handleCopyStats = () => {
    // Get all cookies
    const cookies = document.cookie.split(";");
    const cookieData = cookies
      .map((cookie) => {
        const [name, value] = cookie.split("=").map((part) => part.trim());
        return `${name}: ${value}`;
      })
      .join("\n");

    // Copy to clipboard
    navigator.clipboard
      .writeText(cookieData || "No cookies found")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex-1 p-6 overflow-auto h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 mt-8"
        >
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
            <img
              src="/images/default_pfp.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-4xl mb-4 font-bold"
        >
          Muttasil
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-gray-400 text-sm mb-8"
        >
          Build Version: 1.1.2 | Last Updated: Mar 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full space-y-4 flex flex-col items-center"
        >
          <div className="space-y-4 flex flex-col items-center">
            <Button
              variant="destructive"
              className={`px-6 py-6 text-base rounded-full ${
                resetConfirm
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={handleResetApp}
            >
              {resetConfirm ? "Confirm Reset" : "Reset app usage data"}
            </Button>
            <Button
              variant="outline"
              className="px-6 py-6 text-base rounded-full border-none text-white bg-gray-700 hover:text-white hover:bg-gray-600"
              onClick={handleCopyStats}
            >
              {copied ? <>Copied!</> : <>Copy stats to Clipboard</>}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}