import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeIdx, setActiveIdx] = useState(0);
  const [timer, setTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus controller layer
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIdx]);

  // Countdown timer system matrix
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    // Sirf last entered digit ko pick karein
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto forward shift mechanism
    if (val && index < 5) {
      setActiveIdx(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace previous tracking focus handling
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        setActiveIdx(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(59);
    toast.success("New encrypted authentication OTP dispatched!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      toast.error("Please fill the full 6-digit cluster token");
      return;
    }
    setIsLoading(true);
    
    try {
      console.log("Verifying Node OTP:", finalOtp);
      toast.success("Identity Verified // Security Shield Synchronized");
    } catch (err) {
      toast.error("Invalid checksum code match");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#071426] relative p-4 overflow-hidden select-none">
      {/* Structural Cyber Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb0a_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute w-[500px] h-[500px] bg-primaryBlue/5 rounded-full blur-[130px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl relative z-10 border border-white/[0.08] shadow-glassGlow text-center"
      >
        {/* Core Shield Branding Icon */}
        <div className="w-14 h-14 rounded-full bg-primaryBlue/10 border border-primaryBlue/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
          <ShieldCheck className="text-accentCyan" size={26} />
        </div>

        <h2 className="text-2xl font-black tracking-widest text-white uppercase">SECURITY SHIELD MATCH</h2>
        <p className="text-gray-400 text-[11px] tracking-wider uppercase mt-1.5 max-w-xs mx-auto">
          Enter the 6-digit secondary key token dispatched to your operator mainframe node
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* 6 Core OTP Grid Containers */}
          <div className="flex justify-center gap-2.5 sm:gap-3">
            {otp.map((digit, idx) => (
              <div key={idx} className="relative w-12 h-14 sm:w-14 sm:h-16 group">
                <input
                  ref={idx === activeIdx ? inputRef : null}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onFocus={() => setActiveIdx(idx)}
                  className="w-full h-full text-center bg-black/40 border border-white/10 rounded-xl text-xl font-mono font-bold text-white focus:outline-none focus:bg-black/60 transition-all duration-200"
                />

                {/* Animated Rotating Blue Neon Square Circuit Border (Triggered on Click/Focus) */}
                {idx === activeIdx && (
                  <motion.div 
                    layoutId="activeBorderGlow"
                    className="absolute inset-0 rounded-xl border-2 border-primaryBlue pointer-events-none shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    {/* Corner Tracer Particles */}
                    <span className="absolute top-0 left-0 w-2 h-2 bg-accentCyan rounded-full -translate-x-[3px] -translate-y-[3px] shadow-[0_0_8px_#3b82f6]" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-accentCyan rounded-full translate-x-[3px] translate-y-[3px] shadow-[0_0_8px_#3b82f6]" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Verification Systems Core Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-cyber flex items-center justify-center gap-2 h-12 relative group/btn overflow-hidden"
          >
            {isLoading ? (
              <span className="font-mono tracking-widest text-xs">DECRYPTING CHECKSUM LOGIC...</span>
            ) : (
              <>
                <span className="tracking-wider text-xs font-bold uppercase">VERIFY CLUSTER TOKEN</span>
                <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sync Countdown Resend Area */}
        <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${timer > 0 ? 'bg-amber-500 animate-pulse' : 'bg-neonGreen'}`} />
            <span>{timer > 0 ? `LINK EXPIRES IN: ${timer}s` : "TOKEN DE-SYNCHRONIZED"}</span>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${timer > 0 ? 'text-gray-600 cursor-not-allowed' : 'text-accentCyan hover:text-white'}`}
          >
            <RefreshCw size={12} className={timer === 0 ? "animate-spin [animation-duration:10s]" : ""} />
            <span>RESEND KEY TOKEN</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}