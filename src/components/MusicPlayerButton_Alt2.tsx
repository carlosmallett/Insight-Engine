interface MusicPlayerButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

// Alternative 2: Musical staff with note (custom SVG design)
export function MusicPlayerButton_Alt2({ onClick, isActive }: MusicPlayerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
        isActive ? 'bg-white/10' : ''
      }`}
      title="Music Player"
    >
      {/* Custom musical staff icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        {/* Staff lines */}
        <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="0.5" />
        <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" />
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="0.5" />
        <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="0.5" />
        <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Musical note */}
        <circle cx="10" cy="14" r="2" fill="currentColor" />
        <line x1="12" y1="14" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6 L16 8 L16 10 L12 8 Z" fill="currentColor" />
      </svg>
    </button>
  );
}