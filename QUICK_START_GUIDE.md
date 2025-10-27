# Quick Start Guide - MitthuuG Website

## 🚀 Getting Your Website Running

Follow these steps in order to get your website fully functional:

---

## Step 1: Database Setup ✅ (COMPLETED)

You've already run:
- ✅ Users table setup
- ✅ Newsletter subscribers table setup

---

## Step 2: E-Commerce Schema Setup (REQUIRED)

Your website needs the products, orders, and other e-commerce tables. Run this migration:

### In Supabase SQL Editor:

1. Open: `supabase/migrations/20251023000000_complete_ecommerce_schema.sql`
2. Copy the ENTIRE file
3. Paste in Supabase SQL Editor
4. Click **Run**

This creates:
- `products` table
- `orders` table
- `order_items` table
- `reviews` table
- `wishlist` table
- `cart_items` table
- All necessary indexes and RLS policies

---

## Step 3: Insert Sample Products (REQUIRED)

To see products on your homepage, you need data:

### In Supabase SQL Editor:

1. Open: `INSERT_SAMPLE_PRODUCTS.sql` (just created)
2. Copy the entire file
3. Paste in Supabase SQL Editor
4. Click **Run**

This adds 12 sample jaggery products with:
- Images
- Prices
- Descriptions
- Stock levels
- Ratings and reviews

---

## Step 4: Make Yourself Admin (OPTIONAL)

To access the admin dashboard:

### In Supabase SQL Editor:

1. Open: `MAKE_ADMIN.sql`
2. Replace `'your-email@example.com'` with `'impritamray@gmail.com'`
3. Click **Run**

Now you can access: http://localhost:5173/admin

---

## Step 5: Verify Everything Works

### Test Checklist:

✅ **Homepage** (http://localhost:5173)
- Should show 4 featured products
- Newsletter form should work
- No "Loading products..." stuck

✅ **Shop Page** (http://localhost:5173/shop)
- Should show all 12 products
- Filters should work (category, price)
- Search should work

✅ **Authentication**
- Sign up should work
- Login should work
- User profile created in database

✅ **Newsletter**
- Subscribe on homepage
- Check `newsletter_subscribers` table in Supabase

✅ **Admin Dashboard** (http://localhost:5173/admin)
- Only works if you're admin
- Shows stats and recent orders (mock data for now)

---

## 🐛 Troubleshooting

### Homepage stuck on "Loading products..."

**Problem**: Products table doesn't exist or is empty

**Solution**: 
1. Run `20251023000000_complete_ecommerce_schema.sql` 
2. Then run `INSERT_SAMPLE_PRODUCTS.sql`

### "Cannot read properties of undefined"

**Problem**: Missing table or RLS policy blocking access

**Solution**: Check Supabase logs and ensure all migrations are run

### Admin dashboard shows "Access Denied"

**Problem**: Your user doesn't have admin role

**Solution**: Run `MAKE_ADMIN.sql` with your email

---

## 📂 Database Structure

After running all migrations, you'll have:

**Auth Tables:**
- `users` - User profiles
- `auth.users` - Supabase auth (auto-created)

**E-Commerce Tables:**
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Items in each order
- `reviews` - Product reviews
- `wishlist` - User wishlists
- `cart_items` - Shopping cart

**Marketing Tables:**
- `newsletter_subscribers` - Email subscribers

---

## 🎯 Next Steps

Once everything is working:

1. **Add Real Products** - Use admin dashboard or SQL
2. **Upload Product Images** - Use Supabase Storage
3. **Configure Payment** - Set up Razorpay keys
4. **Test Orders** - Create test orders
5. **Email Integration** - Connect Klaviyo/Mailchimp

---

## ✨ Current Features

✅ User Authentication (Sign up/Login)
✅ Product Catalog (12 sample products)
✅ Shopping Cart
✅ Wishlist
✅ Product Search
✅ Blog with Posts
✅ Newsletter Subscription
✅ Order Tracking
✅ Admin Dashboard (basic)
✅ FAQ Page
✅ Responsive Design

---

## 🚨 Important Files

**Database Setup:**
- `SETUP_USERS_ONLY.sql` - Users table
- `SETUP_NEWSLETTER_ONLY.sql` - Newsletter table
- `20251023000000_complete_ecommerce_schema.sql` - Products/Orders tables
- `INSERT_SAMPLE_PRODUCTS.sql` - Sample product data
- `MAKE_ADMIN.sql` - Grant admin access

**Documentation:**
- `QUICK_START.md` - This file
- `NEWSLETTER_SETUP.md` - Newsletter feature docs
- `AUTH_SETUP.md` - Authentication docs

---

## Need Help?

Check the Supabase dashboard:
- **Table Editor** - See your data
- **SQL Editor** - Run queries
- **Logs** - Debug errors
- **Authentication** - User management

Good luck! 🚀
