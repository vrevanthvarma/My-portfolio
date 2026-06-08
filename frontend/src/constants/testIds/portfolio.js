// Test IDs for the portfolio site.
export const NAV = {
  container: 'site-nav',
  logo: 'nav-logo',
  linkAbout: 'nav-link-about',
  linkProjects: 'nav-link-projects',
  linkExperience: 'nav-link-experience',
  linkContact: 'nav-link-contact',
  letsTalkBtn: 'nav-lets-talk-btn',
  adminLink: 'nav-admin-link',
  // legacy aliases kept for compatibility
  linkSkills: 'nav-link-about',
  resumeBtn: 'nav-lets-talk-btn',
};

export const HERO = {
  section: 'hero-section',
  linkedinBtn: 'hero-linkedin-btn',
  githubBtn: 'hero-github-btn',
  resumeBtn: 'hero-resume-btn',
  exploreBtn: 'hero-explore-btn',
  emailLink: 'hero-email-link',
};

export const SKILLS = {
  section: 'skills-section',
  group: (name) => `skills-group-${name}`,
  chip: (name) => `skill-chip-${name}`,
};

export const PROJECTS = {
  section: 'projects-section',
  filterAll: 'projects-filter-all',
  filterAiml: 'projects-filter-aiml',
  filterLlm: 'projects-filter-llm',
  filterOther: 'projects-filter-other',
  card: (id) => `project-card-${id}`,
  cardLink: (id) => `project-card-link-${id}`,
};

export const EXPERIENCE = {
  section: 'experience-section',
  item: (i) => `experience-item-${i}`,
};

export const CONTACT = {
  section: 'contact-section',
  form: 'contact-form',
  nameInput: 'contact-name-input',
  emailInput: 'contact-email-input',
  subjectInput: 'contact-subject-input',
  messageInput: 'contact-message-input',
  submitBtn: 'contact-submit-btn',
  emailBtn: 'contact-email-btn',
  linkedinBtn: 'contact-linkedin-btn',
  githubBtn: 'contact-github-btn',
};

export const FOOTER = {
  container: 'site-footer',
};

export const ADMIN = {
  loginEmail: 'admin-login-email',
  loginPassword: 'admin-login-password',
  loginSubmit: 'admin-login-submit',
  loginError: 'admin-login-error',

  header: 'admin-header',
  backBtn: 'admin-back-btn',
  previewBtn: 'admin-preview-btn',
  resetBtn: 'admin-reset-btn',
  saveBtn: 'admin-save-btn',
  logoutBtn: 'admin-logout-btn',

  tabProfile: 'admin-tab-profile',
  tabSkills: 'admin-tab-skills',
  tabProjects: 'admin-tab-projects',
  tabExperience: 'admin-tab-experience',
  tabSecurity: 'admin-tab-security',

  profileName: 'admin-profile-name',
  profileTitle: 'admin-profile-title',
  profileTagline: 'admin-profile-tagline',
  profileCollege: 'admin-profile-college',
  profileEmail: 'admin-profile-email',
  profileAvailability: 'admin-profile-availability',
  profileLinkedin: 'admin-profile-linkedin',
  profileGithub: 'admin-profile-github',
  profileResume: 'admin-profile-resume',
  profileSummary: 'admin-profile-summary',

  skillAddInput: (groupKey) => `admin-skill-add-${groupKey}`,
  skillAddBtn: (groupKey) => `admin-skill-add-btn-${groupKey}`,
  skillChipRemove: (groupKey, idx) => `admin-skill-remove-${groupKey}-${idx}`,
  skillGroupRenameInput: (idx) => `admin-skill-group-rename-${idx}`,
  skillGroupRemove: (idx) => `admin-skill-group-remove-${idx}`,
  skillGroupAdd: 'admin-skill-group-add',

  projectAdd: 'admin-project-add',
  projectDelete: (id) => `admin-project-delete-${id}`,
  projectTitle: (id) => `admin-project-title-${id}`,
  projectSubtitle: (id) => `admin-project-subtitle-${id}`,
  projectCategory: (id) => `admin-project-category-${id}`,
  projectDescription: (id) => `admin-project-description-${id}`,
  projectLink: (id) => `admin-project-link-${id}`,
  projectDemo: (id) => `admin-project-demo-${id}`,
  projectMetricLabel: (id, i) => `admin-project-metric-label-${id}-${i}`,
  projectMetricValue: (id, i) => `admin-project-metric-value-${id}-${i}`,
  projectMetricRemove: (id, i) => `admin-project-metric-remove-${id}-${i}`,
  projectMetricAdd: (id) => `admin-project-metric-add-${id}`,
  projectTechInput: (id) => `admin-project-tech-input-${id}`,
  projectTechAdd: (id) => `admin-project-tech-add-${id}`,
  projectTechRemove: (id, i) => `admin-project-tech-remove-${id}-${i}`,

  expAdd: 'admin-exp-add',
  expDelete: (id) => `admin-exp-delete-${id}`,
  expStatus: (id) => `admin-exp-status-${id}`,
  expTitle: (id) => `admin-exp-title-${id}`,
  expOrg: (id) => `admin-exp-org-${id}`,
  expDescription: (id) => `admin-exp-description-${id}`,
  expKind: (id) => `admin-exp-kind-${id}`,
};
