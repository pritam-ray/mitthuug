import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Leaf, Award, TruckIcon, Shield, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import Badge from '../components/ui/Badge';
import NewsletterForm from '../components/ui/NewsletterForm';
import { useProducts } from '../hooks';
import { useCart } from '../contexts/CartContext';

function HomePage() {
  // All hooks must be called at the top level, before any early returns
  const { products: featuredProducts, loading, error } = useProducts({ 
    featured: true 
  });
  const { addItem } = useCart();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-red-600 mb-2 font-semibold">Error loading products</p>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Transform products for ProductCard component
  const transformedProducts = featuredProducts.map(product => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    compareAtPrice: product.compare_at_price || undefined,
    image: product.image_url,
    badge: product.is_new 
      ? { text: 'New', variant: 'success' as const }
      : product.is_bestseller 
      ? { text: 'Bestseller', variant: 'primary' as const }
      : undefined,
    rating: product.rating || 0,
    reviewCount: product.review_count || 0,
  }));

  const handleAddToCart = (productId: string) => {
    const product = transformedProducts.find(p => p.id === productId);
    if (product) {
      addItem({
        id: `cart_${productId}_${Date.now()}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        discount: product.compareAtPrice 
          ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
          : undefined,
        quantity: 1,
      });
    }
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    // Will open quick view modal
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <Badge variant="primary" size="md" className="mb-6 inline-block">
                🌿 100% Natural & Preservative-Free
              </Badge>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Taste the Sweetness of{' '}
                <span className="text-primary-600 block mt-2">Tradition</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Premium jaggery-based snacks crafted with pure ingredients and time-honored recipes. 
                Experience the perfect balance of health and indulgence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/shop">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Shop Now
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Our Story
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">4.9/5</p>
                  <p className="text-sm text-gray-600">500+ Reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=1200&h=1200&fit=crop"
                  alt="MitthuuG Premium Gud Bites"
                  className="w-full rounded-3xl shadow-2xl"
                />
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">100% Natural</p>
                      <p className="text-xs text-gray-600">No Preservatives</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">Premium</p>
                      <p className="text-xs text-gray-600">Handcrafted</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>

      {/* USPs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: 'Made with Love',
                description: 'Traditional recipes passed down through generations',
              },
              {
                icon: TruckIcon,
                title: 'Free Shipping',
                description: 'On orders above ₹499 across India',
              },
              {
                icon: Shield,
                title: 'Quality Assured',
                description: '100% satisfaction guarantee or money back',
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <usp.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">{usp.title}</h3>
                <p className="text-gray-700">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="primary" size="md" className="mb-6">
                ⭐ Bestsellers
              </Badge>
              <h2 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Our Premium Collection
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked favorites loved by thousands. Pure jaggery, pure bliss.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {transformedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                View All Products
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1606312619070-d48b4cdb0e3f?w=1200&h=800&fit=crop"
                alt="MitthuuG Story"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-200 rounded-3xl -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" size="md" className="mb-6">
                Our Story
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Reviving Ancient Wisdom for Modern Wellness
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                MitthuuG was born from a simple belief: healthy snacking shouldn't compromise on taste. 
                Using traditional recipes and pure jaggery, we craft snacks that honor our heritage while 
                nourishing your body.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every bite is a celebration of natural ingredients, time-honored techniques, and the 
                sweetness of tradition. Join us in rediscovering the joy of pure, wholesome indulgence.
              </p>
              <Link to="/about">
                <Button variant="primary" size="lg">
                  Read Our Story
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Join the MitthuuG Family
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Get exclusive recipes, health tips, and 10% off your first order!
            </p>
            <NewsletterForm />
            <p className="text-sm text-white/70 mt-6">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
