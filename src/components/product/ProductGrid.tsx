import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Select from '../ui/Select';
import { SlidersHorizontal } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: {
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  rating?: number;
  reviewCount?: number;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  showFilters?: boolean;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onAddToCart, 
  onQuickView,
  showFilters = true 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
      case 'featured':
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div>
      {/* Filters & Sort Bar */}
      {showFilters && (
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
            <p className="text-gray-600">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              size="md"
            />
          </div>
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
