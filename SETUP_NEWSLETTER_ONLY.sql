-- Newsletter Subscribers Table Setup
-- Run this AFTER running SETUP_USERS_ONLY.sql

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{"marketing": true, "updates": true, "offers": true}'::jsonb,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update all subscriptions" ON public.newsletter_subscribers;

-- Create RLS Policies
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view own subscription"
    ON public.newsletter_subscribers
    FOR SELECT
    USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update own subscription"
    ON public.newsletter_subscribers
    FOR UPDATE
    USING (auth.jwt() ->> 'email' = email)
    WITH CHECK (auth.jwt() ->> 'email' = email);

CREATE POLICY "Admins can view all subscriptions"
    ON public.newsletter_subscribers
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all subscriptions"
    ON public.newsletter_subscribers
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create trigger for updated_at (uses function from SETUP_USERS_ONLY.sql)
DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to unsubscribe
CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(subscriber_email VARCHAR)
RETURNS VOID AS $$
BEGIN
    UPDATE public.newsletter_subscribers
    SET 
        is_active = FALSE,
        unsubscribed_at = CURRENT_TIMESTAMP
    WHERE email = subscriber_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- All done! Newsletter subscription is ready.
