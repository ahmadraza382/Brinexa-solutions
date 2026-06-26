"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Plus, Edit2, Trash2, Star, ChevronLeft, X, Check } from "lucide-react";

const BLANK_FORM = {
  name: "",
  price: "",
  billing: "/month",
  featuresText: "",
  is_featured: false,
  display_order: 0,
};

function TierCard({ tier, onEdit, onDelete }) {
  return (
    <div
      className={`bg-[#1A1A2E] border rounded-xl p-5 flex flex-col gap-4 relative ${
        tier.is_featured ? "border-[#6C3FD4]" : "border-[#2E2E4A]"
      }`}
      style={tier.is_featured ? { boxShadow: "0 0 0 1px #6C3FD4" } : undefined}
    >
      {tier.is_featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#6C3FD4] text-white text-xs font-semibold">
          <Star className="w-3 h-3" /> Most Popular
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-white font-bold text-lg">{tier.name}</p>
          <p className="text-[#6C3FD4] font-semibold text-sm mt-0.5">
            {tier.price || "Contact for Price"}
            {tier.billing ? (
              <span className="text-[#888] font-normal"> {tier.billing}</span>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit(tier)}
            className="p-1.5 rounded-lg text-[#888] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(tier.id)}
            className="p-1.5 rounded-lg text-[#888] hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {tier.features && tier.features.length > 0 && (
        <ul className="space-y-1.5">
          {tier.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#AAAAAA]">
              <Check className="w-3.5 h-3.5 text-[#00D2FF] mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <p className="text-[#555] text-xs">Order: {tier.display_order}</p>
    </div>
  );
}

function PricingForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial);
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = form.featuresText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    onSave({ ...form, features });
  };

  const inputCls =
    "w-full bg-[#1A1A2E] border border-[#2E2E4A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#6C3FD4]";

  return (
    <form onSubmit={handleSubmit} className="bg-[#0D0D1A] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#888] text-xs font-medium mb-1.5">Plan Name <span className="text-red-400">*</span></label>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Starter" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#888] text-xs font-medium mb-1.5">Price</label>
          <input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. $499 or Contact for Price" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#888] text-xs font-medium mb-1.5">Billing Label</label>
          <input value={form.billing} onChange={(e) => set("billing", e.target.value)} placeholder="e.g. /month, /project" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#888] text-xs font-medium mb-1.5">Display Order</label>
          <input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-[#888] text-xs font-medium mb-1.5">Features <span className="text-[#555]">(one per line)</span></label>
        <textarea rows={6} value={form.featuresText} onChange={(e) => set("featuresText", e.target.value)} placeholder={"Logo Design\nBrand Kit\nTemplates"} className={`${inputCls} resize-none`} />
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer w-fit">
        <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 accent-[#6C3FD4]" />
        <span className="text-[#AAAAAA] text-sm">Mark as Most Popular</span>
      </label>
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] disabled:opacity-50 text-white font-semibold text-sm transition-colors">
          {saving ? "Saving…" : "Save Plan"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ServicePricingPage() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then((r) => r.json())
      .then((svc) => {
        setService(svc);
        return fetch(`/api/admin/service-pricing?service_slug=${svc.slug}`);
      })
      .then((r) => r.json())
      .then((data) => setTiers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const fetchTiers = () => {
    if (!service?.slug) return;
    fetch(`/api/admin/service-pricing?service_slug=${service.slug}`)
      .then((r) => r.json())
      .then((data) => setTiers(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  const openAdd = () => { setEditingTier(null); setShowForm(true); };
  const openEdit = (tier) => { setEditingTier(tier); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingTier(null); };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (editingTier) {
        await fetch(`/api/admin/service-pricing/${editingTier.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("/api/admin/service-pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, service_slug: service.slug }),
        });
      }
      closeForm();
      fetchTiers();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tierId) => {
    if (!confirm("Delete this pricing plan?")) return;
    await fetch(`/api/admin/service-pricing/${tierId}`, { method: "DELETE" });
    fetchTiers();
  };

  const formInitial = editingTier
    ? {
        name: editingTier.name,
        price: editingTier.price,
        billing: editingTier.billing || "",
        featuresText: (editingTier.features || []).join("\n"),
        is_featured: editingTier.is_featured,
        display_order: editingTier.display_order,
      }
    : BLANK_FORM;

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/services" className="p-1.5 rounded-lg text-[#888] hover:text-white hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <p className="text-[#888] text-xs mb-0.5">Pricing for</p>
          <h1 className="text-white text-2xl font-bold">
            {loading ? "…" : service?.title ?? id}
          </h1>
          <p className="text-[#888] text-sm mt-0.5">{tiers.length} plan{tiers.length !== 1 ? "s" : ""}</p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        )}
      </div>

      {showForm && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">{editingTier ? "Edit Plan" : "New Plan"}</p>
            <button onClick={closeForm} className="p-1 rounded text-[#888] hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <PricingForm key={editingTier?.id ?? "new"} initial={formInitial} onSave={handleSave} onCancel={closeForm} saving={saving} />
        </div>
      )}

      {loading ? (
        <p className="text-[#888] text-sm">Loading…</p>
      ) : tiers.length === 0 ? (
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-10 text-center">
          <p className="text-[#888] text-sm">No pricing plans yet.</p>
          <p className="text-[#555] text-xs mt-1">Click &quot;Add Plan&quot; to create the first tier.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
