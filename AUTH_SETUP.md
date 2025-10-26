# MitthuuG Authentication System Documentation

## Overview

MitthuuG implements a comprehensive three-tier authentication system using Supabase Auth with email verification:

1. **Guest Users** - Can browse the website but cannot place orders or write reviews
2. **Registered Users** - Full access to place orders, write reviews, and interact with the platform
3. **Admin Users** - Special privileges with access to admin dashboard

## Authentication Features

### Email Verification
- **Automatic Email Sending**: When users sign up, Supabase automatically sends a verification email
- **Required for Login**: Users must verify their email before they can sign in
- **Resend Verification**: Users can request a new verification email if needed
- **Callback Handling**: Email verification links redirect to `/auth/callback` (configured in Supabase)

### User Roles

#### 1. Guest (Unauthenticated Users)
- Can browse all products
- Can view product details and reviews
- Can add items to cart (stored in localStorage)
- **Cannot**:
  - Place orders
  - Write reviews
  - Save preferences
  - Access profile

#### 2. Registered User (role: 'user')
- All guest privileges plus:
- Place and track orders
- Write product reviews
- Edit profile information
- View order history
- Persistent cart across sessions

#### 3. Admin (role: 'admin')
- All user privileges plus:
- Access to admin dashboard
- Manage products (CRUD operations)
- Manage orders (view, update status)
- View analytics
- Manage reviews (approve/reject)
- View all user data

## Supabase Configuration Required

### 1. Enable Email Confirmations

In your Supabase Dashboard:

1. Go to **Authentication > Settings**
2. Under **Email Auth**, ensure:
   - "Enable email confirmations" is **ENABLED**
   - "Confirm email" is **ENABLED**

### 2. Configure Email Templates

Go to **Authentication > Email Templates** and customize:

#### Confirm Signup Template
```
Subject: Verify your MitthuuG account

Hi {{ .ConfirmationURL }},

Thanks for signing up to MitthuuG!

Please verify your email by clicking the link below:

{{ .ConfirmationURL }}

If you didn't create this account, you can safely ignore this email.

Best regards,
The MitthuuG Team
```

### 3. Set Redirect URLs

In **Authentication > URL Configuration**:

- **Site URL**: `http://localhost:5173` (for development)
- **Redirect URLs**: Add your production domain when deploying

### 4. Database Configuration

The authentication system uses the `users` table with RLS policies already set up:

```sql
-- Users table schema (already created in migration)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text DEFAULT 'user' CHECK (role IN ('guest', 'user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 5. Creating Admin Users

To create an admin user:

1. Sign up normally through the website
2. Verify your email
3. Run this SQL in Supabase SQL Editor:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

## Authentication Flow

### Sign Up Flow
1. User enters name, email, password
2. System calls `supabase.auth.signUp()` with email verification enabled
3. User record created in `users` table with role = 'user'
4. Supabase sends verification email
5. User sees "Check Your Email" screen
6. User clicks link in email
7. Email is verified in Supabase Auth
8. User can now sign in

### Sign In Flow
1. User enters email and password
2. System calls `supabase.auth.signInWithPassword()`
3. System checks if email is verified
4. If not verified, user is logged out and shown error
5. If verified, session is created
6. User profile is fetched from `users` table
7. User role is determined (guest/user/admin)
8. User is redirected to homepage

### Protected Actions

The following actions require authentication:

- **Placing Orders**: Checkout redirects to sign-in if not authenticated
- **Writing Reviews**: Review form only shows for authenticated users
- **Accessing Profile**: Shows sign-in prompt for guests
- **Admin Dashboard**: Only accessible to users with role = 'admin'

## Code Integration

### Using Auth in Components

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const {
    user,              // Current Supabase user object
    userProfile,       // User profile from database
    isAuthenticated,   // Boolean: true if signed in
    isGuest,          // Boolean: true if not signed in
    isUser,           // Boolean: true if role = 'user'
    isAdmin,          // Boolean: true if role = 'admin'
    signIn,           // Function to sign in
    signUp,           // Function to sign up
    signOut,          // Function to sign out
    updateProfile,    // Function to update profile
  } = useAuth();

  // Example: Protect action
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      // Show sign-in modal
      return;
    }
    // Proceed with order
  };
}
```

### Auth Context API

```typescript
interface AuthContextType {
  user: User | null;                    // Supabase auth user
  userProfile: UserProfile | null;       // Database user profile
  loading: boolean;                      // Auth state loading
  signUp: (email, password, name) => Promise<{ needsVerification: boolean }>;
  signIn: (email, password) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;              // Signed in and verified
  isGuest: boolean;                      // Not authenticated
  isUser: boolean;                       // Has 'user' role
  isAdmin: boolean;                      // Has 'admin' role
  resendVerification: (email) => Promise<void>;
  updateProfile: (updates) => Promise<void>;
}
```

## Security Features

### Row Level Security (RLS)

All database tables have RLS enabled with policies:

#### Users Table
- Users can view and update their own profile
- Admins can view all users

#### Products Table
- Anyone can view products
- Only admins can create, update, or delete products

#### Orders Table
- Users can view their own orders
- Users can create orders
- Admins can view and update all orders

#### Reviews Table
- Anyone can view approved reviews
- Authenticated users can create reviews
- Admins can manage all reviews

### Password Security
- Minimum 6 characters enforced
- Hashed and stored by Supabase (never exposed)
- Password confirmation required on signup

### Email Verification
- Prevents fake account creation
- Ensures valid email addresses
- Required before any authenticated action

## Testing Authentication

### Test Guest User Flow
1. Visit website without signing in
2. Browse products ✓
3. Add to cart ✓
4. Try to checkout → Should prompt for sign-in ✗

### Test User Registration
1. Click "Sign In" button
2. Click "Sign Up" tab
3. Enter name, email, password
4. Submit form
5. Check email for verification link
6. Click verification link
7. Return to site and sign in
8. Should now be able to place orders ✓

### Test Admin Access
1. Create admin user (via SQL)
2. Sign in with admin account
3. Should see "Dashboard" link in navigation
4. Click dashboard → Should show admin panel ✓

## Troubleshooting

### Email Not Received
1. Check spam/junk folder
2. Verify email settings in Supabase dashboard
3. Check Supabase logs for delivery status
4. Use "Resend Verification Email" button

### Cannot Sign In After Verification
1. Clear browser cache and cookies
2. Try incognito/private window
3. Check Supabase Auth logs
4. Verify email_confirmed_at field is set

### Admin Dashboard Not Showing
1. Verify user role in database: `SELECT role FROM users WHERE email = 'your@email.com'`
2. Should return 'admin'
3. Sign out and sign in again to refresh session

## Production Deployment Checklist

- [ ] Update Site URL in Supabase to production domain
- [ ] Add production domain to Redirect URLs
- [ ] Customize email templates with branding
- [ ] Set up custom SMTP (optional)
- [ ] Test email delivery in production
- [ ] Create initial admin user
- [ ] Test all auth flows in production
- [ ] Enable email rate limiting
- [ ] Configure password requirements
- [ ] Set up monitoring for failed auth attempts

## Support

For issues with:
- **Email Delivery**: Check Supabase Auth logs
- **RLS Policies**: Use Supabase SQL Editor to test queries
- **Role Assignment**: Use SQL to update user roles
- **Session Management**: Check browser dev tools for auth tokens

---

**Note**: This authentication system is production-ready and follows security best practices. Always test thoroughly in a staging environment before deploying to production.
