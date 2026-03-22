import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';
import Toast from './ui/Toast';

const handleRipple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  const rect = btn.getBoundingClientRect();
  circle.style.cssText = `
    width: ${diameter}px; height: ${diameter}px;
    left: ${e.clientX - rect.left - radius}px;
    top: ${e.clientY - rect.top - radius}px;
    position: absolute; border-radius: 50%;
    background: rgba(0,229,255,0.3);
    transform: scale(0); animation: ripple 0.6s ease-out forwards;
    pointer-events: none;
  `;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
};

const Contact = () => {
  const { personal } = portfolioData;
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  // --- EmailJS credentials from .env ---
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.user_name || data.user_name.trim() === "") {
      newErrors.user_name = "Name is required";
    }
    if (!data.user_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) {
      newErrors.user_email = "Please enter a valid email address";
    }
    if (!data.message || data.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Extract data for validation
    const formData = new FormData(formRef.current);
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      message: formData.get('message')
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setStatus('success');
        setToast({ isVisible: true, message: 'Message sent successfully! 🚀', type: 'success' });
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 3000);
    }, (error) => {
        setStatus('error');
        setToast({ isVisible: true, message: 'Failed to send message. Please try again later. ❌', type: 'error' });
        setTimeout(() => setStatus('idle'), 3000);
    });
  };

  const socialLinks = [
    { name: 'GitHub', url: personal.github, icon: '🐙' },
    { name: 'LinkedIn', url: personal.linkedin, icon: '💼' },
    { name: 'Twitter', url: personal.twitter, icon: '🐦' },
    { name: 'Email', url: `mailto:${personal.email}`, icon: '✉️' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <section id="contact" className="bg-bg-main py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-accent-cyan font-mono text-sm tracking-widest mb-2">// GET IN TOUCH</p>
          <h2 className="font-orbitron text-3xl text-primary">Let's build something great.</h2>
          <p className="text-secondary mt-4 max-w-lg">Have a project in mind? I'm always open to discussing new opportunities and creative collaborations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: Socials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex items-center gap-4 text-secondary hover:text-accent-cyan transition-colors group cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="font-mono text-sm tracking-widest uppercase">{link.name}</span>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-8 border-t border-border-main">
              <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">Direct Response</p>
              <p className="text-cyber-cyan font-mono mt-2">{personal.email}</p>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <input 
                  type="text" 
                  name="user_name"
                  placeholder="Your Name" 
                  className={`bg-bg-card w-full rounded-lg border px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted ${errors.user_name ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-border-main'}`}
                />
                {errors.user_name && <p className="text-red-500 text-[10px] mt-1 ml-1 font-mono uppercase tracking-wider">{errors.user_name}</p>}
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <input 
                  type="email" 
                  name="user_email"
                  placeholder="Your Email" 
                  className={`bg-bg-card w-full rounded-lg border px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted ${errors.user_email ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-border-main'}`}
                />
                {errors.user_email && <p className="text-red-500 text-[10px] mt-1 ml-1 font-mono uppercase tracking-wider">{errors.user_email}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="5"
                  className={`bg-bg-card w-full rounded-lg border px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted resize-none ${errors.message ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-border-main'}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-1 font-mono uppercase tracking-wider">{errors.message}</p>}
              </motion.div>

              <motion.button
                type="submit"
                className="cyber-btn relative overflow-hidden w-full bg-accent-cyan text-black font-bold py-3 rounded-lg font-mono"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 25px rgba(0,229,255,0.6), 0 0 50px rgba(0,229,255,0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRipple}
                disabled={status === 'loading'}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Send Message
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span key="loading"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>⟳</motion.span>
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success"
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-green-400"
                    >
                      ✓ Message Sent!
                    </motion.span>
                  )}
                   {status === 'error' && (
                    <motion.span key="error"
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-red-400"
                    >
                      ⚠ Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />
    </section>
  );
};

export default Contact;
