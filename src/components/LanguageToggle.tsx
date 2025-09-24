import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50
        bg-yellow-400/90 text-red-900 border-2 border-red-700 shadow-lg
        font-bold transition-all duration-300
        px-5 py-2 text-base rounded-full
        sm:px-4 sm:py-1 sm:text-sm
        hover:bg-yellow-500 hover:text-red-900 hover:scale-105
        focus:ring-2 focus:ring-red-700 focus:outline-none
      "
      style={{
        boxShadow: '0 0 0 4px rgba(185,28,28,0.15)',
      }}
    >
      {language === 'english' ? 'हिंदी' : 'English'}
    </Button>
  );
};

export default LanguageToggle;