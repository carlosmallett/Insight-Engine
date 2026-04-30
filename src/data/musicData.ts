// Music data for the Insight Engine music player

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // in mm:ss format
  albumId: string;
  category: 'ambient' | 'classical' | 'electronic' | 'nature';
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverColor: string;
  trackCount: number;
  totalDuration: string;
  category: 'ambient' | 'classical' | 'electronic' | 'nature';
  description: string;
}

export const albums: Album[] = [
  {
    id: 'album1',
    title: 'Map of Reflections',
    artist: 'Various Artists',
    coverColor: '#4F46E5',
    trackCount: 8,
    totalDuration: '62:15',
    category: 'ambient',
    description: 'Ambient soundscapes for deep concentration and research'
  },
  {
    id: 'album2',
    title: 'Architecture of Light',
    artist: 'Nature Sounds',
    coverColor: '#059669',
    trackCount: 6,
    totalDuration: '45:30',
    category: 'nature',
    description: 'Natural forest sounds to enhance your immersive experience'
  },
  {
    id: 'album3',
    title: 'The World Was Still Turning',
    artist: 'Digital Mind',
    coverColor: '#7C3AED',
    trackCount: 10,
    totalDuration: '58:42',
    category: 'electronic',
    description: 'Electronic compositions inspired by AI and consciousness'
  },
  {
    id: 'album4',
    title: 'Minor Distance',
    artist: 'Various Composers',
    coverColor: '#DC2626',
    trackCount: 12,
    totalDuration: '78:20',
    category: 'classical',
    description: 'Timeless classical pieces perfect for scholarly work'
  },
  {
    id: 'album5',
    title: 'Dispositions',
    artist: 'Mind Collective',
    coverColor: '#0891B2',
    trackCount: 7,
    totalDuration: '52:18',
    category: 'ambient',
    description: 'Designed to enhance cognitive performance and creativity'
  },
];

export const tracks: Track[] = [
  // Deep Focus Album
  {
    id: 'track1',
    title: 'Awareness Drift',
    artist: 'Ethereal Mind',
    duration: '8:42',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track2',
    title: 'Attention Schema',
    artist: 'Consciousness Lab',
    duration: '7:15',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track3',
    title: 'Silent Contemplation',
    artist: 'Deep Space',
    duration: '9:20',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track4',
    title: 'Research Hours',
    artist: 'Study Collective',
    duration: '6:48',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track5',
    title: 'Neural Pathways',
    artist: 'Brain Wave',
    duration: '8:55',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track6',
    title: 'Focused State',
    artist: 'Ethereal Mind',
    duration: '7:30',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track7',
    title: 'Deep Thinking',
    artist: 'Consciousness Lab',
    duration: '6:25',
    albumId: 'album1',
    category: 'ambient'
  },
  {
    id: 'track8',
    title: 'Insight Moment',
    artist: 'Deep Space',
    duration: '7:20',
    albumId: 'album1',
    category: 'ambient'
  },

  // Forest Meditation Album
  {
    id: 'track9',
    title: 'Morning Forest',
    artist: 'Nature Sounds',
    duration: '8:15',
    albumId: 'album2',
    category: 'nature'
  },
  {
    id: 'track10',
    title: 'Birdsong Chorus',
    artist: 'Nature Sounds',
    duration: '7:45',
    albumId: 'album2',
    category: 'nature'
  },
  {
    id: 'track11',
    title: 'Rustling Leaves',
    artist: 'Nature Sounds',
    duration: '6:50',
    albumId: 'album2',
    category: 'nature'
  },
  {
    id: 'track12',
    title: 'Stream Flow',
    artist: 'Nature Sounds',
    duration: '8:30',
    albumId: 'album2',
    category: 'nature'
  },
  {
    id: 'track13',
    title: 'Evening Woods',
    artist: 'Nature Sounds',
    duration: '7:05',
    albumId: 'album2',
    category: 'nature'
  },
  {
    id: 'track14',
    title: 'Rain on Canopy',
    artist: 'Nature Sounds',
    duration: '7:05',
    albumId: 'album2',
    category: 'nature'
  },

  // Neural Networks Album
  {
    id: 'track15',
    title: 'Artificial Dreams',
    artist: 'Digital Mind',
    duration: '5:42',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track16',
    title: 'Recursive Patterns',
    artist: 'Digital Mind',
    duration: '6:15',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track17',
    title: 'Machine Learning',
    artist: 'Digital Mind',
    duration: '5:30',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track18',
    title: 'Data Streams',
    artist: 'Digital Mind',
    duration: '6:08',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track19',
    title: 'Quantum Computing',
    artist: 'Digital Mind',
    duration: '5:55',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track20',
    title: 'Consciousness Upload',
    artist: 'Digital Mind',
    duration: '6:22',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track21',
    title: 'Neural Interface',
    artist: 'Digital Mind',
    duration: '5:48',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track22',
    title: 'Digital Awakening',
    artist: 'Digital Mind',
    duration: '6:12',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track23',
    title: 'Algorithmic Beauty',
    artist: 'Digital Mind',
    duration: '5:35',
    albumId: 'album3',
    category: 'electronic'
  },
  {
    id: 'track24',
    title: 'Synthetic Emotions',
    artist: 'Digital Mind',
    duration: '5:15',
    albumId: 'album3',
    category: 'electronic'
  },

  // Classical Study Album (sample tracks)
  {
    id: 'track25',
    title: 'Moonlight Sonata (Movement 1)',
    artist: 'Beethoven',
    duration: '6:15',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track26',
    title: 'Clair de Lune',
    artist: 'Debussy',
    duration: '5:42',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track27',
    title: 'Gymnopédie No. 1',
    artist: 'Satie',
    duration: '3:28',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track28',
    title: 'Prelude in E Minor',
    artist: 'Chopin',
    duration: '4:15',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track29',
    title: 'Air on G String',
    artist: 'Bach',
    duration: '5:05',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track30',
    title: 'Canon in D',
    artist: 'Pachelbel',
    duration: '4:52',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track31',
    title: 'Pavane',
    artist: 'Fauré',
    duration: '6:38',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track32',
    title: 'Adagio for Strings',
    artist: 'Barber',
    duration: '8:25',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track33',
    title: 'The Lark Ascending',
    artist: 'Vaughan Williams',
    duration: '15:30',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track34',
    title: 'Nocturne in E-flat',
    artist: 'Chopin',
    duration: '5:18',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track35',
    title: 'Spiegel im Spiegel',
    artist: 'Pärt',
    duration: '8:32',
    albumId: 'album4',
    category: 'classical'
  },
  {
    id: 'track36',
    title: 'Reverie',
    artist: 'Debussy',
    duration: '4:20',
    albumId: 'album4',
    category: 'classical'
  },

  // Cognitive Flow Album
  {
    id: 'track37',
    title: 'Synaptic Flow',
    artist: 'Mind Collective',
    duration: '7:48',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track38',
    title: 'Theta Waves',
    artist: 'Mind Collective',
    duration: '8:12',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track39',
    title: 'Cognitive Enhancement',
    artist: 'Mind Collective',
    duration: '7:25',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track40',
    title: 'Memory Palace',
    artist: 'Mind Collective',
    duration: '6:55',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track41',
    title: 'Creative Insight',
    artist: 'Mind Collective',
    duration: '7:38',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track42',
    title: 'Flow State',
    artist: 'Mind Collective',
    duration: '8:05',
    albumId: 'album5',
    category: 'ambient'
  },
  {
    id: 'track43',
    title: 'Mental Clarity',
    artist: 'Mind Collective',
    duration: '6:15',
    albumId: 'album5',
    category: 'ambient'
  },
];