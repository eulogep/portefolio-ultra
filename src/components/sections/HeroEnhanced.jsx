import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MapPin, Calendar, Coffee, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolioData';

const HeroEnhanced = ({ scrollToSection, handleDownloadCV }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px, rgba(96, 165, 250, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(244, 114, 182, 0.05) 50%, rgba(251, 191, 36, 0.05) 100%)
        `
      }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-pulse" />
        
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl"
            style={{
              background: `linear-gradient(45deg, ${
                ['#60a5fa', '#f472b6', '#fbbf24', '#8b5cf6', '#06d6a0', '#f72585'][i]
              }, transparent)`,
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative"
        >
          {/* Enhanced Glass Card */}
          <motion.div
            variants={itemVariants}
            className="modern-glass-card p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Card Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
              animate={{
                opacity: isHovered ? 0.8 : 0.4,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Sparkles */}
            <motion.div
              variants={sparkleVariants}
              animate="animate"
              className="absolute top-4 right-4 text-yellow-400"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>

            {/* Avatar Section */}
            <motion.div
              variants={avatarVariants}
              className="mb-8 flex flex-col items-center relative"
            >
              <div className="relative group">
                {/* Avatar Ring Effects */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-40 h-40 bg-background rounded-full" />
                </motion.div>
                
                <motion.div
                  className="relative w-36 h-36 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img  
                    alt={`Photo de profil de ${personalInfo.name}`}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                    src="/profile.jpg" 
                  />
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  />
                </motion.div>

                {/* Status Indicators */}
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </div>

              {/* Quick Info Cards */}
              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap justify-center gap-2"
              >
                {[
                  { icon: MapPin, text: "Paris, France", color: "text-red-500" },
                  { icon: Calendar, text: "Disponible", color: "text-green-500" },
                  { icon: Coffee, text: "2 projets actifs", color: "text-amber-500" },
                  { icon: Code, text: "5+ langages", color: "text-blue-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Name and Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1
                className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 relative"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #f472b6, #fbbf24, #8b5cf6, #60a5fa)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                {personalInfo.name}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-xl sm:text-2xl lg:text-3xl text-foreground/70 mb-6 font-medium"
              >
                <span className="typing-enhanced">{personalInfo.title}</span>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg lg:text-xl text-foreground/60 max-w-4xl mx-auto leading-relaxed"
              >
                {personalInfo.shortDescription}
              </motion.p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection('projects')}
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Découvrir mes projets
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownloadCV}
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    Télécharger CV
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-6"
            >
              {[
                { 
                  icon: Github, 
                  href: personalInfo.github, 
                  label: "GitHub",
                  color: "hover:bg-gray-800 hover:text-white",
                  hoverRotate: 5
                },
                { 
                  icon: Linkedin, 
                  href: personalInfo.linkedin, 
                  label: "LinkedIn",
                  color: "hover:bg-blue-600 hover:text-white",
                  hoverRotate: -5
                },
                { 
                  icon: Mail, 
                  href: `mailto:${personalInfo.email}`, 
                  label: "Email",
                  color: "hover:bg-red-500 hover:text-white",
                  hoverRotate: 5
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ${social.color}`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: social.hoverRotate,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .modern-glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .typing-enhanced {
          position: relative;
        }

        .typing-enhanced::after {
          content: '|';
          animation: blink 1s infinite;
          color: #60a5fa;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @media (max-width: 640px) {
          .modern-glass-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroEnhanced;
