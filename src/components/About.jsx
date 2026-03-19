import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';

const StatCard = ({ number, label, suffix = "" }) => {
  const { count, ref } = useCountUp(number);
  
  return (
    <motion.div 
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="border border-border-main bg-bg-card rounded-lg p-4 text-center group hover:border-accent-cyan/50 transition-colors"
    >
      <div className="font-orbitron text-3xl text-accent-cyan mb-1">
        {count}{suffix}
      </div>
      <div className="text-secondary text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  );
};

const About = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="min-height-screen bg-bg-main px-6 md:px-16 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Avatar */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative justify-self-center md:justify-self-start"
          >
            <div className="relative w-[280px] h-[280px] border-2 border-accent-cyan/50 bg-bg-card rounded-lg flex items-center justify-center overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-20" 
                   style={{ 
                     background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,245,255,0.1) 2px, rgba(0,0,0,0) 3px)' 
                   }}>
              </div>

              {/* Profile Photo */}
              <img
                src="/sadab.jpeg"
                alt="Md Sadab Manjar"
                className="absolute inset-0 w-full h-full object-cover object-top z-0"
              />

              {/* Decorative Corner Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent-cyan"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent-cyan"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent-cyan"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent-cyan"></div>
            </div>
            
            {/* Glow Effect Background */}
            <div className="absolute -inset-4 bg-accent-cyan/5 blur-2xl -z-10 rounded-full"></div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <p className="text-accent-cyan font-mono text-sm mb-2 tracking-widest">// ABOUT ME</p>
              <h2 className="font-orbitron text-3xl md:text-4xl text-primary mb-4">
                Building Scalable Digital Systems
              </h2>
            </div>
            
            <p className="text-secondary leading-relaxed font-mono text-sm md:text-base">
              I'm a 1st-year B.Tech Engineering student and a Software Engineer Intern 
              with hands-on experience in full-stack development, API testing, and 
              cybersecurity fundamentals. I've built real-world platforms like MoveCare 
              (a healthcare consultation app) and a Campus Navigation System — and I'm driven 
              by a passion for scalable, impactful technology that solves real problems.
            </p>

            <div className="pt-4">
               <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-block border border-accent-cyan px-6 py-2 text-accent-cyan font-orbitron text-sm hover:bg-accent-cyan hover:text-black transition-all duration-300 shadow-neon-cyan/20 shadow-lg">
                 DOWNLOAD_VITA
               </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          <StatCard number="1" suffix="st" label="Year B.Tech" />
          <StatCard number="3" suffix="+" label="Projects Built" />
          <StatCard number="2" suffix="" label="Work Experiences" />
          <StatCard number="3" label="Certifications" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
