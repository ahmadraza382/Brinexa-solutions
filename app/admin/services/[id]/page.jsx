"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "../_components/ServiceForm";

export default function EditServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then((r) => r.json())
      .then(setService)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-[#888] text-sm">Loading…</p>;
  }

  if (!service || service.error) {
    return <p className="text-red-400 text-sm">Service not found.</p>;
  }

  return <ServiceForm initial={service} serviceId={id} isNew={false} />;
}
