import { supabase } from './supabase';

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, unknown>;
  page?: string;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('analytics').insert({
      user_id: user?.id || null,
      session_id: getSessionId(),
      event_type: event.event_type,
      event_data: event.event_data || null,
      page: event.page || window.location.pathname,
      referrer: document.referrer || null,
      device: getDeviceType(),
      browser: getBrowser(),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const trackPageView = () => {
  trackEvent({
    event_type: 'page_view',
    page: window.location.pathname,
  });
};

export const trackAddToCart = (productId: string, productName: string) => {
  trackEvent({
    event_type: 'add_to_cart',
    event_data: { product_id: productId, product_name: productName },
  });
};

export const trackPurchase = (orderId: string, totalAmount: number) => {
  trackEvent({
    event_type: 'purchase',
    event_data: { order_id: orderId, total_amount: totalAmount },
  });
};

export const trackSignup = () => {
  trackEvent({
    event_type: 'signup',
  });
};
