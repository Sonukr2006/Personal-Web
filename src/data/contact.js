import { site } from "./site";

export const channels = [
  site.email && {
    id: "email",
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/sonu-kumar",
    href: site.social.linkedin,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@Sonukr2006",
    href: site.social.github,
  },
].filter(Boolean);