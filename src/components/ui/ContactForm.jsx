import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\\'email est requis';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\\'email invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Simulation d'envoi d'email (remplacer par EmailJS)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici, vous pouvez intégrer EmailJS
      // await emailjs.send('service_id', 'template_id', formData, 'public_key');

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Réinitialiser le statut après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur lors de l\\'envoi:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={inputVariants} whileFocus="focus">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Votre nom"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Sujet */}
        <motion.div variants={inputVariants} whileFocus="focus">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Sujet *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
              errors.subject ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Sujet de votre message"
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.subject}
            </motion.p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div variants={inputVariants} whileFocus="focus">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Votre message..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </motion.p>
          )}
          <div className="mt-1 text-sm text-gray-400 text-right">
            {formData.message.length}/500
          </div>
        </motion.div>

        {/* Bouton d'envoi */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              status === 'loading'
                ? 'bg-gray-600 cursor-not-allowed'
                : status === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : status === 'error'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {status === 'loading' && (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="w-5 h-5 mr-2" />
            )}
            {status === 'error' && (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {status === 'idle' && (
              <Send className="w-5 h-5 mr-2" />
            )}
            
            {status === 'loading' && 'Envoi en cours...'}
            {status === 'success' && 'Message envoyé !'}
            {status === 'error' && 'Erreur d\\'envoi'}
            {status === 'idle' && 'Envoyer le message'}
          </Button>
        </motion.div>

        {/* Messages de statut */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-900/50 border border-green-500 rounded-xl text-green-300"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-300"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Une erreur s\\'est produite lors de l\\'envoi. Veuillez réessayer ou me contacter directement.</span>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;

