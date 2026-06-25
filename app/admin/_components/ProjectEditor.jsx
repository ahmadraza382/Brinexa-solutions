"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Branding", "Web Design", "Social Media", "Paid Ads", "Amazon", "Video", "Other"];
const ICONS = ["Palette", "Code2", "TrendingUp", "Target", "ShoppingCart", "Clapperboard", "Star", "Briefcase", "Globe", "Zap"];

export default function ProjectEditor({ project }) {
  const router = useRouter();
  const isEdit = !!project;
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: project?.title || "",
    category: project?.category || "Branding",
    result: project?.result || "",
    cover_image: project?.cover_image || "",
    icon: project?.icon || "Star",
    published: project?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "portfolio");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, cover_image: data.url }));
    setUploading(false);
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true);

    const url = isEdit ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Failed to save."); return; }
    router.push("/admin/portfolio");
    router.refresh();
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="p-2 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-white text-xl font-bold flex-1">
          {isEdit ? "Edit Project" : "New Project"}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-[#888] text-xs mb-2">Title *</label>
          <input type="text" value={form.title} onChange={update("title")} placeholder="Project name"
            className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#888] text-xs mb-2">Category</label>
            <select value={form.category} onChange={update("category")}
              className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C3FD4] transition-colors">
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#1A1A2E]">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#888] text-xs mb-2">Icon</label>
            <select value={form.icon} onChange={update("icon")}
              className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C3FD4] transition-colors">
              {ICONS.map((i) => <option key={i} value={i} className="bg-[#1A1A2E]">{i}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[#888] text-xs mb-2">Result / Description</label>
          <textarea rows={3} value={form.result} onChange={update("result")}
            placeholder="e.g. 3x ROAS, 200% traffic growth, complete brand identity…"
            className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-[#888] text-xs mb-2">Cover Image</label>
          <div className="space-y-2">
            {form.cover_image ? (
              <div className="relative">
                <img src={form.cover_image} alt="cover" className="w-full h-32 object-cover rounded-xl" />
                <button onClick={() => setForm((f) => ({ ...f, cover_image: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500/80 transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-[#2E2E4A] rounded-xl py-6 flex flex-col items-center gap-2 hover:border-[#6C3FD4]/50 transition-colors">
                {uploading ? <Loader2 className="w-6 h-6 text-[#6C3FD4] animate-spin" /> : <ImageIcon className="w-6 h-6 text-[#555]" />}
                <span className="text-[#555] text-xs">{uploading ? "Uploading…" : "Click to upload image"}</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <input type="text" value={form.cover_image} onChange={update("cover_image")} placeholder="Or paste image URL…"
              className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-2.5 text-white placeholder:text-[#555] text-xs outline-none focus:border-[#6C3FD4] transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-[#6C3FD4]" : "bg-[#2E2E4A]"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <label className="text-[#AAAAAA] text-sm">
            {form.published ? "Published on site" : "Draft (hidden from site)"}
          </label>
        </div>
      </div>
    </div>
  );
}
