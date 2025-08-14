/**
 * Application principale du Portfolio Ultra - Version Améliorée
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Portfolio personnel avec animations unifiées et design premium
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import useDarkMode from '@/hooks/useDarkMode';
import useScrollHandler from '@/hooks/useScrollHandler';
import useCursorPosition from '@/hooks/useCursorPosition';
import { usePerformanceMonitor } from '@/hooks/usePerformance';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/layout/BackToTopButton';
import FloatingShapes from '@/components/layout/FloatingShapes';
import CursorTrail from '@/components/layout/CursorTrail';

// Enhanced Components (Lazy loaded for performance)
const HeroEnhanced = lazy(() => import('@/components/sections/HeroEnhanced'));
const About = lazy(() => import('@/components/sections/About'));
const SkillsEnhanced = lazy(() => import('@/components/sections/SkillsEnhanced'));
const ExperienceEnhanced = lazy(() => import('@/components/sections/ExperienceEnhanced'));
const ProjectsEnhanced = lazy(() => import('@/components/sections/ProjectsEnhanced'));
const Certificats = lazy(() => import('@/components/sections/Certificats'));
const FunFacts = lazy(() => import('@/components/sections/FunFacts'));
const ContactEnhanced = lazy(() => import('@/components/sections/ContactEnhanced'));
const AnimatedBackgroundEnhanced = lazy(() => import('@/components/ui/AnimatedBackgroundEnhanced'));

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
    </div>
  </div>
);

// Section wrapper for lazy loading
const SectionWrapper = ({ children, fallback = <LoadingSpinner /> }) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { scrollProgress, activeSection, scrollToSection } = useScrollHandler();
  const cursorPosition = useCursorPosition();
  const { toast } = useToast();

  // Performance monitoring
  usePerformanceMonitor();

  useEffect(() => {
    // Preload critical assets
    const preloadImages = [
      '/profile.jpg',
      // Add other critical images here
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Initialize service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .catch(error => console.log('SW registration failed'));
    }

    // Performance optimization: Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  const handleContactSubmit = async (formData) => {
    try {
      // Here you would integrate with your email service (EmailJS, etc.)
      // For now, we'll show a success message
      toast({
        title: "Message envoyé avec succès ! 🚀",
        description: "Je vous répondrai dans les plus brefs délais. Merci pour votre intérêt !",
        duration: 5000,
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur est survenue. Veuillez réessayer ou me contacter directement.",
        duration: 5000,
      });
      return { success: false, error };
    }
  };

  const handleDownloadCV = () => {
    // Create a more realistic CV download experience
    toast({
      title: "Téléchargement du CV 📄",
      description: "Le CV sera bientôt disponible en téléchargement. En attendant, vous pouvez me contacter directement !",
      duration: 5000,
    });
    
    // You can implement actual CV download here
    // window.open('/cv-euloge-mabiala.pdf', '_blank');
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Euloge Mabiala - Portfolio | Étudiant Ingénieur Informatique & Développeur</title>
          <meta name="description" content="Portfolio d'Euloge Mabiala, étudiant ingénieur informatique à l'ESIEA. Spécialisé en développement web, cybersécurité et intelligence artificielle. Découvrez mes projets et compétences." />
          <meta name="keywords" content="Euloge Mabiala, développeur, ingénieur informatique, ESIEA, React, Python, JavaScript, portfolio, projets" />
          <meta name="author" content="Euloge Mabiala" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Euloge Mabiala - Portfolio Développeur" />
          <meta property="og:description" content="Découvrez le portfolio d'Euloge Mabiala, étudiant ingénieur en informatique passionné par le développement et l'innovation." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/profile.jpg" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Euloge Mabiala - Portfolio Développeur" />
          <meta name="twitter:description" content="Portfolio d'un étudiant ingénieur en informatique passionné par le développement web et l'IA." />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Theme color */}
          <meta name="theme-color" content="#60a5fa" />
        </Helmet>

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="min-h-screen relative overflow-x-hidden">
          {/* Enhanced Animated Background */}
          <SectionWrapper>
            <AnimatedBackgroundEnhanced variant="hero" />
          </SectionWrapper>

          {/* Cursor and Visual Effects */}
          <CursorTrail cursorPosition={cursorPosition} />
          <FloatingShapes />
          
          {/* Navigation */}
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
          />

          {/* Main Content */}
          <main className="relative z-10">
            {/* Hero Section */}
            <SectionWrapper>
              <HeroEnhanced 
                scrollToSection={scrollToSection} 
                handleDownloadCV={handleDownloadCV} 
              />
            </SectionWrapper>

            {/* About Section */}
            <SectionWrapper>
              <About />
            </SectionWrapper>

            {/* Skills Section */}
            <SectionWrapper>
              <SkillsEnhanced />
            </SectionWrapper>

            {/* Experience & Education Section */}
            <SectionWrapper>
              <ExperienceEnhanced />
            </SectionWrapper>

            {/* Certifications Section */}
            <SectionWrapper>
              <Certificats />
            </SectionWrapper>

            {/* Fun Facts Section */}
            <SectionWrapper>
              <FunFacts />
            </SectionWrapper>

            {/* Projects Section */}
            <SectionWrapper>
              <ProjectsEnhanced />
            </SectionWrapper>

            {/* Contact Section */}
            <SectionWrapper>
              <ContactEnhanced onSubmit={handleContactSubmit} />
            </SectionWrapper>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* UI Elements */}
          <BackToTopButton />
          <Toaster />
        </div>

        {/* Performance Monitoring Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor Core Web Vitals
              if ('web-vitals' in window) {
                import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                  getCLS(console.log);
                  getFID(console.log);
                  getFCP(console.log);
                  getLCP(console.log);
                  getTTFB(console.log);
                });
              }
            `
          }}
        />
      </>
    </HelmetProvider>
  );
}

export default App;
