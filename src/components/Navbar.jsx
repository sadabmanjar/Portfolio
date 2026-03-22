import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { id: 'hero',       label: 'Home'       },
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
];

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  
  // To ignore intersection observer during smooth scrolling
  const scrollLocked = useRef(false);
  const scrollTimeout = useRef(null);

  // Theme detection state
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Sync isDark when document class changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Initial scroll check
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Forced Home check
      if (window.scrollY < 120 && !scrollLocked.current) {
        setActiveSection('hero');
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => { 
          entries.forEach(e => {
            if (e.isIntersecting && !scrollLocked.current) {
              setActiveSection(id);
            }
          });
        },
        // Threshold: High enough to avoid accidental flickers
        { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollLocked.current = true;
    setActiveSection(id);
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    const element = document.getElementById(id);
    if(element) {
      const headerOffset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMenuOpen(false);

    // Increase lock time so it doesn't snap back while scrolling far
    scrollTimeout.current = setTimeout(() => {
      scrollLocked.current = false;
    }, 1200);
  };

  // Dark mode glass values
  const darkGlass = {
    base:         'rgba(5, 5, 8, 0.45)',
    scrolled:     'rgba(5, 5, 8, 0.75)',
    border:       'rgba(0, 229, 255, 0.12)',
    borderScroll: 'rgba(0, 245, 255, 0.25)',
    shadow:       '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,229,255,0.08)',
  };

  // Light mode glass values
  const lightGlass = {
    base:         'rgba(255, 255, 255, 0.25)',
    scrolled:     'rgba(255, 255, 255, 0.45)',
    border:       'rgba(0, 180, 220, 0.2)',
    borderScroll: 'rgba(0, 180, 220, 0.4)',
    shadow:       '0 4px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
  };

  const glass = isDark ? darkGlass : lightGlass;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: scrolled ? glass.scrolled : glass.base,
          backdropFilter: 'blur(28px) saturate(200%) brightness(110%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(110%)',
          borderBottom: `1px solid ${scrolled ? glass.borderScroll : glass.border}`,
          boxShadow: glass.shadow,
          transition: 'all 0.4s ease',
        }}
      >
        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), rgba(155,89,255,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0,180,220,0.5), rgba(120,60,200,0.4), transparent)',
          opacity: scrolled ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }} />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* ── LOGO ── */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1 font-orbitron font-bold text-xl md:text-2xl shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ 
              color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.6)', 
              fontSize: '14px' 
            }}>&lt;</span>
            <span style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Sadab</span>
            <span style={{ 
              color: isDark ? '#00e5ff' : '#0284c7',
              textShadow: isDark ? '0 0 12px rgba(0,229,255,0.5)' : '0 0 12px rgba(2,132,199,0.3)',
            }}>Manjar</span>
            <span style={{ 
              color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.6)', 
              fontSize: '14px' 
            }}>/&gt;</span>
          </motion.a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navLinks.map(({ id, label }) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={e => handleNavClick(e, id)}
                  className="relative px-3 py-1.5 text-xs lg:text-sm font-mono rounded-lg uppercase font-medium tracking-widest whitespace-nowrap"
                  animate={{
                    color: activeSection === id
                      ? (isDark ? '#00f5ff' : '#0284c7')
                      : (isDark ? 'rgba(148,163,184,0.6)' : 'rgba(100,116,139,0.8)'),
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{
                    y: -1,
                    color: isDark ? '#ffffff' : '#0f172a',
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="flex items-center gap-1.5 focus:outline-none relative z-10 transition-colors duration-500">
                    <AnimatePresence mode="wait">
                      {activeSection === id && (
                        <motion.span 
                          key="prefix"
                          initial={{ opacity: 0, x: -8 }} 
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.3 }}
                          className="text-[#bf00ff] font-bold"
                        >
                          &gt;
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {label}
                  </span>
                  
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full z-0"
                      style={{
                        background: isDark
                          ? 'linear-gradient(90deg, #00f5ff, #9b59ff)'
                          : 'linear-gradient(90deg, #0284c7, #7c3aed)',
                        boxShadow: isDark
                          ? '0 0 12px rgba(0,245,255,0.6)'
                          : '0 0 8px rgba(2,132,199,0.3)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 250, 
                        damping: 30 
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Theme Toggle Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[#00f5ff] hover:bg-white/10 rounded-full transition-colors flex items-center justify-center w-10 h-10 border border-[#00f5ff]/30 sm:ml-2"
              style={{
                color: isDark ? '#00f5ff' : '#0284c7',
                borderColor: isDark ? 'rgba(0,245,255,0.3)' : 'rgba(2,132,199,0.3)',
              }}
              aria-label="Toggle Theme"
            >
              <motion.span
                initial={false}
                animate={{ rotate: isDark ? 0 : 360 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                {isDark ? '🌙' : '☀️'}
              </motion.span>
            </button>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 origin-center"
              style={{ background: isDark ? '#00f5ff' : '#0284c7' }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-5 h-0.5"
              style={{ background: isDark ? '#00f5ff' : '#0284c7' }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 origin-center"
              style={{ background: isDark ? '#00f5ff' : '#0284c7' }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 z-40 md:hidden overflow-hidden"
            style={{
              background: isDark ? 'rgba(5,5,8,0.92)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              borderBottom: isDark ? '1px solid rgba(0,245,255,0.15)' : '1px solid rgba(2,132,199,0.2)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={e => handleNavClick(e, id)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl font-mono font-medium text-sm transition-all uppercase tracking-widest"
                  animate={{
                    color: activeSection === id
                      ? (isDark ? '#00f5ff' : '#0284c7')
                      : (isDark ? 'rgba(148,163,184,0.8)' : 'rgba(51,65,85,0.8)'),
                  }}
                  transition={{ duration: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{
                    color: isDark ? '#00f5ff' : '#0284c7',
                  }}
                >
                  <span style={{ color: isDark ? 'rgba(0,245,255,0.4)' : 'rgba(2,132,199,0.4)', fontSize: '10px', minWidth: '20px' }}>
                    0{i + 1}
                  </span>
                  {activeSection === id && (
                    <span className="text-[#bf00ff] font-bold">&gt;</span>
                  )}
                  {label}
                </motion.a>
              ))}

              {/* Theme toggle mobile menu */}
              <div className="mt-3 pt-3 border-t border-white/5 flex justify-center">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-mono text-sm transition-all border border-[#00f5ff]/20"
                  style={{
                    color: isDark ? '#00f5ff' : '#0284c7',
                    borderColor: isDark ? 'rgba(0,245,255,0.3)' : 'rgba(2,132,199,0.3)',
                  }}
                >
                  {isDark ? '🌙 Switch to Light' : '☀️ Switch to Dark'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPACER */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
