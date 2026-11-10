import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">404</p>
      <h1 className="mt-4 bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-6xl font-bold text-transparent sm:text-8xl">
        Lost in space.
      </h1>
      <p className="mt-6 text-slate-300">That page doesn&apos;t exist, or it moved.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </main>
  );
}