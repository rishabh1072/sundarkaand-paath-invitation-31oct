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
    'welcome.chalisa': 'परमपिता परमात्मा की असीम अनुकम्पा से हमारे निवास स्थान पर सुंदरकांड पाठ का आयोजन किया जा रहा है। इस शुभ अवसर पर आप सादर आमंत्रित हैं। कृपया परिवार सहित पधार कर हमें अनुग्रहित करें।',

    // Host Information
    'host.family': '',
    'host.invitation': '',

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
    'welcome.chalisa': 'By the immense grace of the Supreme Lord, a Sundarkand recital is being organized at our residence. You are cordially invited to join us on this auspicious occasion with your family. Please honor us with your presence.',

    // Host Information
    'host.family': '',
    'host.invitation': '',

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