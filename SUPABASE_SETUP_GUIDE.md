# 🚀 SUPABASE SETUP - YOU'RE IN CONTROL!

**All backend files are ready!** Here's exactly what to do to connect your database.

---

## ✅ What I Just Created For You

1. **Complete Database Schema** (`supabase/migrations/20251023000000_complete_ecommerce_schema.sql`)
   - 14 tables (products, orders, reviews, wishlist, addresses, coupons, etc.)
   - Automatic timestamps & triggers
   - Business logic functions
   - Fully indexed for performance

2. **Seed Data** (`supabase/migrations/20251023000001_seed_data.sql`)
   - 6 products ready to go
   - 3 coupons (WELCOME10, FESTIVE15, FLAT50)

3. **Security Policies** (`supabase/migrations/20251023000002_rls_policies.sql`)
   - Row Level Security for all tables
   - Users can only see their own data
   - Admins have full access
   - Public can browse products

4. **Storage Buckets** (`supabase/migrations/20251023000003_storage_buckets.sql`)
   - product-images (public)
   - avatars (user-specific)
   - blog-images (authors only)
   - review-images (user uploads)

5. **Automated Setup Script** (`setup-supabase.ps1`)
   - One command does everything!

6. **Updated TypeScript Types** (`src/lib/database.types.ts`)
   - Matches your new schema perfectly

---

## 🎯 YOUR ACTION - Run ONE Command!

### Option 1: Automated Setup (Recommended)

```powershell
# Run this in PowerShell:
.\setup-supabase.ps1
```

The script will:
1. ✅ Install Supabase CLI (if needed)
2. ✅ Log you into Supabase (opens browser)
3. ✅ Show your projects
4. ✅ Link to your project (you provide the ID)
5. ✅ Push all migrations (creates tables, adds data, sets security)
6. ✅ Update your .env.local file
7. ✅ Start dev server

**That's it! Everything done for you!**

---

### Option 2: Manual Setup (If you prefer step-by-step)

#### Step 1: Install Supabase CLI

```powershell
npm install -g supabase
```

#### Step 2: Login to Supabase

```powershell
supabase login
# Opens browser for authentication
```

#### Step 3: Link Your Project

```powershell
# First, list your projects
supabase projects list

# Then link to your project (replace with your project ID)
supabase link --project-ref YOUR_PROJECT_REF_HERE
```

To find your Project Reference ID:
- Go to https://supabase.com/dashboard
- Click your project
- Settings → General → Reference ID

#### Step 4: Push Migrations

```powershell
# This creates all tables, adds data, sets security
supabase db push
```

You'll see output like:
```
✓ Linked to project mitthuug-production
✓ Applied migration 20251023000000_complete_ecommerce_schema.sql
✓ Applied migration 20251023000001_seed_data.sql
✓ Applied migration 20251023000002_rls_policies.sql
✓ Applied migration 20251023000003_storage_buckets.sql
```

#### Step 5: Get Your Credentials

Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_REF/settings/api

Copy:
1. **Project URL** (starts with `https://`)
2. **anon/public key** (starts with `eyJ...`)

#### Step 6: Update .env.local

Create or update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Step 7: Start Development Server

```powershell
npm run dev
```

---

## 🧪 Verify It Works

### Test 1: Check Database

```powershell
# View all tables
supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

# Count products
supabase db query "SELECT COUNT(*) FROM products;"
# Should return: 6

# View products
supabase db query "SELECT name, price FROM products LIMIT 3;"
```

### Test 2: Test in Browser

1. Open http://localhost:5173
2. You should see **real products from Supabase** (not mock data)
3. Click a product → Should load from database
4. Try signing up → Creates user in Supabase

---

## 📋 What's In The Database

### Products (6 items)
- Classic Gud Bites (₹149)
- Ginger Gud Chikki (₹159)
- Coconut Gud Ladoo (₹169)
- Til Gud Barfi (₹179)
- Dry Fruit Gud Mix (₹249)
- Chocolate Gud Fusion (₹189)

### Coupons (3 codes)
- **WELCOME10**: 10% off first order (min ₹299)
- **FESTIVE15**: 15% off (min ₹499)
- **FLAT50**: ₹50 off (min ₹500)

### Tables Created (14 total)
1. `products` - Product catalog
2. `product_variants` - Size/flavor options
3. `reviews` - Customer reviews
4. `review_helpful` - Review votes
5. `orders` - Customer orders
6. `order_items` - Order line items
7. `user_profiles` - Extended user info
8. `addresses` - Shipping addresses
9. `wishlist` - Saved products
10. `coupons` - Discount codes
11. `coupon_usage` - Usage tracking
12. `newsletter_subscribers` - Email list
13. `blog_posts` - Blog content
14. Storage buckets for images

---

## 🔐 Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Users can only see their own** orders, addresses, wishlist
✅ **Public can browse** products, reviews, blog posts
✅ **Admins have full access** (role stored in user_profiles.preferences)
✅ **Storage buckets** protect user-uploaded images
✅ **File size limit**: 5MB per upload
✅ **Allowed file types**: JPEG, PNG, WebP, GIF

---

## 🎨 Next: Upload Product Images

Your products are in the database, but images need to be uploaded:

### Option 1: Via Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_REF/storage/buckets
2. Click **product-images** bucket
3. Click **Upload Files**
4. Upload images (name them: classic-gud-bites.jpg, ginger-gud-chikki.jpg, etc.)
5. Click the uploaded file → Copy URL
6. Update product in database:

```sql
UPDATE products 
SET image_url = 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/product-images/classic-gud-bites.jpg'
WHERE slug = 'classic-gud-bites';
```

### Option 2: Via Supabase Storage API (Programmatic)

I can help you create an upload script if needed!

---

## 🐛 Troubleshooting

### Error: "Supabase CLI not found"
```powershell
npm install -g supabase
```

### Error: "Failed to link project"
- Check your Project Reference ID is correct
- Make sure you're logged in: `supabase login`

### Error: "Migration already exists"
Your database already has these migrations. To reset:
```powershell
supabase db reset
```
⚠️ **WARNING**: This deletes all data!

### Products not showing in app
1. Check .env.local has correct credentials
2. Restart dev server: `npm run dev`
3. Check browser console for errors
4. Verify products exist: `supabase db query "SELECT COUNT(*) FROM products;"`

### TypeScript errors
```powershell
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P → "Restart TS Server"
```

---

## 📚 Useful Commands

```powershell
# View project status
supabase status

# Open Supabase Dashboard
Start-Process "https://supabase.com/dashboard"

# View logs
supabase db logs

# Run custom query
supabase db query "YOUR SQL HERE"

# View all products
supabase db query "SELECT name, price, stock FROM products;"

# Check RLS policies
supabase db query "SELECT * FROM pg_policies;"
```

---

## ✅ Success Checklist

After setup, verify:

- [ ] Supabase CLI installed (`supabase --version`)
- [ ] Logged into Supabase (`supabase projects list` shows your projects)
- [ ] Project linked (`supabase status` shows connection)
- [ ] Migrations applied (`supabase db query "SELECT COUNT(*) FROM products;"` returns 6)
- [ ] .env.local has correct credentials
- [ ] Dev server runs (`npm run dev`)
- [ ] Products load from database (check homepage)
- [ ] Can sign up / login
- [ ] No TypeScript errors

---

## 🎉 You're Done!

Your database is now live with:
- ✅ 14 tables ready
- ✅ 6 products loaded
- ✅ Security policies active
- ✅ Storage buckets configured
- ✅ TypeScript types updated

**Next step**: Upload product images and test the complete flow!

Need help? Check:
- `QUICK_START.md` - Quick setup guide
- `API_DOCUMENTATION.md` - API reference
- `NEXT_STEPS.md` - What to do next

---

**Happy building! 🚀**
