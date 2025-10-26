import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { initiateRazorpayPayment, createRazorpayOrder } from '../lib/razorpay';
import { ordersApi } from '../services/api';

interface CheckoutStep {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
}

const STEPS: CheckoutStep[] = [
  { id: 1, title: 'Shipping', icon: Truck },
  { id: 2, title: 'Payment', icon: CreditCard },
  { id: 3, title: 'Confirmation', icon: CheckCircle },
];

const STATES = [
  { value: 'MH', label: 'Maharashtra' },
  { value: 'DL', label: 'Delhi' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'PB', label: 'Punjab' },
  { value: 'HR', label: 'Haryana' },
];

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    // Shipping
    firstName: user?.user_metadata?.name?.split(' ')[0] || '',
    lastName: user?.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    // Payment
    paymentMethod: 'razorpay',
    saveInfo: false,
  });

  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentRazorpay = async () => {
    if (!user) {
      alert('Please login to continue');
      return;
    }

    try {
      setProcessing(true);

      // Create Razorpay order
      const razorpayOrder = await createRazorpayOrder(Math.round(total * 100)); // Convert to paise

      // Initiate payment
      await initiateRazorpayPayment({
        amount: Math.round(total * 100), // Amount in paise
        orderId: razorpayOrder.orderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        onSuccess: async (response) => {
          // Payment successful - create order in database
          try {
            const orderData = {
              items: items.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
              shipping_address: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                address: formData.address,
                apartment: formData.apartment,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                phone: formData.phone,
              },
              payment_method: 'razorpay',
              payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const createdOrder = await ordersApi.create(orderData);
            setOrderId(createdOrder.id);
            
            // Clear cart
            clearCart();
            
            // Move to confirmation step
            setCurrentStep(3);
            setOrderComplete(true);
          } catch (error) {
            console.error('Failed to create order:', error);
            alert('Payment successful but failed to create order. Please contact support.');
          } finally {
            setProcessing(false);
          }
        },
        onFailure: (error) => {
          console.error('Payment failed:', error);
          alert(`Payment failed: ${error.description || 'Unknown error'}`);
          setProcessing(false);
        },
        onDismiss: () => {
          setProcessing(false);
        },
      });
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
      setProcessing(false);
    }
  };

  const handlePaymentCOD = async () => {
    if (!user) {
      alert('Please login to continue');
      return;
    }

    try {
      setProcessing(true);

      const orderData = {
        items: items.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
        },
        payment_method: 'cod',
      };

      const createdOrder = await ordersApi.create(orderData);
      setOrderId(createdOrder.id);
      
      clearCart();
      setCurrentStep(3);
      setOrderComplete(true);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.paymentMethod === 'razorpay') {
      await handlePaymentRazorpay();
    } else if (formData.paymentMethod === 'cod') {
      await handlePaymentCOD();
    }
  };

  // Redirect to cart if empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cart', href: '/cart' },
              { label: 'Checkout' },
            ]}
            className="mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-gray-900">
            Checkout
          </h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isActive || isCompleted
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium mt-2 ${
                        isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <form onSubmit={handleSubmitShipping} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />

                  <Textarea
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, P.O. Box, Company name"
                    required
                    rows={2}
                  />

                  <Input
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Select
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      options={STATES}
                      placeholder="Select state"
                      required
                    />
                    <Input
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Continue to Payment
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Payment Method
                </h2>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === 'razorpay'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary"
                      />
                      <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                      <div className="flex-1">
                        <span className="font-medium block">Card / UPI / Netbanking</span>
                        <span className="text-sm text-gray-500">Powered by Razorpay</span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary"
                      />
                      <Truck className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                      <div className="flex-1">
                        <span className="font-medium block">Cash on Delivery</span>
                        <span className="text-sm text-gray-500">Pay when you receive</span>
                      </div>
                    </label>
                  </div>

                  {/* Secure Payment Badge */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Secure SSL encrypted payment
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order - ₹{total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && orderComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg border border-gray-200 p-8 text-center"
              >
                <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-success-600" />
                </div>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                  Order Placed Successfully!
                </h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your order. We've sent a confirmation email to{' '}
                  <strong>{formData.email}</strong>
                </p>
                {orderId && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono font-semibold text-lg">{orderId.slice(0, 8).toUpperCase()}</p>
                  </div>
                )}
                <div className="flex gap-4 justify-center">
                  <Link to="/account?tab=orders">
                    <Button variant="primary" size="md">
                      View Orders
                    </Button>
                  </Link>
                  <Link to="/shop">
                    <Button variant="outline" size="md">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-sm">₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg text-sm text-primary-900">
                  Add ₹{(499 - subtotal).toFixed(2)} more for FREE shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
