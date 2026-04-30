interface MusicPlayerButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

// Alternative 3: Waveform visualization style
export function MusicPlayerButton_Alt3({ onClick, isActive }: MusicPlayerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
        isActive ? 'bg-white/10' : ''
      }`}
      title="Music Player"
    >
      {/* Waveform bars */}
      <div className="flex items-center gap-0.5 h-6">
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-3 bg-white' : 'h-2 bg-white/60'
        }`} />
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-5 bg-white' : 'h-4 bg-white/60'
        }`} />
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-4 bg-white' : 'h-3 bg-white/60'
        }`} />
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-6 bg-white' : 'h-5 bg-white/60'
        }`} />
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-3 bg-white' : 'h-2 bg-white/60'
        }`} />
        <div className={`w-1 rounded-full transition-all duration-300 ${
          isActive ? 'h-5 bg-white' : 'h-4 bg-white/60'
        }`} />
      </div>
    </button>
  );
}