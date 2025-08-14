import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Database, 
  Zap, 
  Brain, 
  Cpu,
  Globe,
  Shield,
  Rocket,
  Settings
} from 'lucide-react';
import { skills, tools } from '@/data/portfolioData';
import { useSmoothReveal } from '@/hooks/useAdvancedScrollEffects';

const categoryIcons = {
  frontend: Palette,
  backend: Database,
  quality: Shield,
  tools: Settings,
  automation: Rocket,
  mobile: Globe,
  ai: Brain,
  devops: Cpu,
};

const categoryColors = {
  frontend: 'from-pink-400 to-rose-500',
  backend: 'from-blue-400 to-indigo-500',
  quality: 'from-green-400 to-emerald-500',
  tools: 'from-gray-400 to-slate-500',
  automation: 'from-purple-400 to-violet-500',
  mobile: 'from-cyan-400 to-teal-500',
  ai: 'from-orange-400 to-red-500',
  devops: 'from-yellow-400 to-amber-500',
};

const SkillBar = ({ skill, index, isVisible }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[skill.category] || 'from-gray-400 to-gray-500'}`}
          />
          <span className="font-medium text-foreground group-hover:text-primary-500 transition-colors">
            {skill.name}
          </span>
        </div>
        <motion.span 
          className="text-sm font-bold text-primary-500"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
        >
          {animatedLevel}%
        </motion.span>
      </div>
      
      <div className="relative h-3 bg-background-tertiary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}30, ${skill.color})`,
          }}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${animatedLevel}%` : 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
        >
          <motion.div
            className="w-full h-full relative overflow-hidden rounded-full"
            style={{ backgroundColor: skill.color }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.1 + 1 
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, categorySkills, isVisible }) => {
  const Icon = categoryIcons[category] || Code2;
  const gradient = categoryColors[category] || 'from-gray-400 to-gray-500';
  
  const averageLevel = Math.round(
    categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
  );

  return (
    <motion.div
      className="card group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground capitalize">
            {category.replace('_', ' ')}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground-secondary">
              {categorySkills.length} compétences
            </span>
            <div className="w-1 h-1 bg-foreground-tertiary rounded-full" />
            <span className="text-sm font-medium text-primary-500">
              {averageLevel}% moyen
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {categorySkills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            index={index} 
            isVisible={isVisible} 
          />
        ))}
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${gradient.split(' ')[1]} 0%, transparent 50%)`,
          mixBlendMode: 'overlay'
        }}
      />
    </motion.div>
  );
};

const ToolsCloud = ({ isVisible }) => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Outils & Technologies
          </h3>
          <span className="text-sm text-foreground-secondary">
            {tools.length} outils maîtrisés
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, index) => (
          <motion.span
            key={tool}
            className="px-3 py-1.5 bg-glass-bg border border-glass-border rounded-full text-sm font-medium text-foreground-secondary hover:text-foreground hover:border-primary-400 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              backgroundColor: 'var(--glass-border)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsEnhanced = () => {
  const [ref, isVisible] = useSmoothReveal(0.2);
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Calculate overall stats
  const totalSkills = skills.length;
  const averageLevel = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills
  );
  const expertSkills = skills.filter(skill => skill.level >= 85).length;

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute"
            style={{
              background: `var(--gradient-${['primary', 'secondary', 'tertiary'][i % 3]})`,
              width: Math.random() * 120 + 60,
              height: Math.random() * 120 + 60,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50%',
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div ref={ref} className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 text-balance">
            Compétences & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-foreground-secondary max-w-3xl mx-auto text-pretty mb-8">
            Un aperçu détaillé de mes compétences techniques et de mon expertise dans différents domaines
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: totalSkills, label: 'Technologies', icon: Code2 },
              { value: `${averageLevel}%`, label: 'Niveau moyen', icon: Zap },
              { value: expertSkills, label: 'Expertises', icon: Brain },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground-secondary">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <SkillCategory
              key={category}
              category={category}
              categorySkills={categorySkills}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Tools Section */}
        <ToolsCloud isVisible={isVisible} />
      </div>
    </section>
  );
};

export default SkillsEnhanced;
