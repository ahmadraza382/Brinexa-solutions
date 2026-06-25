"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_FILTERS = ["All", "NEW", "IN_PROGRESS", "CLOSED"];

const statusStyle = {
  NEW: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  CLOSED: "bg-green-500/20 text-green-400 border-green-500/30",
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function exportCSV(leads) {
  const headers = ["Name", "Email", "Phone", "Service", "Date", "Status"];
  const rows = leads.map((l) => [
    l.name, l.email, l.phone || "", l.service || "",
    fmtDate(l.created_at), l.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page });
    if (status !== "All") params.set("status", status);
    fetch(`/api/admin/leads?${params}`)
      .then((r) => r.json())
      .then((d) => { setLeads(d.leads || []); setTotal(d.total || 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, status]);

  const filtered = search
    ? leads.filter(
        (l) =>
          l.name?.toLowerCase().includes(search.toLowerCase()) ||
          l.email?.toLowerCase().includes(search.toLowerCase())
      )
    : leads;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Leads</h1>
          <p className="text-[#888] text-sm mt-0.5">{total} total inquiries</p>
        </div>
        <button
          onClick={() => exportCSV(leads)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2E2E4A] text-[#AAAAAA] hover:text-white hover:border-[#6C3FD4] transition-colors text-sm"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl pl-9 pr-4 py-2.5 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setStatus(f); setPage(1); }}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                status === f
                  ? "bg-[#6C3FD4]/20 text-[#6C3FD4] border-[#6C3FD4]/40"
                  : "border-[#2E2E4A] text-[#888] hover:text-white"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2E2E4A]">
                {["Name", "Email", "Phone", "Service", "Date", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[#666] font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-[#2E2E4A]">
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-[#2E2E4A] rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : !filtered.length ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[#555]">
                    No leads found.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-[#2E2E4A] hover:bg-white/2 transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-[#AAAAAA]">{lead.email}</td>
                    <td className="px-4 py-3 text-[#888]">{lead.phone || "—"}</td>
                    <td className="px-4 py-3 text-[#888]">{lead.service || "—"}</td>
                    <td className="px-4 py-3 text-[#888] whitespace-nowrap">
                      {fmtDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                          statusStyle[lead.status] || "bg-[#2E2E4A] text-[#888]"
                        }`}
                      >
                        {lead.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#888] hover:text-white transition-colors inline-flex"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#2E2E4A]">
            <p className="text-[#666] text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-[#2E2E4A] text-[#888] hover:text-white disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-[#2E2E4A] text-[#888] hover:text-white disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
