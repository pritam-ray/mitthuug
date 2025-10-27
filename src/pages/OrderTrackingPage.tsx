import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Mail, Phone, MapPin, Check, Clock, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call to fetch order tracking
      // const data = await orderApi.trackOrder(orderId, email);

      // Mock data for demonstration
      setTimeout(() => {
        setTracking({
          orderId: orderId,
          status: 'in_transit',
          estimatedDelivery: '2025-10-30',
          items: [
            {
              name: 'Organic Jaggery Powder 500g',
              quantity: 2,
              price: 169
            },
            {
              name: 'Peanut Gud Ladoo 250g',
              quantity: 1,
              price: 149
            }
          ],
          customer: {
            name: 'John Doe',
            email: email,
            phone: '+91 98765 43210',
            address: '123 Main Street, Bangalore, Karnataka, 560001'
          },
          tracking: {
            carrier: 'Delhivery',
            trackingNumber: 'DEL123456789',
            events: [
              {
                status: 'delivered',
                location: 'Bangalore Hub',
                timestamp: '2025-10-28 14:30',
                description: 'Out for delivery'
              },
              {
                status: 'in_transit',
                location: 'Bangalore Sorting Center',
                timestamp: '2025-10-28 08:15',
                description: 'Package arrived at sorting facility'
              },
              {
                status: 'in_transit',
                location: 'Mumbai Hub',
                timestamp: '2025-10-27 20:45',
                description: 'Package in transit'
              },
              {
                status: 'shipped',
                location: 'Mumbai Warehouse',
                timestamp: '2025-10-27 10:00',
                description: 'Package shipped'
              },
              {
                status: 'processing',
                location: 'Mumbai Warehouse',
                timestamp: '2025-10-26 15:30',
                description: 'Order confirmed and processing'
              }
            ] as TrackingEvent[]
          },
          total: 487
        });
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tracking information');
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'in_transit':
        return <Truck className="w-6 h-6 text-primary-500" />;
      case 'shipped':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string }> = {
      delivered: { variant: 'success', label: 'Delivered' },
      in_transit: { variant: 'primary', label: 'In Transit' },
      shipped: { variant: 'primary', label: 'Shipped' },
      processing: { variant: 'warning', label: 'Processing' },
      cancelled: { variant: 'error', label: 'Cancelled' }
    };

    const config = statusConfig[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant} size="lg">{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background-light py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Track Order' },
          ]}
          className="mb-6"
        />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600">
              Enter your order details to get real-time tracking updates
            </p>
          </div>

          {/* Tracking Form */}
          {!tracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g., ORD-123456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    You can find this in your order confirmation email
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email used for this order"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5 mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Tracking Results */}
          {tracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Status Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                      Order #{tracking.orderId}
                    </h2>
                    <p className="text-gray-600">
                      Estimated delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  {getStatusBadge(tracking.status)}
                </div>

                {/* Progress Bar */}
                <div className="relative pt-8 pb-12">
                  <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-primary-500 transition-all duration-500"
                      style={{ width: tracking.status === 'delivered' ? '100%' : '60%' }}
                    ></div>
                  </div>

                  <div className="relative flex justify-between">
                    {['processing', 'shipped', 'in_transit', 'delivered'].map((status, index) => (
                      <div key={status} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          tracking.tracking.events.some((e: TrackingEvent) => e.status === status)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {getStatusIcon(status)}
                        </div>
                        <p className="text-xs font-medium text-gray-600 capitalize">
                          {status.replace('_', ' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Number */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                      <p className="font-mono font-semibold text-gray-900">
                        {tracking.tracking.trackingNumber}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {tracking.tracking.carrier}
                    </Badge>
                  </div>
                </div>

                {/* Tracking Events */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Tracking History</h3>
                  {tracking.tracking.events.map((event: TrackingEvent, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-primary-500' : 'bg-gray-300'
                        }`}></div>
                        {index < tracking.tracking.events.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                  Order Details
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {tracking.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="font-semibold text-lg text-gray-900">Total</p>
                  <p className="font-bold text-2xl text-primary-600">₹{tracking.total}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                  Delivery Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{tracking.customer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{tracking.customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Delivery Address</p>
                      <p className="font-medium text-gray-900">{tracking.customer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Another Order */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTracking(null);
                    setOrderId('');
                    setEmail('');
                  }}
                >
                  Track Another Order
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
