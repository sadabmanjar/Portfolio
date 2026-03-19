import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed inset-0 bg-bg-main z-[100] flex items-center justify-center flex-col"
    >
      <div className="relative">
        {/* Animated Initial */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-orbitron text-7xl md:text-9xl text-accent-cyan font-black select-none z-10"
        >
          {portfolioData.personal.initials}
        </motion.div>

        {/* Pulsing Ring Around Initial */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 md:-inset-12 border-2 border-dashed border-cyber-cyan/20 rounded-full"
        />
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -inset-4 md:-inset-6 border border-accent-cyan shadow-neon-cyan rounded-full"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 font-mono text-xs tracking-[0.5em] text-accent-cyan/60 animate-pulse"
      >
        INITIALIZING_IDENTITY_MATRIX...
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
