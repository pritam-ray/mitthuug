import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-modal"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-modal flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Your Cart</h2>
                <Badge variant="primary" size="sm" pill>
                  {items.length}
                </Badge>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item.productId}`}
                        onClick={onClose}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={onClose}
                          className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-lg font-bold text-primary mb-2">
                          ₹{item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto p-1 text-error hover:bg-error/10 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some delicious gud bites to get started!
                  </p>
                  <Link to="/shop">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={onClose}
                    >
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? 'text-success font-medium' : 'font-medium'}>
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
                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                  <span className="font-display text-lg font-bold">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={onClose}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/cart" className="block">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={onClose}
                  >
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
