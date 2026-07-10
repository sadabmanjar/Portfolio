import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetails = () => {
  const { id } = useParams();
  const project = portfolioData.projects.find(p => p.id === parseInt(id));

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Use GSAP to pin the left image column while the right text column scrolls
  useGSAP(() => {
    if (!project || !leftColRef.current || !rightColRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: leftColRef.current,
      scrub: true,
      markers: false,
    });
  }, { scope: containerRef });

  if (!project) {
    return <Navigate to="/#projects" />;
  }

  const mockDeepDive = [
    {
      title: "The Challenge",
      content: "When designing this application, the primary hurdle was ensuring a seamless, low-latency experience across devices. The state management grew increasingly complex as real-time features were introduced, forcing a complete architectural re-think."
    },
    {
      title: "Architecture & Tech Stack",
      content: `We built the foundation using ${project.tags.join(', ')}. By leveraging serverless edge functions and a heavily cached NoSQL database, we reduced initial load times by 400%. The frontend heavily utilizes React context mixed with custom hooks to keep prop-drilling to a minimum.`
    },
    {
      title: "The Solution",
      content: "Ultimately, the platform scales dynamically based on user load. We implemented optimistic UI updates so users never feel like they are waiting on a network request. It's fast, robust, and highly maintainable."
    }
  ];

  return (
    <div className="bg-bg-main min-h-screen text-primary overflow-hidden">
      
      {/* Cinematic Hero */}
      <motion.section 
        className="relative w-full h-[70vh] flex items-end pb-16 px-6 md:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={project.image || `https://placehold.co/1920x1080/0d0d18/00e5ff?text=${encodeURIComponent(project.title)}`} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/#projects" className="text-accent-cyan font-mono text-sm hover:underline mb-6 inline-block">
            &larr; Back to Projects
          </Link>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan font-mono text-xs uppercase tracking-wider backdrop-blur-md">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Deep Dive Content - GSAP Pinned Section */}
      <section ref={containerRef} className="relative max-w-7xl mx-auto px-6 md:px-16 py-24 flex flex-col md:flex-row gap-16">
        
        {/* Left Column (Sticky Image Panel) */}
        <div className="w-full md:w-5/12 hidden md:block">
          <div ref={leftColRef} className="h-screen py-24 flex flex-col justify-start">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative">
              <img 
                src={project.image || `https://placehold.co/800x1000/0d0d18/00e5ff?text=${encodeURIComponent(project.title)}`} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-main/90" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <a href={project.github} target="_blank" rel="noreferrer" className="w-full block text-center py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white font-mono text-sm transition-colors mb-3">
                  View Source Code
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="w-full block text-center py-3 bg-accent-cyan hover:bg-accent-cyan/80 text-black font-bold font-mono text-sm rounded-lg transition-colors shadow-neon-cyan">
                  Live Preview
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Scrolling Text) */}
        <div ref={rightColRef} className="w-full md:w-7/12 py-12 md:py-32 space-y-32">
          
          <div>
            <h3 className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em] mb-4">// Overview</h3>
            <p className="text-secondary/90 text-lg md:text-xl leading-relaxed font-mono">
              {project.description}
            </p>
          </div>

          {mockDeepDive.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-orbitron text-2xl md:text-3xl text-primary mb-6">
                {section.title}
              </h3>
              <p className="text-secondary/80 leading-loose font-mono md:text-lg">
                {section.content}
              </p>
            </motion.div>
          ))}
          
        </div>
      </section>

    </div>
  );
};

export default ProjectDetails;
