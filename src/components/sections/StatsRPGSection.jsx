import React from 'react';
import { motion } from 'framer-motion';
import { Braces, BrainCircuit, Orbit, Coffee, Eye, Server, Brackets, GitFork, Rocket } from 'lucide-react';
import { skills } from '@/data/portfolioData';

const skillIcons = {
  'JavaScript': Braces,
  'Python': BrainCircuit,
  'React': Orbit,
  'Java': Coffee,
  'Vue.js': Eye,
  'Node.js': Server,
  'HTML/CSS': Brackets,
  'Git': GitFork
};

const getStatColor = (value) => {
  if (value >= 90) return 'from-yellow-400 to-yellow-600';
  if (value >= 80) return 'from-blue-400 to-blue-600';
  if (value >= 70) return 'from-purple-400 to-purple-600';
  if (value >= 60) return 'from-green-400 to-green-600';
  return 'from-gray-500 to-gray-600';
};

const StatsRPGSection = () => {
  const globalLevel = Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length);

  return (
    <section id="skills" className="section-padding relative section-bg-harmonized">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-4xl lg:text-6xl gradient-text-premium mb-6">
            Compétences Techniques
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez mes compétences techniques et mon niveau de maîtrise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill.name] || Rocket;
            const colorClass = getStatColor(skill.level);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative z-10 mb-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl">
                    {skill.name}
                  </h3>
                </div>
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <motion.circle
                        cx="60" cy="60" r="50"
                        stroke={`url(#gradient-${skill.name.replace(/[^a-zA-Z0-9]/g, '')})`}
                        strokeWidth="8" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: skill.level / 100 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        style={{ pathLength: skill.level / 100, strokeDasharray: "0 1" }}
                      />
                      <defs>
                        <linearGradient id={`gradient-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={skill.color} />
                          <stop offset="100%" stopColor="#22223b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                        viewport={{ once: true }}
                        className="font-orbitron font-bold text-2xl"
                      >
                        {skill.level}
                      </motion.span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-md mx-auto">
            <h3 className="font-orbitron font-bold text-2xl mb-4">NIVEAU GLOBAL</h3>
            <div className="text-6xl font-orbitron font-black glow-text mb-2">
              {globalLevel}
            </div>
            <p className="text-gray-400">
              Moyenne des compétences principales
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsRPGSection; 