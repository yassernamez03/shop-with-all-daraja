
import React, { useState } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  highContrast: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  highContrast 
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'ar-MA'; // Moroccan Arabic
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">
          البحث عن المنتجات / Search for products
        </label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن المنتجات... / Search for products..."
          className={`w-full px-6 py-4 pr-12 pl-20 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
            highContrast
              ? 'bg-gray-900 border-white text-white focus:ring-yellow-400'
              : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          }`}
          aria-describedby="search-help"
        />
        
        {/* Search Icon */}
        <Search 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            highContrast ? 'text-white' : 'text-gray-400'
          }`} 
          size={24} 
        />
        
        {/* Voice Search Button */}
        <button
          onClick={handleVoiceSearch}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isListening
              ? 'bg-red-500 text-white focus:ring-red-500'
              : highContrast
              ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
          }`}
          aria-label={isListening ? 'جاري الاستماع... / Listening...' : 'البحث الصوتي / Voice search'}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
      
      <p id="search-help" className={`mt-2 text-sm text-center ${
        highContrast ? 'text-gray-300' : 'text-gray-600'
      }`}>
        استخدم البحث الصوتي بالضغط على أيقونة الميكروفون / Use voice search by clicking the microphone
      </p>
    </div>
  );
};
