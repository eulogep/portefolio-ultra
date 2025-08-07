import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, Image as ImageIcon, Filter, Star, BookOpen } from 'lucide-react';

const certificats = [
  { src: '/certificat/baccalauréat22.jpg', type: 'image', title: 'Baccalauréat 2022', desc: 'Diplôme obtenu en 2022 avec mention.', rarity: 'rare', category: 'diplome' },
  { src: '/certificat/baccalauréat2.pdf', type: 'pdf', title: 'Baccalauréat 2022 (PDF)', desc: 'Version PDF officielle du diplôme.', rarity: 'rare', category: 'diplome' },
  { src: '/certificat/Certificate five guys.pdf.png', type: 'image', title: 'Certificate Five Guys', desc: 'Formation en restauration rapide.', rarity: 'common', category: 'pro' },
  { src: '/certificat/sql_basic certificate.pdf', type: 'pdf', title: 'SQL Basic Certificate', desc: 'Certification SQL de base.', rarity: 'epic', category: 'tech' },
  { src: '/certificat/r_basic certificate.pdf', type: 'pdf', title: 'R Basic Certificate', desc: 'Certification R pour l’analyse de données.', rarity: 'epic', category: 'tech' },
  { src: '/certificat/java_basic certificate.pdf', type: 'pdf', title: 'Java Basic Certificate', desc: 'Certification Java débutant.', rarity: 'epic', category: 'tech' },
  { src: '/certificat/asgnmt-01-java-fr-16.pdf', type: 'pdf', title: 'Assignment Java', desc: 'Projet Java universitaire.', rarity: 'common', category: 'pro' },
];

const rarityColors = {
  legendary: 'from-yellow-400 to-yellow-600',
  epic: 'from-purple-500 to-purple-700',
  rare: 'from-blue-500 to-blue-700',
  common: 'from-gray-500 to-gray-700',
};

const rarityLabels = {
  legendary: 'Légendaire',
  epic: 'Épique',
  rare: 'Rare',
  common: 'Commun',
};

const categoryLabels = {
  diplome: 'Diplômes',
  tech: 'Techniques',
  pro: 'Professionnels',
};

const Certificats = () => {
  const [filter, setFilter] = useState('all');
  const filteredCerts = filter === 'all' ? certificats : certificats.filter(c => c.category === filter);
  const allCategories = Array.from(new Set(certificats.map(c => c.category)));

  return (
    <section id="certificats" className="section-padding relative section-bg-harmonized">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl lg:text-6xl glow-text mb-6">
            INVENTAIRE
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mes diplômes, certifications et badges. Chaque item raconte une histoire !
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
          >
            <Filter className="w-4 h-4 mr-2 inline" /> Tous
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === cat ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              {categoryLabels[cat] || cat}
                </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCerts.map((cert, idx) => {
            const colorClass = rarityColors[cert.rarity] || 'from-gray-500 to-gray-700';
            const rarityLabel = rarityLabels[cert.rarity] || cert.rarity;
            const Icon = cert.type === 'pdf' ? FileText : ImageIcon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative z-10 flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${colorClass} text-white mb-1`}>
                      {rarityLabel}
                    </div>
                    <div className="text-sm text-gray-400">{categoryLabels[cert.category] || cert.category}</div>
                  </div>
                </div>
                <div className="relative z-10 mb-2">
                  <h3 className="font-orbitron font-bold text-xl mb-1 group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                    {cert.desc}
                  </p>
        </div>
                <div className="relative z-10 flex items-center gap-2 mb-2">
                  {cert.type === 'image' ? (
                    <a href={cert.src} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-medium flex items-center gap-1">
                      <ImageIcon className="w-3 h-3"/> Voir Image
                    </a>
                  ) : (
                    <a href={cert.src} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium flex items-center gap-1">
                      <FileText className="w-3 h-3"/> Voir PDF
                </a>
              )}
              </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </motion.div>
            );
          })}
            </div>
        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Aucun certificat trouvé pour ce filtre</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certificats; 