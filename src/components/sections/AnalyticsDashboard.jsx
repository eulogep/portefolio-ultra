import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Download,
  Share2,
  Filter
} from 'lucide-react';
import PerformanceCharts from '@/components/ui/PerformanceCharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const timeRanges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '3 mois' }
  ];

  const quickStats = [
    {
      label: 'Visiteurs aujourd\'hui',
      value: '1,247',
      change: '+12.5%',
      positive: true,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Pages vues',
      value: '3,891',
      change: '+8.2%',
      positive: true,
      icon: Eye,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Temps moyen',
      value: '4m 23s',
      change: '+15.3%',
      positive: true,
      icon: Clock,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Taux de rebond',
      value: '23.1%',
      change: '-5.7%',
      positive: true,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const topPages = [
    { path: '/', title: 'Accueil', views: 1247, time: '5m 12s' },
    { path: '/#projects', title: 'Mes Projets', views: 892, time: '7m 34s' },
    { path: '/#about', title: 'À Propos', views: 634, time: '3m 45s' },
    { path: '/#contact', title: 'Contact', views: 423, time: '2m 18s' },
    { path: '/cv-euloge-mabiala.pdf', title: 'CV PDF', views: 312, time: '1m 05s' }
  ];

  const deviceStats = [
    { type: 'Desktop', percentage: 62, count: '2,147', icon: Monitor },
    { type: 'Mobile', percentage: 32, count: '1,108', icon: Smartphone },
    { type: 'Tablet', percentage: 6, count: '208', icon: Globe }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/20">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Analytics Live</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Métriques
            </span>
            <br />
            <span className="text-foreground">& Performance</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: isLive ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 2, repeat: isLive ? Infinity : 0 }}
                className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400' : 'bg-gray-400'}`}
              />
              <span>{isLive ? 'Live' : 'Hors ligne'}</span>
            </div>
            <span>•</span>
            <span>Dernière MAJ: {formatTime(lastUpdate)}</span>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Time Range Selector */}
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            {timeRanges.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range.value
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range.label}
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isLive 
                  ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                  : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: isLive ? 360 : 0 }}
                transition={{ duration: 2, repeat: isLive ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              {isLive ? 'Live' : 'Arrêté'}
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-foreground transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/60">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <PerformanceCharts />
        </motion.div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Pages les plus visitées
            </h3>
            
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground/90 text-sm">
                      {page.title}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {page.path}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {page.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {page.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Device Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Répartition par appareil
            </h3>
            
            <div className="space-y-6">
              {deviceStats.map((device, index) => (
                <motion.div
                  key={device.type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <device.icon className="w-5 h-5 text-foreground/70" />
                      <span className="font-medium text-foreground/90">
                        {device.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {device.percentage}%
                      </div>
                      <div className="text-xs text-foreground/60">
                        {device.count}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
