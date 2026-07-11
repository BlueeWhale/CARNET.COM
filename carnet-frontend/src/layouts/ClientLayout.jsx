import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Car, Calendar, Heart, CreditCard, MessageSquare, Bell, LogOut, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const clientMenuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Buy Cars', icon: Car },
  { label: 'My Rentals', icon: Calendar },
  { label: 'Wishlist', icon: Heart },
  { label: 'Payments', icon: CreditCard },
  { label: 'Messages', icon: MessageSquare },
];

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const searchInputRef = useRef(null);

  const dynamicPlaceholders = [
    "Search Porsche...",
    "Search BMW...",
    "Search Tesla...",
    "Search Mercedes...",
    "Search Electric...",
    "Search Variants..."
  ];

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
    <div className="min-h-screen bg-carnetBg text-white flex select-none antialiased">
      
      {/* ================= STRUCTURAL CYBER SIDEBAR ================= */}
      <aside 
        className={`glass-panel border-y-0 border-l-0 fixed left-0 top-0 bottom-0 h-full z-40 transition-all duration-300 ease-out flex flex-col justify-between ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className={`h-20 flex items-center border-b border-white/5 transition-all duration-300 ${sidebarOpen ? 'justify-between px-6' : 'justify-center px-0'}`}>
            <span 
              className={`font-black tracking-widest text-glow-blue transition-all duration-300 overflow-hidden whitespace-nowrap ${
                sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'
              }`}
            >
              CARNET<span className="text-accentCyan font-light">.COM</span>
            </span>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-accentCyan transition-colors duration-200 shrink-0"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Navigation Matrix */}
          <nav className="p-4 space-y-2">
            {clientMenuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button 
                  key={idx} 
                  className={`w-full flex items-center rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group relative ${
                    sidebarOpen ? 'gap-4 px-4 py-3 justify-start' : 'px-0 py-3 justify-center'
                  } ${
                    item.active 
                      ? 'bg-primaryBlue text-white shadow-neonGlow border border-white/10' 
                      : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <Icon size={20} className={`shrink-0 ${item.active ? 'text-white' : 'text-accentCyan group-hover:scale-105 transition-transform'}`} />
                  
                  <span 
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                      sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'
                    }`}
                  >
                    {item.label}
                  </span>

                  {!sidebarOpen && (
                    <div className="absolute left-24 px-3 py-1.5 rounded-lg bg-[#0b1d35] border border-white/10 text-[11px] font-bold tracking-wider text-white opacity-0 group-hover:opacity-100 pointer-events-none shadow-2xl transition-opacity duration-200 z-50 whitespace-nowrap">
                      {item.label.toUpperCase()}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Signout Strip */}
        <div className="p-4 border-t border-white/5">
          <button 
            className={`w-full flex items-center rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200 ${
              sidebarOpen ? 'gap-4 px-4 py-3 justify-start' : 'px-0 py-3 justify-center'
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            <span 
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 absolute pointer-events-none'
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT CANVAS PIPELINE WRAPPER ================= */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-out min-w-0 ${
          sidebarOpen ? 'pl-64' : 'pl-20'
        }`}
      >
        {/* Upper Functional Header Navbar */}
        <header className="h-20 glass-panel border-x-0 border-t-0 px-8 grid grid-cols-3 items-center sticky top-0 z-30 backdrop-blur-xl bg-[#071426]/60 gap-4">
          
          {/* Left Empty Block Anchor */}
          <div className="pointer-events-none select-none" />

          {/* ================= COMPACT LOGICAL MINIMALIST SEARCH BAR ================= */}
          <div className="w-full max-w-[320px] justify-self-center relative group transition-all duration-300">
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-primaryBlue to-accentCyan opacity-0 blur-[2px] transition-opacity duration-300 ${
                searchFocused ? 'opacity-40 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'group-hover:opacity-10'
              }`} 
            />
            
            <div 
              className={`relative flex items-center bg-black/40 border rounded-full transition-all duration-300 ${
                searchFocused ? 'border-primaryBlue bg-black/60 shadow-innerNeon' : 'border-white/10'
              }`}
            >
              <Search 
                size={14} 
                className={`absolute left-4 transition-colors duration-300 ${
                  searchFocused ? 'text-accentCyan' : 'text-gray-500'
                }`} 
              />
              
              <div className="w-full relative flex items-center">
                <input 
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-transparent py-2 pl-10 pr-12 text-[11px] text-white focus:outline-none tracking-wide relative z-10"
                />

                {searchQuery.length === 0 && (
                  <div className="absolute left-10 text-[11px] text-gray-500 tracking-wide pointer-events-none select-none overflow-hidden h-4 flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIdx}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="block font-medium"
                      >
                        {dynamicPlaceholders[placeholderIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="absolute right-4 flex items-center">
                <span className={`w-1 h-1 rounded-full transition-all duration-300 ${searchFocused ? 'bg-accentCyan shadow-[0_0_6px_#3b82f6]' : 'bg-white/10'}`} />
              </div>
            </div>
          </div>

          {/* Right Action Widgets Control Panel */}
          <div className="flex items-center gap-6 justify-self-end">
            <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors duration-200">
              <Bell size={18} className="text-accentCyan" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] animate-pulse" />
            </button>
            
            <div className="flex items-center gap-3 border-l border-white/10 pl-6 h-8">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white tracking-wide">Rishabh Kumar</p>
                <p className="text-[9px] font-mono font-bold text-gray-500 tracking-wider mt-0.5">ID: #9942A</p>
              </div>
              
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primaryBlue to-accentCyan p-[1px] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer">
                <div className="w-full h-full bg-[#0b1d35] rounded-xl flex items-center justify-center font-black text-sm text-glow-cyan text-white tracking-wider">
                  RK
                </div>
              </div>
            </div>
          </div>
          
        </header>

        {/* Rendering Body Canvas Viewport wrapper */}
        <main className="p-8 flex-1 max-w-[1600px] w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>

    </div>
  );
}