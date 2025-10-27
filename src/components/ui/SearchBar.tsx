import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { useProducts } from '../../hooks';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch products for suggestions (limited to 5)
  const { products, loading } = useProducts({ 
    search: searchQuery,
    limit: 5 
  });

  // Focus input when search bar opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Show suggestions when there's a query and results
  useEffect(() => {
    setShowSuggestions(searchQuery.length > 0 && products.length > 0);
  }, [searchQuery, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      handleClose();
    }
  };

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 999997 }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto px-4 py-6">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-14 pr-14 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-w-3xl mx-auto"
                    style={{ zIndex: 999998 }}
                  >
                    {loading ? (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                      </div>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-2">
                          <p className="text-sm text-gray-500 px-4 py-2 font-medium">
                            Suggested Products
                          </p>
                          {products.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleProductClick(product.slug)}
                              className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                            >
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {product.category}
                                </p>
                              </div>
                              <p className="font-semibold text-primary-600">
                                ₹{product.price}
                              </p>
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 p-3">
                          <button
                            onClick={handleSearch}
                            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Quick Links */}
            <div className="max-w-3xl mx-auto mt-6">
              <p className="text-sm text-gray-500 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Jaggery Powder', 'Gud Ladoo', 'Til Gud', 'Peanut Chikki'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;
