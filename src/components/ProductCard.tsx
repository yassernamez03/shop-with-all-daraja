
import React, { useState } from 'react';
import { ShoppingCart, Volume2, Star, Wand2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  description: string;
  accessibility: string;
}

interface ProductCardProps {
  product: Product;
  highContrast: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, highContrast }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);
  
  const playAudioDescription = () => {
    const utterance = new SpeechSynthesisUtterance(
      `${product.name}. السعر ${product.price}. التقييم ${product.rating} من 5 نجوم. ${product.description}`
    );
    utterance.lang = 'ar-MA';
    speechSynthesis.speak(utterance);
  };
  
  const generateAIImage = async () => {
    setIsGenerating(true);
    
    try {
      const productName = product.name.split('/')[1]?.trim() || product.name;
      
      // Generate a new image URL based on the product name
      const imageUrl = `https://source.unsplash.com/random/300x200/?${encodeURIComponent(productName)}`;
      
      // Update the current image
      setCurrentImage(imageUrl);
    } catch (error) {
      console.error("Error generating AI image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <article 
      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus-within:ring-4 ${
        highContrast
          ? 'bg-gray-900 text-white focus-within:ring-yellow-400'
          : 'bg-white focus-within:ring-blue-500'
      }`}
      role="article"
      tabIndex={0}
    >
      {/* Product Image */}
      <div className="relative">
        <img 
          src={currentImage} 
          alt={`صورة المنتج: ${product.name}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        
        {/* Accessibility Rating Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
          product.accessibility === 'A+' 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          إمكانية الوصول {product.accessibility}
        </div>

        {/* Audio Description Button */}
        <button
          onClick={playAudioDescription}
          className={`absolute top-2 left-2 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            highContrast
              ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
              : 'bg-white text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
          }`}
          aria-label={`تشغيل الوصف الصوتي لـ ${product.name} / Play audio description`}
        >
          <Volume2 size={16} />
        </button>
        
        {/* AI Image Generation Button */}
        <button
          onClick={generateAIImage}
          disabled={isGenerating}
          className={`absolute bottom-2 left-2 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            highContrast
              ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
              : 'bg-white text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
          }`}
          aria-label={`توليد صورة بالذكاء الاصطناعي لـ ${product.name} / Generate AI image`}
        >
          <Wand2 size={16} className={isGenerating ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className={`text-lg font-bold mb-2 ${
          highContrast ? 'text-white' : 'text-gray-900'
        }`}>
          {product.name}
        </h3>
        
        <p className={`text-sm mb-3 ${
          highContrast ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3" aria-label={`التقييم ${product.rating} من 5 نجوم`}>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className={`ml-2 text-sm ${
            highContrast ? 'text-gray-300' : 'text-gray-600'
          }`}>
            ({product.rating})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${
            highContrast ? 'text-white' : 'text-green-600'
          }`}>
            {product.price}
          </span>
          
          <button 
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${
              highContrast
                ? 'bg-white text-black hover:bg-gray-100 focus:ring-yellow-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
            aria-label={`إضافة ${product.name} إلى السلة / Add ${product.name} to cart`}
          >
            <span className="flex items-center space-x-2">
              <ShoppingCart size={16} />
              <span>إضافة</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
