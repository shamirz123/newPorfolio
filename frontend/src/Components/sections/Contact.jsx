import { useForm, ValidationError } from "@formspree/react";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const perks = [
  "3+ years of experience",
  "Professional web development",
  "Fast, reliable delivery",
  "Clear communication",
];

export default function Contact() {
  const [state, handleSubmit] = useForm("mwkgozgj");

  return (
    <section
      id="contact"
      className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]"
    >
      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Let's connect"
              title="Have a project in mind? Let's talk."
              description="Tell me about your idea — I'll get back within 24–48 hours."
              className="mb-0"
            />
            <Reveal delay={0.15} className="mt-10 space-y-3">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-copper/15 text-copper">
                    <HiCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-[var(--fg-muted)]">{perk}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            {state.succeeded ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center border border-copper/30 bg-copper/5 p-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20 text-copper">
                  <HiCheck className="h-6 w-6" />
                </span>
                <p className="mt-5 font-display text-2xl font-semibold text-[var(--fg)]">
                  Message sent
                </p>
                <p className="mt-2 max-w-sm text-sm text-[var(--fg-muted)]">
                  Thanks for reaching out — I&apos;ll reply soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" id="name" name="name" placeholder="Your name" errors={state.errors} />
                  <Field
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    errors={state.errors}
                  />
                  <Field
                    label="Phone"
                    id="number"
                    name="number"
                    placeholder="+92 ..."
                    errors={state.errors}
                  />
                  <Field
                    label="Subject"
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full resize-y border border-[rgb(var(--color-line)/var(--line-opacity))] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-muted)]/60 focus:border-copper/50"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-400" />
                </div>
                <Button type="submit" disabled={state.submitting} className="w-full sm:w-auto">
                  {state.submitting ? "Sending..." : "Send message"}
                  <HiArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, name, type = "text", placeholder, errors }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={name === "name" || name === "email"}
        placeholder={placeholder}
        className="w-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-muted)]/60 focus:border-copper/50"
      />
      <ValidationError
        prefix={label}
        field={name}
        errors={errors}
        className="mt-1 text-xs text-red-400"
      />
    </div>
  );
}
