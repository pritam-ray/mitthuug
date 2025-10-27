-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(255), -- Page where they subscribed (e.g., '/blog', '/home')
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    
    -- Preferences
    preferences JSONB DEFAULT '{"marketing": true, "updates": true, "offers": true}'::jsonb,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_is_active ON public.newsletter_subscribers(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_newsletter_subscribed_at ON public.newsletter_subscribers(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- 1. Anyone can insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

-- 2. Users can view their own subscription
CREATE POLICY "Users can view own subscription"
    ON public.newsletter_subscribers
    FOR SELECT
    USING (auth.jwt() ->> 'email' = email);

-- 3. Users can update their own subscription (unsubscribe)
CREATE POLICY "Users can update own subscription"
    ON public.newsletter_subscribers
    FOR UPDATE
    USING (auth.jwt() ->> 'email' = email)
    WITH CHECK (auth.jwt() ->> 'email' = email);

-- 4. Admins can view all subscriptions
CREATE POLICY "Admins can view all subscriptions"
    ON public.newsletter_subscribers
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 5. Admins can update all subscriptions
CREATE POLICY "Admins can update all subscriptions"
    ON public.newsletter_subscribers
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create trigger for updated_at
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
