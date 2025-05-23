
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { VoiceAssistant } from '../components/VoiceAssistant';
import { AIAssistant } from '../components/AIAssistant';
import { useAccessibility } from '../hooks/useAccessibility';

const Index = () => {
  const { highContrast, fontSize, toggleHighContrast, increaseFontSize, decreaseFontSize } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
    }`} style={{ fontSize: `${fontSize}px` }}>
      
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        tabIndex={1}
      >
        تخطي إلى المحتوى الرئيسي / Skip to main content
      </a>

      <Header />
      
      <main id="main-content" className="container mx-auto px-4 py-8" role="main">
        {/* Hero Section */}
        <section className="text-center mb-12" aria-labelledby="hero-heading">
          <h1 
            id="hero-heading"
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              highContrast ? 'text-white' : 'text-gray-900'
            }`}
          >
            E-ComForAll
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            highContrast ? 'text-gray-100' : 'text-gray-700'
          }`}>
            التسوق الإلكتروني الشامل والمبسط للجميع
            <br />
            <span className="text-lg">Le shopping en ligne qui entend, voit, et comprend tout le monde</span>
          </p>
        </section>

        {/* Search Section */}
        <section className="mb-12" aria-labelledby="search-heading">
          <h2 id="search-heading" className="sr-only">البحث عن المنتجات / Product Search</h2>
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            highContrast={highContrast}
          />
        </section>

        {/* Product Grid */}
        <section aria-labelledby="products-heading">
          <h2 
            id="products-heading" 
            className={`text-2xl font-bold mb-8 ${
              highContrast ? 'text-white' : 'text-gray-900'
            }`}
          >
            المنتجات المميزة / Featured Products
          </h2>
          <ProductGrid searchQuery={searchQuery} highContrast={highContrast} />
        </section>
      </main>

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        highContrast={highContrast}
        fontSize={fontSize}
        toggleHighContrast={toggleHighContrast}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
      />      {/* Voice Assistant */}
      <VoiceAssistant 
        isEnabled={isVoiceEnabled}
        setIsEnabled={setIsVoiceEnabled}
        highContrast={highContrast}
      />

      {/* AI Assistant */}
      <AIAssistant
        isEnabled={isAIEnabled}
        setIsEnabled={setIsAIEnabled}
        highContrast={highContrast}
      />
    </div>
  );
};

export default Index;
