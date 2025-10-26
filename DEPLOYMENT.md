# MitthuuG Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Supabase Production Setup](#supabase-production-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Netlify Deployment](#netlify-deployment)
5. [Domain & SSL Setup](#domain--ssl-setup)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] All TODO comments resolved
- [ ] Code reviewed and tested

### ✅ Environment Setup
- [ ] All environment variables documented
- [ ] `.env.example` file updated
- [ ] Production Supabase project created
- [ ] Database migrations run successfully
- [ ] Products and content uploaded

### ✅ Testing
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Cart functionality tested
- [ ] Checkout process completed successfully
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Accessibility audit passed (Lighthouse)

### ✅ Performance
- [ ] Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Images optimized (WebP format, compressed)
- [ ] Code splitting implemented
- [ ] Lazy loading configured
- [ ] Bundle size optimized

### ✅ SEO
- [ ] Meta tags on all pages
- [ ] Open Graph tags configured
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Structured data (JSON-LD) added

### ✅ Security
- [ ] Supabase RLS policies enabled
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] CORS properly configured

---

## Supabase Production Setup

### 1. Create Production Project

```bash
# Go to https://supabase.com/dashboard
# Click "New Project"
# Choose organization: MitthuuG
# Project name: mitthuug-production
# Database password: Generate strong password (save securely!)
# Region: Choose closest to your users (e.g., ap-south-1 for India)
```

### 2. Configure Database

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to production project
supabase link --project-ref your-production-project-ref

# Run migrations
supabase db push

# Verify tables created
# Go to Supabase Dashboard → Table Editor
```

### 3. Enable Row Level Security (RLS)

```sql
-- In Supabase SQL Editor

-- Products: Public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true);

-- Orders: Users can only see their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Wishlists: Users can only manage their own wishlist
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own wishlist"
  ON wishlists FOR ALL
  USING (auth.uid() = user_id);

-- Reviews: Public read, authenticated write
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 4. Configure Storage

```bash
# Create storage buckets in Supabase Dashboard → Storage

# Bucket: product-images
# Public: Yes
# Allowed file types: image/jpeg, image/png, image/webp
# Max file size: 5MB

# Bucket: blog-images
# Public: Yes
# Allowed file types: image/jpeg, image/png, image/webp
# Max file size: 3MB
```

### 5. Upload Initial Data

```sql
-- Insert products (use Supabase Table Editor or SQL)
-- Example:
INSERT INTO products (name, slug, description, price, category, image_url, stock, is_featured, is_active)
VALUES 
  ('Classic Gud Bites', 'classic-gud-bites', 'Traditional jaggery-based snacks...', 149, 'Classic Collection', '/products/classic.jpg', 50, true, true),
  -- Add more products...
```

---

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Configure Project

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "regions": ["bom1"],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 4. Deploy

```bash
# Preview deployment (staging)
vercel

# Production deployment
vercel --prod
```

### 5. Configure Environment Variables

```bash
# Add via Vercel Dashboard or CLI
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_GA_MEASUREMENT_ID production
vercel env add VITE_STRIPE_PUBLIC_KEY production
# ... add all other env vars
```

### 6. Custom Domain

```bash
# Add domain in Vercel Dashboard
# Settings → Domains → Add Domain
# Enter: mitthuug.com
# Follow DNS configuration instructions

# Add www subdomain
# Add: www.mitthuug.com
# Configure redirect: www → apex domain
```

---

## Netlify Deployment

### 1. Create `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2. Deploy via Git

```bash
# Connect repository to Netlify
# Go to https://app.netlify.com
# Click "Add new site" → "Import an existing project"
# Choose your Git provider (GitHub, GitLab, Bitbucket)
# Select repository: mitthuug
# Configure build settings:
#   Build command: npm run build
#   Publish directory: dist
```

### 3. Configure Environment Variables

```bash
# In Netlify Dashboard
# Site settings → Build & deploy → Environment
# Add all variables from .env.example
```

### 4. Custom Domain

```bash
# In Netlify Dashboard
# Domain settings → Add custom domain
# Enter: mitthuug.com
# Configure DNS (see below)
```

---

## Domain & SSL Setup

### 1. DNS Configuration

#### For Vercel:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

#### For Netlify:
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

### 2. SSL Certificate

Both Vercel and Netlify provide automatic SSL via Let's Encrypt.

**Verify SSL:**
- Check https:// works
- No mixed content warnings
- SSL Labs score: A+

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Test all critical paths
- Homepage loads
- Shop page with products
- Product detail page
- Add to cart
- Checkout flow
- User authentication
- Account dashboard

# Check mobile responsiveness
# Test on different devices and browsers
```

### 2. Configure Analytics

```javascript
// Google Analytics 4
// Verify tracking in GA4 Real-time reports

// Meta Pixel
// Use Facebook Pixel Helper Chrome extension
// Verify events: PageView, AddToCart, InitiateCheckout, Purchase
```

### 3. Set up Monitoring

#### Sentry (Error Tracking)

```bash
npm install @sentry/react

# In src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

#### Vercel Analytics

```bash
npm install @vercel/analytics

# In src/main.tsx
import { Analytics } from '@vercel/analytics/react';

// Add to App component
<Analytics />
```

### 4. Performance Monitoring

```bash
# Use Lighthouse CI for continuous monitoring
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://mitthuug.com
```

### 5. Set up Backups

```bash
# Supabase automatic backups
# Dashboard → Database → Backups
# Enable daily backups
# Retention: 30 days
```

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Uptime (99.9% target)
- [ ] Error rate (< 0.1%)
- [ ] Checkout conversion rate
- [ ] Page load times (< 3s)

### Weekly Tasks
- [ ] Review analytics reports
- [ ] Check for security updates
- [ ] Monitor database performance
- [ ] Review user feedback

### Monthly Tasks
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content updates
- [ ] Backup verification

### Tools & Dashboards

**Uptime Monitoring:**
- UptimeRobot (free tier)
- Pingdom
- StatusCake

**Analytics:**
- Google Analytics 4
- Vercel Analytics
- Supabase Dashboard

**Error Tracking:**
- Sentry
- LogRocket (session replay)

**Performance:**
- Google PageSpeed Insights
- WebPageTest
- Lighthouse CI

---

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Netlify
```bash
# In Netlify Dashboard
# Deploys → Find working deployment → "Publish deploy"
```

### Database Rollback
```bash
# Supabase Dashboard → Database → Backups
# Select backup → Restore
```

---

## Emergency Contacts

- **DevOps Lead**: dev@mitthuug.com
- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **Domain Registrar**: [Your registrar support]

---

## Troubleshooting

### Deployment Fails
```bash
# Check build logs
# Verify all dependencies installed
# Ensure environment variables set correctly
# Clear build cache and retry
```

### 404 Errors on Refresh
```bash
# Add rewrite rules (see Vercel/Netlify configs above)
# For React Router, all routes should point to index.html
```

### Slow Loading
```bash
# Run Lighthouse audit
# Check image optimization
# Verify CDN configuration
# Review bundle size
```

### Database Connection Issues
```bash
# Verify Supabase URL and anon key
# Check network connectivity
# Review RLS policies
# Check Supabase service status
```

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Version**: _____________  
**Notes**: _____________
