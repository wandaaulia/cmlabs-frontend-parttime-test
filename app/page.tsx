"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListIngredients from "./components/ListIngredients";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      const trigger = setTimeout(() => {
        setShowHero(true);
      }, 0);

      const timer = setTimeout(() => {
        (setShowHero(false), sessionStorage.setItem("hasSeenSplash", "true"));
      }, 3000);

      return () => {
        clearTimeout(trigger);
        clearTimeout(timer);
      };
    }

    const handleRefresh = () => {
      sessionStorage.removeItem("hasSeenSplash");
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, []);

  return (
    <div>
      <AnimatePresence>
        {showHero && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }} // Efek menghilang ke atas
            transition={{ duration: 1 }} // Durasi transisi 1 detik
            className="fixed inset-0 z-[100]" // Menutupi seluruh layar
          >
            {/* Taruh Video Hero Kamu di Sini */}
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <ListIngredients />
    </div>
  );
}
