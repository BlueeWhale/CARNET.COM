import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Recovery target trace:', data.email);
      setEmailSent(true);
      toast.success('Recovery link dispatched to node router');
    } catch (err) {
      toast.error('Trace execution failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-carnetBg relative p-4">
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb0c_1px,transparent_1px)] [background-size:20px_20px]" />

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl relative z-10"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primaryBlue/10 border border-primaryBlue/30 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="text-accentCyan" size={22} />
          </div>
          <h2 className="text-2xl font-black tracking-widest text-white">KEY RECOVERY</h2>
          <p className="text-gray-400 text-xs tracking-wide mt-1">Reset hashed authentication keys</p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Target Email Terminal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accentCyan" size={18} />
                <input 
                  type="email"
                  required
                  {...register("email")}
                  placeholder="operator@carnet.ai"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primaryBlue"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-cyber h-12">
              DISPATCH RECOVERY DECREE
            </button>
          </form>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl text-sm text-gray-300 leading-relaxed">
              An encrypted reset token configuration matrix has been sent to your email node. Please execute the instructions within 15 minutes.
            </div>
            <button onClick={() => setEmailSent(false)} className="text-xs text-accentCyan hover:underline font-bold tracking-wider uppercase">
              Attempt re-trace
            </button>
          </motion.div>
        )}

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs">
          <a href="/login" className="text-gray-400 hover:text-white transition-colors">Return to Security Login</a>
        </div>
      </motion.div>
    </div>
  );
}