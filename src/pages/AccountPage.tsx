import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, LogOut, Loader2, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { useWishlist } from '../hooks/useWishlist';

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile' | 'settings';

const AccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { items: wishlistItems, loading: wishlistLoading, removeFromWishlist } = useWishlist();
  
  const initialTab = (searchParams.get('tab') as Tab) || 'orders';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const tabs = [
    { id: 'orders' as Tab, label: 'Orders', icon: Package, count: orders.length },
    { id: 'wishlist' as Tab, label: 'Wishlist', icon: Heart, count: wishlistItems.length },
    { id: 'addresses' as Tab, label: 'Addresses', icon: MapPin },
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'shipped':
      case 'out_for_delivery':
        return 'info';
      case 'processing':
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'My Account' },
            ]}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900">
                My Account
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, {userName}!</p>
            </div>
            <Button variant="outline" size="md" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      {tab.count !== undefined && (
                        <Badge
                          variant={activeTab === tab.id ? 'secondary' : 'outline'}
                          size="sm"
                          pill
                        >
                          {tab.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Order History
                  </h2>

                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Link to="/shop">
                        <Button variant="primary" size="md">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  Order #{order.id.slice(0, 8).toUpperCase()}
                                </h3>
                                <Badge variant={getStatusColor(order.status)} size="sm">
                                  {getStatusLabel(order.status)}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                  Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                                <p>
                                  {order.order_items?.length || 0} items • ₹{order.total.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/account/order/${order.id}`)}
                              >
                                View Details
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="primary" size="sm">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Order Items Preview */}
                          {order.order_items && order.order_items.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex gap-2 overflow-x-auto">
                                {order.order_items.slice(0, 3).map((item) => (
                                  <div key={item.id} className="flex-shrink-0">
                                    <img
                                      src={item.products?.image_url || '/placeholder.jpg'}
                                      alt={item.products?.name || 'Product'}
                                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                    />
                                  </div>
                                ))}
                                {order.order_items.length > 3 && (
                                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-600 font-medium">
                                    +{order.order_items.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  My Wishlist
                </h2>

                {wishlistLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Save items you love for later
                    </p>
                    <Link to="/shop">
                      <Button variant="primary" size="md">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                      >
                        <div className="flex gap-4">
                          <Link to={`/product/${item.products?.id}`} className="flex-shrink-0">
                            <img
                              src={item.products?.image_url || '/placeholder.jpg'}
                              alt={item.products?.name || 'Product'}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.products?.id}`}>
                              <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors truncate">
                                {item.products?.name || 'Unknown Product'}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-primary">
                                ₹{item.products?.price || 0}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="primary" 
                                size="sm" 
                                className="flex-1"
                                disabled={!item.products || item.products.stock === 0}
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveFromWishlist(item.product_id)}
                              >
                                Remove
                              </Button>
                            </div>
                            {item.products && item.products.stock === 0 && (
                              <p className="text-xs text-red-600 mt-2">Out of stock</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                  <Button variant="primary" size="sm">
                    Add New Address
                  </Button>
                </div>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No saved addresses yet</p>
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user?.user_metadata?.name || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                      disabled
                    />
                  </div>
                  <Button variant="primary" size="md" disabled>
                    Edit Profile (Coming Soon)
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h2>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Settings coming soon</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
