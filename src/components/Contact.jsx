import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const { personal } = portfolioData;
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
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

        <div className="grid md:grid-cols-2 gap-16">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  className="bg-bg-card w-full rounded-lg border border-border-main px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted"
                />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  className="bg-bg-card w-full rounded-lg border border-border-main px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <textarea 
                  placeholder="Your Message" 
                  rows="5"
                  required
                  className="bg-bg-card w-full rounded-lg border border-border-main px-4 py-4 text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none focus:shadow-neon-cyan transition duration-300 placeholder:text-muted resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded-lg font-orbitron font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                  status === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-accent-cyan text-black hover:shadow-neon-cyan disabled:opacity-50'
                }`}
              >
                {status === 'idle' && "SEND MESSAGE →"}
                {status === 'loading' && (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    SENDING...
                  </>
                )}
                {status === 'success' && "MESSAGE SENT ✓"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
