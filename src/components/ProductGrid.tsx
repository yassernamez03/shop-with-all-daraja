
import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';

interface ProductGridProps {
  searchQuery: string;
  highContrast: boolean;
}

const sampleProducts = [
  {
    id: 1,
    name: 'هاتف ذكي متطور / Smart Phone Pro',
    price: '2,999 MAD',
    image: '/placeholder.svg',
    rating: 4.5,
    description: 'هاتف ذكي بمواصفات عالية مع كاميرا متطورة / High-end smartphone with advanced camera',
    accessibility: 'A+',
  },
  {
    id: 2,
    name: 'لابتوب للعمل / Work Laptop',
    price: '8,500 MAD',
    image: '/placeholder.svg',
    rating: 4.8,
    description: 'لابتوب مثالي للعمل والدراسة / Perfect laptop for work and study',
    accessibility: 'A',
  },
  {
    id: 3,
    name: 'سماعات لاسلكية / Wireless Headphones',
    price: '450 MAD',
    image: '/placeholder.svg',
    rating: 4.3,
    description: 'سماعات عالية الجودة مع إلغاء الضوضاء / High-quality noise-canceling headphones',
    accessibility: 'A+',
  },
  {
    id: 4,
    name: 'ساعة ذكية / Smart Watch',
    price: '1,200 MAD',
    image: '/placeholder.svg',
    rating: 4.6,
    description: 'ساعة ذكية لتتبع الصحة واللياقة / Smart watch for health and fitness tracking',
    accessibility: 'A',
  },
];

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, highContrast }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateAllAIImages = async () => {
    setIsGenerating(true);
    
    try {
      // Create a copy of the products array
      const updatedProducts = [...products];
      
      // Update each product with a generated image
      for (let i = 0; i < updatedProducts.length; i++) {
        const product = updatedProducts[i];
        const productName = product.name.split('/')[1]?.trim() || product.name;
        
        // Generate a new image URL based on the product name and description
        const imageUrl = `https://source.unsplash.com/random/300x200/?${encodeURIComponent(productName)}`;
        
        // Update the product with the new image
        updatedProducts[i] = {
          ...product,
          image: imageUrl
        };
      }
      
      // Update the state with the new products
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error generating AI images:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <Button 
          onClick={generateAllAIImages} 
          disabled={isGenerating}
          className={`flex items-center gap-2 ${
            highContrast 
              ? 'bg-white text-black hover:bg-gray-100' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label="Generate AI images for all products"
        >
          <Wand2 size={16} />
          {isGenerating ? "جاري التوليد..." : "توليد صور بالذكاء الاصطناعي / Generate AI Images"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            highContrast={highContrast}
          />
        ))}
      </div>
    </div>
  );
};
