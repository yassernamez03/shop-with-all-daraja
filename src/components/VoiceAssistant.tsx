
import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceAssistantProps {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  highContrast: boolean;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isEnabled,
  setIsEnabled,
  highContrast,
}) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'ar-MA';
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsListening(true);
        speak('مرحبا، أنا مساعدك الصوتي. كيف يمكنني مساعدتك؟');
      };
      
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };
      
      recognition.start();
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-MA';
    speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('بحث') || command.includes('search')) {
      speak('ماذا تريد أن تبحث عنه؟');
    } else if (command.includes('سلة') || command.includes('cart')) {
      speak('سلة التسوق فارغة حاليا');
    } else if (command.includes('مساعدة') || command.includes('help')) {
      speak('يمكنني مساعدتك في البحث عن المنتجات أو التنقل في الموقع');
    }
  };

  if (!isEnabled) {
    return (
      <button
        onClick={() => setIsEnabled(true)}
        className={`fixed bottom-4 left-4 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
          highContrast
            ? 'bg-green-400 text-black focus:ring-green-400'
            : 'bg-green-600 text-white focus:ring-green-500'
        }`}
        aria-label="تفعيل المساعد الصوتي / Enable voice assistant"
      >
        <Volume2 size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`mb-4 p-4 rounded-2xl shadow-2xl ${
        highContrast ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h4 className="font-bold mb-2">المساعد الصوتي / Voice Assistant</h4>
        <p className="text-sm mb-3">
          {isListening ? 'جاري الاستماع...' : 'اضغط للتحدث / Click to speak'}
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isListening
                ? 'bg-red-500 text-white'
                : highContrast
                ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
            aria-label="بدء الاستماع / Start listening"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          
          <button
            onClick={() => setIsEnabled(false)}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              highContrast
                ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-yellow-400'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
            }`}
            aria-label="إغلاق المساعد الصوتي / Close voice assistant"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
