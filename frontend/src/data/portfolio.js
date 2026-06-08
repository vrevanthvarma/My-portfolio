// Portfolio content data — used as a fallback when API fetch fails.
export const PORTFOLIO_DATA = {
  profile: {
    name: 'Vejandla Revanth Varma',
    firstName: 'Revanth',
    title: 'AI & ML Engineer · Developer Relations',
    tagline: 'Building Sovereign AI at population scale',
    college: 'Keshav Memorial Engineering College (Affiliated to Osmania University)',
    summary:
      'Final-year B.E. student in Computer Science (AI & ML), specialized in building high-performance Python-based AI pipelines and LLM-powered applications. Passionate about translating complex technical systems into accessible developer tools, tutorials, and documentation.',
    email: 'vrevanth2004@gmail.com',
    phone: '+91 85200 87605',
    linkedin: 'https://linkedin.com/in/vrevanthvarma',
    github: 'https://github.com/vrevanthvarma',
    resumeUrl:
      'https://customer-assets.emergentagent.com/job_3bf2e9d1-2049-4dee-8872-f47d5943740e/artifacts/4yd2u0in_Revanth_Varma_Sarvam_Resume.pdf',
    availability: 'ai/ml · devrel',
  },
  stats: [
    { label: 'projects', value: '3' },
    { label: 'skills', value: '25' },
    { label: 'milestones', value: '3' },
  ],
  skills: [
    { group: 'Languages', key: 'languages', items: ['Python', 'SQL', 'JavaScript', 'TypeScript'] },
    {
      group: 'Frameworks & Libraries',
      key: 'frameworks',
      items: ['FastAPI', 'React', 'TensorFlow', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'MediaPipe', 'OpenCV'],
    },
    {
      group: 'Cloud & Tools',
      key: 'tools',
      items: ['Git', 'GitHub', 'Jupyter Notebook', 'Postman', 'SQLite', 'FAISS', 'mBERT', 'LLM APIs'],
    },
    {
      group: 'DevRel',
      key: 'devrel',
      items: ['Technical Writing', 'API Documentation', 'Developer Tutorials', 'Interactive Demos'],
    },
  ],
  projects: [
    {
      id: 'project_01',
      category: 'AI / ML',
      categoryKey: 'aiml',
      title: 'AI-Powered Sports Talent Assessment Platform',
      subtitle: 'Real-time pose inference at the edge',
      description:
        'An async Python pipeline that ingests live video, runs MediaPipe + OpenCV pose inference, counts repetitions, and flags anomalous patterns in real time — exposed through a FastAPI service.',
      metrics: [
        { label: 'Throughput', value: '24+ FPS' },
        { label: 'Rep Accuracy', value: '90%' },
        { label: 'Fraud Reduction', value: '~85%' },
      ],
      tech: ['Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'SQLite', 'Async'],
      link: 'https://github.com/vrevanthvarma',
    },
    {
      id: 'project_02',
      category: 'LLM · DevRel',
      categoryKey: 'llm',
      title: 'LLM-Powered Natural Language to SQL Engine',
      subtitle: 'Schema-aware NL→SQL with sub-3s latency',
      description:
        'A retrieval-augmented NL→SQL service: schema-aware prompting, LLM call, validation, then execution against a sandboxed database. Shipped with a React UI and full developer documentation.',
      metrics: [
        { label: 'Time Saved', value: '~70%' },
        { label: 'Query Types', value: '15+' },
        { label: 'Latency', value: '< 3s' },
      ],
      tech: ['Python', 'FastAPI', 'LLM APIs', 'NLP', 'React', 'SQL'],
      link: 'https://github.com/vrevanthvarma',
    },
    {
      id: 'project_03',
      category: 'LLM · DevRel',
      categoryKey: 'llm',
      title: 'RAG-Powered Developer Documentation Assistant',
      subtitle: 'Semantic search over multi-repo SDK docs',
      description:
        'An on-device retrieval-augmented chat assistant indexing SDK docs across repositories using FAISS + mBERT embeddings. Built as a portable DevRel tool that answers integration questions with citations.',
      metrics: [
        { label: 'Answer Accuracy', value: '94.2%' },
        { label: 'Avg Latency', value: '1.2s' },
        { label: 'Indexed Pages', value: '12k+' },
      ],
      tech: ['Python', 'FAISS', 'mBERT', 'FastAPI', 'React'],
      link: 'https://github.com/vrevanthvarma',
    },
  ],
  experience: [
    {
      status: 'In Progress',
      title: 'Professional AI & ML Programme',
      org: 'IIIT Hyderabad',
      description: 'Advanced AI, NLP, & Deep Learning architectures.',
    },
    {
      status: '2022 — 2026',
      title: 'B.E. in Computer Science Engineering (AI & ML)',
      org: 'Keshav Memorial Engineering College (Affiliated to Osmania University)',
      description: 'Final year — focused on AI pipelines, async systems, applied ML.',
    },
    {
      status: '2024',
      title: 'AI-Powered Sports Talent Assessment Platform — Project Lifecycle',
      org: 'Independent Build',
      description:
        'Designed, built, and shipped an async vision pipeline with REST surface and admin tooling end-to-end.',
    },
  ],
};
