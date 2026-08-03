import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, saveAuth } from "../../api/client";
import Button from "../ui/Button";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      saveAuth(data.token, data.user);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--color-accent)/0.12),transparent_55%)]"
      />
      <div className="relative w-full max-w-md border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/70 p-8 backdrop-blur-md md:p-10">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--fg)]">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Manage portfolio projects without editing code.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--bg)]/60 px-4 py-3 text-[var(--fg)] outline-none transition-colors focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--bg)]/60 px-4 py-3 text-[var(--fg)] outline-none transition-colors focus:border-accent"
            />
          </label>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-block text-sm text-[var(--fg-muted)] transition-colors hover:text-accent"
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}
