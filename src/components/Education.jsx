import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="bg-bg-main py-16 px-6 md:px-16 border-t border-border-main">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card border border-accent-purple/20 rounded-xl p-8 relative overflow-hidden group"
        >
          {/* Accent corners */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/5 blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-cyan/5 blur-3xl -z-10" />

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-5xl md:text-6xl select-none">🎓</div>
            
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-xs text-accent-purple uppercase tracking-[0.2em] font-bold">
                  Education Profile
                </span>
                <span className="bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-3 py-0.5 rounded-full text-[10px] font-bold">
                   {education.year}
                </span>
              </div>

              <h3 className="font-orbitron text-xl md:text-2xl text-primary mb-1">
                {education.college}
              </h3>
              
              <p className="text-secondary font-mono text-sm md:text-base">
                {education.degree} <span className="text-muted mx-2">|</span> {education.field}
              </p>

              <div className="mt-6">
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-3">Key Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course) => (
                    <span 
                      key={course}
                      className="px-3 py-1 bg-white/5 border border-border-main rounded-md text-xs text-secondary font-mono hover:border-accent-purple/40 transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
