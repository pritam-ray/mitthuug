# MitthuuG Ecommerce Site — Complete Build Plan
## Bolt/React Implementation Guide

---

## 🎯 PROJECT OVERVIEW

**Platform:** React + Vite + TypeScript (current stack)  
**Target:** Production-ready premium food ecommerce  
**Performance Goal:** LCP ≤2.5s mobile, SEO ≥90, WCAG AA compliance  
**Launch Timeline:** 30 days (staging), 45 days (production)

---

## 📋 BUILD PHASES & TASK BREAKDOWN

### **PHASE 1: Foundation & Design System** (Days 1-5)

#### Task 1.1: Design System Setup
- [ ] Install and configure Tailwind CSS extensions
- [ ] Create color palette CSS variables
- [ ] Set up typography system (Playfair Display + Inter)
- [ ] Create icon component library
- [ ] Build spacing and layout tokens
- [ ] Create responsive breakpoint system

**Files to Create:**
- `src/styles/design-tokens.css`
- `src/styles/typography.css`
- `src/components/ui/Icon.tsx`
- `tailwind.config.extended.js`

#### Task 1.2: Core Component Library
- [ ] Button component (primary, secondary, ghost variants)
- [ ] Input/Form components (text, select, checkbox, radio)
- [ ] Card component (product, review, blog)
- [ ] Modal/Dialog component
- [ ] Toast/Notification system
- [ ] Loading states (skeleton, spinner)
- [ ] Badge/Label components

**Files to Create:**
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Toast.tsx`
- `src/components/ui/Badge.tsx`

#### Task 1.3: Layout Components
- [ ] Header/Navigation (desktop + mobile)
- [ ] Footer
- [ ] Sidebar
- [ ] Container/Grid system
- [ ] Breadcrumbs

**Files to Create:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Breadcrumbs.tsx`

---

### **PHASE 2: Product & Cart Functionality** (Days 6-12)

#### Task 2.1: Product Components
- [ ] ProductCard (grid view)
- [ ] ProductGrid with filters
- [ ] ProductGallery (with zoom)
- [ ] ProductDetails
- [ ] QuickView modal
- [ ] Variant selector
- [ ] Nutrition/Ingredients tabs
- [ ] Reviews display
- [ ] Cross-sell/Upsell section

**Files to Create:**
- `src/components/product/ProductCard.tsx`
- `src/components/product/ProductGrid.tsx`
- `src/components/product/ProductGallery.tsx`
- `src/components/product/ProductDetails.tsx`
- `src/components/product/QuickView.tsx`
- `src/components/product/NutritionTabs.tsx`
- `src/components/product/Reviews.tsx`

#### Task 2.2: Shopping Cart
- [ ] Cart context/state management
- [ ] Cart drawer/modal
- [ ] Cart page
- [ ] Line item editing
- [ ] Coupon application
- [ ] Shipping estimator
- [ ] Cart totals calculator
- [ ] Gift wrap option toggle

**Files to Create:**
- `src/contexts/CartContext.tsx` (already exists - enhance)
- `src/components/cart/CartDrawer.tsx`
- `src/components/cart/CartPage.tsx`
- `src/components/cart/LineItem.tsx`
- `src/components/cart/CouponForm.tsx`
- `src/components/cart/ShippingEstimator.tsx`

#### Task 2.3: Checkout Flow
- [ ] Checkout page (single-page)
- [ ] Address form with validation
- [ ] Pincode verification
- [ ] Shipping method selector
- [ ] Payment gateway integration prep
- [ ] Order summary
- [ ] Guest checkout flow

**Files to Create:**
- `src/pages/Checkout.tsx`
- `src/components/checkout/AddressForm.tsx`
- `src/components/checkout/ShippingOptions.tsx`
- `src/components/checkout/PaymentMethods.tsx`
- `src/components/checkout/OrderSummary.tsx`

---

### **PHASE 3: Pages & Content** (Days 13-18)

#### Task 3.1: Core Pages
- [ ] Homepage (hero, USPs, featured, testimonials)
- [ ] Shop/Category page
- [ ] Product detail page
- [ ] About page
- [ ] FAQ page
- [ ] Contact page
- [ ] Blog listing page
- [ ] Blog post template
- [ ] 404 page
- [ ] Maintenance page

**Files to Create:**
- `src/pages/Home.tsx`
- `src/pages/Shop.tsx`
- `src/pages/ProductDetail.tsx`
- `src/pages/About.tsx`
- `src/pages/FAQ.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/NotFound.tsx`

#### Task 3.2: Account/Dashboard
- [ ] Login/Register modal
- [ ] Account dashboard
- [ ] Order history
- [ ] Order details view
- [ ] Address book
- [ ] Subscription management
- [ ] Profile settings

**Files to Create:**
- `src/pages/Account.tsx`
- `src/components/account/OrderHistory.tsx`
- `src/components/account/OrderDetails.tsx`
- `src/components/account/AddressBook.tsx`
- `src/components/account/Subscriptions.tsx`

---

### **PHASE 4: Integrations** (Days 19-25)

#### Task 4.1: Payment Gateways
- [ ] Stripe integration (cards)
- [ ] Razorpay integration (UPI, wallets, cards)
- [ ] COD option
- [ ] Payment webhooks
- [ ] Order confirmation flow

**Files to Create:**
- `src/lib/payments/stripe.ts`
- `src/lib/payments/razorpay.ts`
- `src/components/checkout/StripePayment.tsx`
- `src/components/checkout/RazorpayPayment.tsx`

#### Task 4.2: Email & Marketing
- [ ] Klaviyo/Mailchimp integration
- [ ] Newsletter signup component
- [ ] Email capture modal (exit intent)
- [ ] Welcome email trigger
- [ ] Order confirmation email
- [ ] Review request email

**Files to Create:**
- `src/lib/email/klaviyo.ts`
- `src/components/marketing/NewsletterSignup.tsx`
- `src/components/marketing/ExitIntentModal.tsx`

#### Task 4.3: Analytics & Tracking
- [ ] Google Analytics 4 setup
- [ ] Google Tag Manager
- [ ] Meta Pixel
- [ ] Event tracking (pageview, add-to-cart, purchase)
- [ ] Enhanced ecommerce tracking
- [ ] Conversion API (server-side)

**Files to Create:**
- `src/lib/analytics/ga4.ts`
- `src/lib/analytics/gtm.ts`
- `src/lib/analytics/metaPixel.ts`
- `src/lib/analytics/events.ts`

#### Task 4.4: Reviews & UGC
- [ ] Reviews API integration (Yotpo/Stamped)
- [ ] Review submission form
- [ ] Review display component
- [ ] Rating aggregation
- [ ] Image upload handling

**Files to Create:**
- `src/lib/reviews/yotpo.ts`
- `src/components/reviews/ReviewForm.tsx`
- `src/components/reviews/ReviewList.tsx`
- `src/components/reviews/RatingStars.tsx`

---

### **PHASE 5: SEO & Performance** (Days 26-30)

#### Task 5.1: SEO Implementation
- [ ] React Helmet for meta tags
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] JSON-LD structured data
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Image optimization (WebP)

**Files to Create:**
- `src/components/seo/SEOHead.tsx`
- `src/lib/seo/structuredData.ts`
- `public/robots.txt`
- `scripts/generate-sitemap.ts`

#### Task 5.2: Performance Optimization
- [ ] Lazy loading implementation
- [ ] Image CDN setup (Cloudinary/imgix)
- [ ] Code splitting
- [ ] Critical CSS extraction
- [ ] Service Worker/PWA setup
- [ ] Compression (Brotli/GZIP)
- [ ] Cache headers configuration

**Files to Create:**
- `src/lib/imageOptimization.ts`
- `vite.config.ts` (performance plugins)
- `public/service-worker.js`

#### Task 5.3: Accessibility
- [ ] ARIA labels audit
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Color contrast fixes
- [ ] Screen reader testing
- [ ] Skip links

---

### **PHASE 6: Testing & Deployment** (Days 31-40)

#### Task 6.1: Automated Testing
- [ ] Playwright setup
- [ ] E2E test: Add to cart flow
- [ ] E2E test: Checkout flow (test mode)
- [ ] E2E test: Subscription purchase
- [ ] E2E test: Account registration
- [ ] Visual regression tests
- [ ] Accessibility tests (axe)

**Files to Create:**
- `tests/e2e/cart.spec.ts`
- `tests/e2e/checkout.spec.ts`
- `tests/e2e/subscription.spec.ts`
- `tests/e2e/auth.spec.ts`
- `playwright.config.ts`

#### Task 6.2: Manual Testing Checklist
- [ ] Mobile UX (360px, 768px viewports)
- [ ] Desktop UX (1024px, 1440px)
- [ ] Cross-browser (Chrome, Safari, Firefox)
- [ ] Payment flows (all gateways)
- [ ] Analytics events verification
- [ ] SEO validation (Lighthouse)
- [ ] Performance audit (PageSpeed)

#### Task 6.3: Deployment Setup
- [ ] Production environment variables
- [ ] CDN configuration (Cloudflare/Vercel)
- [ ] SSL/HTTPS enforcement
- [ ] HSTS headers
- [ ] Error logging (Sentry)
- [ ] Uptime monitoring
- [ ] Backup strategy

**Files to Create:**
- `.env.example`
- `.env.production`
- `deploy.sh`
- `DEPLOYMENT.md`

---

### **PHASE 7: Launch & Optimization** (Days 41-45)

#### Task 7.1: Pre-Launch Checklist
- [ ] Content audit (all copy from Claude)
- [ ] Image optimization verification
- [ ] Legal pages (Privacy, T&C, FSSAI)
- [ ] Cookie banner setup
- [ ] Analytics verification
- [ ] Payment gateway live mode
- [ ] Email templates tested
- [ ] Backup & rollback plan

#### Task 7.2: CRO Elements
- [ ] Exit intent modal (10% off)
- [ ] Social proof ticker
- [ ] Low stock indicators
- [ ] Urgency banners (countdown)
- [ ] Sticky footer CTA (blog pages)
- [ ] Bundle discount badges
- [ ] Free shipping threshold progress bar

**Files to Create:**
- `src/components/cro/ExitIntentModal.tsx`
- `src/components/cro/SocialProofTicker.tsx`
- `src/components/cro/UrgencyBanner.tsx`
- `src/components/cro/FreeShippingBar.tsx`

#### Task 7.3: Monitoring & Reporting
- [ ] GA4 dashboard setup
- [ ] KPI tracking sheet template
- [ ] Weekly analytics report
- [ ] Performance monitoring alerts
- [ ] Error rate monitoring
- [ ] Conversion funnel analysis

---

## 🛠️ TECHNICAL STACK

### Frontend
- **Framework:** React 18.3 + TypeScript
- **Build Tool:** Vite 5.4
- **Styling:** Tailwind CSS 3.4
- **State Management:** Context API + React Query
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion

### Backend/Services
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage / Cloudinary
- **Payments:** Stripe + Razorpay
- **Email:** Klaviyo
- **Analytics:** GA4 + GTM + Meta Pixel
- **Reviews:** Yotpo/Stamped.io
- **Search:** Algolia (optional) or custom

### DevOps
- **Hosting:** Vercel / Netlify
- **CDN:** Cloudflare / Vercel CDN
- **Monitoring:** Sentry + UptimeRobot
- **CI/CD:** GitHub Actions
- **Testing:** Playwright + Vitest

---

## 📊 PERFORMANCE TARGETS

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Mobile) | ≤2.5s | PageSpeed Insights |
| TTFB | <500ms | WebPageTest |
| CLS | <0.1 | Lighthouse |
| FID | <100ms | Lighthouse |
| SEO Score | ≥90 | Lighthouse |
| Accessibility | ≥90 (WCAG AA) | axe DevTools |
| Bundle Size | <300KB (gzipped) | Webpack Bundle Analyzer |

---

## 🔐 SECURITY & COMPLIANCE

- [ ] HTTPS enforcement (HSTS)
- [ ] PCI DSS compliance (tokenized payments)
- [ ] Cookie consent banner (Indian privacy norms)
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] SQL injection prevention (Supabase RLS)
- [ ] Rate limiting on APIs
- [ ] Environment variable security

---

## 📈 KPIs TO TRACK (First 90 Days)

| KPI | Target | Measurement |
|-----|--------|-------------|
| Conversion Rate | 2-4% | GA4 |
| Average Order Value | ₹400-600 | GA4 |
| Cart Abandonment | <70% | GA4 |
| Email Capture Rate | >15% | Klaviyo |
| Repeat Purchase Rate | >20% | Supabase |
| Customer Acquisition Cost | <₹300 | Ad platforms |
| Page Load Time | <2.5s | PageSpeed |
| Mobile Traffic | >60% | GA4 |

---

## 🧪 A/B TEST ROADMAP (First 90 Days)

### Week 1-2: Hero Testing
- **Test:** Hero headline variants (tradition vs. health)
- **Traffic Split:** 50/50
- **Primary Metric:** CTR to shop page
- **Tool:** Google Optimize / VWO

### Week 3-4: CTA Testing
- **Test:** "Shop Now" vs. "Try Our Sampler"
- **Traffic Split:** 50/50
- **Primary Metric:** Conversion rate
- **Tool:** Google Optimize

### Week 5-8: Product Page Layout
- **Test:** Gallery vs. Lifestyle images first
- **Traffic Split:** 50/50
- **Primary Metric:** Add-to-cart rate
- **Tool:** VWO

### Week 9-12: Pricing & Discounts
- **Test:** Subscription discount vs. First-order discount
- **Traffic Split:** 50/50
- **Primary Metric:** AOV + repeat rate
- **Tool:** Custom implementation

---

## 📦 DELIVERABLES CHECKLIST

- [ ] 8 page templates (Home, Shop, Product, Cart, Checkout, Account, Blog, FAQ)
- [ ] 40+ reusable components
- [ ] Product import JSON (5 SKUs)
- [ ] Environment variables guide
- [ ] README with build steps
- [ ] Testing checklist
- [ ] Playwright test suite
- [ ] Deployment scripts
- [ ] Analytics setup guide
- [ ] Performance optimization report
- [ ] Accessibility audit report
- [ ] SEO audit report

---

## 🚀 NEXT STEPS

1. Review this build plan with stakeholders
2. Prepare all image assets (hero, products, lifestyle)
3. Set up development environment
4. Begin Phase 1: Design System
5. Daily standups to track progress
6. Weekly sprint reviews

---

**Estimated Total Development Time:** 40-45 days  
**Team Size:** 2-3 developers + 1 designer + 1 QA  
**Budget Estimate:** ₹3-5 lakhs (including integrations)

---

*This build plan is comprehensive and production-ready. Execute phases sequentially for best results.*
