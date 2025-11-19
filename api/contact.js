// /api/contact.js  （Vercel Serverless Function）
import { Resend } from 'resend';

export default async function handler(req, res) {
  // 只允許 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // 解析 body
  let body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
  }

  const { name, email, phone, message, hp } = body;

  // 簡單驗證 + 蜜罐（機器人會填）
  if (hp) return res.status(200).json({ ok: true }); // 靜默成功，避免被打探
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email, message are required' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // ⚠️ 這個寄件人要用你在 Resend 驗證過的網域信箱
      from: process.env.MAIL_FROM || 'REISTI <noreply@reisti.org>',
      to: process.env.MAIL_TO || 'chenytbiz@reisti.org',
      replyTo: email, // ✅ 用 replyTo（駝峰），讓你回覆時直接回到填寫者
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
