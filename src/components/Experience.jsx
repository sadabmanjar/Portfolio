import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const ExperienceItem = ({ exp, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative mb-12 md:mb-24 last:mb-0">
      {/* Timeline Connector Dot */}
      <div className="absolute left-[20px] md:left-1/2 top-6 w-3 h-3 bg-cyber-cyan rounded-full -translate-x-1/2 z-10 animate-pulse-glow shadow-[0_0_10px_rgba(0,245,255,0.8)]" />

      <div className={`flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
        {/* Spacer for Desktop */}
        <div className="hidden md:block w-1/2" />

        {/* Card Content */}
        <motion.div
          initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full md:w-1/2 overflow-hidden ${isLeft ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}
        >
          <div className="bg-bg-card border border-cyber-cyan/15 hover:border-cyber-cyan/30 transition-colors duration-300 rounded-lg p-6 relative group">
             {/* Decorative side accent */}
             <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-cyber-cyan/20 group-hover:bg-cyber-cyan transition-colors`} />

            <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest">{exp.company}</span>
            <h3 className="font-orbitron text-lg text-primary mt-1">{exp.role}</h3>
            <p className="text-slate-500 text-[10px] mt-1 font-mono">{exp.duration}</p>
            
            <ul className="mt-4 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="text-slate-400 text-sm flex items-start gap-2 leading-relaxed">
                  <span className="text-cyber-cyan text-xs mt-1 shrink-0">▹</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="bg-bg-alt py-24 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-orbitron text-3xl text-primary">
            <span className="text-cyber-cyan mr-4 opacity-70">//</span>
            RELEVANT EXPERIENCE
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-cyber-cyan/20 -translate-x-1/2" />

          <div className="space-y-4">
            {experience.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
