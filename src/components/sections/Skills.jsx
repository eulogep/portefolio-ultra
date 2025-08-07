import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Cloud, Shield, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillBar from '@/components/ui/SkillBar';
import SkillsVisualization from '@/components/ui/SkillsVisualization';
import { skills, tools } from '@/data/portfolioData';

const skillCategories = [
  {
    title: 'Développement Frontend',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: skills.filter(s => ['JavaScript', 'React', 'Vue.js', 'HTML/CSS'].includes(s.name))
  },
  {
    title: 'Développement Backend',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: skills.filter(s => ['Python', 'Java', 'Node.js'].includes(s.name))
  },
  {
    title: 'Outils & Technologies',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    skills: skills.filter(s => ['Git'].includes(s.name))
  }
];

const Skills = () => {
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
    <section id="skills" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium avec animation */}
      <motion.svg 
        className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" 
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="skills-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <motion.ellipse 
          cx="25%" cy="25%" rx="200" ry="120" fill="url(#skills-grad)"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.ellipse 
          cx="75%" cy="75%" rx="180" ry="100" fill="url(#skills-grad)"
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
              title={<span className="gradient-text-premium">Compétences</span>}
              subtitle="Mes compétences techniques et outils de développement"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Compétences Techniques</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Outils & Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool}
                      className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Code className="w-4 h-4 mr-2 text-blue-400" />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Visualisation des Compétences</h3>
                <SkillsVisualization skills={skills} />
              </motion.div>

              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Catégories de Compétences</h3>
                <div className="space-y-6">
                  {skillCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.title}
                        className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 10px 20px rgba(251,191,36,0.1)",
                          transition: { duration: 0.3 }
                        }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center mb-3">
                          <motion.div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-3`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">{category.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skill.name}
                              className="px-2 py-1 bg-white/20 rounded-full text-xs text-gray-700 dark:text-gray-300"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ 
                                delay: skillIndex * 0.05,
                                type: "spring",
                                stiffness: 300
                              }}
                              viewport={{ once: true }}
                            >
                              {skill.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
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
          animation: fadeInSkills 0.8s ease-out;
        }
        @keyframes fadeInSkills {
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

export default Skills;