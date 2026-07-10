import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import useSmoothComet from './hooks/useSmoothComet';

// Context
import { ThemeProvider } from './context/ThemeContext';

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
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  // Global comet trail — fixed canvas over the entire page
  useSmoothComet();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 30,
    restDelta: 0.001,
  });

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
        
        {/* Scroll Progress Bar — Premium Smooth */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5 pointer-events-none">
          {/* Gradient fill bar */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full origin-left"
            style={{
              scaleX,
              background: 'linear-gradient(90deg, #00f5ff 0%, #bf00ff 60%, #00f5ff 100%)',
              boxShadow: '0 0 8px 2px rgba(0,245,255,0.7), 0 0 18px 3px rgba(191,0,255,0.3)',
            }}
          />
        </div>

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
                <Achievements />
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

