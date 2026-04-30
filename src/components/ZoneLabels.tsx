import { motion, AnimatePresence } from 'motion/react';
import { categories } from '../data/mockData';

interface ZoneLabelsProps {
  searchQuery: string;
  visible: boolean;
}

// Position zone labels to match areas in the Unreal Engine forest
const zoneLabelPositions = [
  { category: 'Consciousness', x: 55, y: 45, label: 'Attention Schema Theory' },
  { category: 'Neuroscience', x: 35, y: 42, label: 'Brain Imaging' },
  { category: 'AI & Machine Learning', x: 25, y: 48, label: 'Machine Learning' },
  { category: 'Philosophy of Mind', x: 70, y: 52, label: 'Philosophy' },
];

export function ZoneLabels({ searchQuery, visible }: ZoneLabelsProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {zoneLabelPositions.map((zone, index) => {
          const category = categories.find(c => c.name === zone.category);
          if (!category) return null;

          const isMatched = !searchQuery || 
            zone.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            zone.label.toLowerCase().includes(searchQuery.toLowerCase());

          const opacity = searchQuery && !isMatched ? 0.2 : 0.8;

          return (
            <motion.div
              key={zone.category}
              className="absolute"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: opacity, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-center">
                {/* Zone label with glow */}
                <div className="relative">
                  <div 
                    className="absolute inset-0 blur-xl"
                    style={{ backgroundColor: category.color, opacity: 0.4 }}
                  />
                  <p 
                    className="relative px-4 py-2 text-2xl tracking-wide"
                    style={{ 
                      color: category.color,
                      textShadow: `0 0 20px ${category.color}80, 0 0 40px ${category.color}40`,
                    }}
                  >
                    {zone.label}
                  </p>
                </div>

                {/* Category badge */}
                <div className="mt-2 inline-block bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
                  <p className="text-white/70 text-xs">{zone.category}</p>
                </div>

                {/* Glow ring when matched */}
                {searchQuery && isMatched && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: category.color }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
