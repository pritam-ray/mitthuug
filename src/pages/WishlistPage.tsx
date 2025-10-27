import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const WishlistPage: React.FC = () => {
  const { items, loading, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (item: any) => {
    if (item.products) {
      addItem({
        id: `cart-${item.product_id}`,
        productId: item.product_id,
        name: item.products.name,
        image: item.products.image_url,
        price: item.products.price,
        quantity: 1,
      });
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your wishlist
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Wishlist' },
            ]}
            className="mb-6"
          />

          <div className="text-center max-w-md mx-auto py-16">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Wishlist' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {item.products && (
                <>
                  {/* Product Image */}
                  <Link to={`/product/${item.product_id}`} className="block aspect-square overflow-hidden">
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="p-4">
                    <Link 
                      to={`/product/${item.product_id}`}
                      className="block mb-2"
                    >
                      <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                        {item.products.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-primary-600">
                        ₹{item.products.price}
                      </p>
                      {item.products.stock > 0 ? (
                        <span className="text-sm text-green-600 font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        disabled={item.products.stock === 0}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
