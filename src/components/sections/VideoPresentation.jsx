import React, { useRef, useState } from 'react';

const VideoPresentation = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setPlaying(true);
  };

  return (
    <section id="video-presentation" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="video-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#video-grad)" />
        <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#video-grad)" />
      </svg>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-4xl font-bold gradient-text-premium mb-4">Présentation vidéo</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Découvrez mon projet professionnel et ma personnalité à travers cette courte vidéo de présentation.
        </p>
        <div className="relative flex justify-center items-center">
          <div className="glass-effect-premium rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in w-full max-w-2xl flex items-center justify-center">
            <video
              ref={videoRef}
              src="/image/Video Euloge.mp4"
              poster="/profile.jpg"
              className="rounded-3xl shadow-2xl w-full object-cover border-4 border-white dark:border-gray-800"
              controls={playing}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <button
                onClick={handlePlay}
                className="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-lg w-20 h-20 hover:scale-110 transition-all border-4 border-blue-400"
                aria-label="Lire la vidéo"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#3B82F6" />
                  <polygon points="16,12 30,20 16,28" fill="white" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
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
          animation: fadeInVideo 0.5s;
        }
        @keyframes fadeInVideo {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default VideoPresentation; 