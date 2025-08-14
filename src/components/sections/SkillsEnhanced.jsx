import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Code2, Database, Globe, Smartphone, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import { skills, tools, softSkills } from '@/data/portfolioData';

const SkillsEnhanced = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const categories = [
    { 
      id: 'technical', 
      label: 'Compétences Techniques', 
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      data: skills
    },
    { 
      id: 'tools', 
      label: 'Outils & Technologies', 
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      data: tools.map(tool => ({ name: tool, level: 85, color: '#8b5cf6' }))
    },
    { 
      id: 'soft', 
      label: 'Soft Skills', 
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      data: softSkills.map(skill => ({ name: skill, level: 90, color: '#10b981' }))
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5
      }
    })
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      variants={itemVariants}
      className="skill-card group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Skill Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
          <h3 className="font-semibold text-lg text-foreground group-hover:text-white transition-colors">
            {skill.name}
          </h3>
        </div>
        <motion.div
          className="text-2xl font-bold"
          style={{ color: skill.color }}
          animate={hoveredSkill === skill.name ? { scale: 1.2 } : { scale: 1 }}
        >
          {skill.level}%
        </motion.div>
      </div>

      {/* Skill Bar */}
      <div className="relative h-3 bg-gray-200/20 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full relative overflow-hidden"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`
          }}
          variants={skillBarVariants}
          custom={skill.level}
          initial="hidden"
          animate={controls}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Skill Level Description */}
      <div className="text-sm text-foreground/60">
        {skill.level >= 90 ? 'Expert' : 
         skill.level >= 80 ? 'Avancé' : 
         skill.level >= 70 ? 'Intermédiaire' : 
         'Débutant'}
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`,
          filter: 'blur(10px)'
        }}
      />
    </motion.div>
  );

  const CategoryButton = ({ category, isActive, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive 
          ? 'text-white shadow-lg' 
          : 'text-foreground/70 hover:text-foreground bg-white/5 hover:bg-white/10'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color}`}
          layoutId="activeCategory"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        <category.icon className="w-5 h-5" />
        {category.label}
      </span>
    </motion.button>
  );

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <section 
      ref={ref}
      id="skills" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/20"
          >
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Compétences & Expertise</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mon Arsenal
            </span>
            <br />
            <span className="text-foreground">Technologique</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed"
          >
            Une combinaison de compétences techniques solides, d'outils modernes 
            et de soft skills essentiels pour créer des solutions innovantes.
          </motion.p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Category Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${currentCategory.color}`}>
                <currentCategory.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {currentCategory.label}
              </h3>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCategory.data.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Code2, 
                title: "Langages Maîtrisés", 
                value: skills.length,
                color: "text-blue-400",
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              { 
                icon: Globe, 
                title: "Projets Réalisés", 
                value: "15+",
                color: "text-purple-400",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              { 
                icon: Zap, 
                title: "Années d'Expérience", 
                value: "3+",
                color: "text-green-400",
                gradient: "from-green-500/20 to-emerald-500/20"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/10 backdrop-blur-sm`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${
                  index === 0 ? 'from-blue-500 to-cyan-500' :
                  index === 1 ? 'from-purple-500 to-pink-500' :
                  'from-green-500 to-emerald-500'
                } mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-foreground/60 font-medium">
                  {stat.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsEnhanced;
