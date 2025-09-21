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
      className="fixed top-4 right-4 z-50 bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-300"
    >
      {language === 'english' ? 'हिंदी' : 'English'}
    </Button>
  );
};

export default LanguageToggle;