
import { useState, useEffect } from 'react';

export const useAccessibility = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Load saved preferences
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16');
    
    setHighContrast(savedHighContrast);
    setFontSize(savedFontSize);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', newValue.toString());
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24);
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12);
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
  };

  return {
    highContrast,
    fontSize,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize
  };
};
