import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../data/mockData';
import forestBackground from 'figma:asset/03e800a5dc516482933db823f818f4b5301a7e48.png';

interface WorldMapProps {
  isActive: boolean;
  searchQuery: string;
  onZoneClick: (categoryName: string) => void;
}

export function WorldMap({ isActive, searchQuery, onZoneClick }: WorldMapProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    onZoneClick(`${categoryName} > ${subcategoryName}`);
  };

  const handleCategoryNavigate = (categoryName: string) => {
    onZoneClick(categoryName);
  };

  // Calculate grid layout: 4 categories per row (12 categories = 3 rows)
  const categoriesPerRow = 4;
  const rows = Math.ceil(categories.length / categoriesPerRow);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md pointer-events-auto flex items-center justify-center p-8"
        >
          {/* Map Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-7xl bg-black/60 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/20 bg-black/40">
              <div className="text-center">
                <h2 className="text-2xl text-white mb-1">Data Forest Map</h2>
                <p className="text-white/50 text-sm">
                  Click on any category to expand subcategories, or navigate directly to zones
                </p>
              </div>
              <button
                onClick={() => onZoneClick('')}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Grid Container */}
            <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${categoriesPerRow}, 1fr)` }}>
                {categories.map((category, index) => {
                  const isExpanded = expandedCategory === category.name;
                  const isHovered = hoveredTile === category.name;
                  const subcategoryCount = category.subcategories.length;

                  return (
                    <div key={category.name} className="relative">
                      {/* Category Tile */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleCategoryClick(category.name)}
                        onMouseEnter={() => setHoveredTile(category.name)}
                        onMouseLeave={() => setHoveredTile(null)}
                        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all group cursor-pointer"
                        style={{
                          borderColor: isExpanded || isHovered ? category.color : 'rgba(255,255,255,0.2)',
                          boxShadow: isExpanded || isHovered ? `0 0 20px ${category.color}40` : 'none'
                        }}
                      >
                        {/* Forest Background */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${forestBackground})`,
                            filter: 'brightness(0.4)'
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${category.color}40 0%, transparent 70%)`
                          }}
                        />

                        {/* Category Info */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div>
                            <div
                              className="inline-block px-2 py-1 rounded text-xs mb-2"
                              style={{
                                backgroundColor: `${category.color}30`,
                                color: category.color,
                                border: `1px solid ${category.color}60`
                              }}
                            >
                              {subcategoryCount} subcategories
                            </div>
                            <h3 className="text-white text-left leading-tight">
                              {category.name}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryNavigate(category.name);
                              }}
                              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs text-white transition-colors"
                            >
                              Navigate
                            </button>
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-white" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Glow */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          style={{
                            boxShadow: `inset 0 0 40px ${category.color}60`,
                            border: `1px solid ${category.color}`
                          }}
                        />
                      </motion.div>

                      {/* Expanded Subcategories */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-2"
                          >
                            <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-3 space-y-1">
                              <div className="text-xs text-white/50 mb-2 px-2">Subcategories:</div>
                              {category.subcategories.map((subcategory, subIdx) => (
                                <button
                                  key={subcategory}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubcategoryClick(category.name, subcategory);
                                  }}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center justify-between group/sub"
                                >
                                  <span className="text-xs leading-tight">{subcategory}</span>
                                  <div
                                    className="w-2 h-2 rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity"
                                    style={{ backgroundColor: category.color }}
                                  />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Legend */}
            <div className="p-4 border-t border-white/20 bg-black/40">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-xs text-white/50">
                  <span className="text-white/70">Tip:</span> Click tiles to expand subcategories
                </div>
                <div className="text-xs text-white/50">
                  <span className="text-white/70">ESC</span> to close map
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}