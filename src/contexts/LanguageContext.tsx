import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hindi' | 'english';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  hindi: {
    // Welcome Page - Header Section
    'welcome.invocation': '|| ॐ श्री हनुमते नमः ||',
    'welcome.title': 'सुन्दरकाण्ड पाठ',
    'welcome.subtitle': 'सादर आमंत्रण',
    'welcome.blessing_title': '|| जय श्री राम ||',
    'welcome.blessing': 'श्री हनुमान चालीसा',
    'welcome.chalisa': 'हनुमान जी महाराज की कृपा से आप सभी का कल्याण हो। श्री राम जी के परम भक्त बजरंगबली आप सभी को आशीर्वाद दें।',

    // Host Information
    'host.family': 'श्री [आयोजक का नाम] परिवार',
    'host.invitation': 'हम आपको हार्दिक आमंत्रित करते हैं संपूर्ण सुन्दरकाण्ड के भव्य पाठ में',

    // Invitation Page - Event Details
    'invitation.title': 'सुन्दरकाण्ड पाठ',
    'invitation.subtitle': 'कार्यक्रम विवरण',
    'invitation.date': 'दिनांक: सोमवार, 1 अप्रैल 2024',
    'invitation.puja': 'पाठ आरंभ: सुबह 8:30 बजे',
    'invitation.aarti': 'आरती: सुबह 10:00 बजे',
    'invitation.prasad': 'प्रसाद वितरण: सुबह 10:30 बजे से',
    'invitation.feast': 'प्रीतिभोज: सायं 6:00 बजे से',

    // Venue Information
    'invitation.venue': 'स्थान',
    'invitation.address': 'श्री हनुमान मंदिर\n123 मुख्य मार्ग\nदिल्ली - 110001',

    // Contact Section
    'invitation.hosted_by': 'निमंत्रक',
    'invitation.blessing_text': 'कृपया इस निमंत्रण को स्वीकार कर हमारी खुशियों में शामिल होकर हमें धन्य करें',
    'invitation.presence_blessing': 'आपकी उपस्थिति से कार्यक्रम को पुण्य प्राप्त होगा',
    'invitation.regards': 'सादर - [परिवार का नाम] परिवार',
    'invitation.contact': 'संपर्क: +91 98765 43210',
    'invitation.gratitude': 'धन्यवाद',

    // Common
    'nav.home': 'मुख्य पृष्ठ',
    'nav.invitation': 'निमंत्रण',
    'share.whatsapp': 'व्हाट्सऐप पर साझा करें',
    'directions': 'दिशा-निर्देश',
  },
  english: {
    // Welcome Page - Header Section
    'welcome.invocation': '|| Om Shri Hanumate Namah ||',
    'welcome.title': 'Sundarkaand Paath',
    'welcome.subtitle': 'Cordial Invitation',
    'welcome.blessing_title': '|| Jai Shri Ram ||',
    'welcome.blessing': 'Hanuman Chalisa Blessing',
    'welcome.chalisa': 'May Lord Hanuman bless you all with prosperity and peace. The devoted follower of Shri Ram, Bajrangbali, shower his divine blessings upon everyone.',

    // Host Information
    'host.family': 'The [Host Family Name] Family',
    'host.invitation': 'cordially invites you to join us for the auspicious recitation of complete Sundarkaand Paath',

    // Invitation Page - Event Details
    'invitation.title': 'Sundarkaand Paath',
    'invitation.subtitle': 'Program Schedule',
    'invitation.date': 'Date: Monday, 1st April 2024',
    'invitation.puja': 'Paath begins: 8:30 AM',
    'invitation.aarti': 'Aarti: 10:00 AM',
    'invitation.prasad': 'Prasad distribution: 10:30 AM onwards',
    'invitation.feast': 'Community dinner: 6:00 PM onwards',

    // Venue Information
    'invitation.venue': 'Venue',
    'invitation.address': 'Shri Hanuman Temple\n123 Main Road\nDelhi - 110001',

    // Contact Section
    'invitation.hosted_by': 'Hosted By',
    'invitation.blessing_text': 'We seek your blessings and gracious presence to make this sacred occasion more meaningful',
    'invitation.presence_blessing': 'Your presence will add sanctity to our prayers',
    'invitation.regards': 'The [Family Name] Family',
    'invitation.contact': 'Contact: +91 98765 43210',
    'invitation.gratitude': 'Thank you',

    // Common
    'nav.home': 'Home',
    'nav.invitation': 'Invitation',
    'share.whatsapp': 'Share on WhatsApp',
    'directions': 'Get Directions',
  }
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