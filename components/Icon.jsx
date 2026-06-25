"use client";

import * as Lucide from "lucide-react";

/**
 * Dynamic Lucide icon by name (string).
 * Falls back to a circle if the name is unknown.
 */
export default function Icon({ name, ...props }) {
  const Cmp = Lucide[name] || Lucide.Circle;
  return <Cmp {...props} />;
}
