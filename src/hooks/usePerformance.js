import { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor largest contentful paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    return () => observer.disconnect();
  }, []);
};

// Hook for lazy loading with intersection observer
export const useLazyLoad = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// Hook for optimized scroll handling
export const useOptimizedScroll = (callback, deps = []) => {
  const rafId = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        callback(currentScrollY);
        lastScrollY.current = currentScrollY;
      }
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, ...deps]);
};

// Hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttled function calls
export const useThrottle = (func, delay) => {
  const timeoutRef = useRef(null);
  const lastExecRef = useRef(0);

  return useCallback((...args) => {
    const currentTime = Date.now();

    if (currentTime - lastExecRef.current > delay) {
      func(...args);
      lastExecRef.current = currentTime;
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        func(...args);
        lastExecRef.current = Date.now();
      }, delay - (currentTime - lastExecRef.current));
    }
  }, [func, delay]);
};

// Hook for preloading images
export const useImagePreloader = (imageSources) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const imagePromises = imageSources.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          loadedCount++;
          if (loadedCount === imageSources.length) {
            setIsLoading(false);
          }
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises);
  }, [imageSources]);

  return { loadedImages, isLoading };
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};
