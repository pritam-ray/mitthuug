# MitthuuG - Premium Jaggery-Based Snacks E-commerce Platform

A modern, responsive e-commerce website for MitthuuG, featuring premium Indian jaggery-based snacks. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Frontend
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Smooth Animations**: Framer Motion for delightful user experience
- **Complete E-commerce Flow**: Browse → Cart → Checkout → Order Tracking
- **User Authentication**: Secure login/signup with Supabase Auth
- **Product Management**: Categories, filters, search, reviews
- **User Dashboard**: Order history, wishlist, saved addresses
- **Blog System**: Content marketing with categories and search

### Backend (Supabase)
- **PostgreSQL Database**: Products, orders, reviews, wishlists
- **Authentication**: Email/password, social logins
- **Storage**: Product images and assets
- **Real-time Updates**: Live cart and order status
- **Row Level Security**: Secure data access

### Integrations (Ready)
- Payment Gateways (Stripe, Razorpay)
- Email Marketing (Klaviyo)
- Analytics (Google Analytics 4, Meta Pixel)
- SEO Optimization (Meta tags, structured data)

## 📦 Project Structure

```
mitthuug/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components (Button, Input, etc.)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── product/        # Product-specific components
│   │   ├── cart/           # Cart components
│   │   └── auth/           # Authentication components
│   ├── pages/              # Page components (8 pages)
│   │   ├── HomePage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── AccountPage.tsx
│   │   ├── FAQPage.tsx
│   │   └── BlogPage.tsx
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useReviews.ts
│   │   └── useWishlist.ts
│   ├── services/           # API services
│   │   └── api.ts
│   ├── lib/                # Utilities
│   │   ├── supabase.ts
│   │   ├── analytics.ts
│   │   └── database.types.ts
│   ├── styles/             # Global styles
│   │   ├── design-tokens.css
│   │   └── typography.css
│   ├── utils/              # Helper functions
│   │   └── mockData.ts
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── content/               # Marketing copy (11 files)
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd mitthuug

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics (optional for now)
VITE_GA_MEASUREMENT_ID=your_ga_id
VITE_META_PIXEL_ID=your_meta_pixel_id

# Payment (optional for now)
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### 3. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key to `.env.local`

2. **Run Database Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

3. **Seed Database** (optional)
   - Use the mock data in `src/utils/mockData.ts`
   - Or insert via Supabase dashboard

### 4. Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173
```

### 5. Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: `#C6862E` (Ochre - represents jaggery)
- **Secondary**: `#4B2E2A` (Rich chocolate brown)
- **Accent**: `#B8860B` (Golden)
- **Background**: `#F6F0E1` (Warm ivory)
- **Natural**: `#6B8E23` (Olive green - organic theme)

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)

### Components
- 22 reusable components
- Fully typed with TypeScript
- Accessible (ARIA labels, keyboard nav)
- Responsive (mobile-first)

## 📄 Pages

1. **HomePage** - Hero, USPs, featured products, newsletter
2. **ShopPage** - Product catalog with filters and sorting
3. **ProductDetailPage** - Gallery, details, reviews, related products
4. **CartPage** - Cart management, coupons, shipping calculator
5. **CheckoutPage** - 3-step checkout flow (shipping, payment, confirmation)
6. **AccountPage** - Orders, wishlist, addresses, profile, settings
7. **FAQPage** - Searchable FAQ with categories
8. **BlogPage** - Blog listing with categories and search

## 🔌 API Integration

### Products API
```typescript
import { productApi } from './services/api';

// Get all products
const products = await productApi.getAll({ category: 'Classic Collection' });

// Get product by slug
const product = await productApi.getBySlug('classic-gud-bites');

// Get featured products
const featured = await productApi.getFeatured();
```

### Custom Hooks
```typescript
import { useProducts, useProduct, useOrders, useWishlist } from './hooks';

// In your component
const { products, loading, error } = useProducts({ category: 'Premium' });
const { product } = useProduct('classic-gud-bites');
const { orders } = useOrders();
const { items, addToWishlist } = useWishlist();
```

## 🧪 Testing (TODO)

```bash
# Run tests (to be implemented)
npm run test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### Environment Variables
Don't forget to add all environment variables from `.env.local` to your deployment platform.

## 📈 Performance

- **Lighthouse Score**: Target 90+
- **Code Splitting**: React Router lazy loading
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service worker (PWA ready)

## 🔒 Security

- **Supabase RLS**: Row-level security enabled
- **Environment Variables**: Sensitive data in `.env.local`
- **HTTPS**: Required for production
- **Input Validation**: Client and server-side

## 📝 Content Files

11 production-ready marketing copy files in `/content`:
- Homepage copy
- Product descriptions
- About Us
- FAQ
- Blog posts
- Email templates
- And more...

## 🎯 Next Steps

1. **Complete Supabase Setup**
   - Run migrations
   - Seed products
   - Configure storage buckets

2. **Payment Integration**
   - Set up Stripe/Razorpay
   - Test payment flow
   - Configure webhooks

3. **Analytics**
   - Add GA4 tracking
   - Set up conversion events
   - Configure Meta Pixel

4. **Email Marketing**
   - Connect Klaviyo
   - Set up flows (welcome, abandoned cart, order confirmation)
   - Design email templates

5. **SEO**
   - Add meta tags
   - Generate sitemap
   - Implement structured data
   - Set up robots.txt

6. **Testing**
   - Write unit tests
   - Add E2E tests
   - Accessibility audit
   - Performance optimization

7. **Launch**
   - Domain setup
   - SSL certificate
   - Deploy to production
   - Monitor errors (Sentry)

## 🤝 Contributing

This is a proprietary project for MitthuuG. Internal contributions only.

## 📞 Support

For technical support or questions:
- Email: dev@mitthuug.com
- Docs: [Internal Wiki]

## 📜 License

Proprietary - All rights reserved by MitthuuG

---

**Built with ❤️ for authentic Indian flavors**
