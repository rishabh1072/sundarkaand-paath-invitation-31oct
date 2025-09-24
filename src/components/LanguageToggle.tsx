import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  // Always use the English label width for button sizing
  const buttonLabel = language === 'english' ? 'हिंदी' : 'English';
  // Set a min-width based on the English label
  const minWidth = '56px'; // 'English' is 7 chars, ~56px at text-xs font

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50
        bg-yellow-400/90 text-red-900 border border-red-700 shadow-md
        font-medium transition-all duration-300
        px-2 py-1 text-xs rounded-md
        hover:bg-yellow-500 hover:text-red-900 hover:scale-105
        focus:ring-1 focus:ring-red-700 focus:outline-none
      "
      style={{
        minWidth,
        boxShadow: '0 0 0 1px rgba(185,28,28,0.1)',
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default LanguageToggle;