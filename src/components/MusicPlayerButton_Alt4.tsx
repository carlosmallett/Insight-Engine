interface MusicPlayerButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

// Alternative 4: Vinyl record / disc style
export function MusicPlayerButton_Alt4({ onClick, isActive }: MusicPlayerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
        isActive ? 'bg-white/10' : ''
      }`}
      title="Music Player"
    >
      {/* Vinyl disc icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-white transition-all duration-300 ${isActive ? 'animate-spin-slow' : ''}`}
      >
        {/* Outer circle */}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        {/* Middle circle */}
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.5" />
        {/* Inner circle (center hole) */}
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        {/* Grooves */}
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      </svg>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </button>
  );
}