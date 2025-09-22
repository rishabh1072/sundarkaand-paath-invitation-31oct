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
import AudioConsentModal from '@/components/AudioConsentModal';

const backgroundImages = [bg2, bg3, bg4, bg5, bg6, ramDarbarBg];

const MainPage = () => {
    const { t } = useLanguage();
    const mainSectionRef = useRef<HTMLDivElement>(null);
    const invitationSectionRef = useRef<HTMLDivElement>(null);
    const [mainAutoScrolled, setMainAutoScrolled] = useState(false);
    const [invitationAutoScrolled, setInvitationAutoScrolled] = useState(false);

    // Audio consent state
    const [showAudioConsent, setShowAudioConsent] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // IMPROVED BACKGROUND TRANSITION STATE
    const [currentBgIdx, setCurrentBgIdx] = useState(() => Math.floor(Math.random() * backgroundImages.length));
    const [nextBgIdx, setNextBgIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

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

    const handleAudioAccept = () => {
        setAudioEnabled(true);
        setShowAudioConsent(false);
    };

    const handleAudioDecline = () => {
        setAudioEnabled(false);
        setShowAudioConsent(false);
    };

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

    // Preload all background images to prevent distortion
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = backgroundImages.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesPreloaded(true);
                console.log('All background images preloaded successfully');
            } catch (error) {
                console.error('Error preloading images:', error);
                setImagesPreloaded(true); // Continue anyway
            }
        };

        preloadImages();
    }, []);

    // IMPROVED SMOOTH BACKGROUND TRANSITION LOGIC
    useEffect(() => {
        if (!imagesPreloaded) return;

        const intervalId = setInterval(() => {
            // Start transition
            setIsTransitioning(true);

            // Set next image
            setNextBgIdx(current => {
                let next;
                do {
                    next = Math.floor(Math.random() * backgroundImages.length);
                } while (next === currentBgIdx && backgroundImages.length > 1);
                return next;
            });

            // Complete transition after fade duration
            setTimeout(() => {
                setCurrentBgIdx(nextBgIdx);
                setIsTransitioning(false);
            }, 2000); // Match this with CSS transition duration

        }, 7000); // Change image every 7 seconds

        return () => clearInterval(intervalId);
    }, [imagesPreloaded, currentBgIdx, nextBgIdx]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: '#b91c1c' }}>
            {/* IMPROVED BACKGROUND IMAGE LAYERS */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                {imagesPreloaded && (
                    <>
                        {/* Current/Base Background Image */}
                        <div
                            className="absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out"
                            style={{
                                backgroundImage: `url(${backgroundImages[currentBgIdx]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                opacity: isTransitioning ? 0 : 1
                            }}
                        />

                        {/* Next/Transitioning Background Image */}
                        <div
                            className="absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out"
                            style={{
                                backgroundImage: `url(${backgroundImages[nextBgIdx]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                opacity: isTransitioning ? 1 : 0
                            }}
                        />
                    </>
                )}
            </div>

            {/* Stronger Semi-transparent Red Overlay Layer */}
            <div className="fixed inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(185,28,28,0.7)' }} />

            {/* Foreground Content */}
            <LanguageToggle />
            <AudioPlayer audioEnabled={audioEnabled} />
            <TempleBells />
            <div ref={mainSectionRef} className="w-full max-w-3xl mx-auto py-12 px-4 z-10">
                {/* Main Section Content */}
                <ScrollingMantra />

                {/* Welcome Page Content */}
                <div className="flex flex-col items-center justify-start text-center w-full min-h-0">
                    {/* Invocation - Header Section */}
                    <div className="mb-2 sm:mb-4">
                        <h1 className={`text-lg sm:text-2xl md:text-3xl font-bold text-sacred-gold mb-2 text-center`}>
                            {t('welcome.invocation')}
                        </h1>
                    </div>

                    {/* Main Title - Properly Centered */}
                    <div className="mb-4 sm:mb-6 animate-divine-pulse w-full flex flex-col items-center">
                        <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold temple-text mb-3 text-center leading-tight`}>
                            {t('welcome.title')}
                        </h1>
                        <div className="w-20 sm:w-28 h-1 golden-gradient mx-auto rounded-full animate-sacred-float"></div>
                    </div>

                    {/* Subtitle */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className={`text-xl sm:text-3xl md:text-4xl font-semibold text-sacred-yellow text-center`}>
                            {t('welcome.subtitle')}
                        </h2>
                    </div>

                    {/* Hanuman Portrait - moved lower */}
                    <div className="relative mb-8 sm:mb-12 group w-full flex justify-center">
                        <div className="absolute inset-0 bg-sacred-gold/20 rounded-full blur-3xl animate-divine-pulse"></div>
                        <img
                            src={hanumanPortrait}
                            alt="Lord Hanuman"
                            className="relative w-32 h-32 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full border-4 sm:border-8 border-yellow-400 shadow-2xl group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-sacred-red/20"></div>
                    </div>

                    {/* Blessing Title */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className={`text-lg sm:text-2xl md:text-3xl font-bold text-sacred-gold text-center`}>
                            {t('welcome.blessing_title')}
                        </h3>
                    </div>

                    {/* Blessing Text */}
                    <div className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 mb-6 sm:mb-8 rounded-2xl">
                        <p className={`text-sm sm:text-base md:text-lg text-sacred-yellow leading-relaxed`}>
                            {t('welcome.chalisa')}
                        </p>
                    </div>
                </div>
            </div>

            <div ref={invitationSectionRef} className="w-full max-w-3xl mx-auto py-12 px-4 z-10">
                {/* Invitation Section Content */}
                <Card className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-4 sm:p-6 md:p-8 text-center">
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className={`text-xl sm:text-3xl md:text-4xl font-bold temple-text mb-3 text-center`}>
                            {t('invitation.title')}
                        </h1>
                        <div className="w-16 sm:w-20 h-1 golden-gradient mx-auto rounded-full mb-4"></div>
                        <h2 className={`text-lg sm:text-xl md:text-2xl font-semibold text-sacred-gold text-center`}>
                            {t('invitation.subtitle')}
                        </h2>
                    </div>

                    {/* Date Section */}
                    <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-5 border-2 border-sacred-gold/30 mb-4 sm:mb-6">
                        <div className="flex items-center justify-center mb-2">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                            <h3 className={`text-base sm:text-lg font-bold text-sacred-gold text-center`}>
                                {t('invitation.date')}
                            </h3>
                        </div>
                    </div>

                    {/* Event Schedule */}
                    <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-5 border-2 border-sacred-gold/30 mb-4 sm:mb-6">
                        <div className="flex items-center justify-center mb-3">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                            <h3 className={`text-base sm:text-lg font-bold text-sacred-gold`}>{t('invitation.subtitle')}</h3>
                        </div>
                        <div className={`text-center space-y-2`}>
                            <p className="text-sacred-yellow font-semibold text-sm sm:text-base">{t('invitation.puja')}</p>
                            <p className="text-sacred-yellow font-semibold text-sm sm:text-base">{t('invitation.aarti')}</p>
                            <p className="text-sacred-yellow font-semibold text-sm sm:text-base">{t('invitation.prasad')}</p>
                            <p className="text-sacred-yellow font-semibold text-sm sm:text-base">{t('invitation.feast')}</p>
                        </div>
                    </div>

                    {/* Venue Section */}
                    <div className="bg-sacred-red/20 rounded-xl p-4 sm:p-5 border-2 border-sacred-gold/30 mb-4 sm:mb-6">
                        <div className="flex items-center justify-center mb-3">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-sacred-gold mr-2" />
                            <h3 className={`text-base sm:text-lg font-bold text-sacred-gold`}>
                                {t('invitation.venue')}
                            </h3>
                        </div>
                        <p className={`text-sm sm:text-base text-sacred-yellow mb-3 whitespace-pre-line text-center`}>
                            {t('invitation.address')}
                        </p>
                        <Button onClick={openMaps} variant="blessing" className="text-xs sm:text-sm">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span>
                {t('directions')}
              </span>
                        </Button>
                    </div>

                    {/* Host Information */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className={`text-base sm:text-lg font-bold text-sacred-gold mb-2 text-center`}>
                            {t('invitation.hosted_by')}
                        </h3>
                        <p className={`text-sm sm:text-base text-sacred-yellow text-center`}>
                            {t('invitation.regards')}
                        </p>
                    </div>

                    {/* Blessing Messages */}
                    <div className="mb-4 sm:mb-6 space-y-3">
                        <p className={`text-sm sm:text-base text-sacred-gold text-center leading-relaxed`}>
                            {t('invitation.blessing_text')}
                        </p>
                        <p className={`text-sm sm:text-base text-sacred-yellow text-center leading-relaxed`}>
                            {t('invitation.presence_blessing')}
                        </p>
                        <div className="w-16 sm:w-20 h-1 golden-gradient mx-auto rounded-full"></div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-4 sm:mb-6">
                        <p className={`text-sm sm:text-base text-sacred-yellow text-center mb-2`}>
                            {t('invitation.contact')}
                        </p>
                        <p className={`text-sm sm:text-base text-sacred-gold text-center font-semibold`}>
                            {t('invitation.gratitude')}
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

            {/* Audio Consent Modal */}
            <AudioConsentModal
                isOpen={showAudioConsent}
                onAccept={handleAudioAccept}
                onDecline={handleAudioDecline}
            />
        </div>
    );
};

export default MainPage;

