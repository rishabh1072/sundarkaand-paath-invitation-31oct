import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hindi' | 'english';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  hindi: {
    // Welcome Page
    'welcome.title': 'जय श्री राम',
    'welcome.subtitle': 'सुंदरकांड पाठ एवं प्रसाद वितरण',
    'welcome.blessing': 'श्री हनुमान चालीसा',
    'welcome.chalisa': 'हनुमान जी महाराज की कृपा से आप सभी का कल्याण हो। श्री राम जी के परम भक्त बजरंगबली आप सभी को आशीर्वाद दें।',
    'welcome.proceed': 'निमंत्रण देखें',
    
    // Invitation Page
    'invitation.title': 'सुंदरकांड पाठ',
    'invitation.subtitle': 'एवं प्रसाद वितरण',
    'invitation.date': 'दिनांक: सोमवार, 1 अप्रैल 2024',
    'invitation.puja': 'पूजा समय: सुबह 8:30 बजे से',
    'invitation.pushpanjali': 'पुष्पांजलि: सुबह 9:00 बजे से',
    'invitation.prasad': 'प्रसाद: शाम 6:00 बजे से',
    'invitation.venue': 'स्थान',
    'invitation.address': 'होटल का नाम यहाँ, पता यहाँ',
    'invitation.blessing_text': 'श्री हनुमान जी के आशीर्वाद के लिए पधारें',
    'invitation.regards': 'सादर - [परिवार का नाम] परिवार',
    'invitation.rsvp': 'कृपया अपनी उपस्थिति की पुष्टि करें',
    
    // Common
    'nav.home': 'मुख्य पृष्ठ',
    'nav.invitation': 'निमंत्रण',
    'share.whatsapp': 'व्हाट्सऐप पर साझा करें',
    'directions': 'दिशा-निर्देश',
  },
  english: {
    // Welcome Page
    'welcome.title': 'Jai Shri Ram',
    'welcome.subtitle': 'Sundarkaand Path & Prasad Distribution',
    'welcome.blessing': 'Hanuman Chalisa Blessing',
    'welcome.chalisa': 'May Lord Hanuman bless you all with prosperity and peace. The devoted follower of Shri Ram, Bajrangbali, shower his divine blessings upon everyone.',
    'welcome.proceed': 'View Invitation',
    
    // Invitation Page
    'invitation.title': 'Sundarkaand Path',
    'invitation.subtitle': '& Prasad Distribution',
    'invitation.date': 'Date: Monday, 1st April 2024',
    'invitation.puja': 'Puja Timing: 8:30 am onwards',
    'invitation.pushpanjali': 'Pushpanjali: 9:00 am onwards',
    'invitation.prasad': 'Prasad: 6:00 pm onwards',
    'invitation.venue': 'Venue',
    'invitation.address': 'Hotel Name Here, Address Here',
    'invitation.blessing_text': 'Join us & take the blessings of Lord Hanuman Ji',
    'invitation.regards': 'Regards - [Family Name] Family',
    'invitation.rsvp': 'Please confirm your presence',
    
    // Common
    'nav.home': 'Home',
    'nav.invitation': 'Invitation',
    'share.whatsapp': 'Share on WhatsApp',
    'directions': 'Get Directions',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hindi');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['english']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};