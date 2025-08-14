import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Hook pour les effets de hover magnétiques
export const useMagneticHover = (strength = 0.3) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return {
    x: springX,
    y: springY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    isHovered
  };
};

// Composant Button avec effet magnétique
export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.2, 
  glowColor = 'var(--primary-500)',
  ...props 
}) => {
  const magnetic = useMagneticHover(strength);
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      style={{
        x: magnetic.x,
        y: magnetic.y,
      }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseEnter={magnetic.handleMouseEnter}
      onMouseLeave={magnetic.handleMouseLeave}
      onClick={createRipple}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
        }}
        animate={{
          opacity: magnetic.isHovered ? 0.6 : 0,
          scale: magnetic.isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: `${glowColor}30`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
};

// Hook pour effet de parallax au hover
export const useParallaxHover = (intensity = 10) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePosition({ x: x * intensity, y: y * intensity });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  
  return {
    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    isHovered
  };
};

// Composant Card avec effets hover avancés
export const InteractiveCard = ({ 
  children, 
  className = '', 
  glowIntensity = 0.3,
  parallaxIntensity = 8,
  ...props 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {/* Gradient overlay effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, var(--primary-400)15, transparent 40%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          background: `linear-gradient(${Math.atan2(mousePosition.y - 0.5, mousePosition.x - 0.5) * 180 / Math.PI + 90}deg, var(--primary-500), var(--secondary-500), var(--tertiary-500))`,
          padding: '1px',
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? glowIntensity : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-background rounded-inherit" />
      </motion.div>
      
      {/* Content with parallax */}
      <motion.div
        className="relative z-10"
        animate={{
          x: isHovered ? (mousePosition.x - 0.5) * parallaxIntensity : 0,
          y: isHovered ? (mousePosition.y - 0.5) * parallaxIntensity : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Composant de texte avec effet de typewriter
export const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '',
  cursor = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (cursor) {
        // Cursor blinking effect
        setTimeout(() => setShowCursor(false), 500);
      }
    }, delay + (currentIndex * speed));

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed, cursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Composant pour effet de "blob" qui suit la souris
export const MouseFollower = ({ size = 20, color = 'var(--primary-500)' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - size / 2,
        top: mousePosition.y - size / 2,
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
        filter: 'blur(2px)',
      }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 0.6 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    />
  );
};

// Hook pour effet de shake
export const useShakeAnimation = () => {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  return { isShaking, triggerShake, shakeVariants };
};

// Composant pour effet de morphing/transformation
export const MorphingIcon = ({ icons, interval = 3000, className = '' }) => {
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  return (
    <div className={`relative ${className}`}>
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{
            opacity: index === currentIcon ? 1 : 0,
            scale: index === currentIcon ? 1 : 0.5,
            rotate: index === currentIcon ? 0 : 180,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
};

// Composant pour effet de particules au hover
export const ParticleHover = ({ children, particleCount = 6 }) => {
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const generateParticles = () => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsHovered(true);
        generateParticles();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {isHovered && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-400 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 0.6, 0],
            y: [-20, -40, -60],
          }}
          transition={{
            duration: 1.5,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default {
  MagneticButton,
  InteractiveCard,
  TypewriterText,
  MouseFollower,
  MorphingIcon,
  ParticleHover,
  useMagneticHover,
  useParallaxHover,
  useShakeAnimation,
};
