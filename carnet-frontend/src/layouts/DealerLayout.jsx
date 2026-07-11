import React from 'react';
import { LayoutDashboard, PlusCircle, ShieldAlert, BarChart3, Banknote, Settings, LogOut, Bell } from 'lucide-react';

const dealerMenuItems = [
  { label: 'Dealer Command', icon: LayoutDashboard, active: true },
  { label: 'Add Fleet Vehicle', icon: PlusCircle },
  { label: 'Active Inventory', icon: BarChart3 },
  { label: 'Revenue Streams', icon: Banknote },
  { label: 'Security Alerts', icon: ShieldAlert },
];

export default function DealerLayout({ children }) {
  return (
    <div className="min-h-screen bg-carnetBg text-white flex flex-col">
      {/* Horizontal Upper Header Grid */}
      <header className="h-20 glass-panel border-x-0 border-t-0 px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="font-black tracking-widest text-glow-cyan text-lg">
            CARNET<span className="text-white font-light">.DEALER</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white">
            <Bell size={18} />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Enterprise Console</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Full View Commercial Grid Navigation */}
        <aside className="w-64 glass-panel border-y-0 border-l-0 p-4 flex flex-col justify-between min-h-[calc(100vh-80px)]">
          <div className="space-y-2">
            {dealerMenuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button key={idx} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all ${item.active ? 'bg-gradient-to-r from-cyan-600 to-primaryBlue text-white shadow-neonGlow' : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'}`}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-neonRed hover:bg-neonRed/10 transition-all">
            <LogOut size={18} />
            <span>Terminate</span>
          </button>
        </aside>

        {/* Dynamic Context Canvas */}
        <main className="flex-1 p-8 bg-[radial-gradient(#3b82f605_1px,transparent_1px)] [background-size:32px_32px]">
          {children}
        </main>
      </div>
    </div>
  );
}