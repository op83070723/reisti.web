// api/contact.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  // 限制只能 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // 解析 body（在某些情況 req.body 會是字串）
  let body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch (_) {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email, message are required' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM || 'REISTI <no-reply@reisti.org>',
      to: process.env.MAIL_TO || 'chenytbiz@reisti.org',
      reply_to: email, // 讓你回覆時直接回到填寫者
      subject: `【お問い合わせ】${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2>REISTI お問い合わせ</h2>
          <p><strong>お名前 / 会社名：</strong> ${escapeHtml(name)}</p>
          <p><strong>メール：</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>電話：</strong> ${escapeHtml(phone)}</p>` : ''}
          <p><strong>ご用件：</strong></p>
          <pre style="white-space: pre-wrap;">${escapeHtml(message)}</pre>
        </div>
      `.trim(),
    });

    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message || 'send failed' });
  }
}

// 簡單的 XSS 安全處理
function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, s => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
  ));
}