import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

// Improve this with a distributed cache (e.g. Redis)
import { LRUCache } from "lru-cache"

const rateLimit = new LRUCache<string, number>({
  max: 500, // track up to 500 IPs
  ttl: 1000 * 60, // 1 minute
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  const hits = rateLimit.get(ip) || 0

  if (hits > 5) {
    return NextResponse.json({ error: "Too many submissions" }, { status: 429 })
  }

  rateLimit.set(ip, hits + 1)

  const body = await req.json();

  // Honeypot detection
  if (body.newsletter_input) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const payload = await getPayload({ config });

  // Store submission
  const submission = await payload.create({
    collection: "form-submissions",
    data: {
      form: body.formId,
      data: body.data,
    },
  });

  // Fetch form config (for email)
  const form = await payload.findByID({
    collection: "forms",
    id: body.formId,
  });

  // Send notification email to admin
  if (form.notifyEmail) {
    await payload.sendEmail({
      to: form.notifyEmail,
      subject: `New submission for ${form.title}`,
      html: `
        <h2>New submission</h2>
        <ul>
          ${Object.entries(body.data)
          .map(([key, val]) => `<li><b>${key}:</b> ${val}</li>`)
          .join("")}
        </ul>
      `,
    });
  }

  // Optionally send autoresponse
  if (form.sendAutoresponse && form.autoresponseField) {
    const recipient = body.data[form.autoresponseField];
    if (recipient) {
      await payload.sendEmail({
        to: recipient as string,
        subject: `Thanks for contacting us`,
        html: `<p>We received your submission and will get back to you shortly.</p>`,
      });
    }
  }

  return NextResponse.json({ success: true, submission });
}
