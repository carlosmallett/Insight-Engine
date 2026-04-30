import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { categories, papers } from '../data/mockData';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategorySelect?: (category: string, subcategory?: string) => void;
  onPaperTeleport?: (paperId: string) => void;
}

export function SearchBar({ onSearch, onCategorySelect, onPaperTeleport }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setExpandedPaperId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName: string | null) => {
    if (categoryName === 'All') {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setExpandedPaperId(null);
      onSearch('');
    } else {
      setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
      setSelectedSubcategory(null);
      setExpandedPaperId(null);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
    setExpandedPaperId(null);
    if (selectedCategory) {
      onCategorySelect?.(selectedCategory, subcategory);
      onSearch(`${selectedCategory} > ${subcategory}`);
    }
  };

  const handlePaperToggle = (paperId: string) => {
    setExpandedPaperId(expandedPaperId === paperId ? null : paperId);
  };

  const handleTeleport = (paperId: string) => {
    onPaperTeleport?.(paperId);
  };

  const handleViewPDF = (paperId: string) => {
    // Mock PDF viewing
    console.log(`View PDF for paper: ${paperId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  // Get papers for selected subcategory
  const filteredPapers = selectedSubcategory && selectedCategory
    ? papers.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory)
    : [];

  return (
    <div ref={searchRef} className="fixed top-6 left-6 right-6 z-50">
      {/* Search Bar */}
      <div className="bg-black/60 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Search papers, categories, keywords (e.g. Consciousness AND Biomimetics"
            className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Three Panel Layout */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-4 mt-4"
          >
            {/* Categories Panel */}
            <div
              className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl"
              style={{ width: '320px', maxHeight: '500px' }}
            >
              <div className="p-4 border-b border-white/20">
                <h3 className="text-white">Categories</h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '444px' }}>
                {/* All option */}
                <button
                  onClick={() => handleCategoryClick('All')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-white/80 hover:bg-white/10 transition-colors border-b border-white/10 ${
                    selectedCategory === null ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="text-sm">All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-white/80 hover:bg-white/10 transition-colors border-b border-white/10 ${
                      selectedCategory === category.name ? 'bg-white/10' : ''
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories Panel */}
            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ width: '320px', maxHeight: '500px' }}
                >
                  <div className="p-4 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-white/60" />
                      <h3 className="text-white">Subcategories</h3>
                    </div>
                  </div>
                  <div className="overflow-y-auto" style={{ maxHeight: '444px' }}>
                    {categories
                      .find((c) => c.name === selectedCategory)
                      ?.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategoryClick(subcategory)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-white/80 hover:bg-white/10 transition-colors border-b border-white/10 ${
                            selectedSubcategory === subcategory ? 'bg-white/10' : ''
                          }`}
                        >
                          <span className="text-sm">{subcategory}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Papers Panel */}
            <AnimatePresence>
              {selectedSubcategory && filteredPapers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ width: '320px', maxHeight: '500px' }}
                >
                  <div className="p-4 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-white/60" />
                      <h3 className="text-white">Papers</h3>
                    </div>
                  </div>
                  <div className="overflow-y-auto" style={{ maxHeight: '444px' }}>
                    {filteredPapers.map((paper) => {
                      const isExpanded = expandedPaperId === paper.id;
                      
                      return (
                        <div
                          key={paper.id}
                          className="border-b border-white/10"
                        >
                          <button
                            onClick={() => handlePaperToggle(paper.id)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-white/80 hover:bg-white/10 transition-colors ${
                              isExpanded ? 'bg-white/10' : ''
                            }`}
                          >
                            <span className="text-sm flex-1 pr-2">{paper.title}</span>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform flex-shrink-0 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-black/40"
                              >
                                <div className="px-4 py-3 space-y-2">
                                  <div>
                                    <p className="text-xs text-white/50">Author(s)</p>
                                    <p className="text-sm text-white/80">{paper.authors}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs text-white/50">Year of Publication</p>
                                    <p className="text-sm text-white/80">{paper.year}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs text-white/50">Keywords</p>
                                    <p className="text-sm text-white/80">{paper.keywords.join(', ')}</p>
                                  </div>
                                  
                                  <div className="flex gap-2 pt-2">
                                    <button
                                      onClick={() => handleTeleport(paper.id)}
                                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg text-sm transition-colors"
                                    >
                                      Teleport
                                    </button>
                                    <button
                                      onClick={() => handleViewPDF(paper.id)}
                                      className="flex-1 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg text-sm transition-colors"
                                    >
                                      View Paper (PDF)
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                    
                    {/* Placeholders to match screenshot */}
                    {Array.from({ length: Math.max(0, 10 - filteredPapers.length) }).map((_, i) => (
                      <div
                        key={`placeholder-${i}`}
                        className="px-4 py-2.5 border-b border-white/10"
                      >
                        <span className="text-sm text-white/40">Placeholder</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
