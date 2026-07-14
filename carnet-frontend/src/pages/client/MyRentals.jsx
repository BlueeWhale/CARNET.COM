import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ShieldCheck, Gauge, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Live custom rental state database engine hooks
import { useRentalEngine } from '../../context/RentalContext';

export default function MyRentals() {
  const navigate = useNavigate();
  
  // Destructured myRentals tracking registry along with termination action handles
  const { myRentals, removeRentalContract } = useRentalEngine(); 

  const handleContractTermination = (contractId, carName) => {
    if (window.confirm(`Are you sure you want to terminate the lease contract for ${carName}?`)) {
      removeRentalContract(contractId);
      toast.error(`Lease Contract ${contractId} revoked successfully.`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-white">
      
      <div className="flex flex-col border-b border-slate-100 dark:border-white/5 pb-4">
        <h3 className="text-lg font-bold">Active Rental Contracts</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Monitor your deployed fleet streams, lease horizons, and automated telemetry configurations.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {myRentals.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-16 rounded-2xl border border-dashed border-slate-200 dark:border-white/5 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#0b1d35]/10"
            >
              <p className="text-sm text-slate-400 dark:text-slate-500">No active instance allocations found.</p>
              <button 
                type="button"
                onClick={() => navigate('/client/buy')} 
                className="text-xs text-primaryBlue font-bold mt-2 hover:underline cursor-pointer"
              >
                Launch Fleet Catalog
              </button>
            </motion.div>
          ) : (
            myRentals.map((contract, index) => (
              <motion.div
                key={contract.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="glass-panel rounded-2xl p-5 bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative group"
              >
                {/* FIXED ENGINE: Asset Preview Layer */}
                <div className="lg:col-span-3 w-full h-36 rounded-xl overflow-hidden relative border border-slate-100 dark:border-white/5 shadow-inner bg-slate-200 dark:bg-black/20 flex items-center justify-center">
                  <img 
                    src={contract.img} 
                    alt={contract.name} 
                    className="w-full h-full object-cover block filter saturate-[1.1] relative z-10"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[8px] font-mono font-bold text-white rounded tracking-widest uppercase z-20 shadow-sm">
                    {contract.brand}
                  </span>
                </div>

                {/* Description Info Block */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[9px] font-bold text-primaryBlue dark:text-accentCyan uppercase tracking-wider block">
                    {contract.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{contract.name}</h4>
                  <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    CONTRACT REF // {contract.id}
                  </p>
                  <div className="flex gap-4 pt-1 text-slate-600 dark:text-slate-400 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Gauge size={13} className="text-primaryBlue dark:text-accentCyan" /> {contract.topSpeed}
                    </span>
                    <span className="border-l border-slate-200 dark:border-white/10 pl-4">
                      <b>${contract.rentPerDay}</b> / day
                    </span>
                  </div>
                </div>

                {/* Time Horizon Scheduling Matrix */}
                <div className="lg:col-span-3 p-3 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-xl space-y-2 text-xs font-medium">
                  <div className="flex items-start gap-2">
                    <Calendar size={13} className="text-primaryBlue mt-0.5" />
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">Activation Horizon</p>
                      <p className="text-slate-900 dark:text-white font-bold mt-1">{contract.startDate} <span className="text-slate-400 font-normal dark:text-slate-500 text-[10px]">at {contract.startTime}</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t border-slate-100 dark:border-white/5 pt-2">
                    <Calendar size={13} className="text-red-500 mt-0.5" />
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">Lease Expiration ({contract.durationDays} Days)</p>
                      <p className="text-slate-900 dark:text-white font-bold mt-1">{contract.endDate} <span className="text-slate-400 font-normal dark:text-slate-500 text-[10px]">at {contract.endTime}</span></p>
                    </div>
                  </div>
                </div>

                {/* Status Options & Interactive Destruction Switch */}
                <div className="lg:col-span-2 w-full flex flex-row lg:flex-col gap-3 justify-between lg:justify-end items-center lg:items-end text-left lg:text-right">
                  <div>
                    <div className="flex items-center lg:justify-end gap-1.5 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-slate-900 dark:text-white">{contract.status}</span>
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-slate-400 mt-1 uppercase flex items-center lg:justify-end gap-1">
                      <ShieldCheck size={11} className="text-emerald-500 shrink-0" /> {contract.escrowStatus}
                    </span>
                  </div>
                  
                  {/* DYNAMIC ACTION: Clean Functional Terminate Button */}
                  <button
                    type="button"
                    onClick={() => handleContractTermination(contract.id, contract.name)}
                    className="p-2 lg:px-3 lg:py-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white border border-red-200 dark:border-red-500/20 rounded-xl text-[10px] font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Terminate Lease Node"
                  >
                    <Trash2 size={13} />
                    <span className="hidden sm:inline">Terminate</span>
                  </button>
                </div>

              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}