export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sand">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
        <span
          className="size-10 animate-spin rounded-full border-2 border-deep/20 border-t-deep"
          aria-hidden
        />
        <p className="font-serif text-lg text-deep">Loading…</p>
        <span className="sr-only">Loading, please wait.</span>
      </div>
    </main>
  )
}
