export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <main className="w-full max-w-3xl rounded-2xl border border-white/20 bg-black/45 p-10 text-white shadow-2xl backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Next.js + R3F</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          HTML content over a global 3D canvas background
        </h1>
        <p className="mt-6 text-base text-slate-200 sm:text-lg">
          This page is standard Next.js content rendered in the foreground. The
          React Three Fiber Canvas is mounted once in the root layout, fixed in
          the background across all routes.
        </p>
      </main>
    </div>
  );
}
