import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Battery, Zap, Trash2, ShieldCheck, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlistEngine } from '../../context/WishlistContext';

export default function MyWishlist() {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlistNode } = useWishlistEngine();

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-white">
      
      {/* Structural Block Header */}
      <div className="flex flex-col border-b border-slate-100 dark:border-white/5 pb-4">
        <h3 className="text-lg font-bold">Your Curated Wishlist Assets</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Review saved vehicles, evaluate technical specs breakup, and initialize instant checkout procurement.
        </p>
      </div>

      {/* Grid Condition Validator Evaluation */}
      {wishlistItems.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl border border-dashed border-slate-200 dark:border-white/5 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#0b1d35]/10">
          <AlertCircle size={28} className="text-slate-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-slate-400 dark:text-gray-500">Your wishlist container is empty.</p>
          <button onClick={() => navigate('/client/buy')} className="text-xs text-primaryBlue font-bold mt-2 hover:underline cursor-pointer">
            Explore Vehicle Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((car) => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel rounded-2xl overflow-hidden bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              {/* Media Preview Shell */}
              <div className="relative w-full h-44 bg-slate-100 dark:bg-black/10">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                
                {/* Trash Elimination Trigger Anchor */}
                <button
                  type="button"
                  onClick={() => toggleWishlistNode(car)}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-500 border border-white/10 text-white backdrop-blur-md rounded-xl transition-all cursor-pointer shadow-sm z-20"
                >
                  <Trash2 size={13} />
                </button>
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-black/70 border border-white/10 backdrop-blur-sm text-[8px] font-mono font-bold tracking-widest text-white rounded uppercase z-10">
                  {car.brand} ASSET
                </span>
              </div>

              {/* Information Base Specs Content Mapping */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{car.name}</h4>
                    <span className="text-sm font-black text-primaryBlue dark:text-accentCyan font-mono">
                      ${(car.buyPrice || car.price || 216100).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-slate-400 uppercase tracking-widest mt-0.5 block">
                    Category: {car.category || 'Hyper Core'}
                  </span>

                  {/* HIGH-FIDELITY PURCHASE DETAIL MATRIX: Specs Data Blocks */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-slate-600 dark:text-gray-400 text-center text-xs">
                    <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl">
                      <Gauge size={13} className="text-accentCyan" />
                      <span className="text-[10px] font-bold mt-1 leading-none">{car.topSpeed || '330 km/h'}</span>
                      <span className="text-[7px] font-mono text-slate-400 tracking-wider mt-1 uppercase">V-MAX</span>
                    </div>

                    <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl">
                      <Battery size={13} className="text-emerald-500" />
                      <span className="text-[10px] font-bold mt-1 leading-none">{car.efficiency || '94%'}</span>
                      <span className="text-[7px] font-mono text-slate-400 tracking-wider mt-1 uppercase">CELL</span>
                    </div>

                    <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl">
                      <Zap size={13} className="text-amber-500" />
                      <span className="text-[10px] font-bold mt-1 leading-none">{car.power || '650 HP'}</span>
                      <span className="text-[7px] font-mono text-slate-400 tracking-wider mt-1 uppercase">POWER</span>
                    </div>
                  </div>
                </div>

                {/* ESCROW BREAKDOWN & FEE SHEET DETAIL GRID */}
                <div className="p-3 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-xl space-y-1.5 font-mono text-[9px] text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Smart Escrow Lock:</span>
                    <span className="text-slate-800 dark:text-white font-bold">Verified Node</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autonomous Insurance:</span>
                    <span className="text-emerald-500 font-bold">L1 Secured</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-slate-200 dark:border-white/10 pt-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Estimated Rent:</span>
                    <span className="text-primaryBlue dark:text-accentCyan">${(car.rentPrice || 850)}/day</span>
                  </div>
                </div>

                {/* Showroom Action Procurement Trigger Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/client/buy')}
                    className="flex-1 py-2 bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag size={12} />
                    <span>Purchase Core</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate('/client/buy')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    title="Inspect Studio Spec"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}