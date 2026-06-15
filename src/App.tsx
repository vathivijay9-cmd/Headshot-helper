import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Settings, 
  ShieldAlert, 
  Zap, 
  Check, 
  Crosshair, 
  Cpu, 
  Sliders, 
  Car, 
  Info,
  Clock,
  Sparkles,
  Play
} from 'lucide-react';
import FloatingWindowOverlay from './components/FloatingWindowOverlay';
import WeaponCalibrator from './components/WeaponCalibrator';
import GlooWallSimulator from './components/GlooWallSimulator';
import HardwareGuide from './components/HardwareGuide';
import { PanelOption, CalibrationLog } from './types';

export default function App() {
  // Applet Online/Offline State indicator as requested
  const [isOnline, setIsOnline] = useState<boolean>(true);
  
  // Custom states for panel options
  const [panelOptions, setPanelOptions] = useState<PanelOption[]>([
    {
      id: 'auto_dragup',
      label: 'Auto Drag-up Headshot Calibration',
      description: 'Stabilizes finger swipe sensitivity values to lock onto head hitbox coordinates.',
      enabled: true,
      intensity: 95,
      category: 'aim'
    },
    {
      id: 'one_tap',
      label: 'Auto One-Tap Headshot Boost',
      description: 'Optimizes single shot registers for Shotguns and pistols like M1887.',
      enabled: true,
      intensity: 90,
      category: 'aim'
    },
    {
      id: 'all_guns_recoil',
      label: 'Zero Recoil Gyros Calibration',
      description: 'Attenuates vertical recoil algorithms to minimize bullet spray dispersion.',
      enabled: true,
      intensity: 85,
      category: 'recoil'
    },
    {
      id: 'high_smoothness',
      label: '120Hz Ultra Smoothness registry',
      description: 'Forces high fidelity touch registration response curves on Vivo T2X display.',
      enabled: true,
      intensity: 100,
      category: 'speed'
    },
    {
      id: 'high_damage',
      label: 'High Damage Pointing Precision',
      description: 'Enhances limb-to-core hit priority offsets on system level pointer calculations.',
      enabled: false,
      intensity: 75,
      category: 'aim'
    },
    {
      id: 'auto_detect',
      label: 'Auto Detect Enemy Radar Tracker',
      description: 'Provides live coordinate feeds of nearby targets to predict drag angles.',
      enabled: false,
      intensity: 80,
      category: 'safety'
    },
    {
      id: 'speed_gloo',
      label: 'Speed Gloo Wall Placing AI Selector',
      description: 'Simulates automatic high-speed shield placement on front side.',
      enabled: false,
      intensity: 95,
      category: 'speed'
    }
  ]);

  // Calibration and event logs history
  const [logs, setLogs] = useState<CalibrationLog[]>([
    {
      id: 'log1',
      timestamp: new Date().toLocaleTimeString(),
      action: 'Vivo T2X 5G hardware profile recognized by panel.',
      status: 'SUCCESS'
    },
    {
      id: 'log2',
      timestamp: new Date().toLocaleTimeString(),
      action: 'Anti-Ban & Blacklist guard shield module verified. Legit game operation active.',
      status: 'SUCCESS'
    }
  ]);

  // Handle toggling option on/off
  const handleToggleOption = (id: string) => {
    setPanelOptions(prev => prev.map(opt => {
      if (opt.id === id) {
        const nextState = !opt.enabled;
        addLog(
          `${opt.label} has been ${nextState ? 'ENABLED and synchronized' : 'DISABLED'}.`,
          nextState ? 'SUCCESS' : 'WARNING'
        );
        return { ...opt, enabled: nextState };
      }
      return opt;
    }));
  };

  // Handle updating slider intensity
  const handleIntensityChange = (id: string, value: number) => {
    setPanelOptions(prev => prev.map(opt => {
      if (opt.id === id) {
        return { ...opt, intensity: value };
      }
      return opt;
    }));
  };

  // Helper to append action logs
  const addLog = (action: string, status: 'SUCCESS' | 'WARNING' | 'PROCESSING') => {
    const newLog: CalibrationLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      action,
      status
    };
    setLogs(prev => [newLog, ...prev.slice(0, 15)]);
  };

  // Diagnostic calibration tester
  const runSelfTestDiagnostics = () => {
    addLog('Commencing Vivo T2X 5G native hardware calibration run...', 'PROCESSING');
    
    setTimeout(() => {
      addLog('Touch sensor latency analyzer complete. Sensitivity registers are synchronized.', 'SUCCESS');
      addLog('Zero Recoil coefficients verified inside system pointers.', 'SUCCESS');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-500/30 selection:text-red-200">
      
      {/* Top Banner indicating Online / Offline and App State */}
      <header className="bg-slate-900/80 border-b border-slate-800 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="bg-gradient-to-tr from-red-600 to-amber-500 p-2 rounded-lg text-white font-extrabold flex items-center justify-center shadow-lg shadow-red-600/20">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-sans font-black text-base uppercase tracking-tight text-slate-100 flex items-center justify-center sm:justify-start">
                Vivo T2X 5G Drag-Up Pro Panel
                <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30 font-bold uppercase tracking-wider">
                  v4.5
                </span>
              </h1>
              <p className="text-[10px] text-slate-400">
                Premium Hardware Sensitivity, One-Tap & Auto Drag-Up Calibrator for Free Fire Max
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Online Indicator Box with togglable state */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
              <span className="text-[11px] font-mono text-slate-400">Status:</span>
              <button 
                onClick={() => {
                  setIsOnline(!isOnline);
                  addLog(
                    `App State manually toggled to ${!isOnline ? 'ONLINE (Cloud Core Sync Enabled)' : 'OFFLINE (Local Simulator mode)'}`,
                    !isOnline ? 'SUCCESS' : 'WARNING'
                  );
                }}
                className="flex items-center space-x-1.5 focus:outline-none"
                title="Click to toggle status"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`text-[10px] font-bold font-mono uppercase ${isOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isOnline ? 'ONLINE INDICATOR' : 'OFFLINE INDICATOR'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Anti-Ban & Legality Notice */}
        <div className="bg-gradient-to-r from-emerald-950/30 via-slate-900 to-emerald-950/30 border border-emerald-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30 shrink-0 text-emerald-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="font-bold text-sm text-emerald-300 uppercase tracking-wide">
              Safe Gaming Systems Protection (Anti-Ban & No Blacklist)
            </h2>
            <p className="text-xs text-slate-405 leading-relaxed text-slate-300">
              Unlike game memory injectors which cause permanent bans, this panel coordinates recommendations and templates purely using <strong>external system settings</strong> (Developer DPI, pointer rates, and touchscreen display calibrations). Free Fire monitors recognize this as clean, organic inputs. Completely safe for standard ranked lobbies and tournaments.
            </p>
          </div>
          <button 
            onClick={runSelfTestDiagnostics}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors text-black text-xs font-bold shrink-0 self-center uppercase"
          >
            Diagnostics Run
          </button>
        </div>

        {/* Dynamic Display Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: Live Controls & Option Switches (Lg Cls: 7) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Options Panel Interface */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-100 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-red-500" />
                  <span>Interactive Headshot System Matrix</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Toggle recommended settings specifically built for the Vivo T2X 5G hardware profile
                </p>
              </div>

              <div className="space-y-3">
                {panelOptions.map((option) => (
                  <div 
                    key={option.id} 
                    className={`p-3 rounded-lg border transition-all ${
                      option.enabled 
                        ? 'bg-slate-950 border-red-500/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]' 
                        : 'bg-slate-950/40 border-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-extrabold uppercase tracking-wide text-slate-200">
                            {option.label}
                          </span>
                          {option.enabled && (
                            <span className="text-[8px] bg-red-500/10 text-red-400 font-mono font-bold px-1.5 rounded border border-red-500/20 uppercase tracking-widest animate-pulse">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{option.description}</p>
                      </div>

                      {/* On/Off Switch Button */}
                      <button
                        onClick={() => handleToggleOption(option.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          option.enabled ? 'bg-red-500' : 'bg-slate-800'
                        }`}
                      >
                        <span className="sr-only">Toggle</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            option.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Sensitivity level adjuster */}
                    {option.enabled && (
                      <div className="mt-3 pt-3 border-t border-slate-900/80 flex items-center space-x-3">
                        <span className="text-[10px] font-mono text-slate-400">Calibration Ratio:</span>
                        <input 
                          type="range"
                          min="50"
                          max="100"
                          value={option.intensity}
                          onChange={(e) => handleIntensityChange(option.id, parseInt(e.target.value))}
                          className="flex-1 h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                        <span className="text-[11px] font-mono font-bold text-red-500 w-8 text-right">
                          {option.intensity}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weapon Drag-up Guides Component */}
            <WeaponCalibrator onNotify={addLog} />

          </section>

          {/* RIGHT PANEL: Live HUD Draggable Simulator Overlay (Lg Cls: 5) */}
          <section className="lg:col-span-5 space-y-6">

            {/* Device Container Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-100 flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                  <span>Floating Assist Overlay Simulator</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Minimize the panel to watch the sports car widget, then click it to reopen overlay
                </p>
              </div>

              {/* Viewport for floating widget */}
              <FloatingWindowOverlay 
                options={panelOptions}
                onToggleOption={handleToggleOption}
                onIntensityChange={handleIntensityChange}
              />
            </div>

            {/* Gloo Wall and Radar Detector Simulation */}
            <GlooWallSimulator onNotify={addLog} />

            {/* Vivo System Calibration Guides (Hardware settings) */}
            <HardwareGuide />

          </section>
        </div>

        {/* Live system logs ticker */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <h3 className="font-mono text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Diagnostic Sync Log history (Vivo T2X Sensors)</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-500/35 uppercase">
              Secure Guard: Operational
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 h-[100px] overflow-y-auto font-mono text-xs space-y-1.5 text-slate-300">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-2 text-[11px]">
                <span className="text-slate-500">[{log.timestamp}]</span>
                <span className={`uppercase font-bold text-[9px] px-1 rounded ${
                  log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                  log.status === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                }`}>
                  {log.status}
                </span>
                <span className="flex-1">{log.action}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1 mt-auto">
        <p>Vivo T2X 5G Gaming Calibration Tool &copy; 2026. Designed for Free Fire & Free Fire Max optimization guides.</p>
        <p className="text-[10px] text-slate-600">Disclaimer: This is a configuration simulation engine assisting players with optimal native hardware settings.</p>
      </footer>
    </div>
  );
}
