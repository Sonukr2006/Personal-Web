import InView from "@/components/ui/InView";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import LiveBadge from "@/components/ui/LiveBadge";
import PageHeader from "@/components/ui/PageHeader";
import { channels } from "@/data/contact";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Sonu Kumar.",
};

function ChannelRow({ label, handle, href }) {
  const external = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-6 border-t border-white/10 py-8 transition-colors hover:bg-white/[0.03] sm:px-4"
    >
      <span>
        <span className="block text-4xl font-bold text-white transition-colors group-hover:text-cyan-200 sm:text-6xl">
          {label}
        </span>
        <span className="mt-2 block text-sm text-slate-400">{handle}</span>
      </span>
      <ArrowUpRightIcon className="h-8 w-8 shrink-0 text-white/60 transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-cyan-300 sm:h-12 sm:w-12" />
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="px-6 pb-24">
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together."
        accentLast={2}
        intro={site.contact}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="pb-8">
          <LiveBadge label="Open to internships and interesting projects" />
        </div>
        <ul className="border-b border-white/10">
          {channels.map((channel, index) => (
            <InView key={channel.id} as="li" delay={index * 100}>
              <ChannelRow {...channel} />
            </InView>
          ))}
        </ul>
      </div>
    </main>
  );
}