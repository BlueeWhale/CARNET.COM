import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Battery, Zap, Calendar, ArrowLeft, RotateCw, Eye, Sparkles, Compass, ChevronLeft, ChevronRight, Key, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useRentalEngine } from '../../context/RentalContext';

export default function RentalDetails() {
  const navigate = useNavigate();
  const { addRentalContract } = useRentalEngine();
  
  const [activeTab, setActiveTab] = useState('EXTERIOR');
  const [extIdx, setExtIdx] = useState(0);
  const [intIdx, setIntIdx] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(180);

  // --- NEW ADVANCED SCHEDULER MATRIX STATES ---
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 3);
    return next.toISOString().split('T')[0];
  });
  const [rentalDays, setRentalDays] = useState(3);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"];

  // Real-time automatic dynamic date distance computation layer
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      setRentalDays(diffDays);
    } else {
      setRentalDays(1);
      // Fail-safe logic node: Reset end date to start date + 1 if timeline crashes
      const next = new Date(startDate);
      next.setDate(next.getDate() + 1);
      setEndDate(next.toISOString().split('T')[0]);
    }
  }, [startDate, endDate]);

  const vehicle = {
    name: "Porsche 911 Turbo S",
    tagline: "Track-Ready Dynamic Fleet Allocation // Active Lease",
    brand: "PORSCHE",
    baseRentPerDay: 850,
    securityDeposit: 2500,
    category: "Hyper Performance Core",
    desc: "Experience unrestricted luxury on demand. Our rental core offers the Porsche 911 Turbo S fully detailed and calibrated for zero-latency urban touring or track sprints. Includes premium autonomous insurance waivers, predictive traction algorithms, and full battery/fuel cell top-off upon allocation.",
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

  const totalRentCost = vehicle.baseRentPerDay * rentalDays;
  const grandTotalCost = totalRentCost + vehicle.securityDeposit;

  const handleRentalCheckout = () => {
    // Custom context state integration payload bundle mapping
    const structuredVehicle = {
      ...vehicle,
      startDate,
      startTime: selectedTime,
      endDate
    };
    addRentalContract(structuredVehicle, rentalDays);
    
    toast.success(`Rental core locked for ${rentalDays} days! Processing dynamic smart lease...`);
    navigate('/client/rentals');
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 selection:bg-primaryBlue/30 animate-fade-in">
      
      {/* Top Action Backbar */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
        <button 
          onClick={() => navigate('/client/buy')}
          className="p-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-primaryBlue dark:text-accentCyan uppercase block">Lease Center</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Book Rental Core</h2>
        </div>
      </div>

      {/* ================= MAIN TWO COLUMN GRID VIEWPORT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COMPONENT CANVAS */}
        <div className="xl:col-span-2 space-y-4">
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl bg-slate-900 overflow-hidden relative border border-slate-200 dark:border-white/5 shadow-lg flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeTab === 'EXTERIOR' && (
                <motion.div key="ext_wrap" className="w-full h-full relative">
                  <motion.img key={`ext_${extIdx}`} src={vehicle.media.exterior[extIdx]} alt="Exterior Fleet Node" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full object-cover filter saturate-[1.1]" />
                  <button onClick={() => prevImg('EXTERIOR')} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 z-20"><ChevronLeft size={18} /></button>
                  <button onClick={() => nextImg('EXTERIOR')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 z-20"><ChevronRight size={18} /></button>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white rounded-md z-20">EXTERIOR: {extIdx + 1} / {vehicle.media.exterior.length}</div>
                </motion.div>
              )}

              {activeTab === 'INTERIOR' && (
                <motion.div key="int_wrap" className="w-full h-full relative">
                  <motion.img key={`int_${intIdx}`} src={vehicle.media.interior[intIdx]} alt="Interior Trim Node" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full object-cover filter saturate-[1.15]" />
                  <button onClick={() => prevImg('INTERIOR')} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 z-20"><ChevronLeft size={18} /></button>
                  <button onClick={() => nextImg('INTERIOR')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 z-20"><ChevronRight size={18} /></button>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white rounded-md z-20">INTERIOR: {intIdx + 1} / {vehicle.media.interior.length}</div>
                </motion.div>
              )}

              {activeTab === '360_VIEW' && (
                <motion.div key="360_canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative flex items-center justify-center">
                  <img src={vehicle.media.exterior[0]} alt="360 View" className="w-full h-full object-cover select-none pointer-events-none" style={{ filter: `hue-rotate(${rotationAngle - 180}deg) saturate(1.2)` }} />
                  <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/70 border border-white/10 backdrop-blur-md rounded-xl flex items-center gap-2 text-white font-mono text-[9px] font-bold tracking-widest"><Compass size={12} className="text-accentCyan animate-pulse" /><span>ORBIT DEGREE: {rotationAngle}°</span></div>
                  <div className="absolute bottom-6 left-6 right-6 bg-black/60 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl flex flex-col gap-2 z-20">
                    <div className="flex justify-between text-[9px] font-mono font-bold text-gray-400 tracking-wider"><span>DRAG SLIDER TO CONTROL GEOMETRY SPIN</span><span className="flex items-center gap-1 text-accentCyan"><RotateCw size={10} /> STUDIO ACTIVE</span></div>
                    <input type="range" min="0" max="360" value={rotationAngle} onChange={(e) => setRotationAngle(Number(e.target.value))} className="w-full accent-primaryBlue h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Thumbnail Strip */}
          {activeTab !== '360_VIEW' && (
            <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none justify-start md:justify-center">
              {(activeTab === 'EXTERIOR' ? vehicle.media.exterior : vehicle.media.interior).map((url, i) => {
                const isSelected = activeTab === 'EXTERIOR' ? i === extIdx : i === intIdx;
                return (
                  <button key={i} onClick={() => activeTab === 'EXTERIOR' ? setExtIdx(i) : setIntIdx(i)} className={`w-16 h-12 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${isSelected ? 'border-primaryBlue scale-95 shadow-sm' : 'border-slate-200 dark:border-white/10 opacity-40'}`}>
                    <img src={url} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab Toggles Selection Capsule */}
          <div className="p-1 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl flex justify-center gap-2 max-w-sm mx-auto">
            {[{ id: 'EXTERIOR', label: 'Exterior Views', icon: Eye }, { id: 'INTERIOR', label: 'Interior Deck', icon: Sparkles }, { id: '360_VIEW', label: '360° Studio', icon: RotateCw }].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${activeTab === t.id ? 'bg-primaryBlue text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>
                <t.icon size={13} /><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-END DYNAMIC FORM SCHEDULER MATRIX */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="px-2.5 py-1 bg-primaryBlue/10 dark:bg-primaryBlue/20 text-primaryBlue dark:text-accentCyan font-mono text-[9px] font-bold tracking-widest rounded-md uppercase inline-block">Rental Fleet Node</span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{vehicle.name}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{vehicle.tagline}</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl bg-slate-50/50 dark:bg-[#0b1d35]/20 border border-slate-200 dark:border-white/5 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lease Overview</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{vehicle.desc}</p>
          </div>

          {/* HIGH-END INTERACTIVE TIMELINE MATRIX CONTROLLER FORM */}
          <div className="glass-panel p-5 rounded-2xl bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
            
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold tracking-wide border-b border-slate-100 dark:border-white/5 pb-2 text-[10px] uppercase">
              <Clock size={14} className="text-primaryBlue" />
              <span>Configure Allocation Window</span>
            </div>

            {/* A. Date Selection Flex Sub-Grid Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Lease Pick-Up</label>
                <input 
                  type="date" 
                  value={startDate} 
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Lease Return</label>
                <input 
                  type="date" 
                  value={endDate} 
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none" 
                />
              </div>
            </div>

            {/* B. Horizontal Selectable Badges Time Chips Slider Container */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Activation Time Slot</label>
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                      selectedTime === slot
                        ? 'bg-primaryBlue border-primaryBlue text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-white/[0.01] border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Receipt Breakdown Engine */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-2 text-[11px] font-normal">
              <div className="flex justify-between text-slate-500">
                <span>Calculated Horizon Duration:</span>
                <span className="font-bold font-mono text-primaryBlue dark:text-accentCyan bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md">{rentalDays} Days</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Total Term Rent:</span>
                <span className="font-mono text-slate-800 dark:text-white">${totalRentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 border-b border-dashed border-slate-100 dark:border-white/5 pb-2">
                <span>Refundable Security Bond:</span>
                <span className="font-mono text-slate-800 dark:text-white">${vehicle.securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-white">Due Now Total:</span>
                <span className="text-2xl font-black font-mono text-emerald-500">${grandTotalCost.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRentalCheckout}
              className="w-full py-3 bg-gradient-to-r from-primaryBlue to-accentCyan text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key size={14} />
              <span>Deploy Rental Smart Contract</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}