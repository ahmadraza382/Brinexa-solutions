"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Globe, GlobeLock } from "lucide-react";

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(fetchProjects, []);

  const togglePublish = async (project) => {
    await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Portfolio</h1>
          <p className="text-[#888] text-sm mt-0.5">
            {projects.filter((p) => p.published).length} published /{" "}
            {projects.length} total
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2E2E4A]">
              {["Title", "Category", "Result", "Date", "Published", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#666] font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="border-b border-[#2E2E4A]">
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-[#2E2E4A] rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : !projects.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[#555]">
                  No projects yet.{" "}
                  <Link href="/admin/portfolio/new" className="text-[#6C3FD4] hover:underline">
                    Add your first project
                  </Link>
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-b border-[#2E2E4A] hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-white font-medium max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-[#888]">{p.category || "—"}</td>
                  <td className="px-4 py-3 text-[#888] max-w-xs truncate">{p.result || "—"}</td>
                  <td className="px-4 py-3 text-[#888] whitespace-nowrap">{fmtDate(p.created_at)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                        p.published
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-[#2E2E4A] text-[#666] hover:bg-[#3A3A5A]"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/portfolio/${p.id}`}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#888] hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#888] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
