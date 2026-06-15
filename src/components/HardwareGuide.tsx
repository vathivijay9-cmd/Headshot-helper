import React from 'react';
import { Smartphone, Percent, ShieldCheck, Zap, ToggleLeft } from 'lucide-react';

export default function HardwareGuide() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
        <Smartphone className="w-6 h-6 text-cyan-400" />
        <div>
          <h3 className="font-sans font-bold text-lg text-slate-100">Vivo T2X 5G Hardware Tuning</h3>
          <p className="text-xs text-slate-400">Apply these safe, native device configurations to unlock peak smoothness & perfect aim alignment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pointer Speed Setting */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h4 className="font-semibold text-sm text-slate-200">1. Maximized Pointer Speed</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Go to <strong className="text-slate-300">Settings &gt; System &gt; Languages & Input &gt; Pointer Speed</strong>. 
            Drag the slider to maximum. This boosts raw touch registry speed, accelerating your drag-up response rate.
          </p>
        </div>

        {/* DPI Developer Options */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2">
            <Percent className="w-4 h-4 text-emerald-400" />
            <h4 className="font-semibold text-sm text-slate-200">2. Developer DPI (Smallest Width)</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enable Developer Options first. Go to <strong className="text-slate-300">Smallest Width (DPI)</strong>. 
            Set to <strong className="text-cyan-400">490 - 510 DPI</strong> (Default is ~384). 
            Warning: Raising it past 540 may cause font scaling issues. Keep it within 510 DPI for the optimal zero-recoil balance on Vivo.
          </p>
        </div>

        {/* High Refresh Rate */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-red-400" />
            <h4 className="font-semibold text-sm text-slate-200">3. 120Hz Fast Screen Refresh</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Navigate to <strong className="text-slate-300">Settings &gt; Display & Brightness &gt; Screen Refresh Rate</strong>. 
            Force set it explicitly to <strong className="text-red-400">120Hz</strong> instead of Smart Switch to maximize weapon transition fluidity.
          </p>
        </div>

        {/* Ultra Game Mode Vivo */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-sm text-slate-200">4. Ultra Game Mode Settings</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Open the Vivo Ultra Game Mode sidebar. Set the Performance Profile to <strong className="text-red-400">Boost Mode</strong>.
            Enable "Touch Sensitivity Booster" and adjust the touch response curves for Free Fire Max to high.
          </p>
        </div>
      </div>

      <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-lg flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-red-300">100% Anti-Ban Guarantee & Security</h5>
          <p className="text-[11px] text-slate-405 leading-relaxed text-slate-300">
            Because this panel calibrates your internal device sensitivities, hardware triggers, and recommended pointer coefficients, 
            it interacts entirely outside of Free Fire's client memory. Game servers recognize all actions as 100% human inputs keeping you totally safe from report blacklists.
          </p>
        </div>
      </div>
    </div>
  );
}
