'use client';

import { useState, ReactNode } from 'react';

type Language = 'nl' | 'en';

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
  }
};

// Create a simple context value
const LanguageContext = {
  currentLanguage: 'nl' as Language,
  setLanguage: (lang: Language) => { LanguageContext.currentLanguage = lang; },
  t: (key: string) => translations[LanguageContext.currentLanguage]?.[key] || key
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Just render children, use global context
  return children;
}

export function useTranslation() {
  return LanguageContext;
}