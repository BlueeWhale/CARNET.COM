import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Gauge, ArrowRight } from 'lucide-react';
import Navbar from '../../components/ui/Navbar';

// Standard Relative Asset Handshake Module Import
import tataLogo from '../../assets/logo/tata.png';
import porsheLogo from '../../assets/logo/por.png';
import lamLogo from '../../assets/logo/lanborgini.png';
import bmwLogo from '../../assets/logo/bmw.png';
import audiLogo from '../../assets/logo/audi.png';
import merciLogo from '../../assets/logo/merce.png';
import sizukiLogo from '../../assets/logo/sizuki.png';
import hondaLogo from '../../assets/logo/honda.png';
import hyiLogo from '../../assets/logo/huidyi.png';
import totLogo from '../../assets/logo/tot.png';
import jeepLogo from '../../assets/logo/jeep.png';

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calibrated 6-Node Premium Fleet Images Matrix
  const fleetImages = [
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop", // BMW M Series
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop", // Mercedes AMG
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop", // Mustang Performance
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop", // Audi Sport
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop", // Porsche 911
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop"  // Premium Supercar
  ];

  // Upgraded Reliable Brand Logos Matrix with high-res optimized view nodes
  const brandLogos = [
    { name: 'PORSCHE', img: porsheLogo },
    { name: 'BMW', img: bmwLogo },
    { name: 'MERCEDES', img: merciLogo },
    { name: 'AUDI', img: audiLogo },
    { name: 'TESLA', img: 'https://th.bing.com/th/id/OIP.M5dG7zj31qEB2n-0dICHKQHaHk?w=175&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { name: 'LAMBORGHINI', img: lamLogo },
    { name: 'TATA', img: tataLogo },
    { name: "sizuki", img: sizukiLogo },
    { name: "Honda", img: hondaLogo },
    { name: "Hyndyi", img: hyiLogo },
    { name: "Toyota", img: totLogo },
    { name: "jeep", img: jeepLogo }
  ];

  // Infinite duplicate array tracking window dimensions for perfect loops
  const doubleBrands = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fleetImages.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [fleetImages.length]);

  return (
    <div className="min-h-screen bg-[#071426] text-white relative overflow-hidden">
      {/* Background Matrix Lines Layout Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-10" />
      <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-primaryBlue/10 rounded-full blur-[150px] pointer-events-none z-10" />

      {/* Universal Shared Navbar Node */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-auto">
        <Navbar />
      </div>

      {/* ================= HERO CENTERED MATRIX CANVAS ================= */}
      <section className="relative w-full h-[75vh] md:h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10 bg-black/40">
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={fleetImages[currentIndex]}
              alt="Premium Fleet Active Node"
              initial={{ opacity: 0, scale: 1.04, filter: "brightness(0.12) blur(3px)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(0.32) blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "brightness(0.12) blur(3px)" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/80 via-[#071426]/20 to-[#071426]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/40 via-transparent to-[#071426]/40" />
        </div>

        {/* ================= CENTER STAGE CONTENT OVERLAY ================= */}
        <div className="relative z-20 flex flex-col items-center max-w-5xl px-6 text-center select-none pt-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] backdrop-blur-md border border-white/10 text-gray-400 text-[9px] uppercase font-bold tracking-[0.3em] rounded-full mb-6"
          >

          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          >
            The Autonomous Gateway to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue via-accentCyan to-white text-glow-blue font-extrabold">
              Premium Fleet
            </span> Logistics
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mt-6 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Seamlessly transact, lease, track, and optimize premium automotive units using zero-latency decentralized data matrices. High-performance models are calibrated daily.
          </motion.p>

          
        </div>

        <div className="absolute bottom-8 flex gap-2 z-30 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
          {fleetImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-400 focus:outline-none ${i === currentIndex ? 'w-6 bg-accentCyan' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* ================= LARGE AUTOMOTIVE BRAND LOGO MARQUEE ================= */}
      <section className="w-full bg-[#0b1d35]/10 border-y border-white/[0.06] py-16 overflow-hidden relative z-20 select-none backdrop-blur-sm">
        <div className="absolute left-0 top-0 bottom-0 w-44 bg-gradient-to-r from-[#071426] via-[#071426]/75 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-[#071426] via-[#071426]/75 to-transparent z-30 pointer-events-none" />
        
        <div className="flex w-full items-center">
          <motion.div 
            className="flex gap-10 whitespace-nowrap px-4 items-center"
            animate={{ x: [0, -3200] }} 
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 26, 
                ease: "linear",
              },
            }}
          >
            {doubleBrands.map((brand, index) => {
              return (
                <div 
                  key={index} 
                  className="inline-flex flex-col items-center justify-center p-6 w-60 h-64 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-[32px] shadow-glassGlow hover:bg-white/[0.05] hover:border-primaryBlue/40 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)] hover:-translate-y-2 transition-all duration-300 ease-out group cursor-pointer shrink-0 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accentCyan/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />

                  {/* Bigger Image Container Matrix */}
                  <div className="w-full h-full flex items-center justify-center relative mt-2">
                    <div className="absolute w-24 h-24 rounded-full bg-accentCyan/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {brand.img ? (
                      <img 
                        src={brand.img} 
                        alt={`${brand.name} Asset`} 
                        className="max-w-[200px] max-h-[200px] object-contain opacity-40 brightness-150 contrast-[1.2] group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out z-10 rounded-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= FLOATING MATRIX STATISTICS ================= */}
      <section className="px-6 max-w-7xl mx-auto relative z-10 my-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full pt-12 border-t border-white/5">
          {[
            { metric: "14.8K+", desc: "Verified Fleets" },
            { metric: "0.0ms", desc: "Escrow Lag" },
            { metric: "99.8%", desc: "Telemetry Precision" },
            { metric: "24/7", desc: "AI Node Active" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl text-center">
              <h3 className="text-xl md:text-2xl font-black font-mono text-white tracking-wide">{stat.metric}</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ECOSYSTEM CORE CAPABILITIES FEATURES ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-accentCyan tracking-[0.4em] uppercase font-mono">CORE SYSTEM FUNCTIONS</h2>
          <p className="text-3xl font-black tracking-tight text-white mt-2">ENGINEERED INTEGRITY // UNRIVALED CONTROL</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Cryptographic Escrow", txt: "Every lease token or purchasing invoice is protected via strict ledger handshakes preventing transaction mutations." },
            { icon: Zap, title: "Sub-ms Response Time", txt: "Query vehicle data stacks, structural availability updates, or localized dealer coordinates instantaneously." },
            { icon: Gauge, title: "Telemetry Dashboards", txt: "Monitor real-time odometer variables, tire optimization states, and maintenance pipelines directly." }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/[0.05] hover:border-primaryBlue/30 transition-all group">
                <div className="w-10 h-10 bg-primaryBlue/10 border border-primaryBlue/30 rounded-xl flex items-center justify-center mb-4 text-accentCyan group-hover:bg-primaryBlue group-hover:text-white transition-all">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{feat.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{feat.txt}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}