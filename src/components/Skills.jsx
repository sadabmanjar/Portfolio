import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const SkillCategory = ({ category, items }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xs text-accent-purple uppercase tracking-[0.3em] font-bold">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1 }
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.05
            }}
            className="flex items-center gap-2 bg-bg-card border border-border-main rounded-full px-4 py-1.5 text-sm cursor-default hover:border-accent-cyan hover:text-accent-cyan hover:shadow-neon-cyan transition-all duration-300 group"
          >
            <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{skill.icon}</span>
            <span className="font-mono">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="bg-bg-alt py-24 px-6 md:px-16 border-t border-border-main">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-orbitron text-3xl text-primary">
            <span className="text-accent-cyan mr-4 opacity-70">//</span>
            TECH STACK
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 md:gap-y-16"
        >
          {skills.map((category) => (
            <SkillCategory 
              key={category.category} 
              category={category.category} 
              items={category.items} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
