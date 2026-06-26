"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, Tag } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    setLoading(true);
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchServices, []);

  const toggleActive = async (service) => {
    await fetch(`/api/admin/services/${service.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...service, is_active: !service.is_active }),
    });
    fetchServices();
  };

  const deleteService = async (id) => {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Services</h1>
          <p className="text-[#888] text-sm mt-0.5">
            {services.filter((s) => s.is_active).length} active /{" "}
            {services.length} total
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C3FD4] hover:bg-[#5a33b0] text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </Link>
      </div>

      <div className="bg-[#1A1A2E] border border-[#2E2E4A] rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-[#888] text-sm p-6">Loading…</p>
        ) : services.length === 0 ? (
          <p className="text-[#888] text-sm p-6">No services found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2E2E4A] text-[#888] text-xs">
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Order</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr
                  key={service.id}
                  className={`border-b border-[#2E2E4A] last:border-0 ${
                    i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  }`}
                >
                  <td className="px-5 py-4">
                    <p className="text-white font-medium">{service.title}</p>
                    <p className="text-[#888] text-xs mt-0.5 hidden sm:block">{service.short}</p>
                  </td>
                  <td className="px-5 py-4 text-[#888] hidden md:table-cell">
                    <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
                      {service.slug}
                    </code>
                  </td>
                  <td className="px-5 py-4 text-[#888] hidden md:table-cell">
                    {service.display_order}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        service.is_active
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {service.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/services/${service.id}/pricing`}
                        className="p-1.5 rounded-lg text-[#888] hover:text-[#6C3FD4] hover:bg-[#6C3FD4]/10 transition-colors"
                        title="Manage Pricing"
                      >
                        <Tag className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-1.5 rounded-lg text-[#888] hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => toggleActive(service)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          service.is_active
                            ? "text-[#888] hover:text-yellow-400 hover:bg-yellow-400/10"
                            : "text-[#888] hover:text-green-400 hover:bg-green-400/10"
                        }`}
                        title={service.is_active ? "Hide" : "Activate"}
                      >
                        {service.is_active ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="p-1.5 rounded-lg text-[#888] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
