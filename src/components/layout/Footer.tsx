import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1500);
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'Classic Gud Bites', href: '/shop/classic' },
      { label: 'Cardamom Gud Bites', href: '/shop/cardamom' },
      { label: 'Almond Gud Bites', href: '/shop/almond' },
      { label: 'Gift Boxes', href: '/shop/gifts' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Blog', href: '/blog' },
      { label: 'Recipes', href: '/recipes' },
      { label: 'Contact', href: '/contact' },
    ],
    support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Delivery', href: '/shipping' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Bulk Orders', href: '/bulk-orders' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/mitthuug', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/mitthuug', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@mitthuug.com', label: 'Email' },
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              Join the MitthuuG Family
            </h3>
            <p className="text-white/90 mb-6">
              Get exclusive recipes, health tips, and special offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                isLoading={subscribeStatus === 'loading'}
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              >
                <Send className="w-4 h-4 mr-2" />
                {subscribeStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="mt-3 text-sm text-white/90">
                ✓ Thank you for subscribing! Check your inbox for a welcome gift.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl font-bold text-white">MitthuuG</span>
            </Link>
            <p className="text-white/80 mb-6 max-w-md">
              Premium jaggery-based snacks crafted with tradition and care. 
              Pure ingredients, pure taste, pure nostalgia.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-white/80 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Heritage Lane, Mumbai, Maharashtra 400001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hello@mitthuug.com" className="hover:text-primary transition-colors">
                  hello@mitthuug.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} MitthuuG. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
