import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../../lib/supabase';

interface NewsletterFormProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Save to database
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString(),
            source: window.location.pathname,
            is_active: true
          }
        ]);

      if (insertError) {
        // Check if it's a duplicate email error
        if (insertError.code === '23505') {
          setError('This email is already subscribed');
        } else {
          throw insertError;
        }
      } else {
        setSuccess(true);
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl ${className}`}>
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-green-900">Successfully subscribed!</p>
          <p className="text-sm text-green-700">Thank you for joining our newsletter.</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
            disabled={loading}
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading}
          className="whitespace-nowrap"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              required
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
              {error}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={loading}
          className="whitespace-nowrap"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      <p className="text-sm text-white/80 mt-3">
        Join our newsletter for weekly health tips, recipes, and exclusive offers.
      </p>
    </div>
  );
};

export default NewsletterForm;
