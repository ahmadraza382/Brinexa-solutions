"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Social Media", "Paid Ads", "Web Development", "Amazon", "Branding", "General"];

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor({ post }) {
  const router = useRouter();
  const isEdit = !!post;
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    category: post?.category || "General",
    excerpt: post?.excerpt || "",
    cover_image: post?.cover_image || "",
    body: post?.body || "",
    status: post?.status || "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) =>
    setForm((f) => {
      const next = { ...f, [k]: e.target.value };
      if (k === "title" && !isEdit) next.slug = slugify(e.target.value);
      return next;
    });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "blog");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, cover_image: data.url }));
    setUploading(false);
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    const url = isEdit ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Failed to save.");
      return;
    }
    router.push("/admin/content/blog");
    router.refresh();
  };

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/content/blog"
          className="p-2 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-white text-xl font-bold flex-1">
          {isEdit ? "Edit Post" : "New Post"}
        </h1>
        <button
          onClick={() =>
            setForm((f) => ({
              ...f,
              status: f.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
            }))
          }
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            form.status === "PUBLISHED"
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-[#2E2E4A] text-[#888] border-[#2E2E4A]"
          }`}
        >
          {form.status}
        </button>
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

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-[#888] text-xs mb-2">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={update("title")}
                placeholder="Post title"
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#888] text-xs mb-2">Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={update("slug")}
                placeholder="post-url-slug"
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-[#888] text-xs mb-2">Excerpt</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={update("excerpt")}
                placeholder="Short description shown in blog listing…"
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
            <label className="block text-[#888] text-xs mb-2">
              Body Content{" "}
              <span className="text-[#555]">(HTML supported)</span>
            </label>
            <textarea
              rows={18}
              value={form.body}
              onChange={update("body")}
              placeholder="<p>Write your article content here. HTML is supported.</p>&#10;&#10;<h2>Section Heading</h2>&#10;<p>Paragraph content…</p>"
              className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors resize-none font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-[#888] text-xs mb-2">Category</label>
              <select
                value={form.category}
                onChange={update("category")}
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C3FD4] transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1A1A2E]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-3">
            <p className="text-white text-sm font-semibold">Cover Image</p>
            {form.cover_image ? (
              <div className="relative">
                <img
                  src={form.cover_image}
                  alt="cover"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setForm((f) => ({ ...f, cover_image: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500/80 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-[#2E2E4A] rounded-xl py-6 flex flex-col items-center gap-2 hover:border-[#6C3FD4]/50 transition-colors"
              >
                {uploading ? (
                  <Loader2 className="w-6 h-6 text-[#6C3FD4] animate-spin" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#555]" />
                )}
                <span className="text-[#555] text-xs">
                  {uploading ? "Uploading…" : "Click to upload"}
                </span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div>
              <label className="block text-[#666] text-xs mb-1">Or paste URL</label>
              <input
                type="text"
                value={form.cover_image}
                onChange={update("cover_image")}
                placeholder="https://…"
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-lg px-3 py-2 text-white placeholder:text-[#555] text-xs outline-none focus:border-[#6C3FD4] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
