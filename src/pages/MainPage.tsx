import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Share2, Calendar, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import ScrollingMantra from '@/components/ScrollingMantra';
import AudioPlayer from '@/components/AudioPlayer';
import hanumanBg from '@/assets/hanuman-bg.jpg';
import hanumanPortrait from '@/assets/hanuman-portrait.jpg';
import decorativeBorder from '@/assets/decorative-border.jpg';

const MainPage = () => {
  const { t, language } = useLanguage();

  // Track active tab
  const [activeTab, setActiveTab] = useState<'welcome' | 'invitation'>('welcome');

  // Create a proper handler for tab changes
  const handleTabChange = (value: string) => {
    if (value === 'welcome' || value === 'invitation') {
      setActiveTab(value);
    }
  };

  // Auto-switch to invitation after 10 seconds
  useEffect(() => {
    if (activeTab === 'welcome') {
      const timer = setTimeout(() => {
        setActiveTab('invitation');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `${t('invitation.title')} ${t('invitation.subtitle')}\n${t('invitation.date')}\n${t('invitation.blessing_text')}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const openMaps = () => {
    const coordinates = "28.6139,77.2090";
    window.open(`https://maps.google.com?q=${coordinates}`, '_blank');
  };

  return (
    <div className="min-h-screen relative" 
         style={{
           backgroundImage: `linear-gradient(rgba(128, 0, 0, 0.8), rgba(128, 0, 0, 0.9)), url(${hanumanBg})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      
      {/* Scrolling Mantra Background */}
      <ScrollingMantra />

      {/* Audio Player */}
      <AudioPlayer />

      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      {/* Decorative Header */}
      <div 
        className="h-16 w-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-sacred-red/30 border border-sacred-gold">
            <TabsTrigger 
              value="welcome" 
              className="data-[state=active]:bg-sacred-gold data-[state=active]:text-sacred-red text-sacred-gold font-semibold"
            >
              <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                {t('nav.home')}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="invitation"
              className="data-[state=active]:bg-sacred-gold data-[state=active]:text-sacred-red text-sacred-gold font-semibold"
            >
              <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                {t('nav.invitation')}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="welcome" className="space-y-6 sm:space-y-8">
            {/* Welcome Page Content */}
            <div className="flex flex-col items-center justify-start min-h-0 text-center w-full">
              {/* Main Title */}
              <div className="mb-6 sm:mb-8 animate-divine-pulse">
                <h1 className={`text-4xl sm:text-6xl md:text-8xl font-bold temple-text mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('welcome.title')}
                </h1>
                <div className="w-24 sm:w-32 h-1 golden-gradient mx-auto rounded-full animate-sacred-float"></div>
              </div>

              {/* Hanuman Portrait */}
              <div className="relative mb-6 sm:mb-8 group w-full flex justify-center">
                <div className="absolute inset-0 bg-sacred-gold/20 rounded-full blur-3xl animate-divine-pulse"></div>
                <img 
                  src={hanumanPortrait} 
                  alt="Lord Hanuman" 
                  className="relative w-40 h-40 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-full border-4 sm:border-8 border-sacred-gold shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-sacred-red/20"></div>
              </div>

              {/* Subtitle */}
              <h2 className={`text-lg sm:text-2xl md:text-4xl font-semibold text-sacred-yellow mb-6 sm:mb-8 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                {t('welcome.subtitle')}
              </h2>

              {/* Blessing Text */}
              <div className="devotional-card w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-8 mb-8 sm:mb-12 rounded-2xl">
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-sacred-gold mb-2 sm:mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('welcome.blessing')}
                </h3>
                <p className={`text-base sm:text-lg md:text-xl text-sacred-yellow leading-relaxed ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('welcome.chalisa')}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invitation" className="space-y-6 sm:space-y-8">
            {/* Invitation Page Content */}
            <Card className="devotional-card w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-8 md:p-12 text-center">
              {/* Title Section */}
              <div className="mb-6 sm:mb-8">
                <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold temple-text mb-2 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('welcome.title')}
                </h1>
                <div className="w-16 sm:w-24 h-1 golden-gradient mx-auto rounded-full mb-4 sm:mb-6"></div>
                <h2 className={`text-xl sm:text-3xl md:text-5xl font-bold text-sacred-gold mb-2 sm:mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.title')}
                </h2>
                <h3 className={`text-lg sm:text-2xl md:text-3xl text-sacred-yellow ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.subtitle')}
                </h3>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-6 border-2 border-sacred-gold/30">
                  <div className="flex items-center justify-center mb-2 sm:mb-4">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-sacred-gold mr-2 sm:mr-3" />
                    <h4 className={`text-base sm:text-xl font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                      {t('invitation.date')}
                    </h4>
                  </div>
                </div>

                <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-6 border-2 border-sacred-gold/30">
                  <div className="flex items-center justify-center mb-2 sm:mb-4">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-sacred-gold mr-2 sm:mr-3" />
                    <div className={`text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                      <p className="text-sacred-yellow font-semibold">{t('invitation.puja')}</p>
                      <p className="text-sacred-yellow font-semibold">{t('invitation.pushpanjali')}</p>
                      <p className="text-sacred-yellow font-semibold">{t('invitation.prasad')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue Section */}
              <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-6 border-2 border-sacred-gold/30 mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-2 sm:mb-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-sacred-gold mr-2 sm:mr-3" />
                  <h4 className={`text-lg sm:text-2xl font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.venue')}
                  </h4>
                </div>
                <p className={`text-base sm:text-xl text-sacred-yellow mb-2 sm:mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.address')}
                </p>
                <Button onClick={openMaps} variant="blessing">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                    {t('directions')}
                  </span>
                </Button>
              </div>

              {/* Blessing Message */}
              <div className="mb-6 sm:mb-8">
                <p className={`text-lg sm:text-2xl md:text-3xl font-bold text-sacred-gold mb-2 sm:mb-4 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.blessing_text')}
                </p>
                <div className="w-24 sm:w-32 h-1 golden-gradient mx-auto rounded-full"></div>
              </div>

              {/* Family Signature */}
              <div className="mb-6 sm:mb-8">
                <p className={`text-base sm:text-xl text-sacred-yellow italic ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('invitation.regards')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                <Button
                  onClick={shareOnWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                    {t('share.whatsapp')}
                  </span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Decorative Footer */}
      <div 
        className="h-16 w-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      />
    </div>
  );
};

export default MainPage;

