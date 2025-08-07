import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

// Images de passions (voyage)
const passionsImages = [
  { src: '/image/voyage/IMG-20250717-WA0050.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Découverte de nouveaux horizons.' },
  { src: '/image/voyage/IMG-20250717-WA0048.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Moments inoubliables en voyage.' },
  { src: '/image/voyage/IMG-20250717-WA0045.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Exploration et aventure.' },
  { src: '/image/voyage/IMG-20250717-WA0044.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est vivre.' },
  { src: '/image/voyage/IMG-20250717-WA0043.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Rencontres et découvertes.' },
  { src: '/image/voyage/IMG-20250717-WA0046.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Beauté des paysages.' },
  { src: '/image/voyage/IMG-20250717-WA0042.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Culture et traditions.' },
  { src: '/image/voyage/IMG-20250717-WA0029.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, une passion sans fin.' },
  { src: '/image/voyage/IMG-20250717-WA0027.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Souvenirs de voyage.' },
  { src: '/image/voyage/IMG-20250717-WA0025.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Aventures autour du monde.' },
  { src: '/image/voyage/IMG-20250717-WA0023.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est apprendre.' },
  { src: '/image/voyage/IMG-20250717-WA0021.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Moments de partage.' },
  { src: '/image/voyage/IMG-20250717-WA0020.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Découverte culinaire.' },
  { src: '/image/voyage/IMG-20250717-WA0019.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est grandir.' },
  { src: '/image/voyage/IMG-20250717-WA0018.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Nouveaux amis, nouvelles expériences.' },
  { src: '/image/voyage/IMG-20250717-WA0017.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, source d’inspiration.' },
  { src: '/image/voyage/IMG-20250717-WA0016.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est rêver.' },
  { src: '/image/voyage/IMG-20250717-WA0015.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, plaisir et découverte.' },
  { src: '/image/voyage/IMG-20250717-WA0014.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est s’ouvrir au monde.' },
  { src: '/image/voyage/IMG-20250717-WA0013.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, aventure humaine.' },
  { src: '/image/voyage/IMG-20250717-WA0012.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est partager.' },
  { src: '/image/voyage/IMG-20250717-WA0011.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs impérissables.' },
  { src: '/image/voyage/IMG-20250717-WA0010.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est s’émerveiller.' },
  { src: '/image/voyage/IMG-20250717-WA0009.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, passion et liberté.' },
  { src: '/image/voyage/IMG-20250717-WA0008.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est découvrir.' },
  { src: '/image/voyage/IMG-20250717-WA0007.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, ouverture d’esprit.' },
  { src: '/image/voyage/IMG-20250717-WA0006.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyager, c’est explorer.' },
  { src: '/image/voyage/IMG-20250717-WA0005.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, plaisir de la découverte.' },
  { src: '/image/voyage/IMG-20250717-WA0004.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250717-WA0003.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250717-WA0001.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250717-WA0002.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250713-WA0032.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250713-WA0031.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250616-WA0004.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
  { src: '/image/voyage/IMG-20250603-WA0044.jpg', alt: 'Voyage', title: 'Voyage', desc: 'Voyage, souvenirs et émotions.' },
];

// Images de travail
const travailImages = [
  { src: '/image/travail/IMG-20250717-WA0041.jpg', alt: 'Travail', desc: 'Projet professionnel 1' },
  { src: '/image/travail/IMG-20250717-WA0038.jpg', alt: 'Travail', desc: 'Projet professionnel 2' },
  { src: '/image/travail/IMG-20250717-WA0037.jpg', alt: 'Travail', desc: 'Projet professionnel 3' },
  { src: '/image/travail/IMG-20250717-WA0039.jpg', alt: 'Travail', desc: 'Projet professionnel 4' },
  { src: '/image/travail/IMG-20250717-WA0036.jpg', alt: 'Travail', desc: 'Projet professionnel 5' },
  { src: '/image/travail/IMG-20250717-WA0035.jpg', alt: 'Travail', desc: 'Projet professionnel 6' },
  { src: '/image/travail/IMG-20250717-WA0034.jpg', alt: 'Travail', desc: 'Projet professionnel 7' },
  { src: '/image/travail/IMG-20250717-WA0032.jpg', alt: 'Travail', desc: 'Projet professionnel 8' },
  { src: '/image/travail/IMG-20250717-WA0031.jpg', alt: 'Travail', desc: 'Projet professionnel 9' },
  { src: '/image/travail/IMG-20250717-WA0030.jpg', alt: 'Travail', desc: 'Projet professionnel 10' },
  { src: '/image/travail/IMG-20250717-WA0028.jpg', alt: 'Travail', desc: 'Projet professionnel 11' },
  { src: '/image/travail/IMG-20250717-WA0024.jpg', alt: 'Travail', desc: 'Projet professionnel 12' },
  { src: '/image/travail/IMG-20250603-WA0004.jpg', alt: 'Travail', desc: 'Projet professionnel 13' },
  { src: '/image/travail/IMG-20250502-WA0001.jpg', alt: 'Travail', desc: 'Projet professionnel 14' },
  { src: '/image/travail/IMG-20241027-WA0007.jpg', alt: 'Travail', desc: 'Projet professionnel 15' },
  { src: '/image/travail/IMG-20241027-WA0002.jpg', alt: 'Travail', desc: 'Projet professionnel 16' },
  { src: '/image/travail/IMG-20240923-WA0014.jpg', alt: 'Travail', desc: 'Projet professionnel 17' },
  { src: '/image/travail/IMG-20240826-WA0063.jpg', alt: 'Travail', desc: 'Projet professionnel 18' },
  { src: '/image/travail/IMG-20240826-WA0060.jpg', alt: 'Travail', desc: 'Projet professionnel 19' },
  { src: '/image/travail/IMG-20240826-WA0047.jpg', alt: 'Travail', desc: 'Projet professionnel 20' },
];

const Passions = () => {
  // Carrousel passions
  const [current, setCurrent] = useState(0);
  const total = passionsImages.length;
  const [anim, setAnim] = useState('');
  const [zoomed, setZoomed] = useState(null);

  React.useEffect(() => {
    if (!zoomed) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setZoomed(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomed]);

  const next = () => {
    setAnim('slide-left');
    setTimeout(() => {
      setCurrent((c) => (c + 1) % total);
      setAnim('');
    }, 300);
  };
  const prev = () => {
    setAnim('slide-right');
    setTimeout(() => {
      setCurrent((c) => (c - 1 + total) % total);
      setAnim('');
    }, 300);
  };

  return (
    <>
      <section id="passions" className="section-padding relative section-bg-harmonized overflow-hidden">
        {/* Fond décoratif SVG premium */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
          <defs>
            <radialGradient id="passions-grad" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#passions-grad)" />
          <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#passions-grad)" />
        </svg>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <SectionTitle
            title={<span className="gradient-text-premium">Mes Passions & Voyages</span>}
            subtitle="Voyages, découvertes, souvenirs !"
          />
          <div className="relative flex flex-col items-center mt-8">
            <div className="w-full max-w-md h-72 flex items-center justify-center overflow-hidden rounded-3xl glass-effect-premium shadow-2xl transition-all duration-500 animate-fade-in">
              <button className="w-full h-full" onClick={() => setZoomed(passionsImages[current].src)}>
                <img
                  src={passionsImages[current].src}
                  alt={passionsImages[current].alt}
                  className={`object-cover w-full h-full transition-all duration-500 ${anim === 'slide-left' ? 'animate-slide-left' : ''} ${anim === 'slide-right' ? 'animate-slide-right' : ''}`}
                />
              </button>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={prev} aria-label="Précédent" className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-all text-blue-600 dark:text-blue-300 text-2xl absolute left-0 top-1/2 -translate-y-1/2 z-10">
                &#8592;
              </button>
              <button onClick={next} aria-label="Suivant" className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-all text-blue-600 dark:text-blue-300 text-2xl absolute right-0 top-1/2 -translate-y-1/2 z-10">
                &#8594;
              </button>
            </div>
            <div className="flex flex-col items-center mt-6">
              <h3 className="text-2xl font-bold gradient-text-premium mb-2">{passionsImages[current].title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 italic">{passionsImages[current].desc}</p>
              <div className="flex justify-center gap-2 mt-2">
                {passionsImages.map((img, idx) => (
                  <span key={idx} className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            .animate-slide-left { animation: slideLeft 0.3s; }
            .animate-slide-right { animation: slideRight 0.3s; }
            @keyframes slideLeft {
              0% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(-80px); opacity: 0.7; }
            }
            @keyframes slideRight {
              0% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(80px); opacity: 0.7; }
            }
          `}</style>
        </div>
      </section>
      {/* Section Travail premium */}
      <section id="travail" className="section-padding relative section-bg-harmonized overflow-hidden">
        {/* Fond décoratif SVG premium */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
          <defs>
            <radialGradient id="travail-grad" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="15%" cy="20%" rx="220" ry="120" fill="url(#travail-grad)" />
          <ellipse cx="85%" cy="80%" rx="180" ry="100" fill="url(#travail-grad)" />
        </svg>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <SectionTitle
            title={<span className="gradient-text-premium">Mes Réalisations Professionnelles</span>}
            subtitle="Découvrez quelques moments forts de mon parcours professionnel."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
            {travailImages.map((img, idx) => (
              <div key={idx} className="relative group rounded-3xl overflow-hidden glass-effect-premium shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                <button className="w-full h-56" onClick={() => setZoomed(img.src)}>
                  <img src={img.src} alt={img.alt} className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500" />
                </button>
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md drop-shadow-lg">Travail</span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Modale de zoom premium */}
      {zoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setZoomed(null)}>
          <div className="relative flex flex-col items-center">
            <img src={zoomed} alt="Zoom" className="max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 animate-zoom-in" onClick={e => e.stopPropagation()} />
            <button onClick={() => setZoomed(null)} className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition">&times;</button>
          </div>
        </div>
      )}
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInPassions 0.5s;
        }
        .animate-zoom-in {
          animation: zoomInPassions 0.3s;
        }
        @keyframes fadeInPassions {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomInPassions {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Passions; 