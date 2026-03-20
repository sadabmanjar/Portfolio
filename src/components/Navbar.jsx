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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-3 left-3 right-3 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-3xl z-50 transition-all duration-300 border border-border-main/50 rounded-full ${
        scrolled ? 'bg-bg-card/80 backdrop-blur-lg py-2 px-6 shadow-lg' : 'bg-transparent py-4 px-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={(e) => handleNavClick(e, 'hero')}
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
              whileHover="hovered"
            >
              <motion.button
                onClick={(e) => handleNavClick(e, link.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`font-mono text-sm tracking-widest uppercase transition-colors ${
                  activeSection === link.id ? 'text-accent-cyan font-bold' : 'text-secondary hover:text-accent-cyan'
                }`}
              >
                {link.name}
              </motion.button>

              {/* Hover underline — slide in */}
              {activeSection !== link.id && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-accent-cyan"
                  initial={{ width: 0 }}
                  variants={{ hovered: { width: '100%' } }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Active underline — persistent glow */}
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

        {/* Mobile Hamburger — large touch target */}
        <button
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-accent-cyan"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] bg-bg-card/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-left font-mono text-xl flex items-center gap-4 transition-colors ${
                  activeSection === link.id ? 'text-accent-cyan font-bold' : 'text-secondary hover:text-accent-cyan'
                }`}
              >
                <span className="text-accent-cyan/40 text-xs">0{i+1}_</span>
                {link.name}
              </motion.button>
            ))}
            {/* Theme toggle in mobile menu too */}
            <button
              onClick={toggleTheme}
              className="mt-4 p-3 text-accent-cyan border border-accent-cyan/20 rounded-full hover:bg-accent-cyan/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
