import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: Request) {
  const body = await req.json();
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
