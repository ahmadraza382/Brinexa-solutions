"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./_components/AdminSidebar";
import AdminUserBadge from "./_components/AdminUserBadge";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="font-sans">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-[#2E2E4A] bg-[#0D0D0D] flex items-center justify-end px-6 shrink-0">
          <AdminUserBadge />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
