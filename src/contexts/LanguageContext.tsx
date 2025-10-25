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
    // 'welcome.invocation': '|| ॐ श्री हनुमते नमः ||',
    'welcome.title': 'सुन्दरकाण्ड पाठ',
    'welcome.subtitle': 'सादर आमंत्रण',
    'welcome.blessing_title': '|| जय श्री राम ||',
    'welcome.chalisa': 'परमपिता परमात्मा की असीम अनुकम्पा से हमारे निवास स्थान पर सुंदरकांड पाठ का आयोजन किया जा रहा है। इस शुभ अवसर पर आप सादर आमंत्रित हैं। कृपया परिवार सहित पधार कर हमें अनुग्रहित करें।',
    'welcome.invocation': '|| ॐ श्री हनुमते नमः ||',

    // Host Information
    'host.family': '',
    'host.invitation': '',

    // Invitation Page - Event Details
    'invitation.title': 'सुन्दरकाण्ड पाठ',
    'invitation.subtitle': 'कार्यक्रम विवरण',
    'invitation.date': 'दिनांक: शुक्रवार, 31 अक्टूबर 2025',
    'invitation.puja': 'पाठ आरंभ: दोपहर 1:00 बजे',
    'invitation.aarti': 'आरती: सांय 6:00 बजे',
    'invitation.prasad': 'प्रसादी: सांय 6:30 बजे से',

    // Venue Information
    'invitation.venue': 'स्थान',
    'invitation.address': 'म.नं 9, साई वाटिका कॉलोनी फेज-1, शेखर सर्राफ मेमोरियल अस्पताल(रूसा) के सामने, आगरा रोड, अलीगढ़, उत्तर प्रदेश - 202001',

    // Contact Section
    'invitation.hosted_by': 'निवेदक',
    'invitation.blessing_text': 'कृपया इस निमंत्रण को स्वीकार कर हमारी खुशियों में शामिल होकर हमें धन्य करें',
    'invitation.presence_blessing': 'आपकी उपस्थिति से कार्यक्रम को पुण्य प्राप्त होगा',
    'invitation.regards': 'श्री विनोद कुमार अग्रवाल',
    'invitation.contact': 'संपर्क: +91 9837046876, +91 7906518764',
    'invitation.gratitude': 'धन्यवाद',

    // Common
    'nav.home': 'मुख्य पृष्ठ',
    'nav.invitation': 'निमंत्रण',
    'share.whatsapp': 'व्हाट्सऐप पर साझा करें',
    'directions': 'Get Directions',
  },
  english: {
    // Welcome Page - Header Section
    // 'welcome.invocation': '|| Om Shri Hanumate Namah ||',
    'welcome.title': 'Sundarkaand Paath',
    'welcome.subtitle': 'Cordial Invitation',
    'welcome.blessing_title': '|| Jai Shri Ram ||',
    'welcome.chalisa': 'By the immense grace of the Supreme Lord, a Sundarkand recital is being organized at our residence. You are cordially invited to join us on this auspicious occasion with your family. Please honor us with your presence.',
    'welcome.invocation': '|| Om Shri Hanumate Namah ||',

    // Host Information
    'host.family': '',
    'host.invitation': '',

    // Invitation Page - Event Details
    'invitation.title': 'Sundarkaand Paath',
    'invitation.subtitle': 'Program Schedule',
    'invitation.date': 'Date: Friday, 31st October 2025',
    'invitation.puja': 'Paath begins: 1:00 PM',
    'invitation.aarti': 'Aarti: 6:00 PM',
    'invitation.prasad': 'Prasad: 6:30 PM onwards',

    // Venue Information
    'invitation.venue': 'Venue',
    'invitation.address': 'House No. 9, Sai Vatika Colony Phase-1, Opposite Shekhar Sarraf Memorial Hospital(Rusa), Agra Road, Aligarh, Uttar Pradesh - 202001',

    // Contact Section
    'invitation.hosted_by': 'Hosted By',
    'invitation.blessing_text': 'We seek your blessings and gracious presence to make this sacred occasion more meaningful',
    'invitation.presence_blessing': 'Your presence will add sanctity to our prayers',
    'invitation.regards': 'Mr. Vinod Kumar Agrawal',
    'invitation.contact': 'Contact: +91 9837046876, +91 7906518764',
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