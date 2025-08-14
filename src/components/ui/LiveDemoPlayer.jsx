import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  EyeOff,
  Download,
  Share2,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const LiveDemoPlayer = ({ 
  project, 
  className = '',
  defaultView = 'desktop',
  showControls = true,
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState(defaultView);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [loadTime, setLoadTime] = useState(null);
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);

  const viewports = {
    mobile: { width: 375, height: 667, label: 'Mobile', icon: Smartphone },
    tablet: { width: 768, height: 1024, label: 'Tablet', icon: Tablet },
    desktop: { width: 1200, height: 800, label: 'Desktop', icon: Monitor }
  };

  const currentViewport = viewports[currentView];

  // Security sandbox attributes
  const sandboxAttributes = [
    'allow-scripts',
    'allow-same-origin',
    'allow-forms',
    'allow-modals',
    'allow-popups',
    'allow-presentation',
    'allow-downloads'
  ].join(' ');

  useEffect(() => {
    if (isPlaying && project?.demo) {
      startTimeRef.current = Date.now();
      setIsLoading(true);
      setError(null);
    }
  }, [isPlaying, project?.demo]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (startTimeRef.current) {
      const loadTime = Date.now() - startTimeRef.current;
      setLoadTime(loadTime);
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Impossible de charger la démo');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const refreshDemo = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setError(null);
      startTimeRef.current = Date.now();
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    if (project?.demo) {
      window.open(project.demo, '_blank', 'noopener,noreferrer');
    }
  };

  const getFrameSrc = () => {
    if (!isPlaying || !project?.demo) return '';
    
    // Add responsive parameters for better mobile/tablet experience
    const url = new URL(project.demo);
    if (currentView === 'mobile') {
      url.searchParams.set('mobile', 'true');
      url.searchParams.set('viewport', 'mobile');
    }
    
    return url.toString();
  };

  const DemoFrame = () => (
    <motion.div
      className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
      style={{
        width: isFullscreen ? '100%' : `${currentViewport.width}px`,
        height: isFullscreen ? '100%' : `${currentViewport.height}px`,
        maxWidth: '100%',
        aspectRatio: isFullscreen ? 'auto' : `${currentViewport.width}/${currentViewport.height}`
      }}
      animate={{
        scale: isFullscreen ? 1 : currentView === 'mobile' ? 0.8 : currentView === 'tablet' ? 0.9 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Demo Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900/90 backdrop-blur-sm border-b border-white/10 px-4 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isLoading ? 'bg-yellow-400 animate-pulse' : 
              error ? 'bg-red-400' : 'bg-green-400'
            }`} />
            <span className="text-foreground/80">
              {isLoading ? 'Chargement...' : 
               error ? 'Erreur' : 
               loadTime ? `Chargé en ${loadTime}ms` : 'Prêt'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-foreground/60">
            <Eye className="w-3 h-3" />
            <span>{project?.title || 'Démo'}</span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-3"
              />
              <div className="text-sm text-foreground/80">Chargement de la démo...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Overlay */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-red-900/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center p-6">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <div className="text-sm text-red-300 mb-3">{error}</div>
              <button
                onClick={refreshDemo}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo iframe */}
      {isPlaying && project?.demo && (
        <iframe
          ref={iframeRef}
          src={getFrameSrc()}
          title={`Démo de ${project.title}`}
          className="w-full h-full border-0"
          sandbox={sandboxAttributes}
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ 
            marginTop: '40px', // Account for status bar
            height: 'calc(100% - 40px)'
          }}
        />
      )}

      {/* Placeholder when not playing */}
      {!isPlaying && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <motion.button
            onClick={togglePlayPause}
            className="flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Lancer la démo
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  if (!project?.demo) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
        <div className="text-foreground/60 mb-2">⚠️ Démo non disponible</div>
        <p className="text-sm text-foreground/50">
          Aucune démo en ligne n'est configurée pour ce projet.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`space-y-4 ${className}`}>
      {/* Controls */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={togglePlayPause}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </motion.button>

            <motion.button
              onClick={refreshDemo}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Recharger"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={openInNewTab}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Viewport Controls */}
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1">
            {Object.entries(viewports).map(([key, viewport]) => (
              <motion.button
                key={key}
                onClick={() => setCurrentView(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === key
                    ? 'bg-blue-500 text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={`${viewport.label} (${viewport.width}×${viewport.height})`}
              >
                <viewport.icon className="w-4 h-4" />
                {viewport.label}
              </motion.button>
            ))}
          </div>

          {/* Additional Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Plein écran"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      )}

      {/* Demo Frame */}
      <div className="flex justify-center">
        <DemoFrame />
      </div>

      {/* Demo Info */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">{project.title}</h4>
            <p className="text-sm text-foreground/70 line-clamp-2">
              {project.description || project.pitch}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            {loadTime && (
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span>{loadTime}ms</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Démo live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemoPlayer;
