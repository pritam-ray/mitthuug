import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Sample product data - will be replaced with Supabase data
const ALL_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Gud Bites',
    slug: 'classic-gud-bites',
    price: 149,
    compareAtPrice: 199,
    image: '/products/classic.jpg',
    badge: { text: 'Bestseller', variant: 'primary' as const },
    rating: 4.8,
    reviewCount: 124,
    category: 'classic',
  },
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
    category: 'flavored',
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
    category: 'premium',
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
    category: 'combo',
  },
  {
    id: '5',
    name: 'Premium Gift Box',
    slug: 'premium-gift-box',
    price: 799,
    compareAtPrice: 999,
    image: '/products/gift-box.jpg',
    badge: { text: 'Premium', variant: 'secondary' as const },
    rating: 4.9,
    reviewCount: 31,
    category: 'gift',
  },
  {
    id: '6',
    name: 'Coconut Gud Bites',
    slug: 'coconut-gud-bites',
    price: 169,
    image: '/products/coconut.jpg',
    rating: 4.6,
    reviewCount: 28,
    category: 'flavored',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Products', count: 6 },
  { id: 'classic', label: 'Classic', count: 1 },
  { id: 'flavored', label: 'Flavored', count: 2 },
  { id: 'premium', label: 'Premium', count: 1 },
  { id: 'combo', label: 'Combo Packs', count: 1 },
  { id: 'gift', label: 'Gift Boxes', count: 1 },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-200', label: 'Under ₹200', min: 0, max: 200 },
  { id: '200-500', label: '₹200 - ₹500', min: 200, max: 500 },
  { id: 'above-500', label: 'Above ₹500', min: 500, max: Infinity },
];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);

  useEffect(() => {
    let filtered = ALL_PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find(r => r.id === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price < range.max
        );
      }
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPriceRange]);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Will integrate with CartContext
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    // Will open quick view modal
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedPriceRange !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop' },
            ]}
            className="mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-gray-900">
            Shop All Products
          </h1>
          <p className="text-gray-600 mt-2">
            Premium jaggery-based snacks crafted with pure ingredients
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Active Filters</h3>
                    <Badge variant="primary" size="sm" pill>
                      {activeFiltersCount}
                    </Badge>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Categories */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{category.label}</span>
                      <span className={`text-xs ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                        selectedPriceRange === range.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                size="md"
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="primary" size="sm" pill className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              showFilters={false}
            />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more products
                </p>
                <Button variant="primary" size="md" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-modal lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Filters Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Active Filters</h3>
                    <Badge variant="primary" size="sm" pill>
                      {activeFiltersCount}
                    </Badge>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{category.label}</span>
                      <span className={`text-xs ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                        selectedPriceRange === range.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full"
              >
                Show {filteredProducts.length} Products
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
