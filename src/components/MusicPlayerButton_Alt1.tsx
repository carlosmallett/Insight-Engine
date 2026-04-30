import { Music } from 'lucide-react';

interface MusicPlayerButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

// Alternative 1: Simple musical note icon
export function MusicPlayerButton_Alt1({ onClick, isActive }: MusicPlayerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
        isActive ? 'bg-white/10' : ''
      }`}
      title="Music Player"
    >
      <Music className="w-6 h-6 text-white" />
    </button>
  );
}