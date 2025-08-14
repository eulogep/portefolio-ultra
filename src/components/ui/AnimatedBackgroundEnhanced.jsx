import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackgroundEnhanced = ({ variant = 'default', children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getParticleCount = () => {
    switch (variant) {
      case 'hero': return 12;
      case 'sections': return 8;
      case 'minimal': return 6;
      default: return 10;
    }
  };

  const getParticleSize = () => {
    switch (variant) {
      case 'hero': return { min: 100, max: 300 };
      case 'sections': return { min: 60, max: 200 };
      case 'minimal': return { min: 40, max: 120 };
      default: return { min: 80, max: 250 };
    }
  };

  const particleCount = getParticleCount();
  const particleSize = getParticleSize();

  const gradients = [
    'var(--gradient-primary)',
    'var(--gradient-secondary)',
    'var(--gradient-tertiary)',
    'linear-gradient(135deg, var(--primary-400), var(--secondary-400))',
    'linear-gradient(135deg, var(--secondary-400), var(--tertiary-400))',
    'linear-gradient(135deg, var(--tertiary-400), var(--primary-400))',
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px, var(--primary-400) 0%, transparent 50%),
            radial-gradient(circle at ${mousePosition.x * 0.3}px ${mousePosition.y * 0.7}px, var(--secondary-400) 0%, transparent 50%),
            var(--gradient-subtle)
          `,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      {[...Array(particleCount)].map((_, i) => {
        const size = Math.random() * (particleSize.max - particleSize.min) + particleSize.min;
        const initialX = Math.random() * windowSize.width;
        const initialY = Math.random() * windowSize.height;
        const gradient = gradients[i % gradients.length];
        const shape = i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'rounded' : 'diamond';

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: size,
              left: initialX,
              top: initialY,
              background: gradient,
              borderRadius: 
                shape === 'circle' ? '50%' : 
                shape === 'rounded' ? 'var(--radius-xl)' : 
                '0',
              transform: shape === 'diamond' ? 'rotate(45deg)' : 'none',
              filter: 'blur(1px)',
              opacity: 0.15,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: shape === 'diamond' ? [45, 225, 405, 45] : [0, 180, 360, 0],
              opacity: [0.1, 0.2, 0.05, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* Ambient Light Effects */}
      {variant === 'hero' && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--primary-400) 0%, transparent 70%)',
              left: '10%',
              top: '20%',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--secondary-400) 0%, transparent 70%)',
              right: '15%',
              bottom: '25%',
              filter: 'blur(35px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.25, 0.1],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </>
      )}

      {/* Interactive Mouse Effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--primary-500) 0%, transparent 70%)',
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default AnimatedBackgroundEnhanced;
