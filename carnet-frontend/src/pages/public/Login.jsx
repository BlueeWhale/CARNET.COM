import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Cpu } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('Client'); // Dynamic state for role mapping
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log('Compiling Data Stream:', { ...data, role: selectedRole });
      
      // Token matrix mapping handles
      localStorage.setItem('token', 'mock_jwt_crypto_handshake_hash');
      localStorage.setItem('role', selectedRole);

      toast.success(`Access Granted // Verified as ${selectedRole}`);

      setTimeout(() => {
        if (selectedRole === 'Dealer') {
          navigate('/dealer/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      }, 800);

    } catch (err) {
      toast.error(err.message || 'Handshake failed with authentication cluster');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#071426] overflow-x-hidden select-none relative">
      
      {/* ================= LEFT SIDE: AAA IMMERSIVE VISUAL CANVAS (Desktop Only) ================= */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16 overflow-hidden border-r border-white/5 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyYHaUNiLyrvZGokBap9j7CejVAP258e8f_CgMZDhbJg&s=10')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#030914]/95 via-[#030914]/80 to-[#030914]/40" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primaryBlue/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-xl w-full text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primaryBlue/10 border border-primaryBlue/30 text-accentCyan text-[10px] uppercase font-bold tracking-widest rounded-full shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Cpu size={12} className="animate-spin [animation-duration:4s]" />
              <span>Enterprise Command Shell</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white mt-5 leading-[1.1]">
              Drive The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue via-accentCyan to-white text-glow-blue">Autonomous Fleet</span>
            </h1>
            
            <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-lg drop-shadow-md">
              Synchronize your localized machine tokens with the secure global database cluster. Track fleet telemetry, calculate smart logic routing, and interact at sub-millisecond rates.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: HIGH-FIDELITY INTERACTIVE FORM (Responsive) ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-16 relative bg-carnetBg">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f605_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accentCyan/5 rounded-full blur-[80px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative z-10 border border-white/[0.08] shadow-glassGlow overflow-hidden group"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primaryBlue to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out" />

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-[0.15em] sm:tracking-[0.2em] text-white">
              CARNET<span className="text-accentCyan font-light">.COM</span>
            </h2>
            <p className="text-gray-400 text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-2 font-medium">
              ACCESS SECURE DATABASE CONSOLE
            </p>
          </div>

          {/* ================= NEW HIGH-FIDELITY ROLE SELECTOR SWITCHER ================= */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/40 border border-white/5 rounded-xl mb-6">
            {['Client', 'Dealer'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 relative overflow-hidden ${
                  selectedRole === role 
                    ? 'bg-primaryBlue text-white shadow-neonGlow border border-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                {role === 'Dealer' ? 'Dealer Console' : 'Client Access'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            {/* Email Box */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Secure Terminal Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type="email"
                  {...register("email", { required: "Email token required", pattern: { value: /^\S+@\S+$/i, message: "Invalid structure" } })}
                  placeholder="operator@carnet.ai"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all duration-300"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[11px] mt-1.5 font-medium tracking-wide">{errors.email.message}</p>}
            </div>

            {/* Password Box */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Access Key</label>
                <Link to="/forgot-password" className="text-[10px] sm:text-[11px] text-accentCyan hover:text-white transition-colors tracking-wide font-medium">Forget Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password string required", minLength: { value: 6, message: "Minimum 6 characters required" } })}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all duration-300"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[11px] mt-1.5 font-medium tracking-wide">{errors.password.message}</p>}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="rounded bg-black/40 border-white/10 text-primaryBlue focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[11px] sm:text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors selection:bg-transparent">
                Keep terminal connection active
              </label>
            </div>

            {/* Core Action Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-cyber flex items-center justify-center gap-2 h-11 sm:h-12 mt-4 relative group/btn overflow-hidden"
            >
              {isLoading ? (
                <span className="font-mono tracking-widest text-[10px] sm:text-xs">ESTABLISHING CRYPTO LINK...</span>
              ) : (
                <>
                  <span className="tracking-wider text-[10px] sm:text-xs font-bold uppercase">INITIALIZE SECURE SYSTEM LINK</span>
                  <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform hidden sm:inline" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 sm:my-6 text-center">
            <hr className="border-white/5" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b1d35] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 rounded-full border border-white/5 whitespace-nowrap">
              OR EXTEND WITH
            </span>
          </div>

          {/* Social SSO Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Google */}
            <button 
              type="button"
              className="h-10 sm:h-11 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center gap-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-300 transition-all duration-300 ease-out hover:border-[#4285F4]/60 hover:text-white hover:shadow-[0_0_20px_rgba(66,133,244,0.25)] group/google"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/google:scale-110" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>GOOGLE</span>
            </button>

            {/* Facebook */}
            <button 
              type="button"
              className="h-10 sm:h-11 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center gap-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-300 transition-all duration-300 ease-out hover:border-[#1877F2]/60 hover:text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.25)] group/fb"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover/fb:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                <path d="M16.671 13.722l.532-3.47h-3.328V8.003c0-.949.465-1.874 1.956-1.874h1.513V3.176s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.668v2.613H7.078v3.47h3.047v8.385a12.09 12.09 0 001.875.146c.633 0 1.259-.05 1.875-.146v-8.385h2.796z" fill="white"/>
              </svg>
              <span>FACEBOOK</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-gray-400">
            Node unregistered? <Link to="/register" className="text-accentCyan hover:text-white font-bold tracking-wide transition-colors ml-1 inline-block">Create Account</Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}