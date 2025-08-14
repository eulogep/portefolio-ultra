import React, { useMemo, useRef, useCallback } from 'react';
import { motion, useTransform, useViewportScroll, useReducedMotion } from 'framer-motion';

const AnimatedBackgroundEnhanced = ({ 
  variant = 'default', 
  intensity = 0.5,
  particleCount = 50,
  className = '',
  children 
}) => {
  const { scrollYProgress } = useViewportScroll();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Transform values based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Memoized particle generation for performance
  const particles = useMemo(() => {
    if (shouldReduceMotion) return [];
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
      color: [
        'rgba(96, 165, 250, 0.4)',
        'rgba(244, 114, 182, 0.4)', 
        'rgba(251, 191, 36, 0.4)',
        'rgba(139, 92, 246, 0.4)',
        'rgba(16, 185, 129, 0.4)'
      ][Math.floor(Math.random() * 5)]
    }));
  }, [particleCount, shouldReduceMotion]);

  // Memoized floating shapes
  const floatingShapes = useMemo(() => {
    if (shouldReduceMotion) return [];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.1 + 0.05,
      blur: Math.random() * 20 + 10
    }));
  }, [shouldReduceMotion]);

  const getVariantStyles = useCallback(() => {
    switch (variant) {
      case 'hero':
        return {
          background: `
            radial-gradient(circle at 20% 80%, rgba(96, 165, 250, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(244, 114, 182, 0.05) 50%, rgba(251, 191, 36, 0.05) 100%)
          `
        };
      case 'dark':
        return {
          background: `
            radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.8) 0%, transparent 50%),
            linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)
          `
        };
      case 'gradient':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(96, 165, 250, 0.1) 0%, 
              rgba(139, 92, 246, 0.1) 25%,
              rgba(244, 114, 182, 0.1) 50%,
              rgba(251, 191, 36, 0.1) 75%,
              rgba(16, 185, 129, 0.1) 100%
            )
          `
        };
      default:
        return {
          background: 'transparent'
        };
    }
  }, [variant]);

  // Grid pattern component
  const GridPattern = useCallback(() => (
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{ y: y1 }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </motion.div>
  ), [y1]);

  // Particle component
  const Particle = useCallback(({ particle }) => (
    <motion.div
      key={particle.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        opacity: particle.opacity
      }}
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        scale: [1, 1.1, 1],
        opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "easeInOut"
      }}
    />
  ), []);

  // Floating shape component
  const FloatingShape = useCallback(({ shape }) => (
    <motion.div
      key={shape.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: shape.size,
        height: shape.size,
        background: `radial-gradient(circle, rgba(96, 165, 250, ${shape.opacity}) 0%, transparent 70%)`,
        filter: `blur(${shape.blur}px)`
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: shape.duration,
        repeat: Infinity,
        delay: shape.delay,
        ease: "easeInOut"
      }}
    />
  ), []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={getVariantStyles()}
    >
      {/* Grid Pattern */}
      {!shouldReduceMotion && <GridPattern />}

      {/* Floating Shapes */}
      {!shouldReduceMotion && floatingShapes.map(shape => (
        <FloatingShape key={shape.id} shape={shape} />
      ))}

      {/* Particles */}
      {!shouldReduceMotion && particles.map(particle => (
        <Particle key={particle.id} particle={particle} />
      ))}

      {/* Scroll-based overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20"
        style={{ 
          opacity,
          y: y2
        }}
      />

      {/* Additional decorative elements */}
      {!shouldReduceMotion && (
        <>
          {/* Top gradient */}
          <motion.div
            className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent"
            style={{ y: y1 }}
          />
          
          {/* Bottom gradient */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-pink-500/5 via-yellow-500/5 to-transparent"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          />

          {/* Side decorations */}
          <motion.div
            className="absolute left-0 top-1/4 w-96 h-96 bg-radial-gradient from-cyan-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute right-0 top-3/4 w-96 h-96 bg-radial-gradient from-pink-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Content overlay */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default React.memo(AnimatedBackgroundEnhanced);
