import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { site } from "../data/content";
import Button from "../Components/ui/Button";

const MAX_QUOTE = 600;

const fieldClass =
  "w-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--bg)]/60 px-4 py-3 text-[var(--fg)] outline-none transition-colors focus:border-accent";
const labelClass =
  "mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]";

export default function TestimonialForm() {
  const [form, setForm] = useState({ name: "", role: "", quote: "", website: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.submitTestimonial(form);
      setDone(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--color-accent)/0.12),transparent_55%)]"
      />
      <div className="relative w-full max-w-lg border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/70 p-8 backdrop-blur-md md:p-10">
        <p className="eyebrow">Testimonial</p>

        {done ? (
          <>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--fg)]">
              Thank you! 🙏
            </h1>
            <p className="mt-3 text-[var(--fg-muted)]">
              Your feedback was received and will appear on {site.name.split(" ")[0]}&rsquo;s
              portfolio after a quick review.
            </p>
            <Button href="/" variant="secondary" className="mt-8">
              Visit the portfolio
            </Button>
          </>
        ) : (
          <>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--fg)]">
              Share your experience
            </h1>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              Worked with {site.name}? A sentence or two about what it was like means a lot.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className={labelClass}>Your name *</span>
                <input
                  name="name"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={onChange}
                  className={fieldClass}
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className={labelClass}>Role &amp; company</span>
                <input
                  name="role"
                  maxLength={120}
                  value={form.role}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="e.g. Frontend Lead, LALA Group"
                />
              </label>

              <label className="block">
                <span className={labelClass}>Your feedback *</span>
                <textarea
                  name="quote"
                  required
                  rows={5}
                  minLength={20}
                  maxLength={MAX_QUOTE}
                  value={form.quote}
                  onChange={onChange}
                  className={`${fieldClass} resize-y`}
                  placeholder="What was it like working together?"
                />
                <span className="mt-1 block text-right text-xs text-[var(--fg-muted)]">
                  {form.quote.length}/{MAX_QUOTE}
                </span>
              </label>

              {/* Honeypot — hidden from people, bots tend to fill it. */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={sending}>
                {sending ? "Sending…" : "Submit feedback"}
              </Button>
              <p className="text-center text-xs text-[var(--fg-muted)]">
                Your name, role and feedback will be shown publicly once approved.
              </p>
            </form>

            <Link
              to="/"
              className="mt-6 inline-block text-sm text-[var(--fg-muted)] hover:text-accent"
            >
              ← Back to portfolio
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
