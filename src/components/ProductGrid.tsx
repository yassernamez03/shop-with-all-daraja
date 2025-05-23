
import React from 'react';
import { ProductCard } from './ProductCard';

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
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          highContrast={highContrast}
        />
      ))}
    </div>
  );
};
