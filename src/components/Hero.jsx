import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { portfolioData } from '../data/portfolio';
import CyberButton from './ui/CyberButton';

const Hero = () => {

  const { personal } = portfolioData;
  const typewriterText = useTypewriter([
    "Full Stack Developer",
    "Software Engineer Intern",
    "API Tester & QA Engineer",
    "Cybersecurity Enthusiast"
  ]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-main">
      {/* Dot Grid Background with Parallax */}
      <motion.div 
        style={{ x: mousePos.x, y: mousePos.y }}
        className="absolute inset-0 dot-grid opacity-30 z-0"
      />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center px-6">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-green-500/30 rounded-full px-4 py-1.5 mb-8 bg-green-500/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="font-mono text-[10px] md:text-xs text-green-500 uppercase tracking-[0.2em]">
            [ AVAILABLE FOR WORK ]
          </span>
        </motion.div>

        {/* Name with Glitch */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-orbitron text-4xl sm:text-6xl md:text-8xl font-black text-primary mb-4 tracking-tighter"
        >
          <span className="glitch-text block text-primary" data-text={personal.name.toUpperCase()}>
            {personal.name.toUpperCase()}
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-mono text-lg md:text-2xl text-accent-cyan mb-6 h-8"
        >
          <span>{"> "}</span>
          {typewriterText}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-secondary text-sm md:text-lg max-w-xs sm:max-w-xl mx-auto mb-10 leading-relaxed font-mono"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CyberButton
            variant="primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span className="flex items-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >→</motion.span>
            </span>
          </CyberButton>

          <CyberButton
            variant="ghost"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <span className="flex items-center gap-2">
              ↓ Download Resume
            </span>
          </CyberButton>
        </motion.div>
      </div>

      {/* Hero Shadow Bottom Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-main to-transparent z-0" />
    </section>
  );
};

export default Hero;
