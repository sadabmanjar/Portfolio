import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import useSmoothComet from './hooks/useSmoothComet';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Components
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';

// Lazy Loaded Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

const App = () => {
  // Global comet trail — fixed canvas over the entire page
  useSmoothComet();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Console Easter Egg
    console.log('%c⚡ MD Sadab Manjar — Portfolio v2.0', 'color: #00f5ff; font-family: monospace; font-size: 14px; font-weight: bold;');

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate initial mount load / finish preloading
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top when changing routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="bg-bg-main min-h-screen transition-colors duration-300 text-primary relative overflow-hidden">
        
        {/* Dynamic Premium Spotlight Background */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-60"
          animate={{
            background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 255, 0.05), transparent 40%)`
          }}
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Cursor />
        
        {/* Scroll Progress Bar — Premium Smooth */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5 pointer-events-none">
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
        {isLoaded && (
          <main className="flex-grow flex flex-col">
            <Navbar />
            <Suspense fallback={<div className="h-screen bg-bg-main" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
              </Routes>
            </Suspense>
          </main>
        )}

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
      </div>
    </ThemeProvider>
  );
};

export default App;

