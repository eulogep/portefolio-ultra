import { useEffect, useState, useCallback } from 'react';

// Simple throttle implementation to avoid lodash dependency
const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return (...args) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

export const useAdvancedScrollEffects = () => {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    scrollVelocity: 0,
    isScrolling: false,
  });

  const [parallaxValues, setParallaxValues] = useState({
    slow: 0,
    medium: 0,
    fast: 0,
    reverse: 0,
  });

  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const updateScrollData = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / documentHeight, 1);
      
      const velocity = Math.abs(currentScrollY - previousScrollY);
      const direction = currentScrollY > previousScrollY ? 'down' : 'up';

      setScrollData({
        scrollY: currentScrollY,
        scrollProgress: progress,
        scrollDirection: direction,
        scrollVelocity: velocity,
        isScrolling: true,
      });

      // Calculate parallax values
      setParallaxValues({
        slow: currentScrollY * 0.2,
        medium: currentScrollY * 0.5,
        fast: currentScrollY * 0.8,
        reverse: currentScrollY * -0.3,
      });

      setPreviousScrollY(currentScrollY);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set scroll stopped after 150ms of no scrolling
      const timeout = setTimeout(() => {
        setScrollData(prev => ({ ...prev, isScrolling: false }));
      }, 150);
      
      setScrollTimeout(timeout);
    }, 16), // ~60fps
    [previousScrollY, scrollTimeout]
  );

  useEffect(() => {
    window.addEventListener('scroll', updateScrollData, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollData);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [updateScrollData, scrollTimeout]);

  return { scrollData, parallaxValues };
};

export const useIntersectionObserver = (options = {}) => {
  const [intersectionData, setIntersectionData] = useState({});

  const observe = useCallback((element, id) => {
    if (!element || intersectionData[id]) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersectionData(prev => ({
        ...prev,
        [id]: {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect,
        }
      }));
    }, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '-10% 0px -10% 0px',
      ...options
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [intersectionData]);

  return { intersectionData, observe };
};

export const useParallaxElement = (speed = 0.5, direction = 'vertical') => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const { scrollData } = useAdvancedScrollEffects();

  useEffect(() => {
    const value = scrollData.scrollY * speed;
    
    if (direction === 'vertical') {
      setTransform(`translate3d(0, ${value}px, 0)`);
    } else if (direction === 'horizontal') {
      setTransform(`translate3d(${value}px, 0, 0)`);
    } else if (direction === 'both') {
      setTransform(`translate3d(${value * 0.3}px, ${value}px, 0)`);
    }
  }, [scrollData.scrollY, speed, direction]);

  return transform;
};

export const useSmoothReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isVisible];
};
