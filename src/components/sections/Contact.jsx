
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

  return (
    <section id="contact" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="contact-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#contact-grad)" />
        <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#contact-grad)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionTitle
          title={<span className="gradient-text-premium">Contactez-moi</span>}
          subtitle="Intéressé par une collaboration ? N'hésitez pas à me contacter !"
        />
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 gradient-text-premium">Informations de contact</h3>
              <div className="space-y-4">
                <motion.a whileHover={{ scale: 1.05 }} href={`mailto:${personalInfo.email}`} className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Mail className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.email}</p>
                  </div>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Linkedin className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.linkedin.split('/').pop()}</p>
                  </div>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Github className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.github.split('/').pop()}</p>
                  </div>
                </motion.a>
              </div>
            </div>
            <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 gradient-text-premium">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="animate-fade-in"
          >
            <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-2xl space-y-6">
              <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="votre.email@exemple.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Sujet de votre message" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Votre message..." />
              </div>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptcha}
                className="mb-2"
              />
              {captchaError && <p className="text-red-600 text-sm mb-2">{captchaError}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
              {success && <p className="text-green-600">Message envoyé !</p>}
              {error && <p className="text-red-600">{error}</p>}
              {showSuccess && (
                <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in mt-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Merci pour votre message ! Je vous répondrai rapidement 🚀</span>
                </div>
              )}
            </form>
          </motion.div>
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
          animation: fadeInContact 0.5s;
        }
        @keyframes fadeInContact {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Contact;