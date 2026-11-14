import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort, per-instance rate limit: 5 messages per 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

// Generous for a 5,000-character message plus name/email and JSON overhead.
const MAX_BODY_BYTES = 20_000;

/** Client IP. On Vercel, x-real-ip is set by the platform and cannot be spoofed by the client. */
function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: real visitors never fill this in. Pretend it worked.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const cleanName = typeof name === "string" ? name.replace(/[\r\n]+/g, " ").trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";
  if (!cleanName || cleanName.length > 100) errors.name = "Please enter your name (up to 100 characters).";
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 200) errors.email = "Please enter a valid email address.";
  if (cleanMessage.length < 10 || cleanMessage.length > 5000)
    errors.message = "Please write a message between 10 and 5,000 characters.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "validation", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Not configured: the client falls back to a prefilled mailto: link.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `Portfolio enquiry from ${cleanName}`,
        text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
        html: `<p><strong>From:</strong> ${escapeHtml(cleanName)} &lt;${escapeHtml(cleanEmail)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
