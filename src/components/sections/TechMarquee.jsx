import Marquee from "@/components/ui/Marquee";
import { skillGroups } from "@/data/about";

const skills = skillGroups.flatMap((group) => group.items);
const middle = Math.ceil(skills.length / 2);
const rows = [skills.slice(0, middle), skills.slice(middle)];

export default function TechMarquee() {
  return (
    <section aria-label="Tech stack" className="-mx-6 space-y-4 py-16">
      <Marquee items={rows[0]} duration={35} />
      <Marquee items={rows[1]} duration={42} reverse />
    </section>
  );
}