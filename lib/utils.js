// Lightweight classNames combiner (clsx-style) — no external deps.
export function cn(...inputs) {
  const out = [];
  const walk = (x) => {
    if (!x) return;
    if (typeof x === "string" || typeof x === "number") out.push(String(x));
    else if (Array.isArray(x)) x.forEach(walk);
    else if (typeof x === "object")
      for (const k in x) if (x[k]) out.push(k);
  };
  inputs.forEach(walk);
  return out.join(" ");
}
