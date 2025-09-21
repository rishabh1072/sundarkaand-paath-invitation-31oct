import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Share2, Calendar, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import ScrollingMantra from '@/components/ScrollingMantra';
import AudioPlayer from '@/components/AudioPlayer';
import TempleBells from '@/components/TempleBells';
import hanumanBg from '@/assets/ram-darbar-bg.png';
import hanumanPortrait from '@/assets/hanuman-meditation.png';
import decorativeBorder from '@/assets/decorative-border.jpg';

const MainPage = () => {
  const { t, language } = useLanguage();

  // Track active tab
  const [activeTab, setActiveTab] = useState<'welcome' | 'invitation'>('welcome');

  // Create a proper handler for tab changes with smooth transition
  const handleTabChange = (value: string) => {
    if (value === 'welcome' || value === 'invitation') {
      setActiveTab(value);
    }
  };

  // Auto-switch to invitation after 14 seconds with smoother transition
  useEffect(() => {
    if (activeTab === 'welcome') {
      const timer = setTimeout(() => {
        setActiveTab('invitation');
      }, 14000); // Increased from 10s to 14s for slower transition
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
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Top Decorative Border */}
      <div
        className="w-full h-12 sm:h-16 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      />

      {/* Middle Section with background image and all overlays/content */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(128, 0, 0, 0.7), rgba(128, 0, 0, 0.8)), url(${hanumanBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Temple Bells Animation */}
        <TempleBells />

        {/* Scrolling Mantra Background */}
        <ScrollingMantra />

        {/* Audio Player */}
        <AudioPlayer />

        <div className="absolute top-4 right-4 z-20">
          <LanguageToggle />
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-3 sm:px-6 py-3 sm:py-6 h-full overflow-y-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-sacred-red/40 border border-sacred-gold backdrop-blur-sm">
              <TabsTrigger
                value="welcome"
                className="data-[state=active]:bg-sacred-gold data-[state=active]:text-sacred-red text-sacred-gold font-semibold transition-all duration-500 ease-in-out"
              >
                <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                  {t('nav.home')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="invitation"
                className="data-[state=active]:bg-sacred-gold data-[state=active]:text-sacred-red text-sacred-gold font-semibold transition-all duration-500 ease-in-out"
              >
                <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                  {t('nav.invitation')}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="welcome" className="space-y-4 sm:space-y-6 animate-in fade-in duration-700">
              {/* Welcome Page Content */}
              <div className="flex flex-col items-center justify-start text-center w-full min-h-0">
                {/* Main Title - Properly Centered "Jai Shri Ram" */}
                <div className="mb-4 sm:mb-6 animate-divine-pulse w-full flex flex-col items-center">
                  <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold temple-text mb-3 text-center leading-tight ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('welcome.title')}
                  </h1>
                  <div className="w-20 sm:w-28 h-1 golden-gradient mx-auto rounded-full animate-sacred-float"></div>
                </div>

                {/* Hanuman Portrait */}
                <div className="relative mb-4 sm:mb-6 group w-full flex justify-center">
                  <div className="absolute inset-0 bg-sacred-gold/20 rounded-full blur-3xl animate-divine-pulse"></div>
                  <img
                    src={hanumanPortrait}
                    alt="Lord Hanuman"
                    className="relative w-32 h-32 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full border-4 sm:border-8 border-yellow-400 shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-sacred-red/20"></div>
                </div>

                {/* Subtitle */}
                <h2 className={`text-base sm:text-xl md:text-2xl font-semibold text-sacred-yellow mb-4 sm:mb-6 text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                  {t('welcome.subtitle')}
                </h2>

                {/* Blessing Text */}
                <div className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 mb-6 sm:mb-8 rounded-2xl">
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold text-sacred-gold mb-2 sm:mb-3 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('welcome.blessing')}
                  </h3>
                  <p className={`text-sm sm:text-base md:text-lg text-sacred-yellow leading-relaxed ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('welcome.chalisa')}
                  </p>
                </div>

                {/* निमंत्रण देखें Button - Visible and Functional */}
                <div className="w-full flex justify-center">
                  <Button
                    onClick={() => setActiveTab('invitation')}
                    variant="default"
                    className="bg-sacred-gold hover:bg-sacred-yellow text-sacred-red font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                      निमंत्रण देखें
                    </span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invitation" className="space-y-4 sm:space-y-6 animate-in fade-in duration-700">
              {/* Invitation Page Content */}
              <Card className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 md:p-8 text-center">
                {/* Title Section */}
                <div className="mb-4 sm:mb-6">
                  <h1 className={`text-xl sm:text-3xl md:text-4xl font-bold temple-text mb-2 text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('welcome.title')}
                  </h1>
                  <div className="w-12 sm:w-16 h-1 golden-gradient mx-auto rounded-full mb-3 sm:mb-4"></div>
                  <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold text-sacred-gold mb-2 text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.title')}
                  </h2>
                  <h3 className={`text-base sm:text-lg md:text-xl text-sacred-yellow text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.subtitle')}
                  </h3>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-sacred-red/20 rounded-xl p-3 sm:p-4 border-2 border-sacred-gold/30">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                      <h4 className={`text-sm sm:text-base font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                        {t('invitation.date')}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-sacred-red/20 rounded-xl p-3 sm:p-4 border-2 border-sacred-gold/30">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                      <div className={`text-center ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                        <p className="text-sacred-yellow font-semibold text-xs sm:text-sm">{t('invitation.puja')}</p>
                        <p className="text-sacred-yellow font-semibold text-xs sm:text-sm">{t('invitation.pushpanjali')}</p>
                        <p className="text-sacred-yellow font-semibold text-xs sm:text-sm">{t('invitation.prasad')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue Section */}
                <div className="bg-sacred-red/20 rounded-xl p-3 sm:p-4 border-2 border-sacred-gold/30 mb-4 sm:mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                    <h4 className={`text-base sm:text-lg font-bold text-sacred-gold ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                      {t('invitation.venue')}
                    </h4>
                  </div>
                  <p className={`text-sm sm:text-base text-sacred-yellow mb-2 sm:mb-3 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.address')}
                  </p>
                  <Button onClick={openMaps} variant="blessing" className="text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                      {t('directions')}
                    </span>
                  </Button>
                </div>

                {/* Blessing Message */}
                <div className="mb-4 sm:mb-6">
                  <p className={`text-base sm:text-lg md:text-xl font-bold text-sacred-gold mb-2 ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.blessing_text')}
                  </p>
                  <div className="w-16 sm:w-20 h-1 golden-gradient mx-auto rounded-full"></div>
                </div>

                {/* Family Signature */}
                <div className="mb-4 sm:mb-6">
                  <p className={`text-sm sm:text-base text-sacred-yellow italic ${language === 'hindi' ? 'hindi-text' : 'font-playfair'}`}>
                    {t('invitation.regards')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:gap-3 justify-center">
                  <Button
                    onClick={shareOnWhatsApp}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-2 text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    <span className={language === 'hindi' ? 'hindi-text' : 'font-playfair'}>
                      {t('share.whatsapp')}
                    </span>
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div
        className="w-full h-8 sm:h-12 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${decorativeBorder})` }}
      />
    </div>
  );
};

export default MainPage;
