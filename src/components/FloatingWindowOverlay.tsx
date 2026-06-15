import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Settings2, 
  Eye, 
  Zap, 
  ShieldAlert, 
  X, 
  Check, 
  Crosshair, 
  Minimize2, 
  Maximize2,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { PanelOption } from '../types';

interface FloatingWindowOverlayProps {
  options: PanelOption[];
  onToggleOption: (id: string) => void;
  onIntensityChange: (id: string, value: number) => void;
}

export default function FloatingWindowOverlay({
  options,
  onToggleOption,
  onIntensityChange
}: FloatingWindowOverlayProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle simulated dragging within the game frame
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid dragging when clicking inside interactive elements like switches or input sliders
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('svg') && !target.classList.contains('drag-trigger')) {
      return;
    }
    setIsDragging(true);
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - position.x,
      y: e.clientY - rect.top - position.y
    });
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    
    // Bounds limit relative to parent
    let newX = e.clientX - parentRect.left - dragOffset.x;
    let newY = e.clientY - parentRect.top - dragOffset.y;
    
    // Constrain inside simulated phone (width 100%, height 500px approx)
    newX = Math.max(10, Math.min(newX, parentRect.width - (isMinimized ? 70 : 310)));
    newY = Math.max(10, Math.min(newY, parentRect.height - (isMinimized ? 70 : 420)));
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="relative w-full h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-end"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Background Simulating Gameplay */}
      <div className="absolute inset-0 bg-radial-gradient from-slate-900 via-slate-950 to-black select-none overflow-hidden">
        {/* Sky gradient background aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-40 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Tactical grid simulating scope calibration */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Crosshair watermark in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 flex flex-col items-center">
          <Crosshair className="w-16 h-16 text-red-500 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-slate-400 mt-2">VIVO ENGINE CALIBRATING</span>
        </div>

        {/* Dummy enemy simulated boxes */}
        <div className="absolute top-24 left-1/4 text-center">
          <div className="border border-red-500 bg-red-500/10 rounded px-2 py-0.5 animate-bounce">
            <span className="text-[9px] font-mono font-bold text-red-400">ENEMY: 18m [HEAD]</span>
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-2 animate-ping" />
        </div>

        <div className="absolute top-36 right-1/4 text-center">
          <div className="border border-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
            <span className="text-[9px] font-mono font-bold text-cyan-300">GLOO WALL PLACED</span>
          </div>
          <div className="w-32 h-6 border-b-2 border-cyan-400/80 bg-cyan-500/10 rounded-t-lg mx-auto mt-2" />
        </div>

        {/* Simulated Game Controls in background */}
        <div className="absolute bottom-6 right-6 flex items-center justify-center w-16 h-16 rounded-full border border-slate-700/60 bg-slate-800/30 text-white font-bold text-xs select-none">
          GLOO
        </div>
        <div className="absolute bottom-6 left-6 flex items-center justify-center w-14 h-14 rounded-full border border-slate-700/60 bg-slate-800/30 text-white text-[10px] uppercase select-none">
          DODGE
        </div>

        {/* UI Overlay Indicators */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-slate-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-slate-300 font-bold">VIVO T2X HUD SENSITIVITY CALIBRATOR BY AUTO-DRAG</span>
        </div>
      </div>

      {/* Floating Panel Container */}
      <div 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className="absolute z-50 select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* MINIMIZED: CAR LOGO AS requested */
            <motion.div
              key="minimized-car"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={() => setIsMinimized(false)}
              className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-600 via-pink-600 to-amber-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.7)] cursor-pointer hover:brightness-110 active:scale-95 transition-all p-3"
            >
              <Car className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-spin-once" />
              
              {/* Pulsing halo ring */}
              <div className="absolute -inset-1 rounded-full border-2 border-red-500/50 animate-ping opacity-75 pointer-events-none" />
              
              <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-[7px] font-extrabold px-1 rounded-full uppercase border border-white">
                LIVE
              </span>
              
              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 bg-slate-900 border border-slate-800 text-[9px] font-mono font-bold text-red-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Click HUD Panel
              </div>
            </motion.div>
          ) : (
            /* EXPANDED: MINI FLOATING WINDOW OVERLAY WITH OPTIONS AND ON/OFF BUTTONS */
            <motion.div
              id="car-floating-panel"
              key="expanded-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[290px] h-[340px] bg-slate-950/95 backdrop-blur-md rounded-xl border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 px-3 py-2 border-b border-red-500/40 flex items-center justify-between drag-trigger">
                <div className="flex items-center space-x-1.5 pointer-events-none">
                  <Car className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold font-mono text-red-400 tracking-wider">VIVO PRO v4.2 PANEL</span>
                </div>
                
                <div className="flex items-center space-x-1.5">
                  <button 
                    onClick={() => setIsMinimized(true)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    title="Minimize to Car Logo"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Toggles Container */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 custom-scrollbar">
                <div className="flex items-center justify-between bg-slate-900/60 p-1.5 rounded border border-slate-800 text-[10px]">
                  <span className="font-bold text-slate-300">Device ID: Vivo T2X 5G</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold uppercase animate-pulse border border-emerald-500/30">
                    Auto-Configured
                  </span>
                </div>

                {options.map((option) => {
                  const Icon = option.category === 'aim' ? Crosshair : 
                               option.category === 'recoil' ? Sliders : 
                               option.category === 'speed' ? Zap : Sparkles;
                  return (
                    <div 
                      key={option.id} 
                      className={`p-2 rounded-lg border transition-all ${
                        option.enabled 
                          ? 'bg-slate-900 border-red-500/30 shadow-[inset_0_0_10px_rgba(239,68,68,0.15)]' 
                          : 'bg-slate-950/60 border-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-3.5 h-3.5 ${option.enabled ? 'text-red-500' : 'text-slate-400'}`} />
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-200 uppercase tracking-tight">{option.label}</h4>
                            <p className="text-[8px] text-slate-400 max-w-[150px] leading-tight leading-3">{option.description}</p>
                          </div>
                        </div>

                        {/* On / Off Button */}
                        <button
                          onClick={() => onToggleOption(option.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            option.enabled ? 'bg-red-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              option.enabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Intensity Slider (Applies only when Enabled) */}
                      {option.enabled && (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center space-x-2">
                          <span className="text-[8px] font-mono text-slate-400 w-12">Intensity:</span>
                          <input 
                            type="range"
                            min="50"
                            max="100"
                            value={option.intensity}
                            onChange={(e) => onIntensityChange(option.id, parseInt(e.target.value))}
                            className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                          />
                          <span className="text-[8px] font-mono font-bold text-red-500 w-6 text-right">
                            {option.intensity}%
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status Footer */}
              <div className="bg-slate-900 border-t border-slate-800/80 p-2 flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-1" />
                  <span>NATIVE ENGINE: ONLINE</span>
                </span>
                <span className="text-emerald-400 font-bold">100% SECURE LEGIT</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Interactive Guide Panel Info */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1 text-right max-w-[120px] pointer-events-none opacity-80">
        <span className="text-[8px] font-mono text-slate-400">TARGET OFFSET</span>
        <span className="text-[9px] font-mono text-red-500 font-extrabold tracking-wider">0.00ms DRAGUP</span>
        <span className="text-[8px] font-mono text-slate-400">RECOIL COEFFICIENT</span>
        <span className="text-[9px] font-mono text-cyan-400 font-extrabold tracking-wider">0% ABSOLUTE</span>
      </div>

      {/* Floating window instructional banner */}
      <div className="w-full bg-slate-900/90 backdrop-blur p-2 border-t border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <p className="text-[10px] text-slate-300">
            <strong>Interactive Simulation Stage:</strong> Drag the logo <strong>anywhere</strong> inside the gameplay layout above!
          </p>
        </div>
      </div>
    </div>
  );
}
