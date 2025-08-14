import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Coffee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { personalInfo } from '@/data/portfolioData';

const ContactEnhanced = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const { toast } = useToast();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message envoyé avec succès ! 🚀",
      description: "Je vous répondrai dans les plus brefs délais. Merci pour votre intérêt !",
      duration: 5000,
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: personalInfo.email,
      description: "Réponse sous 24h",
      href: `mailto:${personalInfo.email}`,
      color: "from-red-500 to-pink-500",
      hoverColor: "hover:from-red-600 hover:to-pink-600"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Euloge Mabiala",
      description: "Réseau professionnel",
      href: personalInfo.linkedin,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@eulogep",
      description: "Projets & code",
      href: personalInfo.github,
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:from-gray-700 hover:to-gray-900"
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "Paris, France",
      description: "Disponible en remote",
      href: "#",
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-600"
    }
  ];

  const quickActions = [
    {
      icon: Coffee,
      title: "Prendre un café",
      description: "Discutons de vos projets",
      action: () => {
        toast({
          title: "Café virtuel ☕",
          description: "Contactez-moi par email pour organiser un échange !",
          duration: 3000,
        });
      }
    },
    {
      icon: Calendar,
      title: "Planifier un call",
      description: "Appel de 30 minutes gratuit",
      action: () => {
        toast({
          title: "Planification d'appel 📞",
          description: "Envoyez-moi un email avec vos créneaux disponibles !",
          duration: 3000,
        });
      }
    },
    {
      icon: MessageCircle,
      title: "Chat rapide",
      description: "Question courte",
      action: () => {
        toast({
          title: "Chat rapide 💬",
          description: "Utilisez le formulaire ci-dessous pour vos questions !",
          duration: 3000,
        });
      }
    }
  ];

  return (
    <section 
      ref={ref}
      id="contact" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
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
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Restons en Contact</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Travaillons
            </span>
            <br />
            <span className="text-foreground">Ensemble</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed"
          >
            Une idée de projet ? Une question ? Une collaboration ? 
            N'hésitez pas à me contacter, je serais ravi d'échanger avec vous !
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={action.action}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform">
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-white transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Envoyez-moi un message</h3>
                  <p className="text-foreground/60">Je vous répondrai rapidement</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-2 left-4 px-2 bg-background text-xs text-blue-400"
                    >
                      Nom complet
                    </motion.div>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-2 left-4 px-2 bg-background text-xs text-blue-400"
                    >
                      Adresse email
                    </motion.div>
                  )}
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="subject"
                    placeholder="Sujet du message"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {focusedField === 'subject' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-2 left-4 px-2 bg-background text-xs text-blue-400"
                    >
                      Sujet
                    </motion.div>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.textarea
                    name="message"
                    placeholder="Votre message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-2 left-4 px-2 bg-background text-xs text-blue-400"
                    >
                      Message détaillé
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl text-lg font-semibold shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Autres moyens de contact</h3>
                  <p className="text-foreground/60">Choisissez votre préférence</p>
                </div>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('mailto:') || method.href.startsWith('#') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className={`p-3 bg-gradient-to-r ${method.color} ${method.hoverColor} rounded-xl group-hover:scale-110 transition-all`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-white transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-foreground/80 font-medium">{method.value}</p>
                      <p className="text-sm text-foreground/60">{method.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-full">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-400">Actuellement disponible</h4>
                  <p className="text-sm text-foreground/60">Ouvert aux nouvelles opportunités</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Réponse sous 24h en moyenne</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Disponible du lundi au vendredi</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactEnhanced;
