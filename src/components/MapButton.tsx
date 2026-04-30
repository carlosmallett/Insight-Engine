import { motion } from 'motion/react';
import { Map } from 'lucide-react';

interface MapButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export function MapButton({ onClick, isActive }: MapButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className={`px-5 py-3 rounded-2xl backdrop-blur-xl border-2 flex items-center gap-3 transition-all shadow-2xl group ${
          isActive 
            ? 'bg-gradient-to-br from-cyan-500/40 to-blue-600/50 border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.6)] scale-105' 
            : 'bg-gradient-to-br from-slate-900/80 to-blue-950/80 border-blue-500/40 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:from-cyan-500/30 hover:to-blue-600/40 hover:scale-105'
        }`}
      >
        <Map className={`w-6 h-6 transition-colors ${
          isActive ? 'text-cyan-200' : 'text-blue-300 group-hover:text-cyan-200'
        }`} />
        <span className={`text-sm font-medium transition-colors ${
          isActive ? 'text-cyan-100' : 'text-blue-200 group-hover:text-cyan-100'
        }`}>
          World Map
        </span>
      </button>
    </div>
  );
}