import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { categories, papers, Paper } from '../data/mockData';

interface ForestSceneProps {
  selectedPaper: Paper | null;
  onPaperClick: (paper: Paper) => void;
  searchQuery: string;
  mode: 'search' | 'bisociation' | 'polyassociation' | 'chatbot' | 'worldmap' | null;
  cameraPosition: [number, number, number];
}

export function ForestScene({ selectedPaper, onPaperClick, searchQuery, mode, cameraPosition }: ForestSceneProps) {
  const groundRef = useRef<THREE.Mesh>(null);

  // Filter papers based on search query
  const filteredPapers = useMemo(() => {
    if (!searchQuery) return papers;
    const query = searchQuery.toLowerCase();
    return papers.filter(paper => 
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.keywords.some(k => k.toLowerCase().includes(query)) ||
      paper.category.toLowerCase().includes(query) ||
      paper.subcategory.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Determine which categories match the search
  const matchedCategories = useMemo(() => {
    if (!searchQuery) return new Set(categories.map(c => c.name));
    return new Set(filteredPapers.map(p => p.category));
  }, [searchQuery, filteredPapers]);

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />

      {/* Ground plane - dark with subtle grid */}
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          transparent 
          opacity={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Grid overlay */}
      <gridHelper args={[200, 40, '#222222', '#111111']} position={[0, 0, 0]} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 30, 100]} />

      {/* Category zones (trees) */}
      {categories.map((category, idx) => {
        const isMatched = matchedCategories.has(category.name);
        const opacity = searchQuery && !isMatched ? 0.2 : 1.0;
        const glowIntensity = searchQuery && isMatched ? 2.0 : 1.0;

        return (
          <group key={category.name} position={category.position}>
            {/* Main tree trunk */}
            <mesh castShadow position={[0, 3, 0]}>
              <cylinderGeometry args={[0.5, 0.8, 6, 8]} />
              <meshStandardMaterial 
                color={category.color} 
                transparent 
                opacity={opacity * 0.6}
                emissive={category.color}
                emissiveIntensity={glowIntensity * 0.3}
              />
            </mesh>

            {/* Tree canopy */}
            <mesh castShadow position={[0, 7, 0]}>
              <coneGeometry args={[3, 5, 8]} />
              <meshStandardMaterial 
                color={category.color} 
                transparent 
                opacity={opacity * 0.4}
                emissive={category.color}
                emissiveIntensity={glowIntensity * 0.5}
              />
            </mesh>

            {/* Glow sphere when matched */}
            {searchQuery && isMatched && (
              <mesh position={[0, 5, 0]}>
                <sphereGeometry args={[5, 16, 16]} />
                <meshBasicMaterial 
                  color={category.color} 
                  transparent 
                  opacity={0.15}
                />
              </mesh>
            )}

            {/* Category label */}
            <Text
              position={[0, 10, 0]}
              fontSize={0.8}
              color={category.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {category.name}
            </Text>

            {/* Subcategory markers */}
            {category.subcategories.map((sub, subIdx) => {
              const angle = (subIdx / category.subcategories.length) * Math.PI * 2;
              const radius = 4;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;

              return (
                <group key={sub} position={[x, 0, z]}>
                  <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.2, 0.3, 1, 6]} />
                    <meshStandardMaterial 
                      color={category.color} 
                      transparent 
                      opacity={opacity * 0.5}
                      emissive={category.color}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text
                    position={[0, 1.5, 0]}
                    fontSize={0.4}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="#000000"
                  >
                    {sub}
                  </Text>
                </group>
              );
            })}
          </group>
        );
      })}

      {/* Paper nodes */}
      {filteredPapers.map((paper) => {
        const isSelected = selectedPaper?.id === paper.id;
        const basePosition = new THREE.Vector3(...paper.position);
        
        // Add category base position
        const category = categories.find(c => c.name === paper.category);
        if (category) {
          basePosition.add(new THREE.Vector3(...category.position));
        }

        return (
          <group key={paper.id} position={basePosition.toArray()}>
            <PaperNode 
              paper={paper} 
              isSelected={isSelected}
              onClick={() => onPaperClick(paper)}
              showConnections={mode === 'polyassociation' && isSelected}
            />
          </group>
        );
      })}

      {/* Connection lines for poly-association mode */}
      {mode === 'polyassociation' && selectedPaper && (
        <AssociationLines selectedPaper={selectedPaper} papers={papers} />
      )}

      {/* Bisociation line */}
      {mode === 'bisociation' && selectedPaper && selectedPaper.relatedPapers.length > 0 && (
        <BisociationLine selectedPaper={selectedPaper} papers={papers} />
      )}
    </>
  );
}

interface PaperNodeProps {
  paper: Paper;
  isSelected: boolean;
  onClick: () => void;
  showConnections: boolean;
}

function PaperNode({ paper, isSelected, onClick, showConnections }: PaperNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (glowRef.current && (isSelected || showConnections)) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const category = categories.find(c => c.name === paper.category);
  const color = category?.color || '#ffffff';

  return (
    <group onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Main node sphere */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.0 : 0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={isSelected ? 0.3 : 0.15}
        />
      </mesh>

      {/* Hover detection sphere */}
      <mesh visible={false}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

function AssociationLines({ selectedPaper, papers }: { selectedPaper: Paper; papers: Paper[] }) {
  const relatedPapers = selectedPaper.relatedPapers
    .slice(0, 5)
    .map(id => papers.find(p => p.id === id))
    .filter(Boolean) as Paper[];

  return (
    <>
      {relatedPapers.map((relatedPaper) => {
        const start = getAbsolutePosition(selectedPaper);
        const end = getAbsolutePosition(relatedPaper);
        
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5);
        midPoint.y += 3; // Arc height

        return (
          <ConnectionArc 
            key={relatedPaper.id}
            start={start}
            end={end}
            midPoint={midPoint}
            color={categories.find(c => c.name === selectedPaper.category)?.color || '#ffffff'}
          />
        );
      })}
    </>
  );
}

function BisociationLine({ selectedPaper, papers }: { selectedPaper: Paper; papers: Paper[] }) {
  if (selectedPaper.relatedPapers.length === 0) return null;
  
  const relatedPaper = papers.find(p => p.id === selectedPaper.relatedPapers[0]);
  if (!relatedPaper) return null;

  const start = getAbsolutePosition(selectedPaper);
  const end = getAbsolutePosition(relatedPaper);
  const midPoint = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  midPoint.y += 4;

  return (
    <ConnectionArc 
      start={start}
      end={end}
      midPoint={midPoint}
      color="#FFD700"
      thickness={0.15}
    />
  );
}

function ConnectionArc({ start, end, midPoint, color, thickness = 0.08 }: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  midPoint: THREE.Vector3;
  color: string;
  thickness?: number;
}) {
  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end, midPoint]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} linewidth={thickness} transparent opacity={0.6} />
    </line>
  );
}

function getAbsolutePosition(paper: Paper): THREE.Vector3 {
  const category = categories.find(c => c.name === paper.category);
  const pos = new THREE.Vector3(...paper.position);
  if (category) {
    pos.add(new THREE.Vector3(...category.position));
  }
  return pos;
}
