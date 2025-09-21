import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Share2, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import decorativeBorder from '@/assets/decorative-border.jpg';

const Invitation = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `${t('invitation.title')} ${t('invitation.subtitle')}\n${t('invitation.date')}\n${t('invitation.blessing_text')}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const openMaps = () => {
    // Placeholder coordinates - replace with actual venue coordinates
    const coordinates = "28.6139,77.2090"; // New Delhi coordinates as example
    window.open(`https://maps.google.com?q=${coordinates}`, '_blank');
  };

  return (
    <div className="min-h-screen sacred-gradient relative">
      <LanguageToggle />
      
      {/* Decorative Header Border */}
      <div 
        className="h-24 w-full bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="divine"
          >
            <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
              {t('nav.home')}
            </span>
          </Button>
        </div>

        {/* Main Invitation Card */}
        <Card className="devotional-card p-8 md:p-12 text-center mb-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className={`text-4xl md:text-6xl font-bold temple-text mb-2 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('welcome.title')}
            </h1>
            <div className="w-24 h-1 golden-gradient mx-auto rounded-full mb-6"></div>
            <h2 className={`text-3xl md:text-5xl font-bold text-sacred-gold mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('invitation.title')}
            </h2>
            <h3 className={`text-2xl md:text-3xl text-sacred-yellow ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('invitation.subtitle')}
            </h3>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-sacred-red/20 rounded-xl p-6 border-2 border-sacred-gold/30">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-sacred-gold mr-3" />
                <h4 className={`text-xl font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.date')}
                </h4>
              </div>
            </div>

            <div className="bg-sacred-red/20 rounded-xl p-6 border-2 border-sacred-gold/30">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-sacred-gold mr-3" />
                <div className={`text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  <p className="text-sacred-yellow font-semibold">{t('invitation.puja')}</p>
                  <p className="text-sacred-yellow font-semibold">{t('invitation.pushpanjali')}</p>
                  <p className="text-sacred-yellow font-semibold">{t('invitation.prasad')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Venue Section */}
          <div className="bg-sacred-red/20 rounded-xl p-6 border-2 border-sacred-gold/30 mb-8">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-sacred-gold mr-3" />
              <h4 className={`text-2xl font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                {t('invitation.venue')}
              </h4>
            </div>
            <p className={`text-xl text-sacred-yellow mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('invitation.address')}
            </p>
            <Button
              onClick={openMaps}
              variant="blessing"
            >
              <MapPin className="w-4 h-4 mr-2" />
              <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                {t('directions')}
              </span>
            </Button>
          </div>

          {/* Blessing Message */}
          <div className="mb-8">
            <p className={`text-2xl md:text-3xl font-bold text-sacred-gold mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('invitation.blessing_text')}
            </p>
            <div className="w-32 h-1 golden-gradient mx-auto rounded-full"></div>
          </div>

          {/* Family Signature */}
          <div className="mb-8">
            <p className={`text-xl text-sacred-yellow italic ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
              {t('invitation.regards')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={shareOnWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3"
            >
              <Share2 className="w-5 h-5 mr-2" />
              <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                {t('share.whatsapp')}
              </span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Decorative Footer Border */}
      <div 
        className="h-24 w-full bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      ></div>
    </div>
  );
};

export default Invitation;