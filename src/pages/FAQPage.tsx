import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'What makes MitthuuG different from other snack brands?',
    answer: 'MitthuuG is committed to pure, natural ingredients with zero preservatives or artificial flavors. We use organic jaggery sourced directly from sustainable farms and follow traditional recipes passed down through generations. Every batch is handcrafted in small quantities to ensure maximum freshness and authentic taste.',
    category: 'About Us',
  },
  {
    id: '2',
    question: 'Are your products suitable for diabetics?',
    answer: 'While our products use jaggery which has a lower glycemic index than refined sugar, we recommend consulting with your healthcare provider before consumption if you have diabetes. Jaggery still contains natural sugars and should be consumed in moderation.',
    category: 'Health & Nutrition',
  },
  {
    id: '3',
    question: 'What is your shipping policy?',
    answer: 'We offer free shipping on orders above ₹499 across India. For orders below ₹499, a flat shipping charge of ₹49 applies. Most orders are delivered within 3-5 business days. We carefully package all products to ensure they reach you fresh and intact.',
    category: 'Shipping & Delivery',
  },
  {
    id: '4',
    question: 'How long do the products stay fresh?',
    answer: 'Our products have a shelf life of 3 months from the date of manufacture when stored in an airtight container in a cool, dry place. We recommend consuming within 30 days of opening for the best taste and texture. Each package is clearly labeled with the manufacturing and best-before dates.',
    category: 'Product Information',
  },
  {
    id: '5',
    question: 'Do you accept returns or exchanges?',
    answer: 'We have a 7-day return policy for unopened products in their original packaging. If you receive a damaged or defective product, please contact us within 48 hours with photos, and we\'ll arrange for a replacement or full refund. Customer satisfaction is our top priority.',
    category: 'Returns & Refunds',
  },
  {
    id: '6',
    question: 'Are your products suitable for vegans?',
    answer: 'Some of our products contain ghee (clarified butter) and are not suitable for vegans. However, we clearly mention all ingredients on our product pages and packaging. We\'re working on vegan variants and will announce them soon!',
    category: 'Health & Nutrition',
  },
  {
    id: '7',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure, encrypted gateways. We also offer cash on delivery (COD) for orders within India.',
    category: 'Payment',
  },
  {
    id: '8',
    question: 'Do you offer bulk or wholesale pricing?',
    answer: 'Yes! We offer special pricing for bulk orders (minimum 50 units) and wholesale partnerships. Please contact us at bulk@mitthuug.com with your requirements, and our team will get back to you within 24 hours with a customized quote.',
    category: 'Orders',
  },
  {
    id: '9',
    question: 'Where are your products manufactured?',
    answer: 'All our products are handcrafted in our FSSAI-certified facility in Maharashtra, India. We follow strict quality control measures and hygiene standards. Every batch is tested to ensure it meets our high standards before packaging.',
    category: 'About Us',
  },
  {
    id: '10',
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order is shipped, you\'ll receive a tracking number via email and SMS. You can use this to track your package in real-time. You can also check your order status anytime by logging into your account on our website.',
    category: 'Shipping & Delivery',
  },
  {
    id: '11',
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. However, we\'re working on expanding our international shipping capabilities. Subscribe to our newsletter to be the first to know when we start shipping to your country!',
    category: 'Shipping & Delivery',
  },
  {
    id: '12',
    question: 'What if I have a food allergy?',
    answer: 'We take allergen information very seriously. All our products clearly list ingredients and potential allergens (like nuts, dairy) on both our website and packaging. Our facility handles peanuts, tree nuts, and dairy products, so there may be traces even in products that don\'t explicitly contain them.',
    category: 'Health & Nutrition',
  },
];

const CATEGORIES = ['All', 'About Us', 'Health & Nutrition', 'Shipping & Delivery', 'Product Information', 'Returns & Refunds', 'Payment', 'Orders'];

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}
            className="mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about MitthuuG products and services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1">
                {CATEGORIES.map(category => {
                  const count = category === 'All' 
                    ? FAQ_DATA.length 
                    : FAQ_DATA.filter(faq => faq.category === category).length;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setExpandedId(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className={`text-xs ${
                          selectedCategory === category ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* FAQ List */}
          <div className="lg:col-span-3">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-xs font-medium text-primary mb-1 block">
                          {faq.category}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Try different keywords or browse by category.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary text-white rounded-2xl p-8 lg:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Can't find the answer you're looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Phone className="w-5 h-5 mr-2" />
                Call +91 98765 43210
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
