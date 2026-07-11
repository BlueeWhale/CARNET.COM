import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Component Framework Layers
import IntroScreen from './intro/IntroScreen';
import Home from './pages/public/Home'; 
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import OtpVerification from './pages/public/OtpVerification';

// Layout Interfaces
import ClientLayout from './layouts/ClientLayout';
import DealerLayout from './layouts/DealerLayout';

export default function App() {
  // Cinematic active state controlling initial AAA splash lifecycle
  const [cinematicActive, setCinematicActive] = useState(true);

  return (
    <Router>
      {/* Global Status Notifications System Engine */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: '#0b1d35', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)'
          } 
        }} 
      />

      <div className="bg-[#071426] min-h-screen text-white antialiased relative overflow-hidden">
        <AnimatePresence mode="wait">
          {cinematicActive ? (
            /* Intro Screen Asset Layer */
            <IntroScreen 
              key="aaa_cinematic" 
              onComplete={() => setCinematicActive(false)} 
            />
          ) : (
            /* Main Application Routing Matrix - Intro khtm hote hi active hoga */
            <Routes key="app_routing_canvas">
              {/* Base path directs premium Home page straight after intro */}
              <Route path="/" element={<Home />} />
              
              {/* Public Surface Terminals */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<OtpVerification />} />

              {/* Client Dashboard Route View Matrix */}
              <Route path="/client/dashboard" element={
                <ClientLayout>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primaryBlue">
                      <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase">Fleet Bookings</h4>
                      <p className="text-3xl font-black font-mono mt-2">04</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-accentCyan">
                      <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase">Escrow Hold</h4>
                      <p className="text-3xl font-black font-mono mt-2">$84,320</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-neonGreen">
                      <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase">Token Security</h4>
                      <p className="text-3xl font-black font-mono mt-2">Active</p>
                    </div>
                  </div>
                </ClientLayout>
              } />

              {/* Commercial Dealer Dashboard Route View Matrix */}
              <Route path="/dealer/dashboard" element={
                <DealerLayout>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-accentCyan">
                      <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase">Total Revenue</h4>
                      <p className="text-2xl font-black font-mono mt-1 text-neonGreen">$142,850</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-primaryBlue">
                      <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase">Fleet Size</h4>
                      <p className="text-2xl font-black font-mono mt-1">18 Vehicles</p>
                    </div>
                  </div>

                  <div className="glass-panel p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center py-16">
                    <p className="text-gray-400 text-sm max-w-md tracking-wide">
                      Commercial enterprise dashboard initialized. Use the sidebar controller matrix to append assets.
                    </p>
                  </div>
                </DealerLayout>
              } />

              {/* 404 Fallback Layer Route - Redirects back to Home node instead of login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}