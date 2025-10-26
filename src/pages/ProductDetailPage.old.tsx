import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Truck, Shield, Award, Plus, Minus } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductGallery from '../components/product/ProductGallery';
import ProductDetails from '../components/product/ProductDetails';
import Reviews from '../components/product/Reviews';
import ProductCard from '../components/product/ProductCard';

// Mock product data - will be replaced with Supabase data
const PRODUCT_DATA: any = {
  'classic-gud-bites': {
    id: '1',
    name: 'Classic Gud Bites',
    slug: 'classic-gud-bites',
    price: 149,
    compareAtPrice: 199,
    images: [
      '/products/classic-1.jpg',
      '/products/classic-2.jpg',
      '/products/classic-3.jpg',
      '/products/classic-4.jpg',
    ],
    description: `Experience the pure, unadulterated taste of tradition with our Classic Gud Bites. 

Handcrafted using age-old recipes, each bite is a perfect balance of jaggery's natural sweetness and the wholesome goodness of roasted peanuts. No artificial flavors, no preservatives – just honest, delicious snacking the way nature intended.

Perfect for:
• Tea-time indulgence
• Post-meal dessert
• Healthy energy boost
• Gift for loved ones

Every batch is made fresh in small quantities to ensure maximum freshness and flavor. The jaggery we use is sourced from organic sugarcane farms, ensuring you get the highest quality gud (jaggery) in every bite.`,
    ingredients: [
      'Organic Jaggery (Gud) - 60%',
      'Roasted Peanuts - 30%',
      'Ghee (Clarified Butter) - 8%',
      'Cardamom Powder - 2%',
    ],
    nutritionFacts: {
      servingSize: '30g (approx 4-5 pieces)',
      calories: 140,
      protein: '4g',
      carbohydrates: '18g',
      fat: '6g',
      fiber: '2g',
      sugar: '14g (naturally occurring)',
    },
    storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight. Best consumed within 30 days of opening.',
    shelfLife: '3 months from date of manufacture',
    allergenInfo: 'Contains: Peanuts, Milk (Ghee). May contain traces of other nuts.',
    inStock: true,
    stock: 45,
    badge: { text: 'Bestseller', variant: 'primary' },
  },
};

const MOCK_REVIEWS = [
  {
    id: '1',
    author: 'Priya Sharma',
    rating: 5,
    date: '2025-10-15',
    title: 'Absolutely delicious!',
    comment: 'These gud bites remind me of my childhood. The perfect balance of sweetness and the peanut crunch is just amazing. I\'ve already ordered my second batch!',
    verified: true,
    helpful: 24,
  },
  {
    id: '2',
    author: 'Rahul Patel',
    rating: 5,
    date: '2025-10-10',
    title: 'Healthy and tasty',
    comment: 'Finally, a snack that doesn\'t compromise on health. Pure jaggery taste with no artificial ingredients. My entire family loves it!',
    verified: true,
    helpful: 18,
  },
  {
    id: '3',
    author: 'Anjali Desai',
    rating: 4,
    date: '2025-10-05',
    title: 'Great quality',
    comment: 'Very good quality gud bites. The packaging is excellent and the product arrived fresh. Would have given 5 stars but the pieces are slightly smaller than expected.',
    verified: true,
    helpful: 12,
  },
];

const RELATED_PRODUCTS = [
  {
    id: '2',
    name: 'Cardamom Gud Bites',
    slug: 'cardamom-gud-bites',
    price: 169,
    compareAtPrice: 219,
    image: '/products/cardamom.jpg',
    badge: { text: 'New', variant: 'success' as const },
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: '3',
    name: 'Almond Gud Bites',
    slug: 'almond-gud-bites',
    price: 189,
    compareAtPrice: 249,
    image: '/products/almond.jpg',
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: '4',
    name: 'MitthuuG Trial Pack',
    slug: 'trial-pack',
    price: 299,
    image: '/products/trial-pack.jpg',
    badge: { text: 'Great Value', variant: 'warning' as const },
    rating: 5.0,
    reviewCount: 43,
  },
];

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get product data
  const product = PRODUCT_DATA[slug || 'classic-gud-bites'];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    console.log('Add to cart:', product.id, 'Quantity:', quantity);
    // Will integrate with CartContext
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product.id, 'Quantity:', quantity);
    // Will add to cart and redirect to checkout
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
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div>
            {product.badge && (
              <Badge variant={product.badge.variant} size="md" className="mb-4">
                {product.badge.text}
              </Badge>
            )}

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.compareAtPrice}
                  </span>
                  <Badge variant="error" size="sm">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-success">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-medium">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-error">
                  <div className="w-2 h-2 bg-error rounded-full" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {product.description.split('\n\n')[0]}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <strong className="text-primary">₹{(product.price * quantity).toFixed(2)}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-error text-error' : ''}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Quality Assured</p>
                  <p className="text-xs text-gray-600">100% Natural</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Handcrafted</p>
                  <p className="text-xs text-gray-600">Small batch</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mb-16">
          <ProductDetails
            description={product.description}
            ingredients={product.ingredients}
            nutritionFacts={product.nutritionFacts}
            storageInstructions={product.storageInstructions}
            shelfLife={product.shelfLife}
            allergenInfo={product.allergenInfo}
          />
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <Reviews
            reviews={MOCK_REVIEWS}
            averageRating={4.8}
            totalReviews={124}
            ratingDistribution={{ 5: 98, 4: 20, 3: 4, 2: 1, 1: 1 }}
            onWriteReview={() => console.log('Write review')}
          />
        </div>

        {/* Related Products */}
        <div>
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
              You May Also Like
            </h2>
            <p className="text-gray-600">
              More delicious options from our collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={relatedProduct}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                  onQuickView={(id) => console.log('Quick view:', id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
