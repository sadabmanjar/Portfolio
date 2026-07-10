import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import TiltCard from './ui/TiltCard';

const Achievements = () => {
  const { achievements } = portfolioData;

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
    <section id="achievements" className="bg-bg-main py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-2xl md:text-3xl text-primary">
            <span className="text-accent-cyan mr-4 opacity-70">//</span>
            ACHIEVEMENTS
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => (
            <TiltCard key={index}>
              <motion.div
                variants={itemVariants}
                className="bg-bg-card border border-border-main rounded-lg p-6 group hover:border-accent-purple/50 hover:shadow-neon-purple transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Star Icon Badge */}
                <div className="absolute top-4 right-4 text-amber-400 bg-amber-400/10 p-2 rounded-full border border-amber-400/20 opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-orbitron text-primary mt-2 group-hover:text-accent-cyan transition-colors pr-8">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-secondary mt-3 font-mono leading-relaxed border-t border-border-main pt-3">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
