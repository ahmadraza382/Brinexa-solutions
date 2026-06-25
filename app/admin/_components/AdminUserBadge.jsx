"use client";

import { useEffect, useState } from "react";

export default function AdminUserBadge() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setEmail(d.email || ""))
      .catch(() => {});
  }, []);

  if (!email) return null;

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C3FD4] to-[#00C9A7] flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">
          {email[0]?.toUpperCase()}
        </span>
      </div>
      <span className="text-[#888] text-sm hidden sm:block">{email}</span>
    </div>
  );
}
