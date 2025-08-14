import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Users, 
  Eye,
  Clock,
  Server,
  Smartphone
} from 'lucide-react';

const PerformanceCharts = ({ data, className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('lighthouse');
  const [animationKey, setAnimationKey] = useState(0);

  // Mock performance data - In real app, this would come from analytics
  const performanceData = useMemo(() => ({
    lighthouse: {
      label: 'Lighthouse Score',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      score: 95,
      metrics: [
        { name: 'Performance', value: 98, max: 100 },
        { name: 'Accessibility', value: 95, max: 100 },
        { name: 'Best Practices', value: 92, max: 100 },
        { name: 'SEO', value: 100, max: 100 }
      ]
    },
    users: {
      label: 'Engagement Utilisateurs',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      score: 87,
      metrics: [
        { name: 'Visiteurs uniques', value: 1247, max: 1500 },
        { name: 'Pages vues', value: 3891, max: 4000 },
        { name: 'Temps sur site', value: 4.2, max: 5, unit: 'min' },
        { name: 'Taux de rebond', value: 23, max: 50, unit: '%', inverse: true }
      ]
    },
    performance: {
      label: 'Performance Technique',
      icon: Server,
      color: 'from-purple-500 to-pink-500',
      score: 92,
      metrics: [
        { name: 'Temps de chargement', value: 0.8, max: 2, unit: 's', inverse: true },
        { name: 'First Paint', value: 1.2, max: 3, unit: 's', inverse: true },
        { name: 'Largest Contentful Paint', value: 1.5, max: 4, unit: 's', inverse: true },
        { name: 'Cumulative Layout Shift', value: 0.05, max: 0.25, inverse: true }
      ]
    },
    mobile: {
      label: 'Expérience Mobile',
      icon: Smartphone,
      color: 'from-orange-500 to-red-500',
      score: 89,
      metrics: [
        { name: 'Score Mobile', value: 89, max: 100 },
        { name: 'Touch Target Size', value: 95, max: 100 },
        { name: 'Responsive Design', value: 98, max: 100 },
        { name: 'Mobile Speed', value: 85, max: 100 }
      ]
    }
  }), []);

  const currentData = performanceData[selectedMetric];

  // Trigger animation when metric changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedMetric]);

  const CircularProgress = ({ value, max, label, unit = '', inverse = false, delay = 0 }) => {
    const percentage = inverse ? ((max - value) / max) * 100 : (value / max) * 100;
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

    const getColor = () => {
      if (normalizedPercentage >= 80) return '#10b981'; // green
      if (normalizedPercentage >= 60) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24">
          <svg
            className="w-24 h-24 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              key={animationKey}
              cx="50"
              cy="50"
              r="45"
              stroke={getColor()}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay }}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={`${animationKey}-${value}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.5 }}
              className="text-sm font-bold text-white"
            >
              {Math.round(normalizedPercentage)}
            </motion.span>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <div className="text-sm font-medium text-foreground/90">{label}</div>
          <div className="text-xs text-foreground/60">
            {value}{unit} / {max}{unit}
          </div>
        </div>
      </motion.div>
    );
  };

  const BarChart = ({ metrics, delay = 0 }) => {
    return (
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const percentage = metric.inverse 
            ? ((metric.max - metric.value) / metric.max) * 100
            : (metric.value / metric.max) * 100;
          const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground/90">
                  {metric.name}
                </span>
                <span className="text-sm text-foreground/70">
                  {metric.value}{metric.unit || ''}
                </span>
              </div>
              
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={`${animationKey}-${metric.name}`}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${normalizedPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: delay + index * 0.1 }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-32, '100%'] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: delay + index * 0.1 + 1,
                    repeatDelay: 3
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const ScoreDisplay = ({ score, label, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-r ${color} bg-opacity-10 border border-white/10`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{label}</h3>
          <div className="text-xs text-foreground/60">Score global</div>
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <motion.span
          key={`${animationKey}-score`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          {score}
        </motion.span>
        <span className="text-lg text-foreground/60">/100</span>
      </div>
    </motion.div>
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(performanceData).map(([key, metric]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              selectedMetric === key
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <metric.icon className="w-4 h-4" />
            {metric.label}
          </motion.button>
        ))}
      </div>

      {/* Main Chart Display */}
      <motion.div
        key={selectedMetric}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Score Overview */}
        <ScoreDisplay
          score={currentData.score}
          label={currentData.label}
          icon={currentData.icon}
          color={currentData.color}
        />

        {/* Detailed Metrics */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Métriques détaillées
          </h4>
          <BarChart metrics={currentData.metrics} />
        </div>
      </motion.div>

      {/* Circular Progress Visualization */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h4 className="font-semibold text-foreground mb-6 text-center flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Visualisation circulaire
        </h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {currentData.metrics.map((metric, index) => (
            <CircularProgress
              key={metric.name}
              value={metric.value}
              max={metric.max}
              label={metric.name}
              unit={metric.unit}
              inverse={metric.inverse}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Real-time Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-2 text-sm text-foreground/60"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-400 rounded-full"
        />
        <span>Données en temps réel • Dernière mise à jour: maintenant</span>
      </motion.div>
    </div>
  );
};

export default PerformanceCharts;
