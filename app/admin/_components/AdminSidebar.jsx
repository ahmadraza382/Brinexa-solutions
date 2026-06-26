"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Layout,
  Briefcase,
  Settings,
  Users,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Layers,
  Tag,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  {
    label: "Content",
    icon: FileText,
    children: [
      { label: "Blog Posts", href: "/admin/content/blog", icon: FileText },
      { label: "Pages", href: "/admin/content/pages", icon: Layout },
    ],
  },
  { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  {
    label: "Services",
    icon: Layers,
    children: [
      { label: "All Services", href: "/admin/services", icon: Layers },
      { label: "Add Service", href: "/admin/services/new", icon: Tag },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "General", href: "/admin/settings", icon: Settings },
      { label: "Users", href: "/admin/settings/users", icon: Users },
    ],
  },
];

function NavItem({ item, pathname, collapsed, onNav }) {
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((c) => pathname.startsWith(c.href));
  });

  const isActive = item.href
    ? pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
    : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            open ? "text-white bg-white/5" : "text-[#AAAAAA] hover:text-white hover:bg-white/5"
          }`}
        >
          <item.icon className="w-4 h-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {open ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </>
          )}
        </button>
        {open && !collapsed && (
          <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#2E2E4A] pl-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNav}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith(child.href)
                    ? "text-white bg-[#6C3FD4]/20 text-[#6C3FD4]"
                    : "text-[#AAAAAA] hover:text-white hover:bg-white/5"
                }`}
              >
                <child.icon className="w-4 h-4" />
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNav}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-[#6C3FD4]/20 text-[#6C3FD4] border border-[#6C3FD4]/30"
          : "text-[#AAAAAA] hover:text-white hover:bg-white/5"
      }`}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const SidebarContent = ({ collapsed = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#2E2E4A]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Brinexa Solutions"
          className={`rounded-lg object-contain transition-all ${collapsed ? "h-8 w-8" : "h-9 w-auto"}`}
        />
        {!collapsed && (
          <p className="text-[#888] text-xs">Admin Panel</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            pathname={pathname}
            collapsed={collapsed}
            onNav={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#2E2E4A]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#AAAAAA] hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#1A1A2E] border border-[#2E2E4A] text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A2E] border-r border-[#2E2E4A] transform transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-[#888] hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-60 bg-[#1A1A2E] border-r border-[#2E2E4A] flex-col">
        <SidebarContent />
      </div>
    </>
  );
}
