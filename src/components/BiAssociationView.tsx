import { X, ArrowLeftRight, BookOpen, Link, Lightbulb, TrendingUp, Users, ChevronLeft, ChevronRight, Calendar, Filter, Save } from 'lucide-react';
import { Paper, papers } from '../data/mockData';
import { useState } from 'react';

interface BiAssociationViewProps {
  primaryPaper: Paper;
  onClose: () => void;
  onSave?: (primaryPaper: Paper, relatedPaper: Paper) => void;
}

export function BiAssociationView({ primaryPaper, onClose, onSave }: BiAssociationViewProps) {
  const [selectedRelatedPaperIndex, setSelectedRelatedPaperIndex] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([primaryPaper.category]);
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ 
    min: primaryPaper.year - 10, 
    max: primaryPaper.year + 10 
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get all available categories
  const allCategories = Array.from(new Set(papers.map(p => p.category)));

  // Filter related papers based on selections
  const getFilteredRelatedPapers = () => {
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
    });
  };

  const filteredRelatedPapers = getFilteredRelatedPapers();
  const relatedPaper = filteredRelatedPapers[selectedRelatedPaperIndex] || filteredRelatedPapers[0];

  if (!relatedPaper) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-black/80 backdrop-blur-xl border-2 border-purple-400/30 rounded-lg p-8 max-w-md">
          <p className="text-white text-center mb-4">No papers match your current filters.</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Find common keywords
  const commonKeywords = primaryPaper.keywords.filter(kw => 
    relatedPaper.keywords.includes(kw)
  );

  // Calculate connection insights
  const connectionInsights = {
    sharedKeywords: commonKeywords,
    sameCategory: primaryPaper.category === relatedPaper.category,
    sameSubcategory: primaryPaper.subcategory === relatedPaper.subcategory,
    citationOverlap: Math.floor(Math.random() * 15) + 5,
    temporalProximity: Math.abs(primaryPaper.year - relatedPaper.year),
    conceptualBridge: commonKeywords.length > 0 ? commonKeywords[0] : 'Research methodology',
  };

  // Generate connection mechanisms
  const connectionMechanisms = [
    {
      type: 'Keyword Overlap',
      icon: Link,
      strength: Math.min((commonKeywords.length / primaryPaper.keywords.length) * 100, 100),
      description: `${commonKeywords.length} shared keywords out of ${primaryPaper.keywords.length} total`,
      color: 'yellow',
    },
    {
      type: 'Categorical Alignment',
      icon: TrendingUp,
      strength: connectionInsights.sameCategory ? 100 : 40,
      description: connectionInsights.sameCategory 
        ? `Both papers belong to ${primaryPaper.category}` 
        : 'Papers from different but related categories',
      color: 'green',
    },
    {
      type: 'Citation Network',
      icon: Users,
      strength: Math.min((connectionInsights.citationOverlap / 50) * 100, 100),
      description: `Approximately ${connectionInsights.citationOverlap} shared citations`,
      color: 'blue',
    },
    {
      type: 'Conceptual Bridge',
      icon: Lightbulb,
      strength: commonKeywords.length > 2 ? 85 : 60,
      description: `Primary connection through: "${connectionInsights.conceptualBridge}"`,
      color: 'purple',
    },
  ];

  const handlePreviousPaper = () => {
    setSelectedRelatedPaperIndex((prev) => 
      prev > 0 ? prev - 1 : filteredRelatedPapers.length - 1
    );
  };

  const handleNextPaper = () => {
    setSelectedRelatedPaperIndex((prev) => 
      prev < filteredRelatedPapers.length - 1 ? prev + 1 : 0
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(kw => kw !== keyword);
      } else {
        return [...prev, keyword];
      }
    });
    setSelectedRelatedPaperIndex(0); // Reset to first paper when filter changes
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setSelectedRelatedPaperIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] h-[85vh] bg-black/80 backdrop-blur-xl border-2 border-purple-400/30 rounded-lg shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <ArrowLeftRight className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-white text-xl">Bi-Association Analysis</h2>
              <p className="text-purple-300 text-sm">
                Comparing paper {selectedRelatedPaperIndex + 1} of {filteredRelatedPapers.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                showFilters 
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300' 
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
                  {Array.from(new Set([...primaryPaper.keywords, ...relatedPaper.keywords])).map((kw) => (
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
                        setSelectedRelatedPaperIndex(0);
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
                        setSelectedRelatedPaperIndex(0);
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
                    className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
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
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Left Paper */}
            <div className="bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-400/30 rounded-lg p-6 overflow-y-auto">
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
                  {primaryPaper.keywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={`px-2 py-1 rounded-full text-xs transition-all cursor-pointer ${
                        selectedKeywords.includes(kw)
                          ? 'bg-yellow-500/40 text-yellow-200 border-2 border-yellow-400'
                          : commonKeywords.includes(kw)
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30'
                      }`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle - Connections */}
            <div className="flex flex-col gap-4 overflow-y-auto">
              {/* Connection Strength Overview */}
              <div className="bg-gradient-to-b from-purple-500/20 via-yellow-500/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-white text-center mb-4">Connection Analysis</h3>
                
                {commonKeywords.length > 0 && (
                  <div className="mb-6">
                    <p className="text-yellow-300 text-sm mb-3 text-center">Shared Keywords</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {commonKeywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => handleKeywordClick(kw)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            selectedKeywords.includes(kw)
                              ? 'bg-yellow-500/50 text-yellow-100 border-2 border-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                              : 'bg-yellow-500/30 text-yellow-200 border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:bg-yellow-500/40'
                          }`}
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">Temporal Distance</p>
                    <p className="text-white">{connectionInsights.temporalProximity} years apart</p>
                  </div>

                  {connectionInsights.sameCategory && (
                    <div className="bg-green-500/20 rounded px-3 py-2 border border-green-400/30 text-center">
                      <p className="text-green-300 text-sm">Same Category: {primaryPaper.category}</p>
                    </div>
                  )}

                  {!connectionInsights.sameCategory && (
                    <div className="bg-blue-500/20 rounded px-3 py-2 border border-blue-400/30 text-center">
                      <p className="text-blue-300 text-sm">Cross-Category Connection</p>
                      <p className="text-blue-200 text-xs mt-1">{primaryPaper.category} ↔ {relatedPaper.category}</p>
                    </div>
                  )}

                  {connectionInsights.sameSubcategory && (
                    <div className="bg-green-500/20 rounded px-3 py-2 border border-green-400/30 text-center">
                      <p className="text-green-300 text-sm">Same Subcategory: {primaryPaper.subcategory}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Connection Mechanisms */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h3 className="text-white mb-4">Connection Mechanisms</h3>
                <div className="space-y-3">
                  {connectionMechanisms.map((mechanism) => {
                    const Icon = mechanism.icon;
                    const colorClasses = {
                      yellow: 'from-yellow-500 to-yellow-600',
                      green: 'from-green-500 to-green-600',
                      blue: 'from-blue-500 to-blue-600',
                      purple: 'from-purple-500 to-purple-600',
                    };
                    
                    return (
                      <div key={mechanism.type} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`p-1.5 rounded-full bg-gradient-to-br ${colorClasses[mechanism.color as keyof typeof colorClasses]}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm mb-1">{mechanism.type}</p>
                            <p className="text-gray-400 text-xs">{mechanism.description}</p>
                          </div>
                        </div>
                        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                          <div 
                            className={`h-full bg-gradient-to-r ${colorClasses[mechanism.color as keyof typeof colorClasses]} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                            style={{ width: `${mechanism.strength}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual connection line */}
              <div className="flex items-center justify-center gap-2 py-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-yellow-400" />
                <ArrowLeftRight className="w-6 h-6 text-yellow-400 animate-pulse" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-400" />
              </div>
            </div>

            {/* Right Paper with Navigation */}
            <div className="relative bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-400/30 rounded-lg p-6 overflow-y-auto">
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white">Related Paper</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPaper}
                    className="p-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-colors"
                    title="Previous paper"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-white/60 text-xs">
                    {selectedRelatedPaperIndex + 1}/{filteredRelatedPapers.length}
                  </span>
                  <button
                    onClick={handleNextPaper}
                    className="p-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-colors"
                    title="Next paper"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h4 className="text-blue-300 text-lg mb-2">{relatedPaper.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{relatedPaper.authors} ({relatedPaper.year})</p>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Category</p>
                <button
                  onClick={() => toggleCategory(relatedPaper.category)}
                  className={`px-2 py-1 rounded text-sm transition-all ${
                    selectedCategories.includes(relatedPaper.category)
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {relatedPaper.category}
                </button>
              </div>

              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Subcategory</p>
                <p className="text-white text-sm">{relatedPaper.subcategory}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Abstract</p>
                <p className="text-gray-300 text-sm">{relatedPaper.abstract}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">Citations</p>
                <p className="text-white text-sm">{relatedPaper.citations}</p>
              </div>
              
              <div>
                <p className="text-white/60 text-xs mb-2">Keywords (click to filter)</p>
                <div className="flex flex-wrap gap-2">
                  {relatedPaper.keywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={`px-2 py-1 rounded-full text-xs transition-all cursor-pointer ${
                        selectedKeywords.includes(kw)
                          ? 'bg-yellow-500/40 text-yellow-200 border-2 border-yellow-400'
                          : commonKeywords.includes(kw)
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30'
                      }`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="text-white/40 text-xs">
              Press <span className="text-white/60">ESC</span> to close • Use <span className="text-white/60">← →</span> navigation or click keywords to explore • Click categories to cross-reference
            </p>
            {onSave && relatedPaper && (
              <button
                onClick={() => onSave(primaryPaper, relatedPaper)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/30 hover:border-purple-400 text-purple-300 rounded-lg transition-all text-sm shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                title="Save this bi-association"
              >
                <Save className="w-4 h-4" />
                Save Association
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}