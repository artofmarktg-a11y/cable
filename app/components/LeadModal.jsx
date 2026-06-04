"use client";

import { useState } from "react";

const recipientEmail = "komarov.pv@metallobazav.ru";

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const normalized = digits.startsWith("7") ? digits : `7${digits}`;
  const body = normalized.slice(1);
  const area = body.slice(0, 3);
  const first = body.slice(3, 6);
  const second = body.slice(6, 8);
  const third = body.slice(8, 10);
  let result = "+7";

  if (area) {
    result += ` (${area}`;
  }

  if (area.length === 3) {
    result += ")";
  }

  if (first) {
    result += ` ${first}`;
  }

  if (second) {
    result += `-${second}`;
  }

  if (third) {
    result += `-${third}`;
  }

  return result;
}

function buildFallbackMailto(formData) {
  const title = formData.get("title") || "Заявка с сайта";
  const body = [
    `Имя: ${formData.get("name") || ""}`,
    `Телефон: ${formData.get("phone") || ""}`,
    `Источник: ${formData.get("source") || ""}`,
    `Детали: ${formData.get("details") || ""}`,
  ].join("\n");

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

export default function LeadModal({ lead, onClose }) {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!lead) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("title", lead.title || "Заявка с сайта");
    formData.set("source", lead.source || "Кнопка на сайте");
    formData.set("details", lead.details || "");

    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const fallback = result.mailto || buildFallbackMailto(formData);
        window.location.href = fallback;
        setStatus("Откроем почтовый клиент для отправки заявки.");
        return;
      }

      setStatus("Заявка отправлена. Менеджер свяжется с вами.");
      form.reset();
      setTimeout(onClose, 1400);
    } catch (error) {
      window.location.href = buildFallbackMailto(formData);
      setStatus("Откроем почтовый клиент для отправки заявки.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="lead-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="lead-modal-close" type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>

        <div className="lead-modal-copy">
          <span>{lead.source || "Заявка с сайта"}</span>
          <h2 id="lead-modal-title">{lead.title || "Оставьте заявку"}</h2>
          <p>Укажите имя и телефон. Мы свяжемся с вами и уточним детали.</p>
        </div>

        <form className="lead-modal-form" onSubmit={handleSubmit}>
          <input type="hidden" name="title" value={lead.title || "Заявка с сайта"} readOnly />
          <input type="hidden" name="source" value={lead.source || "Кнопка на сайте"} readOnly />
          <input type="hidden" name="details" value={lead.details || ""} readOnly />

          <label>
            <span>Имя</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            <span>Телефон</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              onInput={(event) => {
                event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
              }}
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? "Отправляем..." : "Отправить заявку"}
          </button>

          {status && <p className="lead-modal-status">{status}</p>}
        </form>
      </section>
    </div>
  );
}
