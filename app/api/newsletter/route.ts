import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if required environment variables are set
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_AUDIENCE_ID) {
      console.error('Missing Mailchimp configuration');
      return NextResponse.json(
        { error: 'Newsletter service is not configured properly' },
        { status: 500 }
      );
    }

    try {
      // Add subscriber to Mailchimp audience
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
        email_address: normalizedEmail,
        status: 'subscribed',
        tags: ['blog-subscriber', 'website'],
      });

      return NextResponse.json(
        { 
          message: 'Successfully subscribed to our newsletter! Check your email for confirmation.',
          email: normalizedEmail
        },
        { status: 200 }
      );

    } catch (mailchimpError: any) {
      console.error('Mailchimp API error:', mailchimpError);
      
      // Handle specific Mailchimp errors
      if (mailchimpError.status === 400) {
        const errorDetail = mailchimpError.response?.body?.detail || '';
        
        if (errorDetail.includes('already a list member')) {
          return NextResponse.json(
            { message: 'You are already subscribed to our newsletter!' },
            { status: 200 }
          );
        }
        
        if (errorDetail.includes('invalid email')) {
          return NextResponse.json(
            { error: 'Please provide a valid email address' },
            { status: 400 }
          );
        }
      }
      
      // Generic error for other cases
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}