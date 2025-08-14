import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MapPin, Calendar, Coffee, Code, Sparkles, ArrowRight, Star } from 'lucide-react';
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
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
        stiffness: 150,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 0.08}px ${mousePosition.y * 0.08}px, var(--primary-400) 0%, transparent 50%),
          var(--gradient-subtle)
        `
      }}
    >
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(var(--glass-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute"
            style={{
              background: `var(--gradient-${['primary', 'secondary', 'tertiary'][i % 3]})`,
              width: Math.random() * 200 + 80,
              height: Math.random() * 200 + 80,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 2 ? '50%' : 'var(--radius-xl)',
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Hero Card */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-8 lg:p-12 rounded-3xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating Elements */}
            <motion.div
              className="absolute top-6 right-6 text-yellow-400"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute top-6 left-6 text-blue-400"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="w-5 h-5" />
            </motion.div>

            {/* Avatar Section */}
            <motion.div
              variants={avatarVariants}
              className="mb-8 flex flex-col items-center relative"
            >
              <div className="relative group">
                {/* Dynamic Gradient Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full p-1"
                  style={{ background: 'var(--gradient-primary)' }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-36 h-36 bg-white rounded-full" />
                </motion.div>
                
                <motion.div
                  className="relative w-32 h-32 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img  
                    alt={`Photo de profil de ${personalInfo.name}`}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                    src="/profile.jpg" 
                  />
                  {/* Status Indicator */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Quick Info Badges */}
              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap justify-center gap-2"
              >
                {[
                  { icon: MapPin, text: "Paris, France", gradient: "from-red-400 to-pink-400" },
                  { icon: Calendar, text: "Disponible", gradient: "from-green-400 to-emerald-400" },
                  { icon: Coffee, text: "5+ projets", gradient: "from-amber-400 to-orange-400" },
                  { icon: Code, text: "Full-stack", gradient: "from-blue-400 to-indigo-400" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="glass px-3 py-1.5 rounded-full text-sm border flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.gradient}`}>
                      <item.icon className="w-3 h-3 text-white m-0.5" />
                    </div>
                    <span className="text-foreground-secondary font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Name and Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text text-balance"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                {personalInfo.name}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl text-foreground-secondary mb-6 font-medium text-balance"
              >
                {personalInfo.title}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-foreground-tertiary max-w-3xl mx-auto leading-relaxed text-pretty"
              >
                {personalInfo.shortDescription}
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary btn-lg group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Découvrir mes projets</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={handleDownloadCV}
                className="btn btn-secondary btn-lg group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Télécharger CV</span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              {[
                {
                  icon: Github,
                  href: personalInfo.links?.github,
                  label: "GitHub",
                  gradient: "from-gray-700 to-gray-900"
                },
                {
                  icon: Linkedin,
                  href: personalInfo.links?.linkedin,
                  label: "LinkedIn",
                  gradient: "from-blue-600 to-blue-800"
                },
                { 
                  icon: Mail, 
                  href: `mailto:${personalInfo.email}`, 
                  label: "Email",
                  gradient: "from-red-500 to-red-700"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href?.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group glass p-3 rounded-xl border transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -4,
                    rotate: index % 2 ? 5 : -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-foreground-secondary group-hover:text-foreground transition-colors duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 flex flex-col items-center"
          >
            <span className="text-sm text-foreground-tertiary mb-2">Découvrir plus</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-foreground-tertiary rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-foreground-tertiary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroEnhanced;
