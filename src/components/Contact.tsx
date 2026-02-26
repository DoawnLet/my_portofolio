"use client";

import React, { useState, FormEvent } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    if (!form.consent) newErrors.consent = "You must agree to be contacted.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
    setErrors((prev) => ({ ...prev, [target.name]: undefined }));
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Contact"
          title="TRAVAILLONS"
          highlight="ENSEMBLE"
          subtitle="Have a project in mind? Drop me a message and let's create something remarkable."
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#088395]/20 to-[#09637E]/20 border border-[#088395]/20">
                  <Mail className="w-5 h-5 text-[#088395]" />
                </div>
                <div>
                  <p className="text-xs text-[#7AB2B2]/60 uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:your.email@example.com"
                    className="text-white hover:text-[#088395] transition-colors"
                  >
                    your.email@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#09637E]/20 to-[#088395]/20 border border-[#09637E]/20">
                  <MapPin className="w-5 h-5 text-[#09637E]" />
                </div>
                <div>
                  <p className="text-xs text-[#7AB2B2]/60 uppercase tracking-widest mb-1">
                    Location
                  </p>
                  <p className="text-white">Vietnam — Available Remotely</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-[#088395]/40 hover:text-[#088395] text-gray-400 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-[#09637E]/40 hover:text-[#09637E] text-gray-400 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 bg-slate-900/40 border border-white/5 rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 text-[#088395]" />
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                      consent: false,
                    });
                  }}
                  className="mt-2 text-sm text-[#088395] hover:text-[#7AB2B2] underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-gray-400 mb-1.5"
                    >
                      Full Name <span className="text-[#7AB2B2]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors focus:border-[#088395]/60 ${errors.name ? "border-red-500/60" : "border-white/10"}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-400 mb-1.5"
                    >
                      Email <span className="text-[#7AB2B2]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors focus:border-[#088395]/60 ${errors.email ? "border-red-500/60" : "border-white/10"}`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm text-gray-400 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, collaboration..."
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors focus:border-[#088395]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-400 mb-1.5"
                  >
                    Message <span className="text-[#7AB2B2]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors focus:border-[#088395]/60 resize-none ${errors.message ? "border-red-500/60" : "border-white/10"}`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Consent checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 accent-[#088395] cursor-pointer"
                    />
                    <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      I agree to be contacted regarding my request. My
                      information will not be shared with third parties and will
                      only be used to respond to this message.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#088395] to-[#09637E] text-white font-semibold text-base hover:shadow-xl hover:shadow-[#09637E]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
