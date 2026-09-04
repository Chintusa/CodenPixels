import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Anti-spam honeypot check
    if (data.botcheck || data.website_hp) {
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    const {
      name,
      email,
      company = 'Not provided',
      projectType = 'Website & Web Application Development',
      currency = 'INR',
      budget = 'Not specified',
      estimated_screens = 'N/A',
      estimated_complexity = 'Standard',
      estimated_hours = 'N/A',
      estimated_price = 'N/A',
      estimated_delivery = 'N/A',
      message
    } = data;

    // Validate essential inputs
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Project description message is required.' });
    }

    // Read SMTP settings from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL || 'codenpixel.2022@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.NOTIFICATION_EMAIL || smtpUser || 'codenpixel.2022@gmail.com';
    const senderName = process.env.SMTP_FROM_NAME || 'CodeNPixels Client Portal';

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP Configuration incomplete in Vercel environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS).');
      return res.status(500).json({
        success: false,
        error: 'SMTP configuration is missing in Vercel Environment Variables. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in your Vercel Project Settings.'
      });
    }

    const cleanPass = (smtpPass || '').replace(/\s+/g, '');

    // Create Nodemailer Transporter
    const transportConfig = smtpHost.includes('gmail')
      ? {
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: cleanPass
          }
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: smtpUser,
            pass: cleanPass
          },
          tls: {
            rejectUnauthorized: false
          }
        };

    const transporter = nodemailer.createTransport(transportConfig);

    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // Email notification to Admin/Engineering Team
    const adminHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #93c5fd; }
    .content { padding: 32px; }
    .badge { display: inline-block; padding: 4px 10px; background: #eff6ff; color: #2563eb; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .meta-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
    .meta-table td.label { font-weight: 700; color: #64748b; width: 38%; }
    .meta-table td.val { color: #0f172a; font-weight: 600; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 18px 20px; border-radius: 8px; margin-top: 16px; }
    .message-box h3 { margin: 0 0 8px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .message-box p { margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b; }
    .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Client Project Enquiry</h1>
      <p>CodeNPixels Digital Engineering Lead Intake</p>
    </div>
    <div class="content">
      <span class="badge">${projectType}</span>
      <table class="meta-table">
        <tr><td class="label">Client Name:</td><td class="val">${name}</td></tr>
        <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td></tr>
        <tr><td class="label">Company / Brand:</td><td class="val">${company}</td></tr>
        <tr><td class="label">Service Required:</td><td class="val">${projectType}</td></tr>
        <tr><td class="label">Currency Tier:</td><td class="val">${currency}</td></tr>
        <tr><td class="label">Client Budget:</td><td class="val" style="color: #16a34a;">${budget}</td></tr>
        <tr><td class="label">Estimated Scope:</td><td class="val">${estimated_screens} modules (${estimated_complexity})</td></tr>
        <tr><td class="label">Scope / Starting Price:</td><td class="val">${estimated_hours} &bull; ${estimated_price}</td></tr>
        <tr><td class="label">Estimated Turnaround:</td><td class="val">${estimated_delivery}</td></tr>
        <tr><td class="label">Submission Time:</td><td class="val">${submissionTime} (IST)</td></tr>
      </table>

      <div class="message-box">
        <h3>Project Description & Requirements</h3>
        <p>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
    </div>
    <div class="footer">
      This notification was generated automatically by CodeNPixels Serverless Gateway (https://codenpixels.in).
    </div>
  </div>
</body>
</html>
`;

    // Send Admin Notification
    const adminMailOptions = {
      from: `"${senderName}" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `🎯 New Project Enquiry: ${name} (${projectType}) [${currency}]`,
      text: `New Enquiry from ${name} (${email})\nCompany: ${company}\nService: ${projectType}\nBudget: ${budget}\nEstimated Price: ${estimated_price}\n\nMessage:\n${message}`,
      html: adminHtmlContent
    };

    await transporter.sendMail(adminMailOptions);

    // Optional Auto-Reply to client
    const sendAutoReply = process.env.SMTP_SEND_AUTOREPLY !== 'false';
    if (sendAutoReply) {
      try {
        const clientAutoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0f172a; color: #ffffff; padding: 28px 32px; text-align: center; }
    .content { padding: 32px; font-size: 15px; line-height: 1.6; color: #334155; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 16px; }
    .footer { padding: 20px; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin:0; font-size: 20px;">CodeNPixels &bull; Digital Engineering</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #93c5fd;">Consultation Request Confirmed</p>
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for reaching out to <strong>CodeNPixels</strong> regarding your project (<em>${projectType}</em>).</p>
      <p>Our engineering lead is reviewing your requirements and specifications. We will get back to you with a structured proposal and milestone roadmap within <strong>12 to 24 hours</strong>.</p>
      <p>If you have additional design assets, references, or wireframes to share in the meantime, feel free to reply directly to this email.</p>
      <p style="margin-top: 24px;">Best regards,<br><strong>The CodeNPixels Engineering Team</strong><br><a href="https://codenpixels.in" style="color: #2563eb; text-decoration: none;">https://codenpixels.in</a></p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CodeNPixels. High-performance web development & digital engineering.
    </div>
  </div>
</body>
</html>
`;
        await transporter.sendMail({
          from: `"${senderName}" <${smtpUser}>`,
          to: email,
          subject: `We've received your project request — CodeNPixels`,
          html: clientAutoReplyHtml
        });
      } catch (autoReplyErr) {
        console.warn('Auto-reply failed (non-critical):', autoReplyErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your project consultation request has been delivered successfully via SMTP!'
    });

  } catch (error) {
    console.error('❌ Vercel Serverless Function SMTP Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred while sending the email through SMTP.'
    });
  }
}
