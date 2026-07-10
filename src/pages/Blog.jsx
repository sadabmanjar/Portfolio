import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/ui/TiltCard';

const mockBlogPosts = [
  {
    id: 1,
    title: "How I Built a Scalable Campus Navigation System",
    date: "July 12, 2026",
    category: "Architecture",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Building a navigation system requires complex pathfinding algorithms and a solid understanding of geographic data structures. Here's how I tackled it."
  },
  {
    id: 2,
    title: "The Power of Framer Motion in React",
    date: "June 28, 2026",
    category: "Frontend",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Why static websites are dead. Implementing micro-interactions and fluid physics-based animations to create premium user experiences."
  },
  {
    id: 3,
    title: "Integrating BLE Devices with Ionic React",
    date: "May 15, 2026",
    category: "Mobile",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Connecting medical hardware to mobile applications opens up a new world of remote healthcare. A deep dive into Bluetooth Low Energy."
  },
  {
    id: 4,
    title: "Optimizing MongoDB Queries for Speed",
    date: "April 02, 2026",
    category: "Backend",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop",
    excerpt: "When your database grows, full collection scans become your worst enemy. Learn how to properly index and structure your NoSQL data."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Blog = () => {
  return (
    <div className="bg-bg-main min-h-screen text-primary overflow-hidden pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4"
          >
            Technical <span className="text-accent-cyan text-glow-cyan">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-secondary font-mono md:text-lg max-w-2xl"
          >
            Thoughts, tutorials, and deep dives into software engineering, frontend architecture, and building scalable systems.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {mockBlogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="group cursor-pointer p-6 h-full flex flex-col">
                  {/* Image Container with Hover zoom */}
                  <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 border border-white/5">
                    <div className="absolute inset-0 bg-accent-cyan/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-accent-cyan tracking-wider uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-secondary">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-secondary/80 font-mono text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Footer / Date */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs font-mono text-secondary/60">
                      {post.date}
                    </span>
                    <span className="text-accent-cyan text-sm font-mono flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Read More <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Blog;
