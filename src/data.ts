// All portfolio content lives here. Edit this file to update the site.
// Source of truth: Devasurya's resume profile (Nov 2026).

export const profile = {
  name: 'Devasurya M',
  short: 'Devaah',
  role: 'Aspiring ML Engineer & AI Developer',
  location: 'Kochi, Kerala',
  email: 'devasurya669@gmail.com',
  github: 'https://github.com/Devasurya-TECH',
  linkedIn: 'https://www.linkedin.com/in/devasurya-m-489934361/',
  leetCode: 'https://leetcode.com/u/DEVASURYA_M/',
  instagram: 'https://www.instagram.com/devawithin/',
  reboundLabs: 'https://labsrebound.com/',
}

export const interests = [
  'Machine Learning', 'Deep Learning', 'Computer Vision', 'Generative AI', 'Large Language Models',
  'NLP', 'Intelligent Document Processing', 'Predictive Analytics', 'Model Deployment',
]

export const socials = [
  { label: 'LinkedIn', handle: 'devasurya-m', href: profile.linkedIn },
  { label: 'GitHub', handle: 'Devasurya-TECH', href: profile.github },
  { label: 'Rebound Labs', handle: 'labsrebound.com', href: profile.reboundLabs },
  { label: 'LeetCode', handle: 'DEVASURYA_M', href: profile.leetCode },
  { label: 'Instagram', handle: '@devawithin', href: profile.instagram },
]

/* Skills. `core` = used hands-on in featured projects (shown dark). Everything else is
   working knowledge from training or smaller experiments — kept honest on purpose. */
export type SkillColumn = { title: string; description: string; core: string[]; items: string[] }

export const skillColumns: SkillColumn[] = [
  {
    title: 'Machine Learning & Data',
    description: 'The full ML lifecycle: exploring and cleaning data, training, evaluating and integrating models.',
    core: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    items: ['Matplotlib', 'EDA', 'Preprocessing', 'Feature Engineering', 'Regression', 'Classification', 'Clustering', 'Random Forest', 'Gradient Boosting', 'XGBoost', 'PCA · t-SNE · SVD', 'Model Evaluation'],
  },
  {
    title: 'Deep Learning, Vision & OCR',
    description: 'Neural networks from the maths up, applied to images and document understanding.',
    core: ['PyTorch', 'docTR', 'OpenCV'],
    items: ['TensorFlow', 'Keras', 'CNNs', 'Transfer Learning', 'Fine-Tuning', 'Feature Extraction', 'TrOCR', 'EasyOCR', 'MobileNet', 'ResNet', 'VGG', 'Inception', 'U-Net', 'SegNet', 'OCR Pipelines'],
  },
  {
    title: 'Software & Infrastructure',
    description: 'Shipping models inside real applications, with APIs, auth, queues and databases.',
    core: ['Django', 'Django REST', 'React', 'Next.js'],
    items: ['TypeScript', 'JavaScript', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Celery', 'Docker', 'Git', 'Linux', 'C', 'Java (fundamentals)'],
  },
]

export type Project = {
  id: string
  title: string
  tag: string
  kind: string
  accent: 'ink' | 'violet' | 'sage' | 'sand'
  summary: string
  highlights: string[]
  stack: string[]
  spec: [string, string][]
  note?: string
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'talentiq',
    title: 'TalentIQ',
    tag: 'Machine learning · Predictive analytics',
    kind: 'ML app',
    accent: 'violet',
    summary: 'An employee analytics platform that turns HR data into salary predictions and attrition-risk assessments.',
    highlights: [
      'End-to-end ML lifecycle: exploration, preprocessing, feature preparation, training and evaluation.',
      'Regression for salary prediction and classification for attrition risk, compared across five model families.',
      'Models integrated into a Django web application and deployed.',
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Django', 'SQLite', 'Bootstrap'],
    spec: [['dataset', 'IBM HR Analytics'], ['rows × features', '1,470 × 31'], ['regression', 'Linear · Ridge · Decision Tree'], ['classification', 'Logistic · Random Forest'], ['served via', 'Django']],
    links: [{ label: 'Source', href: 'https://github.com/Devasurya-TECH/TalentIQ-AI-Powered-Employee-Analytics' }],
  },
  {
    id: 'docuscan',
    title: 'DocuScan AI',
    tag: 'Deep learning · OCR · Computer vision',
    kind: 'DL app',
    accent: 'ink',
    summary: 'Upload a document, extract its text with deep-learning OCR, correct it, and export it as TXT, DOCX or a searchable PDF.',
    highlights: [
      'Primary OCR with Mindee docTR on PyTorch: DBNet text detection and CRNN recognition on MobileNetV3 backbones.',
      'TrOCR for handwriting and EasyOCR as a fallback; OpenCV preprocessing with CLAHE, edge detection and perspective correction.',
      'Multi-page and scanned PDFs, background jobs on Celery + Redis, JWT auth and per-user document isolation.',
    ],
    stack: ['PyTorch', 'docTR', 'TrOCR', 'OpenCV', 'Django REST', 'Celery', 'Redis', 'PostgreSQL', 'Docker', 'React'],
    spec: [['detection', 'DBNet (MobileNetV3)'], ['recognition', 'CRNN · TrOCR · EasyOCR'], ['inference', '~1.8–2.2 s *'], ['tests', '36 backend passing *'], ['export', 'txt · docx · pdf']],
    note: '* Results from the project’s own development tests, not independent production benchmarks.',
    links: [{ label: 'Source', href: 'https://github.com/Devasurya-TECH/DocuScan-Ai' }],
  },
  {
    id: 'logitrace',
    title: 'LogiTrace',
    tag: 'Full-stack · Logistics ERP MVP',
    kind: 'MVP',
    accent: 'sage',
    summary: 'A role-based logistics ERP and fleet platform for managers, supervisors and drivers, built as a functional MVP.',
    highlights: [
      'Three-role auth with fleet management, trip creation, driver allocation and a manager analytics dashboard.',
      'Multi-stop route planning with Greedy Nearest Neighbour + 2-Opt heuristics, plus distance, ETA and fuel-cost estimates.',
      'GPS-verified delivery with photo proof, fuel approvals, SOS alerts and inactivity monitoring, as a mobile-first PWA.',
    ],
    stack: ['Next.js 16', 'TypeScript', 'React', 'Supabase', 'REST APIs', 'Recharts', 'PWA'],
    spec: [['roles', 'manager · supervisor · driver'], ['routing', 'nearest neighbour + 2-opt'], ['verification', 'GPS + photo proof'], ['backend', 'Supabase'], ['status', 'functional MVP']],
    note: 'Built independently with AI-assisted development. Route optimisation uses heuristics, not trained ML models.',
    links: [{ label: 'Source', href: 'https://github.com/Devasurya-TECH/logistics-erp' }],
  },
  {
    id: 'vision',
    title: 'Vision Lab',
    tag: 'Computer vision · Training work',
    kind: 'Experiments',
    accent: 'sand',
    summary: 'Hands-on notebooks from my AI/ML program: classifiers, transfer learning and segmentation, built to understand the internals.',
    highlights: [
      'Image classification with CNNs on Fashion MNIST and Sign Language MNIST.',
      'Transfer learning, feature extraction and fine-tuning with MobileNetV2, VGG, ResNet and Inception.',
      'Segmentation fundamentals with U-Net and SegNet.',
    ],
    stack: ['PyTorch', 'TensorFlow', 'Keras', 'CNNs', 'U-Net', 'SegNet'],
    spec: [['datasets', 'Fashion · Sign MNIST'], ['backbones', 'MobileNetV2 · VGG · ResNet'], ['segmentation', 'U-Net · SegNet'], ['status', 'ongoing']],
    links: [{ label: 'See the training', href: '#journey' }],
  },
]

export type TimelineItem = {
  when: string
  title: string
  place: string
  placeHref?: string
  meta?: string
  detail: string
  points?: string[]
  current?: boolean
  muted?: boolean
}

export const timeline: TimelineItem[] = [
  {
    when: 'Nov 2025 – Present',
    title: 'Chief Technology Officer',
    place: 'Rebound Labs',
    placeHref: profile.reboundLabs,
    meta: 'Part-time · Founding team · Kochi',
    detail: 'Leading the technical side of a small studio building websites, web apps and enterprise apps on the MERN stack.',
    points: [
      'Coordinate a team of five to six across frontend, backend and design.',
      'Review and test client builds; find bugs and usability issues and drive fixes.',
      'Take part in technical planning, tech choices and quality standards.',
    ],
    current: true,
  },
  {
    when: 'Currently pursuing',
    title: 'AI/ML Engineering Program',
    place: 'Brototype',
    meta: '52 weeks · Kochi',
    detail: 'Structured training across programming, maths for ML, data science, machine learning, deep learning and computer vision.',
    current: true,
  },
  {
    when: '2025',
    title: 'Higher Secondary (Class 12)',
    place: 'MGM Residential Public School',
    meta: 'CBSE · Computer Science · Kottarakara',
    detail: 'Computer Science stream.',
  },
  {
    when: 'Next',
    title: 'Going deeper into AI',
    place: 'Building skills',
    detail: 'Large language models, generative AI, NLP and putting models into production.',
    muted: true,
  },
]

export const training = {
  program: 'Brototype · 52-week AI/ML Engineering Program',
  modules: [
    ['01', 'Programming', 'Python, C, Java OOP & problem solving'],
    ['02', 'Data Science', 'NumPy, Pandas, Matplotlib, cleaning & EDA'],
    ['03', 'Maths for ML', 'Linear algebra, eigenvectors, calculus, probability, Bayes & hypothesis testing'],
    ['04', 'Machine Learning', 'Regression, trees, ensembles, XGBoost, clustering & PCA / t-SNE / SVD'],
    ['05', 'Deep Learning', 'ANNs, activations, losses, backprop, TensorFlow, Keras & PyTorch'],
    ['06', 'Computer Vision', 'CNNs, transfer learning, fine-tuning, U-Net & SegNet'],
  ] as [string, string, string][],
}
