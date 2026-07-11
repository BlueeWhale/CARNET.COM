import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Briefcase, ChevronRight, Cpu } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('Client');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = { ...data, role: selectedRole };
      console.log('Registration Payload:', payload);
      
      toast.success('Terminal Credentials Compiled. Generating Security Shield...');
      
      setTimeout(() => {
        navigate('/verify-otp');
      }, 800);

    } catch (err) {
      toast.error(err.message || 'System Manifest Compilation Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#071426] overflow-x-hidden select-none relative">
      
      {/* ================= LEFT SIDE: AAA IMMERSIVE VISUAL CANVAS (IMAGE BACKGROUND WITH TEXT OVERLAY) ================= */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16 overflow-hidden border-r border-white/5 bg-cover bg-center top-0 h-screen"
        style={{ 
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUv7XYMxtdWtUF8FL19IdoleN5OZOAA-j9pxK4Ly3d_Q&s=10x')` 
        }}
      >
        {/* Dark Dark overlay taaki text image ke upar sahi se read ho sake */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#030914]/95 via-[#030914]/80 to-[#030914]/40" />
        
        {/* Futuristic Cyber Grid & Glow overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primaryBlue/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Content over the Image */}
        <div className="relative z-10 max-w-xl w-full text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            
            
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white mt-5 leading-[1.1]">
              Where Every Journey<span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue via-accentCyan to-white text-glow-blue">Starts</span> Smarte
            </h1>
            
            <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-lg drop-shadow-md">
              Create an authenticated system instance to initialize global marketplace routing. Setup secure multi-role telemetry configurations and pass automated handshake checks.
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
          className="w-full max-w-md glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative z-10 border border-white/[0.08] shadow-glassGlow overflow-hidden group my-4 sm:my-8"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primaryBlue to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out" />

          {/* Header */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-[0.15em] sm:tracking-[0.2em] text-white">REGISTER</h2>
            <p className="text-gray-400 text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-2 font-medium">INITIALIZE TERMINAL MANIFEST</p>
          </div>

          {/* Dynamic Role Switcher Map */}
          <div className="grid grid-cols-2 gap-2 p-1 sm:p-1.5 bg-black/40 border border-white/5 rounded-xl mb-5 sm:mb-6">
            {['Client', 'Dealer'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selectedRole === role ? 'bg-primaryBlue text-white shadow-neonGlow' : 'text-gray-400 hover:text-white'}`}
              >
                {role === 'Dealer' ? 'Dealer Portal' : 'Standard Client'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Legal Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type="text"
                  {...register("fullName", { required: "Name token sequence required" })}
                  placeholder="Rishabh Kumar"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60 transition-all"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Secure Email Node</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type="email"
                  {...register("email", { required: "Email target mandatory", pattern: { value: /^\S+@\S+$/i, message: "Invalid node syntax" } })}
                  placeholder="operator@carnet.ai"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60 transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Phone Network Vector</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type="tel"
                  {...register("phone", { required: "Phone linkage required" })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60 transition-all"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
            </div>

            {/* Conditional Enterprise Fields if Role === Dealer */}
            {selectedRole === 'Dealer' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-0.5">
                <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Dealership Company Name</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                  <input 
                    type="text"
                    {...register("companyName", { required: "Company string required for dealers" })}
                    placeholder="Luxury Fleet Labs"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60"
                  />
                </div>
                {errors.companyName && <p className="text-red-500 text-[11px] mt-1">{errors.companyName.message}</p>}
              </motion.div>
            )}

            {/* Password String */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Initialize Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan/70" size={16} />
                <input 
                  type="password"
                  {...register("password", { required: "Security key mandatory", minLength: { value: 6, message: "Minimum 6 characters strict" } })}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue focus:bg-black/60"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password.message}</p>}
            </div>

            {/* Core Submit Trigger Action */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-cyber flex items-center justify-center gap-2 h-11 sm:h-12 mt-4 sm:mt-6 relative group/btn overflow-hidden"
            >
              {isLoading ? (
                <span className="font-mono tracking-widest text-[10px] sm:text-xs">SYNCHRONIZING MANIFEST...</span>
              ) : (
                <>
                  <span className="tracking-wider text-[10px] sm:text-xs font-bold uppercase">EXECUTE MANIFEST REGISTRATION</span>
                  <ChevronRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform hidden sm:inline" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 text-center text-xs text-gray-400">
            Already registered? <Link to="/login" className="text-accentCyan hover:text-white font-bold tracking-wide transition-colors ml-1 inline-block">Connect Terminal Node</Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}