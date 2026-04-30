import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Paper, papers } from '../data/mockData';

interface InteractivePapersProps {
  searchQuery: string;
  onPaperClick: (paper: Paper) => void;
  selectedPaper: Paper | null;
  mode: 'search' | 'bisociation' | 'polyassociation' | null;
}

// Predefined positions for papers in the forest view (percentage-based for responsive)
const defaultPaperPositions = [
  { id: 'paper1', x: 60, y: 55 }, // Attention Schema Theory area
  { id: 'paper2', x: 45, y: 50 },
  { id: 'paper3', x: 50, y: 48 },
  { id: 'paper4', x: 35, y: 45 }, // Brain Imaging area
  { id: 'paper5', x: 40, y: 48 },
  { id: 'paper6', x: 25, y: 52 },
  { id: 'paper7', x: 30, y: 50 },
  { id: 'paper8', x: 70, y: 58 },
  { id: 'paper9', x: 75, y: 55 },
  { id: 'paper10', x: 20, y: 55 },
  { id: 'paper11', x: 65, y: 52 },
  { id: 'paper12', x: 55, y: 60 },
];

export function InteractivePapers({ searchQuery, onPaperClick, selectedPaper, mode }: InteractivePapersProps) {
  // Load positions from localStorage or use defaults
  const [paperPositions, setPaperPositions] = useState(() => {
    const saved = localStorage.getItem('paperPositions');
    return saved ? JSON.parse(saved) : defaultPaperPositions;
  });

  const [draggingPaper, setDraggingPaper] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragIntent, setIsDragIntent] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('paperPositions', JSON.stringify(paperPositions));
  }, [paperPositions]);

  const handleMouseDown = (e: React.MouseEvent, paperId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const position = paperPositions.find(p => p.id === paperId);
    if (!position) return;

    const rect = e.currentTarget.getBoundingClientRect();
    
    setDraggingPaper(paperId);
    setIsDragIntent(false);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Prevent context menu on right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!draggingPaper) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Check if user has moved mouse more than 5 pixels (indicates drag intent)
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.x, 2) + 
        Math.pow(e.clientY - dragStartPos.y, 2)
      );
      
      if (distance > 5) {
        setIsDragIntent(true);
      }

      const container = document.getElementById('paper-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

      setPaperPositions(prev =>
        prev.map(p =>
          p.id === draggingPaper
            ? { ...p, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
            : p
        )
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Only trigger click if user didn't drag
      if (!isDragIntent && draggingPaper) {
        const paper = papers.find(p => p.id === draggingPaper);
        if (paper) {
          onPaperClick(paper);
        }
      }
      setDraggingPaper(null);
      setIsDragIntent(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingPaper, dragOffset, dragStartPos, isDragIntent, onPaperClick]);

  // Filter papers based on search
  const filteredPapers = searchQuery
    ? papers.filter(paper =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : papers;

  const filteredIds = new Set(filteredPapers.map(p => p.id));

  return (
    <div id="paper-container" className="absolute inset-0 pointer-events-none" style={{ display: 'none' }}>
      {papers.map((paper) => {
        const position = paperPositions.find(p => p.id === paper.id);
        if (!position) return null;

        const isVisible = filteredIds.has(paper.id);
        const isSelected = selectedPaper?.id === paper.id;
        const isDragging = draggingPaper === paper.id;
        const opacity = searchQuery && !isVisible ? 0.2 : 1;

        return (
          <motion.div
            key={paper.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: isDragging ? 'grabbing' : 'pointer',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isSelected ? 1.3 : 1, 
              opacity: opacity 
            }}
            whileHover={{ scale: isSelected ? 1.4 : 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onMouseDown={(e) => handleMouseDown(e, paper.id)}
              onContextMenu={handleContextMenu}
              className="relative group"
            >
              {/* Main orb */}
              <div className={`w-4 h-4 rounded-full ${
                isSelected 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                  : 'bg-purple-500 shadow-lg shadow-purple-500/50'
              } ${isDragging ? 'ring-2 ring-yellow-400' : ''}`}>
                {/* Pulse animation */}
                <div className={`absolute inset-0 rounded-full animate-ping ${
                  isSelected ? 'bg-cyan-400' : 'bg-purple-500'
                } opacity-30`} />
              </div>

              {/* Glow effect */}
              {(isSelected || searchQuery && isVisible) && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    isSelected ? 'bg-cyan-400' : 'bg-purple-400'
                  } blur-xl`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Hover tooltip */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-black/80 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 whitespace-nowrap max-w-xs">
                  <p className="text-white text-xs truncate">{paper.title}</p>
                  <p className="text-white/50 text-xs mt-1">{paper.category}</p>
                  <p className="text-yellow-400 text-xs mt-1 italic">Click & drag to move</p>
                </div>
              </div>
            </button>

            {/* Connection lines for poly-association mode */}
            {mode === 'polyassociation' && isSelected && paper.relatedPapers.length > 0 && (
              <>
                {paper.relatedPapers.slice(0, 5).map((relatedId) => {
                  const relatedPos = paperPositions.find(p => p.id === relatedId);
                  if (!relatedPos) return null;

                  // Calculate line between points
                  const dx = relatedPos.x - position.x;
                  const dy = relatedPos.y - position.y;
                  const length = Math.sqrt(dx * dx + dy * dy);
                  const angle = Math.atan2(dy, dx);

                  return (
                    <div
                      key={relatedId}
                      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left pointer-events-none opacity-60"
                      style={{
                        width: `${length}vw`,
                        transform: `rotate(${angle}rad)`,
                      }}
                    />
                  );
                })}</>
            )}

            {/* Single connection for bisociation mode */}
            {mode === 'bisociation' && isSelected && paper.relatedPapers.length > 0 && (
              <>
                {(() => {
                  const relatedId = paper.relatedPapers[0];
                  const relatedPos = paperPositions.find(p => p.id === relatedId);
                  if (!relatedPos) return null;

                  const dx = relatedPos.x - position.x;
                  const dy = relatedPos.y - position.y;
                  const length = Math.sqrt(dx * dx + dy * dy);
                  const angle = Math.atan2(dy, dx);

                  return (
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 origin-left pointer-events-none shadow-lg shadow-yellow-400/50"
                      style={{
                        width: `${length}vw`,
                        transform: `rotate(${angle}rad)`,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  );
                })()}
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}