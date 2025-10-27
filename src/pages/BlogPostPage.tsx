import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import NewsletterForm from '../components/ui/NewsletterForm';

// Mock blog post data (will be replaced with Supabase data later)
const BLOG_POSTS = {
  'health-benefits-of-jaggery': {
    id: '1',
    title: 'The Health Benefits of Jaggery: Nature\'s Perfect Sweetener',
    slug: 'health-benefits-of-jaggery',
    content: `
      <h2>Introduction</h2>
      <p>Jaggery, known as "gur" in Hindi, has been a staple sweetener in Indian households for centuries. Unlike refined sugar, jaggery is a natural product made from sugarcane juice or palm sap, retaining all its natural minerals and vitamins.</p>
      
      <h2>What Makes Jaggery Special?</h2>
      <p>Jaggery is not just a sweetener; it's a powerhouse of nutrients. During its production, the sugarcane juice is boiled and concentrated without any chemicals or additives, preserving its natural goodness.</p>
      
      <h3>Key Nutrients in Jaggery:</h3>
      <ul>
        <li><strong>Iron</strong>: Essential for preventing anemia</li>
        <li><strong>Magnesium</strong>: Supports muscle and nerve function</li>
        <li><strong>Potassium</strong>: Helps regulate blood pressure</li>
        <li><strong>Phosphorus</strong>: Important for bone health</li>
      </ul>
      
      <h2>Top 10 Health Benefits</h2>
      
      <h3>1. Boosts Immunity</h3>
      <p>Rich in antioxidants and minerals like zinc and selenium, jaggery helps strengthen your immune system and protect your body against infections.</p>
      
      <h3>2. Aids Digestion</h3>
      <p>Jaggery activates digestive enzymes and helps cleanse the digestive tract. It's traditionally consumed after meals in India to aid digestion.</p>
      
      <h3>3. Prevents Anemia</h3>
      <p>With its high iron content, jaggery is excellent for preventing and treating iron-deficiency anemia, especially in women and children.</p>
      
      <h3>4. Cleanses the Body</h3>
      <p>Jaggery acts as a natural detoxifier, helping to cleanse the liver and flush out toxins from the body.</p>
      
      <h3>5. Energy Booster</h3>
      <p>Unlike refined sugar that gives instant energy followed by a crash, jaggery provides sustained energy by being digested slowly.</p>
      
      <h3>6. Respiratory Health</h3>
      <p>Consuming jaggery can help prevent respiratory problems like asthma and bronchitis. It's often mixed with sesame seeds for better results.</p>
      
      <h3>7. Joint Pain Relief</h3>
      <p>Regular consumption of jaggery can help relieve joint pain. When combined with ginger, it can be particularly effective.</p>
      
      <h3>8. Menstrual Health</h3>
      <p>Jaggery helps reduce menstrual cramps and provides relief from PMS symptoms due to its iron content and natural compounds.</p>
      
      <h3>9. Weight Management</h3>
      <p>Jaggery contains potassium that helps reduce water retention and bloating, indirectly supporting weight management efforts.</p>
      
      <h3>10. Skin Health</h3>
      <p>The antioxidants in jaggery help fight free radicals, preventing premature aging and promoting healthy, glowing skin.</p>
      
      <h2>How to Incorporate Jaggery in Your Diet</h2>
      <p>Here are some simple ways to enjoy the benefits of jaggery:</p>
      <ul>
        <li>Replace refined sugar in your tea or coffee</li>
        <li>Use it in traditional sweets and desserts</li>
        <li>Add to smoothies for natural sweetness</li>
        <li>Mix with nuts for a healthy snack</li>
        <li>Use in cooking savory dishes for depth of flavor</li>
      </ul>
      
      <h2>Jaggery vs. Refined Sugar</h2>
      <p>While both jaggery and sugar are calorie-dense, jaggery has a clear advantage:</p>
      <ul>
        <li>Contains natural minerals and vitamins</li>
        <li>Has a lower glycemic index</li>
        <li>Provides sustained energy</li>
        <li>Aids digestion rather than hindering it</li>
        <li>Supports overall health</li>
      </ul>
      
      <h2>Precautions</h2>
      <p>While jaggery is healthier than refined sugar, moderation is key:</p>
      <ul>
        <li>People with diabetes should consult their doctor before consuming jaggery</li>
        <li>Excessive consumption can lead to weight gain</li>
        <li>Always buy jaggery from trusted sources to ensure purity</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Jaggery is truly nature's perfect sweetener, offering numerous health benefits beyond just sweet taste. By replacing refined sugar with jaggery in your daily diet, you can enjoy better health, improved digestion, and sustained energy levels.</p>
      
      <p>At MitthuuG, we source the finest quality jaggery directly from organic farms to ensure you get all these benefits in their purest form. Try our range of jaggery-based products and experience the difference!</p>
    `,
    excerpt: 'Discover why jaggery is considered a superfood and how it can boost your immunity, improve digestion, and provide essential minerals.',
    author: 'Dr. Anjali Patel',
    date: '2025-10-20',
    readTime: '5 min read',
    category: 'Health & Wellness',
    image: '/blog/jaggery-benefits.jpg',
    featured: true,
  },
  // Add more blog posts as needed
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? BLOG_POSTS[slug as keyof typeof BLOG_POSTS] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
            className="mb-4"
          />
          <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
          >
            {/* Featured Image */}
            <div className="aspect-[21/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              {/* Category Badge */}
              <Badge variant="primary" size="md" className="mb-4">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Share */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this article
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 rounded-full bg-[#1877F2] text-white hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 rounded-full bg-[#0A66C2] text-white hover:bg-opacity-90 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="p-2 rounded-full bg-gray-600 text-white hover:bg-opacity-90 transition-colors"
                      aria-label="Share via Email"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              Get More Health Tips
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly health tips, recipes, and exclusive offers.
            </p>
            <NewsletterForm />
          </motion.div>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
