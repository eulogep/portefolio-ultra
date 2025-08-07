/**
 * Section "À propos de moi" avec animations unifiées
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Utilise le système d'animations identique au Hero
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Lightbulb, Target, Zap, Sparkles } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';
import { education, experiences, softSkills, personalInfo } from '@/data/portfolioData';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const softSkillIcons = {
  Créativité: Lightbulb,
  'Résolution de problèmes': Target,
  'Esprit d\'équipe': Users,
  Pédagogie: BookOpen,
  Autonomie: Zap,
};

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animations identiques au Hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`,
      }}
    >
      <AnimatedBackground particleCount={15}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h2 
                className="text-6xl md:text-8xl font-black tracking-tight text-center"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 25%, #34d399 50%, #fbbf24 75%, #f87171 100%)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                À propos de moi
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed text-center"
                variants={itemVariants}
              >
                Découvrez mon parcours, mes passions et ce qui me motive dans le monde de la technologie
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-16 items-start mt-12">
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 space-y-8"
              >
                <motion.div 
                  className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Code className="w-6 h-6 mr-3 text-blue-500" />
                    </motion.div>
                    Mon Histoire
                  </h3>
                  <p className="text-gray-300 italic">{personalInfo.description}</p>
                </motion.div>

                <motion.div 
                  className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-6 h-6 mr-3 text-purple-500" />
                    </motion.div>
                    Soft Skills
                  </h3>
                  <div className="space-y-4">
                    {softSkills.map((skill, index) => {
                      const Icon = softSkillIcons[skill] || Lightbulb;
                      return (
                        <motion.div 
                          key={skill} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="w-5 h-5 mr-3 text-purple-400" />
                          </motion.div>
                          <span className="font-medium text-gray-300">{skill}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="lg:col-span-3"
              >
                <div className="space-y-12">
                  <motion.div 
                    className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
                      </motion.div>
                      Formation
                    </h3>
                    <Timeline items={education} />
                  </motion.div>

                  <motion.div 
                    className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Users className="w-6 h-6 mr-3 text-green-500" />
                      </motion.div>
                      Expériences
                    </h3>
                    <Timeline items={experiences} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </section>
  );
};

export default About;