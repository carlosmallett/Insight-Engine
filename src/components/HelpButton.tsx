import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X } from 'lucide-react';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-[282px] z-40">
      {/* Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-96 bg-black/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Help Center</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div>
                <h4 className="text-white mb-2">Navigation</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• Click and drag to rotate the view</li>
                  <li>• Scroll to zoom in/out</li>
                  <li>• Click on glowing orbs to view papers</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white mb-2">Search</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• Use the search bar to filter papers</li>
                  <li>• Browse by categories and subcategories</li>
                  <li>• Use AND/OR operators for complex queries</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white mb-2">Keyboard Shortcuts</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• <span className="text-white">L</span> - Toggle zone labels</li>
                  <li>• <span className="text-white">ESC</span> - Close panels</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white mb-2">Features</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• Save papers and associations</li>
                  <li>• Chat with the AI assistant for guidance</li>
                  <li>• View world map for overview</li>
                  <li>• Explore paper connections</li>
                  <li>• Play focus music while researching</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
          isOpen ? 'bg-white/10' : ''
        }`}
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}