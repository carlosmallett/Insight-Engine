import { motion } from 'motion/react';
import { Search, GitBranch, Network } from 'lucide-react';

interface HUDProps {
  activeMode: 'search' | 'bisociation' | 'polyassociation' | null;
  onModeChange: (mode: 'search' | 'bisociation' | 'polyassociation' | null) => void;
}

export function HUD({ activeMode, onModeChange }: HUDProps) {
  const modes = [
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'bisociation' as const, label: 'Bisociation', icon: GitBranch },
    { id: 'polyassociation' as const, label: 'Poly-Association', icon: Network },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 pointer-events-auto"
        >
          <div className="flex items-center gap-6">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(activeMode === mode.id ? null : mode.id)}
                className="relative px-5 py-2 text-white/80 hover:text-white transition-colors group"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <mode.icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </div>
                
                {activeMode === mode.id && (
                  <motion.div
                    layoutId="activeMode"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
