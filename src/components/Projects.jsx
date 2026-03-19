import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      className="group relative bg-bg-card border border-border-main rounded-lg p-6 flex flex-col h-full hover:border-accent-cyan/50 hover:shadow-neon-cyan transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-accent-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        {project.featured && (
          <span className="text-[10px] uppercase font-bold tracking-widest bg-accent-purple/20 text-accent-purple border border-accent-purple/30 px-2 py-0.5 rounded">
            [ FEATURED ]
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-orbitron text-lg text-primary group-hover:text-accent-cyan transition-colors duration-300">
        {project.title}
      </h3>
      
      <p className="text-secondary text-sm mt-3 line-clamp-3 leading-relaxed flex-grow">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {project.tags.map(tag => (
          <span 
            key={tag} 
            className="text-[10px] font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-secondary hover:text-primary flex items-center gap-1 transition-colors"
        >
          GITHUB <span className="text-[10px]">↗</span>
        </a>
        <a 
          href={project.demo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent-cyan hover:text-primary flex items-center gap-1 transition-colors"
        >
          LIVE DEMO <span className="text-[10px]">↗</span>
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="projects" className="bg-bg-main py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-accent-cyan font-mono text-sm tracking-widest mb-2">// PROJECTS</p>
          <h2 className="font-orbitron text-3xl text-primary">Things I've built</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
