// Tiny in-memory per-IP limiter. Good enough to stop casual abuse; on
// serverless each instance keeps its own counts.
export function clientIp(req) {
  return (
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

export function createRateLimiter(limit, windowMs) {
  const hits = new Map();

  return function isLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);

    if (hits.size > 5000) {
      for (const [key, times] of hits) {
        if (!times.some((t) => now - t < windowMs)) hits.delete(key);
      }
    }
    return recent.length > limit;
  };
}
