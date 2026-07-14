import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gauge, Battery, Zap, ShoppingBag, Key, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Importing context data streams hooks for search filtering & wishlist matrix
import { useCarFilters } from '../../context/FilterContext';
import { useWishlistEngine } from '../../context/WishlistContext';

const vehicleData = [
  {
    id: "mkt_p911",
    name: "Porsche 911 Turbo S",
    brand: "PORSCHE",
    category: "Hyper Performance",
    buyPrice: 216100,
    rentPrice: 850, 
    topSpeed: "330 km/h",
    efficiency: "94%",
    power: "650 HP",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mkt_bmwm4",
    name: "BMW M4 Competition",
    brand: "BMW",
    category: "Track Edition",
    buyPrice: 78600,
    rentPrice: 320,
    topSpeed: "290 km/h",
    efficiency: "89%",
    power: "503 HP",
    img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mkt_msplaid",
    name: "Tesla Model S Plaid",
    brand: "TESLA",
    category: "Full Autonomous EV",
    buyPrice: 89990,
    rentPrice: 400,
    topSpeed: "322 km/h",
    efficiency: "99%",
    power: "1020 HP",
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mkt_amgc63",
    name: "Mercedes-AMG C63 S",
    brand: "MERCEDES",
    category: "BiTurbo Luxury",
    buyPrice: 81850,
    rentPrice: 350,
    topSpeed: "280 km/h",
    efficiency: "87%",
    power: "503 HP",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mkt_tataavinya",
    name: "Tata Avinya Concept",
    brand: "TATA",
    category: "Premium EV Core",
    buyPrice: 65000,
    rentPrice: 280,
    topSpeed: "210 km/h",
    efficiency: "96%",
    power: "450 HP",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop"
  }
];

export default function FleetMarket() {
  const navigate = useNavigate(); 
  const [marketMode, setMarketMode] = useState('BUY');
  const { selectedBrand, searchCarName, budgetRange } = useCarFilters();
  const { wishlistItems, toggleWishlistNode } = useWishlistEngine();

  const filteredMarket = vehicleData.filter((car) => {
    const matchesBrand = selectedBrand === 'ALL' || car.brand === selectedBrand;
    const matchesSearch = car.name.toLowerCase().includes(searchCarName.toLowerCase());
    const matchesBudget = marketMode === 'BUY' ? car.buyPrice <= budgetRange : (car.rentPrice * 30) <= budgetRange;
    return matchesBrand && matchesSearch && matchesBudget;
  });

  const handleActionClick = (carName) => {
    const actionText = marketMode === 'BUY' ? 'Secure Purchase Handshake' : 'Rental Lease Contract';
    toast.success(`${actionText} initialized for ${carName}`);
    
    if (marketMode === 'BUY') {
      navigate('/client/vehicle-details');
    } else {
      navigate('/client/rental-details');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-white">
      
      {/* ================= MODE CONTROLLER SWITCH BUTTON BALANCER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-5">
        <div>
          <h3 className="text-lg font-bold">Fleet Dealership Matrix</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Toggle between instant ownership or flexible active lease terms</p>
        </div>

        {/* Dynamic Dual-Option Control Selector */}
        <div className="p-1 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl flex gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMarketMode('BUY')}
            className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer ${
              marketMode === 'BUY'
                ? 'bg-primaryBlue text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Buy Outright</span>
          </button>
          
          <button
            type="button"
            onClick={() => setMarketMode('RENT')}
            className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer ${
              marketMode === 'RENT'
                ? 'bg-primaryBlue text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Key size={14} />
            <span>Rent / Lease</span>
          </button>
        </div>
      </div>

      {/* ================= VEHICLES RENDERING ZONE ================= */}
      {filteredMarket.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl border border-dashed border-slate-200 dark:border-white/5 text-center flex flex-col items-center justify-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">No vehicle targets matching current filtered configurations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarket.map((car) => {
            const isWishlisted = wishlistItems.some(item => item.id === car.id);
            return (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-2xl overflow-hidden bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative"
              >
                {/* Asset Image Layer */}
                <div className="relative w-full h-44 bg-slate-100 dark:bg-black/10">
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-black/60 text-[9px] font-bold text-white rounded-md uppercase tracking-wider">
                    {car.category}
                  </span>
                  
                  {/* Dynamic Interactive Heart Vector Hook */}
                  <button 
                    type="button"
                    onClick={() => {
                      toggleWishlistNode(car);
                      toast.success(isWishlisted ? "Removed from Wishlist Vault" : "Added to Wishlist Vault");
                    }}
                    className={`absolute top-3 right-3 z-20 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-sm ${
                      isWishlisted
                        ? 'bg-red-500 border-red-600 text-white'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart size={13} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                </div>

                {/* Specs & Pricing Dynamic Layout block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{car.name}</h4>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-primaryBlue dark:text-accentCyan block">
                          {marketMode === 'BUY' ? `$${car.buyPrice.toLocaleString()}` : `$${car.rentPrice}/day`}
                        </span>
                        {marketMode === 'RENT' && (
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-medium">Fully Insured</span>
                        )}
                      </div>
                    </div>

                    {/* Operational Telemetry Grid specs */}
                    <div className="grid grid-cols-3 gap-2 my-4 text-slate-600 dark:text-gray-400">
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                        <Gauge size={13} className="text-accentCyan" />
                        <span className="text-[10px] font-semibold mt-1">{car.topSpeed}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                        <Battery size={13} className="text-emerald-500" />
                        <span className="text-[10px] font-semibold mt-1">{car.efficiency}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                        <Zap size={13} className="text-amber-500" />
                        <span className="text-[10px] font-semibold mt-1">{car.power}</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Action Handshake Switch Trigger */}
                  <button
                    type="button"
                    onClick={() => handleActionClick(car.name)}
                    className="w-full py-2 bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    {marketMode === 'BUY' ? 'Proceed to Purchase' : 'Book Rental Core'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}