"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export function FormBlock({ form }: { form: any }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    await fetch("/api/forms/submit", {
      method: "POST",
      body: JSON.stringify({
        formId: form.id,
        data: payload,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setSubmitting(false);
    setSuccess(true);
    router.refresh(); // revalidate client
  }

  if (success) {
    return <p className="text-green-600">{form.successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {form.fields.map((f: any) => {
        if (f.type === "textarea") {
          return (
            <div key={f.name}>
              <label className="block mb-1">{f.label}</label>
              <Textarea name={f.name} required={f.required} />
            </div>
          );
        }
        if (f.type === "checkbox") {
          return (
            <div key={f.name} className="flex items-center space-x-2">
              <Checkbox id={f.name} name={f.name} />
              <label htmlFor={f.name}>{f.label}</label>
            </div>
          );
        }
        return (
          <div key={f.name}>
            <label className="block mb-1">{f.label}</label>
            <Input type={f.type} name={f.name} required={f.required} />
          </div>
        );
      })}
      {/* Honeypot field */}
      <input
        type="text"
        name="newsletter_input"
        autoComplete="off"
        style={{ display: "none" }}
        tabIndex={-1}
      />

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
