
import React, { useState } from 'react';
import { Accessibility, Plus, Minus, Palette, Settings } from 'lucide-react';

interface AccessibilityPanelProps {
  highContrast: boolean;
  fontSize: number;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  highContrast,
  fontSize,
  toggleHighContrast,
  increaseFontSize,
  decreaseFontSize,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Accessibility Panel */}
      {isOpen && (
        <div className={`mb-4 p-6 rounded-2xl shadow-2xl transition-all duration-300 ${
          highContrast ? 'bg-gray-900 text-white border-2 border-white' : 'bg-white text-gray-900 border border-gray-200'
        }`}>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            إعدادات إمكانية الوصول
          </h3>
          
          <div className="space-y-4">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <Palette className="mr-2" size={16} />
                <span>التباين العالي / High Contrast</span>
              </label>
              <button
                onClick={toggleHighContrast}
                className={`w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  highContrast
                    ? 'bg-yellow-400 focus:ring-yellow-400'
                    : 'bg-gray-300 focus:ring-blue-500'
                }`}
                aria-label="تبديل التباين العالي / Toggle high contrast"
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Font Size Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">
                حجم النص / Font Size: {fontSize}px
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseFontSize}
                  className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    highContrast
                      ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-blue-500'
                  }`}
                  aria-label="تصغير النص / Decrease font size"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-4 text-sm">{fontSize}px</span>
                <button
                  onClick={increaseFontSize}
                  className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    highContrast
                      ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-blue-500'
                  }`}
                  aria-label="تكبير النص / Increase font size"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
          highContrast
            ? 'bg-yellow-400 text-black focus:ring-yellow-400'
            : 'bg-blue-600 text-white focus:ring-blue-500'
        }`}
        aria-label="فتح لوحة إمكانية الوصول / Open accessibility panel"
        aria-expanded={isOpen}
      >
        <Accessibility size={24} />
      </button>
    </div>
  );
};
