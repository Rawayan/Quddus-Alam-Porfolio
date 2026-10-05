"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { siteContent } from "@/content/site";

type ContactFormProps = {
  locale: "en" | "bn";
};

type FormState = {
  name: string;
  email: string;
  reason: string;
  message: string;
  website: string;
};

type Errors = Partial<
  Record<keyof FormState, string>
>;

const initialState: FormState = {
  name: "",
  email: "",
  reason: "",
  message: "",
  website: "",
};

const validReasons = [
  "print",
  "assignment",
  "collaboration",
  "general",
];

export default function ContactForm({
  locale,
}: ContactFormProps) {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();

  const [form, setForm] =
    useState<FormState>(initialState);

  const [errors, setErrors] =
    useState<Errors>({});

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const photoId =
    searchParams.get("photo") ?? "";

  const reasonFromUrl =
    searchParams.get("reason") ?? "";

  const selectedReason = validReasons.includes(
    reasonFromUrl,
  )
    ? reasonFromUrl
    : "";

  const updateField = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSubmitted(false);
  };

  const validate = (): Errors => {
    const nextErrors: Errors = {};

    if (!form.name.trim()) {
      nextErrors.name = t("required");
    }

    if (!form.email.trim()) {
      nextErrors.email = t("required");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim(),
      )
    ) {
      nextErrors.email = t("invalidEmail");
    }

    if (!form.reason) {
      nextErrors.reason = t("required");
    }

    if (!form.message.trim()) {
      nextErrors.message = t("required");
    } else if (form.message.trim().length < 10) {
      nextErrors.message = t("messageTooShort");
    }

    return nextErrors;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    /*
     * Honeypot:
     * Real visitors should leave this field empty.
     */
    if (form.website.trim()) {
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const reasonLabel =
      form.reason === "print"
        ? t("print")
        : form.reason === "assignment"
          ? t("assignment")
          : form.reason === "collaboration"
            ? t("collaboration")
            : t("general");

    const photoReference = photoId
      ? `\n\n${t("photoReference")}: ${photoId}`
      : "";

    const subject = `${reasonLabel} — ${form.name}`;

    const body = [
      `${t("name")}: ${form.name}`,
      `${t("email")}: ${form.email}`,
      `${t("reason")}: ${reasonLabel}`,
      "",
      `${t("message")}:`,
      form.message,
      photoReference,
    ].join("\n");

    const mailto = `mailto:${siteContent.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-medium text-[var(--ink)]"
        >
          {t("name")}
        </label>

        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
          placeholder={t("namePlaceholder")}
          className="glass-input w-full rounded-2xl px-4 py-3.5 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted-ink)] focus:ring-2 focus:ring-[var(--accent)]"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name
              ? "contact-name-error"
              : undefined
          }
        />

        {errors.name && (
          <p
            id="contact-name-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm font-medium text-[var(--ink)]"
        >
          {t("email")}
        </label>

        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
          placeholder={t("emailPlaceholder")}
          className="glass-input w-full rounded-2xl px-4 py-3.5 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted-ink)] focus:ring-2 focus:ring-[var(--accent)]"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? "contact-email-error"
              : undefined
          }
        />

        {errors.email && (
          <p
            id="contact-email-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Reason */}
      <div>
        <label
          htmlFor="contact-reason"
          className="mb-2 block text-sm font-medium text-[var(--ink)]"
        >
          {t("reason")}
        </label>

        <select
          id="contact-reason"
          value={
            form.reason ||
            (selectedReason &&
            !form.reason
              ? selectedReason
              : "")
          }
          onChange={(event) =>
            updateField("reason", event.target.value)
          }
          className="glass-input w-full rounded-2xl px-4 py-3.5 text-sm text-[var(--ink)] outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={
            errors.reason
              ? "contact-reason-error"
              : undefined
          }
        >
          <option value="">
            {t("reasonPlaceholder")}
          </option>

          <option value="print">
            {t("print")}
          </option>

          <option value="assignment">
            {t("assignment")}
          </option>

          <option value="collaboration">
            {t("collaboration")}
          </option>

          <option value="general">
            {t("general")}
          </option>
        </select>

        {errors.reason && (
          <p
            id="contact-reason-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.reason}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-[var(--ink)]"
        >
          {t("message")}
        </label>

        <textarea
          id="contact-message"
          rows={7}
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          placeholder={t("messagePlaceholder")}
          className="glass-input w-full resize-y rounded-2xl px-4 py-3.5 text-sm leading-7 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted-ink)] focus:ring-2 focus:ring-[var(--accent)]"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "contact-message-error"
              : undefined
          }
        />

        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">
          {t("honeypot")}
        </label>

        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) =>
            updateField("website", event.target.value)
          }
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t("sending") : t("send")}
      </button>

      {/* Success */}
      {submitted && (
        <div
          role="status"
          className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] p-4"
        >
          <p className="font-semibold text-[var(--ink)]">
            {t("successTitle")}
          </p>

          <p className="mt-1 text-sm leading-6 text-[var(--muted-ink)]">
            {t("successDescription")}
          </p>
        </div>
      )}
    </form>
  );
}