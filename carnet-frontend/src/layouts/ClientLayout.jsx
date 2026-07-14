import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, Calendar, Heart, CreditCard, MessageSquare, Bell, LogOut, Menu, X, Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscLayoutSidebarRight } from "react-icons/vsc";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { useCarFilters } from '../context/FilterContext';
import tataLogo from '../assets/logo/tata.png';
import porsheLogo from '../assets/logo/por.png';

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const searchInputRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedBrand, setSelectedBrand,
    searchCarName, setSearchCarName,
    budgetRange, setBudgetRange
  } = useCarFilters();

  // Flag tracker: Check if filters belong to current view domain path
  const isMarketplaceActive = location.pathname === '/client/buy';

  const clientMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/client/dashboard' },
    { label: 'Buy/Rent Cars', icon: Car, path: '/client/buy' },
    { label: 'My Rentals', icon: Calendar, path: '/client/rentals' },
    { label: 'Wishlist', icon: Heart, path: '/client/wishlist' },
    { label: 'Payments', icon: CreditCard, path: '/client/payments' },
    { label: 'Messages', icon: MessageSquare, path: '/client/messages' },
  ];

  const filterBrands = [
    { name: 'ALL', label: 'All Brands' },
    { name: 'PORSCHE', label: 'Porsche', img: porsheLogo },
    { name: 'BMW', label: 'BMW', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=100&auto=format&fit=crop' },
    { name: 'MERCEDES', label: 'Mercedes', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=100&auto=format&fit=crop' },
    { name: 'TESLA', label: 'Tesla', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=100&auto=format&fit=crop' },
    { name: 'TATA', label: 'Tata', img: tataLogo }
  ];

  const dynamicPlaceholders = [" Porsche", " BMW", " Tesla", " Variants"];

  useEffect(() => {
    const placeholderTimer = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % dynamicPlaceholders.length);
    }, 5000);
    return () => clearInterval(placeholderTimer);
  }, [dynamicPlaceholders.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-carnetBg text-slate-800 dark:text-slate-100 flex select-none antialiased transition-colors duration-300">
      
      {/* ================= SIDEBAR CONSOLE SYSTEM TERMINAL ================= */}
      <aside className={`glass-panel fixed left-0 top-0 bottom-0 h-full z-40 transition-all duration-300 ease-out flex flex-col justify-between overflow-y-auto ${sidebarOpen ? 'w-72' : 'w-20'} bg-white dark:bg-[#071426]/95 border-r border-slate-200 dark:border-white/5 shadow-xl`}>
        <div>
          {/* Header Area */}
          <div className={`h-20 flex items-center border-b border-slate-100 dark:border-white/5 ${sidebarOpen ? 'justify-between px-6' : 'justify-center px-0'}`}>
            <span className={`text-lg font-bold text-slate-900 dark:text-white tracking-wide transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'}`}>
              CARNET<span className="text-primaryBlue font-medium">.COM</span>
            </span>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
              {sidebarOpen ? <VscLayoutSidebarRight size={16} /> : <VscLayoutSidebarLeft size={16} />}
            </button>
          </div>

          {/* Navigation Matrix Link Actions */}
          <nav className="p-4 space-y-1 border-b border-slate-100 dark:border-white/5">
            {clientMenuItems.map((item, idx) => {
              const Icon = item.icon;
              const isLinkActive = location.pathname === item.path;
              return (
                <button 
                  key={idx} 
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    sidebarOpen ? 'gap-4 px-4 py-2.5 justify-start' : 'px-0 py-2.5 justify-center'
                  } ${
                    isLinkActive 
                      ? 'bg-primaryBlue text-white shadow-sm' 
                      : 'text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:text-slate-900'
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className={`${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'}`}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Clean Functional Filter Controls Layout Container — RENDERS CONDITIONALLY ONLY */}
          <AnimatePresence>
            {sidebarOpen && isMarketplaceActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="p-5 space-y-5 text-xs font-normal border-b border-slate-100 dark:border-white/5"
              >
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-medium tracking-wide border-b border-slate-100 dark:border-white/5 pb-2">
                  <SlidersHorizontal size={14} className="text-primaryBlue" />
                  <span>Filter Options</span>
                </div>

                {/* Brand Grid Layout Arrays */}
                <div className="space-y-2">
                  <label className="text-slate-500 dark:text-slate-400 font-medium block">Select Brand</label>
                  <div className="grid grid-cols-2 gap-2">
                    {filterBrands.map((brand) => (
                      <button
                        key={brand.name}
                        type="button"
                        onClick={() => setSelectedBrand(brand.name)}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                          selectedBrand === brand.name
                            ? 'bg-primaryBlue/10 dark:bg-primaryBlue/20 border-primaryBlue text-primaryBlue dark:text-accentCyan font-bold'
                            : 'bg-slate-50 dark:bg-white/[0.01] border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {brand.img ? (
                          <img src={brand.img} alt={brand.name} className="max-w-[40px] max-h-[20px] object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : null}
                        <span className="text-[10px] font-medium tracking-wide text-center">{brand.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider Core Box */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-slate-500 dark:text-slate-400">Max Budget</span>
                    <span className="font-bold text-primaryBlue dark:text-accentCyan">${budgetRange.toLocaleString()}</span>
                  </div>
                  <input type="range" min="30000" max="350000" step="5000" value={budgetRange} onChange={(e) => setBudgetRange(Number(e.target.value))} className="w-full accent-primaryBlue bg-slate-100 dark:bg-white/10 h-1 rounded-lg cursor-pointer" />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>$30K</span>
                    <span>$350K</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Signout Area */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5">
          <button onClick={() => navigate('/')} className={`w-full flex items-center rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-200 ${sidebarOpen ? 'gap-4 px-4 py-2.5 justify-start' : 'px-0 py-2.5 justify-center'}`}>
            <LogOut size={16} className="shrink-0" />
            <span className={`${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= CONTENT MAIN VIEWPORT WRAPPER ================= */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-out min-w-0 ${sidebarOpen ? 'pl-72' : 'pl-20'}`}>
        
        {/* Upper Dynamic Navbar Area with Center Search Engine Module */}
        <header className="h-20 glass-panel border-x-0 border-t-0 px-8 grid grid-cols-3 items-center sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-[#071426]/60 border-b border-slate-200 dark:border-white/5">
          <div />
          
          {/* Column 2: Sleek Interactive Center Search Engine */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[260px] relative group">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primaryBlue to-accentCyan opacity-0 blur-[2px] transition-opacity duration-300 ${searchFocused ? 'opacity-30' : 'group-hover:opacity-10'}`} />
              <div className={`relative flex items-center bg-slate-50 dark:bg-black/40 border rounded-full transition-all duration-300 h-9 ${searchFocused ? 'border-primaryBlue bg-white dark:bg-black/60 shadow-sm' : 'border-slate-200 dark:border-white/10'}`}>
                <Search size={13} className={`absolute left-3.5 transition-colors duration-300 ${searchFocused ? 'text-primaryBlue' : 'text-slate-400'}`} />
                <div className="w-full relative flex items-center h-full">
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchCarName} 
                    onChange={(e) => setSearchCarName(e.target.value)} 
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent h-full pl-9 pr-12 text-xs font-medium text-slate-950 dark:text-white focus:outline-none tracking-wide relative z-10" 
                  />
                  {searchCarName.length === 0 && (
                    <div className="absolute left-9 text-xs text-slate-400 dark:text-slate-500 tracking-wide pointer-events-none select-none overflow-hidden h-4 flex items-center">
                      <AnimatePresence mode="wait">
                        <motion.span key={placeholderIdx} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.25 }} className="block font-medium">
                          {dynamicPlaceholders[placeholderIdx]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                <div className="absolute right-3 px-1.5 py-0.5 bg-slate-200/50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/5 text-[7px] font-mono text-gray-500 rounded-md">⌘K</div>
              </div>
            </div>
          </div>
          
          {/* Column 3: Notifications & Avatar Widgets */}
          <div className="flex items-center gap-4 justify-self-end">
            <button className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <Bell size={16} className="text-slate-500 dark:text-accentCyan" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-primaryBlue flex items-center justify-center font-bold text-xs text-white">RK</div>
          </div>
        </header>

        <main className="p-8 flex-1 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>

    </div>
  );
}