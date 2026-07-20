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
    <div style="margin:0;padding:24px;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#242424">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;margin:0 auto;background:#1b1b1b;border:1px solid #3a3a3a;border-radius:12px;overflow:hidden;color:#f8f8f8">
        <tr>
          <td style="background:#252525;font-size:0;line-height:0">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" width="680" height="200" alt="Karthik CK Portfolio" style="display:block;width:100%;max-width:680px;height:200px;border:0;outline:none;text-decoration:none;background:#252525;color:#f8f8f8;font-size:16px;line-height:200px;text-align:center">
          </td>
        </tr>
        <tr>
          <td style="height:10px;line-height:10px;font-size:0;background:#1b1b1b;background-image:linear-gradient(90deg,#101010 0%,#3b1216 50%,#101010 100%)">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:28px 28px 24px;border-bottom:3px solid #dc2626">
            <span style="display:inline-block;padding:5px 10px;border:1px solid #653035;border-radius:999px;background:#111111;color:#ef4444;font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.2">PORTFOLIO CONTACT</span>
            <h1 style="margin:18px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:27px;line-height:1.25;font-weight:700;color:#f8f8f8">New message from your portfolio</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="50%" valign="top" style="padding:0 8px 16px 0">
                  <div style="padding:14px 15px;border:1px solid #3a3a3a;border-radius:8px;background:#202020">
                    <p style="margin:0 0 4px;color:#a8a8a8;font-size:11px;font-weight:700;letter-spacing:1px">NAME</p>
                    <p style="margin:0;color:#f8f8f8;font-size:15px;word-break:break-word">${safe.name}</p>
                  </div>
                </td>
                <td width="50%" valign="top" style="padding:0 0 16px 8px">
                  <div style="padding:14px 15px;border:1px solid #3a3a3a;border-radius:8px;background:#202020">
                    <p style="margin:0 0 4px;color:#a8a8a8;font-size:11px;font-weight:700;letter-spacing:1px">EMAIL</p>
                    <p style="margin:0;font-size:15px;word-break:break-word"><a href="mailto:${mailtoEmail}" style="color:#ef4444;text-decoration:none">${safe.email}</a></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:0 0 22px">
                  <div style="padding:14px 15px;border:1px solid #3a3a3a;border-radius:8px;background:#202020">
                    <p style="margin:0 0 4px;color:#a8a8a8;font-size:11px;font-weight:700;letter-spacing:1px">SUBJECT</p>
                    <p style="margin:0;color:#f8f8f8;font-size:15px;word-break:break-word">${safe.subject}</p>
                  </div>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;color:#b8b8b8;font-size:11px;font-weight:700;letter-spacing:1px">MESSAGE</p>
            <div style="padding:20px;border:1px solid #3a3a3a;border-left:3px solid #e63946;border-radius:8px;background:#202020;color:#f8f8f8;font-size:15px;line-height:1.75;white-space:pre-wrap;word-break:break-word">${safe.message}</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px">
              <tr>
                <td style="border-radius:7px;background:#e63946;box-shadow:0 2px 6px rgba(230,57,70,0.3)">
                  <a href="mailto:${mailtoEmail}" style="display:inline-block;padding:13px 20px;border-radius:7px;color:#ffffff;font-size:14px;font-weight:700;line-height:1;text-decoration:none">Reply to ${safe.name} &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 28px;border-top:1px solid #2a2a2a;background:#171717;text-align:center">
            <p style="margin:0 0 12px;color:#a8a8a8;font-size:12px">&mdash;</p>
            <p style="margin:0 0 12px">
              <a href="https://karthik-portfolio.com" style="display:inline-block;width:28px;height:28px;margin:0 4px;border:1px solid #454545;border-radius:50%;background:#252525;color:#f8f8f8;font-size:11px;font-weight:700;line-height:28px;text-align:center;text-decoration:none" aria-label="Portfolio">P</a>
              <a href="https://github.com/Karthik-ck-604" style="display:inline-block;width:28px;height:28px;margin:0 4px;border:1px solid #454545;border-radius:50%;background:#252525;color:#f8f8f8;font-size:11px;font-weight:700;line-height:28px;text-align:center;text-decoration:none" aria-label="GitHub">GH</a>
              <a href="https://linkedin.com/in/karthikeyan-cfsd" style="display:inline-block;width:28px;height:28px;margin:0 4px;border:1px solid #454545;border-radius:50%;background:#252525;color:#f8f8f8;font-size:10px;font-weight:700;line-height:28px;text-align:center;text-decoration:none" aria-label="LinkedIn">in</a>
            </p>
            <p style="margin:0;color:#5a5a5a;font-size:11px;line-height:1.4">Sent from karthik-portfolio.com contact form</p>
          </td>
        </tr>
      </table>
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
