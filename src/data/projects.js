/**
 * @typedef {Object} Project
 * @property {string} slug            URL segment: /projects/<slug>
 * @property {string} name
 * @property {string} role
 * @property {string} description     one-line summary
 * @property {string[]} overview      case-study paragraphs
 * @property {string[]} points        key highlights (keep it to 3 or 4)
 * @property {string[]} stack
 * @property {boolean} [featured]     spans the full grid width
 * @property {boolean} [live]
 * @property {string} [highlight]
 * @property {string} [liveUrl]
 * @property {string} [repoUrl]
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "meetogether",
    name: "MeeTogether",
    role: "Backend Engineer",
    featured: true,
    live: true,
    // TODO: one sentence on what it does and who it is for
    description: "A full-stack product running in production at meetogether.in.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["NestJS", "Prisma", "PostgreSQL"],
    liveUrl: "https://meetogether.in",
    // TODO: repoUrl
  },
  {
    slug: "instant",
    name: "Instant",
    role: "Backend Engineer",
    // TODO: one sentence on what it does
    description: "Open-source project, source available on GitHub.",
    overview: [], // TODO
    points: [], // TODO
    stack: [], // TODO
    repoUrl: "https://github.com/Sonukr2006/Instant",
  },
  {
    slug: "focustube",
    name: "FocusTube",
    role: "Backend Engineer",
    // TODO: one sentence on what it does
    description: "Full-stack MERN application.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["MongoDB", "Express", "React", "Node.js"],
    // TODO: repoUrl
  },
  {
    slug: "mealmend",
    name: "MealMend",
    role: "Backend Engineer",
    highlight: "Rank 1 · 20+ teams",
    // TODO: one sentence on what it does
    description: "Diploma project that took first place among more than 20 teams.",
    overview: [], // TODO
    points: [], // TODO
    stack: [], // TODO
    // TODO: repoUrl
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export function getNextProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}