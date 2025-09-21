import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ChantAnimation = () => {
  const { language } = useLanguage();
  const [currentChant, setCurrentChant] = useState(0);
  
  const chants = {
    hindi: [
      'ॐ हनुमते नमः',
      'जय जय हनुमान',
      'हरि ॐ तत्सत्',
      'श्री राम जय राम',
      'जय बजरंगबली'
    ],
    english: [
      'Om Hanumate Namah',
      'Jai Jai Hanuman',
      'Hari Om Tat Sat',
      'Sri Ram Jai Ram',
      'Jai Bajrangbali'
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChant((prev) => (prev + 1) % chants[language].length);
    }, 3000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="animate-divine-pulse bg-sacred-gold/20 backdrop-blur-sm rounded-full p-4 border border-sacred-gold/30">
        <div className="text-sm font-medium text-sacred-gold animate-chant-glow">
          {chants[language][currentChant]}
        </div>
      </div>
    </div>
  );
};

export default ChantAnimation;