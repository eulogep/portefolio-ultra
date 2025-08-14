import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitFork, 
  Code, 
  Activity, 
  RefreshCw,
  ExternalLink,
  Calendar,
  Clock,
  TrendingUp,
  Database,
  Zap
} from 'lucide-react';
import useGitHubAPI from '@/hooks/useGitHubAPI';

const GitHubLiveStats = () => {
  const {
    repos,
    commits,
    profile,
    stats,
    loading,
    error,
    lastUpdate,
    refresh,
    isStale
  } = useGitHubAPI();

  const [selectedTab, setSelectedTab] = useState('overview');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'1h';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;
    return formatDate(dateString);
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
    { id: 'repos', label: 'Repositories', icon: Github },
    { id: 'commits', label: 'Commits récents', icon: Code }
  ];

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center"
      >
        <div className="text-red-400 mb-2">⚠️ Erreur GitHub API</div>
        <p className="text-sm text-foreground/60 mb-4">{error}</p>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 transition-colors"
        >
          Réessayer
        </button>
      </motion.div>
    );
  }

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
            <Github className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">GitHub Live</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Activité GitHub
            </span>
            <br />
            <span className="text-foreground">Temps Réel</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Dernière sync: {lastUpdate ? formatTimeAgo(lastUpdate) : 'Jamais'}</span>
            </div>
            
            <motion.button
              onClick={refresh}
              disabled={loading}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-all ${
                isStale 
                  ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' 
                  : 'border-green-500/30 bg-green-500/10 text-green-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: loading ? 360 : 0 }}
                transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-3 h-3" />
              </motion.div>
              <span>{loading ? 'Sync...' : isStale ? 'Actualiser' : 'À jour'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedTab === tab.id 
                    ? 'text-white' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
                    layoutId="activeGitHubTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { 
                    label: 'Repositories', 
                    value: stats.totalRepos || 0, 
                    icon: Github, 
                    color: 'from-blue-500 to-cyan-500',
                    description: 'Projets publics'
                  },
                  { 
                    label: 'Total Stars', 
                    value: stats.totalStars || 0, 
                    icon: Star, 
                    color: 'from-yellow-500 to-orange-500',
                    description: 'Étoiles reçues'
                  },
                  { 
                    label: 'Commits (7j)', 
                    value: stats.commitsThisWeek || 0, 
                    icon: Code, 
                    color: 'from-green-500 to-emerald-500',
                    description: 'Cette semaine'
                  },
                  { 
                    label: 'Code (MB)', 
                    value: stats.totalSize || 0, 
                    icon: Database, 
                    color: 'from-purple-500 to-pink-500',
                    description: 'Taille totale'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-1">
                        {loading ? '...' : stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground/90 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {stat.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'repos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.slice(0, 9).map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground group-hover:text-white transition-colors">
                        {repo.name}
                      </h3>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4 text-foreground/60 hover:text-blue-400" />
                      </a>
                    </div>
                    
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                      {repo.description || 'Aucune description'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-foreground/60">{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-foreground/60">{repo.stargazers_count}</span>
                        </div>
                      </div>
                      <span className="text-foreground/50">
                        {formatTimeAgo(repo.pushed_at)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'commits' && (
              <div className="space-y-4">
                {commits.slice(0, 10).map((commit, index) => (
                  <motion.div
                    key={`${commit.repo}-${commit.sha}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs bg-gray-700 px-2 py-1 rounded text-blue-300">
                          {commit.sha}
                        </code>
                        <a
                          href={commit.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-400 hover:text-blue-300"
                        >
                          {commit.repo}
                        </a>
                      </div>
                      
                      <p className="text-sm text-foreground/80 truncate">
                        {commit.message}
                      </p>
                      
                      <div className="text-xs text-foreground/60 mt-1">
                        par {commit.author} • {formatTimeAgo(commit.date)}
                      </div>
                    </div>
                    
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4 text-foreground/60 hover:text-blue-400" />
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GitHubLiveStats;
