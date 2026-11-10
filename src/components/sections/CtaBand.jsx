import ButtonLink from "@/components/ui/ButtonLink";
import InView from "@/components/ui/InView";

export default function CtaBand({
  title = "Have an idea? Let's build it.",
  text = "I'm open to internships and interesting projects.",
}) {
  return (
    <section className="mx-auto w-full max-w-6xl py-24">
      <InView>
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-cyan-300/15 via-black/40 to-violet-400/15 p-10 text-center backdrop-blur-md sm:p-16">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              See my work
            </ButtonLink>
          </div>
        </div>
      </InView>
    </section>
  );
}