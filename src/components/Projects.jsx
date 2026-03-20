import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import TiltCard from './ui/TiltCard';

const ProjectCard = ({ project }) => {
  return (
    <TiltCard className="bg-bg-card border border-border-main rounded-lg overflow-hidden flex flex-col hover:border-accent-cyan/50 transition-colors duration-300">
      {/* Image with zoom */}
      <div className="overflow-hidden h-48 w-full flex-shrink-0">
        <motion.img
          src={
            project.image ||
            `https://placehold.co/400x200/0d0d18/00e5ff?text=${encodeURIComponent(project.title)}`
          }
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Card body */}
      <motion.div
        variants={{
          hidden: { y: 40, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        className="flex flex-col flex-grow p-6"
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-accent-cyan text-xl">📁</span>
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
          {project.tags.map((tag) => (
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
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-secondary hover:text-primary font-mono"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
            <motion.span
              className="inline-block text-[10px]"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↗
            </motion.span>
          </motion.a>

          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-accent-cyan font-mono"
            whileHover={{ x: 3, textShadow: '0 0 8px rgba(0,229,255,0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
            <motion.span
              className="inline-block text-[10px]"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              ↗
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </TiltCard>
  );
};

const Projects = () => {
  const { projects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
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
