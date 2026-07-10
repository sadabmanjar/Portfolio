import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';
import TiltCard from './ui/TiltCard';

const ProjectCard = ({ project }) => {
  return (
    <TiltCard className="bg-bg-card border border-border-main rounded-lg flex flex-col hover:border-accent-cyan/50 transition-colors duration-300 relative z-10 hover:z-50">
      {/* Image with zoom */}
      <div className="h-48 w-full flex-shrink-0 relative">
        <motion.img
          src={
            project.image ||
            `https://placehold.co/400x200/0d0d18/00e5ff?text=${encodeURIComponent(project.title)}`
          }
          alt={project.title}
          className="w-full h-full object-cover rounded-t-lg shadow-lg"
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
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-mono text-secondary group-hover:text-primary transition-colors">
              GitHub
            </span>
          </motion.a>
          <Link to={`/projects/${project.id}`} className="flex-1">
            <motion.div
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 transition-colors relative overflow-hidden group/btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-0 bg-accent-cyan/20 transition-all duration-300 group-hover/btn:w-full" />
              <span className="text-sm font-mono text-accent-cyan relative z-10">
                Case Study
              </span>
            </motion.div>
          </Link>
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
