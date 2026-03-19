import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', ...navLinks.map(l => l.id)];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-bg-card/80 backdrop-blur-lg border-border-main py-3' : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="font-orbitron text-xl text-accent-cyan cursor-pointer flex items-center gap-2 group"
        >
          <span className="text-accent-purple group-hover:text-accent-cyan transition-colors">&lt;</span>
          <span className="text-primary">SadabManjar</span>
          <span className="text-accent-purple group-hover:text-accent-cyan transition-colors">/&gt;</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => scrollToSection(link.id)}
                className={`font-mono text-sm tracking-widest uppercase hover:text-accent-cyan transition-colors ${
                  activeSection === link.id ? 'text-accent-cyan font-bold' : 'text-secondary'
                }`}
              >
                {link.name}
              </button>
              {activeSection === link.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent-cyan shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                />
              )}
            </motion.div>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-accent-cyan hover:bg-accent-cyan/10 rounded-full transition-colors flex items-center justify-center w-10 h-10"
            aria-label="Toggle Theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-accent-cyan"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end relative">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-[2px] bg-accent-cyan rounded-full origin-right"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-[2px] bg-accent-cyan rounded-full w-2/3"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-[2px] bg-accent-cyan rounded-full origin-right"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-card border-b border-border-main overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left font-mono text-lg text-secondary hover:text-accent-cyan flex items-center gap-4"
                >
                  <span className="text-accent-cyan/40 text-xs">0{i+1}_</span>
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
