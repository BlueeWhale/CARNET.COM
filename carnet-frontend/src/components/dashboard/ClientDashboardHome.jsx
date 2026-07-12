import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CalendarRange, DollarSign, Sparkles } from 'lucide-react';
import CarMarketGrid from './CarMarketGrid'; // Pehle banaya hua working filter grid

export default function ClientDashboardHome() {
  const [heroIdx, setHeroIdx] = useState(0);

  // Calibrated Ultra-Colorful High-Resolution Performance Cars Array
  const dashboardBanners = [
    {
      url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop", // Neon Orange McLaren
      title: "Hyper-Performance Engine Active",
      tagline: "Experience unrestricted modular control matrices."
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop", // Radiant Porsche 911
      title: "Precision Track Vectors Calibrated",
      tagline: "Optimal tire handshake and telemetry precision online."
    },
    {
      url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop", // Bright Metallic Blue BMW M
      title: "Next-Gen Fleet Logistics Node",
      tagline: "Real-time variable diagnostics active on core server."
    },
    {
      url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop", // Racing Yellow AMG Carbon
      title: "Pure Aerodynamic Dominance",
      tagline: "Calibrated daily under zero-latency network rules."
    }
  ];

  // Engine: Auto-shift the massive colorful banner framework exactly every 10 seconds
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % dashboardBanners.length);
    }, 10000);
    return () => clearInterval(bannerTimer);
  }, [dashboardBanners.length]);

  return (
    <div className="space-y-8">
      
      {/* ================= 10-SECOND AUTO-MOVING BIG CINEMATIC PHOTO BANNER ================= */}
      <div className="w-full h-80 md:h-96 rounded-3xl overflow-hidden relative border border-slate-200 dark:border-white/10 shadow-lg bg-slate-900">
        
        {/* Layer 1: Continuous Picture Stream Pipeline */}
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIdx}
              src={dashboardBanners[heroIdx].url}
              alt="Premium Colorful Fleet Node"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full object-cover object-center filter saturate-[1.2] brightness-[0.75]"
            />
          </AnimatePresence>
          {/* Subtle Dynamic Ambient Lighting Masks to isolate typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />
        </div>

        {/* Layer 2: Typographic Content Overlay Controls */}
        <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end items-start text-left select-none">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-primaryBlue text-white text-[9px] font-bold uppercase tracking-widest rounded-md mb-3 shadow-md"
          >
            <Sparkles size={10} className="animate-spin" />
            <span>Active Instance Node 0{heroIdx + 1}</span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide drop-shadow-md">
            {dashboardBanners[heroIdx].title}
          </h2>
          <p className="text-gray-200 text-xs md:text-sm mt-2 max-w-xl font-medium drop-shadow-sm">
            {dashboardBanners[heroIdx].tagline}
          </p>
        </div>

        {/* Layer 3: Dynamic Bottom Progress Dots indicators */}
        <div className="absolute bottom-6 right-8 z-20 flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          {dashboardBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === heroIdx ? 'w-5 bg-accentCyan' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* ================= RE-ARRANGED PREMIUM METRICS COUNTER TILES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Fleet Bookings Widget Box */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primaryBlue bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <h4 className="text-slate-400 dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Fleet Bookings</h4>
            <p className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-2">06</p>
          </div>
          <div className="p-3 bg-primaryBlue/10 text-primaryBlue dark:text-accentCyan rounded-xl">
            <CalendarRange size={22} />
          </div>
        </div>

        {/* 2. Escrow Hold Transaction Variable */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-accentCyan bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <h4 className="text-slate-400 dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Escrow Hold</h4>
            <p className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-2">$216,100</p>
          </div>
          <div className="p-3 bg-accentCyan/10 text-primaryBlue dark:text-accentCyan rounded-xl">
            <DollarSign size={22} />
          </div>
        </div>

        {/* 3. L1 Cryptographic Token Security State */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-neonGreen bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <h4 className="text-slate-400 dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Token Security</h4>
            <p className="text-3xl font-black font-mono text-emerald-500 mt-2">Active</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <ShieldCheck size={22} />
          </div>
        </div>

      </div>

      {/* ================= 100% OPERATIONAL VEHICLES GRID SYSTEM ================= */}
      <CarMarketGrid />

    </div>
  );
}