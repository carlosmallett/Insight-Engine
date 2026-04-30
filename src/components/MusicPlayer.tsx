import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  List,
  Grid3x3,
  Music
} from 'lucide-react';
import { albums, tracks, Album, Track } from '../data/musicData';

interface MusicPlayerProps {
  onClose: () => void;
}

export function MusicPlayer({ onClose }: MusicPlayerProps) {
  const [view, setView] = useState<'albums' | 'tracks'>('albums');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [albumFilter, setAlbumFilter] = useState<Album | null>(null);
  const [expandedAlbum, setExpandedAlbum] = useState<Album | null>(null);

  // Simulate progress for demo
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Auto advance to next track
            handleNextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const handlePlayAlbum = (album: Album) => {
    const albumTracks = tracks.filter(t => t.albumId === album.id);
    if (albumTracks.length > 0) {
      setCurrentTrack(albumTracks[0]);
      setSelectedAlbum(album);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleAlbumClick = (album: Album) => {
    // Toggle expansion: if already expanded, collapse it; otherwise expand this album
    if (expandedAlbum?.id === album.id) {
      setExpandedAlbum(null);
    } else {
      setExpandedAlbum(album);
    }
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    const album = albums.find(a => a.id === track.albumId);
    if (album) setSelectedAlbum(album);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (!currentTrack || !selectedAlbum) return;
    const albumTracks = tracks.filter(t => t.albumId === selectedAlbum.id);
    const currentIndex = albumTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % albumTracks.length;
    setCurrentTrack(albumTracks[nextIndex]);
    setProgress(0);
  };

  const handlePreviousTrack = () => {
    if (!currentTrack || !selectedAlbum) return;
    const albumTracks = tracks.filter(t => t.albumId === selectedAlbum.id);
    const currentIndex = albumTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? albumTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(albumTracks[prevIndex]);
    setProgress(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const filteredAlbums = categoryFilter === 'all' 
    ? albums 
    : albums.filter(a => a.category === categoryFilter);

  // Tracks view shows all tracks unless we're in album filter mode
  const displayedTracks = view === 'tracks' ? tracks : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-[480px] bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden z-40"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
              <Music className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-white font-medium">Music Player</h3>
              <p className="text-white/50 text-xs">Focus & Research Soundscapes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setView('albums')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
              view === 'albums'
                ? 'bg-blue-500/30 border border-blue-400/50 text-white'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="text-sm">Albums</span>
          </button>
          <button
            onClick={() => setView('tracks')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
              view === 'tracks'
                ? 'bg-blue-500/30 border border-blue-400/50 text-white'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm">Tracks</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {['all', 'ambient', 'classical', 'electronic', 'nature'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-500/40 border border-blue-400/60 text-white'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-64 overflow-y-auto custom-scrollbar">
        {view === 'albums' ? (
          <div className="p-4 space-y-3">
            {filteredAlbums.map((album) => {
              const albumTracks = tracks.filter(t => t.albumId === album.id);
              const isExpanded = expandedAlbum?.id === album.id;
              
              return (
                <div
                  key={album.id}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all overflow-hidden"
                >
                  <div className="p-3">
                    <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleAlbumClick(album)}
                    >
                      {/* Album Cover */}
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: album.coverColor }}
                      >
                        <Music className="w-8 h-8 text-white/80" />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      {/* Album Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                          {album.title}
                        </h4>
                        <p className="text-white/60 text-xs">{album.artist}</p>
                        <p className="text-white/40 text-xs mt-1">
                          {album.trackCount} tracks • {album.totalDuration}
                        </p>
                      </div>

                      {/* Play Button */}
                      <div 
                        className="w-10 h-10 rounded-full bg-blue-500/20 group-hover:bg-blue-500/40 border border-blue-400/40 flex items-center justify-center transition-all flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAlbum(album);
                        }}
                      >
                        <Play className="w-5 h-5 text-blue-300 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Tracks List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10 bg-white/5"
                      >
                        <div className="p-3 space-y-1">
                          {albumTracks.map((track, index) => (
                            <div
                              key={track.id}
                              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
                                currentTrack?.id === track.id
                                  ? 'bg-blue-500/20 border border-blue-400/40'
                                  : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                              }`}
                              onClick={() => handlePlayTrack(track)}
                            >
                              <span className="text-white/40 text-xs w-5">{index + 1}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs truncate ${
                                  currentTrack?.id === track.id ? 'text-blue-300' : 'text-white'
                                }`}>
                                  {track.title}
                                </p>
                              </div>
                              <span className="text-white/40 text-xs">{track.duration}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4">
            {/* Album Filter Header */}
            {albumFilter && (
              <div className="mb-3 pb-3 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: albumFilter.coverColor }}
                    >
                      <Music className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{albumFilter.title}</p>
                      <p className="text-white/50 text-xs">{albumFilter.artist}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAlbumFilter(null)}
                    className="text-white/40 hover:text-white text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              {displayedTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    currentTrack?.id === track.id
                      ? 'bg-blue-500/20 border border-blue-400/40'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                  onClick={() => handlePlayTrack(track)}
                >
                  <span className="text-white/40 text-xs w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      currentTrack?.id === track.id ? 'text-blue-300' : 'text-white'
                    }`}>
                      {track.title}
                    </p>
                    <p className="text-white/50 text-xs">{track.artist}</p>
                  </div>
                  <span className="text-white/40 text-xs">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="border-t border-white/20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: selectedAlbum?.coverColor || '#4F46E5' }}
            >
              <Music className="w-6 h-6 text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
              <p className="text-white/60 text-xs truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isShuffle
                    ? 'bg-blue-500/30 text-blue-300'
                    : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                }`}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isRepeat
                    ? 'bg-blue-500/30 text-blue-300'
                    : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                }`}
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousTrack}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handlePlayPause}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 flex items-center justify-center transition-all shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                )}
              </button>
              <button
                onClick={handleNextTrack}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-white/60" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white/60" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer volume-slider"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          cursor: pointer;
        }
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
}