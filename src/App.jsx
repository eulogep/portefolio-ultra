import React, { useEffect, Suspense, lazy, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import useDarkMode from '@/hooks/useDarkMode';
import useScrollHandler from '@/hooks/useScrollHandler';
import useCursorPosition from '@/hooks/useCursorPosition';
import { usePerformanceMonitor } from '@/hooks/usePerformance';
import { useAdvancedScrollEffects } from '@/hooks/useAdvancedScrollEffects';
import { useThemeState } from '@/hooks/useAdvancedTheme';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/layout/BackToTopButton';
import FloatingShapes from '@/components/layout/FloatingShapes';
import CursorTrail from '@/components/layout/CursorTrail';

// UI Components
import { MouseFollower } from '@/components/ui/MicroInteractions';
import ThemeSelector from '@/components/ui/ThemeSelector';

// Enhanced Components (Lazy loaded for performance)
const HeroEnhanced = lazy(() => import('@/components/sections/HeroEnhanced'));
const About = lazy(() => import('@/components/sections/About'));
const SkillsEnhanced = lazy(() => import('@/components/sections/SkillsEnhanced'));
const ExperienceEnhanced = lazy(() => import('@/components/sections/ExperienceEnhanced'));
const ProjectsEnhanced = lazy(() => import('@/components/sections/ProjectsEnhanced'));
const TestimonialsCarousel = lazy(() => import('@/components/sections/TestimonialsCarousel'));
const Certificats = lazy(() => import('@/components/sections/Certificats'));
const FunFacts = lazy(() => import('@/components/sections/FunFacts'));
const ContactEnhanced = lazy(() => import('@/components/sections/ContactEnhanced'));
const AnimatedBackgroundEnhanced = lazy(() => import('@/components/ui/AnimatedBackgroundEnhanced'));

// Loading Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <motion.div 
        className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute inset-0 w-16 h-16 border-4 border-secondary-200 border-t-secondary-500 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-8 p-8">
    <div className="h-64 bg-glass-bg rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-glass-bg rounded-xl" />
      ))}
    </div>
  </div>
);

// Section wrapper for lazy loading with enhanced loading states
const SectionWrapper = ({ children, fallback = <SkeletonLoader /> }) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Floating Action Button for Theme Selector
const FloatingThemeButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    whileHover={{ scale: 1.1, rotate: 180 }}
    whileTap={{ scale: 0.9 }}
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 2 }}
  >
    <motion.div
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🎨
    </motion.div>
    
    {/* Tooltip */}
    <motion.div
      className="absolute right-full mr-3 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
      initial={{ x: 10, opacity: 0 }}
      whileHover={{ x: 0, opacity: 1 }}
    >
      Personnaliser le thème
    </motion.div>
  </motion.button>
);

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { scrollProgress, activeSection, scrollToSection } = useScrollHandler();
  const cursorPosition = useCursorPosition();
  const { scrollData } = useAdvancedScrollEffects();
  const { toast } = useToast();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Performance monitoring
  usePerformanceMonitor();

  useEffect(() => {
    // Enhanced preload critical assets
    const preloadImages = [
      '/profile.jpg',
      // Add other critical images here
    ];

    const preloadFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap'
    ];

    // Preload images
    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Don't fail on missing images
        img.src = src;
      });
    });

    // Preload fonts
    const fontPromises = preloadFonts.map(href => {
      return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
      });
    });

    // Initialize service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Wait for critical resources
    Promise.allSettled([...imagePromises, ...fontPromises]).then(() => {
      setTimeout(() => setIsLoaded(true), 500); // Small delay for smooth transition
    });

    // Enhanced error boundary
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      toast({
        title: "Une erreur est survenue",
        description: "L'application a rencontré un problème inattendu.",
        duration: 5000,
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }, [toast]);

  const handleContactSubmit = async (formData) => {
    try {
      // Enhanced form submission with better UX
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
    toast({
      title: "Téléchargement du CV 📄",
      description: "Le CV sera bientôt disponible en téléchargement.",
      duration: 5000,
    });
  };

  // Loading screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold gradient-text">Portfolio en cours de chargement...</h2>
            <p className="text-foreground-secondary mt-2">Préparation de l'expérience optimale</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Euloge Mabiala - Portfolio | Étudiant Ingénieur Informatique & Développeur</title>
          <meta name="description" content="Portfolio d'Euloge Mabiala, étudiant ingénieur informatique à l'ESIEA. Spécialisé en développement web, cybersécurité et intelligence artificielle. Découvrez mes projets et compétences." />
          <meta name="keywords" content="Euloge Mabiala, développeur, ingénieur informatique, ESIEA, React, Python, JavaScript, portfolio, projets" />
          <meta name="author" content="Euloge Mabiala" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Enhanced Open Graph */}
          <meta property="og:title" content="Euloge Mabiala - Portfolio Développeur" />
          <meta property="og:description" content="Découvrez le portfolio d'Euloge Mabiala, étudiant ingénieur en informatique passionné par le développement et l'innovation." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/profile.jpg" />
          <meta property="og:url" content="https://eulogep.github.io/" />
          
          {/* Enhanced Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Euloge Mabiala - Portfolio Développeur" />
          <meta name="twitter:description" content="Portfolio d'un étudiant ingénieur en informatique passionné par le développement web et l'IA." />
          <meta name="twitter:image" content="/profile.jpg" />
          
          {/* Progressive Web App */}
          <meta name="theme-color" content="#6366f1" />
          <meta name="application-name" content="Portfolio Euloge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Portfolio Euloge" />
          
          {/* Performance hints */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//github.com" />
          <link rel="dns-prefetch" href="//linkedin.com" />
        </Helmet>

        {/* Enhanced Scroll Progress Bar */}
        <motion.div 
          className="scroll-indicator fixed top-0 left-0 right-0 h-1 z-50"
          style={{
            scaleX: scrollProgress / 100,
            transformOrigin: 'left',
            background: 'var(--gradient-rainbow)'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
        />

        <motion.div 
          className="min-h-screen relative overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced Animated Background */}
          <SectionWrapper fallback={null}>
            <AnimatedBackgroundEnhanced variant="hero" />
          </SectionWrapper>

          {/* Enhanced Cursor and Visual Effects */}
          <MouseFollower size={24} />
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

            {/* Projects Section */}
            <SectionWrapper>
              <ProjectsEnhanced />
            </SectionWrapper>

            {/* Testimonials Section */}
            <SectionWrapper>
              <TestimonialsCarousel />
            </SectionWrapper>

            {/* Certifications Section */}
            <SectionWrapper>
              <Certificats />
            </SectionWrapper>

            {/* Fun Facts Section */}
            <SectionWrapper>
              <FunFacts />
            </SectionWrapper>

            {/* Contact Section */}
            <SectionWrapper>
              <ContactEnhanced onSubmit={handleContactSubmit} />
            </SectionWrapper>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Enhanced UI Elements */}
          <BackToTopButton />
          <FloatingThemeButton onClick={() => setIsThemeSelectorOpen(true)} />
          <Toaster />

          {/* Theme Selector Modal */}
          <AnimatePresence>
            {isThemeSelectorOpen && (
              <ThemeSelector
                isOpen={isThemeSelectorOpen}
                onClose={() => setIsThemeSelectorOpen(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Performance Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced Core Web Vitals monitoring
              if (typeof window !== 'undefined') {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                      console.log('Navigation timing:', entry);
                    }
                    if (entry.entryType === 'paint') {
                      console.log('Paint timing:', entry.name, entry.startTime);
                    }
                  }
                });
                
                observer.observe({ entryTypes: ['navigation', 'paint'] });
                
                // Monitor scroll performance
                let scrollTimeout;
                const handleScroll = () => {
                  if (!scrollTimeout) {
                    scrollTimeout = setTimeout(() => {
                      scrollTimeout = null;
                    }, 16);
                  }
                };
                
                window.addEventListener('scroll', handleScroll, { passive: true });
              }
            `
          }}
        />
      </>
    </HelmetProvider>
  );
}

export default App;
