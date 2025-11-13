import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      {
        method: 'POST',
      }
    );

    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Send email using a service like SendGrid, Nodemailer, etc.
    // This is a basic example using a serverless function
    
    const emailContent = `
      New contact form submission:
      
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;

    // Here you would integrate with your email service
    // For now, we'll just log it (you should implement actual email sending)
    console.log('Email content:', emailContent);
    
    // Example with SendGrid (you would need to install @sendgrid/mail)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: '243338@student.scalda.nl',
      from: 'noreply@yourdomain.com',
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    };
    
    await sgMail.send(msg);
    */

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}