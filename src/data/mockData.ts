// Mock research data for the Insight Engine
export interface Paper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  year: number;
  keywords: string[];
  category: string;
  subcategory: string;
  position: [number, number, number];
  relatedPapers: string[];
}

export interface Category {
  name: string;
  subcategories: string[];
  position: [number, number, number];
  color: string;
}

export const categories: Category[] = [
  {
    name: "AI",
    subcategories: ["Machine Learning", "Neural Networks", "Computer Vision", "Natural Language Processing"],
    position: [0, 0, 0],
    color: "#4FC3F7"
  },
  {
    name: "Computation",
    subcategories: ["Algorithms", "Data Structures", "Distributed Systems", "Quantum Computing"],
    position: [15, 0, -10],
    color: "#81C784"
  },
  {
    name: "Consciousness Studies",
    subcategories: ["Attention Schema Theory", "Global Workspace Theory", "Integrated Information Theory", "Phenomenology"],
    position: [-15, 0, -10],
    color: "#FFB74D"
  },
  {
    name: "Cybernetics and AI History",
    subcategories: ["Early AI Research", "Control Theory", "Feedback Systems", "Information Theory"],
    position: [30, 0, -20],
    color: "#E57373"
  },
  {
    name: "Disciplines",
    subcategories: ["Interdisciplinary Studies", "Cognitive Science", "Neuroscience", "Philosophy"],
    position: [-30, 0, -20],
    color: "#BA68C8"
  },
  {
    name: "Energy - and LLMs",
    subcategories: ["Energy Efficiency", "Large Language Models", "Computational Cost", "Sustainability"],
    position: [0, 0, -30],
    color: "#4DB6AC"
  },
  {
    name: "Governance and Oversight",
    subcategories: ["AI Ethics", "Policy and Regulation", "Safety Frameworks", "Accountability"],
    position: [20, 0, -30],
    color: "#FFD54F"
  },
  {
    name: "Neuroscience Research",
    subcategories: ["Brain Imaging", "Neural Correlates", "Cognitive Function", "Neuroplasticity"],
    position: [-20, 0, -30],
    color: "#AED581"
  },
  {
    name: "Robotics",
    subcategories: [
      "Biomimetic Approaches to Humanoid Robotics",
      "Ethical and Social Implications of AI and Robotics",
      "Human-Robot Interaction",
      "Robotics and Situated Knowledge Production",
      "Robots and Emotion"
    ],
    position: [10, 0, -40],
    color: "#FF8A65"
  },
  {
    name: "Social and Cultural Ramifications",
    subcategories: ["Impact on Society", "Cultural Studies", "Human-AI Interaction", "Digital Humanities"],
    position: [-10, 0, -40],
    color: "#9575CD"
  },
  {
    name: "Systems Thinking",
    subcategories: ["Complex Systems", "Emergence", "Network Theory", "Cybernetic Systems"],
    position: [0, 0, -50],
    color: "#4FC3F7"
  },
  {
    name: "Claude Relationalities",
    subcategories: ["AI Relationships", "Conversational AI", "Human-AI Collaboration", "Anthropic Research"],
    position: [15, 0, -50],
    color: "#F06292"
  }
];

export const papers: Paper[] = [
  {
    id: "paper1",
    title: "Rethinking Consciousness: The Attention Schema Theory",
    authors: "Michael Graziano",
    abstract: "This paper proposes that consciousness is the brain's simplified model of attention. The attention schema theory suggests that awareness is a construct that allows the brain to attribute the property of subjective experience to itself.",
    year: 2019,
    keywords: ["consciousness", "attention", "awareness", "Graziano"],
    category: "Consciousness Studies",
    subcategory: "Attention Schema Theory",
    position: [2, 1, 2],
    relatedPapers: ["paper2", "paper4", "paper7"]
  },
  {
    id: "paper2",
    title: "Global Workspace Theory: A Rigorous Scientific Theory of Consciousness",
    authors: "Bernard Baars",
    abstract: "Global Workspace Theory posits that consciousness arises from a 'global workspace' in the brain that broadcasts information to multiple cognitive processes simultaneously.",
    year: 2017,
    keywords: ["consciousness", "global workspace", "information", "Baars"],
    category: "Consciousness Studies",
    subcategory: "Global Workspace Theory",
    position: [-2, 1, 1],
    relatedPapers: ["paper1", "paper3", "paper5"]
  },
  {
    id: "paper3",
    title: "Integrated Information Theory: From Consciousness to its Physical Substrate",
    authors: "Giulio Tononi",
    abstract: "IIT proposes that consciousness corresponds to integrated information, quantified as Φ (phi). The theory provides a mathematical framework for understanding phenomenal experience.",
    year: 2016,
    keywords: ["consciousness", "information integration", "phi", "Tononi"],
    category: "Consciousness Studies",
    subcategory: "Integrated Information Theory",
    position: [0, 1, -2],
    relatedPapers: ["paper2", "paper6", "paper8"]
  },
  {
    id: "paper4",
    title: "Neural Correlates of Attention and Awareness",
    authors: "Sarah Mitchell and David Wong",
    abstract: "This study investigates the neural mechanisms underlying selective attention and their relationship to conscious awareness using fMRI and EEG measurements.",
    year: 2020,
    keywords: ["attention", "awareness", "fMRI", "neural correlates"],
    category: "Neuroscience Research",
    subcategory: "Neural Correlates",
    position: [32, 1, -18],
    relatedPapers: ["paper1", "paper5", "paper9"]
  },
  {
    id: "paper5",
    title: "Cognitive Functions of the Prefrontal Cortex",
    authors: "Jennifer Lee",
    abstract: "An extensive review of prefrontal cortex involvement in executive function, working memory, and decision-making processes.",
    year: 2018,
    keywords: ["prefrontal cortex", "executive function", "working memory"],
    category: "Neuroscience Research",
    subcategory: "Cognitive Function",
    position: [28, 1, -22],
    relatedPapers: ["paper2", "paper4", "paper6"]
  },
  {
    id: "paper6",
    title: "Deep Learning Models Inspired by Neuroscience",
    authors: "Alex Chen and Maria Rodriguez",
    abstract: "This paper explores how insights from neuroscience can inform the development of more sophisticated artificial neural networks and cognitive architectures.",
    year: 2021,
    keywords: ["deep learning", "neural networks", "neuroscience", "AI"],
    category: "AI",
    subcategory: "Neural Networks",
    position: [-28, 1, -18],
    relatedPapers: ["paper3", "paper5", "paper10"]
  },
  {
    id: "paper7",
    title: "Attention Mechanisms in Transformer Networks",
    authors: "James Park",
    abstract: "A comprehensive analysis of attention mechanisms in modern transformer architectures and their relationship to biological attention systems.",
    year: 2022,
    keywords: ["transformers", "attention", "neural architecture", "AI"],
    category: "AI",
    subcategory: "Natural Language Processing",
    position: [-32, 1, -22],
    relatedPapers: ["paper1", "paper6", "paper11"]
  },
  {
    id: "paper8",
    title: "Biomimetic Approaches to Humanoid Robotics",
    authors: "Robert Anderson",
    abstract: "An exploration of how biological systems inspire the design of more natural and adaptive humanoid robots, including locomotion and manipulation strategies.",
    year: 2021,
    keywords: ["biomimetics", "humanoid robots", "locomotion", "adaptation"],
    category: "Robotics",
    subcategory: "Biomimetic Approaches to Humanoid Robotics",
    position: [2, 1, -38],
    relatedPapers: ["paper9", "paper10", "paper12"]
  },
  {
    id: "paper9",
    title: "Human-Robot Interaction: Social and Emotional Dimensions",
    authors: "Emily Foster",
    abstract: "This paper examines how robots can recognize and respond to human emotions, creating more natural and empathetic interactions.",
    year: 2020,
    keywords: ["HRI", "emotion recognition", "social robotics", "empathy"],
    category: "Robotics",
    subcategory: "Human-Robot Interaction",
    position: [-2, 1, -42],
    relatedPapers: ["paper4", "paper8", "paper3"]
  },
  {
    id: "paper10",
    title: "Large Language Models and Energy Efficiency",
    authors: "Thomas Green",
    abstract: "An analysis of the computational costs and energy requirements of training and deploying large language models, with proposals for more sustainable approaches.",
    year: 2023,
    keywords: ["LLMs", "energy efficiency", "sustainability", "carbon footprint"],
    category: "Energy - and LLMs",
    subcategory: "Large Language Models",
    position: [-28, 1, -24],
    relatedPapers: ["paper6", "paper7", "paper11"]
  },
  {
    id: "paper11",
    title: "AI Ethics and Governance Frameworks",
    authors: "Rachel Kim",
    abstract: "Proposing comprehensive frameworks for responsible AI development, including transparency, accountability, and fairness considerations.",
    year: 2023,
    keywords: ["AI ethics", "governance", "accountability", "fairness"],
    category: "Governance and Oversight",
    subcategory: "AI Ethics",
    position: [-30, 1, -18],
    relatedPapers: ["paper1", "paper7", "paper10"]
  },
  {
    id: "paper12",
    title: "Complex Systems and Emergence in AI",
    authors: "George Harris",
    abstract: "A systems thinking approach to understanding how intelligence emerges from the interaction of simple components in neural networks and biological systems.",
    year: 2022,
    keywords: ["complex systems", "emergence", "systems thinking", "AI"],
    category: "Systems Thinking",
    subcategory: "Complex Systems",
    position: [0, 1, -44],
    relatedPapers: ["paper8", "paper9", "paper5"]
  },
  {
    id: "paper13",
    title: "A Deeply Human Look at Technology",
    authors: "Emma Thompson",
    abstract: "Exploring the intersection of technology and humanity, this paper examines how our tools shape and are shaped by human values and experiences.",
    year: 2020,
    keywords: ["technology", "humanity", "values", "culture"],
    category: "Social and Cultural Ramifications",
    subcategory: "Impact on Society",
    position: [5, 1, -35],
    relatedPapers: ["paper11", "paper9", "paper14"]
  },
  {
    id: "paper14",
    title: "Artificial Intelligence and Society",
    authors: "Marcus Chen",
    abstract: "A comprehensive examination of AI's impact on social structures, employment, and cultural dynamics in the 21st century.",
    year: 2021,
    keywords: ["AI", "society", "employment", "culture"],
    category: "Social and Cultural Ramifications",
    subcategory: "Impact on Society",
    position: [8, 1, -38],
    relatedPapers: ["paper13", "paper11", "paper6"]
  },
  {
    id: "paper15",
    title: "Ethics of Artificial Intelligence",
    authors: "Sophia Rodriguez",
    abstract: "This paper addresses fundamental ethical questions surrounding AI development, deployment, and governance.",
    year: 2022,
    keywords: ["ethics", "AI", "philosophy", "morality"],
    category: "Governance and Oversight",
    subcategory: "AI Ethics",
    position: [-25, 1, -32],
    relatedPapers: ["paper11", "paper16", "paper9"]
  },
  {
    id: "paper16",
    title: "Machine Ethics",
    authors: "Minerva Wiles and Sebastian Crane",
    abstract: "Developing frameworks for embedding ethical decision-making capabilities into autonomous systems and robots.",
    year: 2017,
    keywords: ["robotics", "ethics", "machine learning"],
    category: "Robotics",
    subcategory: "Ethical and Social Implications of AI and Robotics",
    position: [4, 1, -36],
    relatedPapers: ["paper8", "paper9", "paper15"]
  },
  {
    id: "paper17",
    title: "Robots and Emotional Intelligence",
    authors: "Lisa Park",
    abstract: "Investigating how robots can develop and express emotional intelligence to improve human-robot collaboration.",
    year: 2019,
    keywords: ["emotion", "robotics", "EQ", "collaboration"],
    category: "Robotics",
    subcategory: "Robots and Emotion",
    position: [6, 1, -40],
    relatedPapers: ["paper9", "paper16", "paper8"]
  },
  {
    id: "paper18",
    title: "Situated Knowledge in Robotic Systems",
    authors: "Nathan Wright",
    abstract: "Exploring how robots develop context-aware knowledge through embodied interaction with their environment.",
    year: 2020,
    keywords: ["situated cognition", "embodiment", "robotics", "context"],
    category: "Robotics",
    subcategory: "Robotics and Situated Knowledge Production",
    position: [3, 1, -39],
    relatedPapers: ["paper8", "paper17", "paper9"]
  }
];