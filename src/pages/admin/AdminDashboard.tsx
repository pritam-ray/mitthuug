import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Mail, 
  TrendingUp, 
  DollarSign,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - Replace with real Supabase queries
  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '₹1,24,500',
      change: '+12.5%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '145',
      change: '+8.2%',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Products',
      value: '24',
      change: '+2',
      icon: <Package className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Newsletter Subscribers',
      value: '892',
      change: '+23.1%',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Priya Sharma', total: '₹1,250', status: 'Processing', date: '2025-10-28' },
    { id: 'ORD-002', customer: 'Rahul Verma', total: '₹890', status: 'Shipped', date: '2025-10-28' },
    { id: 'ORD-003', customer: 'Anjali Patel', total: '₹2,150', status: 'Delivered', date: '2025-10-27' },
    { id: 'ORD-004', customer: 'Vikram Singh', total: '₹675', status: 'Processing', date: '2025-10-27' },
    { id: 'ORD-005', customer: 'Neha Gupta', total: '₹1,450', status: 'Shipped', date: '2025-10-26' },
  ];

  const lowStockProducts = [
    { id: '1', name: 'Organic Jaggery Powder', stock: 5, sku: 'JGP-500' },
    { id: '2', name: 'Gud Ladoo Box', stock: 3, sku: 'GLD-250' },
    { id: '3', name: 'Palm Jaggery Cubes', stock: 7, sku: 'PJC-400' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.user_metadata?.name || 'Admin'}! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Recent Orders
                  </h2>
                  <Link 
                    to="/admin/orders"
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center"
                  >
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Low Stock Alert
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">
                          {product.stock}
                        </p>
                        <p className="text-xs text-gray-600">
                          in stock
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/admin/products"
                  className="mt-4 block text-center text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  Manage Inventory
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/admin/products/new"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Add New Product
                </Link>
                <Link
                  to="/admin/orders"
                  className="block w-full bg-white border-2 border-gray-200 hover:border-primary-600 text-gray-900 text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Orders
                </Link>
                <Link
                  to="/admin/subscribers"
                  className="block w-full bg-white border-2 border-gray-200 hover:border-primary-600 text-gray-900 text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  View Subscribers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
