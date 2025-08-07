
import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Lightbulb, Target, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';
import { education, experiences, softSkills, personalInfo } from '@/data/portfolioData';

const softSkillIcons = {
  Créativité: Lightbulb,
  'Résolution de problèmes': Target,
  'Esprit d\'équipe': Users,
  Pédagogie: BookOpen,
  Autonomie: Zap,
};

const About = () => {
  // Animations cohérentes avec le Hero
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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="about" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium avec animation */}
      <motion.svg 
        className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" 
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="about-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <motion.ellipse 
          cx="15%" cy="20%" rx="220" ry="120" fill="url(#about-grad)"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.ellipse 
          cx="85%" cy="80%" rx="180" ry="100" fill="url(#about-grad)"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </motion.svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle
              title={<span className="gradient-text-premium">À propos de moi</span>}
              subtitle="Découvrez mon parcours, mes passions et ce qui me motive dans le monde de la technologie"
            />
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-16 items-start mt-12">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gradient-text-premium">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Code className="w-6 h-6 mr-3 text-blue-500" />
                  </motion.div>
                  Mon Histoire
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic">{personalInfo.description}</p>
              </motion.div>

              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gradient-text-premium">
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
                        <span className="font-medium text-gray-700 dark:text-gray-200">{skill}</span>
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
                  className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text-premium">
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
                  className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text-premium">
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

      {/* Styles premium améliorés */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
          transition: all 0.3s ease;
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInAbout 0.8s ease-out;
        }
        @keyframes fadeInAbout {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
    </section>
  );
};

export default About;