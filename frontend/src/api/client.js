const API_BASE = import.meta.env.VITE_API_URL || "";

function getToken() {
  return localStorage.getItem("portfolio_admin_token");
}

export function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/uploads/")) {
    return `${API_BASE}${image}`;
  }
  return image;
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body:
      options.body instanceof FormData || typeof options.body === "string"
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  getProjects: () => request("/api/projects"),

  createProject: (formData) =>
    request("/api/projects", {
      method: "POST",
      body: formData,
    }),

  updateProject: (id, formData) =>
    request(`/api/projects/${id}`, {
      method: "PUT",
      body: formData,
    }),

  deleteProject: (id) =>
    request(`/api/projects/${id}`, {
      method: "DELETE",
    }),
};

export function saveAuth(token, user) {
  localStorage.setItem("portfolio_admin_token", token);
  localStorage.setItem("portfolio_admin_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("portfolio_admin_token");
  localStorage.removeItem("portfolio_admin_user");
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("portfolio_admin_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}
