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
    <section id="about" className="min-h-screen bg-bg-main px-6 md:px-16 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Avatar */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative justify-self-center md:justify-self-start"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 border border-white/10 bg-bg-card/40 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden">
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
                className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-90"
              />
            </div>
            
            {/* Glow Effect Background */}
            <div className="absolute -inset-10 bg-accent-cyan/10 blur-[80px] -z-10 rounded-full"></div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-accent-cyan font-mono text-xs tracking-[0.3em] mb-4 uppercase">// About Me</p>
              <h2 className="font-orbitron text-4xl md:text-5xl text-primary mb-4 leading-tight">
                Building Scalable Digital Systems
              </h2>
            </div>
            
            <p className="text-secondary/80 leading-loose font-mono text-sm md:text-base">
              I'm a 3rd-year B.Tech Engineering student and a Software Engineer Intern 
              with hands-on experience in full-stack development, API testing, and 
              cybersecurity fundamentals. I've built real-world platforms like MoveCare 
              (a healthcare consultation app) and a Campus Navigation System — and I'm driven 
              by a passion for scalable, impactful technology that solves real problems.
            </p>

            <div className="pt-6">
               <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-block border border-accent-cyan/50 px-8 py-3 text-accent-cyan font-orbitron text-sm hover:bg-accent-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.15)] hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] backdrop-blur-md bg-accent-cyan/5">
                 RESUME
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20"
        >
          <StatCard number="3" suffix="rd" label="Year B.Tech" />
          <StatCard number="6" suffix="+" label="Projects Built" />
          <StatCard number="2" suffix="" label="Work Experiences" />
          <StatCard number="3" label="Certifications" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
