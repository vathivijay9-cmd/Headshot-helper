import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Target, 
  Eye, 
  Zap, 
  Send, 
  Timer, 
  Sparkles,
  RefreshCw 
} from 'lucide-react';

interface GlooWallSimulatorProps {
  onNotify: (message: string, status: 'SUCCESS' | 'WARNING' | 'PROCESSING') => void;
}

export default function GlooWallSimulator({ onNotify }: GlooWallSimulatorProps) {
  const [enemyFound, setEnemyFound] = useState(false);
  const [glooPlaced, setGlooPlaced] = useState(false);
  const [glooSpeed, setGlooSpeed] = useState<string>('0.00s');
  const [coordinateScan, setCoordinateScan] = useState<string>('00.0, 00.0');

  // Trigger simulated enemy radar auto detect
  const handleAutoDetect = () => {
    setEnemyFound(true);
    const randomLat = (Math.random() * 10 + 24).toFixed(3);
    const randomLng = (Math.random() * 10 + 82).toFixed(3);
    setCoordinateScan(`${randomLat}° N, ${randomLng}° E`);
    onNotify('Auto Detect Enemy: Locking on target coordinates at 12.5 meters front.', 'SUCCESS');
  };

  // Trigger simulated super fast speed Gloo Wall placement on enemy front side
  const handleGlooPlacement = () => {
    if (!enemyFound) {
      onNotify('Ensure enemy is auto-detected first to calculate the optimal front placement angle!', 'WARNING');
      return;
    }
    setGlooPlaced(true);
    // Random microseconds speed for ultimate gameplay satisfaction
    const randomSpeed = (0.09 + Math.random() * 0.05).toFixed(3);
    setGlooSpeed(`${randomSpeed}s`);
    onNotify(`Tactical Front Gloo Wall deployed in ${randomSpeed}s!`, 'SUCCESS');
  };

  const handleReset = () => {
    setEnemyFound(false);
    setGlooPlaced(false);
    setGlooSpeed('0.00s');
    setCoordinateScan('00.0, 00.0');
    onNotify('Simulator reset successfully.', 'PROCESSING');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-100">Tactical AI Radar & Gloo Wall</h3>
            <p className="text-xs text-slate-400">Preview enemy auto-locking and ultra fast defensive shield layouts</p>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
          title="Reset Simulator"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Interactive Tactical Grid Display Area */}
        <div className="bg-slate-950 rounded-lg border border-slate-850 p-4 h-[240px] relative overflow-hidden flex flex-col justify-between">
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          {/* Radar Sweep Animation (If searching) */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/5 to-transparent h-20 w-full top-0 left-0 animate-bounce pointer-events-none" />

          {/* Radar Header Info */}
          <div className="flex items-center justify-between z-10 text-[9px] font-mono text-cyan-400">
            <span>HUD SECTOR FEED #4</span>
            <span className="animate-pulse">COORDS: {coordinateScan}</span>
          </div>

          {/* Output Center Display */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 z-10">
            <AnimatePresence>
              {enemyFound && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="relative text-center"
                >
                  {/* Glowing Target Ring */}
                  <div className="w-16 h-16 border-2 border-dashed border-red-500 rounded-full flex items-center justify-center animate-spin-slow">
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                  {/* Radar Lock Labels */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded shadow">
                    RED_LOCK
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 block mt-2 font-bold uppercase">
                    ENEMY HEAD: 12.5M
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {glooPlaced && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 10 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
                >
                  {/* Glowing tactical wall simulation representation */}
                  <div className="bg-gradient-to-r from-cyan-500/35 via-cyan-400/50 to-cyan-500/35 border-2 border-cyan-400/80 w-36 h-8 rounded-t-xl shadow-[0_-5px_15px_rgba(0,242,254,0.4)] flex items-center justify-center">
                    <Shield className="w-4 h-4 text-cyan-200 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-cyan-300 block mt-1 uppercase">
                    FRONT SHIELD INSTALLED
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!enemyFound && !glooPlaced && (
              <div className="text-center space-y-1">
                <p className="text-xs text-slate-500">SYSTEM IDLE</p>
                <p className="text-[10px] text-slate-600">Locked to Vivo Hardware Accelerometers</p>
              </div>
            )}
          </div>

          {/* Radar Footer Info */}
          <div className="flex items-center justify-between z-10 text-[9px] font-mono text-slate-500">
            <span>ZOOM: 2X</span>
            <span>VELOCITY STATE: STATIC</span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-slate-200">Interactive Simulation Triggers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the fast AI algorithms. Standard players take over 0.5s to spot and plant a wall; 
              Vivo hardware boosts this deployment into a single combined micro-tick touch tap!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Auto Detect Button */}
            <button
              onClick={handleAutoDetect}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border text-xs font-bold uppercase transition-all ${
                enemyFound 
                  ? 'bg-red-950/40 border-red-500/40 text-red-400 hover:bg-slate-900' 
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{enemyFound ? 'Recalculating AI Lock' : 'Detect Enemy Center'}</span>
            </button>

            {/* Gloo Wall Pin Button */}
            <button
              onClick={handleGlooPlacement}
              disabled={!enemyFound}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border text-xs font-bold uppercase transition-all ${
                glooPlaced 
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400' 
                  : enemyFound
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold border-transparent hover:opacity-90 shadow-[0_4px_12px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-950 border-slate-900 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Deploy Speed Gloo</span>
            </button>
          </div>

          {enemyFound && (
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">LOCK STATUS</span>
                <strong className="text-red-500 font-mono text-xs uppercase animate-pulse">STICKING ACTIVE</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">PLANT RESPONSE TIME</span>
                <strong className="text-cyan-400 font-mono text-xs">{glooSpeed}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
