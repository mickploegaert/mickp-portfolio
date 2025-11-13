'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'nl' | 'en';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  nl: {
    'nav.projects': 'Projecten',
    'nav.about': 'Over',
    'nav.contact': 'Contact',
    'contact.title': 'SHOOT A REQUEST',
    'contact.send': 'Send It!',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Masterpiece Starts Here',
    'contact.copied': 'Gekopieerd',
    'contact.success': 'Je bericht is succesvol verstuurd!',
    'contact.error': 'Het versturen van je bericht is mislukt. Probeer het opnieuw.',
    'hero.title': 'MICK PLOEGAERT',
    'hero.subtitle': 'Software Developer',
    'hero.cta': 'View Projects',
    'projects.title': 'PROJECTS',
    'about.title': 'OVER MIJ',
    'about.text1': 'Hey! Ik ben Mick, een software developer met een passie voor het bouwen van moderne webapplicaties.',
    'about.text2': 'Gespecialiseerd in frontend development met een focus op gebruiksvriendelijke interfaces en schone code.',
    'about.text3': 'Altijd op zoek naar nieuwe technologieën en uitdagingen om mijn skills verder te ontwikkelen.',
    'footer.github': 'GitHub',
    'footer.discord': 'Discord',
    'footer.linkedin': 'LinkedIn',
    'footer.phone': 'Bel mij',
    'theme.light': 'Licht',
    'theme.dark': 'Donker',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'contact.title': 'SHOOT A REQUEST',
    'contact.send': 'Send It!',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Masterpiece Starts Here',
    'contact.copied': 'Copied',
    'contact.success': 'Your message has been sent successfully!',
    'contact.error': 'Failed to send your message. Please try again.',
    'hero.title': 'MICK PLOEGAERT',
    'hero.subtitle': 'Software Developer',
    'hero.cta': 'View Projects',
    'projects.title': 'PROJECTS',
    'about.title': 'ABOUT ME',
    'about.text1': 'Hey! I\'m Mick, a software developer with a passion for building modern web applications.',
    'about.text2': 'Specialized in frontend development with a focus on user-friendly interfaces and clean code.',
    'about.text3': 'Always looking for new technologies and challenges to further develop my skills.',
    'footer.github': 'GitHub',
    'footer.discord': 'Discord',
    'footer.linkedin': 'LinkedIn',
    'footer.phone': 'Call me',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: string): string => {
    return translations[language]![key] || key;
  };

  const contextValue: AppContextType = {
    theme,
    setTheme,
    language,
    setLanguage,
    t
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}