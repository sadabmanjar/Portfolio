import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Hooks
import { useScrollProgress } from './hooks/useScrollProgress';

// Components
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';

// Lazy Loaded Sections for Performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  const completion = useScrollProgress();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Console Easter Egg
    console.log('%c⚡ MD Sadab Manjar — Portfolio v1.0', 'color: #00f5ff; font-family: monospace; font-size: 14px; font-weight: bold;');
    console.log('%cHey there, fellow dev! Glad you\'re checking out my code.', 'color: #bf00ff; font-family: monospace');

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate initial mount load / finish preloading
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="bg-bg-main min-h-screen transition-colors duration-300 text-primary">
        <Cursor />
        
        {/* Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 h-[2px] bg-accent-cyan z-[60] origin-left"
          style={{ scaleX: completion / 100 }}
        />

        {/* Page Preloader */}
        <AnimatePresence>
          {!isLoaded && <Preloader />}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {isLoaded && (
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Navbar />
              <Suspense fallback={<div className="h-screen bg-bg-main" />}>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Certifications />
                <Contact />
                <Footer />
              </Suspense>
            </motion.main>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 bg-bg-card border border-accent-cyan/30 rounded-full flex items-center justify-center text-accent-cyan hover:shadow-neon-cyan hover:border-accent-cyan transition-all duration-300 z-40 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;

/**
 * FINAL PROJECT MODULE CHECKLIST:
 * 1. tailwind.config.js - Theme extensions & neon utilities
 * 2. src/index.css - Global styles, fonts, scrollbar, animations, theme overrides
 * 3. src/data/portfolio.js - Main project data store
 * 4. src/context/ThemeContext.jsx - Light/Dark mode state management
 * 5. src/hooks/useCountUp.js - Stat animation logic
 * 6. src/hooks/useTypewriter.js - Hero cycling text logic
 * 7. src/hooks/useScrollProgress.js - Navigation progress bar logic
 * 8. src/components/Preloader.jsx - Premium initial loading screen
 * 9. src/components/Cursor.jsx - Custom lagging mouse interactor
 * 10. src/components/Navbar.jsx - Responsive navigation with theme toggle
 * 11. src/components/Hero.jsx - Landing with glitch & parallax
 * 12. src/components/About.jsx - Bio with scanline avatar & stats
 * 13. src/components/Skills.jsx - Tech stack grid
 * 14. src/components/Projects.jsx - Interactive project showcase
 * 15. src/components/Experience.jsx - Vertical work timeline
 * 16. src/components/Education.jsx - Academic profile card
 * 17. src/components/Certifications.jsx - Staggered cert grid
 * 18. src/components/Contact.jsx - Interactive contact form
 * 19. src/components/Footer.jsx - Minimal signature section
 * 20. src/App.jsx - Main entry, lazy loading, & layout assembly
 */
