"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  email: string;
}

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted";
const fieldClass =
  "font-sans bg-surface border border-line-subtle px-3 py-2.5 text-[16px] text-ink placeholder:text-ink-tertiary focus:border-accent focus:outline-none transition-colors duration-200 ease-out w-full";

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${senderEmail}`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md"
      noValidate={false}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={senderEmail}
          onChange={(event) => setSenderEmail(event.target.value)}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What's on your mind?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <Button type="submit" className="self-start">
        SEND_MESSAGE →
      </Button>
    </form>
  );
}

export default ContactForm;
