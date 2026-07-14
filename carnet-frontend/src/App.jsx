import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Component Layers Setup
import IntroScreen from './intro/IntroScreen';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import OtpVerification from './pages/public/OtpVerification';

// Layout Interfaces
import ClientLayout from './layouts/ClientLayout';
import DealerLayout from './layouts/DealerLayout';

// Core State Providers Matrix Import
import { FilterProvider } from './context/FilterContext';
import { RentalProvider } from './context/RentalContext';
import { WishlistProvider } from './context/WishlistContext'; // CRITICAL FIX IMPORT

// Pages Components
import ClientDashboardHome from './components/dashboard/ClientDashboardHome';
import FleetMarket from './pages/client/FleetMarket';
import VehicleDetails from './pages/client/VehicleDetails';
import RentalDetails from './pages/client/RentalDetails';
import MyRentals from './pages/client/MyRentals';
import MyWishlist from './pages/client/MyWishlist'; // Wishlist Screen Link

export default function App() {
  const [cinematicActive, setCinematicActive] = useState(true);

  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: '#0b1d35', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.08)' 
          } 
        }} 
      />

      <div className="bg-[#071426] min-h-screen text-white antialiased">
        <AnimatePresence mode="wait">
          {cinematicActive ? (
            <IntroScreen key="aaa_cinematic" onComplete={() => setCinematicActive(false)} />
          ) : (
            /* CONFIGURATION PIPELINE: Wrapping all global state layers seamlessly */
            <FilterProvider>
              <RentalProvider>
                <WishlistProvider> {/* FIX LAYER BOUND HERE */}
                  <Router key="app_routing_canvas">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/verify-otp" element={<OtpVerification />} />

                      {/* Client Layout with Full Ecosystem Dashboard Framework */}
                      <Route path="/client/dashboard" element={
                        <ClientLayout>
                          <ClientDashboardHome />
                        </ClientLayout>
                      } />

                      <Route path="/client/buy" element={
                        <ClientLayout>
                          <FleetMarket />
                        </ClientLayout>
                      } />

                      <Route path="/client/vehicle-details" element={
                        <ClientLayout>
                          <VehicleDetails />
                        </ClientLayout>
                      } />

                      <Route path="/client/rental-details" element={
                        <ClientLayout>
                          <RentalDetails />
                        </ClientLayout>
                      } />

                      <Route path="/client/rentals" element={
                        <ClientLayout>
                          <MyRentals />
                        </ClientLayout>
                      } />

                      <Route path="/client/wishlist" element={
                        <ClientLayout>
                          <MyWishlist />
                        </ClientLayout>
                      } />

                      <Route path="/dealer/dashboard" element={
                        <DealerLayout>
                          <div className="glass-panel p-8 rounded-2xl border border-dashed border-white/10 flex text-center py-16 justify-center">
                            <p className="text-gray-400 text-sm max-w-md tracking-wide">Dealer Terminal Active Node.</p>
                          </div>
                        </DealerLayout>
                      } />

                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Router>
                </WishlistProvider>
              </RentalProvider>
            </FilterProvider>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}