import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TiltCard — Reusable 3D mouse-tracking tilt wrapper
 *
 * Props:
 *   children  — card content
 *   className — extra classes applied to the motion wrapper
 */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -14;
    const tiltY = ((x - centerX) / centerX) * 14;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(0,245,255,0.25)'
          : '0 0 0px rgba(0,245,255,0)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative rounded-xl p-[1px] group overflow-hidden ${className}`}
    >
      {/* Animated gradient border pseudo-element (visible on hover) */}
      <div className="absolute inset-[-50%] z-0 bg-border-main group-hover:bg-[conic-gradient(from_0deg,transparent_0_340deg,#00f5ff_360deg)] animate-[spin_4s_linear_infinite] transition-colors duration-500 opacity-0 group-hover:opacity-100" />
      
      {/* Base border layer */}
      <div className="absolute inset-0 z-0 bg-border-main/50 rounded-xl" />

      {/* Inner Glass Card */}
      <div className="relative z-10 w-full h-full bg-bg-card/60 backdrop-blur-xl rounded-[11px] overflow-hidden flex flex-col">
        {/* Shine layer — follows tilt direction */}
        <motion.div
          className="absolute inset-0 rounded-[11px] pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(0,245,255,0.15) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
