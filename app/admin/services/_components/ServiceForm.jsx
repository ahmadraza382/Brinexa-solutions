"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ChevronLeft } from "lucide-react";
import Link from "next/link";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ICONS = [
  "Palette", "Code2", "TrendingUp", "Target", "ShoppingCart", "Clapperboard",
  "Star", "Rocket", "Globe", "BarChart3", "Megaphone", "Camera", "Pen",
  "Search", "Share2", "Mail", "Video", "Zap", "Shield", "Award",
];

export default function ServiceForm({ initial, serviceId, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "Star");
  const [short, setShort] = useState(initial?.short ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [h1, setH1] = useState(initial?.h1 ?? "");
  const [sub, setSub] = useState(initial?.sub ?? "");
  const [includedText, setIncludedText] = useState((initial?.included ?? []).join("\n"));
  const [processText, setProcessText] = useState((initial?.process ?? []).join("\n"));
  const [faqItems, setFaqItems] = useState(initial?.faq ?? []);
  const [displayOrder, setDisplayOrder] = useState(initial?.display_order ?? 0);
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (isNew) setSlug(slugify(val));
  };

  const addFaq = () => setFaqItems((prev) => [...prev, { q: "", a: "" }]);
  const removeFaq = (i) => setFaqItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateFaq = (i, field, val) =>
    setFaqItems((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item))
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      slug: slug.trim(),
      icon,
      title: title.trim(),
      short: short.trim(),
      description: description.trim(),
      h1: h1.trim(),
      sub: sub.trim(),
      included: includedText.split("\n").map((l) => l.trim()).filter(Boolean),
      process: processText.split("\n").map((l) => l.trim()).filter(Boolean),
      faq: faqItems.filter((f) => f.q.trim()),
      display_order: Number(displayOrder),
      is_active: isActive,
    };

    try {
      const res = await fetch(
        isNew ? "/api/admin/services" : `/api/admin/services/${serviceId}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save.");
        return;
      }
      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full bg-[#0D0D1A] border border-[#2E2E4A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#6C3FD4]";

  const labelCls = "block text-[#888] text-xs font-medium mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="p-1.5 rounded-lg text-[#888] hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-white text-2xl font-bold flex-1">
          {isNew ? "Add Service" : "Edit Service"}
        </h1>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] disabled:opacity-50 text-white font-semibold text-sm transition-colors"
        >
          {saving ? "Saving…" : "Save Service"}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {/* Basic Info */}
      <section className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">
          Basic Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title <span className="text-red-400">*</span></label>
            <input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Web Development"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Slug <span className="text-red-400">*</span></label>
            <input
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="e.g. web-development"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Icon (Lucide icon name)</label>
          <div className="flex gap-2">
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g. Code2"
              className={`${inputCls} flex-1`}
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {ICONS.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  icon === ic
                    ? "bg-[#6C3FD4] text-white"
                    : "bg-white/5 text-[#888] hover:bg-white/10 hover:text-white"
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Short Description <span className="text-[#555]">(homepage card)</span></label>
          <input
            value={short}
            onChange={(e) => setShort(e.target.value)}
            placeholder="One-line tagline shown on service cards"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Full Description <span className="text-[#555]">(services listing page)</span></label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of the service"
            className={`${inputCls} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-[#6C3FD4]"
            />
            <label htmlFor="is_active" className="text-[#AAAAAA] text-sm cursor-pointer">
              Active (visible on site)
            </label>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <section className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">
          Service Detail Page
        </h2>
        <div>
          <label className={labelCls}>Page Heading (H1)</label>
          <input
            value={h1}
            onChange={(e) => setH1(e.target.value)}
            placeholder="e.g. Websites That Work As Hard As You Do"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Subtitle</label>
          <input
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            placeholder="Short sentence below the H1"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>
            What&apos;s Included{" "}
            <span className="text-[#555]">(one item per line)</span>
          </label>
          <textarea
            rows={8}
            value={includedText}
            onChange={(e) => setIncludedText(e.target.value)}
            placeholder={"Logo Design\nBrand Kit\nSocial Media Templates"}
            className={`${inputCls} resize-none`}
          />
        </div>

        <div>
          <label className={labelCls}>
            Process Steps{" "}
            <span className="text-[#555]">(one step per line, 6 recommended)</span>
          </label>
          <textarea
            rows={4}
            value={processText}
            onChange={(e) => setProcessText(e.target.value)}
            placeholder={"Discovery Call\nStrategy\nExecution\nReview\nRevisions\nDelivery"}
            className={`${inputCls} resize-none`}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">FAQ</h2>
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C3FD4]/20 hover:bg-[#6C3FD4]/40 text-[#6C3FD4] text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
        </div>

        {faqItems.length === 0 && (
          <p className="text-[#555] text-sm">No FAQ items yet. Click &quot;Add Question&quot; to start.</p>
        )}

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-[#0D0D1A] border border-[#2E2E4A] rounded-xl p-4 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#555] text-xs font-mono mt-2 shrink-0">Q{i + 1}</span>
                <input
                  value={item.q}
                  onChange={(e) => updateFaq(i, "q", e.target.value)}
                  placeholder="Question"
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="p-1.5 rounded-lg text-[#888] hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#555] text-xs font-mono mt-2 shrink-0">A{i + 1}</span>
                <textarea
                  rows={2}
                  value={item.a}
                  onChange={(e) => updateFaq(i, "a", e.target.value)}
                  placeholder="Answer"
                  className={`${inputCls} flex-1 resize-none`}
                />
                <div className="w-9 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] disabled:opacity-50 text-white font-semibold text-sm transition-colors"
        >
          {saving ? "Saving…" : "Save Service"}
        </button>
        <Link
          href="/admin/services"
          className="px-6 py-2.5 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white text-sm transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
