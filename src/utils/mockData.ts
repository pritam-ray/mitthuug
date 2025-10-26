// Mock data for development before Supabase is fully populated
// This allows the app to function with realistic data during development

export const MOCK_PRODUCTS = [
  {
    id: '1',
    productId: 'classic-gud-bites',
    slug: 'classic-gud-bites',
    name: 'Classic Gud Bites',
    description: 'Traditional jaggery-based snacks made with authentic Indian recipes. Each bite delivers the perfect balance of sweetness and nutrition, using 100% organic jaggery sourced directly from farmers.',
    price: 149,
    compare_at_price: 199,
    category: 'Classic Collection',
    image: '/products/classic.jpg',
    image_url: '/products/classic.jpg',
    images: ['/products/classic.jpg', '/products/classic-2.jpg', '/products/classic-3.jpg'],
    stock: 50,
    is_featured: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 124,
    sold_count: 456,
    weight: '200g',
    ingredients: 'Organic jaggery, roasted peanuts, sesame seeds, ghee, cardamom',
    nutrition_info: {
      calories: '120 per serving',
      protein: '3g',
      carbs: '18g',
      fat: '4g',
      fiber: '2g',
    },
  },
  {
    id: '2',
    productId: 'ginger-gud-chikki',
    slug: 'ginger-gud-chikki',
    name: 'Ginger Gud Chikki',
    description: 'Zesty ginger meets golden jaggery in this warming, digestive-friendly chikki. Perfect for those who love a spicy kick with their sweetness.',
    price: 159,
    compare_at_price: 209,
    category: 'Spiced Collection',
    image: '/products/ginger.jpg',
    image_url: '/products/ginger.jpg',
    images: ['/products/ginger.jpg'],
    stock: 30,
    is_featured: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 89,
    sold_count: 234,
    weight: '200g',
    ingredients: 'Organic jaggery, fresh ginger, peanuts, ghee',
    nutrition_info: {
      calories: '130 per serving',
      protein: '3g',
      carbs: '20g',
      fat: '4g',
      fiber: '2g',
    },
  },
  {
    id: '3',
    productId: 'coconut-gud-ladoo',
    slug: 'coconut-gud-ladoo',
    name: 'Coconut Gud Ladoo',
    description: 'Heavenly spheres of coconut and jaggery that melt in your mouth. A traditional favorite that brings back childhood memories.',
    price: 169,
    compare_at_price: 229,
    category: 'Premium Collection',
    image: '/products/coconut.jpg',
    image_url: '/products/coconut.jpg',
    images: ['/products/coconut.jpg'],
    stock: 25,
    is_featured: false,
    is_active: true,
    rating: 4.9,
    reviews_count: 156,
    sold_count: 567,
    weight: '250g',
    ingredients: 'Organic jaggery, desiccated coconut, ghee, cardamom, cashews',
    nutrition_info: {
      calories: '140 per serving',
      protein: '2g',
      carbs: '22g',
      fat: '5g',
      fiber: '3g',
    },
  },
  {
    id: '4',
    productId: 'til-gud-barfi',
    slug: 'til-gud-barfi',
    name: 'Til Gud Barfi',
    description: 'Celebrate every season with this sesame and jaggery barfi. Rich in calcium and packed with energy.',
    price: 179,
    compare_at_price: 239,
    category: 'Classic Collection',
    image: '/products/sesame.jpg',
    image_url: '/products/sesame.jpg',
    images: ['/products/sesame.jpg'],
    stock: 40,
    is_featured: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 98,
    sold_count: 345,
    weight: '250g',
    ingredients: 'Organic jaggery, white sesame seeds, ghee, almonds',
    nutrition_info: {
      calories: '150 per serving',
      protein: '4g',
      carbs: '19g',
      fat: '6g',
      fiber: '3g',
    },
  },
  {
    id: '5',
    productId: 'dry-fruit-gud-mix',
    slug: 'dry-fruit-gud-mix',
    name: 'Dry Fruit Gud Mix',
    description: 'A luxurious blend of premium dry fruits bound together with organic jaggery. The ultimate healthy indulgence.',
    price: 249,
    compare_at_price: 329,
    category: 'Premium Collection',
    image: '/products/dry-fruit.jpg',
    image_url: '/products/dry-fruit.jpg',
    images: ['/products/dry-fruit.jpg'],
    stock: 20,
    is_featured: true,
    is_active: true,
    rating: 5.0,
    reviews_count: 67,
    sold_count: 189,
    weight: '300g',
    ingredients: 'Organic jaggery, almonds, cashews, pistachios, walnuts, raisins, ghee',
    nutrition_info: {
      calories: '180 per serving',
      protein: '5g',
      carbs: '21g',
      fat: '8g',
      fiber: '3g',
    },
  },
  {
    id: '6',
    productId: 'chocolate-gud-fusion',
    slug: 'chocolate-gud-fusion',
    name: 'Chocolate Gud Fusion',
    description: 'Modern meets traditional in this innovative chocolate-jaggery fusion. Kids love it, adults can\'t resist it.',
    price: 189,
    compare_at_price: 249,
    category: 'Fusion Collection',
    image: '/products/chocolate.jpg',
    image_url: '/products/chocolate.jpg',
    images: ['/products/chocolate.jpg'],
    stock: 35,
    is_featured: false,
    is_active: true,
    rating: 4.8,
    reviews_count: 142,
    sold_count: 423,
    weight: '200g',
    ingredients: 'Organic jaggery, dark chocolate (70% cocoa), peanuts, ghee',
    nutrition_info: {
      calories: '160 per serving',
      protein: '4g',
      carbs: '20g',
      fat: '7g',
      fiber: '2g',
    },
  },
];

export const MOCK_REVIEWS = [
  {
    id: '1',
    product_id: '1',
    user_id: 'user1',
    rating: 5,
    title: 'Absolutely delicious!',
    comment: 'These are the best jaggery snacks I\'ve ever tasted. Reminds me of my grandmother\'s cooking.',
    helpful_count: 12,
    verified_purchase: true,
    created_at: '2024-10-15T10:30:00Z',
    users: {
      id: 'user1',
      email: 'priya.sharma@example.com',
      user_metadata: {
        name: 'Priya Sharma',
      },
    },
  },
  {
    id: '2',
    product_id: '1',
    user_id: 'user2',
    rating: 4,
    title: 'Great taste, healthy option',
    comment: 'Love that these are made with organic jaggery. Perfect guilt-free snack for my kids.',
    helpful_count: 8,
    verified_purchase: true,
    created_at: '2024-10-10T14:20:00Z',
    users: {
      id: 'user2',
      email: 'amit.patel@example.com',
      user_metadata: {
        name: 'Amit Patel',
      },
    },
  },
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'The Health Benefits of Jaggery: Nature\'s Perfect Sweetener',
    slug: 'health-benefits-of-jaggery',
    excerpt: 'Discover why jaggery is considered a superfood and how it can boost your immunity, improve digestion, and provide essential minerals.',
    author: 'Dr. Anjali Patel',
    date: '2024-10-20',
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
    date: '2024-10-18',
    readTime: '8 min read',
    category: 'Recipes',
    image: '/blog/recipes.jpg',
    featured: false,
  },
];

// Helper function to get mock data with simulated delay
export const getMockData = async <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Helper to get product by ID or slug
export const getMockProduct = (identifier: string, by: 'id' | 'slug' = 'slug') => {
  const product = MOCK_PRODUCTS.find((p) =>
    by === 'slug' ? p.slug === identifier : p.id === identifier
  );
  return product || null;
};

// Helper to get featured products
export const getMockFeaturedProducts = () => {
  return MOCK_PRODUCTS.filter((p) => p.is_featured);
};

// Helper to filter products
export const getMockFilteredProducts = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  return MOCK_PRODUCTS.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};
