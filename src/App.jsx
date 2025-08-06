import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import useDarkMode from '@/hooks/useDarkMode';
import useScrollHandler from '@/hooks/useScrollHandler';
import useCursorPosition from '@/hooks/useCursorPosition';
import { useTranslation } from 'react-i18next';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import StatsRPGSection from '@/components/sections/StatsRPGSection';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import BackToTopButton from '@/components/layout/BackToTopButton';
import FloatingShapes from '@/components/layout/FloatingShapes';
import CursorTrail from '@/components/layout/CursorTrail';
import Passions from '@/components/sections/Passions';
import VideoPresentation from '@/components/sections/VideoPresentation';
import Certificats from '@/components/sections/Certificats';
import FunFacts from '@/components/sections/FunFacts';
import ChasseurTaches from './components/sections/ChasseurTaches';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { scrollProgress, activeSection, scrollToSection } = useScrollHandler();
  const cursorPosition = useCursorPosition();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      // setScrollProgress(progress); // This line was removed as per the edit hint
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fonctionnalité en développement",
      description: "Le formulaire de contact n'est pas encore implémenté—mais n'hésitez pas à me demander de l'ajouter ! 🚀",
      duration: 5000,
    });
  };

  const handleDownloadCV = () => {
    toast({
      title: "🚧 CV en préparation",
      description: "Le téléchargement du CV n'est pas encore disponible—mais vous pouvez me demander de l'implémenter ! 🚀",
      duration: 5000,
    });
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Euloge Mabiala - Portfolio | Étudiant Ingénieur Informatique</title>
          <meta name="description" content="Portfolio d'Euloge Mabiala, étudiant ingénieur informatique à l'ESIEA. Spécialisé en développement web, cybersécurité et intelligence artificielle." />
        </Helmet>
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="min-h-screen relative overflow-x-hidden">
          <CursorTrail cursorPosition={cursorPosition} />
          <FloatingShapes />
          
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
          />

          <main>
            <Hero scrollToSection={scrollToSection} handleDownloadCV={handleDownloadCV} />
            <About />
            <VideoPresentation />
            <Passions />
            <Certificats />
            <FunFacts />
            <StatsRPGSection />
            <Projects />
            <Contact />
            <ChasseurTaches />
          </main>
          
          <Footer />
          <BackToTopButton />
          <Toaster />
        </div>
      </>
    </HelmetProvider>
  );
}

export default App;