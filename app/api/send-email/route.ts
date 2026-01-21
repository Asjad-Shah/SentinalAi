import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Check if email credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD === 'your_app_password_here') {
        // Fallback: Log to console (Simulation Mode)
        console.log('---------------------------------------------------');
        console.log('⚠️  EMAIL NOT CONFIGURED - SIMULATION MODE ⚠️');
        console.log(`To: aireallytics@gmail.com`);
        console.log(`Subject: New Demo Request`);
        console.log(`Content: Client Email: ${email}`);
        console.log('---------------------------------------------------');
        
        // Return success so the UI shows the "Request Sent" message
        return NextResponse.json({ 
            message: 'Demo request received (Simulation)', 
            simulated: true 
        }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'aireallytics@gmail.com',
      subject: 'New Demo Request',
      text: `A new demo request has been received from: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1E88E5;">New Demo Request</h2>
          <p>A client has requested a demo.</p>
          <p><strong>Client Email:</strong> ${email}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This email was sent from your website's demo request form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
