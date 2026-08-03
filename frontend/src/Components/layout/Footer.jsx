import { site, navLinks } from "../../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--color-line)/var(--line-opacity))]">
      <div className="site-container py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-tight">
              {site.name}
              <span className="text-copper">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
              {site.role} building thoughtful digital products with clarity and craft.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-[var(--fg-muted)] transition-colors hover:text-copper"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm text-[var(--fg-muted)]">
            <a
              href={`mailto:${site.email}`}
              className="block transition-colors hover:text-copper"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="block transition-colors hover:text-copper"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[rgb(var(--color-line)/var(--line-opacity))] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--fg-muted)]">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {site.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)] transition-colors hover:text-copper"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
