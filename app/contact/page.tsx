"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { contactEmail } from "../../lib/site";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isVerified, setIsVerified] = useState(false);
  const [turnstileResponse, setTurnstileResponse] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTurnstileChange = (response: string | null) => {
    setTurnstileResponse(response);
    setIsVerified(!!response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://submit-form.com/80I8Vcg0Q", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "cf-turnstile-response": turnstileResponse || "",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setIsVerified(false);
        setTurnstileResponse(null);
        setTurnstileKey((key) => key + 1);
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full border border-black/15 bg-white px-4 py-3 text-sm text-[#071433] outline-none transition-colors placeholder:text-[#071433]/30 focus:border-brand";

  return (
    <section className="px-6 pt-32 pb-24 sm:px-10 sm:pt-40 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-6 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">Contact</p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.02] font-bold tracking-tight text-[#071433] sm:text-6xl lg:text-7xl">
            Tell me what you want to build.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-[#071433]/70">
            A short note is enough. I read every message and reply from the address below.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase"
          >
            {contactEmail}
            <span aria-hidden>→</span>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 border border-black/10 bg-white p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#071433]/50 uppercase">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              minLength={2}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#071433]/50 uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#071433]/50 uppercase">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What should we make?"
              required
              minLength={10}
              rows={6}
              className={`${fieldClass} min-h-40 resize-y`}
            />
          </div>
          <div>
            <p className="mb-2 text-sm text-[#071433]/60">Complete the verification before sending.</p>
            <Turnstile
              key={turnstileKey}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACDEGW_UWjdgn3Va"}
              onSuccess={handleTurnstileChange}
              onExpire={() => handleTurnstileChange(null)}
              onError={() => handleTurnstileChange(null)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isVerified}
            className="w-full bg-brand px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Sending" : "Send message"}
          </button>
          <div aria-live="polite">
            {submitStatus === "success" && (
              <p className="text-sm text-brand">Message received. I&apos;ll get back to you soon.</p>
            )}
            {submitStatus === "error" && (
              <p className="text-sm text-red-700">The message was not sent. Try again, or email me directly.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
