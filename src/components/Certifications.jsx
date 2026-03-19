import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Certifications = () => {
  const { certifications } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="certifications" className="bg-bg-alt py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-2xl md:text-3xl text-primary">
            <span className="text-accent-purple mr-4 opacity-70">//</span>
            CERTIFICATIONS
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-bg-card border border-border-main rounded-lg p-5 group hover:border-accent-cyan/30 hover:shadow-neon-cyan transition-all duration-300 relative overflow-hidden"
            >
              {/* Checkmark Badge */}
              <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-500/10 p-1 rounded-full border border-emerald-500/20 opacity-40 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>

              <span className="text-[10px] text-accent-purple uppercase tracking-widest font-bold">
                {cert.issuer}
              </span>
              <h3 className="text-sm font-orbitron text-primary mt-1 group-hover:text-cyber-cyan transition-colors">
                {cert.name}
              </h3>
              <p className="text-[10px] text-muted mt-2 font-mono">
                Issued {cert.date}
              </p>
              {cert.description && (
                <p className="text-[10px] text-secondary mt-2 font-mono leading-relaxed border-t border-border-main pt-2">
                  {cert.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
