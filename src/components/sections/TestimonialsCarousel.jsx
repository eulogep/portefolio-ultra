import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star,
  Play,
  Pause,
  User,
  Briefcase,
  Calendar
} from 'lucide-react';
import { testimonials } from '@/data/portfolioData';
import { useSmoothReveal } from '@/hooks/useAdvancedScrollEffects';

const TestimonialCard = ({ testimonial, isActive }) => {
  const [imageError, setImageError] = useState(false);
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Star 
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`} 
        />
      </motion.div>
    ));
  };

  return (
    <motion.div
      className="glass-premium p-8 rounded-2xl relative overflow-hidden h-full"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative Quote */}
      <motion.div
        className="absolute top-4 right-4 opacity-10"
        animate={{ 
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Quote className="w-16 h-16" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Rating */}
        <motion.div 
          className="flex items-center gap-1 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderStars(testimonial.rating)}
        </motion.div>

        {/* Testimonial Text */}
        <motion.blockquote
          className="text-lg text-foreground leading-relaxed mb-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          "{testimonial.content}"
        </motion.blockquote>

        {/* Author Info */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-foreground">{testimonial.name}</div>
            <div className="text-sm text-foreground-secondary flex items-center gap-2">
              <Briefcase className="w-3 h-3" />
              {testimonial.role}
            </div>
            {testimonial.company && (
              <div className="text-xs text-foreground-tertiary">
                {testimonial.company}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Gradient Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--tertiary-500))',
          padding: '2px',
        }}
        animate={{
          background: [
            'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
            'linear-gradient(135deg, var(--secondary-500), var(--tertiary-500))',
            'linear-gradient(135deg, var(--tertiary-500), var(--primary-500))',
            'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-background rounded-2xl" />
      </motion.div>
    </motion.div>
  );
};

const TestimonialsCarousel = () => {
  const [ref, isVisible] = useSmoothReveal(0.2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute"
            style={{
              background: `var(--gradient-${['primary', 'secondary', 'tertiary'][i]})`,
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50%',
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 text-balance">
            Témoignages
          </h2>
          <p className="text-lg sm:text-xl text-foreground-secondary max-w-3xl mx-auto text-pretty">
            Ce que disent les personnes avec qui j'ai eu le plaisir de travailler
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Carousel */}
          <div className="relative h-80 mb-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction > 0 ? 300 : -300,
                  rotateY: direction > 0 ? 45 : -45
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotateY: 0
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction > 0 ? -300 : 300,
                  rotateY: direction > 0 ? -45 : 45
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeInOut",
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0"
                style={{ perspective: '1000px' }}
              >
                <TestimonialCard 
                  testimonial={testimonials[currentIndex]} 
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.button
              onClick={goToPrevious}
              className="btn btn-ghost p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="btn btn-ghost p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="btn btn-ghost p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={testimonials.length <= 1}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-foreground-tertiary hover:bg-foreground-secondary'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {isAutoPlaying && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              key={currentIndex}
              transition={{ duration: 5, ease: "linear" }}
            />
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { 
              value: testimonials.length, 
              label: 'Témoignages', 
              icon: Quote,
              gradient: 'from-blue-400 to-indigo-500'
            },
            { 
              value: Math.round(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length * 10) / 10, 
              label: 'Note moyenne', 
              icon: Star,
              gradient: 'from-yellow-400 to-orange-500'
            },
            { 
              value: '100%', 
              label: 'Satisfaction', 
              icon: User,
              gradient: 'from-green-400 to-emerald-500'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 glass rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground-secondary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
