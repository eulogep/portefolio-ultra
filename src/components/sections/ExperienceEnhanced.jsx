import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award, 
  TrendingUp,
  Users,
  Clock,
  Star,
  CheckCircle,
  Building,
  Zap
} from 'lucide-react';
import { education, experiences } from '@/data/portfolioData';

const ExperienceEnhanced = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const tabs = [
    { 
      id: 'experience', 
      label: 'Expérience', 
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      data: experiences
    },
    { 
      id: 'education', 
      label: 'Formation', 
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      data: education
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const TimelineItem = ({ item, index, isLast }) => (
    <motion.div
      variants={itemVariants}
      className="relative flex gap-6 group"
      onClick={() => setSelectedItem(item)}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-background shadow-lg z-10"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {!isLast && (
          <motion.div
            className="w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-purple-500/50 mt-2"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer mb-8"
        whileHover={{ scale: 1.02, x: 5 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {activeTab === 'experience' ? (
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-foreground/70">
                <Building className="w-4 h-4" />
                <span className="font-medium">{item.institution}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-medium text-blue-400 mb-1">
              <Calendar className="w-4 h-4" />
              {item.date}
            </div>
            {activeTab === 'experience' && (
              <div className="flex items-center gap-1 text-xs text-foreground/60">
                <Clock className="w-3 h-3" />
                En cours
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/70 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Tags/Skills (if it's experience) */}
        {activeTab === 'experience' && (
          <div className="flex flex-wrap gap-2 mb-4">
            {['Travail d\'équipe', 'Gestion du temps', 'Service client', 'Adaptabilité'].map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Achievements */}
        <div className="flex items-center gap-4 text-xs text-foreground/60">
          {activeTab === 'experience' ? (
            <>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Équipe de 8 personnes</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Amélioration continue</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span>Formation prestigieuse</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span>Spécialisation IA</span>
              </div>
            </>
          )}
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
      </motion.div>
    </motion.div>
  );

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section 
      ref={ref}
      id="experience" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/20"
          >
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Parcours & Expérience</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mon Parcours
            </span>
            <br />
            <span className="text-foreground">Professionnel</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed"
          >
            Un parcours enrichi par des expériences variées et une formation solide 
            en ingénierie informatique, orienté vers l'innovation et l'excellence.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.color}`}
                    layoutId="activeExperienceTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {tab.data.length}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            className="space-y-0"
          >
            {currentTab.data.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLast={index === currentTab.data.length - 1}
              />
            ))}
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {activeTab === 'experience' ? [
              {
                icon: Briefcase,
                title: "Expériences",
                value: experiences?.length || 0,
                description: "Missions accomplies",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Users, 
                title: "Collaboration", 
                value: "8+",
                description: "Collègues dans l'équipe",
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: TrendingUp, 
                title: "Croissance", 
                value: "100%",
                description: "Objectifs atteints",
                color: "from-purple-500 to-pink-500"
              }
            ] : [
              { 
                icon: Award, 
                title: "Diplômes", 
                value: education.length,
                description: "Formations complétées",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Star, 
                title: "Spécialisations", 
                value: "3",
                description: "Domaines d'expertise",
                color: "from-yellow-500 to-orange-500"
              },
              { 
                icon: CheckCircle, 
                title: "Niveau", 
                value: "Bac+5",
                description: "En cours d'obtention",
                color: "from-green-500 to-emerald-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground/90 mb-1">
                  {stat.title}
                </div>
                <div className="text-sm text-foreground/60">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceEnhanced;
