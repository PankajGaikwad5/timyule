import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateEmail, checkRateLimit } from '../../utils/spamDetection';

export async function POST(req) {
  const { email, honeypot, timestamp } = await req.json();

  // 1. Honeypot check
  if (honeypot) {
    console.log('Spam detected: Honeypot field filled');
    return NextResponse.json({ error: 'Submission rejected' }, { status: 400 });
  }

  // 2. Time-based check — must take at least 3 seconds
  if (timestamp) {
    const timeTaken = Date.now() - timestamp;
    if (timeTaken < 3000) {
      console.log('Spam detected: Form submitted too quickly');
      return NextResponse.json(
        { error: 'Please take your time filling out the form' },
        { status: 400 },
      );
    }
  }

  // 3. Rate limiting by IP
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const rateLimitCheck = checkRateLimit(ip, 3, 3600000); // 3 per hour

  if (!rateLimitCheck.allowed) {
    console.log('Spam detected: Rate limit exceeded for IP:', ip);
    return NextResponse.json({ error: rateLimitCheck.reason }, { status: 429 });
  }

  // 4. Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    console.log('Spam detected: Invalid email -', emailValidation.reason);
    return NextResponse.json(
      { error: 'Please provide a valid email address' },
      { status: 400 },
    );
  }

  // Geo lookup
  let locationText = '';
  try {
    let fetchUrl = 'http://ip-api.com/json/';
    if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
      const cleanIp = ip.split(',')[0].trim();
      fetchUrl = `http://ip-api.com/json/${cleanIp}`;
    }
    const geoRes = await fetch(fetchUrl);
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData.status === 'success') {
        locationText = `\nLocation: ${geoData.city}, ${geoData.regionName}`;
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `Tim Yule Newsletter <${process.env.EMAIL}>`,
    to: `${process.env.REMAIL}, ${process.env.SECONDEMAIL}`,
    subject: 'New Newsletter Subscription',
    text: `New newsletter subscription!\n\nEmail: ${email}${locationText}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ msg: 'Subscribed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
