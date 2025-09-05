'use client';

import { useState } from 'react';

interface NewsletterSubscriptionProps {
  className?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  showBackground?: boolean;
}

export default function NewsletterSubscription({ 
  className = '', 
  showTitle = true, 
  showDescription = true,
  showBackground = true 
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous messages
    setMessage('');
    setMessageType('');

    // Validate email
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully subscribed!');
        setMessageType('success');
        setEmail(''); // Clear the form on success
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${showBackground ? 'bg-gradient-to-b from-purple-100 to-background dark:from-purple-900/30 dark:to-background/95 border-t border-border' : ''}`}>
      <div className={`max-w-7xl mx-auto w-full px-6 lg:px-0 py-16 ${className}`}>
      <div className="flex flex-col items-center text-center">
        {showTitle && (
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        )}
        {showDescription && (
          <p className="text-muted-foreground mb-6 max-w-lg">
            Stay updated with the latest insights on AI for parents and teachers. 
            No spam, just valuable content delivered to your inbox.
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-0">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 py-3 min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
      </div>
    </section>
  );
}