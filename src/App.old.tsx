import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Heart, Sparkles, Package, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Star, ChevronRight, CheckCircle, Plus, Minus, Trash2, User, LogIn } from 'lucide-react';
import { supabase } from './lib/supabase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { trackPageView } from './lib/analytics';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfile } from './components/auth/UserProfile';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  image_url: string;
  images: string[];
  stock: number;
  in_stock: boolean;
  featured: boolean;
  nutrition_facts: any;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  verified_purchase: boolean;
}

function Navigation({ onCartClick, onNavigate, cartCount, onAuthClick, onProfileClick }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, userProfile, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => onNavigate('home')} className="text-3xl font-serif font-bold text-brand-jaggery">
            MitthuuG
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-brand-dark hover:text-brand-gold transition-colors font-medium">Home</button>
            <button onClick={() => onNavigate('shop')} className="text-brand-dark hover:text-brand-gold transition-colors font-medium">Shop</button>
            <button onClick={() => onNavigate('promise')} className="text-brand-dark hover:text-brand-gold transition-colors font-medium">Our Promise</button>
            <button onClick={() => onNavigate('about')} className="text-brand-dark hover:text-brand-gold transition-colors font-medium">About</button>
            {isAdmin && (
              <button onClick={() => onNavigate('admin')} className="text-brand-gold hover:text-brand-jaggery transition-colors font-semibold">Dashboard</button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onCartClick} className="relative p-2 hover:bg-brand-cream rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-brand-jaggery" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button onClick={onProfileClick} className="flex items-center space-x-2 px-4 py-2 bg-brand-jaggery text-white rounded-full hover:bg-brand-gold transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{userProfile?.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button onClick={onAuthClick} className="flex items-center space-x-2 px-4 py-2 bg-brand-jaggery text-white rounded-full hover:bg-brand-gold transition-colors">
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-brand-cream rounded-lg transition-colors">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-brand-sand bg-white">
          <div className="px-4 py-3 space-y-2">
            {['home', 'shop', 'promise', 'about'].map((view) => (
              <button key={view} onClick={() => { onNavigate(view); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-brand-dark hover:bg-brand-cream rounded-lg transition-colors capitalize">
                {view}
              </button>
            ))}
            {isAdmin && (
              <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-brand-gold hover:bg-brand-cream rounded-lg transition-colors font-semibold">
                Dashboard
              </button>
            )}
            {!isAuthenticated && (
              <button onClick={() => { onAuthClick(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 bg-brand-jaggery text-white hover:bg-brand-gold rounded-lg transition-colors">
                Sign In
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Hero({ onShopClick }: any) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-sand via-brand-cream to-brand-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8753560/pexels-photo-8753560.jpeg')] bg-cover bg-center opacity-5"></div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-gold/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-brand-sand/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-brand-cream/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="inline-block px-4 py-2 bg-brand-cream text-brand-jaggery rounded-full text-sm font-semibold tracking-wide">
              TRADITION REIMAGINED
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-jaggery leading-tight">
            GUD Bites
            <br />
            <span className="text-brand-gold">Traditional sweets, reworked for everyday snacking</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-brand-dark/80 leading-relaxed">
            Handcrafted from pure jaggery and roasted seeds — your new go-to snack for every season
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button onClick={onShopClick}
              className="group px-8 py-4 bg-brand-jaggery text-white rounded-3xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <span>Shop Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById('promise')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-brand-jaggery rounded-3xl font-semibold text-lg shadow-md hover:shadow-xl border-2 border-brand-jaggery transform hover:-translate-y-1 transition-all duration-300">
              Our Promise
            </button>
          </motion.div>

          <div className="pt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[{ label: '100%', sub: 'Natural' }, { label: 'Hand', sub: 'Crafted' }, { label: 'Zero', sub: 'Additives' }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }} className="text-center">
                <div className="text-3xl font-bold text-brand-gold">{item.label}</div>
                <div className="text-sm text-brand-dark/70 mt-1">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-brand-sand/30">
      <div className="relative aspect-square overflow-hidden bg-brand-cream">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        {product.featured && (
          <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}
        {product.stock < 20 && product.stock > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Almost Gone!
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-brand-jaggery mb-2 group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-dark/70 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-brand-jaggery">₹{product.price}</span>
            <span className="text-brand-dark/50 text-sm ml-1">/pack</span>
          </div>

          <button onClick={() => onAddToCart(product)} disabled={!product.in_stock}
            className="px-6 py-3 bg-brand-jaggery text-white rounded-full font-semibold flex items-center space-x-2 hover:bg-brand-gold transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PromiseSection() {
  const promises = [
    { icon: Heart, title: 'Pure Ingredients', desc: 'No preservatives, just honest goodness' },
    { icon: Sparkles, title: 'Small Batch Craft', desc: 'Always fresh, always premium' },
    { icon: Package, title: 'Sustainable Packaging', desc: 'Guilt-free indulgence' },
  ];

  return (
    <section id="promise" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-jaggery mb-4">Our Promise</h2>
          <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">Crafted with care, delivered with love</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-gradient-to-br from-brand-cream to-brand-sand/30 rounded-3xl hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-jaggery rounded-full mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-serif font-bold text-brand-jaggery mb-3">{item.title}</h4>
              <p className="text-brand-dark/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-20 bg-brand-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg" alt="Story" className="rounded-3xl shadow-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-4xl font-serif font-bold text-brand-jaggery">
              From your grandmother's kitchen to your desk drawer
            </h3>
            <p className="text-brand-dark/80 leading-relaxed text-lg">
              We kept the taste of home, not the stickiness. MitthuuG revives forgotten flavors of India,
              making heritage snackable for today's lifestyle.
            </p>
            <p className="text-brand-dark/80 leading-relaxed">
              Every batch is handcrafted using organic jaggery and premium ingredients — no compromises,
              just authentic goodness that honors tradition while embracing modernity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-jaggery mb-4">What Our Customers Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-brand-cream p-6 rounded-2xl">
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <h4 className="font-semibold text-brand-jaggery mb-2">{review.title}</h4>
              <p className="text-sm text-brand-dark/70 mb-3">{review.text}</p>
              <p className="text-xs text-brand-dark/50">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner({ onShopClick }: any) {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-jaggery via-brand-gold to-brand-jaggery text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-serif font-bold mb-6">
          Snack Better, the Indian Way
        </motion.h2>
        <motion.button onClick={onShopClick} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="px-10 py-4 bg-white text-brand-jaggery rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          Shop GUD Bites Now
        </motion.button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-jaggery text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-gold mb-4">MitthuuG</h3>
            <p className="text-brand-cream/80 leading-relaxed">Redefining traditional Indian sweets with premium quality and modern aesthetics.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Shop', 'Our Story', 'Contact Us', 'FAQs'].map((link) => (
                <li key={link}><a href="#" className="text-brand-cream/70 hover:text-brand-gold transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3"><Mail className="w-5 h-5 text-brand-gold mt-0.5" /><span className="text-brand-cream/70">hello@mitthuug.com</span></li>
              <li className="flex items-start space-x-3"><Phone className="w-5 h-5 text-brand-gold mt-0.5" /><span className="text-brand-cream/70">+91 98765 43210</span></li>
              <li className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-brand-gold mt-0.5" /><span className="text-brand-cream/70">Mumbai, India</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-brand-jaggery/50 rounded-full hover:bg-brand-gold transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-cream/20 pt-8 text-center text-brand-cream/60">
          <p>&copy; 2024 MitthuuG. All rights reserved. Crafted with love.</p>
        </div>
      </div>
    </footer>
  );
}

function Cart({ isOpen, onClose, onCheckout }: any) {
  const { cart, removeFromCart, updateQuantity, subtotal, tax, deliveryFee, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-brand-sand">
          <h2 className="text-2xl font-serif font-bold text-brand-jaggery">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-brand-sand mb-4" />
            <h3 className="text-xl font-semibold text-brand-jaggery mb-2">Your cart is empty</h3>
            <p className="text-brand-dark/60 mb-6">Add some delicious gud bites to get started!</p>
            <button onClick={onClose} className="px-6 py-3 bg-brand-jaggery text-white rounded-full font-semibold hover:bg-brand-gold transition-all">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-4 bg-brand-cream rounded-2xl p-4">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-brand-jaggery truncate">{item.name}</h3>
                    <p className="text-brand-gold font-bold mt-1">₹{item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white rounded transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white rounded transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors self-start">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-sand p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-brand-sand pt-3">
                <span>Total</span>
                <span className="text-brand-gold">₹{cartTotal.toFixed(2)}</span>
              </div>

              <button onClick={() => { onCheckout(); onClose(); }}
                className="w-full px-6 py-4 bg-brand-jaggery text-white rounded-full font-semibold text-lg hover:bg-brand-gold transform hover:-translate-y-1 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

function Checkout({ isOpen, onClose, onNeedAuth }: any) {
  const { cart, cartTotal, subtotal, tax, deliveryFee, clearCart } = useCart();
  const { isAuthenticated, userProfile } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone || prev.phone,
      }));
    }
  }, [isAuthenticated, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onNeedAuth();
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNum = `MG${Date.now()}`;
      const { error } = await supabase.from('orders').insert({
        order_number: orderNum,
        user_id: userProfile?.id || null,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        items: cart,
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        total_amount: cartTotal,
        notes: formData.notes,
      });

      if (error) throw error;

      setOrderNumber(orderNum);
      setOrderComplete(true);
      clearCart();

      setTimeout(() => {
        setOrderComplete(false);
        setFormData({ name: '', email: '', phone: '', address: '', notes: '' });
        onClose();
      }, 4000);
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {!isAuthenticated ? (
            <div className="p-12 text-center">
              <User className="w-20 h-20 text-brand-gold mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-brand-jaggery mb-4">Sign In Required</h2>
              <p className="text-brand-dark/70 mb-6">Please sign in or create an account to place your order.</p>
              <button onClick={() => { onNeedAuth(); onClose(); }}
                className="px-8 py-3 bg-brand-jaggery text-white rounded-full font-semibold hover:bg-brand-gold transition-all">
                Sign In / Sign Up
              </button>
            </div>
          ) : orderComplete ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-brand-jaggery mb-4">Order Confirmed!</h2>
              <p className="text-brand-dark/70 text-lg mb-2">Order #{orderNumber}</p>
              <p className="text-brand-dark/60">Thank you for your order. We'll send you a confirmation email shortly.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-6 border-b border-brand-sand">
                <h2 className="text-2xl font-serif font-bold text-brand-jaggery">Checkout</h2>
                <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    {cart.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-brand-dark/70">{item.name} x {item.quantity}</span>
                        <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-brand-sand pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-gold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: 'Full Name', type: 'text', value: 'name', placeholder: 'John Doe' },
                    { label: 'Email', type: 'email', value: 'email', placeholder: 'john@example.com' },
                    { label: 'Phone', type: 'tel', value: 'phone', placeholder: '+91 98765 43210' },
                  ].map((field) => (
                    <div key={field.value}>
                      <label className="block text-sm font-semibold text-brand-jaggery mb-2">{field.label}</label>
                      <input type={field.type} required value={formData[field.value as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.value]: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder={field.placeholder} />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-brand-jaggery mb-2">Shipping Address</label>
                    <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3} className="w-full px-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors resize-none"
                      placeholder="Enter your full address"></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-brand-jaggery text-white rounded-full font-semibold text-lg hover:bg-brand-gold transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const { addToCart, cartCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    fetchData();
    trackPageView();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [currentView]);

  const fetchData = async () => {
    try {
      const [productsRes, reviewsRes] = await Promise.all([
        supabase.from('products').select('*').order('featured', { ascending: false }),
        supabase.from('reviews').select('*').eq('status', 'approved').limit(4),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (reviewsRes.error) throw reviewsRes.error;

      setProducts(productsRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      <Navigation
        onCartClick={() => setCartOpen(true)}
        onNavigate={setCurrentView}
        cartCount={cartCount}
        onAuthClick={() => setAuthModalOpen(true)}
        onProfileClick={() => setProfileOpen(true)}
      />

      {currentView === 'home' && (
        <>
          <Hero onShopClick={() => setCurrentView('shop')} />
          <section id="featured" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-jaggery mb-4">Featured Collection</h2>
                <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">Discover our most loved gud bites</p>
              </motion.div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <button onClick={() => setCurrentView('shop')}
                  className="px-8 py-4 bg-brand-jaggery text-white rounded-full font-semibold text-lg shadow-lg hover:bg-brand-gold transform hover:-translate-y-1 transition-all">
                  View All Products
                </button>
              </div>
            </div>
          </section>
          <PromiseSection />
          <StorySection />
          <ReviewsSection reviews={reviews} />
          <CTABanner onShopClick={() => setCurrentView('shop')} />
        </>
      )}

      {currentView === 'shop' && (
        <div className="pt-24 pb-20 min-h-screen bg-brand-sand/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-jaggery mb-4">Shop GUD Bites</h1>
              <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">Explore our complete range of artisan gud bites</p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {currentView === 'promise' && (
        <div className="pt-24 pb-20 min-h-screen">
          <PromiseSection />
        </div>
      )}

      {currentView === 'about' && (
        <div className="pt-24 pb-20 min-h-screen">
          <StorySection />
        </div>
      )}

      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => setCheckoutOpen(true)} />
      <Checkout isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} onNeedAuth={() => { setCheckoutOpen(false); setAuthModalOpen(true); }} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
