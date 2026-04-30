import { X, Network, BookOpen, Link, Lightbulb, TrendingUp, Users, GitBranch, Save, Filter, Calendar, Check } from 'lucide-react';
import { Paper, papers } from '../data/mockData';
import { useState } from 'react';

interface PolyAssociationViewProps {
  primaryPaper: Paper;
  onClose: () => void;
  onSave?: (primaryPaper: Paper, relatedPapers: Paper[]) => void;
}

export function PolyAssociationView({ primaryPaper, onClose, onSave }: PolyAssociationViewProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([primaryPaper.category]);
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ 
    min: primaryPaper.year - 10, 
    max: primaryPaper.year + 10 
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPaperIds, setSelectedPaperIds] = useState<string[]>([]);

  // Get all available categories
  const allCategories = Array.from(new Set(papers.map(p => p.category)));

  // Get available papers for selection (7-10 papers)
  const getAvailablePapers = () => {
    return papers.filter(p => {
      if (p.id === primaryPaper.id) return false;
      
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      
      // Year range filter
      if (p.year < yearRange.min || p.year > yearRange.max) {
        return false;
      }
      
      // Keyword filter
      if (selectedKeywords.length > 0) {
        const hasSelectedKeyword = selectedKeywords.some(kw => p.keywords.includes(kw));
        if (!hasSelectedKeyword) return false;
      }
      
      // Include papers with some connection
      return primaryPaper.relatedPapers.includes(p.id) ||
             p.category === primaryPaper.category ||
             p.keywords.some(kw => primaryPaper.keywords.includes(kw));
    }).slice(0, 10); // Show up to 10 available papers
  };

  const availablePapers = getAvailablePapers();
  
  // Filter to only show selected papers in the network
  const relatedPapers = availablePapers.filter(p => selectedPaperIds.includes(p.id));

  // Calculate connections between papers
  const getConnectionStrength = (paper: Paper) => {
    const commonKeywords = paper.keywords.filter(kw => 
      primaryPaper.keywords.includes(kw)
    ).length;
    const sameCategory = paper.category === primaryPaper.category ? 1 : 0;
    return commonKeywords * 10 + sameCategory * 20;
  };

  // Calculate connection mechanisms for each paper
  const getConnectionMechanisms = (paper: Paper) => {
    const commonKeywords = paper.keywords.filter(kw => 
      primaryPaper.keywords.includes(kw)
    );
    const citationOverlap = Math.floor(Math.random() * 15) + 3;
    
    return [
      {
        type: 'Keyword Overlap',
        icon: Link,
        strength: Math.min((commonKeywords.length / primaryPaper.keywords.length) * 100, 100),
        value: commonKeywords.length,
      },
      {
        type: 'Category Match',
        icon: TrendingUp,
        strength: paper.category === primaryPaper.category ? 100 : 0,
        value: paper.category === primaryPaper.category ? 'Same' : 'Different',
      },
      {
        type: 'Citation Network',
        icon: Users,
        strength: Math.min((citationOverlap / 50) * 100, 100),
        value: citationOverlap,
      },
      {
        type: 'Research Path',
        icon: GitBranch,
        strength: Math.abs(paper.year - primaryPaper.year) < 3 ? 80 : 40,
        value: `${Math.abs(paper.year - primaryPaper.year)} years`,
      },
    ];
  };

  // Calculate overall network metrics
  const networkMetrics = {
    totalConnections: relatedPapers.length,
    avgKeywordOverlap: relatedPapers.length > 0 ? Math.round(
      relatedPapers.reduce((sum, p) => {
        return sum + p.keywords.filter(kw => primaryPaper.keywords.includes(kw)).length;
      }, 0) / relatedPapers.length
    ) : 0,
    categoriesSpanned: new Set(relatedPapers.map(p => p.category)).size,
    totalCitations: relatedPapers.reduce((sum, p) => sum + p.citations, 0) + primaryPaper.citations,
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(kw => kw !== keyword);
      } else {
        return [...prev, keyword];
      }
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePaperSelection = (paperId: string) => {
    setSelectedPaperIds(prev => {
      if (prev.includes(paperId)) {
        return prev.filter(id => id !== paperId);
      } else {
        return [...prev, paperId];
      }
    });
  };

  if (availablePapers.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-black/80 backdrop-blur-xl border-2 border-blue-400/30 rounded-lg p-8 max-w-md">
          <p className="text-white text-center mb-4">No papers match your current filters.</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] h-[85vh] bg-black/80 backdrop-blur-xl border-2 border-blue-400/30 rounded-lg shadow-[0_0_40px_rgba(59,130,246,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <Network className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-white text-xl">Poly-Association Analysis</h2>
              <p className="text-blue-300 text-sm">
                Exploring network of {relatedPapers.length} interconnected papers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                showFilters 
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300' 
                  : 'bg-black/40 border-white/20 text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-b border-white/10 bg-black/40 p-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Keyword Filter */}
              <div>
                <p className="text-white/60 text-xs mb-2">Filter by Keywords (click to select)</p>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {Array.from(new Set([...primaryPaper.keywords, ...relatedPapers.flatMap(p => p.keywords)])).map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        selectedKeywords.includes(kw)
                          ? 'bg-yellow-500/40 text-yellow-200 border-2 border-yellow-400'
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <p className="text-white/60 text-xs mb-2">Categories (click to toggle)</p>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        selectedCategories.includes(category)
                          ? 'bg-green-500/40 text-green-200 border-2 border-green-400'
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Range Filter */}
              <div>
                <p className="text-white/60 text-xs mb-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Year Range: {yearRange.min} - {yearRange.max}
                </p>
                <div className="space-y-2">
                  <div>
                    <label className="text-white/40 text-xs">Min Year</label>
                    <input
                      type="range"
                      min="1990"
                      max="2024"
                      value={yearRange.min}
                      onChange={(e) => {
                        setYearRange(prev => ({ ...prev, min: parseInt(e.target.value) }));
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs">Max Year</label>
                    <input
                      type="range"
                      min="1990"
                      max="2024"
                      value={yearRange.max}
                      onChange={(e) => {
                        setYearRange(prev => ({ ...prev, max: parseInt(e.target.value) }));
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedKeywords.length > 0 || selectedCategories.length !== allCategories.length) && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-white/60 text-xs">Active Filters:</p>
                  <button
                    onClick={() => {
                      setSelectedKeywords([]);
                      setSelectedCategories([...allCategories]);
                      setYearRange({ min: primaryPaper.year - 10, max: primaryPaper.year + 10 });
                    }}
                    className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="h-[calc(100%-200px)] overflow-y-auto p-6">
          <div className="flex gap-6 h-full">
            {/* Left - Primary Paper */}
            <div className="w-1/3 bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-400/30 rounded-lg p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h3 className="text-white">Primary Paper</h3>
              </div>
              
              <h4 className="text-purple-300 text-lg mb-2">{primaryPaper.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{primaryPaper.authors} ({primaryPaper.year})</p>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Category</p>
                <p className="text-white text-sm">{primaryPaper.category}</p>
              </div>

              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Subcategory</p>
                <p className="text-white text-sm">{primaryPaper.subcategory}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Abstract</p>
                <p className="text-gray-300 text-sm">{primaryPaper.abstract}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Citations</p>
                <p className="text-white text-sm">{primaryPaper.citations}</p>
              </div>
              
              <div>
                <p className="text-white/60 text-xs mb-2">Keywords (click to filter)</p>
                <div className="flex flex-wrap gap-2">
                  {primaryPaper.keywords.map((kw) => {
                    const isCommon = relatedPapers.some(p => p.keywords.includes(kw));
                    return (
                      <button
                        key={kw}
                        onClick={() => handleKeywordClick(kw)}
                        className={`px-2 py-1 rounded-full text-xs transition-all cursor-pointer ${
                          selectedKeywords.includes(kw)
                            ? 'bg-yellow-500/40 text-yellow-200 border-2 border-yellow-400'
                            : isCommon
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30'
                        }`}
                      >
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right - Network View */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Paper Selection Panel */}
              <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white">Available Papers</h3>
                  <span className="text-cyan-300 text-sm">
                    {selectedPaperIds.length} of {availablePapers.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {availablePapers.map((paper) => {
                    const isSelected = selectedPaperIds.includes(paper.id);
                    const commonKeywords = paper.keywords.filter(kw => 
                      primaryPaper.keywords.includes(kw)
                    );
                    return (
                      <button
                        key={paper.id}
                        onClick={() => handlePaperSelection(paper.id)}
                        className={`relative text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                            : 'bg-black/30 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {/* Checkbox */}
                          <div className={`flex-shrink-0 mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-cyan-500 border-cyan-400'
                              : 'border-white/30'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          
                          {/* Paper Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate mb-1">
                              {paper.title}
                            </p>
                            <p className="text-gray-400 text-[10px] truncate mb-1">
                              {paper.authors} ({paper.year})
                            </p>
                            {commonKeywords.length > 0 && (
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-400 text-[10px]">
                                  {commonKeywords.length} shared keyword{commonKeywords.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Network Stats */}
              {relatedPapers.length > 0 && (
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-400/30 rounded-lg p-4">
                  <h3 className="text-white mb-3">Network Metrics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center bg-black/30 rounded-lg p-3">
                      <p className="text-white/60 text-xs mb-1">Connected Papers</p>
                      <p className="text-white text-2xl">{networkMetrics.totalConnections}</p>
                    </div>
                    <div className="text-center bg-black/30 rounded-lg p-3">
                      <p className="text-white/60 text-xs mb-1">Avg Keywords</p>
                      <p className="text-white text-2xl">{networkMetrics.avgKeywordOverlap}</p>
                    </div>
                    <div className="text-center bg-black/30 rounded-lg p-3">
                      <p className="text-white/60 text-xs mb-1">Categories</p>
                      <p className="text-white text-2xl">{networkMetrics.categoriesSpanned}</p>
                    </div>
                    <div className="text-center bg-black/30 rounded-lg p-3">
                      <p className="text-white/60 text-xs mb-1">Total Citations</p>
                      <p className="text-white text-2xl">{networkMetrics.totalCitations}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Papers Grid */}
              <div className="flex-1 overflow-y-auto">
                {relatedPapers.length > 0 ? (
                  <>
                    <h3 className="text-white mb-4">Selected Papers Network</h3>
                    <div className="space-y-3">{relatedPapers.map((paper, index) => {
                      const connectionStrength = getConnectionStrength(paper);
                      const commonKeywords = paper.keywords.filter(kw => 
                        primaryPaper.keywords.includes(kw)
                      );
                      const mechanisms = getConnectionMechanisms(paper);

                      return (
                        <div
                          key={paper.id}
                          className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            {/* Connection Indicator */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                {index + 1}
                              </div>
                              <div className="flex-1 w-0.5 bg-gradient-to-b from-blue-400/50 to-transparent" />
                            </div>

                            {/* Paper Info */}
                            <div className="flex-1">
                              <h4 className="text-blue-300 mb-2">{paper.title}</h4>
                              <p className="text-gray-400 text-sm mb-3">{paper.authors} ({paper.year})</p>
                              
                              <div className="mb-3">
                                <p className="text-white/60 text-xs mb-2">Abstract</p>
                                <p className="text-gray-300 text-xs leading-relaxed">{paper.abstract}</p>
                              </div>
                              
                              <div className="mb-3">
                                <p className="text-white/60 text-xs mb-1">Category</p>
                                <button
                                  onClick={() => toggleCategory(paper.category)}
                                  className={`px-2 py-1 rounded text-xs transition-all ${
                                    selectedCategories.includes(paper.category)
                                      ? paper.category === primaryPaper.category
                                        ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                        : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                      : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/20'
                                  }`}
                                >
                                  {paper.category}
                                </button>
                              </div>

                              {commonKeywords.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-white/60 text-xs mb-2">Shared Keywords ({commonKeywords.length})</p>
                                  <div className="flex flex-wrap gap-1">
                                    {commonKeywords.map((kw) => (
                                      <button
                                        key={kw}
                                        onClick={() => handleKeywordClick(kw)}
                                        className={`px-2 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                                          selectedKeywords.includes(kw)
                                            ? 'bg-yellow-500/40 text-yellow-200 border-2 border-yellow-400'
                                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/30'
                                        }`}
                                      >
                                        {kw}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Connection Mechanisms */}
                              <div className="mt-3 bg-black/40 rounded-lg p-3 border border-white/10">
                                <p className="text-white/60 text-xs mb-2">Connection Breakdown</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {mechanisms.map((mechanism) => {
                                    const Icon = mechanism.icon;
                                    return (
                                      <div key={mechanism.type} className="flex items-center gap-2">
                                        <Icon className="w-3 h-3 text-blue-400" />
                                        <div className="flex-1">
                                          <p className="text-white text-xs">{mechanism.type}</p>
                                          <p className="text-gray-400 text-[10px]">{mechanism.value}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Connection Strength */}
                              <div className="mt-3">
                                <p className="text-white/60 text-xs mb-1">Overall Connection Strength</p>
                                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                                  <div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                                    style={{ width: `${Math.min(connectionStrength, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </>
                ) : (
                  <p className="text-white/60 text-sm">Select papers from the available list to see their network connections.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="text-white/40 text-xs">
              Press <span className="text-white/60">ESC</span> to close • Click keywords to filter • Click categories to toggle cross-reference
            </p>
            {onSave && (
              <button
                onClick={() => onSave(primaryPaper, relatedPapers)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 hover:border-blue-400 text-blue-300 rounded-lg transition-all text-sm shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                title="Save this poly-association network"
              >
                <Save className="w-4 h-4" />
                Save Network
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}