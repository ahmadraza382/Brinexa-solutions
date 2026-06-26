"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/siteData";
import Button from "./Button";

function Logo() {
  return (
    <Link href="/" className="flex items-center group" aria-label="Brinexa Solutions home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Brinexa Solutions"
        className="h-12 w-44 object-cover   rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          background:
            isMobile || scrolled
              ? "rgba(13,13,13,0.95)"
              : "rgba(13,13,13,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom:
            isMobile || scrolled
              ? "1px solid rgba(46,46,74,0.6)"
              : "1px solid transparent",
        }}
      >
        <nav className="container-x flex items-center justify-between h-[72px]">
          <Logo />

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{ color: isActive(link.href) ? "#fff" : "#AAAAAA" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-gradient-brand transition-all duration-300"
                    style={{ width: isActive(link.href) ? "100%" : "0%" }}
                  />
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-gradient-brand transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" className="!py-2.5 !px-6 !text-sm">
              CONTACT US
            </Button>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-[1090]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm z-[1095] p-6 flex flex-col"
              style={{
                background: "#0D0D0D",
                borderLeft: "1px solid #2E2E4A",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-white"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-xl text-lg font-medium transition-colors"
                      style={{
                        color: isActive(link.href) ? "#fff" : "#AAAAAA",
                        background: isActive(link.href)
                          ? "rgba(108,63,212,0.15)"
                          : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button href="/contact" className="w-full" onClick={() => setOpen(false)}>
                  CONTACT US
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
