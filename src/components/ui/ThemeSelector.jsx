import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Settings,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Check,
  X,
  Plus,
  Minus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAdvancedTheme, themes } from '@/hooks/useAdvancedTheme';
import { MagneticButton, InteractiveCard } from './MicroInteractions';

const ColorPicker = ({ label, color, onChange, disabled = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hslToRgb = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return [f(0), f(8), f(4)];
  };

  const [r, g, b] = hslToRgb(color.h, color.s, color.l);
  const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground capitalize">{label}</label>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-glass-bg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={disabled}
        >
          {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </motion.button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg border-2 border-glass-border cursor-pointer overflow-hidden"
          style={{ backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <div className="flex-1 text-xs font-mono text-foreground-secondary">
          {hexColor.toUpperCase()}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Hue */}
            <div>
              <label className="text-xs text-foreground-tertiary">Teinte</label>
              <input
                type="range"
                min="0"
                max="360"
                value={color.h}
                onChange={(e) => onChange({ ...color, h: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(0, ${color.s}%, ${color.l}%) 0%,
                    hsl(60, ${color.s}%, ${color.l}%) 17%,
                    hsl(120, ${color.s}%, ${color.l}%) 33%,
                    hsl(180, ${color.s}%, ${color.l}%) 50%,
                    hsl(240, ${color.s}%, ${color.l}%) 67%,
                    hsl(300, ${color.s}%, ${color.l}%) 83%,
                    hsl(360, ${color.s}%, ${color.l}%) 100%)`,
                }}
                disabled={disabled}
              />
            </div>

            {/* Saturation */}
            <div>
              <label className="text-xs text-foreground-tertiary">Saturation</label>
              <input
                type="range"
                min="0"
                max="100"
                value={color.s}
                onChange={(e) => onChange({ ...color, s: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${color.h}, 0%, ${color.l}%),
                    hsl(${color.h}, 100%, ${color.l}%))`,
                }}
                disabled={disabled}
              />
            </div>

            {/* Lightness */}
            <div>
              <label className="text-xs text-foreground-tertiary">Luminosité</label>
              <input
                type="range"
                min="0"
                max="100"
                value={color.l}
                onChange={(e) => onChange({ ...color, l: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${color.h}, ${color.s}%, 0%),
                    hsl(${color.h}, ${color.s}%, 50%),
                    hsl(${color.h}, ${color.s}%, 100%))`,
                }}
                disabled={disabled}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThemePreview = ({ theme, colors, isActive, onClick }) => {
  const previewColors = colors || theme.colors;

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? 'border-primary-500 shadow-lg shadow-primary-500/25'
          : 'border-glass-border hover:border-glass-border'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient */}
      <div
        className="h-20 relative"
        style={{
          background: `linear-gradient(135deg, 
            hsl(${previewColors.primary.h}, ${previewColors.primary.s}%, ${previewColors.primary.l}%) 0%,
            hsl(${previewColors.secondary.h}, ${previewColors.secondary.s}%, ${previewColors.secondary.l}%) 50%,
            hsl(${previewColors.tertiary.h}, ${previewColors.tertiary.s}%, ${previewColors.tertiary.l}%) 100%)`,
        }}
      >
        {/* Mini elements preview */}
        <div className="absolute inset-2 flex items-center justify-center gap-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: `hsl(${previewColors.primary.h}, ${previewColors.primary.s}%, ${previewColors.primary.l}%)`,
            }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: `hsl(${previewColors.secondary.h}, ${previewColors.secondary.s}%, ${previewColors.secondary.l}%)`,
            }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: `hsl(${previewColors.tertiary.h}, ${previewColors.tertiary.s}%, ${previewColors.tertiary.l}%)`,
            }}
          />
        </div>

        {isActive && (
          <motion.div
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-3 h-3 text-green-600" />
          </motion.div>
        )}
      </div>

      {/* Theme name */}
      <div className="p-2 bg-glass-bg border-t border-glass-border">
        <div className="text-xs font-medium text-foreground text-center">{theme.name}</div>
      </div>
    </motion.div>
  );
};

const ThemeSelector = ({ isOpen, onClose }) => {
  const {
    currentTheme,
    customColors,
    isDarkMode,
    isSystemTheme,
    availableThemes,
    changeTheme,
    updateCustomColor,
    resetToDefault,
    toggleDarkMode,
    setSystemTheme,
    exportTheme,
    importTheme,
    getCurrentColors,
  } = useAdvancedTheme();

  const [activeTab, setActiveTab] = useState('presets');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleImportTheme = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target.result);
          importTheme(themeData);
        } catch (error) {
          console.error("Erreur lors de l'importation:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-premium rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Personnaliser le thème</h2>
              <p className="text-sm text-foreground-secondary">
                Adaptez l'apparence à vos préférences
              </p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-secondary hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-glass-border">
          {[
            { id: 'presets', label: 'Thèmes prédéfinis', icon: Palette },
            { id: 'custom', label: 'Personnalisation', icon: Settings },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-500 bg-primary-500/10'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'presets' && (
              <motion.div
                key="presets"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Dark Mode Toggle */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Mode d'affichage</h3>
                  <div className="flex gap-2">
                    {[
                      { mode: 'system', icon: Monitor, label: 'Système' },
                      { mode: 'light', icon: Sun, label: 'Clair' },
                      { mode: 'dark', icon: Moon, label: 'Sombre' },
                    ].map((mode) => (
                      <MagneticButton
                        key={mode.mode}
                        onClick={() => {
                          if (mode.mode === 'system') {
                            setSystemTheme();
                          } else {
                            toggleDarkMode();
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          (mode.mode === 'system' && isSystemTheme) ||
                          (mode.mode === 'light' && !isDarkMode && !isSystemTheme) ||
                          (mode.mode === 'dark' && isDarkMode && !isSystemTheme)
                            ? 'bg-primary-500 text-white'
                            : 'bg-glass-bg text-foreground-secondary hover:text-foreground'
                        }`}
                      >
                        <mode.icon className="w-4 h-4" />
                        {mode.label}
                      </MagneticButton>
                    ))}
                  </div>
                </div>

                {/* Theme Presets */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Thèmes prédéfinis</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(availableThemes).map(([key, theme]) => (
                      <ThemePreview
                        key={key}
                        theme={theme}
                        isActive={currentTheme === key && !customColors}
                        onClick={() => changeTheme(key)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'custom' && (
              <motion.div
                key="custom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Custom Colors */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Couleurs personnalisées</h3>
                    <motion.button
                      onClick={() => setIsCustomizing(!isCustomizing)}
                      className="text-xs text-primary-500 hover:text-primary-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {isCustomizing ? 'Masquer' : 'Modifier'}
                    </motion.button>
                  </div>

                  {Object.entries(getCurrentColors()).map(([colorName, color]) => (
                    <ColorPicker
                      key={colorName}
                      label={colorName}
                      color={color}
                      onChange={(newColor) => updateCustomColor(colorName, newColor)}
                      disabled={!isCustomizing}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <MagneticButton onClick={exportTheme} className="btn btn-secondary">
                      <Download className="w-4 h-4" />
                      Exporter
                    </MagneticButton>

                    <label className="btn btn-secondary cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Importer
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportTheme}
                        className="hidden"
                      />
                    </label>

                    <MagneticButton onClick={resetToDefault} className="btn btn-ghost col-span-2">
                      <RotateCcw className="w-4 h-4" />
                      Réinitialiser
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSelector;
