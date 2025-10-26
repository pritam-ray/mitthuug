# 🚀 Quick Setup for Your New Database

You have a fresh Supabase database. Here's how to set it up in **5 minutes**:

---

## ✅ What You Have

These 4 migration files (in order):

1. **20251023000000_complete_ecommerce_schema.sql** - Creates all tables
2. **20251023000001_seed_data.sql** - Adds 6 products + 3 coupons
3. **20251023000002_rls_policies.sql** - Security policies
4. **20251023000003_storage_buckets.sql** - Image storage

---

## 🎯 EASIEST METHOD: SQL Editor

### Step 1: Open SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in sidebar

### Step 2: Run Migration 1 (Schema)

1. Open `supabase/migrations/20251023000000_complete_ecommerce_schema.sql` in VS Code
2. **Select All** (Ctrl+A) → **Copy** (Ctrl+C)
3. In Supabase SQL Editor → **New Query**
4. **Paste** → Click **RUN** (or Ctrl+Enter)
5. Wait ~30 seconds for "Success ✓"

✅ **Result**: 14 tables created

### Step 3: Run Migration 2 (Seed Data)

1. Open `supabase/migrations/20251023000001_seed_data.sql`
2. Copy all content
3. In Supabase SQL Editor → **New Query**
4. Paste → **RUN**
5. Wait for "Success ✓"

✅ **Result**: 6 products + 3 coupons added

### Step 4: Run Migration 3 (Security)

1. Open `supabase/migrations/20251023000002_rls_policies.sql`
2. Copy all content
3. In Supabase SQL Editor → **New Query**
4. Paste → **RUN**
5. Wait ~30 seconds for "Success ✓"

✅ **Result**: Row Level Security enabled

### Step 5: Run Migration 4 (Storage)

1. Open `supabase/migrations/20251023000003_storage_buckets.sql`
2. Copy all content
3. In Supabase SQL Editor → **New Query**
4. Paste → **RUN**
5. Wait for "Success ✓"

✅ **Result**: 4 storage buckets created

---

## 🔍 Verify It Worked

In Supabase Dashboard:

### Check Tables
- Go to **Table Editor**
- You should see: products, orders, reviews, wishlist, addresses, etc. (14 tables)

### Check Products
- Click **products** table
- You should see **6 rows**:
  1. Classic Gud Bites (₹149)
  2. Ginger Gud Chikki (₹159)
  3. Coconut Gud Ladoo (₹169)
  4. Til Gud Barfi (₹179)
  5. Dry Fruit Gud Mix (₹249)
  6. Chocolate Gud Fusion (₹189)

### Check Coupons
- Click **coupons** table
- You should see **3 rows**:
  1. WELCOME10 (10% off)
  2. FESTIVE15 (15% off)
  3. FLAT50 (₹50 off)

### Check Storage
- Go to **Storage**
- You should see **4 buckets**:
  1. product-images
  2. avatars
  3. blog-images
  4. review-images

---

## 🔑 Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)

---

## ⚙️ Update .env.local

Create or update `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace** with your actual URL and key!

---

## 🚀 Start Your App

```powershell
npm run dev
```

Open: http://localhost:5173

**You should see real products from Supabase!** 🎉

---

## ✅ Success Checklist

- [ ] Ran migration 1 - 14 tables created
- [ ] Ran migration 2 - 6 products visible in Table Editor
- [ ] Ran migration 3 - RLS policies enabled
- [ ] Ran migration 4 - 4 storage buckets visible
- [ ] Updated .env.local with URL and key
- [ ] Started dev server
- [ ] Homepage loads products from database

---

## 🐛 Common Issues

### Issue: "relation already exists"
**Solution**: Migration already ran. Skip it or reset database.

### Issue: "permission denied for table"
**Solution**: This is normal after RLS is enabled. Access through your app, not directly.

### Issue: Products not showing in app
**Check**:
1. .env.local has correct URL and key
2. Restart dev server: Stop (Ctrl+C) → `npm run dev`
3. Check browser console (F12) for errors

---

## 📊 What You Get

After setup:

### Database
- ✅ 14 tables
- ✅ 6 products
- ✅ 3 coupons
- ✅ Security enabled
- ✅ Storage configured

### Features Working
- ✅ Browse products
- ✅ View product details
- ✅ Add to cart (localStorage)
- ✅ User authentication
- ✅ Wishlist (requires login)
- ✅ Orders (requires login)

---

## 🔄 Alternative Methods

### Method 2: PowerShell Script
```powershell
.\setup-database-direct.ps1
```
Runs all migrations automatically (needs database password)

### Method 3: Supabase CLI
Install CLI, then: `supabase db push`

See: **INSTALL_SUPABASE_CLI.md**

---

## ⏱️ Total Time

- **SQL Editor Method**: ~10 minutes
- **PowerShell Method**: ~5 minutes
- **CLI Method**: ~8 minutes (including install)

---

## 🎉 You're Done!

Your database is now fully configured and ready to use!

**Next**: Upload product images to storage buckets and test the complete app flow.

Need help? Check:
- **SETUP_NO_CLI.md** - Detailed SQL Editor guide
- **BACKEND_COMPLETE.md** - What was created
- **NEXT_STEPS.md** - What to do next
