# Razorpay Quick Start Guide

Get Razorpay payment integration running in 5 minutes!

## Prerequisites
- ✅ Supabase project set up
- ✅ Development server running
- ✅ Supabase CLI installed

## Quick Setup Steps

### 1. Get Razorpay Test Keys (2 minutes)

1. Go to https://dashboard.razorpay.com/signup
2. Sign up with email (use Gmail for quick setup)
3. Skip KYC (can do later for live payments)
4. Switch to **Test Mode** (toggle at top)
5. Go to **Settings** → **API Keys**
6. Copy your **Test Key ID** (starts with `rzp_test_`)

### 2. Configure Environment Variables (1 minute)

**Create/Update `.env.local`:**

```bash
# Add this line to .env.local
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

Replace `XXXXXXXXXXXXXXXX` with your actual test key ID.

### 3. Deploy Edge Functions (2 minutes)

**Open PowerShell:**

```powershell
# Navigate to project
cd "d:\websites and web apps\mitthuug"

# Login to Supabase (if not already)
supabase login

# Link project (if not already)
supabase link --project-ref ltakjmksbmovpfypteez

# Set Razorpay secrets
supabase secrets set RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
supabase secrets set RAZORPAY_KEY_SECRET=your_test_secret_key_here

# Deploy both functions
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
```

Replace the keys with your actual Razorpay test credentials from Step 1.

### 4. Test Payment Flow (1 minute)

1. **Restart dev server:**
```powershell
npm run dev
```

2. **Test checkout:**
   - Go to http://localhost:5173
   - Add a product to cart
   - Click cart icon → "Proceed to Checkout"
   - Fill shipping details
   - Select "Pay with Razorpay"
   - Click "Complete Payment"

3. **Use test card:**
   - **Card**: `4111 1111 1111 1111`
   - **Expiry**: `12/25`
   - **CVV**: `123`
   - **Name**: Any name
   - Click "Pay Now"

4. **Success!**
   - You should see order confirmation
   - Cart should be empty
   - Check "My Orders" in account page

## Test Cards Reference

### Successful Payments
```
Card: 4111 1111 1111 1111 (Visa)
Card: 5555 5555 5555 4444 (Mastercard)
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
```

### Failed Payments
```
Card: 4000 0000 0000 0002 (Declined)
Card: 4000 0000 0000 0069 (Expired)
```

### Test UPI
```
UPI ID: success@razorpay (Success)
UPI ID: failure@razorpay (Failure)
```

## Troubleshooting

### "Razorpay key not configured"
- Check `.env.local` has `VITE_RAZORPAY_KEY_ID`
- Restart dev server after adding environment variable

### "Failed to create order"
- Verify Edge Functions are deployed: `supabase functions list`
- Check Edge Function logs: `supabase functions logs create-razorpay-order`
- Ensure secrets are set: `supabase secrets list`

### Payment modal doesn't open
- Check browser console for errors
- Verify script loaded: Network tab → look for `checkout.js`
- Clear browser cache and retry

## What's Implemented?

✅ **Frontend:**
- Razorpay script loader
- Payment initialization
- Order creation flow
- Success/failure handling
- COD alternative option

✅ **Backend:**
- Supabase Edge Function for order creation
- Supabase Edge Function for payment verification
- Secure signature verification
- Order status updates

✅ **Database:**
- Orders table with payment fields
- Payment method tracking
- Razorpay transaction IDs stored

## Next Steps

### For Production (Later)

1. **Complete Razorpay KYC** (Submit business documents)
2. **Get Live Keys** (After KYC approval)
3. **Update Environment:**
   ```bash
   # .env.local
   VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
   
   # Supabase Secrets
   supabase secrets set RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
   supabase secrets set RAZORPAY_KEY_SECRET=your_live_secret
   ```
4. **Test with Real Cards** (Small amounts first)
5. **Set Up Webhooks** (Optional but recommended)
6. **Go Live!** 🚀

## Files Modified

- ✅ `src/lib/razorpay.ts` - Payment service library (updated to use Edge Functions)
- ✅ `src/pages/CheckoutPage.tsx` - Checkout page with payment integration
- ✅ `supabase/functions/create-razorpay-order/index.ts` - Order creation Edge Function
- ✅ `supabase/functions/verify-razorpay-payment/index.ts` - Payment verification Edge Function
- ✅ `.env.example` - Updated with Razorpay configuration
- ✅ `RAZORPAY_SETUP.md` - Comprehensive setup guide (read this for detailed info)

## Need Help?

- **Full Setup Guide**: See `RAZORPAY_SETUP.md`
- **Razorpay Docs**: https://razorpay.com/docs/
- **Razorpay Support**: support@razorpay.com

---

**Ready to go!** Your payment integration is complete. Just follow the 3 steps above and you'll be accepting payments in minutes! 🎉
