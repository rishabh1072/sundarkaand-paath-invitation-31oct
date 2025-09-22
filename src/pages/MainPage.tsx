import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Share2, Calendar, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import ScrollingMantra from '@/components/ScrollingMantra';
import AudioPlayer from '@/components/AudioPlayer';
import TempleBells from '@/components/TempleBells';
import bg2 from '@/assets/background/bg-2.png';
import bg3 from '@/assets/background/bg-3.png';
import bg4 from '@/assets/background/bg-4.png';
import bg5 from '@/assets/background/bg-5.png';
import bg6 from '@/assets/background/bg-6.png';
import ramDarbarBg from '@/assets/background/ram-darbar-bg.png';
import hanumanPortrait from '@/assets/hanuman-meditation.png';
import decorativeBorder from '@/assets/decorative-border.jpg';

const backgroundImages = [bg2, bg3, bg4, bg5, bg6, ramDarbarBg];

const MainPage = () => {
  const { t } = useLanguage();
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const invitationSectionRef = useRef<HTMLDivElement>(null);
  const [mainAutoScrolled, setMainAutoScrolled] = useState(false);
  const [invitationAutoScrolled, setInvitationAutoScrolled] = useState(false);

  // Auto-scroll from main to invitation section after 10s (only once)
  useEffect(() => {
    if (!mainAutoScrolled) {
      const timer = setTimeout(() => {
        invitationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setMainAutoScrolled(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [mainAutoScrolled]);

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

  const [currentBgIdx, setCurrentBgIdx] = useState(() => Math.floor(Math.random() * backgroundImages.length));
  const [fade, setFade] = useState(false);

  // Change background every 8 seconds, random, no immediate repeat, with smooth fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setCurrentBgIdx(prevIdx => {
          let nextIdx;
          do {
            nextIdx = Math.floor(Math.random() * backgroundImages.length);
          } while (nextIdx === prevIdx);
          return nextIdx;
        });
      }, 8000); // fade duration matches transition
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: '#b91c1c' }}>
      {/* Background Image Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src={backgroundImages[currentBgIdx]}
          alt="Background"
          className={`w-full h-full object-cover transition-opacity duration-2000 ${fade ? 'opacity-0' : 'opacity-100'}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
      {/* Semi-transparent Red Overlay Layer */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(185,28,28,0.35)' }} />
      {/* Foreground Content */}
      <LanguageToggle />
      <AudioPlayer />
      <TempleBells />
      <div ref={mainSectionRef} className="w-full max-w-3xl mx-auto py-12 px-4 z-10">
        {/* Main Section Content */}
        <ScrollingMantra />

        {/* Welcome Page Content */}
        <div className="flex flex-col items-center justify-start text-center w-full min-h-0">
          {/* Main Title - Properly Centered "Jai Shri Ram" */}
          <div className="mb-4 sm:mb-6 animate-divine-pulse w-full flex flex-col items-center">
            <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold temple-text mb-3 text-center leading-tight`}>
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
          <h2 className={`text-base sm:text-xl md:text-2xl font-semibold text-sacred-yellow mb-4 sm:mb-6 text-center`}>
            {t('welcome.subtitle')}
          </h2>

          {/* Blessing Text */}
          <div className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 mb-6 sm:mb-8 rounded-2xl">
            <h3 className={`text-base sm:text-lg md:text-xl font-bold text-sacred-gold mb-2 sm:mb-3`}>
              {t('welcome.blessing')}
            </h3>
            <p className={`text-sm sm:text-base md:text-lg text-sacred-yellow leading-relaxed`}>
              {t('welcome.chalisa')}
            </p>
          </div>

          {/* निमंत्रण देखें Button - Visible and Functional */}
          <div className="w-full flex justify-center">
            <Button
              onClick={() => invitationSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              variant="default"
              className="bg-sacred-gold hover:bg-sacred-yellow text-sacred-red font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>
                निमंत्रण देखें
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div ref={invitationSectionRef} className="w-full max-w-3xl mx-auto py-12 px-4 z-10">
        {/* Invitation Section Content */}
        <Card className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 md:p-8 text-center">
          {/* Title Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className={`text-xl sm:text-3xl md:text-4xl font-bold temple-text mb-2 text-center`}>
              {t('welcome.title')}
            </h1>
            <div className="w-12 sm:w-16 h-1 golden-gradient mx-auto rounded-full mb-3 sm:mb-4"></div>
            <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold text-sacred-gold mb-2 text-center`}>
              {t('invitation.title')}
            </h2>
            <h3 className={`text-base sm:text-lg md:text-xl text-sacred-yellow text-center`}>
              {t('invitation.subtitle')}
            </h3>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-sacred-red/20 rounded-xl p-3 sm:p-4 border-2 border-sacred-gold/30">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                <h4 className={`text-sm sm:text-base font-bold text-sacred-gold`}>
                  {t('invitation.date')}
                </h4>
              </div>
            </div>

            <div className="bg-sacred-red/20 rounded-xl p-3 sm:p-4 border-2 border-sacred-gold/30">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                <div className={`text-center`}>
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
              <h4 className={`text-base sm:text-lg font-bold text-sacred-gold`}>
                {t('invitation.venue')}
              </h4>
            </div>
            <p className={`text-sm sm:text-base text-sacred-yellow mb-2 sm:mb-3`}>
              {t('invitation.address')}
            </p>
            <Button onClick={openMaps} variant="blessing" className="text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>
                {t('directions')}
              </span>
            </Button>
          </div>

          {/* Blessing Message */}
          <div className="mb-4 sm:mb-6">
            <p className={`text-base sm:text-lg md:text-xl font-bold text-sacred-gold mb-2`}>
              {t('invitation.blessing_text')}
            </p>
            <div className="w-16 sm:w-20 h-1 golden-gradient mx-auto rounded-full"></div>
          </div>

          {/* Family Signature */}
          <div className="mb-4 sm:mb-6">
            <p className={`text-sm sm:text-base text-sacred-yellow italic`}>
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
              <span>
                {t('share.whatsapp')}
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;
