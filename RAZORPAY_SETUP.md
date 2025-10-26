# Razorpay Payment Integration Setup

This guide walks you through setting up Razorpay payment gateway for MitthuuG.

## Overview

Razorpay is India's leading payment gateway that supports:
- **Cards**: Credit/Debit cards (Visa, Mastercard, Rupay, Amex)
- **UPI**: Google Pay, PhonePe, Paytm, BHIM
- **Netbanking**: All major Indian banks
- **Wallets**: Paytm, PhonePe, Mobikwik, Freecharge
- **EMI**: Credit card EMI options
- **COD**: Cash on Delivery (implemented separately)

## Step 1: Create Razorpay Account

### Sign Up
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Click **Sign Up**
3. Enter your details:
   - Email address
   - Password
   - Company name: **MitthuuG**
4. Verify your email

### Complete KYC (For Live Mode)
To activate live payments, complete KYC:
1. **Business Details**:
   - Business name: MitthuuG
   - Business type: E-commerce
   - Website: mitthuug.com
   
2. **Documents Required**:
   - PAN Card (Business/Individual)
   - Address Proof (Aadhar/Passport/Utility Bill)
   - Bank Account Details
   - GST Number (if applicable)

3. **Activation Time**: 24-48 hours after document submission

## Step 2: Get API Keys

### Test Keys (For Development)
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Switch to **Test Mode** (toggle at top)
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Keys**
5. Copy the keys:
   - **Key ID**: Starts with `rzp_test_`
   - **Key Secret**: Keep this secret!

### Live Keys (For Production)
1. Complete KYC verification (required)
2. Switch to **Live Mode**
3. Go to **Settings** → **API Keys**
4. Click **Generate Live Keys**
5. Copy the keys:
   - **Key ID**: Starts with `rzp_live_`
   - **Key Secret**: Keep this secret!

## Step 3: Configure Environment Variables

### Local Development (.env.local)

Create or update `d:\websites and web apps\mitthuug\.env.local`:

```bash
# Supabase (Already configured)
VITE_SUPABASE_URL=https://ltakjmksbmovpfypteez.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Razorpay TEST Keys (Use these for development)
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

### Supabase Edge Functions Environment

You need to set **server-side** secrets in Supabase:

1. Go to [Supabase Dashboard](https://app.supabase.com/project/ltakjmksbmovpfypteez)
2. Navigate to **Project Settings** → **Edge Functions**
3. Add these secrets:

```bash
# Razorpay TEST Credentials
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_test_secret_key_here
```

**For Production:**
```bash
# Razorpay LIVE Credentials (after KYC approval)
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_live_secret_key_here
```

## Step 4: Deploy Supabase Edge Functions

### Install Supabase CLI

**Windows (PowerShell):**
```powershell
# Using Scoop
scoop install supabase

# OR using npm
npm install -g supabase
```

**Verify Installation:**
```powershell
supabase --version
```

### Login to Supabase
```powershell
supabase login
```

### Link Project
```powershell
cd "d:\websites and web apps\mitthuug"
supabase link --project-ref ltakjmksbmovpfypteez
```

### Deploy Edge Functions
```powershell
# Deploy both functions
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
```

### Set Edge Function Secrets
```powershell
# Set Razorpay credentials
supabase secrets set RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
supabase secrets set RAZORPAY_KEY_SECRET=your_test_secret_key_here
```

## Step 5: Test Payment Integration

### Test Cards (Razorpay Provides)

#### Successful Payments
- **Card Number**: `4111 1111 1111 1111` (Visa)
- **Card Number**: `5555 5555 5555 4444` (Mastercard)
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)
- **Name**: Any name

#### Failed Payments
- **Card Number**: `4000 0000 0000 0002` (Card declined)
- **Card Number**: `4000 0000 0000 0069` (Expired card)

#### Test UPI
- **UPI ID**: `success@razorpay`
- **UPI ID**: `failure@razorpay`

### Testing Flow

1. **Start Development Server:**
```powershell
npm run dev
```

2. **Navigate to Checkout:**
   - Add products to cart
   - Go to Cart page
   - Click "Proceed to Checkout"

3. **Fill Shipping Details:**
   - Name, email, phone, address
   - Click "Continue to Payment"

4. **Select Payment Method:**
   - Choose "Pay with Razorpay"
   - Click "Complete Payment"

5. **Razorpay Checkout:**
   - Razorpay modal opens
   - Select payment method (Card/UPI/Netbanking)
   - Enter test card details
   - Click "Pay Now"

6. **Verify Success:**
   - Should redirect to confirmation page
   - Cart should be cleared
   - Order should appear in "My Orders"

7. **Check Database:**
   - Go to Supabase Table Editor
   - Check `orders` table
   - Verify payment details are saved

## Step 6: Production Deployment

### Before Going Live

1. **Complete Razorpay KYC** (required for live payments)
2. **Get Live API Keys** from Razorpay Dashboard
3. **Update Environment Variables:**

#### Update .env.local (local testing with live keys)
```bash
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
```

#### Update Supabase Secrets
```powershell
supabase secrets set RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
supabase secrets set RAZORPAY_KEY_SECRET=your_live_secret_key_here
```

4. **Test with Real Cards** (small amounts first)
5. **Set Up Webhooks** (see below)

## Step 7: Set Up Webhooks (Optional but Recommended)

Webhooks notify your system when payment status changes (authorized, captured, failed, refunded).

### Create Webhook Endpoint

1. Create new Edge Function:
```powershell
# Create webhook handler
supabase functions new razorpay-webhook
```

2. Implement webhook handler in `supabase/functions/razorpay-webhook/index.ts`

3. Deploy:
```powershell
supabase functions deploy razorpay-webhook
```

### Configure in Razorpay Dashboard

1. Go to **Settings** → **Webhooks**
2. Click **Add New Webhook**
3. Enter details:
   - **Webhook URL**: `https://ltakjmksbmovpfypteez.supabase.co/functions/v1/razorpay-webhook`
   - **Secret**: Generate a random string
   - **Events**: Select:
     - `payment.authorized`
     - `payment.captured`
     - `payment.failed`
     - `order.paid`
     - `refund.created`
4. Click **Create Webhook**

## Troubleshooting

### Payment Modal Not Opening

**Issue**: Razorpay checkout doesn't appear

**Solutions**:
1. Check browser console for errors
2. Verify `VITE_RAZORPAY_KEY_ID` is set in `.env.local`
3. Ensure script is loaded: Check Network tab for `checkout.js`
4. Try clearing browser cache

### Order Creation Failed

**Issue**: Error creating Razorpay order

**Solutions**:
1. **Check Edge Function Logs:**
```powershell
supabase functions logs create-razorpay-order
```

2. **Verify Secrets:**
```powershell
supabase secrets list
```

3. **Check Razorpay Dashboard:**
   - Go to Requests → API Logs
   - Look for failed requests

4. **Test Edge Function Directly:**
```powershell
curl -X POST https://ltakjmksbmovpfypteez.supabase.co/functions/v1/create-razorpay-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"amount": 10000, "currency": "INR"}'
```

### Payment Verification Failed

**Issue**: Payment succeeds but order not created

**Solutions**:
1. Check Edge Function logs:
```powershell
supabase functions logs verify-razorpay-payment
```

2. Verify signature manually in Razorpay Dashboard
3. Check `orders` table for partial data
4. Ensure `payment_status` column exists

### CORS Errors

**Issue**: CORS policy blocking requests

**Solutions**:
1. Edge Functions already have CORS headers
2. If still blocked, check Supabase project settings
3. Ensure Edge Functions are deployed

## Security Best Practices

### ✅ Do's
- ✅ Store `RAZORPAY_KEY_SECRET` only on server (Edge Functions)
- ✅ Verify payment signature on backend
- ✅ Use HTTPS in production
- ✅ Validate order amounts on server
- ✅ Log all payment transactions
- ✅ Use test keys for development
- ✅ Rotate keys if compromised

### ❌ Don'ts
- ❌ Never expose `RAZORPAY_KEY_SECRET` in frontend code
- ❌ Don't skip payment verification
- ❌ Don't trust client-side payment status
- ❌ Don't store sensitive card data
- ❌ Don't use live keys in development

## Monitoring & Analytics

### Razorpay Dashboard
- **Transactions**: Real-time payment monitoring
- **Settlements**: Payment settlement tracking
- **Analytics**: Success rate, payment methods breakdown
- **Customer Details**: Customer payment history

### Reports
1. **Payment Reports**: Daily/Monthly settlement reports
2. **Refund Reports**: Track refunds and reasons
3. **Settlement Reports**: Bank transfer details

## Support

### Razorpay Support
- **Email**: support@razorpay.com
- **Phone**: +91 80 4610 6400
- **Docs**: https://razorpay.com/docs/
- **Dashboard**: https://dashboard.razorpay.com/

### MitthuuG Integration
- Check `RAZORPAY_SETUP.md` (this file)
- Review Edge Function code in `supabase/functions/`
- Frontend code in `src/lib/razorpay.ts`
- Checkout implementation in `src/pages/CheckoutPage.tsx`

## Next Steps

1. ✅ Set up Razorpay account
2. ✅ Get test API keys
3. ✅ Configure environment variables
4. ✅ Deploy Edge Functions
5. ✅ Test payment flow with test cards
6. ⏳ Complete KYC for live payments
7. ⏳ Get live API keys
8. ⏳ Update production environment variables
9. ⏳ Test with real cards (small amounts)
10. ⏳ Set up webhooks
11. ⏳ Go live! 🚀

---

**Last Updated**: January 2025  
**Author**: MitthuuG Development Team  
**Version**: 1.0
