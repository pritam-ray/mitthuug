import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, Shield, Award, Plus, Minus, Star, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductGallery from '../components/product/ProductGallery';
import ProductDetails from '../components/product/ProductDetails';
import Reviews from '../components/product/Reviews';
import ProductCard from '../components/product/ProductCard';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useReviews } from '../hooks/useReviews';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import LoginSignupModal from '../components/auth/LoginSignupModal';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch product data
  const { product, loading: productLoading, error: productError } = useProduct(slug || '', 'slug');
  
  // Fetch reviews
  const { 
    reviews, 
    averageRating, 
    totalReviews,
    ratingDistribution 
  } = useReviews(product?.id || '');
  
  // Fetch related products (same category)
  const { products: relatedProducts } = useProducts({
    category: product?.category,
    autoFetch: !!product?.category,
  });

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <p className="text-gray-600 mb-6">
            {productError?.message || 'The product you are looking for does not exist.'}
          </p>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  // Prepare product images
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image_url];

  // Get badge
  const productBadge = product.is_bestseller
    ? { text: 'Bestseller', variant: 'primary' as const }
    : product.is_new
    ? { text: 'New', variant: 'success' as const }
    : undefined;

  // Filter out current product from related products
  const filteredRelatedProducts = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      quantity: quantity,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      quantity: quantity,
    });
    navigate('/checkout');
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      // Show auth modal
      setShowAuthModal(true);
      return;
    }

    if (!product) return;

    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={productImages} productName={product.name} />
          </div>

          {/* Product Details */}
          <div>
            {productBadge && (
              <Badge variant={productBadge.variant} size="md" className="mb-4">
                {productBadge.text}
              </Badge>
            )}

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {totalReviews > 0 && (
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({totalReviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.compare_at_price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.compare_at_price}
                    </span>
                    <Badge variant="success" size="sm">
                      Save {discount}%
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center text-success-600">
                  <div className="w-2 h-2 bg-success-600 rounded-full mr-2"></div>
                  <span className="font-medium">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center text-danger-600">
                  <div className="w-2 h-2 bg-danger-600 rounded-full mr-2"></div>
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock} items available
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <div className="flex space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={product && isInWishlist(product.id) ? 'border-primary-600 text-primary-600' : ''}
                >
                  <Heart
                    className={`w-5 h-5 ${product && isInWishlist(product.id) ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              {product.stock > 0 && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleBuyNow}
                  className="w-full"
                >
                  Buy Now
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Free Delivery
                  </h3>
                  <p className="text-xs text-gray-600">
                    On orders above ₹500
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    100% Authentic
                  </h3>
                  <p className="text-xs text-gray-600">
                    Quality guaranteed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Handcrafted
                  </h3>
                  <p className="text-xs text-gray-600">
                    Made with love
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <ProductDetails
            description={product.description}
            ingredients={product.ingredients ? product.ingredients.split('\n') : []}
            nutritionFacts={product.nutrition_info ? {
              servingSize: product.nutrition_info.servingSize || '30g',
              calories: Number(product.nutrition_info.calories) || 0,
              protein: product.nutrition_info.protein || '0g',
              carbohydrates: product.nutrition_info.carbohydrates || '0g',
              fat: product.nutrition_info.fat || '0g',
              fiber: product.nutrition_info.fiber || '0g',
              sugar: product.nutrition_info.sugar || '0g',
            } : undefined}
          />
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <Reviews
            reviews={reviews.map((review) => ({
              id: review.id,
              author: review.users?.user_metadata?.name || review.users?.email?.split('@')[0] || 'Anonymous',
              rating: review.rating,
              date: new Date(review.created_at).toISOString().split('T')[0],
              title: review.title,
              comment: review.comment,
              verified: review.verified_purchase,
              helpful: review.helpful_count,
            }))}
            averageRating={averageRating}
            totalReviews={totalReviews}
            ratingDistribution={{
              5: ratingDistribution.find(r => r.stars === 5)?.count || 0,
              4: ratingDistribution.find(r => r.stars === 4)?.count || 0,
              3: ratingDistribution.find(r => r.stars === 3)?.count || 0,
              2: ratingDistribution.find(r => r.stars === 2)?.count || 0,
              1: ratingDistribution.find(r => r.stars === 1)?.count || 0,
            }}
          />
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    slug: relatedProduct.slug,
                    price: relatedProduct.price,
                    compareAtPrice: relatedProduct.compare_at_price,
                    image: relatedProduct.image_url,
                    badge: relatedProduct.is_bestseller
                      ? { text: 'Bestseller', variant: 'primary' as const }
                      : relatedProduct.is_new
                      ? { text: 'New', variant: 'success' as const }
                      : undefined,
                    rating: relatedProduct.rating || 0,
                    reviewCount: relatedProduct.review_count || 0,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Auth Modal */}
      <LoginSignupModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
