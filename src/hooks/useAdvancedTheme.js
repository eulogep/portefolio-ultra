import { useState, useEffect, createContext, useContext } from 'react';

// Thèmes prédéfinis
export const themes = {
  default: {
    name: 'Défaut',
    colors: {
      primary: { h: 224, s: 90, l: 56 }, // Bleu
      secondary: { h: 293, s: 84, l: 61 }, // Violet
      tertiary: { h: 165, s: 84, l: 51 }, // Vert
      accent: { h: 43, s: 96, l: 56 }, // Jaune
    },
    properties: {
      borderRadius: 'rounded',
      glassIntensity: 0.08,
      particleCount: 8,
      animationSpeed: 'normal',
    },
  },
  oceanic: {
    name: 'Océanique',
    colors: {
      primary: { h: 195, s: 100, l: 50 }, // Cyan
      secondary: { h: 240, s: 100, l: 67 }, // Bleu clair
      tertiary: { h: 180, s: 100, l: 40 }, // Turquoise
      accent: { h: 210, s: 100, l: 56 }, // Bleu océan
    },
    properties: {
      borderRadius: 'rounded-lg',
      glassIntensity: 0.12,
      particleCount: 12,
      animationSpeed: 'slow',
    },
  },
  sunset: {
    name: 'Coucher de soleil',
    colors: {
      primary: { h: 14, s: 100, l: 63 }, // Orange
      secondary: { h: 340, s: 82, l: 52 }, // Rose
      tertiary: { h: 45, s: 100, l: 51 }, // Jaune doré
      accent: { h: 0, s: 84, l: 60 }, // Rouge corail
    },
    properties: {
      borderRadius: 'rounded-xl',
      glassIntensity: 0.15,
      particleCount: 10,
      animationSpeed: 'fast',
    },
  },
  forest: {
    name: 'Forêt',
    colors: {
      primary: { h: 142, s: 76, l: 36 }, // Vert forêt
      secondary: { h: 120, s: 60, l: 50 }, // Vert
      tertiary: { h: 88, s: 50, l: 53 }, // Vert lime
      accent: { h: 60, s: 100, l: 25 }, // Vert olive
    },
    properties: {
      borderRadius: 'rounded-2xl',
      glassIntensity: 0.06,
      particleCount: 6,
      animationSpeed: 'slow',
    },
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: { h: 300, s: 100, l: 50 }, // Magenta
      secondary: { h: 180, s: 100, l: 50 }, // Cyan électrique
      tertiary: { h: 60, s: 100, l: 50 }, // Jaune néon
      accent: { h: 0, s: 100, l: 50 }, // Rouge néon
    },
    properties: {
      borderRadius: 'rounded-sm',
      glassIntensity: 0.2,
      particleCount: 15,
      animationSpeed: 'fast',
    },
  },
  monochrome: {
    name: 'Monochrome',
    colors: {
      primary: { h: 0, s: 0, l: 20 }, // Gris foncé
      secondary: { h: 0, s: 0, l: 40 }, // Gris moyen
      tertiary: { h: 0, s: 0, l: 60 }, // Gris clair
      accent: { h: 0, s: 0, l: 80 }, // Gris très clair
    },
    properties: {
      borderRadius: 'rounded-md',
      glassIntensity: 0.1,
      particleCount: 4,
      animationSpeed: 'normal',
    },
  },
};

// Convertir HSL en CSS
const hslToCSS = (hsl, alpha = 1) => {
  return alpha === 1
    ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    : `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`;
};

// Générer les variations d'une couleur
const generateColorVariations = (baseColor) => {
  const variations = {};
  const lightness = [95, 90, 80, 65, 50, 40, 30, 20, 10, 5];

  lightness.forEach((l, index) => {
    variations[`${(index + 1) * 100}`] = {
      h: baseColor.h,
      s: baseColor.s,
      l: l,
    };
  });

  return variations;
};

// Contexte pour le thème
const ThemeContext = createContext();

export const useAdvancedTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAdvancedTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [customColors, setCustomColors] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  // Détecter le thème système
  useEffect(() => {
    if (isSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handler = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [isSystemTheme]);

  // Appliquer le thème
  useEffect(() => {
    const theme = themes[currentTheme];
    const colors = customColors || theme.colors;

    const root = document.documentElement;

    // Appliquer les couleurs principales
    Object.entries(colors).forEach(([colorName, hsl]) => {
      const variations = generateColorVariations(hsl);

      Object.entries(variations).forEach(([variant, color]) => {
        root.style.setProperty(`--${colorName}-${variant}`, hslToCSS(color));
      });

      // Couleur de base
      root.style.setProperty(`--${colorName}`, hslToCSS(hsl));
    });

    // Appliquer les propriétés du thème
    Object.entries(theme.properties).forEach(([property, value]) => {
      root.style.setProperty(`--theme-${property}`, value);
    });

    // Mode sombre/clair
    root.classList.toggle('dark', isDarkMode);

    // Sauvegarder les préférences
    localStorage.setItem(
      'theme-preferences',
      JSON.stringify({
        currentTheme,
        customColors,
        isDarkMode,
        isSystemTheme,
      }),
    );
  }, [currentTheme, customColors, isDarkMode, isSystemTheme]);

  // Charger les préférences sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem('theme-preferences');
    if (saved) {
      try {
        const preferences = JSON.parse(saved);
        setCurrentTheme(preferences.currentTheme || 'default');
        setCustomColors(preferences.customColors);
        setIsDarkMode(preferences.isDarkMode ?? false);
        setIsSystemTheme(preferences.isSystemTheme ?? true);
      } catch (error) {
        console.warn('Erreur lors du chargement des préférences de thème:', error);
      }
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    setCustomColors(null); // Reset custom colors when changing theme
  };

  const updateCustomColor = (colorName, hsl) => {
    setCustomColors((prev) => ({
      ...(prev || themes[currentTheme].colors),
      [colorName]: hsl,
    }));
  };

  const resetToDefault = () => {
    setCurrentTheme('default');
    setCustomColors(null);
    setIsDarkMode(false);
    setIsSystemTheme(true);
  };

  const toggleDarkMode = () => {
    setIsSystemTheme(false);
    setIsDarkMode((prev) => !prev);
  };

  const setSystemTheme = () => {
    setIsSystemTheme(true);
  };

  const exportTheme = () => {
    const themeData = {
      name: currentTheme,
      colors: customColors || themes[currentTheme].colors,
      properties: themes[currentTheme].properties,
      isDarkMode,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${currentTheme}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (themeData) => {
    try {
      if (themeData.colors) {
        setCustomColors(themeData.colors);
      }
      if (themeData.name && themes[themeData.name]) {
        setCurrentTheme(themeData.name);
      }
      if (typeof themeData.isDarkMode === 'boolean') {
        setIsDarkMode(themeData.isDarkMode);
        setIsSystemTheme(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'importation du thème:", error);
    }
  };

  return {
    // État
    currentTheme,
    customColors,
    isDarkMode,
    isSystemTheme,
    availableThemes: themes,

    // Actions
    changeTheme,
    updateCustomColor,
    resetToDefault,
    toggleDarkMode,
    setSystemTheme,
    exportTheme,
    importTheme,

    // Utilitaires
    getCurrentColors: () => customColors || themes[currentTheme].colors,
    getCurrentProperties: () => themes[currentTheme].properties,
    hslToCSS,
    generateColorVariations,
  };
};

// Hook pour animations adaptées au thème
export const useThemeAwareAnimations = () => {
  const { getCurrentProperties } = useAdvancedTheme();
  const properties = getCurrentProperties();

  const getAnimationDuration = () => {
    switch (properties.animationSpeed) {
      case 'fast':
        return { duration: 0.2 };
      case 'slow':
        return { duration: 0.8 };
      default:
        return { duration: 0.4 };
    }
  };

  const getStagger = () => {
    switch (properties.animationSpeed) {
      case 'fast':
        return 0.05;
      case 'slow':
        return 0.3;
      default:
        return 0.1;
    }
  };

  return {
    duration: getAnimationDuration(),
    stagger: getStagger(),
    particleCount: properties.particleCount,
    glassIntensity: properties.glassIntensity,
  };
};

// Hook pour couleurs adaptées au contexte
export const useContextualColors = () => {
  const { getCurrentColors, isDarkMode } = useAdvancedTheme();
  const colors = getCurrentColors();

  const getStatusColor = (status) => {
    const statusMap = {
      success: colors.tertiary,
      warning: { h: 43, s: 96, l: 56 },
      error: { h: 0, s: 84, l: 60 },
      info: colors.primary,
    };
    return statusMap[status] || colors.primary;
  };

  const getContrastColor = (backgroundColor) => {
    // Calculer la luminosité et retourner blanc ou noir pour le contraste
    const luminance = backgroundColor.l / 100;
    return luminance > 0.5 ? { h: 0, s: 0, l: 0 } : { h: 0, s: 0, l: 100 };
  };

  const getGradient = (colors, direction = '135deg') => {
    const colorStops = colors.map((color) => hslToCSS(color)).join(', ');
    return `linear-gradient(${direction}, ${colorStops})`;
  };

  return {
    colors,
    isDarkMode,
    getStatusColor,
    getContrastColor,
    getGradient,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    accent: colors.accent,
  };
};
