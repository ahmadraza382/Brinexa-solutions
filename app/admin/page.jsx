"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, FileText, Briefcase, Users, ArrowRight, TrendingUp } from "lucide-react";

const statusColor = {
  NEW: "bg-blue-500/20 text-blue-400",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400",
  CLOSED: "bg-green-500/20 text-green-400",
};

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#888] text-sm mb-1">{label}</p>
          <p className="text-white text-3xl font-bold">{value ?? "—"}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function MiniChart({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map(({ date, count }) => (
        <div key={date} className="flex-1 flex flex-col items-center gap-1 group">
          <div
            className="w-full rounded-sm bg-[#6C3FD4]/60 group-hover:bg-[#6C3FD4] transition-colors"
            style={{ height: `${Math.max((count / max) * 56, 4)}px` }}
            title={`${date}: ${count} lead${count !== 1 ? "s" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <p className="text-[#888] text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={loading ? "…" : stats?.totalLeads}
          icon={Inbox}
          color="bg-[#6C3FD4]/20 text-[#6C3FD4]"
        />
        <StatCard
          label="New This Week"
          value={loading ? "…" : stats?.newLeads}
          icon={TrendingUp}
          color="bg-[#00C9A7]/20 text-[#00C9A7]"
        />
        <StatCard
          label="Published Posts"
          value={loading ? "…" : stats?.totalPosts}
          icon={FileText}
          color="bg-blue-500/20 text-blue-400"
        />
        <StatCard
          label="Live Projects"
          value={loading ? "…" : stats?.totalProjects}
          icon={Briefcase}
          color="bg-orange-500/20 text-orange-400"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Leads chart */}
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
          <p className="text-white font-semibold mb-1">Leads — Last 7 Days</p>
          <p className="text-[#888] text-xs mb-4">Daily submissions from contact form</p>
          {loading ? (
            <div className="h-16 bg-[#2E2E4A] rounded animate-pulse" />
          ) : (
            <MiniChart data={stats?.leadsChart} />
          )}
        </div>

        {/* Quick links */}
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
          <p className="text-white font-semibold mb-4">Quick Actions</p>
          <div className="space-y-2">
            {[
              { label: "View all leads", href: "/admin/leads", icon: Inbox },
              { label: "New blog post", href: "/admin/content/blog/new", icon: FileText },
              { label: "Add project", href: "/admin/portfolio/new", icon: Briefcase },
              { label: "Site settings", href: "/admin/settings", icon: Users },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <Icon className="w-4 h-4 text-[#6C3FD4]" />
                <span className="text-[#AAAAAA] text-sm group-hover:text-white transition-colors flex-1">
                  {label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#555] group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold">Recent Leads</p>
            <Link href="/admin/leads" className="text-[#6C3FD4] text-xs hover:underline">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-[#2E2E4A] rounded animate-pulse" />
              ))}
            </div>
          ) : !stats?.recentLeads?.length ? (
            <p className="text-[#555] text-sm">No leads yet.</p>
          ) : (
            <div className="space-y-2">
              {stats.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2E2E4A] flex items-center justify-center shrink-0">
                    <span className="text-[#888] text-xs font-bold">
                      {lead.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate group-hover:text-[#00C9A7] transition-colors">
                      {lead.name}
                    </p>
                    <p className="text-[#555] text-xs truncate">{lead.service || "—"}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[lead.status] || ""}`}
                  >
                    {lead.status?.replace("_", " ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
