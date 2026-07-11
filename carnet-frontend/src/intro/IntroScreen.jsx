import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import CyberRoad from './components/CyberRoad';
import SimulatedCar from './components/SimulatedCar';
import { audioSystem } from './utils/SoundManager';

export default function IntroScreen({ onComplete }) {
  const [introPhase, setIntroPhase] = useState('BOOT'); // BOOT -> GENERATION -> SPEED -> REVEAL -> COMPLETION
  const [bootProgress, setBootProgress] = useState(0);
  const [velocity, setVelocity] = useState(0.2);

  useEffect(() => {
    if (introPhase === 'BOOT') {
      const progressInterval = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIntroPhase('GENERATION');
              audioSystem.playOscillatorSequence('boot');
            }, 500);
            return 100;
          }
          return prev + 4;
        });
      }, 50);
      return () => clearInterval(progressInterval);
    }

    if (introPhase === 'GENERATION') {
      setTimeout(() => {
        setIntroPhase('SPEED');
        setVelocity(2.8);
        audioSystem.playEngineHum(3.5);
        audioSystem.playOscillatorSequence('turbo', 0.4, 0.2);
      }, 3000);
    }

    if (introPhase === 'SPEED') {
      setTimeout(() => {
        setIntroPhase('REVEAL');
        audioSystem.playOscillatorSequence('success', 0.6, 0.15);
      }, 4000);
    }

    if (introPhase === 'REVEAL') {
      setTimeout(() => {
        setIntroPhase('COMPLETION');
        if (onComplete) onComplete();
      }, 3500);
    }
  }, [introPhase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030914] overflow-hidden select-none font-sans">
      
      {/* LAYER 1: THREE.JS 3D CORE COMPOSER ENGINE */}
      {introPhase !== 'BOOT' && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
            <color attach="background" args={['#030914']} />
            <ambientLight intensity={0.15} />
            
            {/* Environmental Tech Scenery configurations */}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={2} />
            <Sky azimuth={0.25} turbidity={10} rayleigh={2} inclination={0.48} distance={450000} />
            
            {/* Functional Core Mesh nodes */}
            <CyberRoad />
            <SimulatedCar velocityFactor={velocity} />

            <OrbitControls 
              enableZoom={false} 
              maxPolarAngle={Math.PI / 2 - 0.05} 
              autoRotate={introPhase === 'REVEAL'}
              autoRotateSpeed={4.0}
            />

            {/* Premium Cinema Post Processing Filters Overlay */}
            <EffectComposer>
              <Bloom intensity={1.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
              <ChromaticAberration offset={[0.0015, 0.0015]} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        </div>
      )}

      {/* LAYER 2: INTERACTIVE DATA HEADS UP UI INTERFACES */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        
        {/* Upper Stream Analytics Nodes */}
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-accentCyan font-mono">NODE // CARNET_CORE_SYSTEM_v4.2</p>
            <p className="text-xs text-gray-500 font-mono uppercase mt-1">STATUS: {introPhase}</p>
          </div>
          <div className="text-right font-mono text-[10px] text-gray-400 space-y-0.5">
            <p>LATENCY // 12ms</p>
            <p>RENDER ENGINE // WEBGL_60FPS</p>
          </div>
        </div>

        {/* Dynamic Center Stage Content Matrix based on Workflow phases */}
        <div className="w-full flex flex-col items-center justify-center flex-1 text-center">
          <AnimatePresence mode="wait">
            
            {/* UI Phase 1: Boot Matrix Console */}
            {introPhase === 'BOOT' && (
              <motion.div key="boot_ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 max-w-xs w-full">
                <h3 className="text-xs font-bold font-mono tracking-[0.4em] text-white uppercase">CARNET AI INITIALIZING</h3>
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                  <div className="h-full bg-primaryBlue shadow-neonGlow transition-all duration-75" style={{ width: `${bootProgress}%` }} />
                </div>
                <p className="text-[11px] font-mono text-accentCyan tracking-widest">{bootProgress}% CONNECTED</p>
              </motion.div>
            )}

            {/* UI Phase 2: Ramping Acceleration Notification */}
            {introPhase === 'SPEED' && (
              <motion.div key="speed_ui" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-glassGlow">
                <p className="text-[10px] font-mono font-bold tracking-[0.5em] text-neonRed uppercase animate-pulse">WARP ACCELERATION PROTOCOL ENGAGED</p>
              </motion.div>
            )}

            {/* UI Phase 3: Ultimate Brand Finale Blueprint Reveal */}
            {introPhase === 'REVEAL' && (
              <motion.div key="reveal_ui" initial={{ opacity: 0, z: -200 }} animate={{ opacity: 1, z: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="space-y-3">
                <h1 className="text-6xl md:text-8xl font-black tracking-[0.3em] text-white drop-shadow-[0_0_40px_rgba(37,99,235,0.65)]">
                  CARNET<span className="text-accentCyan font-light">.COM</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm tracking-[0.55em] uppercase font-semibold">DRIVE THE FUTURE</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Lower Terminal Sync Trackers */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono text-gray-500">
          <p>© 2026 CARNET AUTOMOTIVE INC.</p>
          <p>ALL SYSTEMS OPERATIONAL</p>
        </div>

      </div>

      {/* LAYER 3: CINEMATIC BLUE ENVELOPE WAVE GLASS SHIELD TRANSITION */}
      <AnimatePresence>
        {introPhase === 'REVEAL' && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 2.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-gradient-to-t from-primaryBlue/40 via-carnetBg/90 to-carnetBg z-40 backdrop-blur-2xl"
          />
        )}
      </AnimatePresence>

    </div>
  );
}