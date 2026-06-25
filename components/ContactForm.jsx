"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

// Submissions are sent to /api/leads → saved in Supabase leads table

const SERVICES_OPTIONS = [
  "Branding",
  "Web Development",
  "Digital Marketing",
  "Paid Ads",
  "Amazon",
  "Video",
  "Other",
];

const empty = { name: "", email: "", phone: "", service: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Tell us a bit more (10+ characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm(empty);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fieldClass = (k) =>
    `w-full bg-brand-navy/60 border rounded-[10px] px-4 py-3 text-white placeholder:text-text-muted outline-none transition-all duration-200 focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(108,63,212,0.2)] ${
      errors[k] ? "border-red-500/60" : "border-brand-border"
    }`;

  return (
    <div className="glass-card p-7 md:p-9 relative overflow-hidden">
      <div
        className="absolute -top-24 -left-24 w-60 h-60 rounded-full opacity-20 pointer-events-none animate-pulse-glow"
        style={{ background: "#6C3FD4", filter: "blur(80px)" }}
      />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative text-center py-14"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-brand shadow-glow-purple"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="font-heading font-bold text-2xl text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-text-secondary max-w-sm mx-auto">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-7 btn-ghost !py-2.5 !px-6 !text-sm"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="relative space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={fieldClass("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+92 3XX XXXXXXX"
                  className={fieldClass("phone")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Service Interested In
                </label>
                <select
                  value={form.service}
                  onChange={update("service")}
                  className={`${fieldClass("service")} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-brand-navy">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Message / Project Details
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your project, goals, and timeline..."
                className={`${fieldClass("message")} resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
              )}
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Something went wrong. Please try again or WhatsApp us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
