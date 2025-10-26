import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Leaf, Award, TruckIcon } from 'lucide-react';

interface ProductDetailsProps {
  description: string;
  ingredients?: string[];
  nutritionFacts?: {
    servingSize: string;
    calories: number;
    protein: string;
    carbohydrates: string;
    fat: string;
    fiber: string;
    sugar: string;
  };
  storageInstructions?: string;
  shelfLife?: string;
  allergenInfo?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  description,
  ingredients,
  nutritionFacts,
  storageInstructions,
  shelfLife,
  allergenInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition' | 'shipping'>('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: Package },
    { id: 'ingredients', label: 'Ingredients', icon: Leaf },
    { id: 'nutrition', label: 'Nutrition', icon: Award },
    { id: 'shipping', label: 'Shipping', icon: TruckIcon },
  ] as const;

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="prose max-w-none"
      >
        {activeTab === 'description' && (
          <div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
            {storageInstructions && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Storage Instructions</h4>
                <p className="text-gray-700">{storageInstructions}</p>
              </div>
            )}
            {shelfLife && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Shelf Life</h4>
                <p className="text-gray-700">{shelfLife}</p>
              </div>
            )}
            {allergenInfo && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Allergen Information</h4>
                <p className="text-gray-700">{allergenInfo}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div>
            {ingredients && ingredients.length > 0 ? (
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredient information available.</p>
            )}
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div>
            {nutritionFacts ? (
              <div className="border border-gray-300 rounded-lg p-6">
                <h4 className="font-display text-xl font-bold mb-4 pb-2 border-b-2 border-black">
                  Nutrition Facts
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Serving Size</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.servingSize}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-black font-bold">
                    <span>Calories</span>
                    <span>{nutritionFacts.calories}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Protein</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.protein}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Total Carbohydrates</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.carbohydrates}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Total Fat</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.fat}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Dietary Fiber</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.fiber}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Total Sugars</span>
                    <span className="font-semibold text-gray-900">{nutritionFacts.sugar}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No nutrition information available.</p>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Time</h4>
              <p className="text-gray-700">Standard delivery within 3-5 business days across India.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Shipping Charges</h4>
              <p className="text-gray-700">Free shipping on orders above ₹499. Flat ₹49 shipping on orders below ₹499.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Return Policy</h4>
              <p className="text-gray-700">7-day return policy. Products must be unopened and in original packaging.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Packaging</h4>
              <p className="text-gray-700">All products are carefully packaged to ensure freshness and prevent damage during transit.</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetails;
