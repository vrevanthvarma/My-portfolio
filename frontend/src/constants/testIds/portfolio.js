// Test IDs for the portfolio site.
export const NAV = {
  container: 'site-nav',
  logo: 'nav-logo',
  linkSkills: 'nav-link-skills',
  linkProjects: 'nav-link-projects',
  linkExperience: 'nav-link-experience',
  linkContact: 'nav-link-contact',
  resumeBtn: 'nav-resume-btn',
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
