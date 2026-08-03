import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  api,
  clearAuth,
  getImageUrl,
  getStoredUser,
} from "../../api/client";
import Button from "../ui/Button";

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  liveUrl: "",
  githubUrl: "",
  tech: "",
  accent: "#C9A27A",
  order: "0",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!imageFile) return undefined;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setPreview("");
    setEditingId(null);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      tech: (project.tech || []).join(", "),
      accent: project.accent || "#C9A27A",
      order: String(project.order ?? 0),
    });
    setImageFile(null);
    setPreview(getImageUrl(project.image));
    setSuccess("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!editingId && !imageFile) {
        throw new Error("Please choose a project image");
      }

      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      if (imageFile) body.append("image", imageFile);

      if (editingId) {
        await api.updateProject(editingId, body);
        setSuccess("Project updated");
      } else {
        await api.createProject(body);
        setSuccess("Project added");
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    setError("");
    setSuccess("");
    try {
      await api.deleteProject(id);
      if (editingId === id) resetForm();
      setSuccess("Project deleted");
      await loadProjects();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/admin/login", { replace: true });
  };

  const fieldClass =
    "w-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--bg)]/60 px-4 py-3 text-[var(--fg)] outline-none transition-colors focus:border-accent";

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--color-accent)/0.08),transparent_50%)]"
      />

      <header className="relative z-10 border-b border-[rgb(var(--color-line)/var(--line-opacity))]">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="font-display text-2xl font-semibold text-[var(--fg)]">
              Projects
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">
              Signed in as {user?.email || "admin"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="secondary">
              View site
            </Button>
            <Button type="button" variant="ghost" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 site-container py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/50 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
                {editingId ? "Edit project" : "Add project"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-[var(--fg-muted)] hover:text-accent"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  Name *
                </span>
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  Subtitle
                </span>
                <input
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="e.g. Salon SaaS · Saudi market"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  Description *
                </span>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={onChange}
                  className={`${fieldClass} resize-y`}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  Image {!editingId && "*"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-[var(--fg-muted)] file:mr-4 file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 aspect-[16/10] w-full max-w-sm object-cover"
                  />
                )}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Live URL
                  </span>
                  <input
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={onChange}
                    className={fieldClass}
                    placeholder="https://"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    GitHub URL
                  </span>
                  <input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={onChange}
                    className={fieldClass}
                    placeholder="https://"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  Tech (comma separated)
                </span>
                <input
                  name="tech"
                  value={form.tech}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="React.js, Node.js, MongoDB"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Accent color
                  </span>
                  <input
                    name="accent"
                    type="color"
                    value={form.accent}
                    onChange={onChange}
                    className="h-12 w-full cursor-pointer border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--bg)]/60 p-1"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Order
                  </span>
                  <input
                    name="order"
                    type="number"
                    value={form.order}
                    onChange={onChange}
                    className={fieldClass}
                  />
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-accent" role="status">
                  {success}
                </p>
              )}

              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                {saving
                  ? "Saving…"
                  : editingId
                    ? "Update project"
                    : "Add project"}
              </Button>
            </form>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              All projects ({projects.length})
            </h2>

            {loading ? (
              <p className="mt-6 text-[var(--fg-muted)]">Loading…</p>
            ) : projects.length === 0 ? (
              <p className="mt-6 text-[var(--fg-muted)]">
                No projects yet. Add your first one.
              </p>
            ) : (
              <ul className="mt-6 space-y-4">
                {projects.map((project) => (
                  <li
                    key={project._id}
                    className="flex gap-4 border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/40 p-3"
                  >
                    <img
                      src={getImageUrl(project.image)}
                      alt=""
                      className="h-20 w-28 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[var(--fg)]">
                        {project.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-[var(--fg-muted)]">
                        {project.description}
                      </p>
                      <div className="mt-3 flex gap-3">
                        <button
                          type="button"
                          onClick={() => startEdit(project)}
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(project._id)}
                          className="text-sm text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/#projects"
              className="mt-8 inline-block text-sm text-[var(--fg-muted)] hover:text-accent"
            >
              Jump to projects on site →
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
