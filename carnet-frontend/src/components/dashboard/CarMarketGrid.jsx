import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Battery, Zap, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Importing context data streams hooks for filtering architecture
import { useCarFilters } from '../../context/FilterContext';

const vehicleData = [
  {
    id: "fleet_p911",
    name: "Porsche 911 Turbo S",
    brand: "PORSCHE",
    category: "Hyper Performance",
    price: 216100, 
    topSpeed: "330 km/h",
    efficiency: "94%",
    power: "650 HP",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fleet_bmwm4",
    name: "BMW M4 Competition",
    brand: "BMW",
    category: "Track Edition",
    price: 78600,
    topSpeed: "290 km/h",
    efficiency: "89%",
    power: "503 HP",
    img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fleet_msplaid",
    name: "Tesla Model S Plaid",
    brand: "TESLA",
    category: "Full Autonomous EV",
    price: 89990,
    topSpeed: "322 km/h",
    efficiency: "99%",
    power: "1020 HP",
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fleet_amgc63",
    name: "Mercedes-AMG C63 S",
    brand: "MERCEDES",
    category: "BiTurbo Luxury",
    price: 81850,
    topSpeed: "280 km/h",
    efficiency: "87%",
    power: "503 HP",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fleet_tataavinya",
    name: "Tata Avinya Concept",
    brand: "TATA",
    category: "Premium EV Core",
    price: 65000,
    topSpeed: "210 km/h",
    efficiency: "96%",
    power: "450 HP",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop" 
  },
  {
    id: "fleet_tatanexon",
    name: "Tata Nexon EV Max",
    brand: "TATA",
    category: "Daily Logistics SUV",
    price: 32000,
    topSpeed: "145 km/h",
    efficiency: "92%",
    power: "143 HP",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
  }
];

export default function CarMarketGrid() {
  const { selectedBrand, searchCarName, budgetRange } = useCarFilters();

  // ================= WORKING DYNAMIC FILTER ALGORITHM =================
  const filteredCars = vehicleData.filter((car) => {
    const matchesBrand = selectedBrand === 'ALL' || car.brand === selectedBrand;
    const matchesSearch = car.name.toLowerCase().includes(searchCarName.toLowerCase());
    const matchesBudget = car.price <= budgetRange;
    return matchesBrand && matchesSearch && matchesBudget;
  });

  const handlePurchaseInit = (carName) => {
    toast.success(`Secure order protocol initiated for ${carName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col border-b border-slate-100 dark:border-white/5 pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Available Fleet Catalog</h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
          Showing {filteredCars.length} models matching active filters
        </p>
      </div>

      {filteredCars.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl text-center flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-white/10">
          <p className="text-xs text-slate-400 dark:text-gray-500">No active vehicle units match your current system parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-2xl overflow-hidden bg-white dark:bg-[#0b1d35]/30 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              <div className="relative w-full h-44 bg-slate-100 dark:bg-black/10">
                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-black/60 text-[10px] font-semibold text-white rounded-md">
                  {car.category}
                </span>
                <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{car.name}</h4>
                    <span className="text-sm font-black text-primaryBlue dark:text-accentCyan">${car.price.toLocaleString()}</span>
                  </div>

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

               
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}