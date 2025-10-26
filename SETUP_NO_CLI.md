# 🎯 EASIEST METHOD - No CLI, No Installation!

## Use Supabase Dashboard SQL Editor

This is the **simplest way** - just copy and paste SQL directly into Supabase!

---

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Click **SQL Editor** in the left sidebar

---

### Step 2: Run Migration Files (One by One)

Run these files **in order**:

#### 1️⃣ Create Database Schema

**File**: `supabase/migrations/20251023000000_complete_ecommerce_schema.sql`

1. Open the file in VS Code
2. Select ALL (Ctrl+A)
3. Copy (Ctrl+C)
4. In Supabase SQL Editor → Click **New Query**
5. Paste the SQL
6. Click **Run** (or press Ctrl+Enter)
7. Wait for "Success" message (~30 seconds)

**Result**: Creates 14 tables + triggers + functions

---

#### 2️⃣ Add Seed Data

**File**: `supabase/migrations/20251023000001_seed_data.sql`

1. Open the file in VS Code
2. Copy all content
3. In Supabase SQL Editor → Click **New Query**
4. Paste the SQL
5. Click **Run**
6. Wait for "Success" message

**Result**: Adds 6 products + 3 coupons

---

#### 3️⃣ Enable Security Policies

**File**: `supabase/migrations/20251023000002_rls_policies.sql`

1. Open the file in VS Code
2. Copy all content
3. In Supabase SQL Editor → Click **New Query**
4. Paste the SQL
5. Click **Run**
6. Wait for "Success" message (~30 seconds)

**Result**: Enables Row Level Security on all tables

---

#### 4️⃣ Create Storage Buckets

**File**: `supabase/migrations/20251023000003_storage_buckets.sql`

1. Open the file in VS Code
2. Copy all content
3. In Supabase SQL Editor → Click **New Query**
4. Paste the SQL
5. Click **Run**
6. Wait for "Success" message

**Result**: Creates 4 storage buckets for images

---

### Step 3: Verify It Worked

In Supabase Dashboard:

1. **Table Editor** → Should see 14 tables
2. Click **products** table → Should see 6 rows
3. Click **coupons** table → Should see 3 rows
4. **Storage** → Should see 4 buckets

---

### Step 4: Get Your API Credentials

1. Go to: **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

---

### Step 5: Update .env.local

Create or update `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Step 6: Start Dev Server

```powershell
npm run dev
```

Open: http://localhost:5173

You should see **real products from Supabase**! 🎉

---

## ✅ Success Checklist

- [ ] Ran migration 1 (schema) - Created 14 tables
- [ ] Ran migration 2 (seed) - Added 6 products, 3 coupons
- [ ] Ran migration 3 (RLS) - Security policies enabled
- [ ] Ran migration 4 (storage) - 4 buckets created
- [ ] Updated .env.local with credentials
- [ ] Started dev server
- [ ] Homepage shows products from database

---

## 🐛 Troubleshooting

### Error: "relation already exists"

**Cause**: You already ran this migration before

**Solution**: Skip this file or reset database:
- Dashboard → Database → Reset Database (WARNING: Deletes all data!)

---

### Error: "permission denied"

**Cause**: RLS policies blocking your action

**Solution**: This is normal! RLS policies are working. Use the API from your app.

---

### Products not showing in app

1. ✅ Check .env.local has correct URL and key
2. ✅ Restart dev server: `npm run dev`
3. ✅ Check browser console for errors
4. ✅ Verify products in Supabase Table Editor

---

### SQL Editor timeout

**Cause**: Large migration taking too long

**Solution**: 
1. Split the SQL into smaller chunks
2. Run first half, then second half
3. Or increase timeout in Supabase settings

---

## 🎯 Why This Method?

**Advantages:**
- ✅ No CLI installation needed
- ✅ No PowerShell scripts needed
- ✅ Visual feedback in Dashboard
- ✅ Easy to debug errors
- ✅ Works on any OS (Windows, Mac, Linux)

**Disadvantages:**
- ⚠️ Manual copy-paste (4 times)
- ⚠️ Can't automate easily

---

## 📊 What Gets Created

### Tables (14)
1. products (6 rows)
2. product_variants (0 rows)
3. reviews (0 rows)
4. review_helpful (0 rows)
5. orders (0 rows)
6. order_items (0 rows)
7. user_profiles (0 rows)
8. addresses (0 rows)
9. wishlist (0 rows)
10. coupons (3 rows)
11. coupon_usage (0 rows)
12. newsletter_subscribers (0 rows)
13. blog_posts (0 rows)

### Storage Buckets (4)
1. product-images (public)
2. avatars (user-specific)
3. blog-images (authors only)
4. review-images (user uploads)

### Security
- Row Level Security enabled on all tables
- Users can only see their own data
- Public can browse products
- Admins have full access

---

## 🚀 Total Time: ~10 minutes

1. Run 4 SQL files (5 min)
2. Get credentials (2 min)
3. Update .env.local (1 min)
4. Test app (2 min)

---

## 💡 Pro Tip

Save each SQL query in Supabase SQL Editor as a snippet:
1. After pasting SQL → Click **Save**
2. Name it (e.g., "Migration 1 - Schema")
3. Now you can re-run it anytime!

---

## 📚 Alternative Methods

If you prefer automation:

1. **PowerShell Direct Connection**: `.\setup-database-direct.ps1`
   - Connects to PostgreSQL directly
   - Needs password
   - Runs all migrations automatically

2. **Supabase CLI**: Install CLI and use `supabase db push`
   - See: `INSTALL_SUPABASE_CLI.md`

---

**Recommended: Use this SQL Editor method!** It's the simplest and most reliable. ✨
