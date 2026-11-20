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
    TODO: "Meetogether helps to early engineers and student to learn, showcase, with mentor and engineer who working in actual company.",
    description: "A full-stack product running in production at meetogether.in.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["NestJS", "Prisma", "PostgreSQL", "JavaScript", "TypeScript", "React.js", "Pino"],
    liveUrl: "https://meetogether.in",
    // TODO: repoUrl
  },
  {
    slug: "instant",
    name: "Instant",
    role: "Full Stack Engineer",
    TODO: "Instant is a tauri app, Suppose you are reading a pdf and something you don't understand then what will you do generally go to app menu aur browser then use any chatbot then enter questio. Now here Instant comes in you not needed to go to menu icon or something just sect those text whive you have not understood and just press a shortcut linke cnrl + shift + space and then a tauri app show as pop up answer the question and ask related question. if you are done then close the app.",
    description: "Open-source project, source available on GitHub.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["Rust", "javaScript", "tauri"], // TODO
    repoUrl: "https://github.com/Sonukr2006/Instant",
  },
  {
    slug: "focustube",
    name: "FocusTube",
    role: "Backend Engineer",
    TODO: "A platform where anyone want to focused learning with lecture like youtube videos so that FocusTube is usefull to learn in focus way with all the lecture history, full screen mode, timer, todo list etc.",
    description: "Full-stack MERN application.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["MongoDB", "Express", "React", "Node.js"],
    // TODO: repoUrl
  },
  {
    slug: "MarkDown Text Editor",
    name: "Markdown Editor",
    role: "Full Stack",
    featured: true,
    live: true,
    // TODO: one sentence on what it does and who it is for
    description: "A website markdown editor for markdown text to beautiful structure and layout.",
    overview: [], // TODO
    points: [], // TODO
    stack: ["React.js", "JavaScript", "Js Library"],
    liveUrl: "https://mark-down-editor-jade.vercel.app/",
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
