import { useEffect, useRef, useState } from "react";
import { HiArrowUpRight, HiOutlineCodeBracket } from "react-icons/hi2";
import { api, getImageUrl } from "../../api/client";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const [hovering, setHovering] = useState(false);
  const tech = project.tech || [];

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - y) * 12,
      ry: (x - 0.5) * 14,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const onLeave = () => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  return (
    <Reveal delay={index * 0.08} className="group [perspective:1200px]">
      <article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={onLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${
            hovering ? "translateY(-6px)" : "translateY(0)"
          }`,
        }}
        className="relative overflow-hidden border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/50 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out-expo will-change-transform hover:border-accent/40 hover:shadow-[0_0_40px_-12px_rgb(var(--color-accent)/0.35)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.35), transparent 45%)`,
          }}
        />

        <div className="relative aspect-[16/10] overflow-hidden">
          {!imgError ? (
            <img
              src={getImageUrl(project.image)}
              alt={project.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="flex h-full w-full items-end p-8"
              style={{
                background: `linear-gradient(145deg, ${project.accent || "#C9A27A"}33, transparent 60%), var(--surface)`,
              }}
            >
              <span className="font-display text-4xl font-semibold text-[var(--fg)]/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-60" />
          <div className="absolute right-4 top-4 z-10 flex gap-2 opacity-0 transition-all duration-400 group-hover:opacity-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)]/90 text-[var(--fg)] backdrop-blur transition-colors hover:bg-accent hover:text-slate-950"
                aria-label={`Visit ${project.title}`}
              >
                <HiArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)]/90 text-[var(--fg)] backdrop-blur transition-colors hover:bg-accent hover:text-slate-950"
                aria-label={`${project.title} on GitHub`}
              >
                <HiOutlineCodeBracket className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              {project.subtitle && (
                <p className="text-xs uppercase tracking-[0.18em] text-accent">
                  {project.subtitle}
                </p>
              )}
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-accent">
                {project.title}
              </h3>
            </div>
            <span className="font-display text-sm text-[var(--fg-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)] md:text-lg">
            {project.description}
          </p>
          {tech.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="border border-[rgb(var(--color-line)/var(--line-opacity))] px-3 py-1 text-xs text-[var(--fg-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-colors hover:text-accent"
              >
                Live site
                <HiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-accent"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await api.getProjects();
        if (active) setProjects(data);
      } catch (err) {
        if (active) setError(err.message || "Could not load projects");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects with real impact."
          description="A selection of products I've helped design and build — from e-commerce to travel platforms."
        />

        {loading && (
          <p className="mt-10 text-[var(--fg-muted)]">Loading projects…</p>
        )}

        {error && !loading && (
          <p className="mt-10 text-red-400">
            {error}. Start the backend API and run seed to load projects.
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="mt-10 text-[var(--fg-muted)]">
            No projects yet. Add some from the admin panel.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
