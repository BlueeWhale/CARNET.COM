import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { CiLogin } from "react-icons/ci";
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-carnetBg/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Animated Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-black tracking-[0.2em] text-slate-900 dark:text-white text-lg transition-colors">
            CARNET<span className="text-accentCyan font-light">.COM</span>
          </span>
        </Link>



        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-5">
          
          {/* Theme Mode Trigger Switcher Box */}
          <button 
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-accentCyan hover:scale-105 transition-all focus:outline-none cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link to="/register" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-2">
            SignUp
          </Link>
          
          <button 
            type="button"
            onClick={() => navigate('/login')} 
            className="px-5 py-2.5 bg-gradient-to-r from-primaryBlue to-accentCyan text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md dark:shadow-neonGlow hover:opacity-90 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Login</span>
            <CiLogin size={14}/>
          </button>
        </div>

        {/* Mobile Toggler */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-900 dark:text-white focus:outline-none">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0b1d35] border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-5 text-sm font-semibold uppercase tracking-wider text-center shadow-2xl transition-colors">
          <Link to="/buy" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-gray-300 hover:text-slate-900">Buy Matrix</Link>
          <Link to="/rent" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-gray-300 hover:text-slate-900">Rent Core</Link>
          <hr className="border-slate-200 dark:border-white/5 w-1/2 mx-auto" />
          
          <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="text-xs font-bold text-accentCyan uppercase tracking-widest">
            {theme === 'dark' ? 'LIGHT CONSOLE' : 'DARK CYBER MODE'}
          </button>
          
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-gray-300">SignUp</Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-accentCyan font-bold">Login</Link>
        </div>
      )}
    </nav>
  );
}