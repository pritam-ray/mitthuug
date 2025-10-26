import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'MG-234567',
    date: '2025-10-20',
    status: 'delivered',
    total: 467,
    items: 3,
  },
  {
    id: '2',
    orderNumber: 'MG-234566',
    date: '2025-10-15',
    status: 'shipped',
    total: 318,
    items: 2,
  },
  {
    id: '3',
    orderNumber: 'MG-234565',
    date: '2025-10-10',
    status: 'processing',
    total: 598,
    items: 4,
  },
];

const MOCK_WISHLIST = [
  {
    id: '1',
    name: 'Classic Gud Bites',
    price: 149,
    compareAtPrice: 199,
    image: '/products/classic.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Almond Gud Bites',
    price: 189,
    compareAtPrice: 249,
    image: '/products/almond.jpg',
    inStock: true,
  },
];

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile' | 'settings';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  const tabs = [
    { id: 'orders' as Tab, label: 'Orders', icon: Package, count: MOCK_ORDERS.length },
    { id: 'wishlist' as Tab, label: 'Wishlist', icon: Heart, count: MOCK_WISHLIST.length },
    { id: 'addresses' as Tab, label: 'Addresses', icon: MapPin },
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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
              <p className="text-gray-600 mt-2">Welcome back, Priya!</p>
            </div>
            <Button variant="outline" size="md">
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

                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                Order #{order.orderNumber}
                              </h3>
                              <Badge variant={getStatusColor(order.status)} size="sm">
                                {getStatusLabel(order.status)}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <p>{order.items} items • ₹{order.total}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {order.status === 'delivered' && (
                              <Button variant="primary" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_WISHLIST.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">
                              ₹{item.price}
                            </span>
                            {item.compareAtPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.compareAtPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="primary" size="sm" className="flex-1">
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <Button variant="primary" size="md">
                    Add New Address
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-primary rounded-lg p-4 relative">
                    <Badge variant="primary" size="sm" className="absolute top-4 right-4">
                      Default
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-2">Home</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      123 Heritage Lane, Andheri West<br />
                      Mumbai, Maharashtra 400058<br />
                      Phone: +91 98765 43210
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      456 Corporate Tower, BKC<br />
                      Mumbai, Maharashtra 400051<br />
                      Phone: +91 98765 43210
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error">
                        Delete
                      </Button>
                    </div>
                  </div>
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
                  Personal Information
                </h2>

                <form className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Priya"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Sharma"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="priya.sharma@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="pt-4">
                    <Button variant="primary" size="lg">
                      Save Changes
                    </Button>
                  </div>
                </form>
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

                <div className="space-y-6 max-w-2xl">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Order updates and shipping notifications',
                        'New product launches and promotions',
                        'Weekly newsletter with recipes and tips',
                        'Special offers and discounts',
                      ].map((option, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={index < 2}
                            className="w-4 h-4 text-primary rounded"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <Button variant="outline" size="md">
                      Update Password
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Delete Account */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-error mb-2">
                      Delete Account
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="outline" size="md" className="border-error text-error hover:bg-error/10">
                      Delete My Account
                    </Button>
                  </div>
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
