"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

export default function PagesAdminPage() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings?key=page_content")
      .then((r) => r.json())
      .then((d) => setSettings(d.value || {}))
      .catch(() => setSettings({}));
  }, []);

  const update = (k) => (e) =>
    setSettings((s) => ({ ...s, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "page_content", value: settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-[#6C3FD4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Page Content</h1>
          <p className="text-[#888] text-sm mt-0.5">Edit key text blocks on the public site.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-5">
        <p className="text-[#AAAAAA] text-sm font-semibold border-b border-[#2E2E4A] pb-3">
          Home Page
        </p>
        {[
          { key: "home_hero_title", label: "Hero Title", placeholder: "Your Brand's New Best Friend" },
          { key: "home_hero_subtitle", label: "Hero Subtitle", placeholder: "Full-service digital agency…" },
          { key: "home_cta_text", label: "CTA Button Text", placeholder: "Get Free Consultation" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-[#888] text-xs mb-2">{label}</label>
            <input
              type="text"
              value={settings[key] || ""}
              onChange={update(key)}
              placeholder={placeholder}
              className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-5">
        <p className="text-[#AAAAAA] text-sm font-semibold border-b border-[#2E2E4A] pb-3">
          About Page
        </p>
        {[
          { key: "about_tagline", label: "Tagline", placeholder: "We're a team of…" },
          { key: "about_story", label: "Our Story", placeholder: "Brinexa Solutions was founded…", multiline: true },
          { key: "about_mission", label: "Mission Statement", placeholder: "Our mission is to…", multiline: true },
        ].map(({ key, label, placeholder, multiline }) => (
          <div key={key}>
            <label className="block text-[#888] text-xs mb-2">{label}</label>
            {multiline ? (
              <textarea
                rows={4}
                value={settings[key] || ""}
                onChange={update(key)}
                placeholder={placeholder}
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                value={settings[key] || ""}
                onChange={update(key)}
                placeholder={placeholder}
                className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
