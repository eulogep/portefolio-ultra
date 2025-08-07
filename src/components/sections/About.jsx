
import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Lightbulb, Target, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';
import { education, experiences, softSkills, personalInfo } from '@/data/portfolioData';

const softSkillIcons = {
  Créativité: Lightbulb,
  'Résolution de problèmes': Target,
  'Esprit d’équipe': Users,
  Pédagogie: BookOpen,
  Autonomie: Zap,
};

const About = () => {
  return (
    <section id="about" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="about-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="15%" cy="20%" rx="220" ry="120" fill="url(#about-grad)" />
        <ellipse cx="85%" cy="80%" rx="180" ry="100" fill="url(#about-grad)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionTitle
          title={<span className="gradient-text-premium">À propos de moi</span>}
          subtitle="Découvrez mon parcours, mes passions et ce qui me motive dans le monde de la technologie"
        />
        <div className="grid lg:grid-cols-5 gap-16 items-start mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 flex items-center gradient-text-premium">
                <Code className="w-6 h-6 mr-3 text-blue-500" />
                Mon Histoire
              </h3>
              <p className="text-gray-600 dark:text-gray-300 italic">{personalInfo.description}</p>
            </div>
            <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 flex items-center gradient-text-premium">
                <Zap className="w-6 h-6 mr-3 text-purple-500" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                {softSkills.map((skill) => {
                  const Icon = softSkillIcons[skill] || Lightbulb;
                  return (
                    <div key={skill} className="flex items-center">
                      <Icon className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-12">
              <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text-premium">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
                  Formation
                </h3>
                <Timeline items={education} />
              </div>
              <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text-premium">
                  <Users className="w-6 h-6 mr-3 text-green-500" />
                  Expériences
                </h3>
                <Timeline items={experiences} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #fbbf24 0%, #60a5fa 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInAbout 0.5s;
        }
        @keyframes fadeInAbout {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default About;