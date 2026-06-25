"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Plus, X } from "lucide-react";

const CATEGORIES = ["Branding", "Web Design", "Social Media", "Paid Ads", "Amazon", "Video", "Other"];
const ICONS = ["Palette", "Code2", "TrendingUp", "Target", "ShoppingCart", "Clapperboard", "Star", "Briefcase", "Globe", "Zap"];

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ProjectEditor({ project }) {
  const router = useRouter();
  const isEdit = !!project;
  const fileRef = useRef();
  const [slugEdited, setSlugEdited] = useState(!!project?.slug);

  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    category: project?.category || "Branding",
    result: project?.result || "",
    tagline: project?.tagline || "",
    challenge: project?.challenge || "",
    solution: project?.solution || "",
    services: project?.services || [],
    metrics: project?.metrics || [{ label: "", value: "" }],
    testimonial: project?.testimonial || null,
    cover_image: project?.cover_image || "",
    icon: project?.icon || "Star",
    published: project?.published ?? false,
  });

  const [newService, setNewService] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: slugEdited ? f.slug : slugify(title),
    }));
  };

  const handleSlugChange = (e) => {
    setSlugEdited(true);
    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
  };

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

  const addService = () => {
    const s = newService.trim();
    if (!s) return;
    setForm((f) => ({ ...f, services: [...f.services, s] }));
    setNewService("");
  };

  const removeService = (i) =>
    setForm((f) => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));

  const updateMetric = (i, key, val) =>
    setForm((f) => {
      const metrics = [...f.metrics];
      metrics[i] = { ...metrics[i], [key]: val };
      return { ...f, metrics };
    });

  const addMetric = () =>
    setForm((f) => ({ ...f, metrics: [...f.metrics, { label: "", value: "" }] }));

  const removeMetric = (i) =>
    setForm((f) => ({ ...f, metrics: f.metrics.filter((_, idx) => idx !== i) }));

  const toggleTestimonial = () =>
    setForm((f) => ({
      ...f,
      testimonial: f.testimonial ? null : { quote: "", name: "", role: "" },
    }));

  const updateTestimonial = (k) => (e) =>
    setForm((f) => ({ ...f, testimonial: { ...f.testimonial, [k]: e.target.value } }));

  const handleSave = async () => {
    setError("");
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      metrics: form.metrics.filter((m) => m.label && m.value),
      testimonial: form.testimonial?.quote ? form.testimonial : null,
    };

    const url = isEdit ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Failed to save."); return; }
    router.push("/admin/portfolio");
    router.refresh();
  };

  const inputCls = "w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors";
  const labelCls = "block text-[#888] text-xs mb-2";
  const cardCls = "bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4";

  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="p-2 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-white text-xl font-bold flex-1">{isEdit ? "Edit Project" : "New Project"}</h1>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className={cardCls}>
        <h2 className="text-white font-semibold text-sm">Basic Info</h2>

        <div>
          <label className={labelCls}>Title *</label>
          <input type="text" value={form.title} onChange={handleTitleChange} placeholder="Project name" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Slug (URL)</label>
          <input type="text" value={form.slug} onChange={handleSlugChange} placeholder="auto-generated-from-title" className={inputCls} />
          <p className="text-[#555] text-xs mt-1">Public URL: /portfolio/{form.slug || "…"}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category} onChange={update("category")} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#1A1A2E]">{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Icon</label>
            <select value={form.icon} onChange={update("icon")} className={inputCls}>
              {ICONS.map((i) => <option key={i} value={i} className="bg-[#1A1A2E]">{i}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Result Headline</label>
          <input type="text" value={form.result} onChange={update("result")} placeholder="e.g. 3.2x ROAS across Meta & Google" className={inputCls} />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-[#6C3FD4]" : "bg-[#2E2E4A]"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <label className="text-[#AAAAAA] text-sm">{form.published ? "Published on site" : "Draft (hidden from site)"}</label>
        </div>
      </div>

      {/* Cover Image */}
      <div className={cardCls}>
        <h2 className="text-white font-semibold text-sm">Cover Image</h2>
        {form.cover_image ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.cover_image} alt="cover" className="w-full h-36 object-cover rounded-xl" />
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

      {/* Case Study Content */}
      <div className={cardCls}>
        <h2 className="text-white font-semibold text-sm">Case Study Content</h2>

        <div>
          <label className={labelCls}>Tagline</label>
          <input type="text" value={form.tagline} onChange={update("tagline")}
            placeholder="One-line project summary shown on the detail page"
            className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>The Challenge</label>
          <textarea rows={4} value={form.challenge} onChange={update("challenge")}
            placeholder="What problem did the client face before working with you?"
            className={`${inputCls} resize-none`} />
        </div>

        <div>
          <label className={labelCls}>Our Solution</label>
          <textarea rows={4} value={form.solution} onChange={update("solution")}
            placeholder="How did you solve it? What did you build/deliver?"
            className={`${inputCls} resize-none`} />
        </div>
      </div>

      {/* Metrics */}
      <div className={cardCls}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Key Metrics</h2>
          <button onClick={addMetric} className="flex items-center gap-1 text-xs text-[#6C3FD4] hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {form.metrics.map((m, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input type="text" value={m.value} onChange={(e) => updateMetric(i, "value", e.target.value)}
              placeholder="Value (e.g. +180%)" className="flex-1 bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-3 py-2.5 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors" />
            <input type="text" value={m.label} onChange={(e) => updateMetric(i, "label", e.target.value)}
              placeholder="Label (e.g. Brand Recall)" className="flex-1 bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-3 py-2.5 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors" />
            <button onClick={() => removeMetric(i)} className="text-[#555] hover:text-red-400 transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className={cardCls}>
        <h2 className="text-white font-semibold text-sm">Services Delivered</h2>

        <div className="flex gap-2">
          <input type="text" value={newService} onChange={(e) => setNewService(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
            placeholder="Add a service (press Enter)"
            className="flex-1 bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-3 py-2.5 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors" />
          <button onClick={addService} className="px-4 py-2.5 rounded-xl bg-[#6C3FD4]/20 border border-[#6C3FD4]/30 text-[#6C3FD4] text-sm hover:bg-[#6C3FD4]/30 transition-colors">
            Add
          </button>
        </div>

        {form.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.services.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-[#6C3FD4]/15 border border-[#6C3FD4]/30 text-sm text-white rounded-full px-3 py-1">
                {s}
                <button onClick={() => removeService(i)} className="text-[#555] hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Testimonial */}
      <div className={cardCls}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Client Testimonial</h2>
          <button onClick={toggleTestimonial}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.testimonial ? "bg-[#6C3FD4]" : "bg-[#2E2E4A]"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.testimonial ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        {form.testimonial && (
          <div className="space-y-3">
            <textarea rows={3} value={form.testimonial.quote} onChange={updateTestimonial("quote")}
              placeholder="Client quote…"
              className={`${inputCls} resize-none`} />
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" value={form.testimonial.name} onChange={updateTestimonial("name")}
                placeholder="Client name" className={inputCls} />
              <input type="text" value={form.testimonial.role} onChange={updateTestimonial("role")}
                placeholder="Role / Company" className={inputCls} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
