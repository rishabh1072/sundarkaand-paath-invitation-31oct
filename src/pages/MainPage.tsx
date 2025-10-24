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
import AudioConsentModal from '@/components/AudioConsentModal';

const backgroundImages = [bg2, bg3, bg4, bg5, bg6, ramDarbarBg];

const MainPage = () => {
    const { t } = useLanguage();
    const mainSectionRef = useRef<HTMLDivElement>(null);
    const invitationSectionRef = useRef<HTMLDivElement>(null);
    const [mainAutoScrolled, setMainAutoScrolled] = useState(false);

    // Audio consent state
    const [showAudioConsent, setShowAudioConsent] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // IMPROVED BACKGROUND TRANSITION STATE
    const [currentBgIdx, setCurrentBgIdx] = useState(() => Math.floor(Math.random() * backgroundImages.length));
    const [nextBgIdx, setNextBgIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    // Auto-scroll from main to invitation section after 5s (only once)
    useEffect(() => {
        if (!mainAutoScrolled) {
            const timer = setTimeout(() => {
                invitationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                setMainAutoScrolled(true);
            }, 5000); // Changed from 10000 to 5000 (5 seconds)
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
        let message;
        const mapsLink = 'https://maps.app.goo.gl/?link=https://www.google.com/maps?q=27.853529847392654,78.07953158817394';
        if (t('nav.home') === 'मुख्य पृष्ठ') {
            // Hindi message
            message = `॥ जय श्री राम ॥\n॥ श्री हनुमते नमः ॥\n\nईश्वर की असीम अनुकम्पा से  \nहमारे निवास स्थान पर  \n*सुंदरकाण्ड पाठ*  \nका आयोजन किया जा रहा है।\n\nइस शुभ अवसर पर आप सपरिवार सादर आमंत्रित हैं।  \nकृपया पधारकर हमें कृतार्थ करें एवं हनुमान जी के आशीर्वाद के सहभागी बनें। 🙏🏻\n\n🗓️ *दिनांक:* शुक्रवार, 31 अक्टूबर 2025  \n🕣 *पाठ प्रारंभ:* दोपहर 2:00 बजे  \n🕉️ *आरती:* सायं 6:00 ��जे  \n🍛 *प्रसाद वितरण:* सायं 6:30 बजे से  \n\n📍 *स्थान:*  \nम.नं 9, साई वाटिका कॉलोनी फेज 1,  \nरूसा मेडिकल सेंटर के सामने,  \nआगरा रोड, अलीगढ़, उत्तर प्रदेश - 202001  \n\n🗺️ *Google Map:*  \n👉 ${mapsLink}\n\n🌐 *विस्तृत जानकारी हेतु देखें:*  \n�� https://tinyurl.com/invitation-31oct25\n\n🙏🏻 *आपकी उपस्थिति हमारे लिए परम सौभाग्य की बात होगी।*  \n\nसादर,  \n*अग्रवाल परिवार*  \n📞 +91 9837046876 | +91 7906518764`;
        } else {
            // English message
            message = `॥ Jai Shri Ram ॥\n॥ Shri Hanumate Namah ॥\n\nWith the divine grace of the Almighty,  \nwe are organizing a sacred *Sundarkaand Paath*  \nat our residence.\n\nOn this auspicious occasion,  \nyou and your family are cordially invited  \nto join us and seek the blessings of Lord Hanuman. 🙏🏻\n\n🗓️ *Date:* Friday, 31st October 2025  \n🕣 *Paath begins:* 2:00 PM  \n🕉️ *Aarti:* 6:00 PM  \n🍛 *Prasad:* 6:30 PM onwards  \n\n📍 *Venue:*  \nHouse No. 9, Sai Vatika Colony Phase 1,  \nOpposite Rusa Medical Centre,  \nAgra Road, Aligarh, Uttar Pradesh - 202001  \n\n🗺️ *Google Map:*  \n👉 ${mapsLink}\n\n🌐 *For complete details and directions:*  \n👉 https://tinyurl.com/invitation-31oct25\n\n🙏🏻 Your presence will be a blessing to us on this sacred day.  \n\nWith regards,  \n*Mr. Vinod Kumar Agrawal, Mrs. Seema Agrawal*  \n📞 +91 9837046876 | +91 7906518764`;
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    const openMaps = () => {
        const coordinates = "27.853529847392654, 78.07953158817394";
        window.open(`https://maps.google.com?q=${coordinates}`, '_blank');
    };

    // Preload all background images to prevent distortion
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = backgroundImages.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        console.log('Successfully loaded image:', src);
                        resolve(src);
                    };
                    img.onerror = (error) => {
                        console.error('Failed to load image:', src, error);
                        reject(error);
                    };
                    img.src = src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesPreloaded(true);
                console.log('All background images preloaded successfully');
            } catch (error) {
                console.error('Error preloading images:', error);
                // Still set to true to show fallback background
                setImagesPreloaded(true);
            }
        };

        preloadImages();
    }, []);

    // IMPROVED SMOOTH BACKGROUND TRANSITION LOGIC
    useEffect(() => {
        if (!imagesPreloaded) return;

        let displayTimeout: NodeJS.Timeout;
        let transitionTimeout: NodeJS.Timeout;
        let isUnmounted = false;

        const startDisplayCycle = () => {
            displayTimeout = setTimeout(() => {
                setIsTransitioning(true);

                // Generate next background index before transition - FIXED RANDOMIZATION
                const nextIdx = (() => {
                    let next;
                    let attempts = 0;
                    const maxAttempts = 10; // Prevent infinite loop

                    do {
                        next = Math.floor(Math.random() * backgroundImages.length);
                        attempts++;
                        console.log(`Random selection attempt ${attempts}: selected index ${next}, current index ${currentBgIdx}`);
                    } while (next === currentBgIdx && backgroundImages.length > 1 && attempts < maxAttempts);

                    // If we couldn't find a different index after max attempts, just increment
                    if (attempts >= maxAttempts) {
                        next = (currentBgIdx + 1) % backgroundImages.length;
                        console.log(`Fallback: using incremented index ${next}`);
                    }

                    console.log(`Final selected background index: ${next} (${backgroundImages[next]})`);
                    return next;
                })();
                setNextBgIdx(nextIdx);

                transitionTimeout = setTimeout(() => {
                    setCurrentBgIdx(nextIdx);
                    setIsTransitioning(false);
                    if (!isUnmounted) startDisplayCycle();
                }, 2500); // Increased transition duration for smoother effect
            }, 5000); // Increased display duration by 2 seconds (from 3000 to 5000)
        };

        startDisplayCycle();

        return () => {
            isUnmounted = true;
            clearTimeout(displayTimeout);
            clearTimeout(transitionTimeout);
        };
    }, [imagesPreloaded, currentBgIdx]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: '#b91c1c' }}>
            {/* IMPROVED BACKGROUND IMAGE LAYERS */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                {/* Always show at least one background image even before preloading completes */}
                <div
                    className="absolute inset-0 w-full h-full animate-subtle-zoom"
                    style={{
                        backgroundImage: `url(${backgroundImages[currentBgIdx]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: imagesPreloaded ? (isTransitioning ? 0 : 1) : 1
                    }}
                />

                {/* Next/Transitioning Background Image - only show when preloaded and transitioning */}
                {imagesPreloaded && isTransitioning && (
                    <div
                        className="absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out animate-subtle-zoom"
                        style={{
                            backgroundImage: `url(${backgroundImages[nextBgIdx]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1
                        }}
                    />
                )}
            </div>

            {/* Stronger Semi-transparent Red Overlay Layer */}
            <div className="fixed inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(185,28,28,0.7)' }} />

            {/* Top Header - Non-floating with Jai Shree Ram centered and Language Toggle on right, now with bells */}
            <div className="relative w-full flex items-center justify-center px-4 pt-4 pb-2 z-20">
                <div className="flex-1 flex flex-row items-center justify-center">
                    <span
                        className="text-sacred-gold drop-shadow-lg animate-bell-sway-left flex items-center justify-center"
                        style={{ filter: 'brightness(1.2)', fontSize: '1.125rem', width: '1.125rem', height: '1.125rem' }}
                    >
                        🔔
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sacred-gold text-center mx-2">
                        {t('welcome.blessing_title')}
                    </h3>
                    <span
                        className="text-sacred-gold drop-shadow-lg animate-bell-sway-right flex items-center justify-center"
                        style={{ filter: 'brightness(1.2)', fontSize: '1.125rem', width: '1.125rem', height: '1.125rem' }}
                    >
                        🔔
                    </span>
                </div>
                <div className="absolute right-4 top-4">
                    <LanguageToggle />
                </div>
            </div>

            <AudioPlayer audioEnabled={audioEnabled} />
            <TempleBells />
            <div ref={mainSectionRef} className="w-full max-w-3xl mx-auto py-12 px-4 z-10">
                {/* Main Section Content */}
                <ScrollingMantra />

                {/* Welcome Page Content */}
                <div className="flex flex-col items-center justify-start text-center w-full min-h-0">
                    {/* Main Title - Properly Centered */}
                    {/* Bells and Chant - Replace standalone mantra with bell-mantra-bell */}
                    <div className="flex flex-row items-center justify-center mb-2 select-none">
                        <span
                            className="text-sacred-gold drop-shadow-lg animate-bell-sway-left flex items-center justify-center"
                            style={{ filter: 'brightness(1.2)', fontSize: '1.125rem', width: '1.125rem', height: '1.125rem' }}
                        >
                            🔔
                        </span>
                        <span
                            className="text-sacred-gold font-bold tracking-wide whitespace-nowrap flex items-center justify-center mx-1"
                            style={{ fontSize: '1.125rem', lineHeight: '1.125rem', height: '1.125rem' }}
                        >
                            {t('welcome.invocation')}
                        </span>
                        <span
                            className="text-sacred-gold drop-shadow-lg animate-bell-sway-right flex items-center justify-center"
                            style={{ filter: 'brightness(1.2)', fontSize: '1.125rem', width: '1.125rem', height: '1.125rem' }}
                        >
                            🔔
                        </span>
                    </div>
                    <div className="mb-4 sm:mb-6 animate-divine-pulse w-full flex flex-col items-center max-w-lg mx-auto px-4 sm:px-8">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold temple-text mb-3 text-center leading-tight">
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

                    {/* Blessing Text */}
                    <div className="devotional-card w-full max-w-sm sm:max-w-lg mx-auto p-3 sm:p-6 mb-1 sm:mb-2 rounded-2xl">
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

            {/*/!* Small Bells and Chant - Footer or below main content *!/*/}
            {/*<div className="w-full flex flex-row items-center justify-center mt-8 mb-2 select-none">*/}
            {/*  <span*/}
            {/*    className="text-sacred-gold flex items-center justify-center"*/}
            {/*    style={{ fontSize: '1rem', width: '1rem', height: '1rem' }}*/}
            {/*  >*/}
            {/*    🔔*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    className="text-sacred-gold font-bold tracking-wide whitespace-nowrap flex items-center justify-center mx-1"*/}
            {/*    style={{ fontSize: '1rem', lineHeight: '1rem', height: '1rem' }}*/}
            {/*  >*/}
            {/*    || ॐ श्री हनुमते नमः ||*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    className="text-sacred-gold flex items-center justify-center"*/}
            {/*    style={{ fontSize: '1rem', width: '1rem', height: '1rem' }}*/}
            {/*  >*/}
            {/*    🔔*/}
            {/*  </span>*/}
            {/*</div>*/}
        </div>
    );
};

export default MainPage;

