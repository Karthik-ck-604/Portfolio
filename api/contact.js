const nodemailer = require("nodemailer");

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#039;");

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
};

const isRateLimited = (ip) => {
  const now = Date.now();

  for (const [key, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (recent.length) requestLog.set(key, recent);
    else requestLog.delete(key);
  }

  const timestamps = requestLog.get(ip) || [];
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) return true;
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ success: false, error: "Too many requests. Please try again in 15 minutes." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, error: "Request body must be valid JSON." });
    }
  }

  const {
    name: inputName,
    email: inputEmail,
    subject: inputSubject,
    message: inputMessage,
  } = body || {};
  const fields = {
    name: inputName,
    email: inputEmail,
    subject: inputSubject,
    message: inputMessage,
  };
  const missingField = Object.entries(fields).find(([, value]) => typeof value !== "string" || !value.trim());
  if (missingField) {
    return res.status(400).json({ success: false, error: `${missingField[0]} is required.` });
  }

  const clean = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]));
  if (!emailPattern.test(clean.email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email address." });
  }
  if (clean.message.length < 10) {
    return res.status(400).json({ success: false, error: "Message must be at least 10 characters." });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECEIVER_EMAIL) {
    console.error("Contact form email environment variables are not configured.");
    return res.status(500).json({ success: false, error: "Email service is not configured." });
  }

  const safe = Object.fromEntries(Object.entries(clean).map(([key, value]) => [key, escapeHtml(value)]));
  const { name, email, subject, message } = clean;
  const mailtoEmail = encodeURIComponent(clean.email);
  const emailHtml = `
    <div style="margin:0;padding:24px;font-family:Arial,sans-serif;line-height:1.6;color:#242424">
      <div style="max-width:680px;margin:0 auto;background:#1b1b1b;border:1px solid #3a3a3a;border-radius:12px;overflow:hidden;color:#f8f8f8">
        <div style="padding:24px 28px;border-bottom:3px solid #dc2626">
          <p style="margin:0;color:#ef4444;font-size:12px;font-weight:700;letter-spacing:1px">Portfolio contact</p>
          <h1 style="margin:8px 0 0;font-size:24px;color:#f8f8f8">New message from your portfolio</h1>
        </div>
        <div style="padding:28px">
          <p style="margin:0 0 8px;color:#b8b8b8;font-size:12px;letter-spacing:1px">Name</p>
          <p style="margin:0 0 20px;color:#f8f8f8">${safe.name}</p>
          <p style="margin:0 0 8px;color:#b8b8b8;font-size:12px;letter-spacing:1px">Email</p>
          <p style="margin:0 0 20px"><a href="mailto:${mailtoEmail}" style="color:#ef4444">${safe.email}</a></p>
          <p style="margin:0 0 8px;color:#b8b8b8;font-size:12px;letter-spacing:1px">Subject</p>
          <p style="margin:0 0 20px;color:#f8f8f8">${safe.subject}</p>
          <p style="margin:0 0 8px;color:#b8b8b8;font-size:12px;letter-spacing:1px">Message</p>
          <div style="padding:18px;border:1px solid #3a3a3a;border-left:3px solid #dc2626;border-radius:4px;color:#f8f8f8;white-space:pre-wrap">${safe.message}</div>
        </div>
        <div style="padding:18px 28px;border-top:1px solid #2a2a2a;color:#a8a8a8;font-size:12px">&mdash;<br>Sent from karthik-portfolio.com contact form</div>
      </div>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // These reduce spam-flagging likelihood but cannot guarantee inbox placement.
    // Gmail also weighs sender reputation, which builds over time and improves when
    // recipients mark messages as "Not Spam."
    const mailOptions = {
      from: `"From Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Portfolio Contact: ${subject}`,
      text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: emailHtml,
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Portfolio Contact Form",
      },
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(500).json({ success: false, error: "Unable to send email." });
  }
};
