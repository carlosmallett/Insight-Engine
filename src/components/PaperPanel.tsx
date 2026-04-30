import { X, Bookmark, Check } from 'lucide-react';
import { Paper } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface PaperPanelProps {
  paper: Paper;
  onClose: () => void;
  onSave?: (paper: Paper) => void;
  isSaved?: boolean;
}

export function PaperPanel({ paper, onClose, onSave, isSaved }: PaperPanelProps) {
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleSave = () => {
    if (onSave && !isSaved) {
      onSave(paper);
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {paper && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed left-6 top-20 bottom-6 w-[480px] bg-gradient-to-br from-purple-950/40 to-black/80 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)] z-40 pointer-events-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20 bg-black/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-purple-300 text-xl">Selected Paper</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-180px)]">
            {/* Title */}
            <div>
              <div className="text-sm text-purple-300/60 mb-2">Title</div>
              <h3 className="text-white text-lg leading-tight">
                {paper.title}
              </h3>
            </div>

            {/* Authors */}
            <div>
              <div className="text-sm text-purple-300/60 mb-2">Authors</div>
              <p className="text-white/90">{paper.authors}</p>
            </div>

            {/* Year of Publication */}
            <div>
              <div className="text-sm text-purple-300/60 mb-2">Year of Publication</div>
              <p className="text-white/90">{paper.year}</p>
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-purple-300/60 mb-2">Category</div>
                <p className="text-white/90">{paper.category}</p>
              </div>
              <div>
                <div className="text-sm text-purple-300/60 mb-2">Subcategory</div>
                <p className="text-white/90">{paper.subcategory}</p>
              </div>
            </div>

            {/* Abstract */}
            <div>
              <div className="text-sm text-purple-300/60 mb-2">Abstract</div>
              <p className="text-white/80 text-sm leading-relaxed">
                {paper.abstract}
              </p>
            </div>

            {/* Keywords */}
            <div>
              <div className="text-sm text-purple-300/60 mb-3">Keywords</div>
              <div className="flex gap-4">
                <div className="flex flex-wrap gap-2 flex-1">
                  {paper.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                {/* Save Paper Button */}
                {onSave && (
                  <div className="flex-shrink-0">
                    <button 
                      onClick={handleSave}
                      disabled={isSaved}
                      className={`h-full min-h-[80px] px-8 rounded-xl transition-all shadow-lg flex flex-col items-center justify-center gap-2 border-2 ${
                        isSaved
                          ? 'bg-green-500/30 text-green-200 border-green-400/50 cursor-default'
                          : 'bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 border-purple-400/50 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                      }`}
                    >
                      {showSaveConfirmation ? (
                        <>
                          <Check className="w-6 h-6 text-white" />
                          <span className="text-sm text-white">Saved!</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-green-200' : ''}`} />
                          <span className="text-sm">{isSaved ? 'Saved' : 'Save Paper'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Citations */}
            <div>
              <div className="text-sm text-purple-300/60 mb-2">Citations</div>
              <p className="text-white/90">{paper.citations}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}