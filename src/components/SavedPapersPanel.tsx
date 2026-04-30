import { useState } from 'react';
import { X, Bookmark, Folder, FolderPlus, Trash2, ChevronDown, ChevronRight, Link2, Network } from 'lucide-react';
import { Paper } from '../data/mockData';

export interface SavedPaper {
  paper: Paper;
  savedAt: Date;
  folderId?: string;
}

export interface SavedAssociation {
  id: string;
  type: 'bi-association' | 'poly-association';
  primaryPaper: Paper;
  relatedPapers: Paper[];
  savedAt: Date;
  folderId?: string;
}

export interface PaperFolder {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

interface SavedPapersPanelProps {
  savedPapers: SavedPaper[];
  savedAssociations: SavedAssociation[];
  folders: PaperFolder[];
  onClose: () => void;
  onDeletePaper: (paperId: string) => void;
  onDeleteAssociation: (associationId: string) => void;
  onCreateFolder: (name: string, color: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onMovePaper: (paperId: string, folderId: string | undefined) => void;
  onMoveAssociation: (associationId: string, folderId: string | undefined) => void;
  onOpenPaper?: (paper: Paper) => void;
  onOpenAssociation?: (association: SavedAssociation) => void;
}

export function SavedPapersPanel({
  savedPapers,
  savedAssociations,
  folders,
  onClose,
  onDeletePaper,
  onDeleteAssociation,
  onCreateFolder,
  onDeleteFolder,
  onMovePaper,
  onMoveAssociation,
  onOpenPaper,
  onOpenAssociation,
}: SavedPapersPanelProps) {
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('purple');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'papers' | 'associations'>('papers');

  const folderColors = [
    { name: 'purple', class: 'bg-purple-500/20 border-purple-400/30 text-purple-300' },
    { name: 'blue', class: 'bg-blue-500/20 border-blue-400/30 text-blue-300' },
    { name: 'green', class: 'bg-green-500/20 border-green-400/30 text-green-300' },
    { name: 'yellow', class: 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300' },
    { name: 'red', class: 'bg-red-500/20 border-red-400/30 text-red-300' },
    { name: 'cyan', class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300' },
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim(), newFolderColor);
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const getPapersInFolder = (folderId: string | undefined) => {
    return savedPapers.filter(sp => sp.folderId === folderId);
  };

  const getAssociationsInFolder = (folderId: string | undefined) => {
    return savedAssociations.filter(sa => sa.folderId === folderId);
  };

  const getFolderColorClass = (color: string) => {
    return folderColors.find(fc => fc.name === color)?.class || folderColors[0].class;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[1000px] h-[85vh] bg-black/80 backdrop-blur-xl border-2 border-purple-400/30 rounded-lg shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Bookmark className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-white text-xl">Saved Research</h2>
              <p className="text-purple-300 text-sm">
                {savedPapers.length} papers • {savedAssociations.length} associations • {folders.length} folders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10 bg-black/40">
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'papers'
                ? 'bg-purple-500/20 border-2 border-purple-400 text-purple-300'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Saved Papers ({savedPapers.length})
          </button>
          <button
            onClick={() => setActiveTab('associations')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'associations'
                ? 'bg-purple-500/20 border-2 border-purple-400 text-purple-300'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Saved Associations ({savedAssociations.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar - Folders */}
          <div className="w-64 border-r border-white/10 bg-black/20 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-base">Folders</h3>
              <button
                onClick={() => setShowNewFolder(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                title="Create new folder"
              >
                <FolderPlus className="w-4 h-4" />
                <span className="text-xs">New</span>
              </button>
            </div>

            {/* All Items (no folder) */}
            <button
              onClick={() => {
                // Clear folder selection - show all
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors mb-2"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">All Items</span>
              <span className="ml-auto text-xs text-white/40">
                {activeTab === 'papers' ? getPapersInFolder(undefined).length : getAssociationsInFolder(undefined).length}
              </span>
            </button>

            {/* New Folder Form */}
            {showNewFolder && (
              <div className="mb-4 p-3 bg-white/5 border border-purple-400/30 rounded-lg">
                <input
                  type="text"
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-2 py-1 bg-black/40 border border-white/20 rounded text-white text-sm mb-2 outline-none focus:border-purple-400"
                  autoFocus
                />
                <div className="flex gap-1 mb-2">
                  {folderColors.map((fc) => (
                    <button
                      key={fc.name}
                      onClick={() => setNewFolderColor(fc.name)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        newFolderColor === fc.name ? 'border-white' : 'border-transparent'
                      } ${fc.class}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateFolder}
                    className="flex-1 px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowNewFolder(false)}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Folder List */}
            <div className="space-y-1">
              {folders.map((folder) => {
                const itemCount = activeTab === 'papers' 
                  ? getPapersInFolder(folder.id).length 
                  : getAssociationsInFolder(folder.id).length;
                
                return (
                  <div key={folder.id}>
                    <div className="flex items-center gap-2 group">
                      <button
                        onClick={() => toggleFolder(folder.id)}
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {expandedFolders.has(folder.id) ? (
                          <ChevronDown className="w-4 h-4 text-white/60" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-white/60" />
                        )}
                        <Folder className={`w-4 h-4 ${getFolderColorClass(folder.color).split(' ')[2]}`} />
                        <span className="text-sm text-white flex-1 text-left">{folder.name}</span>
                        <span className="text-xs text-white/40">{itemCount}</span>
                      </button>
                      <button
                        onClick={() => onDeleteFolder(folder.id)}
                        className="p-1.5 rounded-full bg-red-500/0 hover:bg-red-500/20 text-red-300/0 group-hover:text-red-300 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete folder"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content - Papers or Associations */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'papers' ? (
              // Saved Papers View
              <div className="space-y-4">
                {/* Ungrouped Papers */}
                {getPapersInFolder(undefined).length > 0 && (
                  <div>
                    <h3 className="text-white/60 text-sm mb-3">Unsorted Papers</h3>
                    <div className="space-y-2">
                      {getPapersInFolder(undefined).map((savedPaper) => (
                        <div
                          key={savedPaper.paper.id}
                          className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-400/20 rounded-lg p-4 hover:border-purple-400/50 transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h4 
                                className="text-purple-300 mb-1 cursor-pointer hover:text-purple-200"
                                onClick={() => onOpenPaper?.(savedPaper.paper)}
                              >
                                {savedPaper.paper.title}
                              </h4>
                              <p className="text-gray-400 text-sm mb-2">
                                {savedPaper.paper.authors} ({savedPaper.paper.year})
                              </p>
                              <p className="text-white/60 text-xs">
                                Saved {new Date(savedPaper.savedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                onChange={(e) => onMovePaper(savedPaper.paper.id, e.target.value || undefined)}
                                className="px-2 py-1 bg-black/40 border border-white/20 rounded text-white text-xs outline-none focus:border-purple-400"
                                defaultValue=""
                              >
                                <option value="">Move to folder...</option>
                                {folders.map((folder) => (
                                  <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => onDeletePaper(savedPaper.paper.id)}
                                className="p-2 rounded-full bg-red-500/0 hover:bg-red-500/20 text-red-300/0 group-hover:text-red-300 transition-all"
                                title="Remove from saved"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Papers in Folders */}
                {folders.filter(f => expandedFolders.has(f.id)).map((folder) => {
                  const papersInFolder = getPapersInFolder(folder.id);
                  if (papersInFolder.length === 0) return null;

                  return (
                    <div key={folder.id}>
                      <h3 className={`text-sm mb-3 flex items-center gap-2 ${getFolderColorClass(folder.color).split(' ')[2]}`}>
                        <Folder className="w-4 h-4" />
                        {folder.name}
                      </h3>
                      <div className="space-y-2">
                        {papersInFolder.map((savedPaper) => (
                          <div
                            key={savedPaper.paper.id}
                            className={`border rounded-lg p-4 hover:shadow-lg transition-all group ${getFolderColorClass(folder.color)}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <h4 
                                  className="text-white mb-1 cursor-pointer hover:opacity-80"
                                  onClick={() => onOpenPaper?.(savedPaper.paper)}
                                >
                                  {savedPaper.paper.title}
                                </h4>
                                <p className="text-gray-400 text-sm mb-2">
                                  {savedPaper.paper.authors} ({savedPaper.paper.year})
                                </p>
                                <p className="text-white/60 text-xs">
                                  Saved {new Date(savedPaper.savedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <button
                                onClick={() => onDeletePaper(savedPaper.paper.id)}
                                className="p-2 rounded-full bg-red-500/0 hover:bg-red-500/20 text-red-300/0 group-hover:text-red-300 transition-all"
                                title="Remove from saved"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {savedPapers.length === 0 && (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 text-lg mb-2">No saved papers yet</p>
                    <p className="text-white/40 text-sm mb-6">Click the bookmark icon on any paper to save it</p>
                    <div className="max-w-md mx-auto text-left bg-purple-900/20 border border-purple-400/20 rounded-lg p-4 space-y-3">
                      <p className="text-purple-300 text-sm">💡 <span className="text-white">Quick Tips:</span></p>
                      <ul className="text-white/70 text-sm space-y-2">
                        <li>• Save papers from the Selected Paper panel</li>
                        <li>• Create folders to organize your research</li>
                        <li>• Move papers between folders with dropdown</li>
                        <li>• Click on saved papers to reopen them</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Saved Associations View
              <div className="space-y-4">
                {/* Ungrouped Associations */}
                {getAssociationsInFolder(undefined).length > 0 && (
                  <div>
                    <h3 className="text-white/60 text-sm mb-3">Unsorted Associations</h3>
                    <div className="space-y-2">
                      {getAssociationsInFolder(undefined).map((savedAssoc) => (
                        <div
                          key={savedAssoc.id}
                          className={`border rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer ${
                            savedAssoc.type === 'bi-association'
                              ? 'bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-400/20 hover:border-purple-400/50'
                              : 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-blue-400/20 hover:border-blue-400/50'
                          }`}
                          onClick={() => onOpenAssociation?.(savedAssoc)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-white/10">
                              {savedAssoc.type === 'bi-association' ? (
                                <Link2 className="w-5 h-5 text-purple-300" />
                              ) : (
                                <Network className="w-5 h-5 text-blue-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  savedAssoc.type === 'bi-association'
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'bg-blue-500/20 text-blue-300'
                                }`}>
                                  {savedAssoc.type === 'bi-association' ? 'Bi-Association' : 'Poly-Association'}
                                </span>
                                <span className="text-white/60 text-xs">
                                  {savedAssoc.relatedPapers.length + 1} papers
                                </span>
                              </div>
                              <h4 className="text-white mb-1">{savedAssoc.primaryPaper.title}</h4>
                              <p className="text-white/60 text-sm mb-2">
                                Connected with: {savedAssoc.relatedPapers[0]?.title}
                                {savedAssoc.relatedPapers.length > 1 && ` and ${savedAssoc.relatedPapers.length - 1} more`}
                              </p>
                              <p className="text-white/40 text-xs">
                                Saved {new Date(savedAssoc.savedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  onMoveAssociation(savedAssoc.id, e.target.value || undefined);
                                }}
                                className="px-2 py-1 bg-black/40 border border-white/20 rounded text-white text-xs outline-none focus:border-purple-400"
                                defaultValue=""
                              >
                                <option value="">Move to folder...</option>
                                {folders.map((folder) => (
                                  <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteAssociation(savedAssoc.id);
                                }}
                                className="p-2 rounded-full bg-red-500/0 hover:bg-red-500/20 text-red-300/0 group-hover:text-red-300 transition-all"
                                title="Delete association"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Associations in Folders */}
                {folders.filter(f => expandedFolders.has(f.id)).map((folder) => {
                  const assocsInFolder = getAssociationsInFolder(folder.id);
                  if (assocsInFolder.length === 0) return null;

                  return (
                    <div key={folder.id}>
                      <h3 className={`text-sm mb-3 flex items-center gap-2 ${getFolderColorClass(folder.color).split(' ')[2]}`}>
                        <Folder className="w-4 h-4" />
                        {folder.name}
                      </h3>
                      <div className="space-y-2">
                        {assocsInFolder.map((savedAssoc) => (
                          <div
                            key={savedAssoc.id}
                            className={`border rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer ${getFolderColorClass(folder.color)}`}
                            onClick={() => onOpenAssociation?.(savedAssoc)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 rounded-full bg-white/10">
                                {savedAssoc.type === 'bi-association' ? (
                                  <Link2 className="w-5 h-5 text-white" />
                                ) : (
                                  <Network className="w-5 h-5 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 text-white">
                                    {savedAssoc.type === 'bi-association' ? 'Bi-Association' : 'Poly-Association'}
                                  </span>
                                  <span className="text-white/60 text-xs">
                                    {savedAssoc.relatedPapers.length + 1} papers
                                  </span>
                                </div>
                                <h4 className="text-white mb-1">{savedAssoc.primaryPaper.title}</h4>
                                <p className="text-white/60 text-sm">
                                  Connected with: {savedAssoc.relatedPapers[0]?.title}
                                  {savedAssoc.relatedPapers.length > 1 && ` and ${savedAssoc.relatedPapers.length - 1} more`}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteAssociation(savedAssoc.id);
                                }}
                                className="p-2 rounded-full bg-red-500/0 hover:bg-red-500/20 text-red-300/0 group-hover:text-red-300 transition-all"
                                title="Delete association"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {savedAssociations.length === 0 && (
                  <div className="text-center py-12">
                    <Network className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 text-lg mb-2">No saved associations yet</p>
                    <p className="text-white/40 text-sm mb-6">Save bi-association or poly-association results to view them here</p>
                    <div className="max-w-md mx-auto text-left bg-blue-900/20 border border-blue-400/20 rounded-lg p-4 space-y-3">
                      <p className="text-blue-300 text-sm">💡 <span className="text-white">Quick Tips:</span></p>
                      <ul className="text-white/70 text-sm space-y-2">
                        <li>• Click "Save Association" in bi-association view</li>
                        <li>• Click "Save Network" in poly-association view</li>
                        <li>• Organize associations into color-coded folders</li>
                        <li>• Click saved associations to reopen them</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <p className="text-white/40 text-xs text-center">
            Press <span className="text-white/60">ESC</span> to close • Organize your research with folders
          </p>
        </div>
      </div>
    </div>
  );
}