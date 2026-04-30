import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { categories, papers } from '../data/mockData';

interface SearchModeProps {
  isActive: boolean;
  onQueryChange: (query: string) => void;
  searchQuery: string;
}

export function SearchMode({ isActive, onQueryChange, searchQuery }: SearchModeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!searchQuery) return { categories: [], papers: [] };

    const query = searchQuery.toLowerCase();
    const matchedPapers = papers.filter(paper => 
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.keywords.some(k => k.toLowerCase().includes(query)) ||
      paper.category.toLowerCase().includes(query) ||
      paper.subcategory.toLowerCase().includes(query)
    );

    const matchedCategories = categories.filter(cat =>
      cat.name.toLowerCase().includes(query) ||
      cat.subcategories.some(sub => sub.toLowerCase().includes(query))
    );

    return { categories: matchedCategories, papers: matchedPapers };
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl pointer-events-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/60 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Search Input */}
            <div className="p-5 border-b border-white/20">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search papers, categories, keywords... (e.g., 'Consciousness AND Graziano')"
                  className="w-full bg-white/10 text-white placeholder-white/40 pl-12 pr-4 py-3 rounded-xl border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-h-96 overflow-y-auto"
              >
                {filteredResults.categories.length === 0 && filteredResults.papers.length === 0 ? (
                  <div className="p-8 text-center text-white/60">
                    No results found
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {/* Category Results */}
                    {filteredResults.categories.map((category) => {
                      const isExpanded = expandedCategories.has(category.name);
                      const categoryPapers = filteredResults.papers.filter(
                        p => p.category === category.name
                      );

                      return (
                        <div key={category.name} className="space-y-2">
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left group"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-white/60" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-white/60" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: category.color }}
                                />
                                <span className="text-white">{category.name}</span>
                              </div>
                              <div className="text-sm text-white/60 mt-1">
                                {categoryPapers.length} paper{categoryPapers.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-6 space-y-2"
                              >
                                {category.subcategories.map((sub) => {
                                  const subPapers = categoryPapers.filter(
                                    p => p.subcategory === sub
                                  );
                                  if (subPapers.length === 0) return null;

                                  return (
                                    <div key={sub} className="space-y-1">
                                      <div className="text-sm text-white/70 px-3 py-1">
                                        {sub} ({subPapers.length})
                                      </div>
                                      {subPapers.map((paper) => (
                                        <div
                                          key={paper.id}
                                          className="p-2 bg-white/5 rounded text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                          <div className="line-clamp-1">{paper.title}</div>
                                          <div className="text-xs text-white/50 mt-1">
                                            {paper.year} • {paper.keywords.slice(0, 3).join(', ')}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Help Text */}
            {!searchQuery && (
              <div className="p-6 text-sm text-white/50 text-center">
                Search by title, keywords, category, or use operators like AND, OR
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
