import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400';
  const icon = type === 'success' ? '✓' : '⚠';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9, y: 20 }}
           className={`fixed bottom-8 right-8 z-[1000] flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${bgColor}`}
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-sm">
            {icon}
          </span>
          <span className="font-mono text-sm tracking-wide">{message}</span>
          <button 
            onClick={onClose}
            className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
