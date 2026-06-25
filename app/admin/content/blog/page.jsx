"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

const statusStyle = {
  PUBLISHED: "bg-green-500/20 text-green-400",
  DRAFT: "bg-[#2E2E4A] text-[#888]",
};

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Blog Posts</h1>
          <p className="text-[#888] text-sm mt-0.5">{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/content/blog/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2E2E4A]">
              {["Title", "Category", "Status", "Published", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#666] font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="border-b border-[#2E2E4A]">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-[#2E2E4A] rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : !posts.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#555]">
                  No posts yet.{" "}
                  <Link href="/admin/content/blog/new" className="text-[#6C3FD4] hover:underline">
                    Create your first post
                  </Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-[#2E2E4A] hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-white font-medium max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-[#888]">{post.category || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[post.status]}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#888] whitespace-nowrap">
                    {fmtDate(post.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/content/blog/${post.id}`}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#888] hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#888] hover:text-[#00C9A7] transition-colors"
                      >
                        {post.status === "PUBLISHED" ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#888] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
