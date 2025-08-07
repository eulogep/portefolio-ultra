import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children, particleCount = 20 }) => {
  // Génération des particules
  const particles = [...Array(particleCount)].map((_, i) => ({
    key: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    },
    animation: {
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, 0],
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    },
    transition: {
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2,
    },
  }));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.key}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            style={particle.style}
            animate={particle.animation}
            transition={particle.transition}
          />
        ))}
      </div>

      {/* Grille de fond subtile */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
