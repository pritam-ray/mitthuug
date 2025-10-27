import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useProducts } from '../hooks';
import { useCart } from '../contexts/CartContext';

const CATEGORIES = [
  'All',
  'Classic Collection',
  'Spiced Collection',
  'Premium Collection',
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-150', label: 'Under ₹150' },
  { id: '150-250', label: '₹150 - ₹250' },
  { id: '250-500', label: 'Above ₹250' },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  // Calculate min/max price from selected range
  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  
  if (selectedPriceRange === 'under-150') {
    maxPrice = 150;
  } else if (selectedPriceRange === '150-250') {
    minPrice = 150;
    maxPrice = 250;
  } else if (selectedPriceRange === '250-500') {
    minPrice = 250;
  }

  // Fetch products with filters
  const { products, loading, error } = useProducts({
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    minPrice,
    maxPrice,
  });

  // Transform products for ProductCard component
  const transformedProducts = products.map(product => ({
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

  // Sort products
  let sortedProducts = [...transformedProducts];
  if (sortBy === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const handleAddToCart = (productId: string) => {
    const product = sortedProducts.find(p => p.id === productId);
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
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Shop Premium Jaggery Snacks
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our handcrafted collection of healthy, traditional treats made with pure jaggery
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedPriceRange === range.id
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'All' || selectedPriceRange !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange('all');
                }}
                className="w-full"
              >
                Clear All Filters
              </Button>
            )}
          </aside>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Results Count */}
                <div className="flex items-center gap-4">
                  <p className="text-gray-700">
                    {loading ? 'Loading...' : `${sortedProducts.length} products found`}
                  </p>
                  
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </button>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <label htmlFor="sort" className="text-gray-700 font-medium">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== 'All' || selectedPriceRange !== 'all') && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory !== 'All' && (
                    <Badge variant="primary" size="md">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  )}
                  {selectedPriceRange !== 'all' && (
                    <Badge variant="primary" size="md">
                      {PRICE_RANGES.find(r => r.id === selectedPriceRange)?.label}
                      <button
                        onClick={() => setSelectedPriceRange('all')}
                        className="ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-600 mb-4">Failed to load products</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <ProductGrid
                products={sortedProducts}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            )}

            {/* Empty State */}
            {!loading && !error && sortedProducts.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <p className="text-gray-600 text-lg mb-4">No products found</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-fixed lg:hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="bg-white h-full w-80 overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Range */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedPriceRange === range.id
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => setShowFilters(false)}
                className="w-full"
              >
                Show Results
              </Button>
              {(selectedCategory !== 'All' || selectedPriceRange !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('all');
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
