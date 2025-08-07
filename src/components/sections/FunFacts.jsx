import React from 'react';
import { motion } from 'framer-motion';
import { Music, BookOpen, Dumbbell, Globe, Smile, Camera } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const facts = [
  { icon: <Music className="w-10 h-10 text-pink-500" />, title: 'Musique', desc: 'Je joue de la guitare et j’adore découvrir de nouveaux styles musicaux.' },
  { icon: <BookOpen className="w-10 h-10 text-blue-500" />, title: 'Lecture', desc: 'Fan de romans et de science-fiction.' },
  { icon: <Dumbbell className="w-10 h-10 text-green-500" />, title: 'Sport', desc: 'Passionné de fitness et de calisthénie.' },
  { icon: <Globe className="w-10 h-10 text-yellow-500" />, title: 'Voyages', desc: 'Toujours prêt à explorer de nouveaux pays.' },
  { icon: <Smile className="w-10 h-10 text-purple-500" />, title: 'Humour', desc: 'J’aime faire rire et créer une bonne ambiance.' },
  { icon: <Camera className="w-10 h-10 text-orange-500" />, title: 'Photo', desc: 'J’adore capturer des moments uniques.' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

const FunFacts = () => (
  <section id="fun-facts" className="section-padding relative section-bg-harmonized overflow-hidden">
    {/* Fond décoratif SVG premium */}
    <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
      <defs>
        <radialGradient id="funfacts-grad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="60%" stopColor="#34d399" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#funfacts-grad)" />
      <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#funfacts-grad)" />
    </svg>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <SectionTitle
        title={<span className="gradient-text-premium">Fun Facts</span>}
        subtitle="Ce que je fais quand je ne code pas !"
      />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {facts.map((fact, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="glass-effect-premium rounded-3xl p-8 flex flex-col items-center shadow-2xl animate-fade-in"
          >
            {fact.icon}
            <h3 className="text-xl font-bold mt-4 mb-2 gradient-text-premium">{fact.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 italic">{fact.desc}</p>
          </motion.div>
        ))}
      </motion.div>
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
        background: linear-gradient(90deg, #f472b6 0%, #34d399 50%, #60a5fa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .animate-fade-in {
        animation: fadeInFunFacts 0.5s;
      }
      @keyframes fadeInFunFacts {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </section>
);

export default FunFacts; 