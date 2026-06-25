"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [site, setSite] = useState(null);
  const [socials, setSocials] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/settings?key=site").then((r) => r.json()),
      fetch("/api/admin/settings?key=socials").then((r) => r.json()),
      fetch("/api/admin/settings?key=testimonials").then((r) => r.json()),
    ]).then(([s, so, t]) => {
      setSite(s.value || {});
      setSocials(so.value || {});
      setTestimonials(t.value || []);
    });
  }, []);

  const updateSite = (k) => (e) => setSite((s) => ({ ...s, [k]: e.target.value }));
  const updateSocial = (k) => (e) => setSocials((s) => ({ ...s, [k]: e.target.value }));

  const addTestimonial = () =>
    setTestimonials((t) => [...t, { name: "", position: "", quote: "" }]);

  const updateTestimonial = (i, k) => (e) =>
    setTestimonials((t) =>
      t.map((item, idx) => (idx === i ? { ...item, [k]: e.target.value } : item))
    );

  const removeTestimonial = (i) =>
    setTestimonials((t) => t.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    await Promise.all([
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "site", value: site }),
      }),
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "socials", value: socials }),
      }),
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "testimonials", value: testimonials }),
      }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!site || !socials) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-[#6C3FD4] animate-spin" />
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors";

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Settings</h1>
          <p className="text-[#888] text-sm mt-0.5">Manage site configuration.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : saving ? "Saving…" : "Save All"}
        </button>
      </div>

      {/* Site Info */}
      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
        <p className="text-white font-semibold text-sm border-b border-[#2E2E4A] pb-3">
          Site Information
        </p>
        {[
          { key: "name", label: "Site Name", placeholder: "Brinexa Solutions" },
          { key: "email", label: "Contact Email", placeholder: "brinexasolutions@gmail.com" },
          { key: "phone", label: "Phone / WhatsApp", placeholder: "+92 317 0796913" },
          { key: "location", label: "Location", placeholder: "Faisalabad, Punjab, Pakistan" },
          { key: "hours", label: "Business Hours", placeholder: "Mon-Sat, 9:00 AM - 6:00 PM PKT" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-[#888] text-xs mb-2">{label}</label>
            <input
              type="text"
              value={site[key] || ""}
              onChange={updateSite(key)}
              placeholder={placeholder}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
        <p className="text-white font-semibold text-sm border-b border-[#2E2E4A] pb-3">
          Social Media Links
        </p>
        {["facebook", "instagram", "tiktok", "linkedin", "youtube"].map((platform) => (
          <div key={platform}>
            <label className="block text-[#888] text-xs mb-2 capitalize">{platform}</label>
            <input
              type="url"
              value={socials[platform] || ""}
              onChange={updateSocial(platform)}
              placeholder={`https://${platform}.com/brinexa`}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#2E2E4A] pb-3">
          <p className="text-white font-semibold text-sm">Testimonials</p>
          <button
            onClick={addTestimonial}
            className="flex items-center gap-1.5 text-xs text-[#6C3FD4] hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {!testimonials.length && (
          <p className="text-[#555] text-sm">No testimonials yet. Click Add to create one.</p>
        )}
        {testimonials.map((t, i) => (
          <div key={i} className="bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[#888] text-xs">Testimonial {i + 1}</p>
              <button
                onClick={() => removeTestimonial(i)}
                className="text-[#555] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="text"
              value={t.name || ""}
              onChange={updateTestimonial(i, "name")}
              placeholder="Client name"
              className={inputClass}
            />
            <input
              type="text"
              value={t.position || ""}
              onChange={updateTestimonial(i, "position")}
              placeholder="Position, Company"
              className={inputClass}
            />
            <textarea
              rows={3}
              value={t.quote || ""}
              onChange={updateTestimonial(i, "quote")}
              placeholder="Their testimonial quote…"
              className={`${inputClass} resize-none`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
