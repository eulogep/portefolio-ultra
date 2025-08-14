import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Target, 
  Zap, 
  Sparkles,
  GraduationCap,
  Briefcase,
  Heart,
  Brain
} from 'lucide-react';
import { education, experiences, softSkills, personalInfo } from '@/data/portfolioData';

const softSkillIcons = {
  'Orientation produit': Target,
  'Esprit d\'équipe': Users,
  'Pédagogie': BookOpen,
  'Curiosité technique': Brain,
  'Résolution de problèmes': Lightbulb,
  'Autonomie': Zap,
  'Communication claire': Heart,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="about" 
      className="section relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--primary-400) 0%, transparent 50%),
          var(--gradient-subtle)
        `,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute"
            style={{
              background: `var(--gradient-${['primary', 'secondary', 'tertiary'][i % 3]})`,
              width: Math.random() * 150 + 60,
              height: Math.random() * 150 + 60,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 2 ? '50%' : 'var(--radius-xl)',
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
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
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text text-balance"
            >
              À propos de moi
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-foreground-secondary max-w-3xl mx-auto text-pretty"
              variants={itemVariants}
            >
              Découvrez mon parcours, mes passions et ce qui me motive dans le monde de la technologie
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Personal Story & Skills */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 space-y-8"
            >
              {/* Personal Story */}
              <motion.div 
                className="card group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Mon Histoire</h3>
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  </div>
                </div>
                <p className="text-foreground-secondary leading-relaxed">
                  {personalInfo.description}
                </p>
              </motion.div>

              {/* Soft Skills */}
              <motion.div 
                className="card group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Soft Skills</h3>
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 text-red-500" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {softSkills.map((skill, index) => {
                    const Icon = softSkillIcons[skill] || Lightbulb;
                    return (
                      <motion.div 
                        key={skill} 
                        className="flex items-center gap-3 p-3 rounded-lg glass-premium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${
                          index % 3 === 0 ? 'from-blue-400 to-indigo-500' :
                          index % 3 === 1 ? 'from-purple-400 to-pink-500' :
                          'from-green-400 to-emerald-500'
                        } flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">{skill}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Education & Experience */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 space-y-8"
            >
              {/* Education */}
              <motion.div 
                className="card group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">Formation</h3>
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-6 pb-6 border-l-2 border-glass-border last:border-l-0 last:pb-0"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white" />
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-emerald-500 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                            {edu.date}
                          </span>
                          <span className="text-sm text-foreground-tertiary">{edu.location}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">{edu.title}</h4>
                        <p className="text-foreground-secondary font-medium">{edu.institution}</p>
                        <p className="text-foreground-tertiary text-sm">{edu.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div 
                className="card group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">Expériences</h3>
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Target className="w-5 h-5 text-orange-500" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-6 pb-6 border-l-2 border-glass-border last:border-l-0 last:pb-0"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-500 border-2 border-white" />
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-orange-500 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                          {exp.date}
                        </span>
                        <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                        <p className="text-foreground-secondary font-medium">{exp.institution}</p>
                        <p className="text-foreground-tertiary text-sm">{exp.description}</p>
                        {exp.skills && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {exp.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="text-xs px-2 py-1 bg-glass-bg border border-glass-border rounded-full text-foreground-secondary"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
