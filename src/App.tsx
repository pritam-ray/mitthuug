import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './components/ui/Toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import ProtectedRoute from './components/routing/ProtectedRoute';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import FAQPage from './pages/FAQPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import BlogPage from './pages/BlogPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock cart data - will be replaced with CartContext
  const mockCartItems = [
    {
      id: '1',
      productId: 'classic-gud-bites',
      name: 'Classic Gud Bites',
      image: '/products/classic.jpg',
      price: 149,
      quantity: 2,
      maxQuantity: 10,
    },
  ];

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    console.log('Update quantity:', itemId, quantity);
    // Will be handled by CartContext
  };

  const handleRemoveItem = (itemId: string) => {
    console.log('Remove item:', itemId);
    // Will be handled by CartContext
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header
                cartItemCount={mockCartItems.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
              />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/account" 
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
              </main>

              <Footer />

              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={mockCartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
