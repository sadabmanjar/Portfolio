import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';
import Toast from './ui/Toast';

/* 
const PaperPlane = () => (
  <motion.div
    initial={{ x: 0, y: 0, rotate: -45, opacity: 0, scale: 0.5 }}
    animate={{ 
      x: [0, -100, -350, -750, -1200], 
      y: [0, 80, -40, -450, -1000],
      rotate: [-45, 15, -10, -30, -45],
      opacity: [0, 1, 1, 1, 0],
      scale: [0.5, 1, 1.3, 1.8, 2.5]
    }}
    transition={{ 
      duration: 3, 
      ease: [0.12, 0, 0.39, 0], // Smooth acceleration
      times: [0, 0.2, 0.45, 0.75, 1] 
    }}
    className="absolute pointer-events-none z-50 text-accent-cyan"
    style={{ left: '50%', top: '0%' }}
  >
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="drop-shadow-[0_0_15px_rgba(0,245,255,1)]"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
    <div className="absolute top-1/2 left-full pointer-events-none origin-left">
      {[...Array(2)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 5, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          className="h-[1.5px] w-48 bg-accent-cyan/60 blur-[1px] mb-2"
          style={{ transform: `rotate(${180 + (i - 0.5) * 8}deg)` }}
        />
      ))}
    </div>
  </motion.div>
);
*/

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
  const [showPlane, setShowPlane] = useState(false);

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

    // Simulate success if keys are missing (for local dev without .env)
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
       setTimeout(() => {
          setStatus('success');
          // setShowPlane(true);
          // setToast({ isVisible: true, message: 'Message sent successfully (Simulation)! 🚀', type: 'success' });
          formRef.current.reset();
          setTimeout(() => { setStatus('idle'); /* setShowPlane(false); */ }, 5000);
       }, 1500);
       return;
    }

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setStatus('success');
        // setShowPlane(true);
        // setToast({ isVisible: true, message: 'Message sent successfully! 🚀', type: 'success' });
        formRef.current.reset();
        setTimeout(() => { setStatus('idle'); /* setShowPlane(false); */ }, 5000);
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
    <section id="contact" className="bg-bg-main py-24 px-6 md:px-16 overflow-hidden relative">
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
            className="relative"
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

              <div className="relative">
                <motion.button
                  type="submit"
                  className="relative overflow-hidden w-full py-3.5 rounded-xl font-mono font-bold text-sm z-10"
                  animate={{
                    backgroundColor: status === 'success' ? 'rgba(0, 245, 255, 0)' : '#00f5ff',
                    color: status === 'success' ? '#00f5ff' : '#000000',
                    border: status === 'success' ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent'
                  }}
                  whileHover={{ scale: 1.02, boxShadow: status === 'success' ? 'none' : '0 0 30px rgba(0,229,255,0.5)' }}
                  whileTap={{ scale: 0.97 }}
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
                        <motion.span 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                        >
                          →
                        </motion.span>
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
                      <motion.div key="success"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative w-full flex items-center justify-center h-full min-h-[1.5rem]"
                      >
                         {/* Phase 1: Slow Paper Plane Flight (One-time) */}
                         <motion.div
                           initial={{ x: -150, opacity: 1 }}
                           animate={{ x: 250, opacity: [0, 1, 1, 0] }}
                           transition={{ duration: 2.8, ease: "easeInOut" }}
                           className="absolute flex items-center"
                         >
                            <div className="relative">
                               <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="rotate-45" /* Point Head Directly Right */
                              >
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                              </svg>
                              {/* Enahanced Multiple Trails */}
                              {[-1, 0, 1].map((offset, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ scaleX: 0, opacity: 0 }}
                                  animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
                                  transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: "linear" }}
                                  className="absolute top-1/2 right-full h-0 w-20 border-b-[2px] border-[#00f5ff] border-dotted origin-right"
                                  style={{ 
                                    transform: `translateY(${offset * 3 - 0.5}px) rotate(${offset * -2}deg)`,
                                    filter: 'blur(0.5px)'
                                  }}
                                />
                              ))}
                            </div>
                         </motion.div>

                         {/* Phase 2: Message Sent Text (Delayed until plane passes) */}
                         <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: 2.8, duration: 0.4 }}
                           className="flex items-center gap-2 text-cyber-cyan font-bold uppercase tracking-widest text-[10px]"
                         >
                           ✓ Message Sent
                         </motion.div>
                      </motion.div>
                    )}
                     {status === 'error' && (
                      <motion.span key="error"
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-2 text-red-600"
                      >
                        ⚠ Try Again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
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
