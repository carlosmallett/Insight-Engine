import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Paper } from '../data/mockData';

interface TreeButton {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  paper: Paper;
  depth: 'close' | 'far'; // distance from viewer
}

interface InteractiveTreesProps {
  papers: Paper[];
  onPaperClick?: (paper: Paper) => void;
  onTreeButtonClick?: (paper: Paper) => void;
  visible?: boolean;
}

export function InteractiveTrees({ papers, onPaperClick, onTreeButtonClick, visible = true }: InteractiveTreesProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Fixed positions for 4 buttons - load from localStorage to keep user's custom positions
  const defaultPositions = [
    { x: 12, y: 48, depth: 'close' as const }, // Button 1
    { x: 22, y: 52, depth: 'close' as const }, // Button 2
    { x: 88, y: 50, depth: 'close' as const }, // Button 3
    { x: 78, y: 54, depth: 'close' as const }, // Button 4
  ];

  const [buttonPositions] = useState(() => {
    const saved = localStorage.getItem('treeButtonPositions');
    if (saved) {
      const savedPositions = JSON.parse(saved);
      // Keep only the first 4 positions from saved data
      return savedPositions.slice(0, 4).filter((pos: any) => pos.depth === 'close');
    }
    return defaultPositions;
  });

  if (!visible) return null;

  // Only show 4 buttons
  const treeButtons: TreeButton[] = papers.slice(0, 4).map((paper, index) => {
    const position = buttonPositions[index] || defaultPositions[index];
    return {
      id: paper.id,
      x: position.x,
      y: position.y,
      paper: paper,
      depth: position.depth,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {treeButtons.map((button) => (
        <div
          key={button.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${button.x}%`,
            top: `${button.y}%`,
          }}
          onMouseEnter={() => setHoveredButton(button.id)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => {
            if (onPaperClick) {
              onPaperClick(button.paper);
            }
            if (onTreeButtonClick) {
              onTreeButtonClick(button.paper);
            }
          }}
        >
          {button.depth === 'close' ? (
            // Full button for close trees
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                  hoveredButton === button.id
                    ? 'bg-gradient-to-r from-purple-600/95 to-fuchsia-600/95 border border-purple-300/60 shadow-[0_0_25px_rgba(168,85,247,0.9),0_0_15px_rgba(217,70,239,0.6)] scale-110'
                    : 'bg-gradient-to-br from-slate-950/80 to-indigo-950/80 border border-purple-400/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Paper icon */}
                <div className={`p-1 rounded-full transition-all duration-300 ${
                  hoveredButton === button.id
                    ? 'bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                    : 'bg-purple-500/30 text-purple-200'
                }`}>
                  <FileText className="w-3.5 h-3.5" />
                </div>
                
                {/* Paper title (visible on hover) */}
                {hoveredButton === button.id && (
                  <div className="max-w-[180px]">
                    <p className="text-white text-[11px] font-light truncate tracking-wide">
                      {button.paper.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Tooltip with more info */}
              {hoveredButton === button.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 z-50">
                  <div className="bg-gradient-to-br from-slate-950/95 to-indigo-950/95 backdrop-blur-md border border-purple-400/40 rounded-lg p-2.5 shadow-[0_0_30px_rgba(168,85,247,0.5),0_0_15px_rgba(79,70,229,0.3)]">
                    <p className="text-white text-[11px] mb-1 font-light leading-tight">{button.paper.title}</p>
                    <p className="text-purple-300 text-[9px] mb-1 font-light">{button.paper.authors}</p>
                    <p className="text-fuchsia-400/80 text-[9px] mb-1 font-light">{button.paper.category}</p>
                    <p className="text-gray-300 text-[9px] line-clamp-2 font-light leading-tight">{button.paper.abstract}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}