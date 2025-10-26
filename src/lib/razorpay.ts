// Razorpay Payment Integration
// Note: This requires Razorpay account setup and API keys

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => {
    open: () => void;
    on: (event: string, callback: (response: any) => void) => void;
  };
}

declare const window: Window;

/**
 * Load Razorpay checkout script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initialize Razorpay payment
 */
export const initiateRazorpayPayment = async (options: {
  amount: number; // in paise (e.g., 14900 for ₹149)
  currency?: string;
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}) => {
  // Load Razorpay script
  const loaded = await loadRazorpayScript();
  
  if (!loaded) {
    throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
  }

  // Get Razorpay key from environment
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  
  if (!razorpayKey) {
    throw new Error('Razorpay key not configured. Please add VITE_RAZORPAY_KEY_ID to your .env file.');
  }

  const razorpayOptions: RazorpayOptions = {
    key: razorpayKey,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: 'MitthuuG',
    description: 'Premium Jaggery-Based Snacks',
    image: '/logo.png', // Your logo
    order_id: options.orderId,
    handler: options.onSuccess,
    prefill: {
      name: options.customerName,
      email: options.customerEmail,
      contact: options.customerPhone,
    },
    notes: {
      order_id: options.orderId,
    },
    theme: {
      color: '#de5510', // MitthuuG primary color
    },
    modal: {
      ondismiss: options.onDismiss || (() => {
        console.log('Payment cancelled by user');
      }),
    },
  };

  const razorpay = new window.Razorpay(razorpayOptions);

  // Handle payment failure
  razorpay.on('payment.failed', (response: any) => {
    if (options.onFailure) {
      options.onFailure(response.error);
    } else {
      console.error('Payment failed:', response.error);
    }
  });

  // Open Razorpay checkout
  razorpay.open();
};

/**
 * Create order on backend (to be implemented with Supabase Edge Function)
 * This should call your backend to create a Razorpay order
 */
export const createRazorpayOrder = async (amount: number): Promise<{
  orderId: string;
  amount: number;
  currency: string;
}> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured');
    }

    // Call Supabase Edge Function to create Razorpay order
    const response = await fetch(`${supabaseUrl}/functions/v1/create-razorpay-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {},
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    return {
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
    };
  } catch (error) {
    console.error('Failed to create Razorpay order:', error);
    throw error;
  }
};

/**
 * Verify payment signature on backend (security measure)
 */
export const verifyRazorpayPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured');
    }

    // Call Supabase Edge Function to verify payment
    const response = await fetch(`${supabaseUrl}/functions/v1/verify-razorpay-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify payment');
    }

    const data = await response.json();
    
    return data.verified === true;
  } catch (error) {
    console.error('Failed to verify payment:', error);
    return false;
  }
};

export default {
  loadRazorpayScript,
  initiateRazorpayPayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
};
