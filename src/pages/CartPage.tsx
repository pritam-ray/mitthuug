import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  slug: string;
}

// Mock cart data
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    productId: '1',
    name: 'Classic Gud Bites',
    image: '/products/classic.jpg',
    price: 149,
    quantity: 2,
    maxQuantity: 10,
    slug: 'classic-gud-bites',
  },
  {
    id: '2',
    productId: '2',
    name: 'Cardamom Gud Bites',
    image: '/products/cardamom.jpg',
    price: 169,
    quantity: 1,
    maxQuantity: 10,
    slug: 'cardamom-gud-bites',
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(MOCK_CART_ITEMS);
  const [couponCode, setCouponCode] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, newQuantity)) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.trim());
      setCouponCode('');
      // Will implement real coupon validation
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cart' },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any gud bites to your cart yet.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cart' },
            ]}
            className="mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                      <Link to={`/product/${item.slug}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-error hover:text-error/80 transition-colors mt-2 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center mb-4 md:mb-0">
                      <span className="md:hidden font-semibold text-gray-700">Price: </span>
                      <span className="font-semibold text-gray-900">₹{item.price}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="md:col-span-3 flex justify-center mb-4 md:mb-0">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="md:col-span-2 text-right">
                      <span className="md:hidden font-semibold text-gray-700">Total: </span>
                      <span className="font-bold text-primary text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/shop">
                <Button variant="outline" size="md">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-2">
                  Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="md" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="success" size="sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {appliedCoupon} applied
                    </Badge>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-xs text-error hover:text-error/80"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-success font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 499 && (
                  <p className="text-xs text-gray-500">
                    Add ₹{(499 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <span className="font-display text-lg font-bold text-gray-900">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
