
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, CheckCircle } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { personalInfo, certifications } from '@/data/portfolioData';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaError, setCaptchaError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    setCaptcha(value);
    setCaptchaError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captcha) {
      setCaptchaError('Veuillez valider le captcha pour envoyer le message.');
      return;
    }
    setLoading(true);
    setSuccess(false);
    setError('');
    const params = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    };
    console.log('Envoi EmailJS avec params:', params);
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      params,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setShowSuccess(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      })
      .catch((err) => {
        setLoading(false);
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
        console.log('EmailJS error:', err);
      });
  };

  // Animations cohérentes avec le Hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="contact" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium avec animation */}
      <motion.svg 
        className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" 
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="contact-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <motion.ellipse 
          cx="80%" cy="20%" rx="220" ry="120" fill="url(#contact-grad)"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.ellipse 
          cx="20%" cy="80%" rx="180" ry="100" fill="url(#contact-grad)"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </motion.svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle
              title={<span className="gradient-text-premium">Contactez-moi</span>}
              subtitle="Intéressé par une collaboration ? N'hésitez pas à me contacter !"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Informations de contact</h3>
                <div className="space-y-4">
                  <motion.a 
                    whileHover={{ scale: 1.05, x: 10 }} 
                    href={`mailto:${personalInfo.email}`} 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Mail className="w-6 h-6 mr-4 text-blue-500" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">{personalInfo.email}</p>
                    </div>
                  </motion.a>

                  <motion.a 
                    whileHover={{ scale: 1.05, x: 10 }} 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Linkedin className="w-6 h-6 mr-4 text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <p className="text-gray-600 dark:text-gray-400">Euloge Junior Mabiala</p>
                    </div>
                  </motion.a>

                  <motion.a 
                    whileHover={{ scale: 1.05, x: 10 }} 
                    href={personalInfo.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Github className="w-6 h-6 mr-4 text-gray-800 dark:text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold">GitHub</h4>
                      <p className="text-gray-600 dark:text-gray-400">@eulogep</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <motion.div 
                      key={cert}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div 
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Envoyez-moi un message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Sujet de votre message"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={handleCaptcha}
                      className="flex justify-center"
                    />
                    {captchaError && (
                      <p className="text-red-500 text-sm mt-2">{captchaError}</p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-center p-3 bg-red-100 dark:bg-red-900/20 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-500 text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg"
                    >
                      Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Styles premium améliorés */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
          transition: all 0.3s ease;
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInContact 0.8s ease-out;
        }
        @keyframes fadeInContact {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;