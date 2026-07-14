import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Battery, Zap, ShieldCheck, ArrowLeft, RotateCw, Eye, Sparkles, Compass, ChevronLeft, ChevronRight, Calendar, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Wishlist context engine for seamless auto-adding updates
import { useWishlistEngine } from '../../context/WishlistContext';

export default function VehicleDetails() {
  const navigate = useNavigate();
  const { toggleWishlistNode, wishlistItems } = useWishlistEngine();
  
  // View states logic
  const [activeTab, setActiveTab] = useState('EXTERIOR');
  const [extIdx, setExtIdx] = useState(0);
  const [intIdx, setIntIdx] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(180);
  
  // Checkout Processing Modal Flags
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Form Target Parameters States
  const [targetDate, setTargetDate] = useState("2026-07-20");
  const [targetTime, setTargetTime] = useState("12:00");

  const vehicle = {
    id: "mkt_p911_details", // Added structural identifier context binding
    name: "Porsche 911 Turbo S",
    tagline: "The Zenith of Aerodynamic Decentralized Engineering",
    brand: "PORSCHE",
    price: "$216,100",
    buyPrice: 216100, // Added numeric format matching logic rules
    category: "Hyper Performance Core",
    topSpeed: "330 km/h",
    desc: "Engineered without compromise. The 911 Turbo S couples a twin-turbocharged 3.7L flat-six core generating 650 horsepower with zero-latency predictive traction logic matrices. Calibrated with an all-wheel adaptive configuration and active variable track geometries to unlock absolute track dominance.",
    specs: [
      { label: "V-Max Top Speed", val: "330 km/h", icon: Gauge, color: "text-accentCyan" },
      { label: "Core Efficiency Stack", val: "94%", icon: Battery, color: "text-emerald-500" },
      { label: "Raw Power Vector", val: "650 HP", icon: Zap, color: "text-amber-500" }
    ],
    media: {
      exterior: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611245801725-275d820c2427?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop"
      ],
      interior: [
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  };

  const nextImg = (type) => {
    if (type === 'EXTERIOR') setExtIdx((prev) => (prev + 1) % vehicle.media.exterior.length);
    else setIntIdx((prev) => (prev + 1) % vehicle.media.interior.length);
  };

  const prevImg = (type) => {
    if (type === 'EXTERIOR') setExtIdx((prev) => (prev - 1 + vehicle.media.exterior.length) % vehicle.media.exterior.length);
    else setIntIdx((prev) => (prev - 1 + vehicle.media.interior.length) % vehicle.media.interior.length);
  };

  // Automated Action Handshake: Saves tracking fields to Wishlist pipeline context
  const handleFinalCheckoutConfirm = () => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === vehicle.id);
    
    if (!isAlreadyInWishlist) {
      toggleWishlistNode({
        id: vehicle.id,
        name: vehicle.name,
        brand: vehicle.brand,
        img: vehicle.media.exterior[0],
        buyPrice: vehicle.buyPrice,
        topSpeed: vehicle.topSpeed
      });
    }

    setIsCheckoutOpen(false);
    toast.success(`Allocation Locked on ${targetDate} at ${targetTime}! Saved to Wishlist Array.`);
    navigate('/client/wishlist'); // Instantly forward to tracking engine
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 selection:bg-primaryBlue/30 relative">
      
      {/* Upper Navigation Action Bar */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
        <button 
          onClick={() => navigate('/client/buy')}
          className="p-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-primaryBlue dark:text-accentCyan uppercase block">Showroom Terminal</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Inspect Vehicle Configuration</h2>
        </div>
      </div>

      {/* ================= MAIN 2-COLUMN INSPECTION LAYOUT CONTAINER ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: MULTI-IMAGE CAROUSEL & 360 CORE CONTAINER */}
        <div className="xl:col-span-2 space-y-4">
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl bg-slate-900 overflow-hidden relative border border-slate-200 dark:border-white/5 shadow-lg flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {activeTab === 'EXTERIOR' && (
                <motion.div key="ext_wrapper" className="w-full h-full relative">
                  <motion.img 
                    key={`ext_${extIdx}`}
                    src={vehicle.media.exterior[extIdx]} 
                    alt="Exterior View Node" 
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover filter saturate-[1.1]"
                  />
                  <button onClick={() => prevImg('EXTERIOR')} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all z-20">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => nextImg('EXTERIOR')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all z-20">
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white rounded-md z-20">
                    EXTERIOR: {extIdx + 1} / {vehicle.media.exterior.length}
                  </div>
                </motion.div>
              )}

              {activeTab === 'INTERIOR' && (
                <motion.div key="int_wrapper" className="w-full h-full relative">
                  <motion.img 
                    key={`int_${intIdx}`}
                    src={vehicle.media.interior[intIdx]} 
                    alt="Interior View Node" 
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover filter saturate-[1.15]"
                  />
                  <button onClick={() => prevImg('INTERIOR')} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all z-20">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => nextImg('INTERIOR')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all z-20">
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white rounded-md z-20">
                    INTERIOR: {intIdx + 1} / {vehicle.media.interior.length}
                  </div>
                </motion.div>
              )}

              {activeTab === '360_VIEW' && (
                <motion.div key="360_canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative flex items-center justify-center">
                  <img 
                    src={vehicle.media.exterior[0]} 
                    alt="Virtual 360 Node"
                    className="w-full h-full object-cover transition-all duration-100 select-none pointer-events-none"
                    style={{ filter: `hue-rotate(${rotationAngle - 180}deg) saturate(1.2)` }} 
                  />
                  <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/70 border border-white/10 backdrop-blur-md rounded-xl flex items-center gap-2 text-white font-mono text-[9px] font-bold tracking-widest">
                    <Compass size={12} className="text-accentCyan animate-pulse" />
                    <span>ORBIT AZIMUTH: {rotationAngle}°</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-black/60 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl flex flex-col gap-2 z-20">
                    <div className="flex justify-between text-[9px] font-mono font-bold text-gray-400 tracking-wider">
                      <span>DRAG SLIDER TO SWIVEL CAMERA MOTOR</span>
                      <span className="flex items-center gap-1 text-accentCyan"><RotateCw size={10} /> DYNAMIC DATA INDEX</span>
                    </div>
                    <input type="range" min="0" max="360" value={rotationAngle} onChange={(e) => setRotationAngle(Number(e.target.value))} className="w-full accent-primaryBlue h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          {/* Micro Thumbnail Strip */}
          {activeTab !== '360_VIEW' && (
            <div className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin max-w-full justify-start md:justify-center">
              {(activeTab === 'EXTERIOR' ? vehicle.media.exterior : vehicle.media.interior).map((imgUrl, i) => {
                const isSelected = activeTab === 'EXTERIOR' ? i === extIdx : i === intIdx;
                return (
                  <button
                    key={i}
                    onClick={() => activeTab === 'EXTERIOR' ? setExtIdx(i) : setIntIdx(i)}
                    className={`w-16 h-12 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                      isSelected ? 'border-primaryBlue scale-95 shadow-md' : 'border-slate-200 dark:border-white/10 opacity-50 hover:opacity-100 cursor-pointer'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail Node" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab Selection Switches Container */}
          <div className="p-1 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl flex justify-center gap-2 max-w-sm mx-auto">
            {[
              { id: 'EXTERIOR', label: 'Exterior Grid', icon: Eye },
              { id: 'INTERIOR', label: 'Interior Deck', icon: Sparkles },
              { id: '360_VIEW', label: '360° Studio', icon: RotateCw }
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setActiveTab(btn.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === btn.id ? 'bg-primaryBlue text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Icon size={13} />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED SPECIFICATIONS & CHECKOUT SHEET */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="px-2.5 py-1 bg-primaryBlue/10 dark:bg-primaryBlue/20 text-primaryBlue dark:text-accentCyan font-mono text-[9px] font-bold tracking-widest rounded-md uppercase inline-block">
              {vehicle.brand} Core Asset
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{vehicle.name}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{vehicle.tagline}</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl bg-slate-50/50 dark:bg-[#0b1d35]/20 border border-slate-200 dark:border-white/5 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Dossier</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{vehicle.desc}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {vehicle.specs.map((s, idx) => {
              const SpecIcon = s.icon;
              return (
                <div key={idx} className="glass-panel p-3 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 text-center">
                  <SpecIcon size={14} className={`mx-auto ${s.color}`} />
                  <span className="text-[11px] font-bold font-mono text-slate-900 dark:text-white block mt-2">{s.val}</span>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">{s.label.split(" ")[1]}</span>
                </div>
              );
            })}
          </div>

          <div className="glass-panel p-5 rounded-2xl bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-slate-500">Allocation Price:</span>
              <span className="text-2xl font-black font-mono text-primaryBlue dark:text-accentCyan">{vehicle.price}</span>
            </div>
            
            <div className="border-t border-slate-100 dark:border-white/5 pt-3 space-y-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Escrow Processing Fee:</span>
                <span className="text-slate-800 dark:text-white font-bold">$0.00 (Zero-Lag)</span>
              </div>
              <div className="flex justify-between">
                <span>Smart Contract Insurance:</span>
                <span className="text-slate-800 dark:text-white font-bold">Included</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)} // Open modal state hook
              className="w-full py-3 bg-gradient-to-r from-primaryBlue to-accentCyan text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Deploy Escrow Checkout</span>
            </button>
          </div>
        </div>

      </div>

      {/* ================= HIGH-FIDELITY BLUR BACKDROP BLENDING MODAL WINDOW ================= */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Layer Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box Form Surface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#0b1d35] border border-slate-200 dark:border-white/10 w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden text-left p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primaryBlue" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Schedule Checkout Node</h3>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer bg-slate-50 dark:bg-white/5"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Time Fields Selection Pipelines */}
              <div className="space-y-4 text-xs font-medium">
                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar size={13} /> Target Year & Date
                  </label>
                  <input 
                    type="date" 
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 focus:outline-none focus:border-primaryBlue text-slate-950 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock size={13} /> Target Handshake Time
                  </label>
                  <input 
                    type="time" 
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 focus:outline-none focus:border-primaryBlue text-slate-950 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Action Confirm Button */}
              <button
                type="button"
                onClick={handleFinalCheckoutConfirm}
                className="w-full py-2.5 bg-primaryBlue text-white text-xs font-bold rounded-xl transition-all hover:bg-primaryBlue/90 active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <ShieldCheck size={14} />
                <span>Confirm Purchase & Lock Wishlist</span>
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}