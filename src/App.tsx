import { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { SearchBar } from './components/SearchBar';
import { HelpButton } from './components/HelpButton';
import { ChatBotButton } from './components/ChatBotButton';
import { PaperPanel } from './components/PaperPanel';
import { WorldMap } from './components/WorldMap';
import { MapButton } from './components/MapButton';
import { InteractivePapers } from './components/InteractivePapers';
import { ZoneLabels } from './components/ZoneLabels';
import { InteractiveTrees } from './components/InteractiveTrees';
import { AssociationModeSelector } from './components/AssociationModeSelector';
import { BiAssociationView } from './components/BiAssociationView';
import { PolyAssociationView } from './components/PolyAssociationView';
import { SavedPapersPanel, SavedPaper, SavedAssociation, PaperFolder } from './components/SavedPapersPanel';
import { SavedPapersButton } from './components/SavedPapersButton';
import { MusicPlayerButton } from './components/MusicPlayerButton';
import { MusicPlayer } from './components/MusicPlayer';
import { Paper, papers } from './data/mockData';
import forestBackground from 'figma:asset/6cf291dafe62620e8cd26e3634b53780bf90acdc.png';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWorldMap, setShowWorldMap] = useState(false);
  const [showZoneLabels, setShowZoneLabels] = useState(true);
  const [showAssociationSelector, setShowAssociationSelector] = useState(false);
  const [associationMode, setAssociationMode] = useState<'bi-association' | 'poly-association' | null>(null);
  const [treePaper, setTreePaper] = useState<Paper | null>(null);
  const [showSavedPapers, setShowSavedPapers] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  
  // Saved papers state
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [savedAssociations, setSavedAssociations] = useState<SavedAssociation[]>([]);
  const [folders, setFolders] = useState<PaperFolder[]>([]);

  // Handle ESC key to close modes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (associationMode) {
          handleCloseAssociationMode();
        } else if (showAssociationSelector) {
          setShowAssociationSelector(false);
        } else {
          setSelectedPaper(null);
          setShowWorldMap(false);
        }
      }
      // Toggle zone labels with 'L' key
      if (e.key === 'l' || e.key === 'L') {
        setShowZoneLabels(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [associationMode, showAssociationSelector]);

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handlePaperTeleport = (paperId: string) => {
    const paper = papers.find(p => p.id === paperId);
    if (paper) {
      setSelectedPaper(paper);
      // Close the search panels and highlight the paper
      setSearchQuery('');
    }
  };

  const handleZoneClick = (categoryName: string) => {
    // Navigate to category zone
    setSearchQuery(categoryName);
    setShowWorldMap(false);
  };

  const handleCategorySelect = (category: string, subcategory?: string) => {
    if (subcategory) {
      setSearchQuery(`${category} > ${subcategory}`);
    } else {
      setSearchQuery(category);
    }
  };

  const handleTreeButtonClick = (paper: Paper) => {
    setTreePaper(paper);
    setShowAssociationSelector(true);
  };

  const handleAssociationModeSelect = (mode: 'bi-association' | 'poly-association') => {
    setAssociationMode(mode);
    setShowAssociationSelector(false);
  };

  const handleCloseAssociationMode = () => {
    setAssociationMode(null);
    setTreePaper(null);
  };

  // Saved papers management functions
  const handleSavePaper = (paper: Paper) => {
    if (!savedPapers.find(sp => sp.paper.id === paper.id)) {
      setSavedPapers(prev => [...prev, { paper, savedAt: new Date() }]);
    }
  };

  const handleDeletePaper = (paperId: string) => {
    setSavedPapers(prev => prev.filter(sp => sp.paper.id !== paperId));
  };

  const handleSaveAssociation = (
    type: 'bi-association' | 'poly-association',
    primaryPaper: Paper,
    relatedPapers: Paper[]
  ) => {
    const newAssoc: SavedAssociation = {
      id: `assoc-${Date.now()}`,
      type,
      primaryPaper,
      relatedPapers,
      savedAt: new Date(),
    };
    setSavedAssociations(prev => [...prev, newAssoc]);
  };

  const handleDeleteAssociation = (associationId: string) => {
    setSavedAssociations(prev => prev.filter(sa => sa.id !== associationId));
  };

  const handleCreateFolder = (name: string, color: string) => {
    const newFolder: PaperFolder = {
      id: `folder-${Date.now()}`,
      name,
      color,
      createdAt: new Date(),
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const handleDeleteFolder = (folderId: string) => {
    // Remove folder and unassign papers/associations from it
    setFolders(prev => prev.filter(f => f.id !== folderId));
    setSavedPapers(prev => prev.map(sp => 
      sp.folderId === folderId ? { ...sp, folderId: undefined } : sp
    ));
    setSavedAssociations(prev => prev.map(sa => 
      sa.folderId === folderId ? { ...sa, folderId: undefined } : sa
    ));
  };

  const handleMovePaper = (paperId: string, folderId: string | undefined) => {
    setSavedPapers(prev => prev.map(sp => 
      sp.paper.id === paperId ? { ...sp, folderId } : sp
    ));
  };

  const handleMoveAssociation = (associationId: string, folderId: string | undefined) => {
    setSavedAssociations(prev => prev.map(sa => 
      sa.id === associationId ? { ...sa, folderId } : sa
    ));
  };

  const handleClosePanel = () => {
    setSelectedPaper(null);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Unreal Engine Forest Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${forestBackground})` }}
      />

      {/* Zone labels overlaid on forest */}
      <ZoneLabels searchQuery={searchQuery} visible={showZoneLabels && !showWorldMap} />

      {/* Interactive clickable trees */}
      <InteractiveTrees 
        papers={papers}
        onTreeButtonClick={handleTreeButtonClick}
        visible={!showWorldMap}
      />

      {/* Interactive paper nodes overlaid on the forest */}
      <InteractivePapers
        searchQuery={searchQuery}
        onPaperClick={handlePaperClick}
        selectedPaper={selectedPaper}
        mode={associationMode}
      />

      {/* UI Overlays */}
      <SearchBar 
        onSearch={setSearchQuery} 
        onCategorySelect={handleCategorySelect}
        onPaperTeleport={handlePaperTeleport}
      />
      
      {/* Paper Panel */}
      {selectedPaper && (
        <PaperPanel 
          paper={selectedPaper} 
          onClose={handleClosePanel}
          onSave={handleSavePaper}
          isSaved={savedPapers.some(sp => sp.paper.id === selectedPaper.id)}
        />
      )}
      
      <WorldMap
        isActive={showWorldMap}
        searchQuery={searchQuery}
        onZoneClick={handleZoneClick}
      />

      {/* Bottom UI */}
      <HelpButton />
      <ChatBotButton />
      <MusicPlayerButton
        onClick={() => setShowMusicPlayer(!showMusicPlayer)}
        isActive={showMusicPlayer}
      />
      <MapButton
        onClick={() => setShowWorldMap(!showWorldMap)}
        isActive={showWorldMap}
      />

      {/* Music Player Panel */}
      {showMusicPlayer && (
        <MusicPlayer onClose={() => setShowMusicPlayer(false)} />
      )}

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
          <p className="text-white/40 text-xs">
            Press <span className="text-white/60">L</span> to toggle labels • <span className="text-white/60">ESC</span> to close
          </p>
        </div>
      </div>

      {/* Association Mode Selector */}
      {showAssociationSelector && treePaper && (
        <AssociationModeSelector
          paper={treePaper}
          onClose={() => setShowAssociationSelector(false)}
          onSelectMode={handleAssociationModeSelect}
        />
      )}

      {/* Bi-Association View */}
      {associationMode === 'bi-association' && treePaper && (
        <BiAssociationView 
          primaryPaper={treePaper} 
          onClose={handleCloseAssociationMode}
          onSave={(primaryPaper, relatedPaper) => {
            handleSaveAssociation('bi-association', primaryPaper, [relatedPaper]);
          }}
        />
      )}

      {/* Poly-Association View */}
      {associationMode === 'poly-association' && treePaper && (
        <PolyAssociationView 
          primaryPaper={treePaper} 
          onClose={handleCloseAssociationMode}
          onSave={(primaryPaper, relatedPapers) => {
            handleSaveAssociation('poly-association', primaryPaper, relatedPapers);
          }}
        />
      )}

      {/* Saved Papers Panel */}
      {showSavedPapers && (
        <SavedPapersPanel
          savedPapers={savedPapers}
          savedAssociations={savedAssociations}
          folders={folders}
          onClose={() => setShowSavedPapers(false)}
          onDeletePaper={handleDeletePaper}
          onDeleteAssociation={handleDeleteAssociation}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          onMovePaper={handleMovePaper}
          onMoveAssociation={handleMoveAssociation}
          onOpenPaper={handlePaperClick}
        />
      )}

      {/* Saved Papers Button */}
      <SavedPapersButton
        onClick={() => setShowSavedPapers(!showSavedPapers)}
        count={savedPapers.length + savedAssociations.length}
        isActive={showSavedPapers}
      />
    </div>
  );
}