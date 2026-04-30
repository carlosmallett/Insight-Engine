import { X, Link2, Network } from 'lucide-react';
import { Paper } from '../data/mockData';

interface AssociationModeSelectorProps {
  paper: Paper | null;
  onClose: () => void;
  onSelectMode: (mode: 'bi-association' | 'poly-association') => void;
}

export function AssociationModeSelector({ paper, onClose, onSelectMode }: AssociationModeSelectorProps) {
  if (!paper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[900px] max-h-[90vh] bg-black/80 backdrop-blur-xl border-2 border-purple-400/30 rounded-lg shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-white text-xl mb-1">Select Association Mode</h2>
            <p className="text-purple-300 text-sm">Choose how you want to explore this paper</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Paper Details Section */}
          <div className="mb-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-400/30 rounded-lg p-6">
            <h3 className="text-white text-lg mb-4">Selected Paper</h3>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <p className="text-white/60 text-xs mb-1">Title</p>
                <h4 className="text-purple-300 text-lg">{paper.title}</h4>
              </div>

              {/* Authors */}
              <div>
                <p className="text-white/60 text-xs mb-1">Authors</p>
                <p className="text-white">{paper.authors}</p>
              </div>

              {/* Year */}
              <div>
                <p className="text-white/60 text-xs mb-1">Year of Publication</p>
                <p className="text-white">{paper.year}</p>
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-xs mb-1">Category</p>
                  <p className="text-white">{paper.category}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Subcategory</p>
                  <p className="text-white">{paper.subcategory}</p>
                </div>
              </div>

              {/* Abstract */}
              <div>
                <p className="text-white/60 text-xs mb-1">Abstract</p>
                <p className="text-gray-300 text-sm leading-relaxed">{paper.abstract}</p>
              </div>

              {/* Keywords */}
              <div>
                <p className="text-white/60 text-xs mb-2">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-400/30"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Citations */}
              <div>
                <p className="text-white/60 text-xs mb-1">Citations</p>
                <p className="text-white">{paper.citations}</p>
              </div>
            </div>
          </div>

          {/* Association Mode Selection */}
          <div className="space-y-4">
            <h3 className="text-white text-lg mb-3">Choose Association Mode</h3>

            {/* Bi-Association Option */}
            <button
              onClick={() => onSelectMode('bi-association')}
              className="w-full group"
            >
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-purple-400/30 rounded-lg p-6 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500 transition-colors">
                    <Link2 className="w-6 h-6 text-purple-300 group-hover:text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white text-lg mb-2">Bi-Association Mode</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Explore deep connections between this paper and another related research paper. 
                      Discover shared concepts, methodologies, and insights that bridge two distinct ideas.
                    </p>
                    <div className="flex items-center gap-2 text-purple-300 text-sm">
                      <span>Connect 2 papers</span>
                      <span className="text-purple-400">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Poly-Association Option */}
            <button
              onClick={() => onSelectMode('poly-association')}
              className="w-full group"
            >
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-400/30 rounded-lg p-6 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors">
                    <Network className="w-6 h-6 text-blue-300 group-hover:text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white text-lg mb-2">Poly-Association Mode</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Visualize complex networks of interconnected research. See how this paper relates 
                      to multiple studies, forming a web of knowledge across different domains.
                    </p>
                    <div className="flex items-center gap-2 text-blue-300 text-sm">
                      <span>Connect multiple papers</span>
                      <span className="text-blue-400">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <p className="text-white/40 text-xs text-center">
            Press <span className="text-white/60">ESC</span> to close
          </p>
        </div>
      </div>
    </div>
  );
}