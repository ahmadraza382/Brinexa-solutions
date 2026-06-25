"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, UserPlus } from "lucide-react";

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setUsers(d);
        else setError(d.error || "Failed to load users.");
      })
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  };

  useEffect(fetchUsers, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, password: newPass }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) { setError(data.error || "Failed to create user."); return; }
    setNewEmail(""); setNewPass(""); setShowForm(false);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this admin user?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to delete."); return; }
    fetchUsers();
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Admin Users</h1>
          <p className="text-[#888] text-sm mt-0.5">Manage who can access this panel.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-[#1A1A2E] border border-[#6C3FD4]/30 rounded-xl p-5 space-y-4"
        >
          <p className="text-white font-semibold text-sm">New Admin User</p>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
          />
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Password (min 8 characters)"
            required
            minLength={8}
            className="w-full bg-[#0D0D0D] border border-[#2E2E4A] rounded-xl px-4 py-3 text-white placeholder:text-[#555] text-sm outline-none focus:border-[#6C3FD4] transition-colors"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={creating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] text-white text-sm font-semibold disabled:opacity-60"
            >
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              {creating ? "Creating…" : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-[#2E2E4A] text-[#888] text-sm hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2E2E4A]">
              {["Email", "Created", "Last Sign-in", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#666] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(2)].map((_, i) => (
                <tr key={i} className="border-b border-[#2E2E4A]">
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-[#2E2E4A] rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : !users.length ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#555]">
                  No users found. Note: requires SUPABASE_SERVICE_ROLE_KEY to be set.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-[#2E2E4A] hover:bg-white/2">
                  <td className="px-4 py-3 text-white">{u.email}</td>
                  <td className="px-4 py-3 text-[#888]">{fmtDate(u.created_at)}</td>
                  <td className="px-4 py-3 text-[#888]">{fmtDate(u.last_sign_in_at)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#666] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
