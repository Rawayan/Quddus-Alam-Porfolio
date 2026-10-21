type ContactFormFallbackProps = {
  className?: string;
};

function Field({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[var(--muted-ink)]/25" />

      <div className="h-[3.25rem] w-full animate-pulse rounded-2xl bg-[var(--muted-ink)]/15" />
    </div>
  );
}

export default function ContactFormFallback({
  className = "",
}: ContactFormFallbackProps) {
  return (
    <div
      className={`space-y-6 ${className}`}
      aria-hidden="true"
    >
      <Field />

      <Field />

      <Field />

      <div>
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[var(--muted-ink)]/25" />

        <div className="h-32 w-full animate-pulse rounded-2xl bg-[var(--muted-ink)]/15" />
      </div>

      <div className="h-12 w-36 animate-pulse rounded-full bg-[var(--accent)]/25" />
    </div>
  );
}
