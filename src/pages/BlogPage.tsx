import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import NewsletterForm from '../components/ui/NewsletterForm';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Health Benefits of Jaggery: Nature\'s Perfect Sweetener',
    slug: 'health-benefits-of-jaggery',
    excerpt: 'Discover why jaggery is considered a superfood and how it can boost your immunity, improve digestion, and provide essential minerals.',
    author: 'Dr. Anjali Patel',
    date: '2025-10-20',
    readTime: '5 min read',
    category: 'Health & Wellness',
    image: '/blog/jaggery-benefits.jpg',
    featured: true,
  },
  {
    id: '2',
    title: '5 Traditional Indian Recipes Using Jaggery',
    slug: 'traditional-recipes-with-jaggery',
    excerpt: 'Explore authentic Indian recipes that showcase the versatility of jaggery, from sweet treats to savory dishes.',
    author: 'Chef Rohan Mehta',
    date: '2025-10-18',
    readTime: '8 min read',
    category: 'Recipes',
    image: '/blog/recipes.jpg',
    featured: false,
  },
  {
    id: '3',
    title: 'Jaggery vs. Sugar: Which Is Healthier for You?',
    slug: 'jaggery-vs-sugar-comparison',
    excerpt: 'A comprehensive comparison of jaggery and refined sugar, examining nutritional value, health impact, and sustainable production.',
    author: 'Nutritionist Priya Sharma',
    date: '2025-10-15',
    readTime: '6 min read',
    category: 'Health & Wellness',
    image: '/blog/comparison.jpg',
    featured: false,
  },
  {
    id: '4',
    title: 'How Jaggery Is Made: From Sugarcane to Your Table',
    slug: 'how-jaggery-is-made',
    excerpt: 'Take a journey through the traditional process of jaggery making and learn about sustainable sugarcane farming.',
    author: 'MitthuuG Team',
    date: '2025-10-12',
    readTime: '7 min read',
    category: 'Behind the Scenes',
    image: '/blog/production.jpg',
    featured: false,
  },
  {
    id: '5',
    title: 'The Perfect Tea-Time Snacks for Monsoon Season',
    slug: 'monsoon-tea-time-snacks',
    excerpt: 'Cozy up this monsoon with these delicious jaggery-based snacks that pair perfectly with your evening chai.',
    author: 'Chef Rohan Mehta',
    date: '2025-10-10',
    readTime: '4 min read',
    category: 'Recipes',
    image: '/blog/tea-time.jpg',
    featured: false,
  },
  {
    id: '6',
    title: 'Sustainable Farming: Our Commitment to Organic Jaggery',
    slug: 'sustainable-organic-farming',
    excerpt: 'Learn about our partnerships with organic farmers and our commitment to sustainable, eco-friendly production methods.',
    author: 'MitthuuG Team',
    date: '2025-10-08',
    readTime: '5 min read',
    category: 'Sustainability',
    image: '/blog/farming.jpg',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Health & Wellness', 'Recipes', 'Behind the Scenes', 'Sustainability'];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
            className="mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            MitthuuG Blog
          </h1>
          <p className="text-gray-600">
            Stories, recipes, and insights about jaggery and healthy living
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="primary" size="md" className="mb-4">
              Featured Article
            </Badge>
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[4/3] lg:aspect-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="primary" size="sm" className="mb-4 w-fit">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString('en-IN', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button variant="primary" size="lg" className="w-fit">
                      Read Article
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <Badge variant="primary" size="sm" className="mb-3 w-fit">
                        {post.category}
                      </Badge>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary text-white rounded-2xl p-8 lg:p-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest recipes, health tips, and exclusive offers.
          </p>
          <NewsletterForm />
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
