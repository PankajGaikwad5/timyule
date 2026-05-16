import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  validateName,
  validateEmail,
  validateMessage,
  checkRateLimit,
} from '../../utils/spamDetection';

export async function POST(req) {
  const { name, email, phone, type, size, budget, message, honeypot, timestamp } =
    await req.json();

  // 1. Honeypot
  if (honeypot) {
    return NextResponse.json({ error: 'Submission rejected' }, { status: 400 });
  }

  // 2. Timing check
  if (timestamp && Date.now() - timestamp < 3000) {
    return NextResponse.json(
      { error: 'Please take your time filling out the form' },
      { status: 400 },
    );
  }

  // 3. Rate limit by IP — 3 per hour
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const rateLimit = checkRateLimit(ip, 3, 3600000);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: rateLimit.reason }, { status: 429 });
  }

  // 4. Validate name
  const nameCheck = validateName(name);
  if (!nameCheck.valid) {
    return NextResponse.json({ error: 'Please provide a valid name' }, { status: 400 });
  }

  // 5. Validate email
  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) {
    return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
  }

  // 6. Validate message
  const msgCheck = validateMessage(message);
  if (!msgCheck.valid) {
    return NextResponse.json({ error: 'Please describe your vision in a bit more detail' }, { status: 400 });
  }

  // Geo lookup
  let locationText = '';
  try {
    let fetchUrl = 'http://ip-api.com/json/';
    if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
      fetchUrl = `http://ip-api.com/json/${ip.split(',')[0].trim()}`;
    }
    const geoRes = await fetch(fetchUrl);
    if (geoRes.ok) {
      const geo = await geoRes.json();
      if (geo.status === 'success') {
        locationText = `\nLocation: ${geo.city}, ${geo.regionName}, ${geo.country}`;
      }
    }
  } catch { /* non-critical */ }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const body = [
    `Commission Enquiry — Tim Yule`,
    `${'='.repeat(36)}`,
    ``,
    `Contact`,
    `-`.repeat(20),
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || 'Not provided'}`,
    ``,
    `Commission Details`,
    `-`.repeat(20),
    `Type:    ${type || 'Not specified'}`,
    `Size:    ${size || 'Not specified'}`,
    `Budget:  ${budget || 'Not specified'}`,
    ``,
    `Vision`,
    `-`.repeat(20),
    message,
    locationText,
  ].join('\n');

  const mailOptions = {
    from: `Tim Yule Commission Form <${process.env.EMAIL}>`,
    to: `${process.env.REMAIL}, ${process.env.SECONDEMAIL}`,
    replyTo: email,
    subject: `Commission Enquiry — ${name} (${type || 'General'})`,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ msg: 'Enquiry sent successfully!' }, { status: 200 });
  } catch (err) {
    console.error('Commission email error:', err);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
