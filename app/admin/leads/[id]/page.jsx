"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Tag,
  Trash2,
  Save,
  Loader2,
} from "lucide-react";

const STATUSES = ["NEW", "IN_PROGRESS", "CLOSED"];

const statusStyle = {
  NEW: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  CLOSED: "bg-green-500/20 text-green-400 border-green-500/30",
};

function fmtDate(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/leads/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setLead(d);
        setStatus(d.status || "NEW");
        setNotes(d.notes || "");
      })
      .catch(() => {});
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    router.push("/admin/leads");
  };

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-[#6C3FD4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/leads"
          className="p-2 rounded-xl border border-[#2E2E4A] text-[#888] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-white text-xl font-bold">{lead.name}</h1>
          <p className="text-[#888] text-sm">{fmtDate(lead.created_at)}</p>
        </div>
        <span
          className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
            statusStyle[lead.status] || ""
          }`}
        >
          {lead.status?.replace("_", " ")}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Lead info */}
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-3">
          <p className="text-white font-semibold text-sm mb-4">Contact Info</p>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-[#6C3FD4] shrink-0" />
            <a
              href={`mailto:${lead.email}`}
              className="text-[#AAAAAA] hover:text-[#00C9A7] transition-colors truncate"
            >
              {lead.email}
            </a>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-[#6C3FD4] shrink-0" />
              <a
                href={`tel:${lead.phone}`}
                className="text-[#AAAAAA] hover:text-[#00C9A7] transition-colors"
              >
                {lead.phone}
              </a>
            </div>
          )}
          {lead.service && (
            <div className="flex items-center gap-3 text-sm">
              <Tag className="w-4 h-4 text-[#6C3FD4] shrink-0" />
              <span className="text-[#AAAAAA]">{lead.service}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-[#6C3FD4] shrink-0" />
            <span className="text-[#888]">{fmtDate(lead.created_at)}</span>
          </div>

          {/* Quick actions */}
          <div className="pt-3 border-t border-[#2E2E4A] flex gap-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#6C3FD4]/20 text-[#6C3FD4] hover:bg-[#6C3FD4]/30 transition-colors text-xs font-medium"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            {lead.phone && (
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5" /> WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[#6C3FD4]" />
            <p className="text-white font-semibold text-sm">Message</p>
          </div>
          <p className="text-[#AAAAAA] text-sm leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </div>
      </div>

      {/* Status + Notes */}
      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5 space-y-4">
        <p className="text-white font-semibold text-sm">Update Status & Notes</p>

        <div>
          <label className="block text-[#888] text-xs mb-2">Status</label>
          <div className="flex gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  status === s
                    ? statusStyle[s]
                    : "border-[#2E2E4A] text-[#666] hover:text-white"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[#888] text-xs mb-2">Internal Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this lead…"
            className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting…" : "Delete Lead"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
