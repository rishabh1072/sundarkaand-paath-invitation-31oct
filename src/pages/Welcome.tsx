import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import hanumanHero from '@/assets/hanuman-hero.jpg';

const Welcome = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen sacred-gradient relative overflow-hidden">
      <LanguageToggle />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 blessing-gradient opacity-30"></div>
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-sacred-gold rounded-full animate-blessing-rotate opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-sacred-gold rounded-full animate-blessing-rotate opacity-20" style={{ animationDelay: '10s' }}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Main Title */}
        <div className="mb-8 animate-divine-pulse">
          <h1 className={`text-6xl md:text-8xl font-bold temple-text mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
            {t('welcome.title')}
          </h1>
          <div className="w-32 h-1 golden-gradient mx-auto rounded-full animate-sacred-float"></div>
        </div>

        {/* Hanuman Image */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-sacred-gold/20 rounded-full blur-3xl animate-divine-pulse"></div>
          <img 
            src={hanumanHero} 
            alt="Lord Hanuman" 
            className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-8 border-sacred-gold shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-sacred-red/20"></div>
        </div>

        {/* Subtitle */}
        <h2 className={`text-2xl md:text-4xl font-semibold text-sacred-yellow mb-8 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
          {t('welcome.subtitle')}
        </h2>

        {/* Blessing Text */}
        <div className="devotional-card max-w-2xl mx-auto p-8 mb-12 rounded-2xl">
          <h3 className={`text-xl md:text-2xl font-bold text-sacred-gold mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
            {t('welcome.blessing')}
          </h3>
          <p className={`text-lg md:text-xl text-sacred-yellow leading-relaxed ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
            {t('welcome.chalisa')}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/invitation')}
          size="lg"
          variant="sacred"
          className="text-xl px-12 py-6 rounded-full animate-divine-pulse"
        >
          <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
            {t('welcome.proceed')}
          </span>
        </Button>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pattern-border opacity-30"></div>
      </div>
    </div>
  );
};

export default Welcome;