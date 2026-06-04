import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipientEmail = "komarov.pv@metallobazav.ru";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildMailto({ title, name, phone, source, details }) {
  const body = [
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Источник: ${source}`,
    `Детали: ${details}`,
  ].join("\n");

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || formData.get("Имя") || "").trim();
  const phone = String(formData.get("phone") || formData.get("Телефон") || "").trim();
  const title = String(formData.get("title") || "Заявка с сайта").trim();
  const source = String(formData.get("source") || "Форма на сайте").trim();
  const details = String(formData.get("details") || formData.get("Описание задачи") || "").trim();
  const mailto = buildMailto({ title, name, phone, source, details });

  if (!name || !phone) {
    return Response.json({ ok: false, mailto, error: "Укажите имя и телефон." }, { status: 400 });
  }

  const transporter = getTransporter();

  if (!transporter) {
    return Response.json(
      {
        ok: false,
        mailto,
        error: "SMTP не настроен. Добавьте SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
      },
      { status: 503 },
    );
  }

  const attachments = [];
  const files = formData.getAll("Документация");

  for (const file of files) {
    if (!file || typeof file === "string" || file.size === 0) {
      continue;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name || "document",
      content: buffer,
      contentType: file.type || undefined,
    });
  }

  const html = `
    <h2>${escapeHtml(title)}</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Источник:</strong> ${escapeHtml(source)}</p>
    <p><strong>Детали:</strong><br>${escapeHtml(details).replaceAll("\n", "<br>")}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.LEAD_EMAIL || recipientEmail,
    replyTo: process.env.SMTP_REPLY_TO || process.env.SMTP_USER,
    subject: title,
    text: [`Имя: ${name}`, `Телефон: ${phone}`, `Источник: ${source}`, `Детали: ${details}`].join("\n"),
    html,
    attachments,
  });

  return Response.json({ ok: true });
}
