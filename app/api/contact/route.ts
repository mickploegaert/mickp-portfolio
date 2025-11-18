import { NextRequest, NextResponse } from 'next/server';

// Simple form validation
function validateForm(name: string, email: string, message: string) {
  if (!name || !email || !message) {
    return { valid: false, error: 'Please fill in all fields' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email' };
  }
  
  if (name.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (message.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }
  
  return { valid: true };
}

// Save submission to file
async function saveToFile(name: string, email: string, message: string) {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const submissionsDir = path.join(process.cwd(), 'submissions');
    await fs.mkdir(submissionsDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `submission-${timestamp}.json`;
    const filepath = path.join(submissionsDir, filename);
    
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      userAgent: 'Portfolio Contact Form',
      status: 'received'
    };
    
    await fs.writeFile(filepath, JSON.stringify(submissionData, null, 2));
    console.log(`📁 Submission saved: ${filename}`);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Failed to save submission:', error);
    return { success: false, error: 'Failed to save to file' };
  }
}

// Send email with Resend (direct to Outlook)
async function sendEmailWithResend(name: string, email: string, message: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log('ℹ️ Resend API key not configured, falling back to Formspree');
    return { success: false, reason: 'API key not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'portfolio@mickp.dev', // Vervang met je verified domain
        to: [process.env.CONTACT_EMAIL || '243338@student.scalda.nl'], // Direct naar Outlook!
        subject: `Portfolio Contact: ${name}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
              Nieuw bericht van portfolio contactformulier
            </h2>
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="font-weight: bold; width: 100px;">Naam:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; width: 100px;">Email:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; width: 100px; vertical-align: top;">Bericht:</td>
                <td>${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #000; margin: 20px 0;">
              <strong>Bericht:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Verstuurd op: ${new Date().toLocaleString('nl-NL')}<br>
              From: Mick Ploegaert Portfolio
            </p>
          </div>
        `,
      }),
    });

    if (response.ok) {
      console.log('✅ Email sent successfully to Outlook via Resend');
      return { success: true };
    } else {
      const error = await response.text();
      console.error('❌ Resend API error:', error);
      return { success: false, reason: error };
    }
  } catch (error) {
    console.error('❌ Resend email sending failed:', error);
    return { success: false, reason: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send via Formspree (fallback)
async function sendFormspree(name: string, email: string, message: string) {
  const formspreeUrl = process.env.EMAIL_TO;
  
  if (!formspreeUrl) {
    console.log('ℹ️ Formspree URL not configured');
    return { success: false, reason: 'Formspree URL not configured' };
  }

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: `Portfolio Contact: ${name}`,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Formspree submission successful:', result);
      return { success: true };
    } else {
      const error = await response.text();
      console.error('❌ Formspree error:', error);
      return { success: false, reason: error };
    }
  } catch (error) {
    console.error('❌ Formspree submission failed:', error);
    return { success: false, reason: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Log to console
function logSubmission(name: string, email: string, message: string) {
  const timestamp = new Date().toISOString();
  const separator = '='.repeat(50);
  
  console.log('\n' + separator);
  console.log('📨 NEW CONTACT FORM SUBMISSION');
  console.log(separator);
  console.log(`📅 Timestamp: ${timestamp}`);
  console.log(`👤 Name: ${name}`);
  console.log(`📧 Email: ${email}`);
  console.log(`💬 Message: ${message}`);
  console.log(separator + '\n');
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();
    
    console.log('📨 Processing contact form submission:', { 
      name: name.trim(), 
      email: email.trim() 
    });
    
    // Verify reCAPTCHA v2 token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed - no token provided' },
        { status: 400 }
      );
    }

    console.log('🔐 Verifying reCAPTCHA token:', recaptchaToken.substring(0, 20) + '...');

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const recaptchaResult = await recaptchaResponse.json();
    console.log('🔍 reCAPTCHA verification result:', recaptchaResult);

    if (!recaptchaResult.success) {
      console.log('❌ reCAPTCHA verification failed:', recaptchaResult['error-codes']);
      return NextResponse.json(
        { error: `reCAPTCHA verification failed: ${recaptchaResult['error-codes']?.join(', ') || 'Unknown error'}` },
        { status: 400 }
      );
    }

    console.log('✅ reCAPTCHA verification passed');
    
    // Validate form data
    const validation = validateForm(name, email, message);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // Method 1: Save to file
    const saveResult = await saveToFile(name, email, message);
    
    // Method 2: Log to console
    logSubmission(name, email, message);
    
    // Method 3: Try Resend first (direct to Outlook)
    let emailResult = await sendEmailWithResend(name, email, message);
    
    // Method 4: Fallback to Formspree
    if (!emailResult.success) {
      console.log('🔄 Falling back to Formspree...');
      emailResult = await sendFormspree(name, email, message);
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: saveResult.success 
        ? 'Message received successfully! Saved locally and email notification sent.'
        : 'Message received! Check console for details.',
      savedToFile: saveResult.success,
      filename: saveResult.success ? saveResult.filename : null,
      emailSent: emailResult.success,
      emailService: process.env.RESEND_API_KEY ? 'Resend (direct to Outlook)' : 'Formspree',
      emailError: emailResult.success ? null : emailResult.reason,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process your message',
        message: 'Please try again or use the contact form again',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}