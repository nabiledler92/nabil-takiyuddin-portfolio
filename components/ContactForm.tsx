"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/Icons";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Pushes a GTM dataLayer event. No personal data (name, email, message) is ever sent.
 * Does nothing when GTM is not loaded (local and preview builds).
 */
function trackContact(method: "form" | "mailto") {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event: "contact_form_submit", contact_method: method });
}

function mailtoHref(to: string, name: string, email: string, message: string) {
  const subject = `Portfolio enquiry from ${name || "your website"}`;
  const body = `${message}\n\n${name}${email ? `\n${email}` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Posts to /api/contact. If the mail service is not configured (503) or the
 * request fails, it falls back to opening a prefilled mailto: link.
 */
export function ContactForm({ to }: { to: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fallbackHref, setFallbackHref] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");

    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const openFallback = () => {
      const href = mailtoHref(to, name, email, message);
      setFallbackHref(href);
      setStatus("fallback");
      trackContact("mailto");
      window.location.href = href;
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      if (res.ok) {
        setStatus("sent");
        trackContact("form");
        form.reset();
      } else if (res.status === 400) {
        const json = (await res.json().catch(() => null)) as { errors?: Record<string, string> } | null;
        setErrors(json?.errors ?? { message: "Please check the form and try again." });
        setStatus("idle");
      } else if (res.status === 429) {
        setStatus("error");
      } else {
        openFallback();
      }
    } catch {
      openFallback();
    }
  }

  const field =
    "mt-2 w-full rounded-lg border border-line-strong bg-void/60 px-3.5 py-3 text-base text-ink placeholder:text-dim transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 aria-[invalid=true]:border-danger-line";
  const errorText = "mt-1.5 text-sm text-danger";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={field}
          />
          {errors.name ? (
            <p id="cf-name-err" className={errorText}>
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-email" className="label">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={field}
          />
          {errors.email ? (
            <p id="cf-email-err" className={errorText}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company (leave this empty)</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="cf-message" className="label">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`${field} resize-y`}
        />
        {errors.message ? (
          <p id="cf-message-err" className={errorText}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={status === "sending"}>
          {status === "sending" ? "Transmitting…" : "Send message"} <ArrowRight />
        </button>
        <p id="contact-status" role="status" aria-live="polite" className="min-h-5 text-sm text-soft">
          {status === "sent" ? "Message sent. Thank you, I will reply by email." : null}
          {status === "fallback" ? (
            <>
              Opening your email app with the message filled in.{" "}
              <a className="link" href={fallbackHref}>
                Open it again
              </a>
            </>
          ) : null}
          {status === "error" ? (
            <>
              Too many messages just now. Please email{" "}
              <a className="link" href={`mailto:${to}`}>
                {to}
              </a>{" "}
              instead.
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
