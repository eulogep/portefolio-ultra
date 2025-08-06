import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Shield, 
  Brain,
  Palette,
  Settings,
  GitBranch,
  Cloud
} from 'lucide-react';

const skillsData = [
  {
    category: 'Frontend',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'Vue.js', level: 85, icon: '💚' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
      { name: 'TypeScript', level: 80, icon: '🔷' },
      { name: 'Tailwind CSS', level: 90, icon: '🎨' },
      { name: 'HTML/CSS', level: 95, icon: '🌐' },
    ]
  },
  {
    category: 'Backend',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'Express.js', level: 85, icon: '⚡' },
      { name: 'MongoDB', level: 75, icon: '🍃' },
      { name: 'PostgreSQL', level: 70, icon: '🐘' },
      { name: 'Redis', level: 65, icon: '🔴' },
    ]
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'React Native', level: 80, icon: '📱' },
      { name: 'Capacitor', level: 75, icon: '⚡' },
      { name: 'Flutter', level: 60, icon: '🦋' },
      { name: 'Ionic', level: 70, icon: '💙' },
    ]
  },
  {
    category: 'DevOps & Cloud',
    icon: Cloud,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'AWS', level: 70, icon: '☁️' },
      { name: 'GitHub Actions', level: 80, icon: '🔄' },
      { name: 'Vercel', level: 85, icon: '▲' },
      { name: 'Netlify', level: 80, icon: '🌐' },
    ]
  },
  {
    category: 'Design & UX',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Figma', level: 85, icon: '🎨' },
      { name: 'Adobe XD', level: 75, icon: '🎭' },
      { name: 'Photoshop', level: 70, icon: '🖼️' },
      { name: 'UI/UX Design', level: 80, icon: '✨' },
    ]
  },
  {
    category: 'Outils',
    icon: Settings,
    color: 'from-gray-500 to-slate-500',
    skills: [
      { name: 'Git', level: 90, icon: '📝' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Vite', level: 85, icon: '⚡' },
      { name: 'Webpack', level: 75, icon: '📦' },
    ]
  }
];

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
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-sm text-gray-400 font-mono">
          {animatedLevel}%
        </span>
      </div>
      
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${animatedLevel}%` : 0 }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
        
        {/* Effet de brillance */}
        <motion.div
          className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: isVisible ? ['0%', '400%'] : '0%',
          }}
          transition={{
            duration: 2,
            delay: index * 0.1 + 0.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const IconComponent = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <div className="relative p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
        {/* Effet de gradient au survol */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
        
        {/* En-tête de catégorie */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {category.category}
          </h3>
        </div>

        {/* Liste des compétences */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={skillIndex}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Badge de niveau moyen */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Niveau moyen</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isInView ? `${Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%` : 0 
                  }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-mono text-gray-300">
                {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsVisualization = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Mes Compétences
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Un aperçu de mes compétences techniques et créatives, acquises au fil de mes projets et expériences.
          </p>
        </motion.div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <SkillCategory
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Statistiques globales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Technologies', value: '25+', icon: Code },
            { label: 'Projets', value: '50+', icon: GitBranch },
            { label: 'Années d\\'exp.', value: '3+', icon: Brain },
            { label: 'Certifications', value: '8+', icon: Shield },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsVisualization;

